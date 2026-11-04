export interface OutstationRoute {
  id: string;
  slug: string;
  destination: string;
  confirmed: boolean; // IMPORTANT: Only publish a route page after D.S. Tour and Travels confirms service availability
  seoTitle: string;
  metaDescription: string;
  h1Heading: string;
  h2Overview: string;
  h2Vehicles: string;
  h2EnquiryProcess: string;
  overviewParagraphs: string[];
  keywordVariations: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

/**
 * Priority Delhi-Origin Outstation Routes.
 * Per business instructions:
 * - Only publish a route page after D.S. Tour and Travels confirms that the business can serve that destination.
 * - If service availability has not been confirmed, keep the page unpublished or in draft status (confirmed: false).
 * - Do not invent prices, distance, journey duration, availability or customer reviews.
 */
export const DELHI_OUTSTATION_ROUTES: OutstationRoute[] = [
  {
    id: "delhi-to-agra",
    slug: "delhi-to-agra-taxi",
    destination: "Agra",
    confirmed: false,
    seoTitle: "Delhi to Agra Taxi | Outstation Cab Service – D.S. Tour and Travels",
    metaDescription:
      "Enquire about Delhi to Agra taxi booking with D.S. Tour and Travels in New Delhi. Choose Sedan, SUV, Urbania Tempo or luxury car rental options. Call/WhatsApp 7065326532.",
    h1Heading: "Delhi to Agra Taxi & Outstation Cab Enquiry",
    h2Overview: "Taxi from Delhi to Agra for Family & Corporate Travel",
    h2Vehicles: "Available Fleet for Delhi to Agra Car Rental",
    h2EnquiryProcess: "How to Submit a Delhi to Agra Private Cab Enquiry",
    overviewParagraphs: [
      "D.S. Tour and Travels accepts outstation travel enquiries for passengers planning a journey with a Delhi to Agra taxi. Based in Gulmohar Park, New Delhi, we assist families, visitors, and organizations seeking round-trip outstation transportation from Delhi.",
      "When you request a Delhi to Agra cab service with our team, you can select from our existing Sedan, SUV, 16 Seater Urbania Tempo, and luxury car rental options according to your group size and travel preferences. All outstation trips are billed according to our transparent per-kilometre vehicle rates and standard pricing conditions.",
    ],
    keywordVariations: [
      "Delhi to Agra Taxi",
      "Delhi to Agra Cab Service",
      "Taxi from Delhi to Agra",
      "Delhi to Agra Private Cab",
      "Delhi to Agra Car Rental",
    ],
    faqs: [
      {
        question: "How do I enquire about a Delhi to Agra taxi with D.S. Tour and Travels?",
        answer:
          "You can submit your pickup date, return date, and preferred vehicle through our online booking enquiry form, or Call/WhatsApp 7065326532.",
      },
      {
        question: "Which vehicles can I request for a taxi from Delhi to Agra?",
        answer:
          "You can enquire for Maruti Suzuki Dzire, Toyota Etios, Toyota Crysta, Kia Carens, Honda Elevate, Toyota Urban Cruiser, 16 Seater Urbania Tempo, or luxury cars including Honda City, Fortuner, Mercedes E-Class, Mercedes S-Class, and BMW.",
      },
      {
        question: "How are outstation vehicle rates calculated for Agra trips?",
        answer:
          "Outstation journeys are charged per kilometre from garage to garage with a minimum of 250 KM per day, plus applicable Outstation TA, toll taxes, and inter-state taxes as per actual.",
      },
    ],
  },
  {
    id: "delhi-to-jaipur",
    slug: "delhi-to-jaipur-taxi",
    destination: "Jaipur",
    confirmed: false,
    seoTitle: "Delhi to Jaipur Taxi | Outstation Cab Service – D.S. Tour and Travels",
    metaDescription:
      "Planning travel from New Delhi to Jaipur? Contact D.S. Tour and Travels for Delhi to Jaipur taxi and private cab enquiries. View our Sedan, SUV & luxury car rates.",
    h1Heading: "Delhi to Jaipur Taxi & Private Cab Service Enquiry",
    h2Overview: "Outstation Taxi from Delhi to Jaipur",
    h2Vehicles: "Sedan, SUV & Luxury Cars for Delhi to Jaipur Travel",
    h2EnquiryProcess: "Booking Enquiry Process for Delhi to Jaipur Car Rental",
    overviewParagraphs: [
      "Travelers looking for a Delhi to Jaipur taxi can contact D.S. Tour and Travels in New Delhi to discuss outstation cab options. Whether you are travelling with family, colleagues, or guests, our team provides clear vehicle rate details before confirming your booking.",
      "Our Delhi to Jaipur cab service enquiries cover regular sedans like Maruti Suzuki Dzire, Toyota Etios, spacious SUVs such as Toyota Crysta and Kia Carens, group travel in a 16 Seater Urbania Tempo, and luxury vehicles.",
    ],
    keywordVariations: [
      "Delhi to Jaipur Taxi",
      "Delhi to Jaipur Cab Service",
      "Taxi from Delhi to Jaipur",
      "Delhi to Jaipur Private Cab",
      "Delhi to Jaipur Car Rental",
    ],
    faqs: [
      {
        question: "Does D.S. Tour and Travels provide round-trip outstation cabs from Delhi to Jaipur?",
        answer:
          "Yes, we handle outstation travel enquiries from New Delhi. Please note we do not offer one-way taxi services or fixed travel packages; all trips follow our standard per-KM vehicle rates.",
      },
      {
        question: "Where can I check the per-kilometre rate for a Delhi to Jaipur private cab?",
        answer:
          "You can review our complete Sedan & SUV Rates and Luxury Car Rates tables in the Our Rates section of our website.",
      },
    ],
  },
  {
    id: "delhi-to-haridwar",
    slug: "delhi-to-haridwar-taxi",
    destination: "Haridwar",
    confirmed: false,
    seoTitle: "Delhi to Haridwar Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Enquire for a Delhi to Haridwar taxi with D.S. Tour and Travels, New Delhi. Choose from Sedan, SUV, Urbania Tempo and luxury vehicles. Call/WhatsApp 7065326532.",
    h1Heading: "Delhi to Haridwar Taxi & Outstation Travel Enquiry",
    h2Overview: "Taxi from Delhi to Haridwar for Family & Group Journeys",
    h2Vehicles: "Vehicle Options for Delhi to Haridwar Cab Service",
    h2EnquiryProcess: "Enquire for Delhi to Haridwar Car Rental",
    overviewParagraphs: [
      "D.S. Tour and Travels assists families and groups in New Delhi looking for a Delhi to Haridwar taxi for religious visits and family travel. We provide clear per-kilometre pricing information across our fleet.",
      "From comfortable sedans to Toyota Crysta, Kia Carens, and 16 Seater Urbania Tempo options, you can select the vehicle category suited to your group and contact our team for confirmation.",
    ],
    keywordVariations: [
      "Delhi to Haridwar Taxi",
      "Delhi to Haridwar Cab Service",
      "Taxi from Delhi to Haridwar",
      "Delhi to Haridwar Private Cab",
      "Delhi to Haridwar Car Rental",
    ],
    faqs: [
      {
        question: "Can we book a 16 Seater Urbania Tempo for a Delhi to Haridwar journey?",
        answer:
          "Yes, our fleet includes the 16 Seater Urbania Tempo as well as SUVs and Sedans. Contact our team to check availability for your travel dates.",
      },
      {
        question: "Are toll and inter-state taxes included in the per-KM outstation rate?",
        answer:
          "No, as per our Pricing Conditions, all toll taxes and inter-state taxes are charged extra as per actuals.",
      },
    ],
  },
  {
    id: "delhi-to-rishikesh",
    slug: "delhi-to-rishikesh-taxi",
    destination: "Rishikesh",
    confirmed: false,
    seoTitle: "Delhi to Rishikesh Taxi | Private Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Contact D.S. Tour and Travels in New Delhi for Delhi to Rishikesh taxi and outstation cab enquiries. Sedan, SUV, and Urbania Tempo rates available.",
    h1Heading: "Delhi to Rishikesh Taxi & Cab Service Enquiry",
    h2Overview: "Outstation Taxi from Delhi to Rishikesh",
    h2Vehicles: "Choose Your Vehicle for Delhi to Rishikesh Car Rental",
    h2EnquiryProcess: "How to Request a Delhi to Rishikesh Private Cab",
    overviewParagraphs: [
      "For travelers planning an outstation trip from New Delhi to Uttarakhand, D.S. Tour and Travels facilitates Delhi to Rishikesh taxi enquiries. We offer transparent outstation per-kilometre rates and clear terms.",
      "Whether you prefer a compact sedan, an SUV like Toyota Crysta, Honda Elevate, or Toyota Urban Cruiser, or a 16 Seater Urbania Tempo for larger groups, our team will assist with your travel schedule.",
    ],
    keywordVariations: [
      "Delhi to Rishikesh Taxi",
      "Delhi to Rishikesh Cab Service",
      "Taxi from Delhi to Rishikesh",
      "Delhi to Rishikesh Private Cab",
      "Delhi to Rishikesh Car Rental",
    ],
    faqs: [
      {
        question: "What is the minimum daily distance billed for a Delhi to Rishikesh taxi?",
        answer:
          "In accordance with our Terms & Conditions, outstation trips are charged with a minimum of 250 KM per day from garage to garage.",
      },
    ],
  },
  {
    id: "delhi-to-dehradun",
    slug: "delhi-to-dehradun-taxi",
    destination: "Dehradun",
    confirmed: false,
    seoTitle: "Delhi to Dehradun Taxi | Outstation Cab Service – D.S. Tour and Travels",
    metaDescription:
      "Enquire about Delhi to Dehradun taxi booking with D.S. Tour and Travels in New Delhi. Sedan, SUV and luxury car rental options with clear vehicle rates.",
    h1Heading: "Delhi to Dehradun Taxi & Outstation Cab Enquiry",
    h2Overview: "Taxi from Delhi to Dehradun for Personal & Business Travel",
    h2Vehicles: "Fleet Choices for Delhi to Dehradun Car Rental",
    h2EnquiryProcess: "Submit Your Delhi to Dehradun Private Cab Enquiry",
    overviewParagraphs: [
      "D.S. Tour and Travels in New Delhi handles outstation booking enquiries for customers requiring a Delhi to Dehradun taxi for family visits, institutional travel, or corporate trips.",
      "Review our Sedan & SUV Rates or Luxury Car Rates and reach out to our team via phone or WhatsApp to discuss your pickup schedule and return requirements.",
    ],
    keywordVariations: [
      "Delhi to Dehradun Taxi",
      "Delhi to Dehradun Cab Service",
      "Taxi from Delhi to Dehradun",
      "Delhi to Dehradun Private Cab",
      "Delhi to Dehradun Car Rental",
    ],
    faqs: [
      {
        question: "How is a Delhi to Dehradun cab booking confirmed?",
        answer:
          "After you submit your journey details via our enquiry form or WhatsApp, the D.S. Tour and Travels team will review your requirements and contact you to confirm the booking.",
      },
    ],
  },
  {
    id: "delhi-to-manali",
    slug: "delhi-to-manali-taxi",
    destination: "Manali",
    confirmed: false,
    seoTitle: "Delhi to Manali Taxi | Outstation SUV & Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Planning an outstation journey from Delhi to Manali? Contact D.S. Tour and Travels in New Delhi for Sedan, SUV, and Urbania Tempo taxi enquiries.",
    h1Heading: "Delhi to Manali Taxi & Outstation Cab Service Enquiry",
    h2Overview: "Multi-Day Outstation Taxi from Delhi to Manali",
    h2Vehicles: "SUV, Tempo & Sedan Options for Delhi to Manali Car Rental",
    h2EnquiryProcess: "Enquire About Delhi to Manali Private Cab Rates",
    overviewParagraphs: [
      "For multi-day hill journeys starting from New Delhi, D.S. Tour and Travels provides assistance with Delhi to Manali taxi enquiries. Customers can select SUVs such as Toyota Crysta, Kia Carens, Fortuner, or group travel vehicles like the 16 Seater Urbania Tempo.",
      "All outstation bookings follow our published per-kilometre vehicle rates, Outstation TA charges, and garage-to-garage mileage calculation.",
    ],
    keywordVariations: [
      "Delhi to Manali Taxi",
      "Delhi to Manali Cab Service",
      "Taxi from Delhi to Manali",
      "Delhi to Manali Private Cab",
      "Delhi to Manali Car Rental",
    ],
    faqs: [
      {
        question: "Do you offer tour packages for Delhi to Manali?",
        answer:
          "No, D.S. Tour and Travels is strictly a taxi booking service and does not offer tour packages or one-way taxi services. We provide vehicles on our transparent per-kilometre outstation rates.",
      },
    ],
  },
  {
    id: "delhi-to-shimla",
    slug: "delhi-to-shimla-taxi",
    destination: "Shimla",
    confirmed: false,
    seoTitle: "Delhi to Shimla Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Contact D.S. Tour and Travels in New Delhi for Delhi to Shimla taxi enquiries. Explore Dzire, Toyota Crysta, Kia Carens, and luxury car rental rates.",
    h1Heading: "Delhi to Shimla Taxi & Private Cab Enquiry",
    h2Overview: "Taxi from Delhi to Shimla for Outstation Journeys",
    h2Vehicles: "Available Vehicles for Delhi to Shimla Car Rental",
    h2EnquiryProcess: "How to Enquire for a Delhi to Shimla Cab Service",
    overviewParagraphs: [
      "D.S. Tour and Travels assists travelers in New Delhi who wish to enquire about a Delhi to Shimla taxi for family vacations or official travel. Our fleet includes regular sedans, SUVs, and luxury cars.",
      "Check our published outstation per-KM rates and contact our office in Gulmohar Park, New Delhi to discuss your planned departure and return dates.",
    ],
    keywordVariations: [
      "Delhi to Shimla Taxi",
      "Delhi to Shimla Cab Service",
      "Taxi from Delhi to Shimla",
      "Delhi to Shimla Private Cab",
      "Delhi to Shimla Car Rental",
    ],
    faqs: [
      {
        question: "What charges apply for multi-day outstation trips from Delhi to Shimla?",
        answer:
          "Outstation trips are billed at the vehicle's Outstation / KM rate (minimum 250 KM per day from garage to garage), plus daily Outstation TA and actual toll/inter-state taxes.",
      },
    ],
  },
  {
    id: "delhi-to-chandigarh",
    slug: "delhi-to-chandigarh-taxi",
    destination: "Chandigarh",
    confirmed: false,
    seoTitle: "Delhi to Chandigarh Taxi | Outstation Cab Service – D.S. Tour and Travels",
    metaDescription:
      "Enquire for a Delhi to Chandigarh taxi with D.S. Tour and Travels in New Delhi. Sedan, SUV & luxury car rental options for business and family travel.",
    h1Heading: "Delhi to Chandigarh Taxi & Cab Service Enquiry",
    h2Overview: "Outstation Taxi from Delhi to Chandigarh",
    h2Vehicles: "Sedan, SUV & Luxury Vehicles for Delhi to Chandigarh Travel",
    h2EnquiryProcess: "Request a Delhi to Chandigarh Private Cab",
    overviewParagraphs: [
      "For corporate executives, families, and organizations travelling between New Delhi and Chandigarh, D.S. Tour and Travels handles round-trip Delhi to Chandigarh taxi enquiries.",
      "Choose from Maruti Suzuki Dzire, Toyota Etios, Toyota Crysta, Kia Carens, Honda City, Fortuner, Mercedes E-Class, Mercedes S-Class, or BMW and review our transparent vehicle rates online.",
    ],
    keywordVariations: [
      "Delhi to Chandigarh Taxi",
      "Delhi to Chandigarh Cab Service",
      "Taxi from Delhi to Chandigarh",
      "Delhi to Chandigarh Private Cab",
      "Delhi to Chandigarh Car Rental",
    ],
    faqs: [
      {
        question: "Are luxury cars available for Delhi to Chandigarh travel?",
        answer:
          "Yes, our Luxury Cars category includes Honda City, Fortuner, Mercedes E-Class, Mercedes S-Class, and BMW. Contact our team to enquire about availability.",
      },
    ],
  },
  {
    id: "delhi-to-amritsar",
    slug: "delhi-to-amritsar-taxi",
    destination: "Amritsar",
    confirmed: false,
    seoTitle: "Delhi to Amritsar Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Looking for a Delhi to Amritsar taxi? Contact D.S. Tour and Travels in New Delhi for Sedan, SUV, and 16 Seater Urbania Tempo booking enquiries.",
    h1Heading: "Delhi to Amritsar Taxi & Outstation Cab Enquiry",
    h2Overview: "Taxi from Delhi to Amritsar for Family & Group Travel",
    h2Vehicles: "Fleet Options for Delhi to Amritsar Car Rental",
    h2EnquiryProcess: "Submit Your Delhi to Amritsar Private Cab Enquiry",
    overviewParagraphs: [
      "D.S. Tour and Travels in New Delhi welcomes booking enquiries for travelers planning an outstation journey with a Delhi to Amritsar taxi.",
      "Whether travelling with family in a Toyota Crysta or Kia Carens, or with a larger group in a 16 Seater Urbania Tempo, you can view our per-kilometre rates and connect with our team.",
    ],
    keywordVariations: [
      "Delhi to Amritsar Taxi",
      "Delhi to Amritsar Cab Service",
      "Taxi from Delhi to Amritsar",
      "Delhi to Amritsar Private Cab",
      "Delhi to Amritsar Car Rental",
    ],
    faqs: [
      {
        question: "How can I contact D.S. Tour and Travels for a Delhi to Amritsar cab enquiry?",
        answer:
          "Call/WhatsApp 7065326532, or use the booking enquiry form on our website.",
      },
    ],
  },
  {
    id: "delhi-to-mathura",
    slug: "delhi-to-mathura-taxi",
    destination: "Mathura",
    confirmed: false,
    seoTitle: "Delhi to Mathura Taxi | Outstation Cab Service – D.S. Tour and Travels",
    metaDescription:
      "Enquire about a Delhi to Mathura taxi with D.S. Tour and Travels in New Delhi. View Sedan, SUV and Urbania Tempo rates for outstation travel.",
    h1Heading: "Delhi to Mathura Taxi & Private Cab Enquiry",
    h2Overview: "Taxi from Delhi to Mathura for Outstation Journeys",
    h2Vehicles: "Sedan, SUV & Tempo Options for Delhi to Mathura Car Rental",
    h2EnquiryProcess: "How to Enquire for a Delhi to Mathura Cab Service",
    overviewParagraphs: [
      "Travelers based in New Delhi planning a visit to Mathura can contact D.S. Tour and Travels for a Delhi to Mathura taxi enquiry. We provide straightforward vehicle pricing for round-trip outstation travel.",
      "Select from our Sedan & SUV fleet or luxury vehicles and reach out to our team with your travel dates.",
    ],
    keywordVariations: [
      "Delhi to Mathura Taxi",
      "Delhi to Mathura Cab Service",
      "Taxi from Delhi to Mathura",
      "Delhi to Mathura Private Cab",
      "Delhi to Mathura Car Rental",
    ],
    faqs: [
      {
        question: "Can we combine Mathura and nearby stops in an outstation taxi enquiry from Delhi?",
        answer:
          "Yes, you can mention your complete destination details in the Additional Requirements field of our booking enquiry form so our team can assist you.",
      },
    ],
  },
  {
    id: "delhi-to-vrindavan",
    slug: "delhi-to-vrindavan-taxi",
    destination: "Vrindavan",
    confirmed: false,
    seoTitle: "Delhi to Vrindavan Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Contact D.S. Tour and Travels in New Delhi for Delhi to Vrindavan taxi and private cab enquiries. Check our Sedan, SUV and Urbania Tempo rates.",
    h1Heading: "Delhi to Vrindavan Taxi & Outstation Cab Enquiry",
    h2Overview: "Taxi from Delhi to Vrindavan for Family & Group Travel",
    h2Vehicles: "Vehicle Categories for Delhi to Vrindavan Car Rental",
    h2EnquiryProcess: "Booking Enquiry Process for Delhi to Vrindavan Private Cab",
    overviewParagraphs: [
      "D.S. Tour and Travels in New Delhi assists individuals, families, and groups looking for a Delhi to Vrindavan taxi. Our fleet offers options ranging from Maruti Suzuki Dzire, Toyota Etios sedans to Toyota Crysta, Kia Carens, and 16 Seater Urbania Tempo.",
      "Review our vehicle rates table for per-kilometre pricing and submit an enquiry for your preferred travel dates.",
    ],
    keywordVariations: [
      "Delhi to Vrindavan Taxi",
      "Delhi to Vrindavan Cab Service",
      "Taxi from Delhi to Vrindavan",
      "Delhi to Vrindavan Private Cab",
      "Delhi to Vrindavan Car Rental",
    ],
    faqs: [
      {
        question: "Are guide and mineral water available on request?",
        answer:
          "Yes, as stated in our Pricing Conditions, guide and mineral water can be provided on request at an additional cost.",
      },
    ],
  },
  {
    id: "delhi-to-ayodhya",
    slug: "delhi-to-ayodhya-taxi",
    destination: "Ayodhya",
    confirmed: false,
    seoTitle: "Delhi to Ayodhya Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Planning an outstation journey from Delhi to Ayodhya? Contact D.S. Tour and Travels in New Delhi for Sedan, SUV and Urbania Tempo taxi enquiries.",
    h1Heading: "Delhi to Ayodhya Taxi & Outstation Cab Service Enquiry",
    h2Overview: "Outstation Taxi from Delhi to Ayodhya",
    h2Vehicles: "Fleet Options for Delhi to Ayodhya Car Rental",
    h2EnquiryProcess: "How to Submit a Delhi to Ayodhya Private Cab Enquiry",
    overviewParagraphs: [
      "For families and groups planning long-distance outstation travel from New Delhi, D.S. Tour and Travels accepts enquiries for a Delhi to Ayodhya taxi.",
      "You can review our published per-kilometre rates for SUVs, sedans, and 16 Seater Urbania Tempo vehicles and contact our team to discuss your itinerary.",
    ],
    keywordVariations: [
      "Delhi to Ayodhya Taxi",
      "Delhi to Ayodhya Cab Service",
      "Taxi from Delhi to Ayodhya",
      "Delhi to Ayodhya Private Cab",
      "Delhi to Ayodhya Car Rental",
    ],
    faqs: [
      {
        question: "How do I enquire about multi-day outstation travel from Delhi to Ayodhya?",
        answer:
          "Please share your pickup date, return date, and preferred vehicle in our booking enquiry form or Call/WhatsApp 7065326532 to speak with our team.",
      },
    ],
  },
  {
    id: "delhi-to-varanasi",
    slug: "delhi-to-varanasi-taxi",
    destination: "Varanasi",
    confirmed: false,
    seoTitle: "Delhi to Varanasi Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Contact D.S. Tour and Travels in New Delhi for Delhi to Varanasi taxi and outstation cab enquiries. View our Sedan, SUV & Urbania Tempo vehicle rates.",
    h1Heading: "Delhi to Varanasi Taxi & Private Cab Enquiry",
    h2Overview: "Outstation Taxi from Delhi to Varanasi",
    h2Vehicles: "Available Vehicles for Delhi to Varanasi Car Rental",
    h2EnquiryProcess: "Submit Your Delhi to Varanasi Cab Service Enquiry",
    overviewParagraphs: [
      "D.S. Tour and Travels handles outstation enquiries for travelers seeking a Delhi to Varanasi taxi from New Delhi. We offer transparent per-kilometre pricing across our Sedan, SUV, and luxury categories.",
      "Contact our New Delhi office by phone or WhatsApp with your travel schedule for assistance.",
    ],
    keywordVariations: [
      "Delhi to Varanasi Taxi",
      "Delhi to Varanasi Cab Service",
      "Taxi from Delhi to Varanasi",
      "Delhi to Varanasi Private Cab",
      "Delhi to Varanasi Car Rental",
    ],
    faqs: [
      {
        question: "Is instant online confirmation provided when submitting the form?",
        answer:
          "No, submitting the form sends a booking enquiry to our team. Final booking confirmation is provided directly by the D.S. Tour and Travels team.",
      },
    ],
  },
  {
    id: "delhi-to-lucknow",
    slug: "delhi-to-lucknow-taxi",
    destination: "Lucknow",
    confirmed: false,
    seoTitle: "Delhi to Lucknow Taxi | Outstation Cab Service – D.S. Tour and Travels",
    metaDescription:
      "Enquire for a Delhi to Lucknow taxi with D.S. Tour and Travels, New Delhi. Choose from Sedan, SUV and luxury car rental options. Call/WhatsApp 7065326532.",
    h1Heading: "Delhi to Lucknow Taxi & Outstation Cab Enquiry",
    h2Overview: "Taxi from Delhi to Lucknow for Corporate & Family Travel",
    h2Vehicles: "Sedan, SUV & Luxury Cars for Delhi to Lucknow Car Rental",
    h2EnquiryProcess: "Request a Delhi to Lucknow Private Cab",
    overviewParagraphs: [
      "Whether travelling for business or family occasions, D.S. Tour and Travels in New Delhi assists with Delhi to Lucknow taxi enquiries.",
      "Explore our vehicle rates for Maruti Suzuki Dzire, Toyota Etios, Toyota Crysta, Kia Carens, Fortuner, and luxury sedans, and reach out to our team to coordinate your trip.",
    ],
    keywordVariations: [
      "Delhi to Lucknow Taxi",
      "Delhi to Lucknow Cab Service",
      "Taxi from Delhi to Lucknow",
      "Delhi to Lucknow Private Cab",
      "Delhi to Lucknow Car Rental",
    ],
    faqs: [
      {
        question: "What are the night charges if applicable?",
        answer:
          "Night charges apply from 10:00 PM to 05:00 AM for regular vehicles and from 11:00 PM to 05:00 AM for luxury vehicles, as detailed in our vehicle rates table.",
      },
    ],
  },
  {
    id: "delhi-to-nainital",
    slug: "delhi-to-nainital-taxi",
    destination: "Nainital",
    confirmed: false,
    seoTitle: "Delhi to Nainital Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Planning a trip from Delhi to Nainital? Contact D.S. Tour and Travels in New Delhi for outstation taxi enquiries across Sedan, SUV and Urbania Tempo options.",
    h1Heading: "Delhi to Nainital Taxi & Outstation Cab Enquiry",
    h2Overview: "Taxi from Delhi to Nainital for Hill Station Travel",
    h2Vehicles: "Vehicle Options for Delhi to Nainital Car Rental",
    h2EnquiryProcess: "How to Enquire for a Delhi to Nainital Private Cab",
    overviewParagraphs: [
      "D.S. Tour and Travels in New Delhi assists customers looking for a Delhi to Nainital taxi for family holidays and group travel.",
      "You can select from our Sedan & SUV category or Luxury Cars and check our transparent outstation per-KM rates before submitting your booking enquiry.",
    ],
    keywordVariations: [
      "Delhi to Nainital Taxi",
      "Delhi to Nainital Cab Service",
      "Taxi from Delhi to Nainital",
      "Delhi to Nainital Private Cab",
      "Delhi to Nainital Car Rental",
    ],
    faqs: [
      {
        question: "Which SUV options can we enquire about for a Delhi to Nainital taxi?",
        answer:
          "You can enquire about Toyota Crysta, Kia Carens, Honda Elevate, Toyota Urban Cruiser, or Fortuner from our fleet.",
      },
    ],
  },
  {
    id: "delhi-to-mussoorie",
    slug: "delhi-to-mussoorie-taxi",
    destination: "Mussoorie",
    confirmed: false,
    seoTitle: "Delhi to Mussoorie Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Contact D.S. Tour and Travels in New Delhi for Delhi to Mussoorie taxi and private cab enquiries. View our Sedan, SUV and luxury vehicle rates.",
    h1Heading: "Delhi to Mussoorie Taxi & Private Cab Enquiry",
    h2Overview: "Outstation Taxi from Delhi to Mussoorie",
    h2Vehicles: "Choose from Sedan, SUV & Luxury Fleet for Mussoorie",
    h2EnquiryProcess: "Submit Your Delhi to Mussoorie Car Rental Enquiry",
    overviewParagraphs: [
      "Travelers departing from New Delhi can contact D.S. Tour and Travels for a Delhi to Mussoorie taxi enquiry. We provide clear per-kilometre pricing and dependable coordination for round-trip journeys.",
      "Browse our fleet options and submit your pickup and return dates through our enquiry form or WhatsApp.",
    ],
    keywordVariations: [
      "Delhi to Mussoorie Taxi",
      "Delhi to Mussoorie Cab Service",
      "Taxi from Delhi to Mussoorie",
      "Delhi to Mussoorie Private Cab",
      "Delhi to Mussoorie Car Rental",
    ],
    faqs: [
      {
        question: "How is distance calculated for a Delhi to Mussoorie private cab?",
        answer:
          "Mileage and destination are calculated from garage to garage with a minimum of 250 KM per day for outstation trips.",
      },
    ],
  },
  {
    id: "delhi-to-udaipur",
    slug: "delhi-to-udaipur-taxi",
    destination: "Udaipur",
    confirmed: false,
    seoTitle: "Delhi to Udaipur Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Enquire about a Delhi to Udaipur taxi with D.S. Tour and Travels in New Delhi. Sedan, SUV, Urbania Tempo and luxury car rental options available.",
    h1Heading: "Delhi to Udaipur Taxi & Outstation Cab Enquiry",
    h2Overview: "Taxi from Delhi to Udaipur for Family, Event & Corporate Travel",
    h2Vehicles: "Fleet Categories for Delhi to Udaipur Car Rental",
    h2EnquiryProcess: "Request a Delhi to Udaipur Private Cab",
    overviewParagraphs: [
      "D.S. Tour and Travels in New Delhi accepts outstation enquiries for a Delhi to Udaipur taxi, supporting family travel, wedding guest transport, and corporate visits.",
      "From SUVs and 16 Seater Urbania Tempo vehicles to luxury sedans like Mercedes E-Class, Mercedes S-Class, and BMW, review our vehicle rates and contact our team.",
    ],
    keywordVariations: [
      "Delhi to Udaipur Taxi",
      "Delhi to Udaipur Cab Service",
      "Taxi from Delhi to Udaipur",
      "Delhi to Udaipur Private Cab",
      "Delhi to Udaipur Car Rental",
    ],
    faqs: [
      {
        question: "Can we enquire for Bus & Luxury Car on demand for group events?",
        answer:
          "Yes, Bus & Luxury Car options are available On Demand. Please contact our team via Call/WhatsApp at 7065326532.",
      },
    ],
  },
  {
    id: "delhi-to-jodhpur",
    slug: "delhi-to-jodhpur-taxi",
    destination: "Jodhpur",
    confirmed: false,
    seoTitle: "Delhi to Jodhpur Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Contact D.S. Tour and Travels in New Delhi for Delhi to Jodhpur taxi enquiries. View transparent per-KM rates for Sedan, SUV and luxury vehicles.",
    h1Heading: "Delhi to Jodhpur Taxi & Private Cab Enquiry",
    h2Overview: "Outstation Taxi from Delhi to Jodhpur",
    h2Vehicles: "Available Vehicles for Delhi to Jodhpur Car Rental",
    h2EnquiryProcess: "How to Submit a Delhi to Jodhpur Cab Service Enquiry",
    overviewParagraphs: [
      "For outstation road journeys from New Delhi to Rajasthan, D.S. Tour and Travels assists customers with Delhi to Jodhpur taxi enquiries.",
      "Check our Sedan & SUV Rates and Luxury Car Rates tables and connect with our team to discuss your travel schedule.",
    ],
    keywordVariations: [
      "Delhi to Jodhpur Taxi",
      "Delhi to Jodhpur Cab Service",
      "Taxi from Delhi to Jodhpur",
      "Delhi to Jodhpur Private Cab",
      "Delhi to Jodhpur Car Rental",
    ],
    faqs: [
      {
        question: "Where is the D.S. Tour and Travels office located?",
        answer:
          "Our office is located at Opposite A 25, Gulmohar Park, Near Siri Fort Auditorium, New Delhi – 110049.",
      },
    ],
  },
  {
    id: "delhi-to-khatu-shyam-ji",
    slug: "delhi-to-khatu-shyam-ji-taxi",
    destination: "Khatu Shyam Ji",
    confirmed: false,
    seoTitle: "Delhi to Khatu Shyam Ji Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Enquire for a Delhi to Khatu Shyam Ji taxi with D.S. Tour and Travels in New Delhi. Choose Sedan, SUV or 16 Seater Urbania Tempo for family travel.",
    h1Heading: "Delhi to Khatu Shyam Ji Taxi & Outstation Cab Enquiry",
    h2Overview: "Taxi from Delhi to Khatu Shyam Ji for Family & Group Darshan Trips",
    h2Vehicles: "Sedan, SUV & Urbania Tempo for Delhi to Khatu Shyam Ji Car Rental",
    h2EnquiryProcess: "Submit Your Delhi to Khatu Shyam Ji Private Cab Enquiry",
    overviewParagraphs: [
      "D.S. Tour and Travels in New Delhi assists families and groups planning a pilgrimage journey with a Delhi to Khatu Shyam Ji taxi.",
      "Choose from Maruti Suzuki Dzire, Toyota Etios, Toyota Crysta, Kia Carens, Honda Elevate, Toyota Urban Cruiser, or a 16 Seater Urbania Tempo and view our transparent outstation per-KM rates.",
    ],
    keywordVariations: [
      "Delhi to Khatu Shyam Ji Taxi",
      "Delhi to Khatu Shyam Ji Cab Service",
      "Taxi from Delhi to Khatu Shyam Ji",
      "Delhi to Khatu Shyam Ji Private Cab",
      "Delhi to Khatu Shyam Ji Car Rental",
    ],
    faqs: [
      {
        question: "How can a family group enquire for a Delhi to Khatu Shyam Ji cab service?",
        answer:
          "Select your preferred SUV or 16 Seater Urbania Tempo in our booking enquiry form, enter your travel dates, and submit your details via Call/WhatsApp 7065326532.",
      },
    ],
  },
  {
    id: "delhi-to-katra",
    slug: "delhi-to-katra-taxi",
    destination: "Katra",
    confirmed: false,
    seoTitle: "Delhi to Katra Taxi | Outstation Cab Enquiry – D.S. Tour and Travels",
    metaDescription:
      "Planning an outstation journey from New Delhi to Katra? Contact D.S. Tour and Travels for Delhi to Katra taxi and SUV booking enquiries.",
    h1Heading: "Delhi to Katra Taxi & Outstation Cab Service Enquiry",
    h2Overview: "Outstation Taxi from Delhi to Katra",
    h2Vehicles: "Fleet Choices for Delhi to Katra Car Rental",
    h2EnquiryProcess: "How to Request a Delhi to Katra Private Cab",
    overviewParagraphs: [
      "For passengers planning a round-trip journey from New Delhi, D.S. Tour and Travels handles Delhi to Katra taxi enquiries across our Sedan, SUV, and 16 Seater Urbania Tempo fleet.",
      "Review our vehicle rates and pricing conditions, and reach out to our team in New Delhi to discuss your travel dates.",
    ],
    keywordVariations: [
      "Delhi to Katra Taxi",
      "Delhi to Katra Cab Service",
      "Taxi from Delhi to Katra",
      "Delhi to Katra Private Cab",
      "Delhi to Katra Car Rental",
    ],
    faqs: [
      {
        question: "What GST rate applies to regular vehicle bookings?",
        answer:
          "As listed in our Terms & Conditions, GST charges of 18% are applicable to regular vehicle rates.",
      },
    ],
  },
];

export function getPublishedRoutes(): OutstationRoute[] {
  return DELHI_OUTSTATION_ROUTES.filter((route) => route.confirmed);
}

export function getRouteBySlug(slug: string): OutstationRoute | undefined {
  return DELHI_OUTSTATION_ROUTES.find((route) => route.slug === slug);
}
