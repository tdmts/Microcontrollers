#!/usr/bin/env python3
"""Stage a Brightspace course export into _incoming/ so orion-convert can run per page.

Reads a Brightspace "Export Components" package or a Common Cartridge zip and
writes one raw HTML file per content topic into _incoming/, keeping the module
tree, the ordering and the original path in a header comment. Every image the
topics reference is copied out of the zip into img/ (deduplicated against the
images already in the repo) and the src is rewritten to a local relative path,
so no /content/enforced/ hotlink ever reaches a page.

Stdlib only. Unlike scripts/check-content.sh this is an authoring tool: it never
runs in CI or the Stop hook, so it trades that script's fork-free bash constraint
for a real zip and XML parser.

    python scripts/import-brightspace.py export.zip
    python scripts/import-brightspace.py export.zip --dry-run
    python scripts/import-brightspace.py export.zip --img-dir _incoming/img
"""

from __future__ import annotations

import argparse
import hashlib
import posixpath
import re
import sys
import unicodedata
import zipfile
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree as ET

REPO_ROOT = Path(__file__).resolve().parent.parent

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".bmp", ".avif"}
HTML_EXTS = {".html", ".htm"}

# src="..." / href="..." / src='...' -- value captured without the quotes.
ATTR_RE = re.compile(r"""\b(src|href)\s*=\s*(["'])(.*?)\2""", re.IGNORECASE | re.DOTALL)
BODY_RE = re.compile(r"<body\b[^>]*>(.*)</body\s*>", re.IGNORECASE | re.DOTALL)


def local(tag: str) -> str:
    """Tag name without its XML namespace."""
    return tag.split("}", 1)[-1]


def slugify(text: str, fallback: str = "topic") -> str:
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^A-Za-z0-9]+", "-", text).strip("-").lower()
    return text or fallback


def sha1(data: bytes) -> str:
    return hashlib.sha1(data).hexdigest()


# --------------------------------------------------------------------------
# Manifest
# --------------------------------------------------------------------------


class Topic:
    def __init__(self, order: int, title: str, module: list[str], zip_path: str,
                 kind: str = "topic", inline_html: str | None = None):
        self.order = order
        self.title = title
        self.module = module
        self.zip_path = zip_path
        # "topic" = an HTML file in the package, "assignment" = a dropbox folder's
        # instructions, which live in dropbox_d2l.xml and have no file of their own.
        self.kind = kind
        self.inline_html = inline_html
        self.staged_name = ""
        self.images_copied = 0
        self.images_reused = 0
        self.unresolved: list[str] = []


def norm_href(href: str) -> str:
    """D2L writes manifest hrefs with Windows separators; zip entries use '/'."""
    return unquote(href).replace("\\", "/").strip()


def load_assignments(zf: zipfile.ZipFile) -> dict[str, tuple[str, str]]:
    """resource_code -> (folder name, instructions HTML) from dropbox_d2l.xml.

    In this course most exercises are not content topics at all: the module tree
    links straight to an assignment folder, and the exercise text is that folder's
    instructions. A manifest-only import would silently drop every one of them.
    """
    entry = next((n for n in zf.namelist()
                  if posixpath.basename(n).lower() == "dropbox_d2l.xml"), None)
    if not entry:
        return {}
    try:
        root = ET.fromstring(zf.read(entry))
    except ET.ParseError:
        return {}

    out: dict[str, tuple[str, str]] = {}
    for folder in root.iter():
        if local(folder.tag) != "folder":
            continue
        code = folder.get("resource_code")
        if not code:
            continue
        text = next((t.text for t in folder.iter()
                     if local(t.tag) == "text" and (t.text or "").strip()), None)
        if text:
            out[code.lower()] = (folder.get("name") or "", text)
    return out


QUICKLINK_RE = re.compile(r"[?&]rcode=([0-9a-fA-F-]+)")


def find_manifest(zf: zipfile.ZipFile) -> str | None:
    candidates = [n for n in zf.namelist() if posixpath.basename(n).lower() == "imsmanifest.xml"]
    if not candidates:
        return None
    # Shallowest manifest wins: a nested one belongs to a sub-package.
    return min(candidates, key=lambda n: (n.count("/"), len(n)))


def topics_from_manifest(zf: zipfile.ZipFile, manifest_path: str,
                         skipped: list[tuple[str, str]]) -> list[Topic]:
    """Walk <organizations> so topics come out in the order the course shows them."""
    root = ET.fromstring(zf.read(manifest_path))
    base = posixpath.dirname(manifest_path)
    assignments = load_assignments(zf)

    resources: dict[str, str] = {}
    for el in root.iter():
        if local(el.tag) != "resource":
            continue
        ident = el.get("identifier")
        if not ident:
            continue
        href = el.get("href")
        if not href:
            files = [f.get("href") for f in el if local(f.tag) == "file" and f.get("href")]
            html = [f for f in files if Path(norm_href(f)).suffix.lower() in HTML_EXTS]
            href = (html or files or [None])[0]
        if href:
            resources[ident] = norm_href(href)

    topics: list[Topic] = []
    counter = [0]

    def emit(title: str, module: list[str], ref: str) -> None:
        href = resources.get(ref)
        if not href:
            return  # a module header, not a topic

        if Path(href).suffix.lower() in HTML_EXTS:
            zip_path = posixpath.normpath(posixpath.join(base, href)) if base else href
            counter[0] += 1
            topics.append(Topic(counter[0], title or Path(href).stem, module, zip_path))
            return

        # A quicklink. If it points at an assignment folder, its instructions are
        # the exercise text; anything else (quiz, discussion) has no content here.
        m = QUICKLINK_RE.search(href)
        if m and m.group(1).lower() in assignments:
            name, instructions = assignments[m.group(1).lower()]
            counter[0] += 1
            topics.append(Topic(counter[0], title or name, module, "dropbox_d2l.xml",
                                kind="assignment", inline_html=instructions))
            return

        skipped.append((" > ".join(module + [title]), href))

    def walk(item: ET.Element, module: list[str]) -> None:
        title_el = next((c for c in item if local(c.tag) == "title"), None)
        title = (title_el.text or "").strip() if title_el is not None else ""
        ref = item.get("identifierref")
        if ref:
            emit(title, module, ref)
        child_module = module + [title] if title else module
        for child in item:
            if local(child.tag) == "item":
                walk(child, child_module)

    orgs = next((el for el in root.iter() if local(el.tag) == "organizations"), None)
    if orgs is not None:
        for org in orgs:
            if local(org.tag) != "organization":
                continue
            for item in org:
                if local(item.tag) == "item":
                    walk(item, [])

    return topics


def topics_from_filesystem(zf: zipfile.ZipFile) -> list[Topic]:
    """Fallback for a package with no usable manifest: every .html in the zip."""
    names = sorted(n for n in zf.namelist() if Path(n).suffix.lower() in HTML_EXTS)
    topics = []
    for i, name in enumerate(names, start=1):
        module = posixpath.dirname(name).split("/") if posixpath.dirname(name) else []
        topics.append(Topic(i, Path(name).stem, [m for m in module if m], name))
    return topics


# --------------------------------------------------------------------------
# Assets
# --------------------------------------------------------------------------


class AssetStore:
    """Copies images out of the zip, reusing anything already byte-identical in img/."""

    def __init__(self, zf: zipfile.ZipFile, img_dir: Path, dry_run: bool):
        self.zf = zf
        self.img_dir = img_dir
        self.dry_run = dry_run
        self.by_hash: dict[str, str] = {}
        self.taken: set[str] = set()

        if img_dir.is_dir():
            for existing in img_dir.iterdir():
                if existing.is_file():
                    self.taken.add(existing.name.lower())
                    self.by_hash.setdefault(sha1(existing.read_bytes()), existing.name)

        # Zip lookups: exact normalized path, and basename for last-resort matching.
        self.exact = {n.lower().lstrip("/"): n for n in zf.namelist()}
        self.by_base: dict[str, list[str]] = {}
        for n in zf.namelist():
            self.by_base.setdefault(posixpath.basename(n).lower(), []).append(n)

    def locate(self, ref: str, topic_dir: str) -> str | None:
        """Map a src value onto an entry in the zip, or None."""
        path = unquote(urlsplit(ref).path)
        if not path:
            return None

        candidates = []
        if path.startswith("/"):
            candidates.append(path.lstrip("/"))
            # /content/enforced/<orgunit>/labo1/x.png -> labo1/x.png
            m = re.search(r"/content/enforced/[^/]+/(.*)$", path)
            if m:
                candidates.append(m.group(1))
        else:
            joined = posixpath.normpath(posixpath.join(topic_dir, path)) if topic_dir else path
            candidates.append(joined.lstrip("./"))
            candidates.append(path)

        for cand in candidates:
            hit = self.exact.get(cand.lower())
            if hit:
                return hit

        # Suffix match: the export sometimes roots paths differently than the topic.
        for cand in candidates:
            tail = cand.lower()
            hits = [n for n in self.zf.namelist() if n.lower().endswith("/" + tail)]
            if len(hits) == 1:
                return hits[0]

        base = posixpath.basename(candidates[0]).lower()
        hits = self.by_base.get(base, [])
        return hits[0] if len(hits) == 1 else None

    def stage(self, entry: str, topic_title: str) -> tuple[str, bool]:
        """Copy entry into img/. Returns (filename, reused_existing)."""
        data = self.zf.read(entry)
        digest = sha1(data)
        if digest in self.by_hash:
            return self.by_hash[digest], True

        stem = Path(posixpath.basename(entry)).stem
        ext = Path(posixpath.basename(entry)).suffix.lower() or ".png"
        name = f"{slugify(topic_title)}-{slugify(stem, 'afbeelding')}{ext}"
        if len(name) > 80:
            name = name[: 80 - len(ext)] + ext
        n = 2
        while name.lower() in self.taken:
            name = f"{Path(name).stem}-{n}{ext}"
            n += 1

        if not self.dry_run:
            self.img_dir.mkdir(parents=True, exist_ok=True)
            (self.img_dir / name).write_bytes(data)
        self.taken.add(name.lower())
        self.by_hash[digest] = name
        return name, False


# --------------------------------------------------------------------------
# Page rewriting
# --------------------------------------------------------------------------


def decode(data: bytes) -> str:
    for enc in ("utf-8", "cp1252", "latin-1"):
        try:
            return data.decode(enc)
        except UnicodeDecodeError:
            continue
    return data.decode("utf-8", "replace")


def rewrite(html: str, topic: Topic, assets: AssetStore, img_prefix: str) -> str:
    topic_dir = posixpath.dirname(topic.zip_path)

    def repl(m: re.Match[str]) -> str:
        attr, quote, value = m.group(1), m.group(2), m.group(3)
        raw = value.strip()
        if not raw or raw.startswith(("#", "data:", "mailto:", "tel:", "javascript:")):
            return m.group(0)

        ext = Path(unquote(urlsplit(raw).path)).suffix.lower()
        looks_remote = raw.lower().startswith(("http://", "https://", "//"))
        if attr.lower() == "href" and ext not in IMAGE_EXTS:
            return m.group(0)
        if ext not in IMAGE_EXTS and not (looks_remote and "/content/enforced/" in raw):
            return m.group(0)

        entry = assets.locate(raw, topic_dir)
        if not entry:
            topic.unresolved.append(raw)
            return m.group(0)

        name, reused = assets.stage(entry, topic.title)
        if reused:
            topic.images_reused += 1
        else:
            topic.images_copied += 1
        return f'{attr}={quote}{img_prefix}{name}{quote}'

    return ATTR_RE.sub(repl, html)


def header(topic: Topic, img_prefix: str) -> str:
    module = " > ".join(topic.module) if topic.module else "(geen module)"
    unresolved = f"\n     unresolved: {len(topic.unresolved)} ({', '.join(topic.unresolved[:3])})" if topic.unresolved else ""
    return (
        "<!-- imported-from-brightspace\n"
        f"     title:  {topic.title}\n"
        f"     module: {module}\n"
        f"     order:  {topic.order}\n"
        f"     kind:   {topic.kind}"
        f"{'  (Brightspace assignment: needs an indienen section)' if topic.kind == 'assignment' else ''}\n"
        f"     source: {topic.zip_path}\n"
        f"     images: {topic.images_copied} copied, {topic.images_reused} reused, "
        f"rewritten to {img_prefix}*{unresolved}\n"
        "-->\n"
    )


def worklist(topics: list[Topic], outdir: Path) -> str:
    lines = [
        "# Import worklist",
        "",
        f"{len(topics)} topics staged from the Brightspace export. Convert each one with the",
        "orion-convert skill, then add its `exercises.js` / `reference.js` entry and run",
        "`bash scripts/check-content.sh`. Delete a row once its page lives under `LaboN/`.",
        "",
        "| # | Module | Titel | Soort | Staged | Afb. | Onopgelost |",
        "|---|---|---|---|---|---|---|",
    ]
    for t in topics:
        module = " &gt; ".join(t.module) if t.module else "-"
        imgs = t.images_copied + t.images_reused
        lines.append(
            f"| {t.order} | {module} | {t.title} | {t.kind} | [{t.staged_name}]({t.staged_name}) "
            f"| {imgs or '-'} | {len(t.unresolved) or '-'} |"
        )
    lines.append("")
    return "\n".join(lines)


# --------------------------------------------------------------------------


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("zip", type=Path, help="the Brightspace export .zip")
    ap.add_argument("--outdir", type=Path, default=REPO_ROOT / "_incoming",
                    help="where to stage the raw topic HTML (default: _incoming/)")
    ap.add_argument("--img-dir", type=Path, default=REPO_ROOT / "img",
                    help="where to copy course images (default: img/)")
    ap.add_argument("--img-prefix", default="../../img/",
                    help="what the rewritten src should point at (default: ../../img/, "
                         "correct for a page in LaboN/Exercises/)")
    ap.add_argument("--only", metavar="TEXT",
                    help="stage only topics whose module path or title contains TEXT "
                         "(case-insensitive), e.g. --only 'labo 2'")
    ap.add_argument("--dry-run", action="store_true", help="report only, write nothing")
    args = ap.parse_args()

    if not args.zip.is_file():
        print(f"import-brightspace: no such file: {args.zip}", file=sys.stderr)
        return 2

    with zipfile.ZipFile(args.zip) as zf:
        skipped: list[tuple[str, str]] = []
        manifest = find_manifest(zf)
        if manifest:
            topics = topics_from_manifest(zf, manifest, skipped)
            source = f"manifest {manifest}"
        else:
            topics = []
            source = ""
        if not topics:
            topics = topics_from_filesystem(zf)
            source = "filesystem scan (no usable manifest)"

        if not topics:
            print("import-brightspace: no HTML topics found in the package", file=sys.stderr)
            return 1

        total = len(topics)
        if args.only:
            needle = args.only.lower()
            topics = [t for t in topics
                      if needle in (" > ".join(t.module) + " " + t.title).lower()]
            skipped[:] = [s for s in skipped if needle in s[0].lower()]
            if not topics:
                print(f"import-brightspace: --only {args.only!r} matched none of "
                      f"{total} topics", file=sys.stderr)
                return 1
            source += f" (--only {args.only!r}: {len(topics)} of {total})"

        assets = AssetStore(zf, args.img_dir, args.dry_run)
        if not args.dry_run:
            args.outdir.mkdir(parents=True, exist_ok=True)

        seen: set[str] = set()
        for topic in topics:
            if topic.inline_html is not None:
                raw = topic.inline_html
            else:
                try:
                    raw = decode(zf.read(topic.zip_path))
                except KeyError:
                    topic.unresolved.append(f"(missing in zip: {topic.zip_path})")
                    topic.staged_name = "-"
                    continue

            body = BODY_RE.search(raw)
            content = body.group(1).strip() if body else raw.strip()
            content = rewrite(content, topic, assets, args.img_prefix)

            name = f"{topic.order:03d}-{slugify(topic.title)}.html"
            while name.lower() in seen:
                name = f"{Path(name).stem}-x.html"
            seen.add(name.lower())
            topic.staged_name = name

            if not args.dry_run:
                (args.outdir / name).write_text(header(topic, args.img_prefix) + content + "\n",
                                                encoding="utf-8")

        if not args.dry_run:
            (args.outdir / "WORKLIST.md").write_text(worklist(topics, args.outdir), encoding="utf-8")

    copied = sum(t.images_copied for t in topics)
    reused = sum(t.images_reused for t in topics)
    unresolved = [(t, r) for t in topics for r in t.unresolved]

    prefix = "would stage" if args.dry_run else "staged"
    assignments = sum(1 for t in topics if t.kind == "assignment")
    print(f"import-brightspace: {prefix} {len(topics)} topics from {source}")
    print(f"  -> {args.outdir}{'' if args.dry_run else '/ (+ WORKLIST.md)'}")
    print(f"  {len(topics) - assignments} content pages, {assignments} assignment descriptions")
    print(f"  images: {copied} copied into {args.img_dir}, {reused} reused (already in the repo)")

    if skipped:
        print(f"  {len(skipped)} items carried no importable HTML "
              f"(PDF/PPTX attachment, quiz, discussion, ...):")
        for title, href in skipped[:8]:
            print(f"    {title}  [{posixpath.basename(href.split('?')[0]) or href}]")
        if len(skipped) > 8:
            print(f"    ... and {len(skipped) - 8} more")

    if unresolved:
        print(f"  {len(unresolved)} image refs could not be resolved in the package:")
        for topic, ref in unresolved[:15]:
            print(f"    {topic.staged_name}: {ref}")
        if len(unresolved) > 15:
            print(f"    ... and {len(unresolved) - 15} more")
        print("  Those srcs were left as-is; check-content.sh will flag them.")

    if not args.dry_run and copied:
        print(f"  Remember to 'git add {args.img_dir.name}/' -- "
              "check-content.sh only accepts assets tracked by git.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
