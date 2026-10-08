# COOKT brand system review, October 1, 2026

25 boards in the S01 "Good Company" format (1440 x 900), build 4. The PDF has 27 pages: board 08 appears in deep green, mint and icy blue.

Build 4 swaps in the October 1 supplied fronts with heat set (Rasta 3, Blackened 2, Chipotle 1, Orzo none), adds the JRCP and Orzo dielines (boards 12–13), shows the corrected back (board 11), and re-renders the range, carton and freezer from the new fronts. Build 3 is archived under `_Archive/2026-10-01-cleanup/`.

## What to open

- `client/index.html` is the version to share. It shows flattened images of every board, and board 08 keeps its core-color switch. It contains no font files, source files, notes or local paths.
- `client/COOKT-Brand-System-2026-10-01.pdf` is the same deck as a PDF (raster pages, no embedded fonts).
- `deck/index.html` is the live working deck, built from `deck/source/`. It loads the NB International fonts from `deck/fonts/`. Keep it internal: brand.json withholds those font binaries from client builds until the license is documented.

## Sources

| Board | Content | Source |
|---|---|---|
| All | Colors, heat, names, brand line | `Branding/Documents/brand.json` v0.19.0; `Sources/2026-10-01-rafiz-review/RECONCILIATION.md` |
| 04, all | Wordmark | Exact D1 vector (`brand.json` packaging.fullHeightSignature) |
| 05 | Logo versions | `Presentations/System-Variations-v001/logo-review/assets/` (exact vectors; Original SVGs trimmed to ink bounds by viewBox only) |
| 06 | Type options | `System-Variations-v001` README and comparison plate |
| 03, 07, 17 | Bowls | Supplied baseline originals (`Sources/2026-10-01-rafiz-review/originals/`) |
| 04, 08–10, 15, 16, 19–23 | Retail fronts | `Sources/2026-10-01-rafiz-review/originals/Packaging Front 10.01.26.ai` with heat updated (`fronts-dielines-2026-10-01/`, script `deck/source/build_fronts_dielines.py`) |
| 14 | DTC fronts | With the bowl: the retail fronts. Type only: the same fronts with the bowl and its shadow removed |
| 11–13 | Back of pack, dielines | `COOKT-Rasta Pasta- dyeline.ai` pages 2 (Rasta) and 3 (Orzo), corrected: live copy, sentence-case brand line, heat, removed unverified paragraph and THE DISH heading |
| 15, 16 | Carton renders | Blender 5.2 Cycles, one shared carton mesh at 14 x 10 x 2; the October 1 fronts as textures; the Rasta carton carries the dieline top flap and right end panel; paper ground composited with one uniform gain. Scripts: `deck/source/render_cartons_r.py`, `deck/source/tonemap_renders.py` |
| 19, 21, 22 | Chile glyphs | `Artwork-v012/source/rafiz-heat-exact.svg` |
| 20, 21 | Freezer | Generated empty freezer with the exact October 1 fronts composited (`deck/source/build_freezer_r.py`) |

## Generated imagery (labeled on the boards as direction studies)

- `table-*.webp`: generated from the baseline bowl originals. The Chipotle scene was regenerated (v002) to keep the baseline food: golden rice, three thighs, corn and black beans to one side, red brushed rim.
- `rasta-fork.webp` (Brand-System-Studio-v002) and `rasta-yellow.webp` (Photography Direction-v002).
- None of these are evidence of recipe, portion or final photography.

## Rebuild

```
python3 deck/source/build_deck.py      # live deck
python3 deck/source/build_client.py    # flattened client viewer + PDF
```

## Checks run

- Fact audit and art-direction review against brand.json, the reconciliation notes, comments and the S01 reference (`deck/qa/`), two rounds, then an independent verification of every round-two item.
- US English and US dates; brand line without a terminal period; no ink or black-and-white route; no personal names in client copy.
