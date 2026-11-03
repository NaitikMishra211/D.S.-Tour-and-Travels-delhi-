import { BUSINESS_CONFIG } from "../config/businessConfig";
import { BOOKING_VEHICLE_OPTIONS } from "../data/vehiclePricing";

export type JourneyType = "Local" | "Outstation";

export interface BookingEnquiryInput {
  fullName: string;
  mobileNumber: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  selectedVehicle: string;
  journeyType: JourneyType;
  additionalRequirements: string;
  acknowledgedEnquiryTerms: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof BookingEnquiryInput, string>>;
}

export function validateBookingEnquiry(input: BookingEnquiryInput): ValidationResult {
  const errors: Partial<Record<keyof BookingEnquiryInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  const cleanedMobile = (input.mobileNumber || "").replace(/[\s\-+]/g, "");
  if (!cleanedMobile || !/^\d{10,13}$/.test(cleanedMobile)) {
    errors.mobileNumber = "Please enter a valid 10-digit mobile number.";
  }

  if (!input.pickupLocation || input.pickupLocation.trim().length < 2) {
    errors.pickupLocation = "Please enter the pickup location.";
  }

  if (!input.destination || input.destination.trim().length < 2) {
    errors.destination = "Please enter the destination.";
  }

  if (!input.pickupDate) {
    errors.pickupDate = "Please select a pickup date.";
  }

  if (!input.pickupTime) {
    errors.pickupTime = "Please select a pickup time.";
  }

  if (input.returnDate && input.pickupDate && input.returnDate < input.pickupDate) {
    errors.returnDate = "Return date cannot be earlier than the pickup date.";
  }

  if (!input.selectedVehicle || !BOOKING_VEHICLE_OPTIONS.includes(input.selectedVehicle)) {
    errors.selectedVehicle = "Please select a valid vehicle from our fleet.";
  }

  if (input.journeyType !== "Local" && input.journeyType !== "Outstation") {
    errors.journeyType = "Please select Local or Outstation journey type.";
  }

  if (!input.acknowledgedEnquiryTerms) {
    errors.acknowledgedEnquiryTerms =
      "Please confirm that you understand this is a booking enquiry.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatWhatsAppEnquiryMessage(input: BookingEnquiryInput): string {
  const lines = [
    `*New Taxi Booking Enquiry – ${BUSINESS_CONFIG.businessName}*`,
    ``,
    `*Full Name:* ${input.fullName.trim()}`,
    `*Mobile Number:* ${input.mobileNumber.trim()}`,
    `*Journey Type:* ${input.journeyType}`,
    `*Selected Vehicle:* ${input.selectedVehicle}`,
    `*Pickup Location:* ${input.pickupLocation.trim()}`,
    `*Destination:* ${input.destination.trim()}`,
    `*Pickup Date:* ${input.pickupDate}`,
    `*Pickup Time:* ${input.pickupTime}`,
  ];

  if (input.returnDate) {
    lines.push(`*Return Date:* ${input.returnDate}`);
  }
  if (input.returnTime) {
    lines.push(`*Return Time:* ${input.returnTime}`);
  }
  if (input.additionalRequirements && input.additionalRequirements.trim()) {
    lines.push(`*Additional Requirements:* ${input.additionalRequirements.trim()}`);
  }

  lines.push(
    ``,
    `Note: This is a booking enquiry. Please share vehicle availability and confirmation details.`
  );

  return lines.join("\n");
}

export function buildWhatsAppEnquiryUrl(input: BookingEnquiryInput): string {
  const message = formatWhatsAppEnquiryMessage(input);
  return `${BUSINESS_CONFIG.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
