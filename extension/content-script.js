function textForField(field) {
  const id = field.getAttribute("id");
  const label = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`)?.textContent || "" : "";
  return [
    field.getAttribute("name"),
    field.getAttribute("id"),
    field.getAttribute("placeholder"),
    field.getAttribute("aria-label"),
    field.getAttribute("autocomplete"),
    label
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function setValue(field, value) {
  if (!field || !value) return false;

  if (field.tagName === "SELECT") {
    const options = Array.from(field.options);
    const normalized = String(value).toLowerCase();
    const match = options.find((option) => {
      const optionText = `${option.value} ${option.textContent}`.toLowerCase();
      return optionText.includes(normalized) || normalized.includes(option.value.toLowerCase());
    });
    if (!match) return false;
    field.value = match.value;
  } else {
    field.value = value;
  }

  field.dispatchEvent(new Event("input", { bubbles: true }));
  field.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

function findField(patterns, used) {
  const fields = Array.from(document.querySelectorAll("input, textarea, select")).filter((field) => {
    if (used.has(field)) return false;
    if (field.disabled || field.readOnly) return false;
    const type = (field.getAttribute("type") || "").toLowerCase();
    return !["hidden", "password", "checkbox", "radio", "submit", "button", "file"].includes(type);
  });

  return fields.find((field) => {
    const haystack = textForField(field);
    return patterns.some((pattern) => pattern.test(haystack));
  });
}

function fillAddress(address) {
  const used = new Set();
  let filled = 0;
  const [firstName, ...lastNameParts] = address.fullName.split(" ");
  const lastName = lastNameParts.join(" ");
  const stateName = address.state.replace(/\s*\([A-Z]{2}\)$/, "");

  const mappings = [
    { value: firstName, patterns: [/\bfirst[-_\s]?name\b/, /\bgiven[-_\s]?name\b/] },
    { value: lastName, patterns: [/\blast[-_\s]?name\b/, /\bfamily[-_\s]?name\b/, /\bsurname\b/] },
    { value: address.fullName, patterns: [/\bfull[-_\s]?name\b/, /\bname\b/] },
    { value: address.streetAddress, patterns: [/\baddress[-_\s]?1\b/, /\baddress\b/, /\bstreet\b/, /\baddr\b/, /\bline[-_\s]?1\b/] },
    { value: address.city, patterns: [/\bcity\b/, /\btown\b/, /\blocality\b/] },
    { value: address.stateAbbr, patterns: [/\bstate\b/, /\bprovince\b/, /\bregion\b/, /\badministrative[-_\s]?area\b/] },
    { value: stateName, patterns: [/\bstate\b/, /\bprovince\b/, /\bregion\b/] },
    { value: address.zipCode, patterns: [/\bzip\b/, /\bpostal\b/, /\bpostcode\b/, /\bpost[-_\s]?code\b/] },
    { value: address.phoneNumber, patterns: [/\bphone\b/, /\btel\b/, /\bmobile\b/] }
  ];

  mappings.forEach((mapping) => {
    const field = findField(mapping.patterns, used);
    if (field && setValue(field, mapping.value)) {
      used.add(field);
      filled += 1;
    }
  });

  return filled;
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "USADDREGEN_FILL_ADDRESS") return false;
  const filled = fillAddress(message.address);
  sendResponse({ filled });
  return true;
});
