import { INTERNATIONAL_COUNTRIES } from "../data/countries.js";
import { STATES } from "../data/states.js";

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

const STREET_SUFFIXES = ["St", "Ave", "Rd", "Dr", "Ln", "Way", "Ct", "Pl", "Ter", "Blvd"];

export function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getStateByAbbr(abbr) {
  return STATES.find((state) => state.abbr === abbr) || null;
}

export function getCountryDataset(countryCode) {
  return INTERNATIONAL_COUNTRIES[countryCode] || null;
}

function formatPhone(areaCodes) {
  const areaCode = randomItem(areaCodes);
  const exchange = randomNumber(200, 899);
  const line = String(randomNumber(0, 9999)).padStart(4, "0");
  return `(${areaCode}) ${exchange}-${line}`;
}

function formatInternationalPhone(country) {
  const prefix = randomItem(country.phonePrefixes);
  const first = randomNumber(100, 999);
  const second = String(randomNumber(0, 9999)).padStart(4, "0");
  return `${country.phoneCode} ${prefix} ${first} ${second}`;
}

export function generateUsAddress(stateAbbr = "RANDOM") {
  const selectedState = stateAbbr === "RANDOM" ? randomItem(STATES) : getStateByAbbr(stateAbbr);
  const state = selectedState || STATES[0];
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

export function generateInternationalAddress(countryCode, cityName = "RANDOM") {
  const country = getCountryDataset(countryCode);
  if (!country) return generateUsAddress();

  const selectedCity =
    cityName === "RANDOM"
      ? randomItem(country.cities)
      : country.cities.find((city) => city.name === cityName);
  const city = selectedCity || country.cities[0];
  const zip = randomItem(city.zips);
  const streetNumber = randomNumber(4, 188);
  const street = `${streetNumber} ${randomItem(country.streetNames)} ${randomItem(country.streetSuffixes)}`;
  const fullName = `${randomItem(country.firstNames)} ${randomItem(country.lastNames)}`;
  const phoneNumber = formatInternationalPhone(country);
  const fullAddress = `${fullName}\n${street}\n${city.name}, ${city.region} ${zip}\n${country.name}`;

  return {
    fullName,
    streetAddress: street,
    city: city.name,
    state: city.region,
    stateAbbr: country.short,
    zipCode: zip,
    phoneNumber,
    fullAddress,
    copyText: `${fullAddress}\nPhone: ${phoneNumber}`
  };
}

export function generateAddress({ countryCode = "US", location = "RANDOM" } = {}) {
  if (countryCode === "US") {
    return generateUsAddress(location);
  }

  return generateInternationalAddress(countryCode, location);
}
