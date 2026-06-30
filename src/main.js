import "./styles.css";
import { STATES } from "./data/states.js";
import { COUNTRY_CODES, INTERNATIONAL_COUNTRIES } from "./data/countries.js";
import { generateAddress as createAddress } from "./lib/generate.js";

const LANGUAGES = ["en", "zh-CN", "zh-TW"];

const TRANSLATIONS = {
  en: {
    pageTitle: "Random Address Generator | US States and International Test Addresses",
    metaDescription:
      "Generate random address data for all 50 US states plus multi-country test data. Built for testing, form development, demos, QA, and placeholder records.",
    brand: "US Address Generator",
    headerNote: "Testing data for US states and global forms",
    languageLabel: "Language",
    eyebrow: "US and International Address Generator",
    h1: "Random address generator for US and global test data",
    lede:
      "Generate realistic-format address data for all 50 US states plus multi-country address formats. Use it for QA, form development, demos, seed data, and safe placeholder records.",
    tabUs: "US states",
    tabNigeria: "Nigeria",
    tabEgypt: "Egypt",
    tabTurkey: "Turkey",
    tabPakistan: "Pakistan",
    stateLabel: "US state",
    regionLabel: "Region",
    randomStateOption: "Random US state",
    randomRegionOption: "Random region",
    generateButton: "Generate",
    stateHelp:
      "City, state, ZIP Code, and phone area code are generated from the same US state dataset.",
    regionHelp:
      "City, region, postal code, and phone number are generated from a country-specific test dataset.",
    generatedOnLoad: "Generated on load",
    generatedAt: "Generated",
    fieldFullAddress: "Full Address",
    fieldFullName: "Full Name",
    fieldStreetAddress: "Street Address",
    fieldCity: "City",
    fieldState: "State / Region",
    fieldZipCode: "Postal / ZIP Code",
    fieldPhoneNumber: "Phone Number",
    copyButton: "Copy full address",
    copiedButton: "Copied",
    copiedToast: "Copied full address",
    copyFailedToast: "Copy failed. Select the address manually.",
    usageTitle: "Built for clean test data",
    usageBodyOne:
      "This tool keeps a focused static dataset: all 50 US states plus country-specific address formats for form testing. The dataset stays lightweight, easy to audit, and simple to deploy on Cloudflare Pages.",
    usageBodyTwo:
      "The generator creates synthetic street lines and pairs them with real city, state, ZIP Code, and area code combinations. It does not verify deliverability and should not be used to misrepresent identity, evade rules, or submit fraudulent information.",
    internationalEyebrow: "International generators",
    internationalTitle: "International test address generators",
    internationalIntro:
      "These country tabs generate synthetic but realistic-format address records for international form testing. Each output keeps city, region, postal code, and phone format aligned to the selected country.",
    viewAllCountries: "View all country address generators",
    seoNigeriaTitle: "Nigeria address generator",
    seoNigeriaBody:
      "Generate Nigerian test addresses for Lagos, Abuja, Kano, Port Harcourt, Ibadan, and related states with six-digit postal codes and +234 mobile phone formatting.",
    seoEgyptTitle: "Egypt address generator",
    seoEgyptBody:
      "Generate Egyptian test addresses using Cairo, Giza, Alexandria, Luxor, and Mansoura governorates with Egyptian postal codes and +20 phone formatting.",
    seoTurkeyTitle: "Turkey address generator",
    seoTurkeyBody:
      "Generate Turkey test addresses for Istanbul, Ankara, Izmir, Antalya, and Bursa with five-digit postal codes and +90 mobile phone formatting.",
    seoPakistanTitle: "Pakistan address generator",
    seoPakistanBody:
      "Generate Pakistan test addresses for Karachi, Lahore, Islamabad, Rawalpindi, and Peshawar with province names, postal codes, and +92 mobile phone formatting.",
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
    faqFiveQuestion: "Why does a checkout form say my ZIP, city, or state doesn't match?",
    faqFiveAnswer:
      "Most checkout and shipping forms cross-check the ZIP code against the city and state via USPS data. A mismatch happens when the ZIP belongs to a different city in the real USPS database, or when the street address fails an AVS (Address Verification System) lookup. This generator picks city, state, and ZIP from the same state dataset so those three fields stay internally consistent, but it is still synthetic data — it will fail any real address-verification step.",
    faqSixQuestion: "How is this different from a generic US address generator?",
    faqSixAnswer:
      "Generic generators often mix city, ZIP, and phone data without explaining the source. This tool keeps an audit-friendly static dataset, runs entirely in the browser with no signup, and matches the phone area code to the selected state — making it predictable test fixture data.",
    faqSevenQuestion: "Does this generate international test addresses?",
    faqSevenAnswer:
      "Yes. The country tabs generate synthetic address records for multiple countries with country-matched city, region, postal code, and phone-number formats. The output is intended for testing and demos, not for identity claims or deliverable mail.",
    faqEightQuestion: "Can these international addresses pass real verification?",
    faqEightAnswer:
      "No. They are realistic-format placeholders. They may look internally consistent, but they are not verified against postal, banking, telecom, government, or shipping databases.",
    featuresTitle: "Why use this address generator?",
    featureOneTitle: "State-matched output",
    featureOneBody:
      "City, ZIP code, and phone area code always come from the same state record, so the address looks internally consistent in any form-validation flow.",
    featureTwoTitle: "Runs entirely in your browser",
    featureTwoBody:
      "No backend and no signup required. Address generation happens client-side over a small JSON dataset hosted as a static site on Cloudflare.",
    featureThreeTitle: "Focused, audit-friendly dataset",
    featureThreeBody:
      "A deliberately small static dataset for all 50 US states plus multi-country address formats keeps the tool fast, predictable, and easy to audit.",
    featureFourTitle: "Multilingual UI",
    featureFourBody:
      "Switch between English, Simplified Chinese, and Traditional Chinese with a single dropdown. Language preference syncs via URL parameter and local storage.",
    footer:
      "For development, testing, demo, and placeholder use only. Not for fraud, account abuse, or legal identity claims.",
    footerPrivacy: "Privacy Policy",
    footerBlog: "Blog",
    footerAbout: "About",
    footerColStates: "Sales Tax Testing",
    footerColCountries: "Countries",
    footerColResources: "Resources",
    footerContactLabel: "Contact:",
    compareTitle: "The 5 no-sales-tax states at a glance",
    compareIntro: "A quick reference for the five US states with no statewide sales tax — commonly remembered as the NOMAD states (New Hampshire, Oregon, Montana, Alaska, Delaware). Use this when you need to pick a state for a checkout-testing fixture or want to verify which area code goes with which state.",
    compareColState: "State",
    compareColAbbr: "Abbr",
    compareColZip: "ZIP prefix",
    compareColArea: "Area code",
    compareColTax: "Local sales tax",
    compareColIncome: "State income tax",
    compareColPage: "Generator",
    compareOpenLink: "View",
    compareDeTax: "None. Gross Receipts Tax on businesses.",
    compareDeIncome: "Yes (graduated, up to ~6.6%)",
    compareMtTax: "Resort-area local taxes in a few towns (Big Sky, Whitefish, etc.)",
    compareMtIncome: "Yes (graduated)",
    compareNhTax: "Meals & Rooms tax (~8.5%) on prepared food and lodging only",
    compareNhIncome: "No wage income tax",
    compareOrTax: "None. Corporate Activity Tax on businesses.",
    compareOrIncome: "Yes (graduated, up to ~9.9%)",
    compareAkTax: "Borough-level local sales tax in many cities (0–7.5%)",
    compareAkIncome: "No state income tax"
  },
  "zh-CN": {
    pageTitle: "随机地址生成器 | 美国 50 州、尼日利亚、埃及、土耳其、巴基斯坦",
    metaDescription:
      "生成美国 50 个州以及多国随机地址测试数据，适用于表单开发、QA、演示和占位记录。",
    brand: "美国地址生成器",
    headerNote: "面向美国州和国际表单的测试地址数据",
    languageLabel: "语言",
    eyebrow: "美国与国际地址生成器",
    h1: "美国与国际测试地址生成器",
    lede:
      "生成符合格式习惯的测试地址数据，覆盖美国 50 个州以及多国地址格式。适用于 QA、表单开发、演示、种子数据和安全占位记录。",
    tabUs: "美国州",
    tabNigeria: "尼日利亚",
    tabEgypt: "埃及",
    tabTurkey: "土耳其",
    tabPakistan: "巴基斯坦",
    stateLabel: "美国州",
    regionLabel: "地区",
    randomStateOption: "随机美国州",
    randomRegionOption: "随机地区",
    generateButton: "生成地址",
    stateHelp: "城市、州、ZIP Code 和电话区号都来自同一个美国州数据集，避免明显不匹配。",
    regionHelp: "城市、地区、邮政编码和电话号码都来自对应国家的测试数据集。",
    generatedOnLoad: "加载后已生成",
    generatedAt: "生成时间",
    fieldFullAddress: "完整地址",
    fieldFullName: "姓名",
    fieldStreetAddress: "街道地址",
    fieldCity: "城市",
    fieldState: "州 / 地区",
    fieldZipCode: "邮政编码 / ZIP Code",
    fieldPhoneNumber: "电话号码",
    copyButton: "复制完整地址",
    copiedButton: "已复制",
    copiedToast: "完整地址已复制",
    copyFailedToast: "复制失败，请手动选择地址。",
    usageTitle: "为干净的测试数据而设计",
    usageBodyOne:
      "这个工具保持轻量的静态数据集：覆盖美国 50 个州，以及用于国际表单测试的多国地址格式。数据集便于审核，也适合部署到 Cloudflare Pages。",
    usageBodyTwo:
      "生成器会合成街道地址，并匹配真实的城市、州、ZIP Code 和电话区号组合。它不会验证地址是否可投递，也不应用于冒充身份、规避规则或提交欺诈信息。",
    internationalEyebrow: "国际地址生成器",
    internationalTitle: "国际测试地址生成器",
    internationalIntro:
      "这些国家 Tab 用于生成符合格式习惯的国际测试地址。每条输出都会让城市、地区、邮政编码和电话号码格式与所选国家保持一致。",
    viewAllCountries: "查看全部国家地址生成器",
    seoNigeriaTitle: "尼日利亚地址生成器",
    seoNigeriaBody:
      "生成尼日利亚测试地址，覆盖 Lagos、Abuja、Kano、Port Harcourt、Ibadan 等城市，包含六位邮政编码和 +234 手机号码格式。",
    seoEgyptTitle: "埃及地址生成器",
    seoEgyptBody:
      "生成埃及测试地址，覆盖 Cairo、Giza、Alexandria、Luxor、Mansoura 等省/市，包含埃及邮政编码和 +20 电话格式。",
    seoTurkeyTitle: "土耳其地址生成器",
    seoTurkeyBody:
      "生成土耳其测试地址，覆盖 Istanbul、Ankara、Izmir、Antalya、Bursa，包含五位邮政编码和 +90 手机号码格式。",
    seoPakistanTitle: "巴基斯坦地址生成器",
    seoPakistanBody:
      "生成巴基斯坦测试地址，覆盖 Karachi、Lahore、Islamabad、Rawalpindi、Peshawar，包含省份、邮政编码和 +92 手机号码格式。",
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
    faqFiveQuestion: "为什么填写美国地址时会提示 ZIP Code、城市或州不匹配？",
    faqFiveAnswer:
      "大多数结账或寄送表单会用 USPS 数据交叉校验 ZIP Code 与城市、州的对应关系。当 ZIP 在真实 USPS 数据库中属于另一个城市，或者街道地址未通过 AVS（地址验证系统）查询时，就会出现不匹配提示。这个生成器从同一个州的数据集中挑选城市、州和 ZIP，所以这三项内部一致，但仍然是合成数据，无法通过任何真实的地址校验。",
    faqSixQuestion: "和通用美国地址生成器有什么区别？",
    faqSixAnswer:
      "很多通用生成器不会说明城市、ZIP Code 和电话区号的数据来源。本工具使用易审核的静态数据集，完全在浏览器中运行，无需注册，并且电话区号会匹配所选州，更适合做可预测的测试夹具数据。",
    faqSevenQuestion: "是否支持国际测试地址？",
    faqSevenAnswer:
      "支持。国家 Tab 可以生成多个国家的合成地址记录，并匹配对应国家的城市、地区、邮政编码和电话号码格式。输出仅用于测试和演示，不用于身份声明或真实投递。",
    faqEightQuestion: "这些国际地址能通过真实验证吗？",
    faqEightAnswer:
      "不能。它们只是符合格式习惯的占位数据，可能在字段内部保持一致，但没有经过邮政、银行、电信、政府或物流数据库验证。",
    featuresTitle: "为什么选择这个地址生成器？",
    featureOneTitle: "字段同州匹配",
    featureOneBody:
      "城市、ZIP Code 和电话区号始终取自同一个州的记录，地址在任何表单校验流程中都保持内部一致。",
    featureTwoTitle: "完全在浏览器中运行",
    featureTwoBody:
      "无后端、无需注册。地址生成过程完全在客户端基于一个轻量 JSON 数据集完成，作为静态站托管在 Cloudflare。",
    featureThreeTitle: "聚焦且易审计的数据集",
    featureThreeBody:
      "数据集刻意保持轻量，覆盖美国 50 个州以及多国地址格式，确保工具更快、更稳、更易审计。",
    featureFourTitle: "多语言界面",
    featureFourBody:
      "下拉框切换英文、简体中文、繁体中文，语言偏好通过 URL 参数和本地存储同步。",
    footer: "仅用于开发、测试、演示和占位数据。不得用于欺诈、账号滥用或法律身份声明。",
    footerPrivacy: "隐私政策",
    footerBlog: "博客",
    footerAbout: "关于",
    footerColStates: "销售税测试",
    footerColCountries: "国家",
    footerColResources: "资源",
    footerContactLabel: "联系：",
    compareTitle: "五个无销售税州一览",
    compareIntro: "覆盖五个没有州级销售税的美国州 —— 也就是常说的 NOMAD 州（New Hampshire、Oregon、Montana、Alaska、Delaware）。需要为结账测试场景选州，或者要查哪个州对应哪个区号时，看这张表就够了。",
    compareColState: "州",
    compareColAbbr: "缩写",
    compareColZip: "ZIP 前缀",
    compareColArea: "电话区号",
    compareColTax: "地方销售税",
    compareColIncome: "州个人所得税",
    compareColPage: "生成器",
    compareOpenLink: "查看",
    compareDeTax: "无。对企业征收 Gross Receipts Tax。",
    compareDeIncome: "有（累进，最高约 6.6%）",
    compareMtTax: "Big Sky、Whitefish 等少数度假城镇有地方税",
    compareMtIncome: "有（累进）",
    compareNhTax: "餐饮与住宿税（约 8.5%）只对餐厅和酒店生效",
    compareNhIncome: "工资收入无州税",
    compareOrTax: "无。对企业征收 Corporate Activity Tax。",
    compareOrIncome: "有（累进，最高约 9.9%）",
    compareAkTax: "多数城市有 borough 级地方销售税（0–7.5%）",
    compareAkIncome: "无州所得税"
  },
  "zh-TW": {
    pageTitle: "隨機地址產生器 | 美國 50 州、奈及利亞、埃及、土耳其、巴基斯坦",
    metaDescription:
      "產生美國 50 個州與多國隨機地址測試資料，適用於表單開發、QA、展示和佔位記錄。",
    brand: "美國地址產生器",
    headerNote: "面向美國州與國際表單的測試地址資料",
    languageLabel: "語言",
    eyebrow: "美國與國際地址產生器",
    h1: "美國與國際測試地址產生器",
    lede:
      "產生符合格式習慣的測試地址資料，涵蓋美國 50 個州與多國地址格式。適用於 QA、表單開發、展示、種子資料和安全佔位記錄。",
    tabUs: "美國州",
    tabNigeria: "奈及利亞",
    tabEgypt: "埃及",
    tabTurkey: "土耳其",
    tabPakistan: "巴基斯坦",
    stateLabel: "美國州",
    regionLabel: "地區",
    randomStateOption: "隨機美國州",
    randomRegionOption: "隨機地區",
    generateButton: "產生地址",
    stateHelp: "城市、州、ZIP Code 和電話區碼都來自同一個美國州資料集，避免明顯不匹配。",
    regionHelp: "城市、地區、郵遞區號和電話號碼都來自對應國家的測試資料集。",
    generatedOnLoad: "載入後已產生",
    generatedAt: "產生時間",
    fieldFullAddress: "完整地址",
    fieldFullName: "姓名",
    fieldStreetAddress: "街道地址",
    fieldCity: "城市",
    fieldState: "州 / 地區",
    fieldZipCode: "郵遞區號 / ZIP Code",
    fieldPhoneNumber: "電話號碼",
    copyButton: "複製完整地址",
    copiedButton: "已複製",
    copiedToast: "完整地址已複製",
    copyFailedToast: "複製失敗，請手動選取地址。",
    usageTitle: "為乾淨的測試資料而設計",
    usageBodyOne:
      "這個工具保持輕量的靜態資料集：涵蓋美國 50 個州，以及用於國際表單測試的多國地址格式。資料集便於稽核，也適合部署到 Cloudflare Pages。",
    usageBodyTwo:
      "產生器會合成街道地址，並匹配真實的城市、州、ZIP Code 和電話區碼組合。它不會驗證地址是否可投遞，也不應用於冒充身分、規避規則或提交詐欺資訊。",
    internationalEyebrow: "國際地址產生器",
    internationalTitle: "國際測試地址產生器",
    internationalIntro:
      "這些國家 Tab 用於產生符合格式習慣的國際測試地址。每筆輸出都會讓城市、地區、郵遞區號和電話號碼格式與所選國家保持一致。",
    viewAllCountries: "查看全部國家地址產生器",
    seoNigeriaTitle: "奈及利亞地址產生器",
    seoNigeriaBody:
      "產生奈及利亞測試地址，涵蓋 Lagos、Abuja、Kano、Port Harcourt、Ibadan 等城市，包含六位郵遞區號和 +234 手機號碼格式。",
    seoEgyptTitle: "埃及地址產生器",
    seoEgyptBody:
      "產生埃及測試地址，涵蓋 Cairo、Giza、Alexandria、Luxor、Mansoura 等省/市，包含埃及郵遞區號和 +20 電話格式。",
    seoTurkeyTitle: "土耳其地址產生器",
    seoTurkeyBody:
      "產生土耳其測試地址，涵蓋 Istanbul、Ankara、Izmir、Antalya、Bursa，包含五位郵遞區號和 +90 手機號碼格式。",
    seoPakistanTitle: "巴基斯坦地址產生器",
    seoPakistanBody:
      "產生巴基斯坦測試地址，涵蓋 Karachi、Lahore、Islamabad、Rawalpindi、Peshawar，包含省份、郵遞區號和 +92 手機號碼格式。",
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
    faqFiveQuestion: "為什麼填寫美國地址時會提示 ZIP Code、城市或州不匹配？",
    faqFiveAnswer:
      "大多數結帳或寄送表單會使用 USPS 資料交叉驗證 ZIP Code 與城市、州的對應關係。當 ZIP 在真實 USPS 資料庫中屬於另一個城市，或街道地址未通過 AVS（地址驗證系統）查詢時，就會出現不匹配提示。本產生器從同一州的資料集中挑選城市、州與 ZIP，所以這三項內部一致，但仍是合成資料，無法通過任何真實的地址驗證。",
    faqSixQuestion: "與通用美國地址產生器有什麼差別？",
    faqSixAnswer:
      "很多通用產生器不會說明城市、ZIP Code 和電話區碼的資料來源。本工具使用易稽核的靜態資料集，完全在瀏覽器中執行，無需註冊，並且電話區碼會配對所選州，更適合可預測的測試夾具資料。",
    faqSevenQuestion: "是否支援國際測試地址？",
    faqSevenAnswer:
      "支援。國家 Tab 可以產生多個國家的合成地址記錄，並配對對應國家的城市、地區、郵遞區號和電話號碼格式。輸出僅用於測試和展示，不用於身分聲明或真實投遞。",
    faqEightQuestion: "這些國際地址能通過真實驗證嗎？",
    faqEightAnswer:
      "不能。它們只是符合格式習慣的佔位資料，可能在欄位內部保持一致，但沒有經過郵政、銀行、電信、政府或物流資料庫驗證。",
    featuresTitle: "為什麼選擇這個地址產生器？",
    featureOneTitle: "欄位同州配對",
    featureOneBody:
      "城市、ZIP Code 與電話區碼一律取自同一州的記錄，地址在任何表單驗證流程中都保持內部一致。",
    featureTwoTitle: "完全在瀏覽器中執行",
    featureTwoBody:
      "無後端、無需註冊。地址產生過程完全在客戶端基於輕量 JSON 資料集完成，作為靜態站託管於 Cloudflare。",
    featureThreeTitle: "聚焦且易稽核的資料集",
    featureThreeBody:
      "資料集刻意保持輕量，涵蓋美國 50 個州與多國地址格式，使工具更快、更穩、更易稽核。",
    featureFourTitle: "多語介面",
    featureFourBody:
      "下拉選單切換英文、簡體中文、繁體中文，語言偏好透過 URL 參數與本機儲存同步。",
    footer: "僅用於開發、測試、展示和佔位資料。不得用於詐欺、帳號濫用或法律身分聲明。",
    footerPrivacy: "隱私政策",
    footerBlog: "部落格",
    footerAbout: "關於",
    footerColStates: "銷售稅測試",
    footerColCountries: "國家",
    footerColResources: "資源",
    footerContactLabel: "聯絡：",
    compareTitle: "五個無銷售稅州一覽",
    compareIntro: "涵蓋五個沒有州級銷售稅的美國州 —— 也就是常說的 NOMAD 州（New Hampshire、Oregon、Montana、Alaska、Delaware）。需要為結帳測試情境挑州，或者要查哪個州對應哪個區碼時，看這張表就夠了。",
    compareColState: "州",
    compareColAbbr: "縮寫",
    compareColZip: "ZIP 前綴",
    compareColArea: "電話區碼",
    compareColTax: "地方銷售稅",
    compareColIncome: "州個人所得稅",
    compareColPage: "產生器",
    compareOpenLink: "查看",
    compareDeTax: "無。對企業課徵 Gross Receipts Tax。",
    compareDeIncome: "有（累進，最高約 6.6%）",
    compareMtTax: "Big Sky、Whitefish 等少數度假城鎮有地方稅",
    compareMtIncome: "有（累進）",
    compareNhTax: "餐飲與住宿稅（約 8.5%）只對餐廳和飯店生效",
    compareNhIncome: "工資收入無州稅",
    compareOrTax: "無。對企業課徵 Corporate Activity Tax。",
    compareOrIncome: "有（累進，最高約 9.9%）",
    compareAkTax: "多數城市有 borough 級地方銷售稅（0–7.5%）",
    compareAkIncome: "無州所得稅"
  }
};

const stateSelect = document.querySelector("#state-select");
const languageSelect = document.querySelector("#language-select");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");
const toast = document.querySelector("#toast");
const countryTabs = Array.from(document.querySelectorAll(".country-tab"));
const locationSelectLabel = document.querySelector("#location-select-label");
const stateHelp = document.querySelector("#state-help");

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
let activeCountry = "US";

function getInitialLanguage() {
  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  if (LANGUAGES.includes(urlLanguage)) return urlLanguage;

  const savedLanguage = window.localStorage.getItem("addressGeneratorLanguage");
  if (LANGUAGES.includes(savedLanguage)) return savedLanguage;

  const browserLanguage = (navigator.language || "").toLowerCase();
  if (browserLanguage.startsWith("zh-tw") || browserLanguage.startsWith("zh-hk") || browserLanguage.startsWith("zh-mo") || browserLanguage.startsWith("zh-hant")) {
    return "zh-TW";
  }

  if (browserLanguage.startsWith("zh-cn") || browserLanguage.startsWith("zh-sg") || browserLanguage.startsWith("zh-hans") || browserLanguage === "zh") {
    return "zh-CN";
  }

  if (browserLanguage.startsWith("en")) {
    return "en";
  }

  return "en";
}

function t(key) {
  return TRANSLATIONS[currentLanguage][key] || TRANSLATIONS.en[key] || key;
}

function generateAddress() {
  return createAddress({ countryCode: activeCountry, location: stateSelect.value || "RANDOM" });
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

  const canonicalLink = document.querySelector('link[rel="canonical"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const selfUrl =
    currentLanguage === "en"
      ? "https://usaddregen.com/"
      : `https://usaddregen.com/${currentLanguage}/`;
  if (canonicalLink) canonicalLink.href = selfUrl;
  if (ogUrl) ogUrl.content = selfUrl;

  const blogPath = currentLanguage === "en" ? "/blog/" : `/blog/${currentLanguage}/`;
  document.querySelectorAll("[data-blog-link]").forEach((link) => {
    link.href = blogPath;
  });

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

  populateLocationSelect();

  if (currentAddress) {
    renderAddress(currentAddress);
  } else {
    fields.stateBadge.textContent = "Ready";
    fields.updatedAt.textContent = t("generatedOnLoad");
  }
}

function setActiveCountry(countryCode) {
  activeCountry = COUNTRY_CODES.includes(countryCode) ? countryCode : "US";

  countryTabs.forEach((tab) => {
    const isActive = tab.dataset.country === activeCountry;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  const activeTab = countryTabs.find((tab) => tab.dataset.country === activeCountry);
  activeTab?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });

  populateLocationSelect();
  renderAddress(generateAddress());
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

function populateLocationSelect() {
  const selectedValue = stateSelect.value || "RANDOM";
  stateSelect.textContent = "";

  const randomOption = document.createElement("option");
  randomOption.value = "RANDOM";
  randomOption.textContent = activeCountry === "US" ? t("randomStateOption") : t("randomRegionOption");
  stateSelect.append(randomOption);

  if (activeCountry === "US") {
    STATES.forEach((state) => {
      const option = document.createElement("option");
      option.value = state.abbr;
      option.textContent = `${state.name} (${state.abbr})`;
      stateSelect.append(option);
    });
  } else {
    const countryDataset = INTERNATIONAL_COUNTRIES[activeCountry];
    countryDataset.cities.forEach((city) => {
      const option = document.createElement("option");
      option.value = city.name;
      option.textContent = `${city.name}, ${city.region}`;
      stateSelect.append(option);
    });
  }

  stateSelect.value = selectedValue;
  if (!stateSelect.value) stateSelect.value = "RANDOM";

  locationSelectLabel.textContent = activeCountry === "US" ? t("stateLabel") : t("regionLabel");
  stateHelp.textContent = activeCountry === "US" ? t("stateHelp") : t("regionHelp");
}

function bindEvents() {
  generateButton.addEventListener("click", () => renderAddress(generateAddress()));
  stateSelect.addEventListener("change", () => renderAddress(generateAddress()));
  languageSelect.addEventListener("change", (event) => applyLanguage(event.target.value));
  copyButton.addEventListener("click", copyCurrentAddress);
  countryTabs.forEach((tab) => {
    tab.addEventListener("click", () => setActiveCountry(tab.dataset.country));
  });
}

bindEvents();
applyLanguage(currentLanguage);

const urlParams = new URLSearchParams(window.location.search);
const urlCountry = urlParams.get("country");
if (urlCountry && COUNTRY_CODES.includes(urlCountry.toUpperCase())) {
  setActiveCountry(urlCountry.toUpperCase());
}

const urlState = urlParams.get("state");
if (urlState && STATES.some((s) => s.abbr === urlState.toUpperCase())) {
  stateSelect.value = urlState.toUpperCase();
}

renderAddress(generateAddress());
