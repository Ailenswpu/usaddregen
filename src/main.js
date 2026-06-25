import "./styles.css";

const TAX_FREE_STATES = [
  {
    abbr: "DE",
    name: "Delaware",
    areaCodes: ["302"],
    cities: [
      { name: "Wilmington", zips: ["19801", "19802", "19805", "19806"] },
      { name: "Dover", zips: ["19901", "19904"] },
      { name: "Newark", zips: ["19711", "19713"] },
      { name: "Middletown", zips: ["19709"] },
      { name: "Lewes", zips: ["19958"] }
    ]
  },
  {
    abbr: "MT",
    name: "Montana",
    areaCodes: ["406"],
    cities: [
      { name: "Billings", zips: ["59101", "59102", "59105"] },
      { name: "Missoula", zips: ["59801", "59802"] },
      { name: "Bozeman", zips: ["59715", "59718"] },
      { name: "Helena", zips: ["59601", "59602"] },
      { name: "Great Falls", zips: ["59401", "59405"] }
    ]
  },
  {
    abbr: "NH",
    name: "New Hampshire",
    areaCodes: ["603"],
    cities: [
      { name: "Manchester", zips: ["03101", "03102", "03104"] },
      { name: "Nashua", zips: ["03060", "03062"] },
      { name: "Concord", zips: ["03301", "03303"] },
      { name: "Portsmouth", zips: ["03801"] },
      { name: "Dover", zips: ["03820"] }
    ]
  },
  {
    abbr: "OR",
    name: "Oregon",
    areaCodes: ["458", "503", "541", "971"],
    cities: [
      { name: "Portland", zips: ["97201", "97202", "97205", "97209"] },
      { name: "Salem", zips: ["97301", "97302"] },
      { name: "Eugene", zips: ["97401", "97402", "97405"] },
      { name: "Bend", zips: ["97701", "97702"] },
      { name: "Medford", zips: ["97501", "97504"] }
    ]
  },
  {
    abbr: "AK",
    name: "Alaska",
    areaCodes: ["907"],
    cities: [
      { name: "Anchorage", zips: ["99501", "99503", "99507"] },
      { name: "Fairbanks", zips: ["99701", "99709"] },
      { name: "Juneau", zips: ["99801"] },
      { name: "Sitka", zips: ["99835"] },
      { name: "Ketchikan", zips: ["99901"] }
    ]
  }
];

const FIRST_NAMES = [
  "Avery",
  "Jordan",
  "Morgan",
  "Taylor",
  "Casey",
  "Riley",
  "Cameron",
  "Harper",
  "Logan",
  "Reese",
  "Quinn",
  "Parker",
  "Drew",
  "Jamie",
  "Sydney"
];

const LAST_NAMES = [
  "Miller",
  "Johnson",
  "Davis",
  "Wilson",
  "Anderson",
  "Clark",
  "Martin",
  "Walker",
  "Hall",
  "Allen",
  "Young",
  "King",
  "Wright",
  "Scott",
  "Green"
];

const STREET_NAMES = [
  "Maple",
  "Cedar",
  "Oak",
  "Pine",
  "Willow",
  "Lakeview",
  "Hillcrest",
  "Riverside",
  "Meadow",
  "Sunset",
  "Highland",
  "Forest",
  "Park",
  "Washington",
  "Madison",
  "Adams",
  "Franklin",
  "Union"
];

const STREET_SUFFIXES = [
  "St",
  "Ave",
  "Rd",
  "Dr",
  "Ln",
  "Way",
  "Ct",
  "Pl",
  "Ter",
  "Blvd"
];

const LANGUAGES = ["en", "zh-CN", "zh-TW"];

const TRANSLATIONS = {
  en: {
    pageTitle: "US Tax-Free State Address Generator | Random No Sales Tax Address",
    metaDescription:
      "Generate random US tax-free state address data for testing, form development, demos, QA, and placeholder records. Supports Delaware, Montana, New Hampshire, Oregon, and Alaska.",
    brand: "Tax-Free Address Generator",
    headerNote: "Testing data for no-sales-tax states",
    languageLabel: "Language",
    eyebrow: "US Tax-Free State Address Generator",
    h1: "Random US address generator for no-sales-tax states",
    lede:
      "Generate realistic-format US address data for Delaware, Montana, New Hampshire, Oregon, and Alaska. Use it for QA, form development, demos, seed data, and safe placeholder records.",
    stateLabel: "Tax-free state",
    randomStateOption: "Random tax-free state",
    generateButton: "Generate",
    stateHelp:
      "City, state, ZIP Code, and phone area code are generated from the same state dataset.",
    generatedOnLoad: "Generated on load",
    generatedAt: "Generated",
    fieldFullAddress: "Full Address",
    fieldFullName: "Full Name",
    fieldStreetAddress: "Street Address",
    fieldCity: "City",
    fieldState: "State",
    fieldZipCode: "ZIP Code",
    fieldPhoneNumber: "Phone Number",
    copyButton: "Copy full address",
    copiedButton: "Copied",
    copiedToast: "Copied full address",
    copyFailedToast: "Copy failed. Select the address manually.",
    usageTitle: "Built for clean test data",
    usageBodyOne:
      "This tool intentionally focuses on the five US states with no statewide sales tax instead of supporting every country or region. A smaller dataset keeps the static site fast, easy to audit, and simple to deploy on Cloudflare Pages.",
    usageBodyTwo:
      "The generator creates synthetic street lines and pairs them with real city, state, ZIP Code, and area code combinations. It does not verify deliverability and should not be used to misrepresent identity, evade rules, or submit fraudulent information.",
    faqTitle: "FAQ",
    faqOneQuestion: "What is a tax-free state?",
    faqOneAnswer:
      "In this context, a tax-free state means a US state with no statewide sales tax. Other taxes or local rules can still apply, so this page is only an address-format testing utility and not tax advice.",
    faqTwoQuestion: "Which US states have no sales tax?",
    faqTwoAnswer:
      "The five states commonly listed as having no statewide sales tax are Alaska, Delaware, Montana, New Hampshire, and Oregon. Alaska can have local sales taxes in some jurisdictions.",
    faqThreeQuestion: "What can this address generator be used for?",
    faqThreeAnswer:
      "Use it for legal testing workflows such as form validation, checkout UI demos, QA scripts, mock customer records, design prototypes, documentation screenshots, and temporary placeholder data.",
    faqFourQuestion: "Is the generated address real?",
    faqFourAnswer:
      "No. The output is realistic-format synthetic data. City, state, ZIP Code, and phone area codes are matched, but the full street address is not guaranteed to exist or be deliverable.",
    footer:
      "For development, testing, demo, and placeholder use only. Not for fraud, account abuse, or legal identity claims."
  },
  "zh-CN": {
    pageTitle: "美国免税州随机地址生成器 | 无销售税州地址工具",
    metaDescription:
      "生成美国免税州随机地址数据，适用于测试、表单开发、演示、QA 和占位数据。支持特拉华、蒙大拿、新罕布什尔、俄勒冈和阿拉斯加。",
    brand: "免税州地址生成器",
    headerNote: "面向无销售税州的测试地址数据",
    languageLabel: "语言",
    eyebrow: "美国免税州地址生成器",
    h1: "美国无销售税州随机地址生成器",
    lede:
      "生成符合美国地址习惯的免税州地址数据，覆盖特拉华、蒙大拿、新罕布什尔、俄勒冈和阿拉斯加。适用于 QA、表单开发、演示、种子数据和安全占位记录。",
    stateLabel: "免税州",
    randomStateOption: "随机免税州",
    generateButton: "生成地址",
    stateHelp: "城市、州、ZIP Code 和电话区号都来自同一州的数据集，避免明显不匹配。",
    generatedOnLoad: "加载后已生成",
    generatedAt: "生成时间",
    fieldFullAddress: "完整地址",
    fieldFullName: "姓名",
    fieldStreetAddress: "街道地址",
    fieldCity: "城市",
    fieldState: "州",
    fieldZipCode: "ZIP Code",
    fieldPhoneNumber: "电话号码",
    copyButton: "复制完整地址",
    copiedButton: "已复制",
    copiedToast: "完整地址已复制",
    copyFailedToast: "复制失败，请手动选择地址。",
    usageTitle: "为干净的测试数据而设计",
    usageBodyOne:
      "这个工具只聚焦美国五个没有州级销售税的州，而不是支持所有国家或地区。更小的数据集让静态站更快、更容易审核，也更适合部署到 Cloudflare Pages。",
    usageBodyTwo:
      "生成器会合成街道地址，并匹配真实的城市、州、ZIP Code 和电话区号组合。它不会验证地址是否可投递，也不应用于冒充身份、规避规则或提交欺诈信息。",
    faqTitle: "常见问题",
    faqOneQuestion: "什么是免税州？",
    faqOneAnswer:
      "在这里，免税州指没有州级销售税的美国州。其他税种或地方规则仍可能存在，所以本页面只是地址格式测试工具，不构成税务建议。",
    faqTwoQuestion: "哪些美国州没有销售税？",
    faqTwoAnswer:
      "通常被列为没有州级销售税的五个州是阿拉斯加、特拉华、蒙大拿、新罕布什尔和俄勒冈。阿拉斯加部分地区可能存在地方销售税。",
    faqThreeQuestion: "这个地址生成器可以用来做什么？",
    faqThreeAnswer:
      "可用于合法的测试场景，例如表单校验、结账页面演示、QA 脚本、模拟客户记录、设计原型、文档截图和临时占位数据。",
    faqFourQuestion: "生成的地址是真实地址吗？",
    faqFourAnswer:
      "不是。输出是符合格式的合成数据。城市、州、ZIP Code 和电话区号会相互匹配，但完整街道地址不保证真实存在或可投递。",
    footer: "仅用于开发、测试、演示和占位数据。不得用于欺诈、账号滥用或法律身份声明。"
  },
  "zh-TW": {
    pageTitle: "美國免稅州隨機地址產生器 | 無銷售稅州地址工具",
    metaDescription:
      "產生美國免稅州隨機地址資料，適用於測試、表單開發、展示、QA 和佔位資料。支援德拉瓦、蒙大拿、新罕布夏、奧勒岡和阿拉斯加。",
    brand: "免稅州地址產生器",
    headerNote: "面向無銷售稅州的測試地址資料",
    languageLabel: "語言",
    eyebrow: "美國免稅州地址產生器",
    h1: "美國無銷售稅州隨機地址產生器",
    lede:
      "產生符合美國地址習慣的免稅州地址資料，涵蓋德拉瓦、蒙大拿、新罕布夏、奧勒岡和阿拉斯加。適用於 QA、表單開發、展示、種子資料和安全佔位記錄。",
    stateLabel: "免稅州",
    randomStateOption: "隨機免稅州",
    generateButton: "產生地址",
    stateHelp: "城市、州、ZIP Code 和電話區碼都來自同一州的資料集，避免明顯不匹配。",
    generatedOnLoad: "載入後已產生",
    generatedAt: "產生時間",
    fieldFullAddress: "完整地址",
    fieldFullName: "姓名",
    fieldStreetAddress: "街道地址",
    fieldCity: "城市",
    fieldState: "州",
    fieldZipCode: "ZIP Code",
    fieldPhoneNumber: "電話號碼",
    copyButton: "複製完整地址",
    copiedButton: "已複製",
    copiedToast: "完整地址已複製",
    copyFailedToast: "複製失敗，請手動選取地址。",
    usageTitle: "為乾淨的測試資料而設計",
    usageBodyOne:
      "這個工具只聚焦美國五個沒有州級銷售稅的州，而不是支援所有國家或地區。更小的資料集讓靜態站更快、更容易審核，也更適合部署到 Cloudflare Pages。",
    usageBodyTwo:
      "產生器會合成街道地址，並匹配真實的城市、州、ZIP Code 和電話區碼組合。它不會驗證地址是否可投遞，也不應用於冒充身分、規避規則或提交詐欺資訊。",
    faqTitle: "常見問題",
    faqOneQuestion: "什麼是免稅州？",
    faqOneAnswer:
      "在這裡，免稅州指沒有州級銷售稅的美國州。其他稅種或地方規則仍可能存在，所以本頁面只是地址格式測試工具，不構成稅務建議。",
    faqTwoQuestion: "哪些美國州沒有銷售稅？",
    faqTwoAnswer:
      "通常被列為沒有州級銷售稅的五個州是阿拉斯加、德拉瓦、蒙大拿、新罕布夏和奧勒岡。阿拉斯加部分地區可能存在地方銷售稅。",
    faqThreeQuestion: "這個地址產生器可以用來做什麼？",
    faqThreeAnswer:
      "可用於合法的測試場景，例如表單驗證、結帳頁面展示、QA 腳本、模擬客戶記錄、設計原型、文件截圖和臨時佔位資料。",
    faqFourQuestion: "產生的地址是真實地址嗎？",
    faqFourAnswer:
      "不是。輸出是符合格式的合成資料。城市、州、ZIP Code 和電話區碼會相互匹配，但完整街道地址不保證真實存在或可投遞。",
    footer: "僅用於開發、測試、展示和佔位資料。不得用於詐欺、帳號濫用或法律身分聲明。"
  }
};

const stateSelect = document.querySelector("#state-select");
const languageSelect = document.querySelector("#language-select");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");
const toast = document.querySelector("#toast");

const fields = {
  fullName: document.querySelector("#full-name"),
  streetAddress: document.querySelector("#street-address"),
  city: document.querySelector("#city"),
  state: document.querySelector("#state"),
  zipCode: document.querySelector("#zip-code"),
  phoneNumber: document.querySelector("#phone-number"),
  fullAddress: document.querySelector("#full-address"),
  stateBadge: document.querySelector("#state-badge"),
  updatedAt: document.querySelector("#updated-at")
};

let currentAddress = null;
let currentLanguage = getInitialLanguage();

function getInitialLanguage() {
  const savedLanguage = window.localStorage.getItem("addressGeneratorLanguage");
  if (LANGUAGES.includes(savedLanguage)) return savedLanguage;

  const browserLanguage = navigator.language || "";
  if (browserLanguage.toLowerCase().startsWith("zh-tw") || browserLanguage.toLowerCase().startsWith("zh-hk")) {
    return "zh-TW";
  }

  if (browserLanguage.toLowerCase().startsWith("zh")) {
    return "zh-CN";
  }

  return "en";
}

function t(key) {
  return TRANSLATIONS[currentLanguage][key] || TRANSLATIONS.en[key] || key;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSelectedState() {
  if (stateSelect.value === "RANDOM") {
    return randomItem(TAX_FREE_STATES);
  }

  return TAX_FREE_STATES.find((state) => state.abbr === stateSelect.value) || TAX_FREE_STATES[0];
}

function formatPhone(areaCodes) {
  const areaCode = randomItem(areaCodes);
  const exchange = randomNumber(200, 899);
  const line = String(randomNumber(0, 9999)).padStart(4, "0");
  return `(${areaCode}) ${exchange}-${line}`;
}

function generateAddress() {
  const state = getSelectedState();
  const city = randomItem(state.cities);
  const zip = randomItem(city.zips);
  const streetNumber = randomNumber(100, 9899);
  const street = `${streetNumber} ${randomItem(STREET_NAMES)} ${randomItem(STREET_SUFFIXES)}`;
  const fullName = `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`;
  const phoneNumber = formatPhone(state.areaCodes);
  const fullAddress = `${fullName}\n${street}\n${city.name}, ${state.abbr} ${zip}\nUnited States`;

  return {
    fullName,
    streetAddress: street,
    city: city.name,
    state: `${state.name} (${state.abbr})`,
    stateAbbr: state.abbr,
    zipCode: zip,
    phoneNumber,
    fullAddress,
    copyText: `${fullAddress}\nPhone: ${phoneNumber}`
  };
}

function renderAddress(address) {
  currentAddress = address;
  fields.fullName.textContent = address.fullName;
  fields.streetAddress.textContent = address.streetAddress;
  fields.city.textContent = address.city;
  fields.state.textContent = address.state;
  fields.zipCode.textContent = address.zipCode;
  fields.phoneNumber.textContent = address.phoneNumber;
  fields.fullAddress.textContent = address.fullAddress;
  fields.stateBadge.textContent = address.state;
  fields.updatedAt.textContent = `${t("generatedAt")} ${new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })}`;
}

function applyLanguage(language) {
  currentLanguage = LANGUAGES.includes(language) ? language : "en";
  window.localStorage.setItem("addressGeneratorLanguage", currentLanguage);
  document.documentElement.lang = currentLanguage;
  document.title = t("pageTitle");

  const metaDescription = document.querySelector('meta[name="description"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (metaDescription) metaDescription.content = t("metaDescription");
  if (ogDescription) ogDescription.content = t("metaDescription");
  if (twitterDescription) twitterDescription.content = t("metaDescription");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  if (languageSelect.value !== currentLanguage) {
    languageSelect.value = currentLanguage;
  }

  populateStateSelect();

  if (currentAddress) {
    renderAddress(currentAddress);
  } else {
    fields.stateBadge.textContent = "Ready";
    fields.updatedAt.textContent = t("generatedOnLoad");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

async function copyCurrentAddress() {
  if (!currentAddress) return;

  const originalLabel = copyButton.textContent;
  try {
    await navigator.clipboard.writeText(currentAddress.copyText);
    copyButton.textContent = t("copiedButton");
    copyButton.classList.add("is-success");
    showToast(t("copiedToast"));
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = currentAddress.copyText;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textArea);
    showToast(copied ? t("copiedToast") : t("copyFailedToast"));
  } finally {
    window.setTimeout(() => {
      copyButton.textContent = originalLabel;
      copyButton.classList.remove("is-success");
    }, 1600);
  }
}

function populateStateSelect() {
  const selectedValue = stateSelect.value || "RANDOM";
  stateSelect.textContent = "";

  const randomOption = document.createElement("option");
  randomOption.value = "RANDOM";
  randomOption.textContent = t("randomStateOption");
  stateSelect.append(randomOption);

  TAX_FREE_STATES.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.abbr;
    option.textContent = `${state.name} (${state.abbr})`;
    stateSelect.append(option);
  });

  stateSelect.value = selectedValue;
  if (!stateSelect.value) stateSelect.value = "RANDOM";
}

function bindEvents() {
  generateButton.addEventListener("click", () => renderAddress(generateAddress()));
  stateSelect.addEventListener("change", () => renderAddress(generateAddress()));
  languageSelect.addEventListener("change", (event) => applyLanguage(event.target.value));
  copyButton.addEventListener("click", copyCurrentAddress);
}

bindEvents();
applyLanguage(currentLanguage);
renderAddress(generateAddress());
