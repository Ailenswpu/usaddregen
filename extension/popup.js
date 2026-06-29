import { COUNTRY_CODES, INTERNATIONAL_COUNTRIES } from "./shared/data/countries.js";
import { STATES } from "./shared/data/states.js";
import { generateAddress } from "./shared/lib/generate.js";

const countrySelect = document.querySelector("#country");
const locationSelect = document.querySelector("#location");
const status = document.querySelector("#status");
const generateButton = document.querySelector("#generate");
const copyButton = document.querySelector("#copy");
const fillButton = document.querySelector("#fill");

const fields = {
  fullName: document.querySelector("#full-name"),
  fullAddress: document.querySelector("#full-address"),
  streetAddress: document.querySelector("#street-address"),
  city: document.querySelector("#city"),
  state: document.querySelector("#state"),
  zipCode: document.querySelector("#zip-code"),
  phoneNumber: document.querySelector("#phone-number")
};

let currentAddress = null;

function showStatus(message) {
  status.textContent = message;
  window.clearTimeout(showStatus.timer);
  showStatus.timer = window.setTimeout(() => {
    status.textContent = "";
  }, 1800);
}

function populateLocations() {
  const countryCode = COUNTRY_CODES.includes(countrySelect.value) ? countrySelect.value : "US";
  locationSelect.textContent = "";

  const randomOption = document.createElement("option");
  randomOption.value = "RANDOM";
  randomOption.textContent = countryCode === "US" ? "Random US state" : "Random region";
  locationSelect.append(randomOption);

  if (countryCode === "US") {
    STATES.forEach((state) => {
      const option = document.createElement("option");
      option.value = state.abbr;
      option.textContent = `${state.name} (${state.abbr})`;
      locationSelect.append(option);
    });
    return;
  }

  INTERNATIONAL_COUNTRIES[countryCode].cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city.name;
    option.textContent = `${city.name}, ${city.region}`;
    locationSelect.append(option);
  });
}

function renderAddress(address) {
  currentAddress = address;
  fields.fullName.textContent = address.fullName;
  fields.fullAddress.textContent = address.fullAddress;
  fields.streetAddress.textContent = address.streetAddress;
  fields.city.textContent = address.city;
  fields.state.textContent = address.state;
  fields.zipCode.textContent = address.zipCode;
  fields.phoneNumber.textContent = address.phoneNumber;
}

function createAddress() {
  renderAddress(
    generateAddress({
      countryCode: countrySelect.value,
      location: locationSelect.value || "RANDOM"
    })
  );
}

async function copyAddress() {
  if (!currentAddress) return;
  await navigator.clipboard.writeText(currentAddress.copyText);
  showStatus("Copied full address");
}

async function fillActiveTab() {
  if (!currentAddress || typeof chrome === "undefined" || !chrome.tabs) return;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    showStatus("No active tab found");
    return;
  }

  try {
    const response = await chrome.tabs.sendMessage(tab.id, {
      type: "USADDREGEN_FILL_ADDRESS",
      address: currentAddress
    });
    showStatus(response?.filled ? `Filled ${response.filled} fields` : "No matching fields found");
  } catch {
    showStatus("Open a normal web page, then try again");
  }
}

countrySelect.addEventListener("change", () => {
  populateLocations();
  createAddress();
});
locationSelect.addEventListener("change", createAddress);
generateButton.addEventListener("click", createAddress);
copyButton.addEventListener("click", copyAddress);
fillButton.addEventListener("click", fillActiveTab);

populateLocations();
createAddress();
