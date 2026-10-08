# COOKT current review — 1 October 2026

## Current files

- Retail artwork v012: 39 views, four native Illustrator documents.
- DTC sleeve artwork v013: 41 views, four native Illustrator documents. All fronts use 2100×1500 geometry, consistent two-line names, matched bowls and separate bottom information rows.
- Exact source wordmark, USA/halal badge and filled/outlined chili vectors. Current review ratings: Rasta 3, Blackened 2, Chipotle 1, Orzo none. Mockup protein value 48g; production facts remain unapproved.
- Retail photograph v008; matched DTC photo/type photographs v006. Prior crowded sleeves and under-title chili studies are excluded from active references.
- Plate collection: `_Photography/Plates/Rafiz-Collection-v001/`. Four source baselines, eight ceramic alternatives. Native originals and clearly labeled 4096px resampled/upscaled PNGs, with transparent WebP browser derivatives. Original source files are preserved; generated alternatives are proposals.
- Application Review08: styled desktop/mobile website and email views. Applications presents beauty shots; flat front/back/side views remain in Packaging.
- Three type/system comparison boards, six horizontal/vertical logo comparison SVGs, updated palette study.

## Verification

All eight Illustrator files saved/reopened with 80 total artboards and zero external image links. Manifest PNG/WebP exports are verified against current records. Plate images inspected on white and forest surfaces; gallery filters, keyboard/modal controls and mobile download layout checked. Public export has a separate image-only allowlist.

Run `python3 Branding/Hub/scripts/build.py`, then `python3 Branding/Hub/scripts/verify.py --hub-only` for current Hub scope. The full historical migration audit finds four missing references to two old images; details are in `archive-audit-exception.json`. These are not current-release dependencies and no archive paths were changed.

Published to https://jalulia.github.io/cookt/hub.html in commit `7b565a919bf6f93ee6df3417c8716ff5ae02eee2`. GitHub Actions deployment succeeded. `live-verification.json` confirms v0.19.0, exact staged manifest hash, and 11 live sections without missing images, runtime errors or overflow. `public-browser-qa.json` covers 22 desktop/mobile page states. Local source and Drive-linked handoff remain separate from public GitHub Pages.
