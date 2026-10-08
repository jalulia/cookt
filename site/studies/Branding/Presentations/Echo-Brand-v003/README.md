# COOKT / Echo visual identity v003

16 boards at 1920×1080. In review, local and unpublished. Echo/B remains selected; typography, color values and applications remain proposals.

Open `cookt-echo-brand-v003.html`. Arrow keys, Page Up/Down and Home/End navigate; F enters fullscreen. PDF and Print controls appear at the bottom right. Board 12 selects all four dishes; board 14 plays motion on request and honors reduced motion. Every board has an exact 1920×1080 PNG in `review/`, with a contact sheet and review index.

## Revision

Removed the ring/elbow pattern and diagonal fields. Clear mint #BDF2CB replaces sage, with deep green #06291C and vivid paprika #F04425. Narrow GT America dish headlines, sentence-case ABC Camera headings and quieter International details give the type separate roles. Food, full fields, crop, scale and the 01–04 menu index form the system. The physical studies show the campaign, exterior shipper and open box with all four supplied Echo fronts.

## Source and reuse

All marks come from the supplied Logo Deck Kit; the SVG derivatives change fills only. Existing R3 photography and native plate cutouts are reused. Blender scenes and print PDF masters are saved under `source/` and `../../Assets/Echo-Identity-v003/print/`. Product names and descriptions are read from `Branding/Documents/brand.json`. No new product claims were added. Existing pack review copy remains unverified. Box geometry and print dimensions are concepts, not vendor mechanics.

The portable asset kit is `../../Assets/Echo-Identity-v003/output/cookt-visual-system-v003.zip`: 18 SVG logos, 18 transparent PNGs, nine print PDFs, tokens, CSS and a system guide. Font binaries and internal source manifests are excluded. Confirm font licenses before deployment or distribution of the editable HTML dependencies.

## Rebuild and verification

Run `source/prepare.py`, `source/print_art.py`, `source/build.py`; render the physical scenes with Blender 3.6 and `source/render.py`. `source/export.mjs` exports the browser document; use the active ego-browser space ID for the session. `source/finalize.py` exports PNGs and compresses only PDF image streams, preserving live text and SVG paths. `source/package.py` builds the portable assets.

Two visual passes corrected the open-box carton orientation and framing, long-name fit, signature/caption spacing and mark clearance. Browser checks cover navigation, fonts, image loading, mobile presentation fit, all menu states and reduced-motion behavior. `review/` contains QA records; the output PDF is under 15 MB. The browser compositor capture was unavailable, so review PNGs were rendered from the uncompressed browser PDF. Internal sources and review notes are outside the presentation allowlist.
