# COOKT logo presentation · v002

Round 1 notes and Julia’s color override applied within v002. 17 slides, 1920 × 1080. In review; unpublished. v001 remains the first-pass reference. No logo selection or production approval inferred.

Open `cookt-logo-deck-v002.html` in a browser. Navigate with Left/Right arrows, Page Up/Down, Home/End, or swipe. Move the pointer to reveal navigation and PDF controls. Download the optimized PDF with **Download PDF**. Browser **Print / PDF** prints all slides but may produce a larger file than the optimized export.

Review: `review/index.html` contains every slide. PNGs are `review/cookt-slide-01-v002.png` through `review/cookt-slide-17-v002.png`. The contact sheet is `review/cookt-contact-sheet-v002.jpg`. PDF: `output/cookt-logo-deck-v002.pdf` (**4.09 MB**).

## Slides and revisions

| # | Subject | v002 treatment |
|---|---|---|
| 01 | Cover | Original composition retained; caption 24 px |
| 02 | Pack system | “The pack system is in place. The mark is the last open piece.” Four fronts anchored to the bottom edge |
| 03 | Mineral water feedback | Original specimen retained; caption 24 px |
| 04 | V3 vertical reading | Matching crop from the exact vertical SVG, replacing the soft WebP |
| 05 | Two O's. Two plates. | Equation; each O outer diameter and bowl rim width is 360 px; common visual rim/O center axis |
| 06 | K/T detail | Original crop retained; 24 px caption at the shared bottom-left position |
| 07 | C construction | Supplied `construction-served-k-v002.svg`; C height 860 px |
| 08 | Option A · Served | Full wordmark inside 120 px side margins |
| 09 | Option B · Echo | Full wordmark inside 120 px side margins |
| 10 | A/B comparison | A cream on green, B cream on Blackened; equal geometric scale |
| 11 | Vertical comparison | “Stacked, the C stays a C.” |
| 12 | A range | Exact supplied fronts; identical bottom placement to slides 2 and 13 |
| 13 | B range | Exact supplied fronts; identical bottom placement to slides 2 and 12 |
| 14 | Freezer | Three-quarter perspective, one warm soft upper-left key, optical depth of field, patchy shelf-edge frost, no handle |
| 15 | Small applications | Phone home screen, browser favicon and social avatar on one baseline. 60 px app tile; actual 16 px favicon and nearest-neighbor 4× inset; 48 px avatar. Sleeve removed |
| 16 | Recommendation | Two supplied lines only; shared caption position |
| 17 | Next | Three action lines at 64 px headline size |

## Color override

Deep green is the primary ground; no slide uses cream as its field. Slides 1/8/12/15/16 are green; 2/7 Rasta; 3/11 Orzo; 4/13 Chipotle; 6/9/17 Blackened. Slides 5/10 split green and Blackened. Slide 14 retains the existing render. Marks and captions are cream on dark grounds and green on Orzo; the V3 comparison is 35% opacity. Application object surfaces use Orzo and dish colors within the green slide.

Caption contrast is checked against each local ground in `review/cookt-color-qa-v002.json`. Cream on Blackened is 4.31:1; all other caption pairs exceed 10:1. Captions are 24 px regular (large text threshold: 3:1).

## Craft and source integrity

Original supplied mark SVGs remain byte-identical. Two presentation derivatives change only V3’s fill to cream and the construction C/dash colors to cream, with dashes at 40% opacity. All paths, transforms, viewBoxes and stroke geometry remain exact. Details use CSS cropping of the source vectors. The A/B pair scale is identical despite their differing widths. Narrative captions are 24 px, 120 px from the left and bottom. Comparative labels use the same bottom inset within their respective columns/halves.

The plate cutouts remain proportional and retain their source camera angle. Each 360 px rim width matches a 360 px O outer diameter. The bowls' rim midlines, rather than the deeper bowls' lower bases, align with the O centerline.

The freezer uses exact supplied A front textures. The camera is perspective, with a physical focal distance and f/3.2 aperture; cartons recede into the cabinet behind the front row. Frost is a thin, patchy material at the shelf lip. Geometry remains relative presentation proportions, not a supplier mechanical. The phone/browser/social examples are designed application studies, not screenshots of live accounts or released products.

The PDF retains vector marks and live text. Only embedded images are optimized, with high-resolution images downsampled to 110 dpi and JPEG quality 88. This exceeds the deck's approximately 96 dpi screen-equivalent resolution. The finalizer asserts 17 pages, unchanged extracted text and a file size below 15,000,000 bytes. Exact results are in `review/cookt-source-qa-v002.json`.

## Rebuild and QA

`source/render.py` generates the physical freezer with Blender 3.6. `source/export.mjs` prints the PDF through the review browser and measures layout/navigation. `source/finalize.py` renders all 17 unoptimized browser-PDF pages to 1920 × 1080 PNGs before optimizing PDF images. This avoids the browser compositor screenshot timeout encountered during this color pass. `source/finalize.py` optimizes the PDF, creates the review viewer/contact sheet, verifies source SVG identity and the authorized color-only derivatives and writes the client-file allowlist. Run from the Cookt project root and update the browser space ID when resuming in a new session.

`review/cookt-browser-qa-v002.json` records image/font loading, keyboard navigation, mobile scaling and measured slide geometry. `review/cookt-source-qa-v002.json` records source identity, PNG dimensions, PDF size and text preservation. PDF-rendered spot checks are included for the plate equation, construction, freezer and small applications.

Internal: README, scripts, Blender scenes, logs, provenance, QA and review files. Client material is limited to the explicit allowlist in `source/cookt-client-allowlist-v002.json`. Nothing has been published or transmitted to the client.
