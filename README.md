# COOKT brand hub

Client-facing static release of the COOKT brand and packaging hub.

- `index.html` is the brand hub (Index, Brand, Packaging, Applications, Library). Its hash routes (`#/packaging`, `#/library/assets`, …) are unchanged.
- `studio/` is the Brand Studio presentation. Studio section links that were shared at the site root (`#range`, `#pack`, …) forward to `studio/`.
- `hub.html` forwards to the index, keeping its hash, so earlier hub links still resolve.
- `presentations/brand-system-2026-10-01/` is the October 1 brand system review as flattened boards plus its PDF (no font binaries).
- `assets/library-2026-10-01/` holds the October 1 retail fronts and the JRCP and Orzo dielines (v001) linked from the index and the library.

GitHub Pages deploys `site/` on pushes to `main`; the repository root mirrors it. Private records, editable artwork, font binaries and Drive-linked registers are excluded.
