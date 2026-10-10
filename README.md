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

The homepage hero draws Cale's real signature in the order he wrote it. The strokes
were captured from a video of him signing and live in `public/brand/signature-animated.svg`;
`public/script.js` loads it into the hero and replays it when you come back to the tab.
Visitors who prefer reduced motion see the static `public/brand/cale-bloskas-signature.svg`.
To speed it up or slow it down, scale the `animation-delay` values inside that SVG.

## Brand

Brand assets live in `public/brand/` and are served at `calebloskas.com/brand/...`.

| File | Use |
|---|---|
| `cale-bloskas-signature.svg` / `.png` | Cale's real signature (black ink; the site shows it white with a CSS filter) |
| `signature-animated.svg` | The same signature redrawn in the order the strokes were written; the hero loads it with `script.js` |
| `cb-monogram.svg` | Monogram roundel: the CB from Cale's monogram-style signature, white on navy with a gold ring |
| `cb-monogram-small.svg` / `-medium.svg` | Heavier strokes for small sizes (favicon and header / email) |
| `cb-monogram-open.svg`, `-open-reverse.svg`, `-open-gold.svg` | Monogram without the circle: navy, white or gold |
| `cb-monogram-1024.png`, `cb-monogram-128.png` | PNG versions (128 is used by the email signature) |
| `linkedin-banner.png` | LinkedIn background photo (1584×396) |
| `email-signature.html` | Email signature; install steps are in the file |

Colors: navy `#0B1F33` / `#102A43`, gold `#C9A96E` (use `#8A6D3B` for small gold text on light backgrounds), cream `#FAF9F6` / `#F2F0EB`, ink `#17212B`, muted `#56616D`.
Fonts: Georgia for headlines, Inter for everything else.
