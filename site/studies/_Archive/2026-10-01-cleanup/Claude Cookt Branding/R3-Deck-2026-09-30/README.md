# COOKT · Round 03 build · 30 Sep 2026

Deck for Friday 2 Oct, plus every source it uses. Google Slides copy lives in Drive › COOKT › Client Presentations & Deliverables › Decks. Working files are in Drive › COOKT › Creative › R3 · Friday Build.

The connected Rasta carton shown in `drive/b-pack/COOKT-R3-flat-carton-rasta.jpg` has an Illustrator-openable vector reconstruction at `packaging/COOKT-R3-flat-carton-rasta-editable.ai`. It is PDF-compatible artwork assembled from the original vector panel PDF by `packaging/build_flat_rasta.py`; text and shapes remain editable as vector objects, and the bowl photograph is embedded. This is historical R3 review art, with the draft claims and placeholder nutrition documented below.

| Folder | Holds |
|---|---|
| `deck/` | `COOKT-Round-03.pptx`, the file that was converted to Google Slides |
| `packaging/pdf/` | One PDF per dish, vector with live type: front (NB International), back (blurb), back (bullets), side A, side B, side D, right end (bowl wrap), left end, DTC type-only sleeve, front in Lexend. Pages are 2100 × 1500 px units; scale to a 7.75 in front for print size |
| `packaging/png/` | Every panel as a flat PNG, flat cartons (`dieline-*`), DTC sleeve mocks on the tray (`tray-*`), heat scale, heating icons, type boards |
| `packaging/html-source/` | HTML that renders each panel, plus `tools/` (generator: `brand.py`, `panels.py`, `back.py`, `typeboards.py`). Paths point to the build machine; use the PNG/PDF files for work |
| `web/` | Homepage D1 and D2 (desktop, mobile, D2 strip) and the two launch emails as JPG, with their HTML |
| `tool/` | `cookt-system-swap.html`: swap brand color (4), type system (3) and dish (4); pack, homepage hero and email update together. Open in Chrome; keep `fonts/` and `img/` beside it |
| `briefs/` | Render briefs R-01 to R-10 with ChatGPT prompts |
| `selects/` | The 34 image selects, named as in the deck appendix |
| `drive/` | The exact files uploaded to Drive, grouped by batch |

## What is working data, not product data
- Protein 48g, net weight 15.6 oz (443 g) and 720 cal / 43g fat / 31g carbs come from the pack copy doc. Other nutrition values are X.
- Ingredients are from the same-name DTC dishes on getcookt.com (observed 25 Sep). Orzo's is bracketed.
- Bowl art on every front is the Round 02 plate; R-03 to R-06 brief the replacements.
- The halal badge is a placeholder; the USDA inspection legend and UPC are FPO.

## Colors
Dish fields: Rasta #10301F (+ Scotch bonnet #F2B43C), Blackened #CB3D25 (+ cast-iron #2B2521, alt Creole green #3E6B47), Orzo #F2E5A3 / ink #1B2868 (+ rich blue #1F3C9A), Chipotle #351B13 (+ adobo red #C0412A, alt corn #E9B23A).
Brand D1: COOKT Green #1D4A36, Ivory #F5EDD9, Paper #F7F3EA, Mint #DCE9D6, Ink #16211B.
Brand D2: Smoked Chili #9B2D1F, Char #2A1511, Butter #F2D48A (accent only), Paper #F6EFE4.
