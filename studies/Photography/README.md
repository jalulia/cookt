# COOKT Photography register

The central editable register is `Branding/Documents/brand.json#photoLibrary`. This top-level folder collects **73 distinct** food, lifestyle and lit package images for review. The collection spans active Branding photography, older unique food concepts, application table photos, and usable historical package studies. The flat, poorly lit 3D carton runs, DTC cuboids, artwork panels, QA screenshots, scraped third-party references and `_Archive` are excluded. Five rejected, superseded or unselected lifestyle directions are in the private review and contact sheet but hidden from the hub gallery.

## Files and provenance

- `images/` contains one full web or source image per register entry; `thumbs/` and `atlas-v001.webp` are generated previews.
- `catalog.json` and `catalog-data.js` are generated from the central register. Each entry records its original relative source path, SHA-256, dimensions, status and Drive file ID.
- Source originals stay in their discipline folders because packaging artwork, the hub and presentation files depend on those paths. These are **review copies**, not competing masters. Moving the originals now would break those references. Exact duplicates within this collection are skipped by SHA-256.
- `COOKT-Photography-Contact-Sheet-v001.pdf` groups images by type, flavor and style and labels plate, use, orientation and status. Its final page lists proposed missing shots.

## Review workflow

Open `review.html` through a local server from the project root (`python3 -m http.server 8765` then `http://127.0.0.1:8765/Photography/review.html`). The page saves edits in that browser and exports `COOKT-Photography-Review-v001.json`. **Hide** removes an image from the visible gallery; **Remove** excludes it from the next gallery build. Neither action deletes a source file. Tags, groups, style, plate, flavor and product/lifestyle use can be edited. Importing a review JSON restores those edits on another browser.

To apply a returned review file (the register hash prevents a stale export from silently overwriting newer labels):

```sh
python3 Photography/scripts/apply_review.py /path/to/COOKT-Photography-Review-v001.json
python3 Photography/scripts/build.py
python3 Branding/Hub/scripts/build.py
```

To add images, upload them to the [private Drive folder](https://drive.google.com/drive/folders/1DtweRjB0jjKCGiqWpr71FnJV9-NKJYuV) or place them in `incoming/`. Drive additions need to be fetched into `incoming/` with the connected Drive tool before running `python3 Photography/scripts/inventory.py --refresh`. The review page links to the Drive folder; it does not request browser OAuth credentials. Confirm source ownership and usage rights before adding third-party references to a client gallery.

## Hub and Drive

The local hub route is `#/library/photography`. It draws the 68 currently visible images from a compact atlas, groups them, filters them, and makes a full-resolution ZIP of selected images while served from this project workspace. Individual files and a separate Drive collection are linked. The Drive folder remains private; changing audience access is a separate decision. A standalone/public hub cannot fetch project-local originals, so it exports selected Drive links there. The hub changes are locally built and reviewable; they have not been published to the public site.
