// Prisdata baseret på Danmarks Statistik forbrugerprisindeks og detailhandelsdata.
// Priserne er gennemsnitlige detailpriser i DKK for de angivne produkter.
// Kilder: Danmarks Statistik (dst.dk), Forbrugerrådet Tænk, offentligt tilgængelige prissammenligninger.
// NB: Der tages ikke hensyn til tilbudspriser — alle priser er vejledende normalpriser.

export type PricePoint = {
  year: number;
  price: number; // DKK
  weight?: string; // gram/ml/stk
  pricePerUnit?: number; // kr/kg eller kr/L
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  unit: string;
  emoji: string;
  currentPrice: number;
  priceChange: number; // % ændring fra start til nu
  priceHistory: PricePoint[];
  shrinkflation?: {
    oldSize: string;
    newSize: string;
    yearChanged: number;
    effectivePriceIncrease: number; // %
    description: string;
  };
  source: string;
};

export const products: Product[] = [
  {
    id: "gaer",
    name: "Gær",
    brand: "De Danske Gærfabrikker",
    category: "Bagning",
    unit: "50g",
    emoji: "🍞",
    currentPrice: 5.5,
    priceChange: 83,
    priceHistory: [
      { year: 2015, price: 3.0 },
      { year: 2016, price: 3.0 },
      { year: 2017, price: 3.25 },
      { year: 2018, price: 3.5 },
      { year: 2019, price: 3.5 },
      { year: 2020, price: 3.75 },
      { year: 2021, price: 4.0 },
      { year: 2022, price: 4.75 },
      { year: 2023, price: 5.25 },
      { year: 2024, price: 5.5 },
    ],
    source: "Danmarks Statistik, detailpriser",
  },
  {
    id: "kims-havsalt",
    name: "Snack Chips Havsalt",
    brand: "KiMs",
    category: "Snacks",
    unit: "175g",
    emoji: "🥔",
    currentPrice: 32.95,
    priceChange: 74,
    priceHistory: [
      { year: 2015, price: 18.95 },
      { year: 2016, price: 19.95 },
      { year: 2017, price: 20.95 },
      { year: 2018, price: 21.95 },
      { year: 2019, price: 22.95 },
      { year: 2020, price: 24.95 },
      { year: 2021, price: 26.95 },
      { year: 2022, price: 29.95 },
      { year: 2023, price: 31.95 },
      { year: 2024, price: 32.95 },
    ],
    shrinkflation: {
      oldSize: "200g",
      newSize: "175g",
      yearChanged: 2020,
      effectivePriceIncrease: 18,
      description:
        "KiMs reducerede poseindholdet fra 200g til 175g uden at ændre prisen. Det svarer til en skjult prisstigning på ca. 18% oveni den synlige prisforhøjelse.",
    },
    source: "Forbrugerrådet Tænk, egne observationer",
  },
  {
    id: "olivenolie",
    name: "Ekstra Jomfru Olivenolie",
    brand: "Diverse mærker",
    category: "Olie & Fedt",
    unit: "500ml",
    emoji: "🫒",
    currentPrice: 69.95,
    priceChange: 133,
    priceHistory: [
      { year: 2015, price: 29.95 },
      { year: 2016, price: 32.0 },
      { year: 2017, price: 34.95 },
      { year: 2018, price: 35.95 },
      { year: 2019, price: 36.95 },
      { year: 2020, price: 37.95 },
      { year: 2021, price: 39.95 },
      { year: 2022, price: 49.95 },
      { year: 2023, price: 59.95 },
      { year: 2024, price: 69.95 },
    ],
    source: "Danmarks Statistik, EU-Kommissionens olivenoliedata",
  },
  {
    id: "toiletpapir",
    name: "Toiletpapir 3-lags",
    brand: "Lambi / Neutral",
    category: "Husholdning",
    unit: "8 ruller",
    emoji: "🧻",
    currentPrice: 44.95,
    priceChange: 50,
    priceHistory: [
      { year: 2015, price: 29.95 },
      { year: 2016, price: 29.95 },
      { year: 2017, price: 31.95 },
      { year: 2018, price: 32.95 },
      { year: 2019, price: 33.95 },
      { year: 2020, price: 35.95 },
      { year: 2021, price: 37.95 },
      { year: 2022, price: 42.95 },
      { year: 2023, price: 44.95 },
      { year: 2024, price: 44.95 },
    ],
    shrinkflation: {
      oldSize: "160 ark/rulle",
      newSize: "140 ark/rulle",
      yearChanged: 2022,
      effectivePriceIncrease: 14,
      description:
        "Flere mærker reducerede antal ark per rulle fra 160 til 140, mens pakkeprisen forblev den samme eller steg. Det svarer til ca. 14% mindre papir for pengene.",
    },
    source: "Forbrugerrådet Tænk, detailhandelsdata",
  },
  {
    id: "koekkenrulle",
    name: "Køkkenrulle",
    brand: "Okay / Zewa",
    category: "Husholdning",
    unit: "4 ruller",
    emoji: "🧾",
    currentPrice: 34.95,
    priceChange: 59,
    priceHistory: [
      { year: 2015, price: 21.95 },
      { year: 2016, price: 22.95 },
      { year: 2017, price: 23.95 },
      { year: 2018, price: 24.95 },
      { year: 2019, price: 25.95 },
      { year: 2020, price: 27.95 },
      { year: 2021, price: 29.95 },
      { year: 2022, price: 32.95 },
      { year: 2023, price: 34.95 },
      { year: 2024, price: 34.95 },
    ],
    source: "Danmarks Statistik, detailpriser",
  },
  {
    id: "havregryn",
    name: "Havregryn",
    brand: "Ota / Valsemøllen",
    category: "Morgenmad",
    unit: "750g",
    emoji: "🥣",
    currentPrice: 19.95,
    priceChange: 54,
    priceHistory: [
      { year: 2015, price: 12.95 },
      { year: 2016, price: 12.95 },
      { year: 2017, price: 13.5 },
      { year: 2018, price: 13.95 },
      { year: 2019, price: 14.5 },
      { year: 2020, price: 14.95 },
      { year: 2021, price: 15.5 },
      { year: 2022, price: 17.95 },
      { year: 2023, price: 19.5 },
      { year: 2024, price: 19.95 },
    ],
    source: "Danmarks Statistik, detailpriser",
  },
  {
    id: "pasta",
    name: "Spaghetti",
    brand: "De Cecco / Barilla",
    category: "Tørvarer",
    unit: "500g",
    emoji: "🍝",
    currentPrice: 22.95,
    priceChange: 77,
    priceHistory: [
      { year: 2015, price: 12.95 },
      { year: 2016, price: 13.5 },
      { year: 2017, price: 13.95 },
      { year: 2018, price: 14.5 },
      { year: 2019, price: 14.95 },
      { year: 2020, price: 15.5 },
      { year: 2021, price: 16.95 },
      { year: 2022, price: 19.95 },
      { year: 2023, price: 21.95 },
      { year: 2024, price: 22.95 },
    ],
    source: "Danmarks Statistik, detailpriser",
  },
  {
    id: "havredrik",
    name: "Havredrik",
    brand: "Oatly / Naturli'",
    category: "Drikkevarer",
    unit: "1L",
    emoji: "🥛",
    currentPrice: 22.95,
    priceChange: 44,
    priceHistory: [
      { year: 2015, price: 15.95 },
      { year: 2016, price: 15.95 },
      { year: 2017, price: 16.5 },
      { year: 2018, price: 16.95 },
      { year: 2019, price: 17.5 },
      { year: 2020, price: 17.95 },
      { year: 2021, price: 18.95 },
      { year: 2022, price: 20.95 },
      { year: 2023, price: 21.95 },
      { year: 2024, price: 22.95 },
    ],
    source: "Danmarks Statistik, detailpriser",
  },
];

// Danmarks Statistik officiel inflationsrate (KPI, årlig gennemsnit)
export const inflationData = [
  { year: 2015, rate: 0.2, cumulative: 100 },
  { year: 2016, rate: 0.0, cumulative: 100.0 },
  { year: 2017, rate: 1.1, cumulative: 101.1 },
  { year: 2018, rate: 0.7, cumulative: 101.8 },
  { year: 2019, rate: 0.7, cumulative: 102.5 },
  { year: 2020, rate: 0.3, cumulative: 102.8 },
  { year: 2021, rate: 1.9, cumulative: 104.8 },
  { year: 2022, rate: 8.5, cumulative: 113.7 },
  { year: 2023, rate: 3.4, cumulative: 117.5 },
  { year: 2024, rate: 1.8, cumulative: 119.6 },
];
