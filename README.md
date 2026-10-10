# bloskas.us

Minimal professional website for Cale Bloskas.

## Cloudflare settings

- Production branch: `main`
- Build command: leave blank
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

## Updating the site

Edit the files inside `public/`, commit the changes to the `main` branch,
and Cloudflare will automatically deploy the update.


## Animated signature

The homepage now uses `public/cale-bloskas-signature.png` with a CSS handwriting
reveal. It is not a GIF, so it remains sharp and lightweight. Edit the animation
timing in the `.signature-reveal` and `.signature-pen` rules in `public/styles.css`.

## Images

| File | Used for |
|---|---|
| `public/cale-bloskas-headshot.jpg` | About section portrait (800×1000, 4:5) |
| `public/og-image.jpg` | Link preview on LinkedIn, iMessage, Slack, etc. (1200×630) |
| `public/apple-touch-icon.png` | Icon when the site is saved to a phone home screen (180×180) |
| `public/cale-bloskas-signature.png` | Hero signature (black ink + transparency; CSS turns it white) |

To swap the headshot, replace the file with a portrait photo of the same name,
ideally cropped to 4:5 and under ~300 KB.

## Brand

Brand assets live in `public/brand/` and are served at `calebloskas.com/brand/...`.

| File | Use |
|---|---|
| `cb-monogram.svg` | Monogram roundel (navy, white C, gold B) for large sizes |
| `cb-monogram-small.svg` | Same with heavier strokes for small sizes (favicon, header) |
| `cb-monogram-open.svg` / `-reverse.svg` | Monogram without the circle, for light / dark backgrounds |
| `cb-monogram-1024.png`, `cb-monogram-128.png` | PNG versions (128 is used by the email signature) |
| `linkedin-banner.png` | LinkedIn background photo (1584×396) |
| `email-signature.html` | Email signature; install steps are in the file |

Colors: navy `#0B1F33` / `#102A43`, gold `#C9A96E` (use `#8A6D3B` for small gold text on light backgrounds), cream `#FAF9F6` / `#F2F0EB`, ink `#17212B`, muted `#56616D`.
Fonts: Georgia for headlines, Inter for everything else.
