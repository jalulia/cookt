# COOKT / Echo brand v001

20-board HTML brand presentation, 1920 × 1080. Julia’s selected Echo (B) direction, primarily mint with paprika as a secondary expression. This develops the R3 website palette into a coherent working system. No cream slide grounds.

Open `cookt-echo-brand-v001.html`. Arrow keys, Home/End, Previous/Next and browser Print are supported. Optimized PDF (**11.09 MB**): `output/cookt-echo-brand-v001.pdf`. Every board is exported at 1920 × 1080 under `review/`, with `review/index.html` and `review/cookt-echo-contact-sheet-v001.jpg`.

## Contents

01 identity; 02 brand promise; 03 Echo monogram; 04 International; 05 mint/green; 06 paprika; 07 color rhythm; 08 horizontal/vertical signatures; 09 four-dish range; 10 masterbrand and dish color; 11 mint website; 12 paprika website; 13 mobile; 14 social; 15 email; 16 small signature; 17 print; 18 photography direction; 19 clear space; 20 closing identity.

## Sources and scope

Echo source SVG geometry is unchanged. Color-only variants come from `Branding/Assets/Echo-Identity-v001/`. The palette is sampled from source CSS, not screenshots: Mint #DCEBD5 / green #194B39 from Mint-Orzo-Update-v001/style.css; paprika #9B2D1F / cream #F6EFE4 from Smoked-Chili-Update-v002/index.html, both preserved in Digital-Review-v001/source. International regular and bold are reused from these sources. Photos are retained R3 studies, including generated lifestyle imagery; no new shoot or image generation is implied.

Pack fronts reuse the supplied Echo option renders. They preserve the existing review copy and dish colors, including pending product facts; they are not production masters. Flat Layouts v001 and historical packaging records are not silently rewritten. The interactive website/email studies live in `Branding/Applications/Echo-System-v001/`; they have no commerce backend or mailing integration.

## QA and rebuild

`source/export.mjs` reuses the review browser space (update its numeric ID when reopening), exports the 17-slide logo deck v003 and this 20-board deck, verifies navigation/fonts/images/mobile width, and prints application proofs. `source/finalize.py` renders every unoptimized browser PDF page to PNG, compresses only PDF raster streams, confirms live text, verifies color-only SVG derivatives and enforces a 15 MB PDF ceiling. Client-file allowlist and source QA are saved alongside the source and review outputs. Browser PDF is used for deterministic PNG rendering because compositor captures previously timed out.

Application proofs are full browser-PDF pages clipped to the first desktop/mobile viewport. Navigation and layout are separately checked in the live DOM. The presentation, photographs, copy and colors remain a design direction under review except the explicitly selected B/mint/paprika direction. Work is local and unpublished.
