# US Tax-Free State Address Generator

A lightweight static website for generating realistic-format US address test data for the five states with no statewide sales tax:

- Delaware
- Montana
- New Hampshire
- Oregon
- Alaska

The site is built with Vite and deploys cleanly to Cloudflare Pages. No backend, database, or runtime API is required.

## Technical approach

- Static Vite app with browser-side generation.
- Small built-in dataset of city, ZIP Code, state, and phone area code combinations.
- Synthetic street addresses and names to avoid depending on real personal records.
- One-click copy with Clipboard API and a fallback copy path.
- Multilingual UI with English, Simplified Chinese, and Traditional Chinese.
- SEO basics: title, description, canonical URL, Open Graph, Twitter Card, FAQ content, `robots.txt`, and `sitemap.xml`.

The referenced Worker projects use reverse geocoding and remote profile APIs. That is flexible, but it adds latency, rate-limit risk, privacy concerns, and runtime failure modes. For a Cloudflare Pages tool focused only on five states, a curated static dataset is simpler and more reliable.

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
