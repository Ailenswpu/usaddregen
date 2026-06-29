import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SOURCE_NOTES, STATES, TAX_FREE_STATE_ABBRS } from "../src/data/states.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const siteUrl = "https://usaddregen.com";
const lastmod = "2026-06-29";
const adsClient = "ca-pub-4423552696854564";

const staticUrls = [
  { loc: "/", priority: "1.0", changefreq: "monthly", alternates: true },
  { loc: "/?lang=zh-CN", priority: "0.9", changefreq: "monthly", alternates: true },
  { loc: "/?lang=zh-TW", priority: "0.9", changefreq: "monthly", alternates: true },
  { loc: "/state/", priority: "0.8", changefreq: "monthly" },
  { loc: "/about/", priority: "0.5", changefreq: "yearly" },
  { loc: "/blog/", priority: "0.6", changefreq: "monthly", blogAlternates: true },
  { loc: "/blog/zh-CN/", priority: "0.6", changefreq: "monthly", blogAlternates: true },
  { loc: "/blog/zh-TW/", priority: "0.6", changefreq: "monthly", blogAlternates: true },
  { loc: "/blog/nomad-states-explained.html", priority: "0.7", changefreq: "monthly", nomadAlternates: true },
  { loc: "/blog/zh-CN/nomad-states-explained.html", priority: "0.7", changefreq: "monthly", nomadAlternates: true },
  { loc: "/blog/zh-TW/nomad-states-explained.html", priority: "0.7", changefreq: "monthly", nomadAlternates: true },
  { loc: "/blog/avs-and-zip-validation.html", priority: "0.7", changefreq: "monthly", avsAlternates: true },
  { loc: "/blog/zh-CN/avs-and-zip-validation.html", priority: "0.7", changefreq: "monthly", avsAlternates: true },
  { loc: "/blog/zh-TW/avs-and-zip-validation.html", priority: "0.7", changefreq: "monthly", avsAlternates: true },
  { loc: "/privacy.html", priority: "0.3", changefreq: "yearly" }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function percent(rate) {
  return `${Number(rate).toFixed(Number.isInteger(rate) ? 0 : 3).replace(/0+$/, "").replace(/\.$/, "")}%`;
}

function fullUrl(path) {
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

function pageShell({ title, description, canonical, ogType = "article", jsonLd = [], body }) {
  const jsonLdScripts = jsonLd
    .map((entry) => `<script type="application/ld+json">\n${JSON.stringify(entry, null, 2)}\n</script>`)
    .join("\n    ");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="stylesheet" href="/page.css" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:site_name" content="US Address Generator" />
    <meta property="og:image" content="${siteUrl}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@ailenswpu" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${siteUrl}/og-image.png" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}"
         crossorigin="anonymous"></script>
    ${jsonLdScripts}
  </head>
  <body>
${body}
  </body>
</html>
`;
}

function stateMeta(state) {
  const isTaxFree = TAX_FREE_STATE_ABBRS.includes(state.abbr);
  const taxText = state.salesTax.statewide === 0 ? "0% statewide sales tax" : `${percent(state.salesTax.statewide)} statewide base sales tax`;
  return { isTaxFree, taxText };
}

function stateCard(state) {
  const { taxText } = stateMeta(state);
  const cityNames = state.cities.map((city) => city.name).join(", ");
  return `<a class="state-card" href="/state/${state.slug}/">
          <h2>${escapeHtml(state.name)} (${state.abbr})</h2>
          <p class="state-meta">ZIP ${escapeHtml(state.zipPrefixes.join(", "))}xxx &middot; ${escapeHtml(state.areaCodes.slice(0, 4).join(" / "))} area code${state.areaCodes.length > 1 ? "s" : ""} &middot; ${escapeHtml(taxText)}</p>
          <p>${escapeHtml(cityNames)}. ${escapeHtml(state.salesTax.note)}</p>
        </a>`;
}

function stateIndexPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteUrl}/state/#collection`,
      name: "US State Address Generators",
      url: `${siteUrl}/state/`,
      description: "Browse all 50 US state address generator pages with matched city, ZIP code, statewide sales-tax notes, and area-code data.",
      hasPart: STATES.map((state) => ({
        "@type": "WebPage",
        name: `${state.name} Address Generator`,
        url: `${siteUrl}/state/${state.slug}/`
      }))
    },
    breadcrumb(["Home", "States"])
  ];

  const taxFreeCards = STATES.filter((state) => TAX_FREE_STATE_ABBRS.includes(state.abbr)).map(stateCard).join("\n        ");
  const allCards = STATES.map(stateCard).join("\n        ");

  const body = `    <main class="page page-wide">
      <nav class="page-header" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <span>States</span>
      </nav>

      <h1>US State Address Generators</h1>
      <p class="meta">
        Browse all 50 state-specific random address generators. Each page uses a small static
        dataset with real city, ZIP, area-code, and statewide sales-tax notes. Street lines are
        synthetic and intended only for QA, testing, demos, and placeholder records.
      </p>

      <h2>No-sales-tax states</h2>
      <div class="state-grid">
        ${taxFreeCards}
      </div>

      <h2>All 50 states</h2>
      <div class="state-grid compact-state-grid">
        ${allCards}
      </div>

      <h2>Dataset source notes</h2>
      <ul>
        <li>${escapeHtml(SOURCE_NOTES.zipPrefixes)}</li>
        <li>${escapeHtml(SOURCE_NOTES.areaCodes)}</li>
        <li>${escapeHtml(SOURCE_NOTES.salesTax)}</li>
        <li>${escapeHtml(SOURCE_NOTES.cities)}</li>
      </ul>

      ${disclaimer()}
      ${footer()}
    </main>`;

  return pageShell({
    title: "US State Address Generators | All 50 States With ZIP, Area Code & Sales Tax Notes",
    description: "Browse all 50 US state random address generator pages. Includes state-matched city, ZIP code, phone area code, and statewide sales-tax notes for testing and demos.",
    canonical: `${siteUrl}/state/`,
    ogType: "website",
    jsonLd,
    body
  });
}

function statePage(state) {
  const { isTaxFree, taxText } = stateMeta(state);
  const cityRows = state.cities
    .map((city) => `<tr><td>${escapeHtml(city.name)}</td><td>${escapeHtml(city.zips.join(", "))}</td><td>Real city and ZIP pair used by the generator dataset.</td></tr>`)
    .join("\n          ");
  const related = relatedStates(state)
    .map((item) => `<li><a href="/state/${item.slug}/">${escapeHtml(item.name)} address generator</a></li>`)
    .join("\n          ");

  const description = `${state.name} (${state.abbr}) random address generator with matched city, ZIP code, phone area code, and ${taxText}. Built for QA, form testing, demos, and seed data.`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteUrl}/state/${state.slug}/#webpage`,
      name: `${state.name} Address Generator`,
      url: `${siteUrl}/state/${state.slug}/`,
      description,
      datePublished: "2026-06-26",
      dateModified: lastmod,
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@type": "AdministrativeArea", name: `${state.name}, United States` }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqForState(state)
    },
    breadcrumb(["Home", "States", state.name], `/state/${state.slug}/`)
  ];

  const body = `    <main class="page">
      <nav class="page-header" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/state/">States</a>
        <span>/</span>
        <span>${escapeHtml(state.name)}</span>
      </nav>

      <h1>${escapeHtml(state.name)} Address Generator</h1>
      <p class="meta">State code: ${state.abbr} &middot; ZIP prefixes: ${escapeHtml(state.zipPrefixes.join(", "))} &middot; Area code${state.areaCodes.length > 1 ? "s" : ""}: ${escapeHtml(state.areaCodes.join(" / "))} &middot; ${escapeHtml(taxText)}</p>

      <p>
        Use this ${escapeHtml(state.name)} address generator when you need realistic-format test
        data for checkout forms, tax-engine tests, QA scripts, UI demos, or seed records. The
        generator pairs a real ${escapeHtml(state.abbr)} city with one of its real ZIP codes and
        a phone area code used in the state, then combines those fields with a synthetic street
        line.
      </p>

      <p>
        <a class="cta" href="/?state=${state.abbr}">Generate a ${escapeHtml(state.name)} address</a>
      </p>

      <h2>${escapeHtml(state.name)} sales-tax background</h2>
      <p>
        <strong>${escapeHtml(taxText)}.</strong> ${escapeHtml(state.salesTax.note)} This page is
        an address-format testing utility and not tax advice. If your application needs official
        tax calculation, use a tax engine or the state's current tax-agency documentation.
      </p>
      <p>${escapeHtml(state.incomeTaxNote)}</p>

      <h2>Cities and ZIP codes in this dataset</h2>
      <p>
        The dataset keeps city, state, and ZIP internally consistent. ZIP examples are intentionally
        small so the static site stays fast and easy to audit.
      </p>
      <table>
        <thead><tr><th>City</th><th>ZIP codes</th><th>Notes</th></tr></thead>
        <tbody>
          ${cityRows}
        </tbody>
      </table>

      <h2>Data sources and verification</h2>
      <table>
        <tbody>
          <tr><th>ZIP prefixes and city ZIP examples</th><td>${escapeHtml(SOURCE_NOTES.zipPrefixes)}</td></tr>
          <tr><th>Area codes</th><td>${escapeHtml(SOURCE_NOTES.areaCodes)}</td></tr>
          <tr><th>Statewide sales-tax rate</th><td>${escapeHtml(SOURCE_NOTES.salesTax)}; ${escapeHtml(state.salesTax.note)}</td></tr>
          <tr><th>Last verified</th><td>${escapeHtml(state.salesTax.lastVerified)}</td></tr>
        </tbody>
      </table>

      <h2>Common use cases</h2>
      <ul>
        <li>Checkout and tax-engine test fixtures that need a predictable ${escapeHtml(state.abbr)} shipping state.</li>
        <li>Form-validation tests for city, state, ZIP code, and phone-area-code combinations.</li>
        <li>Mock customer records, design prototypes, documentation screenshots, and seed data.</li>
      </ul>

      <h2>Important caveats</h2>
      <p>
        The street number and street name are synthetic. The output is not deliverable and is not
        meant to pass USPS, AVS, bank, telecom, government, or shipping verification. For why this
        happens, read the <a href="/blog/avs-and-zip-validation.html">AVS and ZIP validation explainer</a>.
      </p>

      <h2>Related state generators</h2>
      <ul>
        ${related}
      </ul>

      ${isTaxFree ? `<p><a href="/blog/nomad-states-explained.html">Learn why ${escapeHtml(state.name)} is part of the NOMAD no-sales-tax state group.</a></p>` : ""}
      ${disclaimer()}
      ${footer()}
    </main>`;

  return pageShell({
    title: `${state.name} Address Generator | Random ${state.abbr} Test Addresses With ZIP & Area Code`,
    description,
    canonical: `${siteUrl}/state/${state.slug}/`,
    jsonLd,
    body
  });
}

function faqForState(state) {
  return [
    {
      "@type": "Question",
      name: `Is this ${state.name} address real?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `No. It is realistic-format synthetic data. The city, state, ZIP, and area code are matched from the ${state.name} dataset, but the street line is not verified or deliverable.`
      }
    },
    {
      "@type": "Question",
      name: `What is the statewide sales tax in ${state.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${state.name} statewide base sales-tax note: ${state.salesTax.note} The value was last reviewed on ${state.salesTax.lastVerified}.`
      }
    },
    {
      "@type": "Question",
      name: `What can a ${state.name} test address be used for?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use it for legal QA workflows such as form validation, checkout demos, tax-engine tests, mock customer records, design prototypes, documentation screenshots, and seed data."
      }
    }
  ];
}

function relatedStates(state) {
  const index = STATES.findIndex((item) => item.slug === state.slug);
  const picked = [];
  for (let offset = 1; picked.length < 4; offset += 1) {
    picked.push(STATES[(index + offset) % STATES.length]);
  }
  return picked;
}

function breadcrumb(names, currentPath = "/state/") {
  const items = [
    { name: "Home", item: `${siteUrl}/` },
    { name: "States", item: `${siteUrl}/state/` }
  ];
  if (names.length > 2) items.push({ name: names[2], item: `${siteUrl}${currentPath}` });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
}

function disclaimer() {
  return `<section class="notice" aria-label="Usage disclaimer">
        <h2>Usage disclaimer</h2>
        <p>
          Synthetic, realistic-format only. Not deliverable. Will fail real USPS, AVS, bank,
          telecom, government, or shipping verification. For QA, testing, demos, and placeholder
          data only. Not for fraud, account abuse, identity claims, or rule evasion.
        </p>
      </section>`;
}

function footer() {
  return `<footer class="page-footer">
        <p>
          <a href="/">Home</a>
          &nbsp;&middot;&nbsp;
          <a href="/state/">States</a>
          &nbsp;&middot;&nbsp;
          <a href="/blog/">Blog</a>
          &nbsp;&middot;&nbsp;
          <a href="/about/">About</a>
          &nbsp;&middot;&nbsp;
          <a href="/privacy.html">Privacy</a>
          &nbsp;&middot;&nbsp;
          <a href="mailto:support@usaddregen.com?subject=usaddregen.com%20-%20Contact">Contact</a>
        </p>
      </footer>`;
}

function sitemapUrl(entry) {
  const alternates = [];
  if (entry.alternates) {
    alternates.push(
      `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/" />`,
      `<xhtml:link rel="alternate" hreflang="zh-CN" href="${siteUrl}/?lang=zh-CN" />`,
      `<xhtml:link rel="alternate" hreflang="zh-TW" href="${siteUrl}/?lang=zh-TW" />`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`
    );
  }
  if (entry.blogAlternates) {
    alternates.push(
      `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/blog/" />`,
      `<xhtml:link rel="alternate" hreflang="zh-CN" href="${siteUrl}/blog/zh-CN/" />`,
      `<xhtml:link rel="alternate" hreflang="zh-TW" href="${siteUrl}/blog/zh-TW/" />`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/blog/" />`
    );
  }
  if (entry.nomadAlternates) {
    alternates.push(
      `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/blog/nomad-states-explained.html" />`,
      `<xhtml:link rel="alternate" hreflang="zh-CN" href="${siteUrl}/blog/zh-CN/nomad-states-explained.html" />`,
      `<xhtml:link rel="alternate" hreflang="zh-TW" href="${siteUrl}/blog/zh-TW/nomad-states-explained.html" />`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/blog/nomad-states-explained.html" />`
    );
  }
  if (entry.avsAlternates) {
    alternates.push(
      `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/blog/avs-and-zip-validation.html" />`,
      `<xhtml:link rel="alternate" hreflang="zh-CN" href="${siteUrl}/blog/zh-CN/avs-and-zip-validation.html" />`,
      `<xhtml:link rel="alternate" hreflang="zh-TW" href="${siteUrl}/blog/zh-TW/avs-and-zip-validation.html" />`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/blog/avs-and-zip-validation.html" />`
    );
  }

  return `  <url>
    <loc>${fullUrl(entry.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
    ${alternates.join("\n    ")}
  </url>`;
}

function sitemap() {
  const stateUrls = STATES.map((state) => ({
    loc: `/state/${state.slug}/`,
    priority: TAX_FREE_STATE_ABBRS.includes(state.abbr) ? "0.8" : "0.7",
    changefreq: "monthly"
  }));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticUrls, ...stateUrls].map(sitemapUrl).join("\n")}
</urlset>
`;
}

function llms() {
  const stateLines = STATES.map((state) => {
    const { taxText } = stateMeta(state);
    const cities = state.cities.map((city) => city.name).join(", ");
    return `- [${state.name} (${state.abbr}) address generator](${siteUrl}/state/${state.slug}/): ${taxText}; ZIP prefixes ${state.zipPrefixes.join(", ")}; area codes ${state.areaCodes.join(", ")}; sample cities ${cities}.`;
  }).join("\n");

  return `# US Address Generator

> Free browser-based random address generator for US state and international test data.
> Built for software testing, QA, form-validation demos, seed records, and placeholder data.
> Not for fraud, identity claims, account abuse, or rule evasion.

## Key facts

- Canonical URL: ${siteUrl}/
- Languages: English (default), Simplified Chinese (zh-CN), Traditional Chinese (zh-TW).
- No backend API: generation runs in the browser over static datasets.
- Output fields: full name, street address, city, state/region, postal or ZIP code, phone number.
- Compliance: synthetic, realistic-format only; not deliverable; will fail real USPS/AVS/bank/shipping verification.

## US state address generators

${stateLines}

## Source notes

- ${SOURCE_NOTES.zipPrefixes}
- ${SOURCE_NOTES.areaCodes}
- ${SOURCE_NOTES.salesTax}
- ${SOURCE_NOTES.cities}

## International generators

- Nigeria address generator: Lagos, Ikeja, Abuja, Kano, Port Harcourt, Ibadan; +234 phone format.
- Egypt address generator: Cairo, Giza, Alexandria, Luxor, Mansoura; +20 phone format.
- Turkey address generator: Istanbul, Ankara, Izmir, Antalya, Bursa; +90 phone format.
- Pakistan address generator: Karachi, Lahore, Islamabad, Rawalpindi, Peshawar; +92 phone format.

## Related resources

- [Homepage](${siteUrl}/)
- [States index](${siteUrl}/state/)
- [Blog](${siteUrl}/blog/)
- [AVS and ZIP validation explained](${siteUrl}/blog/avs-and-zip-validation.html)
- [NOMAD states explained](${siteUrl}/blog/nomad-states-explained.html)
- [Privacy policy](${siteUrl}/privacy.html)
`;
}

async function writePublic(relativePath, content) {
  const target = join(publicDir, relativePath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content);
}

await writePublic("state/index.html", stateIndexPage());
await Promise.all(STATES.map((state) => writePublic(`state/${state.slug}/index.html`, statePage(state))));
await writePublic("sitemap.xml", sitemap());
await writePublic("llms.txt", llms());
await writePublic("llms-full.txt", llms());

console.log(`Generated ${STATES.length} state pages, state index, sitemap.xml, llms.txt, and llms-full.txt.`);
