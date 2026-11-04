export interface BusinessConfig {
  businessName: string;
  ownerName: string;
  ownerDesignation: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappUrl: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  copyrightYear: number;
  poweredBy: string;
  poweredByWhatsappUrl: string;
  copyrightText: string;
  tagline: string;
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
  footerDescription: string;
  logoPath: string;
  ownerPhotoPath: string;
  seo: {
    homeTitle: string;
    homeDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    contactTitle: string;
    contactDescription: string;
    primaryKeywords: string[];
    vehicleKeywords: string[];
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  businessName: "D.S. Tour and Travels",
  ownerName: "Daljeet Singh",
  ownerDesignation: "Founder & Owner – D.S. Tour and Travels",
  phone: "7065326532",
  phoneHref: "tel:7065326532",
  whatsapp: "7065326532",
  whatsappUrl: "https://wa.me/917065326532",
  address: "OPPOSITE A 25, GULMOHAR PARK, NEAR SIRI FORT AUDITORIUM, NEW DELHI – 110049.",
  city: "New Delhi",
  state: "Delhi",
  postalCode: "110049",
  country: "India",
  copyrightYear: 2026,
  poweredBy: "LeadX Technology",
  poweredByWhatsappUrl: "https://wa.me/918400603432",
  copyrightText: "© 2026 D.S. Tour and Travels. All Rights Reserved. Powered by LeadX Technology",
  tagline: "Your Journey, Our Responsibility",
  heroHeading: "D.S. Tour and Travels",
  heroSubheading: "Local Taxi Booking and Outstation Cab Services from Delhi.",
  heroDescription:
    "D.S. Tour and Travels provides taxi booking services in New Delhi for local journeys and outstation travel. Choose from Sedan, SUV, Urbania Tempo and luxury vehicle options for your travel requirements. Contact our team for vehicle rates and booking enquiries.",
  footerDescription:
    "D.S. Tour and Travels is a Delhi-based taxi service offering local taxi booking and outstation travel enquiries with a range of Sedan, SUV and luxury vehicle options.",
  logoPath: "/assets/aistudio/D.S_Tour_and_Travels_Taxi_Logo_0cc214bc.png",
  ownerPhotoPath: "/assets/aistudio/owner_daljeet_singh__4000f250.jpg",
  seo: {
    homeTitle: "D.S. Tour and Travels | Taxi Service in Delhi & Outstation Cabs",
    homeDescription:
      "Looking for taxi service in Delhi? Contact D.S. Tour and Travels for local taxi booking and outstation cab enquiries. Choose Sedan, SUV, Urbania Tempo and luxury cars. Call/WhatsApp 7065326532.",
    aboutTitle: "About D.S. Tour and Travels | Taxi Service in New Delhi",
    aboutDescription:
      "Learn about D.S. Tour and Travels, founded by Daljeet Singh in New Delhi. Dependable local taxi booking and outstation cab service with Sedan, SUV and luxury vehicle options.",
    contactTitle: "Contact D.S. Tour and Travels | Book a Taxi in New Delhi",
    contactDescription:
      "Contact D.S. Tour and Travels at Gulmohar Park, New Delhi – 110049. Call/WhatsApp 7065326532 for taxi booking enquiries and vehicle rates.",
    primaryKeywords: [
      "Taxi Service in Delhi",
      "Taxi Booking in Delhi",
      "Outstation Taxi Service in Delhi",
      "Delhi Taxi Service",
      "Delhi Cab Service",
      "Private Taxi Service Delhi",
      "Local Taxi Service Delhi",
      "Delhi Outstation Cab",
      "Delhi to Outstation Taxi",
      "Car Rental Service Delhi",
      "Sedan Taxi Service Delhi",
      "SUV Taxi Service Delhi",
      "Luxury Car Rental Delhi",
    ],
    vehicleKeywords: [
      "Dzire Taxi Service Delhi",
      "Etios Taxi Service Delhi",
      "Innova Crysta Rental Delhi",
      "Kia Carens Taxi Delhi",
      "Honda Elevate Taxi Delhi",
      "Toyota Urban Cruiser Taxi Delhi",
      "Urbania Tempo Traveller Delhi",
      "Honda City Rental Delhi",
      "Fortuner Rental Delhi",
      "Mercedes E-Class Rental Delhi",
      "Mercedes S-Class Rental Delhi",
      "BMW Rental Delhi",
    ],
  },
};
