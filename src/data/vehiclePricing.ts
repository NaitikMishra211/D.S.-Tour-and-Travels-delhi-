export type VehicleCategory = "TAXI" | "TEMPO TRAVELLER" | "LUXURY CARS";

export interface FleetVehicle {
  id: string;
  name: string;
  bookingOptionName: string;
  category: VehicleCategory;
  ratesSectionId: "sedan-suv-rates" | "luxury-car-rates";
  seoKeywords: string[];
  imageUrl?: string; // Ready for user-uploaded vehicle photographs
}

export interface VehicleRateRow {
  cabType: string;
  fourHrsFortyKms: string;
  eightHrsEightyKms: string;
  extraHrs: string;
  extraKms: string;
  localNight: string;
  outstationPerKm: string;
  outstationTa: string;
}

export const FLEET_VEHICLES: FleetVehicle[] = [
  // 1. TAXI Category
  {
    id: "maruti-suzuki-dzire",
    name: "Maruti Suzuki Dzire",
    bookingOptionName: "Maruti Suzuki Dzire",
    category: "TAXI",
    ratesSectionId: "sedan-suv-rates",
    seoKeywords: ["Dzire Taxi Service Delhi", "Sedan Taxi Service Delhi"],
    imageUrl: "/assets/dzire.png",
  },
  {
    id: "toyota-etios",
    name: "Toyota Etios",
    bookingOptionName: "Toyota Etios",
    category: "TAXI",
    ratesSectionId: "sedan-suv-rates",
    seoKeywords: ["Etios Taxi Service Delhi", "Sedan Taxi Service Delhi"],
    imageUrl: "/assets/aistudio/Gemini_Generated_Image_586qo1586qo1586q_5a226588.png",
  },
  {
    id: "honda-city",
    name: "Honda City",
    bookingOptionName: "Honda City",
    category: "TAXI",
    ratesSectionId: "luxury-car-rates",
    seoKeywords: ["Honda City Rental Delhi", "Sedan Taxi Service Delhi"],
    imageUrl: "/assets/aistudio/Gemini_Generated_Image_6knuvw6knuvw6knu_eefaa77c.png",
  },
  {
    id: "toyota-crysta",
    name: "Toyota Crysta",
    bookingOptionName: "Toyota Crysta",
    category: "TAXI",
    ratesSectionId: "sedan-suv-rates",
    seoKeywords: [
      "Innova Crysta Rental Delhi",
      "Toyota Crysta Rental Delhi",
      "SUV Taxi Service Delhi",
    ],
    imageUrl: "/assets/crysta.png",
  },
  {
    id: "kia-carens",
    name: "Kia Carens",
    bookingOptionName: "Kia Carens",
    category: "TAXI",
    ratesSectionId: "sedan-suv-rates",
    seoKeywords: ["Kia Carens Taxi Delhi", "SUV Taxi Booking Delhi"],
    imageUrl: "/assets/carens.png",
  },
  {
    id: "honda-elevate",
    name: "Honda Elevate",
    bookingOptionName: "Honda Elevate",
    category: "TAXI",
    ratesSectionId: "sedan-suv-rates",
    seoKeywords: ["Honda Elevate Taxi Delhi", "SUV Taxi Service Delhi"],
    imageUrl: "/assets/aistudio/elevate_honda__d17f868f.jpg",
  },
  {
    id: "toyota-urban-cruiser",
    name: "Toyota Urban Cruiser",
    bookingOptionName: "Toyota Urban Cruiser",
    category: "TAXI",
    ratesSectionId: "sedan-suv-rates",
    seoKeywords: ["Toyota Urban Cruiser Taxi Delhi", "SUV Taxi Service Delhi"],
    imageUrl: "/assets/aistudio/Gemini_Generated_Image_vqu6arvqu6arvqu6_faf2a04a.png",
  },

  // 2. TEMPO TRAVELLER Category
  {
    id: "16-seater-urbania-tempo",
    name: "16 Seater Urbania Tempo",
    bookingOptionName: "16 Seater Urbania Tempo",
    category: "TEMPO TRAVELLER",
    ratesSectionId: "sedan-suv-rates",
    seoKeywords: [
      "Urbania Tempo Traveller Delhi",
      "Outstation Taxi Service in Delhi",
    ],
    imageUrl: "/assets/aistudio/urbania_tempo_traveller__f74a922a.jpg",
  },

  // 3. LUXURY CARS Category
  {
    id: "fortuner",
    name: "Fortuner",
    bookingOptionName: "Fortuner",
    category: "LUXURY CARS",
    ratesSectionId: "luxury-car-rates",
    seoKeywords: ["Fortuner Rental Delhi", "SUV Taxi Service Delhi"],
    imageUrl: "/assets/aistudio/Gemini_Generated_Image_df4zlvdf4zlvdf4z_12290a19.png",
  },
  {
    id: "mercedes-e-class",
    name: "Mercedes E-Class",
    bookingOptionName: "Mercedes E-Class",
    category: "LUXURY CARS",
    ratesSectionId: "luxury-car-rates",
    seoKeywords: [
      "Mercedes E-Class Rental Delhi",
      "Luxury Car Rental in Delhi",
    ],
    imageUrl: "/assets/aistudio/Gemini_Generated_Image_iphb0yiphb0yiphb_ff4713d4.png",
  },
  {
    id: "mercedes-s-class",
    name: "Mercedes S-Class",
    bookingOptionName: "Mercedes S-Class",
    category: "LUXURY CARS",
    ratesSectionId: "luxury-car-rates",
    seoKeywords: ["Mercedes S-Class Rental Delhi", "Luxury Car Rental Delhi"],
    imageUrl: "/assets/aistudio/Gemini_Generated_Image_57trql57trql57tr_686f931f.png",
  },
  {
    id: "bmw",
    name: "BMW",
    bookingOptionName: "BMW",
    category: "LUXURY CARS",
    ratesSectionId: "luxury-car-rates",
    seoKeywords: ["BMW Rental Delhi", "Luxury Car Rental in Delhi"],
    imageUrl: "/assets/aistudio/Gemini_Generated_Image_ev2l6hev2l6hev2l_a35e1730.png",
  },
];

export const BOOKING_VEHICLE_OPTIONS: string[] = [
  "Maruti Suzuki Dzire",
  "Toyota Etios",
  "Honda City",
  "Toyota Crysta",
  "Kia Carens",
  "Honda Elevate",
  "Toyota Urban Cruiser",
  "16 Seater Urbania Tempo",
  "Fortuner",
  "Mercedes E-Class",
  "Mercedes S-Class",
  "BMW",
  "Bus & Luxury Car",
];

export const SEDAN_SUV_RATES: VehicleRateRow[] = [
  {
    cabType: "Maruti Suzuki Dzire",
    fourHrsFortyKms: "₹1,200",
    eightHrsEightyKms: "₹1,600",
    extraHrs: "₹150",
    extraKms: "₹16",
    localNight: "₹250",
    outstationPerKm: "₹14",
    outstationTa: "₹400",
  },
  {
    cabType: "Toyota Etios",
    fourHrsFortyKms: "₹1,200",
    eightHrsEightyKms: "₹1,600",
    extraHrs: "₹150",
    extraKms: "₹16",
    localNight: "₹250",
    outstationPerKm: "₹14",
    outstationTa: "₹400",
  },
  {
    cabType: "Toyota Crysta",
    fourHrsFortyKms: "—",
    eightHrsEightyKms: "₹2,600",
    extraHrs: "₹250",
    extraKms: "₹24",
    localNight: "₹300",
    outstationPerKm: "₹21",
    outstationTa: "₹400",
  },
  {
    cabType: "Kia Carens",
    fourHrsFortyKms: "—",
    eightHrsEightyKms: "₹2,200",
    extraHrs: "₹200",
    extraKms: "₹20",
    localNight: "₹300",
    outstationPerKm: "₹20",
    outstationTa: "₹400",
  },
  {
    cabType: "Honda Elevate",
    fourHrsFortyKms: "—",
    eightHrsEightyKms: "₹2,000",
    extraHrs: "₹180",
    extraKms: "₹18",
    localNight: "₹250",
    outstationPerKm: "₹18",
    outstationTa: "₹400",
  },
  {
    cabType: "Toyota Urban Cruiser",
    fourHrsFortyKms: "—",
    eightHrsEightyKms: "₹2,000",
    extraHrs: "₹180",
    extraKms: "₹18",
    localNight: "₹250",
    outstationPerKm: "₹18",
    outstationTa: "₹400",
  },
  {
    cabType: "16 Seater Urbania Tempo",
    fourHrsFortyKms: "—",
    eightHrsEightyKms: "₹9,500",
    extraHrs: "₹500",
    extraKms: "₹30",
    localNight: "₹500",
    outstationPerKm: "₹30",
    outstationTa: "₹600",
  },
  {
    cabType: "Bus & Luxury Car",
    fourHrsFortyKms: "On Demand",
    eightHrsEightyKms: "On Demand",
    extraHrs: "On Demand",
    extraKms: "On Demand",
    localNight: "On Demand",
    outstationPerKm: "On Demand",
    outstationTa: "On Demand",
  },
];

export const LUXURY_CAR_RATES: VehicleRateRow[] = [
  {
    cabType: "Honda City",
    fourHrsFortyKms: "—",
    eightHrsEightyKms: "₹2,500",
    extraHrs: "₹200",
    extraKms: "₹25",
    localNight: "₹250",
    outstationPerKm: "₹25",
    outstationTa: "₹400",
  },
  {
    cabType: "Fortuner",
    fourHrsFortyKms: "—",
    eightHrsEightyKms: "₹5,500",
    extraHrs: "₹300",
    extraKms: "₹60",
    localNight: "₹300",
    outstationPerKm: "₹50",
    outstationTa: "₹600",
  },
  {
    cabType: "Mercedes E-Class",
    fourHrsFortyKms: "—",
    eightHrsEightyKms: "₹9,000",
    extraHrs: "₹600",
    extraKms: "₹80",
    localNight: "₹500",
    outstationPerKm: "₹80",
    outstationTa: "₹1,000",
  },
  {
    cabType: "Mercedes S-Class",
    fourHrsFortyKms: "—",
    eightHrsEightyKms: "₹17,000",
    extraHrs: "₹1,600",
    extraKms: "₹170",
    localNight: "₹1,000",
    outstationPerKm: "₹170",
    outstationTa: "₹1,500",
  },
  {
    cabType: "BMW",
    fourHrsFortyKms: "—",
    eightHrsEightyKms: "₹8,500",
    extraHrs: "₹600",
    extraKms: "₹80",
    localNight: "₹500",
    outstationPerKm: "₹80",
    outstationTa: "₹1,000",
  },
];

export const PRICING_CONDITIONS: string[] = [
  "Mileage and destination will be charged from garage to garage.",
  "All toll tax and inter-state taxes will be charged extra as per actual.",
  "Outstation trips will be charged with a minimum of 250 KM per day.",
  "Guide and mineral water will be provided on request at an additional cost.",
  "Rates are subject to change with any hike in petrol/diesel prices or inter-state taxes.",
  "Night charges will be applicable from 10:00 PM to 05:00 AM for regular vehicles.",
  "Night charges for luxury vehicles will be applicable from 11:00 PM to 05:00 AM.",
  "Rates are valid till 31st March 2027.",
  "Any legal dispute will be subject to jurisdiction in Delhi only.",
  "GST charges: 18% (as applicable to regular vehicle rates).",
];
