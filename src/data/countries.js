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
  },
  IN: {
    name: "India",
    short: "IN",
    phoneCode: "+91",
    phonePrefixes: ["700", "801", "900", "981", "987"],
    firstNames: ["Aarav", "Ananya", "Rohan", "Priya", "Vikram", "Neha", "Ishaan", "Meera"],
    lastNames: ["Sharma", "Patel", "Singh", "Iyer", "Gupta", "Rao", "Mehta", "Nair"],
    streetNames: ["MG", "Nehru", "Linking", "Anna Salai", "Park", "Brigade", "Rajpath", "Ring"],
    streetSuffixes: ["Road", "Marg", "Street", "Avenue", "Lane"],
    cities: [
      { name: "Mumbai", region: "Maharashtra", zips: ["400001", "400050", "400076"] },
      { name: "Delhi", region: "Delhi", zips: ["110001", "110016", "110092"] },
      { name: "Bengaluru", region: "Karnataka", zips: ["560001", "560038", "560100"] },
      { name: "Chennai", region: "Tamil Nadu", zips: ["600001", "600028", "600100"] },
      { name: "Hyderabad", region: "Telangana", zips: ["500001", "500032", "500081"] }
    ]
  },
  PH: {
    name: "Philippines",
    short: "PH",
    phoneCode: "+63",
    phonePrefixes: ["917", "918", "927", "935", "956"],
    firstNames: ["Jose", "Maria", "Carlo", "Angela", "Miguel", "Sofia", "Paolo", "Isabela"],
    lastNames: ["Santos", "Reyes", "Cruz", "Garcia", "Dela Cruz", "Ramos", "Mendoza", "Torres"],
    streetNames: ["Rizal", "Mabini", "Bonifacio", "Quezon", "Taft", "Ayala", "Ortigas", "Roxas"],
    streetSuffixes: ["Street", "Avenue", "Road", "Drive"],
    cities: [
      { name: "Manila", region: "Metro Manila", zips: ["1000", "1004", "1012"] },
      { name: "Quezon City", region: "Metro Manila", zips: ["1100", "1101", "1128"] },
      { name: "Makati", region: "Metro Manila", zips: ["1200", "1226"] },
      { name: "Cebu City", region: "Cebu", zips: ["6000"] },
      { name: "Davao City", region: "Davao del Sur", zips: ["8000"] }
    ]
  },
  ID: {
    name: "Indonesia",
    short: "ID",
    phoneCode: "+62",
    phonePrefixes: ["812", "813", "821", "822", "856"],
    firstNames: ["Budi", "Siti", "Agus", "Dewi", "Rizky", "Putri", "Adi", "Maya"],
    lastNames: ["Santoso", "Wijaya", "Pratama", "Sari", "Saputra", "Hidayat", "Lestari", "Kusuma"],
    streetNames: ["Sudirman", "Thamrin", "Gatot Subroto", "Diponegoro", "Merdeka", "Asia Afrika", "Pemuda"],
    streetSuffixes: ["Jalan", "Street", "Road"],
    cities: [
      { name: "Jakarta", region: "DKI Jakarta", zips: ["10110", "10220", "12950"] },
      { name: "Surabaya", region: "East Java", zips: ["60111", "60234", "60271"] },
      { name: "Bandung", region: "West Java", zips: ["40111", "40132", "40286"] },
      { name: "Medan", region: "North Sumatra", zips: ["20111", "20152", "20222"] },
      { name: "Denpasar", region: "Bali", zips: ["80111", "80222"] }
    ]
  },
  BR: {
    name: "Brazil",
    short: "BR",
    phoneCode: "+55",
    phonePrefixes: ["11", "21", "31", "41", "51"],
    firstNames: ["Lucas", "Mariana", "Joao", "Ana", "Pedro", "Camila", "Rafael", "Beatriz"],
    lastNames: ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Costa", "Almeida", "Lima"],
    streetNames: ["Paulista", "Atlantica", "Rio Branco", "Brasil", "Ibirapuera", "Sete de Setembro", "Liberdade"],
    streetSuffixes: ["Avenida", "Rua", "Travessa"],
    cities: [
      { name: "Sao Paulo", region: "Sao Paulo", zips: ["01001-000", "01310-100", "04538-132"] },
      { name: "Rio de Janeiro", region: "Rio de Janeiro", zips: ["20010-000", "22010-000", "22290-240"] },
      { name: "Brasilia", region: "Distrito Federal", zips: ["70040-010", "70701-000"] },
      { name: "Salvador", region: "Bahia", zips: ["40020-000", "40140-110"] },
      { name: "Curitiba", region: "Parana", zips: ["80010-000", "80420-090"] }
    ]
  },
  MX: {
    name: "Mexico",
    short: "MX",
    phoneCode: "+52",
    phonePrefixes: ["55", "33", "81", "222", "664"],
    firstNames: ["Santiago", "Valeria", "Diego", "Sofia", "Carlos", "Lucia", "Mateo", "Camila"],
    lastNames: ["Garcia", "Hernandez", "Lopez", "Martinez", "Gonzalez", "Perez", "Rodriguez", "Sanchez"],
    streetNames: ["Reforma", "Insurgentes", "Juarez", "Hidalgo", "Madero", "Universidad", "Chapultepec"],
    streetSuffixes: ["Avenida", "Calle", "Boulevard"],
    cities: [
      { name: "Mexico City", region: "Ciudad de Mexico", zips: ["01000", "03100", "06700"] },
      { name: "Guadalajara", region: "Jalisco", zips: ["44100", "44600", "45050"] },
      { name: "Monterrey", region: "Nuevo Leon", zips: ["64000", "64650", "64800"] },
      { name: "Puebla", region: "Puebla", zips: ["72000", "72410"] },
      { name: "Tijuana", region: "Baja California", zips: ["22000", "22320"] }
    ]
  },
  GB: {
    name: "United Kingdom",
    short: "GB",
    phoneCode: "+44",
    phonePrefixes: ["7700", "7911", "7400", "7555", "7800"],
    firstNames: ["Oliver", "Amelia", "George", "Isla", "Harry", "Ava", "Noah", "Freya"],
    lastNames: ["Smith", "Jones", "Taylor", "Brown", "Wilson", "Evans", "Thomas", "Roberts"],
    streetNames: ["High", "Station", "Church", "Victoria", "Queen", "King", "Oxford", "Park"],
    streetSuffixes: ["Street", "Road", "Avenue", "Lane", "Close"],
    cities: [
      { name: "London", region: "England", zips: ["SW1A 1AA", "EC1A 1BB", "W1A 0AX"] },
      { name: "Manchester", region: "England", zips: ["M1 1AE", "M2 5DB"] },
      { name: "Birmingham", region: "England", zips: ["B1 1AA", "B2 4QA"] },
      { name: "Edinburgh", region: "Scotland", zips: ["EH1 1YZ", "EH3 9DR"] },
      { name: "Cardiff", region: "Wales", zips: ["CF10 1AA", "CF24 0AB"] }
    ]
  },
  CA: {
    name: "Canada",
    short: "CA",
    phoneCode: "+1",
    phonePrefixes: ["416", "514", "604", "613", "778"],
    firstNames: ["Liam", "Emma", "Noah", "Olivia", "Lucas", "Ava", "Ethan", "Mia"],
    lastNames: ["Smith", "Brown", "Tremblay", "Martin", "Roy", "Wilson", "Taylor", "Lee"],
    streetNames: ["Queen", "King", "Main", "Yonge", "Bloor", "Granville", "Robson", "Rue Sainte-Catherine"],
    streetSuffixes: ["Street", "Avenue", "Road", "Boulevard"],
    cities: [
      { name: "Toronto", region: "Ontario", zips: ["M5V 2T6", "M4B 1B3", "M6H 3A5"] },
      { name: "Montreal", region: "Quebec", zips: ["H3Z 2Y7", "H2X 1Y4"] },
      { name: "Vancouver", region: "British Columbia", zips: ["V6B 1A1", "V5K 0A1"] },
      { name: "Calgary", region: "Alberta", zips: ["T2P 1J9", "T3A 5K8"] },
      { name: "Ottawa", region: "Ontario", zips: ["K1A 0B1", "K2P 1L4"] }
    ]
  },
  AU: {
    name: "Australia",
    short: "AU",
    phoneCode: "+61",
    phonePrefixes: ["412", "414", "421", "431", "450"],
    firstNames: ["Jack", "Charlotte", "William", "Olivia", "Noah", "Amelia", "Henry", "Mia"],
    lastNames: ["Smith", "Jones", "Williams", "Brown", "Wilson", "Taylor", "Martin", "Anderson"],
    streetNames: ["George", "Collins", "Queen", "King", "Elizabeth", "Flinders", "Pitt", "Adelaide"],
    streetSuffixes: ["Street", "Road", "Avenue", "Drive", "Parade"],
    cities: [
      { name: "Sydney", region: "New South Wales", zips: ["2000", "2010", "2060"] },
      { name: "Melbourne", region: "Victoria", zips: ["3000", "3004", "3121"] },
      { name: "Brisbane", region: "Queensland", zips: ["4000", "4101", "4171"] },
      { name: "Perth", region: "Western Australia", zips: ["6000", "6005", "6151"] },
      { name: "Adelaide", region: "South Australia", zips: ["5000", "5006"] }
    ]
  },
  JP: {
    name: "Japan",
    short: "JP",
    phoneCode: "+81",
    phonePrefixes: ["70", "80", "90"],
    firstNames: ["Haruto", "Yui", "Sota", "Aoi", "Ren", "Hina", "Daiki", "Mio"],
    lastNames: ["Sato", "Suzuki", "Takahashi", "Tanaka", "Watanabe", "Ito", "Yamamoto", "Nakamura"],
    streetNames: ["Chuo", "Sakura", "Aoyama", "Shinjuku", "Ginza", "Nakamachi", "Minami", "Kita"],
    streetSuffixes: ["Dori", "Street", "Avenue", "Lane"],
    cities: [
      { name: "Tokyo", region: "Tokyo", zips: ["100-0001", "150-0001", "160-0022"] },
      { name: "Osaka", region: "Osaka", zips: ["530-0001", "542-0081"] },
      { name: "Yokohama", region: "Kanagawa", zips: ["220-0012", "231-0005"] },
      { name: "Nagoya", region: "Aichi", zips: ["450-0002", "460-0008"] },
      { name: "Sapporo", region: "Hokkaido", zips: ["060-0001", "064-0801"] }
    ]
  },
  FR: {
    name: "France",
    short: "FR",
    phoneCode: "+33",
    phonePrefixes: ["6", "7"],
    firstNames: ["Lucas", "Emma", "Louis", "Chloe", "Hugo", "Lea", "Jules", "Manon"],
    lastNames: ["Martin", "Bernard", "Dubois", "Thomas", "Robert", "Richard", "Petit", "Moreau"],
    streetNames: ["Victor Hugo", "Jean Jaures", "de la Republique", "Pasteur", "Nationale", "Voltaire", "de Paris"],
    streetSuffixes: ["Rue", "Avenue", "Boulevard", "Place"],
    cities: [
      { name: "Paris", region: "Ile-de-France", zips: ["75001", "75008", "75015"] },
      { name: "Lyon", region: "Auvergne-Rhone-Alpes", zips: ["69001", "69003"] },
      { name: "Marseille", region: "Provence-Alpes-Cote d'Azur", zips: ["13001", "13008"] },
      { name: "Toulouse", region: "Occitanie", zips: ["31000", "31400"] },
      { name: "Nice", region: "Provence-Alpes-Cote d'Azur", zips: ["06000", "06300"] }
    ]
  },
  CN: {
    name: "China Mainland",
    short: "CN",
    phoneCode: "+86",
    phonePrefixes: ["130", "131", "138", "150", "186"],
    firstNames: ["Wei", "Ming", "Li", "Jie", "Hao", "Yan", "Rui", "Ning"],
    lastNames: ["Wang", "Li", "Zhang", "Liu", "Chen", "Yang", "Zhao", "Huang"],
    streetNames: ["Renmin", "Zhongshan", "Jiefang", "Chang'an", "Nanjing", "Huaihai", "Tiyu", "Xinhua"],
    streetSuffixes: ["Road", "Street", "Avenue", "Lane"],
    cities: [
      { name: "Beijing", region: "Beijing", zips: ["100000", "100020", "100089"] },
      { name: "Shanghai", region: "Shanghai", zips: ["200000", "200041", "200120"] },
      { name: "Guangzhou", region: "Guangdong", zips: ["510000", "510620"] },
      { name: "Shenzhen", region: "Guangdong", zips: ["518000", "518048"] },
      { name: "Hangzhou", region: "Zhejiang", zips: ["310000", "310012"] }
    ]
  }
};

export const COUNTRY_CODES = ["US", ...Object.keys(INTERNATIONAL_COUNTRIES)];
