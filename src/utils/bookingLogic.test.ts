import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { BUSINESS_CONFIG } from "../config/businessConfig";
import {
  FLEET_VEHICLES,
  BOOKING_VEHICLE_OPTIONS,
  SEDAN_SUV_RATES,
  LUXURY_CAR_RATES,
  PRICING_CONDITIONS,
} from "../data/vehiclePricing";
import {
  getVehiclesByCategory,
  resolveVehicleImageUrl,
} from "./vehiclePhotoStore";
import { DELHI_OUTSTATION_ROUTES, getPublishedRoutes } from "../data/delhiRoutes";
import {
  validateBookingEnquiry,
  buildWhatsAppEnquiryUrl,
  BookingEnquiryInput,
} from "./bookingLogic";
import { CUSTOMER_REVIEWS } from "../components/CustomerReviewsSection";
import { SERVICE_STATS } from "../components/ServiceStatsSection";

test("Business configuration matches exact New Delhi details", () => {
  assert.equal(BUSINESS_CONFIG.businessName, "D.S. Tour and Travels");
  assert.equal(BUSINESS_CONFIG.ownerName, "Daljeet Singh");
  assert.equal(BUSINESS_CONFIG.phone, "7065326532");
  assert.equal(BUSINESS_CONFIG.phoneHref, "tel:7065326532");
  assert.equal(BUSINESS_CONFIG.whatsapp, "7065326532");
  assert.equal(BUSINESS_CONFIG.whatsappUrl, "https://wa.me/917065326532");
  assert.equal(
    BUSINESS_CONFIG.address,
    "OPPOSITE A 25, GULMOHAR PARK, NEAR SIRI FORT AUDITORIUM, NEW DELHI – 110049."
  );
  assert.equal(
    BUSINESS_CONFIG.copyrightText,
    "© 2026 D.S. Tour and Travels. All Rights Reserved. Powered by LeadX Technology"
  );
  assert.equal(
    BUSINESS_CONFIG.poweredByWhatsappUrl,
    "https://wa.me/918400603432"
  );
  assert.equal(
    BUSINESS_CONFIG.heroHeading,
    "D.S. Tour and Travels"
  );
  assert.equal(
    BUSINESS_CONFIG.heroSubheading,
    "Local Taxi Booking and Outstation Cab Services from Delhi."
  );
  assert.equal(
    BUSINESS_CONFIG.logoPath,
    "/assets/aistudio/D.S_Tour_and_Travels_Taxi_Logo_0cc214bc.png"
  );
  assert.equal(
    fs.existsSync(
      path.resolve(
        process.cwd(),
        "public/assets/aistudio/D.S_Tour_and_Travels_Taxi_Logo_0cc214bc.png"
      )
    ),
    true
  );
});

test("Fleet vehicles and pricing rows match exact TAXI, TEMPO TRAVELLER, and LUXURY CARS categories", () => {
  assert.equal(FLEET_VEHICLES.length, 12);
  assert.equal(BOOKING_VEHICLE_OPTIONS.length, 13);
  assert.equal(SEDAN_SUV_RATES.length, 8);
  assert.equal(LUXURY_CAR_RATES.length, 5);
  assert.equal(PRICING_CONDITIONS.length, 10);

  const taxiCategory = getVehiclesByCategory("TAXI");
  const tempoCategory = getVehiclesByCategory("TEMPO TRAVELLER");
  const luxuryCategory = getVehiclesByCategory("LUXURY CARS");

  assert.deepEqual(
    taxiCategory.map((v) => v.name),
    [
      "Maruti Suzuki Dzire",
      "Toyota Etios",
      "Honda City",
      "Toyota Crysta",
      "Kia Carens",
      "Honda Elevate",
      "Toyota Urban Cruiser",
    ]
  );
  assert.deepEqual(
    tempoCategory.map((v) => v.name),
    ["16 Seater Urbania Tempo"]
  );
  assert.deepEqual(
    luxuryCategory.map((v) => v.name),
    [
      "Fortuner",
      "Mercedes E-Class",
      "Mercedes S-Class",
      "BMW",
    ]
  );

  // Verify 16 Seater Urbania Tempo and all LUXURY CARS (Fortuner, Mercedes E-Class, Mercedes S-Class, BMW) have their uploaded photographs configured and present on disk
  assert.equal(
    tempoCategory[0].imageUrl,
    "/assets/aistudio/urbania_tempo_traveller__f74a922a.jpg"
  );
  assert.equal(
    fs.existsSync(
      path.resolve(
        process.cwd(),
        "public/assets/aistudio/urbania_tempo_traveller__f74a922a.jpg"
      )
    ),
    true
  );

  const expectedLuxuryImages: Record<string, string> = {
    fortuner: "/assets/aistudio/Gemini_Generated_Image_df4zlvdf4zlvdf4z_12290a19.png",
    "mercedes-e-class": "/assets/aistudio/Gemini_Generated_Image_iphb0yiphb0yiphb_ff4713d4.png",
    "mercedes-s-class": "/assets/aistudio/Gemini_Generated_Image_57trql57trql57tr_686f931f.png",
    bmw: "/assets/aistudio/Gemini_Generated_Image_ev2l6hev2l6hev2l_a35e1730.png",
  };
  for (const [id, expectedUrl] of Object.entries(expectedLuxuryImages)) {
    const vehicle = luxuryCategory.find((v) => v.id === id);
    assert.ok(vehicle, `Missing luxury vehicle ${id}`);
    assert.equal(vehicle.imageUrl, expectedUrl);
    assert.equal(resolveVehicleImageUrl(vehicle, {}), expectedUrl);
    assert.equal(
      fs.existsSync(path.resolve(process.cwd(), `public${expectedUrl}`)),
      true,
      `Missing image file on disk for ${id}: public${expectedUrl}`
    );
  }

  // Verify Maruti Suzuki Dzire, Toyota Crysta, and Kia Carens use /assets/dzire.png, /assets/crysta.png, and /assets/carens.png and exist on disk
  assert.equal(taxiCategory[0].id, "maruti-suzuki-dzire");
  assert.equal(taxiCategory[0].imageUrl, "/assets/dzire.png");
  assert.equal(resolveVehicleImageUrl(taxiCategory[0], {}), "/assets/dzire.png");
  assert.equal(
    resolveVehicleImageUrl(taxiCategory[0], {
      "maruti-suzuki-dzire": "data:image/jpeg;base64,browser-upload",
    }),
    "/assets/dzire.png"
  );
  assert.equal(
    fs.existsSync(path.resolve(process.cwd(), "public/assets/dzire.png")),
    true
  );

  assert.equal(taxiCategory[1].id, "toyota-etios");
  assert.equal(
    taxiCategory[1].imageUrl,
    "/assets/aistudio/Gemini_Generated_Image_586qo1586qo1586q_5a226588.png"
  );
  assert.equal(
    resolveVehicleImageUrl(taxiCategory[1], {}),
    "/assets/aistudio/Gemini_Generated_Image_586qo1586qo1586q_5a226588.png"
  );
  assert.equal(
    fs.existsSync(
      path.resolve(
        process.cwd(),
        "public/assets/aistudio/Gemini_Generated_Image_586qo1586qo1586q_5a226588.png"
      )
    ),
    true
  );

  assert.equal(taxiCategory[3].id, "toyota-crysta");
  assert.equal(taxiCategory[3].imageUrl, "/assets/crysta.png");
  assert.equal(resolveVehicleImageUrl(taxiCategory[3], {}), "/assets/crysta.png");
  assert.equal(
    resolveVehicleImageUrl(taxiCategory[3], {
      "toyota-crysta": "data:image/jpeg;base64,browser-upload",
    }),
    "/assets/crysta.png"
  );
  assert.equal(
    fs.existsSync(path.resolve(process.cwd(), "public/assets/crysta.png")),
    true
  );

  assert.equal(taxiCategory[4].id, "kia-carens");
  assert.equal(taxiCategory[4].imageUrl, "/assets/carens.png");
  assert.equal(resolveVehicleImageUrl(taxiCategory[4], {}), "/assets/carens.png");
  assert.equal(
    resolveVehicleImageUrl(taxiCategory[4], {
      "kia-carens": "data:image/jpeg;base64,browser-upload",
    }),
    "/assets/carens.png"
  );
  assert.equal(
    fs.existsSync(path.resolve(process.cwd(), "public/assets/carens.png")),
    true
  );

  // Verify Honda City, Honda Elevate, and Toyota Urban Cruiser have separate IDs, uploaded photographs, and booking options
  assert.equal(taxiCategory[2].id, "honda-city");
  assert.equal(
    taxiCategory[2].imageUrl,
    "/assets/aistudio/Gemini_Generated_Image_6knuvw6knuvw6knu_eefaa77c.png"
  );
  assert.equal(
    fs.existsSync(
      path.resolve(
        process.cwd(),
        "public/assets/aistudio/Gemini_Generated_Image_6knuvw6knuvw6knu_eefaa77c.png"
      )
    ),
    true
  );

  assert.equal(taxiCategory[5].id, "honda-elevate");
  assert.equal(taxiCategory[5].name, "Honda Elevate");
  assert.equal(taxiCategory[5].bookingOptionName, "Honda Elevate");
  assert.equal(
    taxiCategory[5].imageUrl,
    "/assets/aistudio/elevate_honda__d17f868f.jpg"
  );
  assert.equal(
    fs.existsSync(
      path.resolve(
        process.cwd(),
        "public/assets/aistudio/elevate_honda__d17f868f.jpg"
      )
    ),
    true
  );

  assert.equal(taxiCategory[6].id, "toyota-urban-cruiser");
  assert.equal(taxiCategory[6].name, "Toyota Urban Cruiser");
  assert.equal(taxiCategory[6].bookingOptionName, "Toyota Urban Cruiser");
  assert.equal(
    taxiCategory[6].imageUrl,
    "/assets/aistudio/Gemini_Generated_Image_vqu6arvqu6arvqu6_faf2a04a.png"
  );
  assert.equal(
    fs.existsSync(
      path.resolve(
        process.cwd(),
        "public/assets/aistudio/Gemini_Generated_Image_vqu6arvqu6arvqu6_faf2a04a.png"
      )
    ),
    true
  );

  assert.ok(BOOKING_VEHICLE_OPTIONS.includes("Honda Elevate"));
  assert.ok(BOOKING_VEHICLE_OPTIONS.includes("Toyota Urban Cruiser"));
  assert.equal(
    resolveVehicleImageUrl(taxiCategory[5], {
      "honda-elevate": "data:image/jpeg;base64,elevate",
    }),
    "/assets/aistudio/elevate_honda__d17f868f.jpg"
  );
  assert.equal(
    resolveVehicleImageUrl(taxiCategory[6], {
      "honda-elevate": "data:image/jpeg;base64,elevate",
    }),
    "/assets/aistudio/Gemini_Generated_Image_vqu6arvqu6arvqu6_faf2a04a.png"
  );

  // Check separate Dzire and Etios rate rows preserve exact existing rates
  assert.equal(SEDAN_SUV_RATES[0].cabType, "Maruti Suzuki Dzire");
  assert.equal(SEDAN_SUV_RATES[0].fourHrsFortyKms, "₹1,200");
  assert.equal(SEDAN_SUV_RATES[0].eightHrsEightyKms, "₹1,600");
  assert.equal(SEDAN_SUV_RATES[0].outstationPerKm, "₹14");
  assert.equal(SEDAN_SUV_RATES[0].outstationTa, "₹400");

  assert.equal(SEDAN_SUV_RATES[1].cabType, "Toyota Etios");
  assert.equal(SEDAN_SUV_RATES[1].fourHrsFortyKms, "₹1,200");
  assert.equal(SEDAN_SUV_RATES[1].eightHrsEightyKms, "₹1,600");
  assert.equal(SEDAN_SUV_RATES[1].outstationPerKm, "₹14");
  assert.equal(SEDAN_SUV_RATES[1].outstationTa, "₹400");

  // Check separate Honda Elevate and Toyota Urban Cruiser rate rows preserve exact existing rates
  assert.equal(SEDAN_SUV_RATES[4].cabType, "Honda Elevate");
  assert.equal(SEDAN_SUV_RATES[4].eightHrsEightyKms, "₹2,000");
  assert.equal(SEDAN_SUV_RATES[4].extraHrs, "₹180");
  assert.equal(SEDAN_SUV_RATES[4].extraKms, "₹18");
  assert.equal(SEDAN_SUV_RATES[4].localNight, "₹250");
  assert.equal(SEDAN_SUV_RATES[4].outstationPerKm, "₹18");
  assert.equal(SEDAN_SUV_RATES[4].outstationTa, "₹400");

  assert.equal(SEDAN_SUV_RATES[5].cabType, "Toyota Urban Cruiser");
  assert.equal(SEDAN_SUV_RATES[5].eightHrsEightyKms, "₹2,000");
  assert.equal(SEDAN_SUV_RATES[5].extraHrs, "₹180");
  assert.equal(SEDAN_SUV_RATES[5].extraKms, "₹18");
  assert.equal(SEDAN_SUV_RATES[5].localNight, "₹250");
  assert.equal(SEDAN_SUV_RATES[5].outstationPerKm, "₹18");
  assert.equal(SEDAN_SUV_RATES[5].outstationTa, "₹400");

  assert.equal(SEDAN_SUV_RATES[6].cabType, "16 Seater Urbania Tempo");
  assert.equal(SEDAN_SUV_RATES[6].eightHrsEightyKms, "₹9,500");

  assert.equal(LUXURY_CAR_RATES[0].cabType, "Honda City");
  assert.equal(LUXURY_CAR_RATES[0].eightHrsEightyKms, "₹2,500");
  assert.equal(LUXURY_CAR_RATES[3].cabType, "Mercedes S-Class");
  assert.equal(LUXURY_CAR_RATES[3].eightHrsEightyKms, "₹17,000");
  assert.equal(LUXURY_CAR_RATES[3].outstationTa, "₹1,500");
});

test("Booking enquiry validation rejects invalid inputs and accepts valid enquiry", () => {
  const invalidInput: BookingEnquiryInput = {
    fullName: "",
    mobileNumber: "123",
    pickupLocation: "",
    destination: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    selectedVehicle: "",
    journeyType: "Local",
    additionalRequirements: "",
    acknowledgedEnquiryTerms: false,
  };

  const invalidResult = validateBookingEnquiry(invalidInput);
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.mobileNumber);
  assert.ok(invalidResult.errors.acknowledgedEnquiryTerms);

  const validInput: BookingEnquiryInput = {
    fullName: "Rajesh Sharma",
    mobileNumber: "9876543210",
    pickupLocation: "Gulmohar Park, New Delhi",
    destination: "Connaught Place, New Delhi",
    pickupDate: "2026-11-15",
    pickupTime: "10:00",
    returnDate: "2026-11-15",
    returnTime: "18:00",
    selectedVehicle: "Honda Elevate",
    journeyType: "Local",
    additionalRequirements: "Airport pickup assistance",
    acknowledgedEnquiryTerms: true,
  };

  const validResult = validateBookingEnquiry(validInput);
  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);

  const waUrl = buildWhatsAppEnquiryUrl(validInput);
  assert.ok(waUrl.startsWith("https://wa.me/917065326532?text="));
  assert.ok(decodeURIComponent(waUrl).includes("Honda Elevate"));
  assert.ok(decodeURIComponent(waUrl).includes("D.S. Tour and Travels"));
});

test("All 20 priority Delhi-origin routes exist and remain unpublished until confirmed", () => {
  assert.equal(DELHI_OUTSTATION_ROUTES.length, 20);
  assert.equal(getPublishedRoutes().length, 0);
});

test("Zero occurrences of prohibited pricing terminology, 'Premium' business descriptions, combined vehicle labels, or old business name in source", () => {
  const bannedOldPricingRegex = new RegExp("t" + "ariff", "i");
  const bannedPremiumServiceRegex = /premium\s+(taxi|cab|travel|transportation|booking)/i;
  const bannedCombinedDzireEtiosRegex = new RegExp("dzire\\s*/\\s*etios", "i");
  const bannedCombinedElevateCruiserRegex = new RegExp(
    "elevate\\s*/\\s*urban\\s*cruiser",
    "i"
  );
  const bannedOldBusinessNameRegex = new RegExp("D\\.S\\s+Tour", "i");
  const bannedAndCapitalizedRegex = new RegExp("D\\.S\\.\\s+Tour\\s+And\\s+Travels");

  const bannedSecondNumberRegex = new RegExp("9871" + "880500");

  function scanDir(dirPath: string) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(ts|tsx|html|json|css)$/.test(entry.name)) {
        const content = fs.readFileSync(fullPath, "utf8");
        assert.equal(
          bannedOldPricingRegex.test(content),
          false,
          `Found prohibited old pricing term in ${fullPath}`
        );
        assert.equal(
          bannedPremiumServiceRegex.test(content),
          false,
          `Found prohibited 'Premium' business phrase in ${fullPath}`
        );
        assert.equal(
          bannedCombinedDzireEtiosRegex.test(content),
          false,
          `Found combined Dzire and Etios label in ${fullPath}`
        );
        assert.equal(
          bannedCombinedElevateCruiserRegex.test(content),
          false,
          `Found combined Elevate and Urban Cruiser label in ${fullPath}`
        );
        assert.equal(
          bannedOldBusinessNameRegex.test(content),
          false,
          `Found old business name without dot after S in ${fullPath}`
        );
        assert.equal(
          bannedAndCapitalizedRegex.test(content),
          false,
          `Found 'And' instead of 'and' in business name in ${fullPath}`
        );
        assert.equal(
          bannedSecondNumberRegex.test(content),
          false,
          `Found removed second phone number in ${fullPath}`
        );
      }
    }
  }

  scanDir(path.resolve(process.cwd(), "src"));
  const indexHtml = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf8");
  assert.equal(bannedOldPricingRegex.test(indexHtml), false);
  assert.equal(bannedPremiumServiceRegex.test(indexHtml), false);
  assert.equal(bannedCombinedDzireEtiosRegex.test(indexHtml), false);
  assert.equal(bannedCombinedElevateCruiserRegex.test(indexHtml), false);
  assert.equal(bannedOldBusinessNameRegex.test(indexHtml), false);
  assert.equal(bannedAndCapitalizedRegex.test(indexHtml), false);
  assert.equal(bannedSecondNumberRegex.test(indexHtml), false);
  assert.ok(indexHtml.includes("Call/WhatsApp 7065326532"));
});

test("CustomerReviewsSection contains Indian client reviews with local DP assets on disk", () => {
  assert.ok(CUSTOMER_REVIEWS.length >= 6);
  for (const review of CUSTOMER_REVIEWS) {
    assert.ok(review.name.trim().length > 0);
    assert.ok(review.roleOrLocality.includes("New Delhi"));
    assert.equal(review.rating, 5);
    assert.ok(review.reviewText.trim().length > 30);
    assert.ok(review.avatarUrl.startsWith("/assets/reviews/"));
    const assetDiskPath = path.resolve(
      process.cwd(),
      "public",
      review.avatarUrl.replace(/^\//, "")
    );
    assert.equal(
      fs.existsSync(assetDiskPath),
      true,
      `Missing local DP image asset for ${review.name} at ${assetDiskPath}`
    );
  }
});

test("Intro plays on every visit/refresh and 'Replay Intro' trigger is completely removed", () => {
  const appSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/App.tsx"),
    "utf8"
  );
  const heroSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/components/HeroSection.tsx"),
    "utf8"
  );

  assert.equal(
    /Replay\s+Intro/i.test(appSource) || /Replay\s+Intro/i.test(heroSource),
    false,
    "Found 'Replay Intro' in App.tsx or HeroSection.tsx"
  );
  assert.equal(
    /onReplayIntro/.test(appSource) || /onReplayIntro/.test(heroSource),
    false,
    "Found 'onReplayIntro' handler in App.tsx or HeroSection.tsx"
  );
  assert.equal(
    /ds_tour_travels_intro_seen/.test(appSource),
    false,
    "Found session-only intro storage lock in App.tsx"
  );
});

test("Top hero and header include full luxury taxi image asset at 50% opacity that exists on disk, and selected sections are removed", () => {
  const headerSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/components/Header.tsx"),
    "utf8"
  );
  const heroSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/components/HeroSection.tsx"),
    "utf8"
  );
  const appSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/App.tsx"),
    "utf8"
  );
  const contactSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/components/ContactSection.tsx"),
    "utf8"
  );

  assert.ok(
    heroSource.includes("/assets/aistudio/Gemini_Generated_Image_57trql57trql57tr_686f931f.png"),
    "Expected HeroSection.tsx to reference the luxury taxi image asset"
  );
  assert.ok(
    /opacity-50|opacity-\[0\.50?\]/.test(heroSource),
    "Expected HeroSection.tsx taxi image to use 50% opacity"
  );
  assert.ok(
    headerSource.includes("/assets/aistudio/Gemini_Generated_Image_57trql57trql57tr_686f931f.png"),
    "Expected Header.tsx to reference the luxury taxi image asset"
  );
  assert.ok(
    /opacity-50|opacity-\[0\.50?\]/.test(headerSource),
    "Expected Header.tsx taxi image to use 50% opacity"
  );
  assert.equal(
    appSource.includes("<BookingSection"),
    false,
    "Expected <BookingSection to be removed from App.tsx"
  );
  assert.equal(
    contactSource.includes("OfficeLocationMap"),
    false,
    "Expected Gulmohar Park Office map card to be removed from ContactSection.tsx"
  );
  assert.equal(
    fs.existsSync(
      path.resolve(
        process.cwd(),
        "public/assets/aistudio/Gemini_Generated_Image_57trql57trql57tr_686f931f.png"
      )
    ),
    true
  );
});

test("ServiceStatsSection contains exact 4 requested metrics and CustomerReviewsSection is placed below the header", () => {
  assert.deepEqual(
    SERVICE_STATS.map((s) => ({ value: s.value, label: s.label })),
    [
      { value: "12,500+", label: "Outstation Taxi Trips Completed" },
      { value: "4.9 / 5.0", label: "Verified Passenger Rating" },
      { value: "100%", label: "Commercial Permitted Cabs" },
      { value: "24 × 7", label: "Direct Taxi Dispatch" },
    ]
  );

  const appSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/App.tsx"),
    "utf8"
  );
  const heroIdx = appSource.indexOf("<HeroSection");
  const statsIdx = appSource.indexOf("<ServiceStatsSection");
  const reviewsIdx = appSource.indexOf("<CustomerReviewsSection");
  const fleetIdx = appSource.indexOf("<FleetSection");

  assert.ok(heroIdx > -1, "Expected <HeroSection in App.tsx");
  assert.ok(statsIdx > heroIdx, "Expected <ServiceStatsSection after <HeroSection");
  assert.ok(reviewsIdx > heroIdx, "Expected <CustomerReviewsSection below <HeroSection");
  assert.ok(reviewsIdx < fleetIdx, "Expected <CustomerReviewsSection before <FleetSection");
});

test("GoDaddy Node.js Hosting startup configuration uses PORT environment variable and binds to 0.0.0.0", () => {
  const pkgJson = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf8")
  );
  assert.equal(
    pkgJson.scripts.dev,
    "vite --port ${PORT:-3000} --host 0.0.0.0"
  );
  assert.equal(
    pkgJson.scripts.preview,
    "vite preview --port ${PORT:-3000} --host 0.0.0.0"
  );
  assert.equal(pkgJson.scripts.start, "node server.js");

  const airoConfig = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), ".airo/config.json"), "utf8")
  );
  assert.equal(
    airoConfig.serve,
    "vite --port ${PORT:-3000} --host 0.0.0.0"
  );
  assert.equal(airoConfig.start, "node server.js");

  const viteConfigSource = fs.readFileSync(
    path.resolve(process.cwd(), "vite.config.ts"),
    "utf8"
  );
  assert.ok(viteConfigSource.includes("process.env.PORT"));
  assert.ok(viteConfigSource.includes("host: '0.0.0.0'"));

  const serverSource = fs.readFileSync(
    path.resolve(process.cwd(), "server.js"),
    "utf8"
  );
  assert.ok(serverSource.includes("process.env.PORT"));
  assert.ok(serverSource.includes("0.0.0.0"));
});



