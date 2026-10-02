# COOKT brand hub

Client-facing static release of the COOKT brand and packaging hub.

- `index.html` is the brand hub (Index, Brand, Packaging, Applications, Library). Its hash routes (`#/packaging`, `#/library/assets`, …) are unchanged.
- `studio/` is the Brand Studio presentation. Studio section links that were shared at the site root (`#range`, `#pack`, …) forward to `studio/`.
- `hub.html` forwards to the index, keeping its hash, so earlier hub links still resolve.

GitHub Pages deploys `site/` on pushes to `main`; the repository root mirrors it. Private records, editable artwork, font binaries and Drive-linked registers are excluded.
