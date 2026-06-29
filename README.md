# US Address Generator

A lightweight static website for generating realistic-format address test data for all 50 US states plus Nigeria, Egypt, Turkey, and Pakistan.

The site is built with Vite and deploys cleanly to Cloudflare Pages. No backend, database, or runtime API is required.

## Technical approach

- Static Vite app with browser-side generation.
- Data-driven US state pages generated from `src/data/states.js`.
- Small built-in datasets of city, ZIP Code / postal code, state / region, and phone area code combinations.
- Synthetic street addresses and names to avoid depending on real personal records.
- One-click copy with Clipboard API and a fallback copy path.
- Multilingual UI with English, Simplified Chinese, and Traditional Chinese.
- SEO and GEO basics: title, description, canonical URL, Open Graph, Twitter Card, FAQ content, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt`, and `llms-full.txt`.
- Optional MV3 browser extension under `extension/`, reusing the shared generator modules from `src/lib/generate.js`.

The referenced Worker projects use reverse geocoding and remote profile APIs. That is flexible, but it adds latency, rate-limit risk, privacy concerns, and runtime failure modes. For a Cloudflare Pages tool focused on deterministic QA data, curated static datasets are simpler and more reliable.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production output directory is:

```text
dist
```

The build runs `npm run generate` first, which refreshes the 50 state pages, `sitemap.xml`, `llms.txt`, and `llms-full.txt`.

## Browser extension

Build the shared files used by the extension:

```bash
npm run extension:build
```

Then open `chrome://extensions`, enable Developer mode, choose "Load unpacked", and select the `extension/` folder.

The extension supports popup generation, one-click copy, and best-effort filling of common address form fields on the active tab. Generated data is synthetic, not deliverable, and only for QA, testing, demos, and placeholders.

## Cloudflare Pages

Use these settings in Cloudflare Pages:

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 20 or newer

## Cloudflare Workers static assets

Pages is recommended for this project. If you prefer Workers static assets, the included `wrangler.toml` can be used after building:

```bash
npm run build
npx wrangler deploy
```

The production domain is configured as `https://usaddregen.com/` in `index.html`, `public/robots.txt`, and `public/sitemap.xml`.
