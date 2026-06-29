import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { INTERNATIONAL_COUNTRIES } from "../src/data/countries.js";
import { SOURCE_NOTES, STATES, TAX_FREE_STATE_ABBRS } from "../src/data/states.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const siteUrl = "https://usaddregen.com";
const lastmod = "2026-06-30";
const adsClient = "ca-pub-4423552696854564";

const staticUrls = [
  { loc: "/", priority: "1.0", changefreq: "monthly", alternates: true },
  { loc: "/zh-CN/", priority: "0.9", changefreq: "monthly", alternates: true },
  { loc: "/zh-TW/", priority: "0.9", changefreq: "monthly", alternates: true },
  { loc: "/state/", priority: "0.8", changefreq: "monthly" },
  { loc: "/country/", priority: "0.8", changefreq: "monthly" },
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

function pageShell({ title, description, canonical, ogType = "article", jsonLd = [], body, lang = "en" }) {
  const jsonLdScripts = jsonLd
    .map((entry) => `<script type="application/ld+json">\n${JSON.stringify(entry, null, 2)}\n</script>`)
    .join("\n    ");

  return `<!doctype html>
<html lang="${escapeHtml(lang)}">
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

function countrySlug(country) {
  return slugify(country.name);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function citySlug(city) {
  return slugify(city.name);
}

function cityEntries() {
  return STATES.flatMap((state) =>
    state.cities.map((city) => ({
      state,
      city,
      slug: citySlug(city)
    }))
  );
}

function countryEntries() {
  return Object.entries(INTERNATIONAL_COUNTRIES).map(([code, country]) => ({
    code,
    country,
    slug: countrySlug(country)
  }));
}

function countryNames() {
  return countryEntries().map(({ country }) => country.name);
}

function countryCard({ code, country, slug }) {
  const cityNames = country.cities.map((city) => city.name).join(", ");
  const postalLengths = [...new Set(country.cities.flatMap((city) => city.zips.map((zip) => zip.length)))].sort();
  return `<a class="state-card" href="/country/${slug}/">
          <h2>${escapeHtml(country.name)} (${code})</h2>
          <p class="state-meta">${escapeHtml(country.phoneCode)} phone format &middot; ${escapeHtml(postalLengths.join(" or "))}-character postal-code examples</p>
          <p>${escapeHtml(cityNames)}. Synthetic street lines paired with country-specific city, region, postal-code, and phone formats.</p>
        </a>`;
}

function countryIndexPage() {
  const entries = countryEntries();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${siteUrl}/country/#collection`,
      name: "International Address Generators",
      url: `${siteUrl}/country/`,
      description: `Browse country-specific random address generator pages for ${countryNames().join(", ")} with matched city, region, postal-code, and phone formats.`,
      hasPart: entries.map(({ country, slug }) => ({
        "@type": "WebPage",
        name: `${country.name} Address Generator`,
        url: `${siteUrl}/country/${slug}/`
      }))
    },
    breadcrumb(["Home", "Countries"])
  ];

  const cards = entries.map(countryCard).join("\n        ");

  const body = `    <main class="page page-wide">
      <nav class="page-header" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <span>Countries</span>
      </nav>

      <h1>International Address Generators</h1>
      <p class="meta">
        Browse country-specific random address generators for international form testing. Each page
        documents the city, region, postal-code, and phone-number formats used by the static
        dataset. Street lines and names are synthetic and not deliverable.
      </p>

      <div class="state-grid">
        ${cards}
      </div>

      <h2>How to use these generators</h2>
      <p>
        Use these pages when a signup form, checkout flow, CRM demo, or QA fixture needs a
        country-matched placeholder address. The generated records are intended for software
        testing and documentation only, not identity claims or shipping.
      </p>

      ${disclaimer()}
      ${footer()}
    </main>`;

  return pageShell({
    title: "International Address Generators | Country-Specific Test Addresses",
    description: `Browse country-specific random address generators for ${countryNames().join(", ")}. Built for QA, form testing, demos, and placeholder records.`,
    canonical: `${siteUrl}/country/`,
    ogType: "website",
    jsonLd,
    body
  });
}

function localizedHomePage(language) {
  const isTraditional = language === "zh-TW";
  const title = isTraditional
    ? "隨機地址產生器 | 美國 50 州與國際測試地址"
    : "随机地址生成器 | 美国 50 州与国际测试地址";
  const description = isTraditional
    ? "為 QA、表單測試、展示和佔位資料產生美國 50 州與多國格式化測試地址。包含城市、州/地區、郵遞區號和電話格式說明。"
    : "为 QA、表单测试、演示和占位数据生成美国 50 州与多国格式化测试地址，包含城市、州/地区、邮政编码和电话格式说明。";
  const countryList = countryNames().join(", ");
  const body = `    <main class="page page-wide">
      <nav class="lang-switcher" aria-label="Language">
        <a href="/">English</a>
        <a${language === "zh-CN" ? ' class="active" aria-current="page"' : ' href="/zh-CN/"'}>简体中文</a>
        <a${language === "zh-TW" ? ' class="active" aria-current="page"' : ' href="/zh-TW/"'}>繁體中文</a>
      </nav>

      <nav class="page-header" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <span>${isTraditional ? "中文" : "中文"}</span>
      </nav>

      <h1>${isTraditional ? "美國與國際測試地址產生器" : "美国与国际测试地址生成器"}</h1>
      <p class="meta">
        ${isTraditional
          ? `支援美國 50 州，以及 ${escapeHtml(countryList)}。本頁是可索引的中文入口；實際產生器會以所選中文介面開啟。`
          : `支持美国 50 州，以及 ${escapeHtml(countryList)}。本页是可索引的中文入口；实际生成器会以所选中文界面打开。`}
      </p>

      <p>
        <a class="cta" href="/?lang=${language}">${isTraditional ? "開啟地址產生器" : "打开地址生成器"}</a>
      </p>

      <h2>${isTraditional ? "可用入口" : "可用入口"}</h2>
      <ul>
        <li><a href="/state/">${isTraditional ? "美國 50 州地址產生器" : "美国 50 州地址生成器"}</a></li>
        <li><a href="/country/">${isTraditional ? "國際地址產生器" : "国际地址生成器"}</a></li>
        <li><a href="/blog/${language}/">${isTraditional ? "中文部落格" : "中文博客"}</a></li>
      </ul>

      <h2>${isTraditional ? "使用邊界" : "使用边界"}</h2>
      <p>
        ${isTraditional
          ? "所有輸出都是符合格式習慣的合成測試資料，不保證可投遞，也不能通過真實郵政、銀行、電信、政府或物流驗證。僅用於合法的 QA、開發、展示和佔位資料。"
          : "所有输出都是符合格式习惯的合成测试数据，不保证可投递，也不能通过真实邮政、银行、电信、政府或物流验证。仅用于合法的 QA、开发、演示和占位数据。"}
      </p>

      ${footer()}
    </main>`;

  return pageShell({
    title,
    description,
    canonical: `${siteUrl}/${language}/`,
    ogType: "website",
    lang: language,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${siteUrl}/${language}/#webpage`,
        name: title,
        url: `${siteUrl}/${language}/`,
        description,
        inLanguage: language,
        isPartOf: { "@id": `${siteUrl}/#website` }
      },
      breadcrumb(["Home", language], `/${language}/`)
    ],
    body
  });
}

function countryPage({ code, country, slug }) {
  const cityRows = country.cities
    .map((city) => `<tr><td>${escapeHtml(city.name)}</td><td>${escapeHtml(city.region)}</td><td>${escapeHtml(city.zips.join(", "))}</td></tr>`)
    .join("\n          ");
  const cityNames = country.cities.map((city) => city.name).join(", ");
  const description = `${country.name} random address generator with synthetic names and street lines plus country-matched city, region, postal-code, and ${country.phoneCode} phone-number formats for testing.`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteUrl}/country/${slug}/#webpage`,
      name: `${country.name} Address Generator`,
      url: `${siteUrl}/country/${slug}/`,
      description,
      datePublished: "2026-06-29",
      dateModified: lastmod,
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@type": "Country", name: country.name }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqForCountry(country)
    },
    breadcrumb(["Home", "Countries", country.name], `/country/${slug}/`)
  ];

  const body = `    <main class="page">
      <nav class="page-header" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/country/">Countries</a>
        <span>/</span>
        <span>${escapeHtml(country.name)}</span>
      </nav>

      <h1>${escapeHtml(country.name)} Address Generator</h1>
      <p class="meta">Country code: ${escapeHtml(code)} &middot; Phone code: ${escapeHtml(country.phoneCode)} &middot; Cities: ${escapeHtml(cityNames)}</p>

      <p>
        Use this ${escapeHtml(country.name)} address generator when you need realistic-format test
        data for international signup forms, CRM records, checkout demos, QA scripts, or design
        prototypes. The generator pairs a country-specific city, region, postal code, and phone
        format with synthetic names and street lines.
      </p>

      <p>
        <a class="cta" href="/?country=${escapeHtml(code)}">Generate ${escapeHtml(country.name)} test data</a>
      </p>

      <h2>Cities and postal codes in this dataset</h2>
      <p>
        The dataset is intentionally small so the static site remains fast and easy to audit.
        Postal codes are format examples for testing and demos, not proof that the generated street
        line exists.
      </p>
      <table>
        <thead><tr><th>City</th><th>Region</th><th>Postal codes</th></tr></thead>
        <tbody>
          ${cityRows}
        </tbody>
      </table>

      <h2>Phone-number format</h2>
      <p>
        Generated phone numbers use the ${escapeHtml(country.phoneCode)} country code and one of
        these local prefixes: ${escapeHtml(country.phonePrefixes.join(", "))}. They are synthetic
        test values and are not assigned subscriber numbers.
      </p>

      <h2>Important caveats</h2>
      <p>
        These records are realistic-format placeholders. They are not verified against postal,
        telecom, banking, government, or shipping databases and should not be used to claim an
        identity, receive mail, or bypass account rules.
      </p>

      ${disclaimer()}
      ${footer()}
    </main>`;

  return pageShell({
    title: `${country.name} Address Generator | Random ${code} Test Addresses`,
    description,
    canonical: `${siteUrl}/country/${slug}/`,
    jsonLd,
    body
  });
}

function faqForCountry(country) {
  return [
    {
      "@type": "Question",
      name: `Is this ${country.name} address real?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `No. It is realistic-format synthetic data. The city, region, postal code, and phone format are matched from the ${country.name} test dataset, but the street line is not verified or deliverable.`
      }
    },
    {
      "@type": "Question",
      name: `What can ${country.name} test address data be used for?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use it for legal QA workflows such as form validation, checkout demos, CRM demos, mock customer records, design prototypes, documentation screenshots, and seed data."
      }
    },
    {
      "@type": "Question",
      name: `Does this ${country.name} generator validate addresses?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The generator formats placeholder data for testing. It does not query postal, telecom, banking, government, or shipping verification systems."
      }
    }
  ];
}

function statePage(state) {
  const { isTaxFree, taxText } = stateMeta(state);
  const cityRows = state.cities
    .map((city) => `<tr><td><a href="/state/${state.slug}/${citySlug(city)}/">${escapeHtml(city.name)}</a></td><td>${escapeHtml(city.zips.join(", "))}</td><td>Real city and ZIP pair used by the generator dataset.</td></tr>`)
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

function cityPage({ state, city, slug }) {
  const { taxText } = stateMeta(state);
  const cityPath = `/state/${state.slug}/${slug}/`;
  const description = `${city.name}, ${state.name} random address generator with matched ${state.abbr} ZIP codes (${city.zips.join(", ")}), state area-code data, and synthetic street lines for QA and form testing.`;
  const nearbyCities = state.cities
    .filter((item) => item.name !== city.name)
    .slice(0, 4)
    .map((item) => `<li><a href="/state/${state.slug}/${citySlug(item)}/">${escapeHtml(item.name)} address generator</a></li>`)
    .join("\n          ");
  const zipRows = city.zips
    .map((zip) => `<tr><td>${escapeHtml(zip)}</td><td>${escapeHtml(city.name)}</td><td>${escapeHtml(state.name)} (${state.abbr})</td></tr>`)
    .join("\n          ");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteUrl}${cityPath}#webpage`,
      name: `${city.name} Address Generator`,
      url: `${siteUrl}${cityPath}`,
      description,
      datePublished: "2026-06-30",
      dateModified: lastmod,
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: {
        "@type": "City",
        name: city.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: `${state.name}, United States`
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `Is this ${city.name} address real?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `No. The city, state, ZIP, and area-code data are matched from the ${state.name} dataset, but the street line is synthetic and not deliverable.`
          }
        },
        {
          "@type": "Question",
          name: `Which ZIP codes are used for ${city.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `This dataset uses these ${city.name}, ${state.abbr} ZIP examples: ${city.zips.join(", ")}.`
          }
        },
        {
          "@type": "Question",
          name: `What can a ${city.name} test address be used for?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use it for legal QA workflows such as city/ZIP validation, checkout demos, mock customer records, design prototypes, documentation screenshots, and seed data."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "States", item: `${siteUrl}/state/` },
        { "@type": "ListItem", position: 3, name: state.name, item: `${siteUrl}/state/${state.slug}/` },
        { "@type": "ListItem", position: 4, name: city.name, item: `${siteUrl}${cityPath}` }
      ]
    }
  ];

  const body = `    <main class="page">
      <nav class="page-header" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/state/">States</a>
        <span>/</span>
        <a href="/state/${state.slug}/">${escapeHtml(state.name)}</a>
        <span>/</span>
        <span>${escapeHtml(city.name)}</span>
      </nav>

      <h1>${escapeHtml(city.name)} Address Generator</h1>
      <p class="meta">${escapeHtml(state.name)} (${state.abbr}) &middot; ZIP codes: ${escapeHtml(city.zips.join(", "))} &middot; ${escapeHtml(taxText)}</p>

      <p>
        Generate realistic-format ${escapeHtml(city.name)}, ${escapeHtml(state.abbr)} test
        addresses for city/ZIP validation, checkout UI testing, tax-engine fixtures, seed data,
        demos, and documentation. The city, state, ZIP, and area-code data come from the same
        static ${escapeHtml(state.name)} dataset; the street line and person name are synthetic.
      </p>

      <p>
        <a class="cta" href="/?state=${state.abbr}">Generate a ${escapeHtml(state.name)} address</a>
      </p>

      <h2>${escapeHtml(city.name)} ZIP codes in this dataset</h2>
      <table>
        <thead><tr><th>ZIP code</th><th>City</th><th>State</th></tr></thead>
        <tbody>
          ${zipRows}
        </tbody>
      </table>

      <h2>Testing notes</h2>
      <p>
        This page is useful when a form needs to preserve a specific city/state/ZIP relationship.
        It does not verify that a synthetic street line exists. Real USPS, AVS, bank, shipping, or
        government verification will reject these generated records.
      </p>

      <h2>Related ${escapeHtml(state.name)} city generators</h2>
      <ul>
        ${nearbyCities || `<li><a href="/state/${state.slug}/">${escapeHtml(state.name)} address generator</a></li>`}
      </ul>

      <p><a href="/state/${state.slug}/">View all ${escapeHtml(state.name)} test-address data</a></p>

      ${disclaimer()}
      ${footer()}
    </main>`;

  return pageShell({
    title: `${city.name} Address Generator | Random ${state.abbr} Test Address With ZIP`,
    description,
    canonical: `${siteUrl}${cityPath}`,
    jsonLd,
    body
  });
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
  const sectionName = names[1] || "States";
  const sectionPath =
    sectionName === "Countries" ? "/country/" : sectionName === "States" ? "/state/" : currentPath;
  const items = [
    { name: "Home", item: `${siteUrl}/` },
    { name: sectionName, item: `${siteUrl}${sectionPath}` }
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
      `<xhtml:link rel="alternate" hreflang="zh-CN" href="${siteUrl}/zh-CN/" />`,
      `<xhtml:link rel="alternate" hreflang="zh-TW" href="${siteUrl}/zh-TW/" />`,
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

  const alternateBlock = alternates.length ? `\n    ${alternates.join("\n    ")}` : "";

  return `  <url>
    <loc>${fullUrl(entry.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${alternateBlock}
  </url>`;
}

function sitemap() {
  const stateUrls = STATES.map((state) => ({
    loc: `/state/${state.slug}/`,
    priority: TAX_FREE_STATE_ABBRS.includes(state.abbr) ? "0.8" : "0.7",
    changefreq: "monthly"
  }));
  const countryUrls = countryEntries().map(({ slug }) => ({
    loc: `/country/${slug}/`,
    priority: "0.8",
    changefreq: "monthly"
  }));
  const cityUrls = cityEntries().map(({ state, slug }) => ({
    loc: `/state/${state.slug}/${slug}/`,
    priority: "0.6",
    changefreq: "monthly"
  }));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticUrls, ...stateUrls, ...cityUrls, ...countryUrls].map(sitemapUrl).join("\n")}
</urlset>
`;
}

function llms() {
  const stateLines = STATES.map((state) => {
    const { taxText } = stateMeta(state);
    const cities = state.cities.map((city) => city.name).join(", ");
    return `- [${state.name} (${state.abbr}) address generator](${siteUrl}/state/${state.slug}/): ${taxText}; ZIP prefixes ${state.zipPrefixes.join(", ")}; area codes ${state.areaCodes.join(", ")}; sample cities ${cities}.`;
  }).join("\n");
  const cityLines = cityEntries().map(({ state, city, slug }) => {
    return `- [${city.name}, ${state.abbr} address generator](${siteUrl}/state/${state.slug}/${slug}/): ZIP examples ${city.zips.join(", ")}; state page ${siteUrl}/state/${state.slug}/.`;
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

## US city address generators

${cityLines}

## Source notes

- ${SOURCE_NOTES.zipPrefixes}
- ${SOURCE_NOTES.areaCodes}
- ${SOURCE_NOTES.salesTax}
- ${SOURCE_NOTES.cities}

## International generators

${countryEntries().map(({ country, slug }) => {
  const cities = country.cities.map((city) => city.name).join(", ");
  return `- [${country.name} address generator](${siteUrl}/country/${slug}/): ${cities}; ${country.phoneCode} phone format.`;
}).join("\n")}

## Related resources

- [Homepage](${siteUrl}/)
- [States index](${siteUrl}/state/)
- [International generators](${siteUrl}/country/)
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
await Promise.all(cityEntries().map((entry) => writePublic(`state/${entry.state.slug}/${entry.slug}/index.html`, cityPage(entry))));
await writePublic("country/index.html", countryIndexPage());
await Promise.all(countryEntries().map((entry) => writePublic(`country/${entry.slug}/index.html`, countryPage(entry))));
await writePublic("zh-CN/index.html", localizedHomePage("zh-CN"));
await writePublic("zh-TW/index.html", localizedHomePage("zh-TW"));
await writePublic("sitemap.xml", sitemap());
await writePublic("llms.txt", llms());
await writePublic("llms-full.txt", llms());

console.log(`Generated ${STATES.length} state pages, ${cityEntries().length} city pages, ${countryEntries().length} country pages, localized home pages, indexes, sitemap.xml, llms.txt, and llms-full.txt.`);
