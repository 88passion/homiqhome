# Property image intake workflow

## Main folders
- `_incoming/` — drop new property folders here first
- `_processed/` — properties already reviewed/used by Jarvis
- `_archive/` — older completed batches
- `_templates/` — templates and examples

## Recommended folder naming
Use one folder per property batch.

Examples:
- `bangna-house-2026-04`
- `ari-condo-rent-2026-04`
- `nakhonpathom-land-2026-04`

## Recommended image naming inside each property folder
Use numeric order so the cover image is obvious.

Examples:
- `01-cover.jpg`
- `02-front.jpg`
- `03-living-room.jpg`
- `04-bedroom-1.jpg`
- `05-kitchen.jpg`
- `06-bathroom.jpg`
- `07-map.jpg`

## What Jarvis expects from you
For each property, send:
- title/name of property
- purpose: buy or rent
- property type
- price
- province
- district
- short details / highlights
- exact folder path under `_incoming/`

Optional but useful:
- usable area
- land area
- bedrooms
- bathrooms
- parking
- map URL
- line message

## Example path
`/home/usertarnea/.openclaw/workspace/homiqhome/uploads/properties/_incoming/bangna-house-2026-04`

## Suggested workflow
1. Put images into a new folder inside `_incoming/`
2. Tell Jarvis the property details + folder name
3. Jarvis reviews images and prepares the property entry
4. After successful import/use, move batch to `_processed/`
