export const INTERNATIONAL_COUNTRIES = {
  NG: {
    name: "Nigeria",
    short: "NG",
    phoneCode: "+234",
    phonePrefixes: ["701", "803", "805", "806", "809", "812", "813", "905"],
    firstNames: ["Amina", "Chinedu", "Tunde", "Ngozi", "Musa", "Kemi", "Ifeanyi", "Zainab"],
    lastNames: ["Adeyemi", "Okafor", "Ibrahim", "Eze", "Balogun", "Nwosu", "Mohammed", "Adebayo"],
    streetNames: ["Adeniyi Jones", "Ahmadu Bello", "Bourdillon", "Allen", "Gimbiya", "Aminu Kano", "Murtala Mohammed", "Sani Abacha"],
    streetSuffixes: ["Street", "Road", "Avenue", "Close", "Crescent"],
    cities: [
      { name: "Lagos", region: "Lagos State", zips: ["100001", "100211", "101233"] },
      { name: "Ikeja", region: "Lagos State", zips: ["100271", "100282"] },
      { name: "Abuja", region: "Federal Capital Territory", zips: ["900211", "900271"] },
      { name: "Kano", region: "Kano State", zips: ["700231", "700282"] },
      { name: "Port Harcourt", region: "Rivers State", zips: ["500101", "500272"] },
      { name: "Ibadan", region: "Oyo State", zips: ["200221", "200284"] }
    ]
  },
  EG: {
    name: "Egypt",
    short: "EG",
    phoneCode: "+20",
    phonePrefixes: ["10", "11", "12", "15"],
    firstNames: ["Ahmed", "Mariam", "Omar", "Nour", "Hassan", "Youssef", "Farida", "Salma"],
    lastNames: ["El-Sayed", "Hassan", "Mahmoud", "Ibrahim", "Mostafa", "Ali", "Fathy", "Gamal"],
    streetNames: ["Tahrir", "Gamal Abdel Nasser", "El Geish", "Corniche El Nil", "Salah Salem", "26 July", "Ahmed Orabi"],
    streetSuffixes: ["Street", "Road", "Avenue"],
    cities: [
      { name: "Cairo", region: "Cairo Governorate", zips: ["11511", "11765", "11835"] },
      { name: "Giza", region: "Giza Governorate", zips: ["12511", "12611"] },
      { name: "Alexandria", region: "Alexandria Governorate", zips: ["21532", "21615"] },
      { name: "Luxor", region: "Luxor Governorate", zips: ["85951", "85952"] },
      { name: "Mansoura", region: "Dakahlia Governorate", zips: ["35511", "35516"] }
    ]
  },
  TR: {
    name: "Turkey",
    short: "TR",
    phoneCode: "+90",
    phonePrefixes: ["501", "532", "533", "542", "555"],
    firstNames: ["Ahmet", "Elif", "Mehmet", "Zeynep", "Emre", "Ayse", "Can", "Deniz"],
    lastNames: ["Yilmaz", "Kaya", "Demir", "Sahin", "Celik", "Yildiz", "Aydin", "Arslan"],
    streetNames: ["Ataturk", "Cumhuriyet", "Istiklal", "Bagdat", "Barbaros", "Inonu", "Mithatpasa"],
    streetSuffixes: ["Caddesi", "Sokak", "Bulvari"],
    cities: [
      { name: "Istanbul", region: "Istanbul", zips: ["34010", "34330", "34710"] },
      { name: "Ankara", region: "Ankara", zips: ["06010", "06420", "06520"] },
      { name: "Izmir", region: "Izmir", zips: ["35030", "35220"] },
      { name: "Antalya", region: "Antalya", zips: ["07070", "07100"] },
      { name: "Bursa", region: "Bursa", zips: ["16010", "16120"] }
    ]
  },
  PK: {
    name: "Pakistan",
    short: "PK",
    phoneCode: "+92",
    phonePrefixes: ["300", "301", "311", "321", "333", "345"],
    firstNames: ["Ayesha", "Ali", "Fatima", "Hassan", "Zain", "Mariam", "Bilal", "Sana"],
    lastNames: ["Khan", "Ahmed", "Malik", "Hussain", "Raza", "Sheikh", "Qureshi", "Siddiqui"],
    streetNames: ["Jinnah", "Shahrah-e-Faisal", "Mall", "Gulberg", "University", "Khayaban-e-Iqbal", "Blue Area"],
    streetSuffixes: ["Road", "Street", "Avenue", "Block"],
    cities: [
      { name: "Karachi", region: "Sindh", zips: ["74000", "75300", "75500"] },
      { name: "Lahore", region: "Punjab", zips: ["54000", "54660", "54770"] },
      { name: "Islamabad", region: "Islamabad Capital Territory", zips: ["44000", "44220"] },
      { name: "Rawalpindi", region: "Punjab", zips: ["46000", "46300"] },
      { name: "Peshawar", region: "Khyber Pakhtunkhwa", zips: ["25000", "25120"] }
    ]
  }
};

export const COUNTRY_CODES = ["US", ...Object.keys(INTERNATIONAL_COUNTRIES)];
