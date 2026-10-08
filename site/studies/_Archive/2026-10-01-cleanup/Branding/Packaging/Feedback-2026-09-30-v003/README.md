# COOKT / Packaging image review v003

30 September 2026 · Internal design review · In review

Drive review collection: [Packaging feedback images — v003, 48g review](https://drive.google.com/drive/folders/1aSOm3QTCvjqNPpb6ORjY8X8NktYrBtxA). It contains 37 selected PNGs in five numbered folders plus a Start Here index. [Upload record](qa/drive-upload.json) holds the verified Drive IDs and folder map.

This is an image series, not a print mechanical or presentation. The exact D1 wordmark geometry and current four-product names come from the existing native fronts. The generated food studies are isolated and then placed into those fronts. `48g` is Julia's global review value; product-specific nutrition verification remains open. `NET WT. XX OZ (XXX g)` remains intentionally unconfirmed.

The shared project also contained a separate v009 packaging branch showing 62g. This brief's direct 48g instruction is newer; it governs this image series. The native branch is being reconciled separately, so these images remain internal and distinct from that mechanical artwork.

## Lead images

| View | File |
|---|---|
| Lit four-pack range on ivory/cobalt tile | [Tile range](output/cookt-retail-tile-v003.png) |
| Four retail front artworks | [Retail range](output/retail-front-range-v003.png) |
| Four DTC sleeves with food | [DTC photo range](output/dtc-photo-range-v003.png) |
| Four type-only DTC sleeves | [DTC type range](output/dtc-type-range-v003.png) |
| Four working backs | [Back range](output/retail-back-range-v003.png) |
| Rasta on-pack dish-name type test | [Type comparison](output/rasta-type-comparison-v003.png) |

## Individual images

| Dish | Retail front | DTC photo | DTC type | White carton | Working back | Working side |
|---|---|---|---|---|---|---|
| Jamaican Rasta Chicken Pasta | [Front](output/rasta-retail-v003.png) | [Photo](output/rasta-dtc-photo-outlined-v003.png) | [Type](output/rasta-dtc-type-outlined-v003.png) | [Carton](output/rasta-white-carton-v003.png) | [Back](output/rasta-back-v003.png) | [Side](output/rasta-side-v003.png) |
| Creamy Blackened Chicken Pasta | [Front](output/blackened-retail-v003.png) | [Photo](output/blackened-dtc-photo-outlined-v003.png) | [Type](output/blackened-dtc-type-outlined-v003.png) | [Carton](output/blackened-white-carton-v003.png) | [Back](output/blackened-back-v003.png) | [Side](output/blackened-side-v003.png) |
| Lemon Chicken Orzo | [Front](output/orzo-retail-v003.png) | [Photo](output/orzo-dtc-photo-outlined-v003.png) | [Type](output/orzo-dtc-type-outlined-v003.png) | [Carton](output/orzo-white-carton-v003.png) | [Back](output/orzo-back-v003.png) | [Side](output/orzo-side-v003.png) |
| Chipotle Chicken with Corn | [Front](output/chipotle-retail-v003.png) | [Photo](output/chipotle-dtc-photo-outlined-v003.png) | [Type](output/chipotle-dtc-type-outlined-v003.png) | [Carton](output/chipotle-white-carton-v003.png) | [Back](output/chipotle-back-v003.png) | [Side](output/chipotle-side-v003.png) |

Additional physical views: [studio](output/cookt-retail-studio-v003.png), [warm table](output/cookt-retail-table-v003.png), [overhead](output/cookt-retail-overhead-v003.png).

## Scope and provenance

- Rasta retains the supplied bowl and adds no new food generation. Blackened removes blue. Orzo uses a continuous cobalt rim and a new food rendering. Chipotle retains a deep umber ceramic with a visible warm edge, corn and black beans.
- Photo/type fronts are raster exports from versioned SVGs; outlined DTC files preserve the intended NB International Pro forms in this environment. The type comparison is an exploratory Lexend dish-name variation on the Rasta type-only sleeve; it is not a brand selection.
- The working backs and sides carry existing FPO nutrition, heating, ingredients, origin and certification details. Their content is not a verified production specification. The four `48g` back nutrition entries are visual review placeholders only.
- Source lineage and hashes: [manifest](manifest.json). Generation wording and iteration notes: [prompts](qa/generation-prompts.md). [Brand and food specialist review](qa/specialist-review.md) records the per-bowl and placement checks. The `source/` directory contains the artwork builders, SVGs and Blender scenes.
- This folder is internal only. Nothing here has been added to the client hub or public release.

## Next decision

Review the four bowls at full resolution against actual plated product, including Orzo grain/chicken scale and Chipotle rice/corn details. Then select the final photo/type sleeve treatment, secondary accents and dish-name type. Obtain product-specific nutrition, net weight, heating, ingredients, certification and supplier production facts before mechanical release.
