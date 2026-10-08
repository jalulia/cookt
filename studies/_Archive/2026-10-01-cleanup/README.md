# Cleanup / 1 October 2026

Superseded, rejected and pre-D1 work moved out of the working folders. Nothing was deleted or overwritten. Each item sits here at its original relative path.

- `PLAN.md`: what stayed, what moved and why, and the renames still pending.
- `manifest.json`: one entry per moved or renamed item, with original path, new path, SHA-256 and size for every file, reason, and the references updated.
- `_emptied/`: the emptied earlier working folder (only a Finder file was left in it).
- `Branding/Hub/dist`, `Branding/Hub/internal-dist`: the v0.21.0 local hub builds, replaced by the v0.22.0 rebuild.

Renamed in this batch:

- `Claude Cookt Branding/Presentation-2026-10-01` → `Branding/Presentations/Brand-System-Deck-v001`
- `Claude Cookt Branding/Fronts-and-Dielines-2026-10-01` → `Branding/Documents/Sources/Fronts-and-Dielines-v001`
- `Branding/Applications/Review/2026-10-01/Review09` → `Branding/Applications/Web-Email-v009`

To restore an item, move it back to its `originalPath`, then rebuild the hub. `brand.json` history entries point here; `CHANGELOG.md`, `DECISIONS.md` and older manifests keep the original paths. `_Archive/2026-09-25-consolidation/` was not touched.

Final check before anything is removed: Julia.
