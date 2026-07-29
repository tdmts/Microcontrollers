#!/usr/bin/env python3
"""Export een volledig labo naar een enkele PDF.

    python scripts/export-pdf.py 6            # -> _export/Labo6.pdf
    python scripts/export-pdf.py 0 1 2        # meerdere labo's
    python scripts/export-pdf.py --all        # elk labo in exercises.js

De volgorde komt uit de manifests, niet uit de map: eerst de naslag
(reference.js, categorie per categorie in array-volgorde), daarna de
oefeningen (exercises.js, gesorteerd op "order"), precies zoals de hub en het
dashboard ze tonen. Voor de bundel geldt: elke pagina wordt uit haar HTML
gehaald, statisch gemaakt (oplossingen en spoilers open, checkboxes als lege
vakjes, video's als zichtbare link, JS-widgets als verwijzing naar de
website), en achter een cover met inhoudstafel geplakt. Die ene bundel gaat
daarna door headless Chrome of Edge met --print-to-pdf.

Dit is een auteurstool, net als import-brightspace.py: hij draait nooit in CI
of in de Stop-hook, en schrijft alleen in --out (standaard _export/, gitignored).

Opties:
    --out DIR         doelmap voor de PDF's (standaard _export)
    --no-solutions    studentenversie: knip de oplossingssecties eruit
    --exercises-first oefeningen voor de naslag in plaats van erna
    --page-numbers    laat Chrome zijn eigen kop- en voettekst zetten
                      (datum, titel, url, paginanummer)
    --html-only       schrijf alleen de gebundelde HTML, start Chrome niet
    --keep-html       schrijf de bundel naast de PDF, voor als er iets misgaat
    --chrome PAD      pad naar chrome.exe of msedge.exe (anders autodetectie,
                      of de omgevingsvariabele CHROME)
"""

import argparse
import datetime
import html as html_mod
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SITE = 'https://tdmts.github.io/Microcontrollers/'
DOC_EXTS = ('.pdf', '.zip', '.docx', '.pptx', '.xlsx')

CHROME_CANDIDATES = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
    r'%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    r'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
]
CHROME_ON_PATH = ['chrome', 'google-chrome', 'chromium', 'chromium-browser', 'msedge']

# Inline scripts die alleen een engine opstarten: die vallen gewoon weg.
INIT_ONLY = re.compile(r'^\s*(initChecklistSync|initDashboard|initReferenceHub)\s*\([^)]*\)\s*;?\s*$')


# ---------------------------------------------------------------- manifests

def js_object_to_json(text, start):
    """Zet het JS-objectliteral dat op text[start] begint om naar JSON.

    Geen regex-truc met aanhalingstekens: die struikelt over de apostrof in
    "twee Arduino's", en die staat in meer dan een blurb. Dit loopt teken per
    teken en weet dus wanneer het in een string zit.
    """
    out = []
    i, n, depth = start, len(text), 0
    while i < n:
        c = text[i]
        if c == '/' and i + 1 < n and text[i + 1] == '/':
            while i < n and text[i] != '\n':
                i += 1
            continue
        if c == '/' and i + 1 < n and text[i + 1] == '*':
            end = text.find('*/', i)
            i = n if end == -1 else end + 2
            continue
        if c in "'\"":
            quote, j, buf = c, i + 1, []
            while j < n:
                ch = text[j]
                if ch == '\\':
                    nxt = text[j + 1] if j + 1 < n else ''
                    buf.append(nxt if nxt == "'" else '\\' + nxt)
                    j += 2
                    continue
                if ch == quote:
                    break
                if ch == '"':
                    buf.append('\\"')
                elif ch == '\n':
                    buf.append('\\n')
                else:
                    buf.append(ch)
                j += 1
            out.append('"' + ''.join(buf) + '"')
            i = j + 1
            continue
        if c in '{[':
            depth += 1
            out.append(c)
            i += 1
            continue
        if c in '}]':
            depth -= 1
            out.append(c)
            i += 1
            if depth == 0:
                break
            continue
        if c.isalpha() or c in '_$':
            j = i
            while j < n and (text[j].isalnum() or text[j] in '_$'):
                j += 1
            word = text[i:j]
            k = j
            while k < n and text[k] in ' \t\r\n':
                k += 1
            out.append('"' + word + '"' if k < n and text[k] == ':' else word)
            i = j
            continue
        out.append(c)
        i += 1
    return json.loads(re.sub(r',\s*([}\]])', r'\1', ''.join(out)))


def read_manifest(filename, varname):
    text = (REPO / filename).read_text(encoding='utf-8')
    m = re.search(r'window\.' + varname + r'\s*=\s*', text)
    if not m:
        sys.exit('kan %s niet vinden in %s' % (varname, filename))
    return js_object_to_json(text, text.index('{', m.end()))


# ----------------------------------------------------------------- ordering

def repo_path_from_href(href, base_dir):
    """Zet een manifest-href om naar een pad relatief aan de repo-root."""
    if href.startswith(SITE):
        return href[len(SITE):]
    if href.startswith('http'):
        return None
    return os.path.relpath(os.path.normpath(os.path.join(base_dir, href)), '.').replace('\\', '/')


def slugify(text):
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', text.lower())).strip('-')


def collect_pages(lab, exercises, reference, exercises_first):
    """Alle pagina's van een labo, in de volgorde waarin ze in de PDF komen."""
    ref_items, ex_items, notes = [], [], []

    ref_lab = reference.get(lab)
    if ref_lab:
        for category in ref_lab.get('categories', []):
            for topic in category.get('topics', []):
                path = repo_path_from_href(topic['href'], '%s/Reference' % lab.capitalize())
                item = {
                    'kind': 'reference',
                    'category': category.get('name', ''),
                    'title': topic['name'],
                    'slug': 'ref-' + slugify(topic.get('id') or topic['name']),
                    'path': path,
                }
                if path and path.lower().endswith(DOC_EXTS):
                    item['document'] = True
                ref_items.append(item)

    ex_lab = exercises.get(lab)
    if ex_lab:
        for ex in sorted(ex_lab.get('exercises', []), key=lambda e: e.get('order', 0)):
            ex_items.append({
                'kind': 'exercise',
                'category': 'Oefeningen',
                'title': ex['name'],
                'slug': 'ex-' + slugify(ex.get('id') or ex['name']),
                'path': repo_path_from_href(ex['href'], '%s/Exercises' % lab.capitalize()),
                'difficulty': ex.get('difficulty'),
                'time': ex.get('time'),
            })

    items = ex_items + ref_items if exercises_first else ref_items + ex_items
    for item in items:
        if item.get('document'):
            notes.append('los document, niet ingesloten: %s' % item['path'])
        elif not item['path'] or not (REPO / item['path']).is_file():
            notes.append('pagina niet gevonden, overgeslagen: %s' % (item['path'] or item['title']))
            item['missing'] = True
    return items, notes


# ------------------------------------------------------------ page rewriting

ATTR = r'''(?:"([^"]*)"|'([^']*)')'''


def attr(tag, name):
    m = re.search(r'\b' + name + r'\s*=\s*' + ATTR, tag, re.I)
    if not m:
        return None
    return m.group(1) if m.group(1) is not None else m.group(2)


def body_of(html):
    m = re.search(r'<body[^>]*>(.*)</body>', html, re.S | re.I)
    return m.group(1) if m else html


def strip_scripts(html):
    """Haal alle scripts weg; meld waar een echte widget stond."""
    widgets = []

    def repl(m):
        tag, inner = m.group(0), m.group(1)
        if attr(tag, 'src') or INIT_ONLY.match(inner or ''):
            return ''
        widgets.append(True)
        return ('<div class="pdf-note"><strong>Interactief onderdeel.</strong> '
                'Dit stuk werkt alleen in de browser. Open de pagina online om het te gebruiken.</div>')

    html = re.sub(r'<script\b[^>]*>(.*?)</script>', repl, html, flags=re.S | re.I)
    return html, len(widgets)


def rewrite_iframes(html):
    """Een iframe drukt niet af; zet er de link naartoe in de plaats."""
    def repl(m):
        tag = m.group(0)
        src = attr(tag, 'src') or ''
        title = attr(tag, 'title') or ''
        label = 'Video' if 'youtube' in src or 'vimeo' in src else 'Ingesloten pagina'
        vid = re.search(r'/embed/([A-Za-z0-9_-]+)', src)
        link = 'https://www.youtube.com/watch?v=' + vid.group(1) if vid else src
        extra = ''
        if title and title.lower() not in ('youtube video player', ''):
            extra = ' &mdash; ' + html_mod.escape(title)
        return ('<div class="pdf-note"><strong>%s.</strong>%s<br><a href="%s">%s</a></div>'
                % (label, extra, html_mod.escape(link), html_mod.escape(link)))

    return re.sub(r'<iframe\b[^>]*>.*?</iframe>|<iframe\b[^>]*/?>', repl, html, flags=re.S | re.I)


def rewrite_images(html, page_dir, missing):
    """Relatieve src -> absolute file:-url, zodat de bundel elders kan staan."""
    def repl(m):
        tag = m.group(0)
        src = attr(tag, 'src')
        if not src or src.startswith(('http', 'data:', 'file:')):
            return tag
        target = (REPO / page_dir / src).resolve()
        if not target.is_file():
            missing.append(os.path.relpath(target, REPO).replace('\\', '/'))
            alt = attr(tag, 'alt') or 'afbeelding ontbreekt'
            return ('<div class="pdf-missing-img"><strong>Afbeelding ontbreekt</strong><br>%s</div>'
                    % html_mod.escape(alt))
        return tag.replace(src, target.as_uri())

    return re.sub(r'<img\b[^>]*?/?>', repl, html, flags=re.I)


def rewrite_links(html, page_dir, in_bundle, unresolved):
    """Interne links worden ankers in de bundel, de rest wordt een site-url."""
    def repl(m):
        tag = m.group(0)
        href = attr(tag, 'href')
        if not href or href.startswith(('http', 'mailto:', 'tel:', '#', 'file:')):
            return tag
        base, _, frag = href.partition('#')
        target = os.path.relpath(os.path.normpath(os.path.join(page_dir, base)), '.').replace('\\', '/')
        if target.lower() in in_bundle:
            slug = in_bundle[target.lower()]
            new = '#' + (slug + '--' + frag if frag else slug)
        elif (REPO / target).exists():
            new = SITE + target + ('#' + frag if frag else '')
        else:
            unresolved.append(href)
            return tag
        return tag.replace(href, new)

    return re.sub(r'<a\b[^>]*?>', repl, html, flags=re.I)


def namespace_ids(html, slug):
    """Elke id krijgt de sectie-slug ervoor.

    In een bundel van twintig pagina's staat "het-schema" anders vijf keer, en
    dan wijst elke link naar de eerste.
    """
    html = re.sub(r'(\bid\s*=\s*")([^"]+)(")', lambda m: m.group(1) + slug + '--' + m.group(2) + m.group(3), html)
    html = re.sub(r'(\bhref\s*=\s*")#([^"]+)(")', lambda m: m.group(1) + '#' + slug + '--' + m.group(2) + m.group(3), html)
    return html


def find_block_end(html, start):
    """Index net na het </div> dat hoort bij de <div> op positie start."""
    depth, i = 0, start
    for m in re.finditer(r'<div\b[^>]*>|</div>', html[start:], re.I):
        depth += 1 if m.group(0).lower().startswith('<div') else -1
        i = start + m.end()
        if depth == 0:
            return i
    return i


HEADING_BEFORE = re.compile(r'<h[1-6]\b[^>]*>\s*Oplossing\s*</h[1-6]>\s*$', re.I)


def drop_solutions(html):
    """Studentenversie: de oplossing eruit, met haar eigen titel erbij."""
    while True:
        m = re.search(r'<div\b[^>]*class="[^"]*\bsolution-container\b[^"]*"[^>]*>', html, re.I)
        if not m:
            return html
        cut = m.start()
        heading = HEADING_BEFORE.search(html, max(0, cut - 200), cut)
        if heading:
            cut = heading.start()
        html = html[:cut] + html[find_block_end(html, m.start()):]


def transform_page(item, in_bundle, report, keep_solutions):
    path = item['path']
    page_dir = os.path.dirname(path)
    raw = (REPO / path).read_text(encoding='utf-8')
    body = body_of(raw)
    body, widgets = strip_scripts(body)
    if widgets:
        report['widgets'].append(path)
    if not keep_solutions:
        body = drop_solutions(body)
    body = rewrite_iframes(body)
    body = rewrite_images(body, page_dir, report['missing_images'])
    body = namespace_ids(body, item['slug'])
    body = rewrite_links(body, page_dir, in_bundle, report['unresolved'])
    return body


# -------------------------------------------------------------- bundle & pdf

PRINT_CSS = """
@page { size: A4; margin: 15mm 12mm 13mm 12mm; }

html, body { background: #fff !important; }
body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    padding-top: 0;
    padding-bottom: 0;
}

/* Een A4 is bij het afdrukken zo'n 697px breed, en daar geeft Bootstrap de
   .container een max-width van 540px: een smalle kolom met een brede witte
   rand ernaast. De paginamarge hierboven doet dat werk al. */
.container {
    max-width: none !important;
    width: auto !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.pdf-doc { break-before: page; }
.pdf-doc:first-of-type { break-before: auto; }
.pdf-doc h1 { break-after: avoid; }
h2, h3, h4 { break-after: avoid; }
pre, figure, table, .info-box, .pdf-note, .checklist li { break-inside: avoid; }
img { max-width: 100% !important; height: auto !important; }

/* Alles wat achter een klik zit, staat in de PDF gewoon open. */
.spoiler-content, .solution-content { display: block !important; }
.spoiler-container > .hidden { display: block !important; }
.spoiler-container > .button { display: none !important; }
.btn-spoiler, .solution-reveal-btn, .btn-copy { display: none !important; }
.accordion-collapse { display: block !important; height: auto !important; visibility: visible !important; }
.accordion-button { pointer-events: none; }
.accordion-button::after { display: none !important; }

/* Een ratio-wrapper zonder iframe erin is een leeg blok van 300 pixels hoog. */
.ratio { position: static !important; height: auto !important; }
.ratio::before { display: none !important; }
.ratio > * { position: static !important; width: auto !important; height: auto !important; }

/* Checkboxes drukken standaard leeg wit af: geef ze een rand. */
.checklist input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    width: 0.95em; height: 0.95em;
    border: 1.5px solid #6b7280;
    border-radius: 3px;
    display: inline-block;
    vertical-align: -0.12em;
    background: #fff;
}

.pdf-note, .pdf-missing-img {
    border: 1px dashed #9ca3af;
    border-radius: 6px;
    padding: 10px 14px;
    margin: 14px 0;
    font-size: 0.92rem;
    color: #374151;
    background: #f9fafb;
}
.pdf-missing-img { text-align: center; }

.pdf-cover { text-align: center; padding-top: 28vh; }
.pdf-cover .pdf-course { text-transform: uppercase; letter-spacing: 0.22em; font-size: 0.85rem; color: #6b7280; }
.pdf-cover h1 { font-size: 3.4rem; margin: 0.3em 0 0.2em; border: 0; }
.pdf-cover .pdf-sub { font-size: 1.05rem; color: #4b5563; }
.pdf-cover .pdf-meta { margin-top: 3.5em; font-size: 0.82rem; color: #6b7280; }

.pdf-toc { break-before: page; }
.pdf-toc h2 { margin-top: 1.6em; font-size: 1.15rem; }
.pdf-toc ol { list-style: none; padding-left: 0; }
.pdf-toc li { padding: 4px 0; border-bottom: 1px dotted #d1d5db; }
.pdf-toc a { text-decoration: none; }
.pdf-toc .pdf-toc-meta { color: #6b7280; font-size: 0.85rem; float: right; }
.pdf-toc .pdf-toc-doc { color: #6b7280; font-size: 0.85rem; }
.pdf-kicker { text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.72rem; color: #6b7280; margin-bottom: 0.4em; }
"""

# orion.js bouwt spoilers en accordions pas na het laden op, en highlight.js
# komt daar nog eens achteraan. De CSS hierboven regelt het uitklappen, dit
# ruimt alleen op wat daarna nog verschijnt.
PRINT_JS = """
(function () {
    function statisch() {
        document.querySelectorAll('.spoiler-content, .solution-content').forEach(function (el) {
            el.classList.add('active');
        });
        document.querySelectorAll('.accordion-collapse').forEach(function (el) {
            el.classList.add('show');
        });
        document.querySelectorAll('.accordion-button').forEach(function (el) {
            el.classList.remove('collapsed');
            el.setAttribute('aria-expanded', 'true');
        });
        document.querySelectorAll('.btn-spoiler, .solution-reveal-btn, .btn-copy').forEach(function (el) {
            el.remove();
        });
    }
    document.addEventListener('DOMContentLoaded', statisch);
    var n = 0;
    var timer = setInterval(function () { statisch(); if (++n > 20) clearInterval(timer); }, 250);
})();
"""


def build_bundle(lab_title, items, report, keep_solutions):
    today = datetime.date.today().strftime('%d/%m/%Y')
    in_bundle = {i['path'].lower(): i['slug'] for i in items
                 if i.get('path') and not i.get('missing') and not i.get('document')}

    parts = ['<!DOCTYPE html>', '<html lang="nl">', '<head>', '<meta charset="utf-8">',
             '<title>%s</title>' % html_mod.escape(lab_title),
             '<link rel="stylesheet" href="https://tdmts.github.io/OrionContent/orion.css">',
             '<script src="https://tdmts.github.io/OrionContent/orion.js"></script>',
             '<style>%s</style>' % PRINT_CSS,
             '<script>%s</script>' % PRINT_JS,
             '</head>', '<body>', '<div class="container">']

    parts.append('<div class="pdf-cover">'
                 '<div class="pdf-course">Microcontrollers</div>'
                 '<h1>%s</h1>'
                 '<div class="pdf-sub">Naslag en oefeningen%s</div>'
                 '<div class="pdf-meta">Gegenereerd op %s uit tdmts.github.io/Microcontrollers</div>'
                 '</div>'
                 % (html_mod.escape(lab_title),
                    ', met oplossingen' if keep_solutions else '',
                    today))

    toc = ['<div class="pdf-toc"><h1>Inhoud</h1>']
    current = None
    for item in items:
        if item['category'] != current:
            if current is not None:
                toc.append('</ol>')
            current = item['category']
            toc.append('<h2>%s</h2><ol>' % html_mod.escape(current))
        if item.get('document'):
            toc.append('<li>%s <span class="pdf-toc-doc">los document</span></li>'
                       % html_mod.escape(item['title']))
        elif item.get('missing'):
            continue
        else:
            meta = ''
            if item.get('time'):
                meta = '<span class="pdf-toc-meta">%s</span>' % html_mod.escape(item['time'])
            toc.append('<li>%s<a href="#%s">%s</a></li>'
                       % (meta, item['slug'], html_mod.escape(item['title'])))
    toc.append('</ol></div>')
    parts.append(''.join(toc))

    for item in items:
        if item.get('missing') or item.get('document'):
            continue
        kicker = 'Naslag' if item['kind'] == 'reference' else 'Oefening'
        parts.append('<section class="pdf-doc" id="%s"><div class="pdf-kicker">%s</div>%s</section>'
                     % (item['slug'], kicker, transform_page(item, in_bundle, report, keep_solutions)))

    parts += ['</div>', '</body>', '</html>']
    return '\n'.join(parts)


def find_chrome(explicit):
    if explicit:
        return explicit
    if os.environ.get('CHROME'):
        return os.environ['CHROME']
    for candidate in CHROME_CANDIDATES:
        path = os.path.expandvars(candidate)
        if Path(path).is_file():
            return path
    for name in CHROME_ON_PATH:
        found = shutil.which(name)
        if found:
            return found
    return None


def print_pdf(chrome, bundle, pdf, page_numbers):
    with tempfile.TemporaryDirectory() as profile:
        cmd = [
            chrome, '--headless=new', '--disable-gpu', '--no-first-run',
            '--no-default-browser-check', '--disable-extensions',
            '--user-data-dir=' + profile,
            '--run-all-compositor-stages-before-draw',
            '--virtual-time-budget=20000',
            '--print-to-pdf=' + str(pdf),
            Path(bundle).as_uri(),
        ]
        if not page_numbers:
            cmd[-2:-2] = ['--no-pdf-header-footer', '--print-to-pdf-no-header']
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    if not pdf.is_file():
        sys.stderr.write(result.stdout + result.stderr + '\n')
        return False
    return True


# ------------------------------------------------------------------ main

def main():
    ap = argparse.ArgumentParser(description='Exporteer een volledig labo naar PDF.')
    ap.add_argument('labs', nargs='*', help='labonummers, bv. 6 of 0 1 2')
    ap.add_argument('--all', action='store_true', help='alle labo\'s uit exercises.js')
    ap.add_argument('--out', default='_export', help='doelmap (standaard _export)')
    ap.add_argument('--no-solutions', action='store_true', help='studentenversie zonder oplossingen')
    ap.add_argument('--exercises-first', action='store_true', help='oefeningen voor de naslag')
    ap.add_argument('--page-numbers', action='store_true', help='kop- en voettekst van Chrome mee afdrukken')
    ap.add_argument('--html-only', action='store_true', help='alleen de bundel-HTML, geen PDF')
    ap.add_argument('--keep-html', action='store_true', help='bewaar de bundel-HTML naast de PDF')
    ap.add_argument('--chrome', help='pad naar chrome.exe of msedge.exe')
    args = ap.parse_args()

    exercises = read_manifest('exercises.js', 'LAB_EXERCISES')
    reference = read_manifest('reference.js', 'LAB_REFERENCE')

    if args.all:
        labs = sorted(exercises, key=lambda k: int(re.sub(r'\D', '', k) or 0))
    elif args.labs:
        labs = ['labo' + re.sub(r'\D', '', l) for l in args.labs]
    else:
        ap.error('geef een labonummer op, of --all')

    chrome = None
    if not args.html_only:
        chrome = find_chrome(args.chrome)
        if not chrome:
            sys.exit('Geen Chrome of Edge gevonden. Geef --chrome PAD op, zet CHROME, '
                     'of draai met --html-only en druk de HTML zelf af.')

    out_dir = REPO / args.out
    out_dir.mkdir(parents=True, exist_ok=True)
    keep_solutions = not args.no_solutions
    failures = 0

    for lab in labs:
        if lab not in exercises and lab not in reference:
            print('%s staat in geen van beide manifests, overgeslagen' % lab)
            failures += 1
            continue
        lab_title = (exercises.get(lab) or reference.get(lab)).get('labTitle', lab)
        items, notes = collect_pages(lab, exercises, reference, args.exercises_first)
        pages = [i for i in items if not i.get('missing') and not i.get('document')]
        if not pages:
            print('%s heeft geen pagina\'s in de manifests' % lab_title)
            failures += 1
            continue

        report = {'missing_images': [], 'unresolved': [], 'widgets': []}
        bundle_html = build_bundle(lab_title, items, report, keep_solutions)

        stem = lab_title.replace(' ', '') + ('' if keep_solutions else '-student')
        pdf = out_dir / (stem + '.pdf')
        bundle_path = out_dir / (stem + '.html') if (args.html_only or args.keep_html) \
            else Path(tempfile.gettempdir()) / (stem + '-bundle.html')
        bundle_path.write_text(bundle_html, encoding='utf-8')

        print('\n%s: %d pagina\'s (%d naslag, %d oefeningen)'
              % (lab_title, len(pages),
                 sum(1 for p in pages if p['kind'] == 'reference'),
                 sum(1 for p in pages if p['kind'] == 'exercise')))

        if args.html_only:
            print('  bundel: %s' % os.path.relpath(bundle_path, REPO))
        else:
            if print_pdf(chrome, bundle_path, pdf, args.page_numbers):
                print('  PDF:    %s (%.1f MB)' % (os.path.relpath(pdf, REPO), pdf.stat().st_size / 1e6))
            else:
                print('  PDF mislukt, Chrome gaf niets terug')
                failures += 1
            if args.keep_html:
                print('  bundel: %s' % os.path.relpath(bundle_path, REPO))
            elif bundle_path.is_file() and not args.html_only:
                bundle_path.unlink()

        for note in notes:
            print('  ! %s' % note)
        for img in sorted(set(report['missing_images'])):
            print('  ! afbeelding ontbreekt: %s' % img)
        for href in sorted(set(report['unresolved'])):
            print('  ! link niet gevonden: %s' % href)
        for page in sorted(set(report['widgets'])):
            print('  i interactief onderdeel vervangen door een verwijzing: %s' % page)

    return 1 if failures else 0


if __name__ == '__main__':
    sys.exit(main())
