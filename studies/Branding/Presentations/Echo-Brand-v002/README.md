# COOKT / Echo visual identity v002

14-board visual system presentation. In review. Echo/B is selected; the color refinement and new applications are proposals.

Open `cookt-echo-brand-v002.html`. Arrow keys, Page Up/Down, Home/End navigate; F enters fullscreen. The PDF link downloads the export; Print uses the 1920×1080 page layout. All 14 boards are in `review/` with a contact sheet and index.

## Creative changes
Deeper green #082D20 and stronger mint #ACD2B3. Paprika #9B2D1F remains secondary. Cropped plate rims, a paired-rim repeat, diagonal fields, compact display type and close food framing form the graphic system. It is applied to campaign pieces, supplied launch packs, delivery box, printed matter and a digital concept.

## Sources and boundaries
Echo geometry comes from the supplied Logo Deck Kit. SVG derivatives change fills only. Existing R3 concept photographs and International fonts are reused. Four pack faces are the supplied Echo review fronts; printed product facts are not newly verified or approved. Native Blender scenes construct the three physical applications. Concept print masters have no vendor dieline or production approval.

## Rebuild
`source/build.py` builds the HTML. `source/print_art.py` builds vector print masters and textures from the project root. `source/render.py` renders the physical scenes in Blender 3.6. `source/export.mjs` exports via ego-browser (resume the active task space; update its ID for a new session). `source/finalize.py` renders every board at 1920×1080 and compresses only PDF raster images, preserving SVG paths and text. The portable asset kit is at `../../Assets/Echo-Identity-v002/output/cookt-visual-system-v002.zip`.

## Review evidence
`review/cookt-echo-browser-qa-v002.json` checks navigation, image/font loading and small-screen fit. `review/cookt-echo-source-qa-v002.json` records PDF, PNG and exact-mark checks. `source/cookt-echo-client-allowlist-v002.json` explicitly lists presentation dependencies. Internal sources, local paths and review notes are excluded from the portable packages. Nothing is published.
