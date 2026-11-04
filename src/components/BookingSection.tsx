import React, { useState, useEffect, useCallback } from "react";
import { Phone, MessageSquare, CheckCircle2, AlertCircle, MapPin } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/businessConfig";
import { BOOKING_VEHICLE_OPTIONS } from "../data/vehiclePricing";
import {
  BookingEnquiryInput,
  JourneyType,
  validateBookingEnquiry,
  buildWhatsAppEnquiryUrl,
} from "../utils/bookingLogic";
import { useAutocompleteSuggestions } from "../hooks/useAutocompleteSuggestions";
import { JourneyRouteMap } from "./JourneyRouteMap";

interface BookingSectionProps {
  preselectedVehicle?: string;
  preselectedDestination?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedVehicle,
  preselectedDestination,
}) => {
  const [formData, setFormData] = useState<BookingEnquiryInput>({
    fullName: "",
    mobileNumber: "",
    pickupLocation: "",
    destination: preselectedDestination || "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    selectedVehicle: preselectedVehicle || BOOKING_VEHICLE_OPTIONS[0],
    journeyType: "Local",
    additionalRequirements: "",
    acknowledgedEnquiryTerms: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingEnquiryInput, string>>
  >({});
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState<
    string | null
  >(null);

  const [pickupFocused, setPickupFocused] = useState(false);
  const [destFocused, setDestFocused] = useState(false);

  const pickupAutocomplete = useAutocompleteSuggestions(
    formData.pickupLocation,
    pickupFocused
  );
  const destAutocomplete = useAutocompleteSuggestions(
    formData.destination,
    destFocused
  );

  useEffect(() => {
    if (
      preselectedVehicle &&
      BOOKING_VEHICLE_OPTIONS.includes(preselectedVehicle)
    ) {
      setFormData((prev) => ({
        ...prev,
        selectedVehicle: preselectedVehicle,
      }));
    }
  }, [preselectedVehicle]);

  useEffect(() => {
    if (preselectedDestination) {
      setFormData((prev) => ({
        ...prev,
        destination: preselectedDestination,
        journeyType: "Outstation",
      }));
    }
  }, [preselectedDestination]);

  const handleChange = useCallback(
    (field: keyof BookingEnquiryInput, value: string | boolean) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    []
  );

  const handleSelectSuggestion = useCallback(
    async (
      field: "pickupLocation" | "destination",
      suggestion: google.maps.places.AutocompleteSuggestion,
      resetSession: () => void
    ) => {
      const prediction = suggestion.placePrediction;
      if (!prediction) return;

      const fallbackText = prediction.text?.text || "";
      try {
        const place = prediction.toPlace();
        await place.fetchFields({
          fields: ["displayName", "formattedAddress", "location", "viewport"],
        });
        const formatted =
          place.formattedAddress || place.displayName || fallbackText;
        handleChange(field, formatted);
      } catch (err: unknown) {
        const msg = String((err as { message?: string })?.message || err || "");
        if (
          msg.includes("OVER_QUERY_LIMIT") ||
          msg.includes("RESOURCE_EXHAUSTED") ||
          msg.includes("QuotaExceededError") ||
          msg.includes("429")
        ) {
          window.dispatchEvent(new CustomEvent("gmp-quota-exceeded"));
        }
        if (fallbackText) {
          handleChange(field, fallbackText);
        }
      } finally {
        resetSession();
        if (field === "pickupLocation") {
          setPickupFocused(false);
        } else {
          setDestFocused(false);
        }
      }
    },
    [handleChange]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateBookingEnquiry(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmittedWhatsAppUrl(null);
      return;
    }

    setErrors({});
    const whatsappLink = buildWhatsAppEnquiryUrl(formData);
    setSubmittedWhatsAppUrl(whatsappLink);

    // Trigger anchor click with target="_blank" to open WhatsApp cleanly without window.open
    const anchor = document.createElement("a");
    anchor.href = whatsappLink;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <section
      id="booking-enquiry"
      aria-labelledby="booking-heading"
      className="ds-section-gradient-soft py-16 sm:py-20 border-b border-[#05284D]/10 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Side: Heading, Guidance, Interactive Route Map & Direct Contact Alternatives */}
          <div className="ds-reveal lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#083D73]">
                Taxi Booking in Delhi
              </p>
              <h2
                id="booking-heading"
                className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#05284D] tracking-tight"
              >
                BOOK YOUR TAXI
              </h2>
              <p className="mt-2 text-base sm:text-lg text-[#0B223E]/85">
                Tell us about your journey. Our team will get in touch with you.
              </p>
            </div>

            {/* Interactive Google Maps Route Preview */}
            <JourneyRouteMap
              pickupLocation={formData.pickupLocation}
              destination={formData.destination}
            />

            <div className="ds-interactive-card rounded-xl bg-white border border-[#05284D]/15 p-6 space-y-4">
              <h3 className="relative z-10 text-base font-bold text-[#05284D]">
                How Our Booking Enquiry Works
              </h3>
              <ul className="relative z-10 space-y-2.5 text-sm text-[#0B223E]/85">
                <li>
                  1. Enter your pickup, destination, travel dates, and preferred vehicle from our fleet.
                </li>
                <li>
                  2. Select whether your journey is Local within Delhi NCR or an Outstation round trip.
                </li>
                <li>
                  3. Submit your enquiry to share your formatted details directly with the D.S. Tour and Travels team on WhatsApp or call us for confirmation.
                </li>
              </ul>
              <p className="relative z-10 pt-2 border-t border-[#05284D]/10 text-xs text-[#0B223E]/75">
                Please note: We provide local and round-trip outstation taxi booking services according to our published vehicle rates.
              </p>
            </div>

            {/* Direct Call & WhatsApp Buttons */}
            <div className="ds-interactive-card ds-interactive-card-dark rounded-xl bg-gradient-to-br from-[#031D3D] via-[#05284D] to-[#083D73] text-white p-6 space-y-4 border border-[#083D73]">
              <p className="relative z-10 text-xs font-bold uppercase tracking-wider text-[#FCB017]">
                Prefer to Speak Directly?
              </p>
              <p className="relative z-10 text-sm text-white/85">
                Connect with {BUSINESS_CONFIG.ownerName} &amp; team at {BUSINESS_CONFIG.businessName}, New Delhi.
              </p>
              <div className="relative z-10 pt-1 space-y-2.5">
                <p className="text-xs font-semibold text-white/90">
                  Call/WhatsApp:{" "}
                  <span className="font-mono font-bold text-[#FCB017] tabular-nums">
                    {BUSINESS_CONFIG.phone}
                  </span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={BUSINESS_CONFIG.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-3 text-xs sm:text-sm font-bold text-white transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#FCB017]" />
                    <span>Call {BUSINESS_CONFIG.phone}</span>
                  </a>
                  <a
                    href={BUSINESS_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-btn-gold inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-xs sm:text-sm font-bold whitespace-nowrap"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp {BUSINESS_CONFIG.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Taxi Booking Enquiry Form */}
          <div className="ds-reveal lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="ds-interactive-card rounded-2xl bg-white border border-[#05284D]/15 p-6 sm:p-8 shadow-sm space-y-5"
            >
              {submittedWhatsAppUrl && (
                <div
                  role="status"
                  className="rounded-xl bg-[#05284D] text-white p-5 space-y-3 border border-[#FFB319]/40"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FFB319] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#FFB319]">
                        Booking Enquiry Prepared
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-white/90 leading-relaxed">
                        Thank you for your enquiry. Please note that submitting this form does not confirm an instant booking. The D.S. Tour and Travels team will review your journey details and confirm vehicle availability with you.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={submittedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#FFB319] hover:bg-[#FFA500] px-4 py-2 text-xs font-bold text-[#05284D] transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Enquiry on WhatsApp ({BUSINESS_CONFIG.phone})</span>
                    </a>
                    <a
                      href={BUSINESS_CONFIG.phoneHref}
                      className="inline-flex items-center gap-2 rounded-lg bg-white/15 hover:bg-white/25 px-4 py-2 text-xs font-bold text-white transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#FFB319]" />
                      <span>Call/WhatsApp {BUSINESS_CONFIG.phone}</span>
                    </a>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Full Name */}
                <div>
                  <label
                    htmlFor="booking-full-name"
                    className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                  >
                    Full Name <span className="text-[#053B70]">*</span>
                  </label>
                  <input
                    id="booking-full-name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] focus:border-[#053B70] focus:bg-white focus:outline-none"
                  />
                  {errors.fullName && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#053B70]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* 2. Mobile Number */}
                <div>
                  <label
                    htmlFor="booking-mobile"
                    className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                  >
                    Mobile Number <span className="text-[#053B70]">*</span>
                  </label>
                  <input
                    id="booking-mobile"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      handleChange("mobileNumber", e.target.value)
                    }
                    placeholder="10-digit mobile number"
                    className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] font-mono tabular-nums focus:border-[#053B70] focus:bg-white focus:outline-none"
                  />
                  {errors.mobileNumber && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#053B70]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.mobileNumber}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 3. Pickup Location (with Google Places Autocomplete) */}
                <div className="relative">
                  <label
                    htmlFor="booking-pickup-location"
                    className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                  >
                    Pickup Location <span className="text-[#053B70]">*</span>
                  </label>
                  <input
                    id="booking-pickup-location"
                    type="text"
                    autoComplete="off"
                    value={formData.pickupLocation}
                    onFocus={() => setPickupFocused(true)}
                    onBlur={() => {
                      window.setTimeout(() => setPickupFocused(false), 180);
                    }}
                    onChange={(e) =>
                      handleChange("pickupLocation", e.target.value)
                    }
                    placeholder="e.g., Gulmohar Park, New Delhi"
                    className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] focus:border-[#053B70] focus:bg-white focus:outline-none"
                  />
                  {pickupFocused &&
                    pickupAutocomplete.suggestions.length > 0 && (
                      <ul
                        role="listbox"
                        aria-label="Pickup location suggestions"
                        className="absolute z-30 left-0 right-0 mt-1 max-h-56 overflow-y-auto rounded-lg bg-white border border-[#053B70]/25 shadow-lg divide-y divide-[#053B70]/10"
                      >
                        {pickupAutocomplete.suggestions.map((s, idx) => {
                          const label = s.placePrediction?.text?.text;
                          if (!label) return null;
                          return (
                            <li
                              key={idx}
                              role="option"
                              aria-selected={false}
                              onMouseDown={(e) => {
                                e.preventDefault();
                                void handleSelectSuggestion(
                                  "pickupLocation",
                                  s,
                                  pickupAutocomplete.resetSession
                                );
                              }}
                              className="px-3.5 py-2.5 text-xs sm:text-sm text-[#172B45] hover:bg-[#F5F7FA] cursor-pointer flex items-start gap-2"
                            >
                              <MapPin className="w-3.5 h-3.5 text-[#053B70] shrink-0 mt-0.5" />
                              <span>{label}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  {errors.pickupLocation && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#053B70]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.pickupLocation}</span>
                    </p>
                  )}
                </div>

                {/* 4. Destination (with Google Places Autocomplete) */}
                <div className="relative">
                  <label
                    htmlFor="booking-destination"
                    className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                  >
                    Destination <span className="text-[#053B70]">*</span>
                  </label>
                  <input
                    id="booking-destination"
                    type="text"
                    autoComplete="off"
                    value={formData.destination}
                    onFocus={() => setDestFocused(true)}
                    onBlur={() => {
                      window.setTimeout(() => setDestFocused(false), 180);
                    }}
                    onChange={(e) =>
                      handleChange("destination", e.target.value)
                    }
                    placeholder="e.g., Local Delhi or Outstation City"
                    className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] focus:border-[#053B70] focus:bg-white focus:outline-none"
                  />
                  {destFocused && destAutocomplete.suggestions.length > 0 && (
                    <ul
                      role="listbox"
                      aria-label="Destination suggestions"
                      className="absolute z-30 left-0 right-0 mt-1 max-h-56 overflow-y-auto rounded-lg bg-white border border-[#053B70]/25 shadow-lg divide-y divide-[#053B70]/10"
                    >
                      {destAutocomplete.suggestions.map((s, idx) => {
                        const label = s.placePrediction?.text?.text;
                        if (!label) return null;
                        return (
                          <li
                            key={idx}
                            role="option"
                            aria-selected={false}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              void handleSelectSuggestion(
                                "destination",
                                s,
                                destAutocomplete.resetSession
                              );
                            }}
                            className="px-3.5 py-2.5 text-xs sm:text-sm text-[#172B45] hover:bg-[#F5F7FA] cursor-pointer flex items-start gap-2"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#053B70] shrink-0 mt-0.5" />
                            <span>{label}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {errors.destination && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#053B70]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.destination}</span>
                    </p>
                  )}
                </div>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 5. Pickup Date */}
                <div>
                  <label
                    htmlFor="booking-pickup-date"
                    className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                  >
                    Pickup Date <span className="text-[#053B70]">*</span>
                  </label>
                  <input
                    id="booking-pickup-date"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleChange("pickupDate", e.target.value)}
                    className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] font-mono focus:border-[#053B70] focus:bg-white focus:outline-none"
                  />
                  {errors.pickupDate && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#053B70]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.pickupDate}</span>
                    </p>
                  )}
                </div>

                {/* 6. Pickup Time */}
                <div>
                  <label
                    htmlFor="booking-pickup-time"
                    className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                  >
                    Pickup Time <span className="text-[#053B70]">*</span>
                  </label>
                  <input
                    id="booking-pickup-time"
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => handleChange("pickupTime", e.target.value)}
                    className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] font-mono focus:border-[#053B70] focus:bg-white focus:outline-none"
                  />
                  {errors.pickupTime && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#053B70]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.pickupTime}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 7. Return Date, where applicable */}
                <div>
                  <label
                    htmlFor="booking-return-date"
                    className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                  >
                    Return Date (Where Applicable)
                  </label>
                  <input
                    id="booking-return-date"
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => handleChange("returnDate", e.target.value)}
                    className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] font-mono focus:border-[#053B70] focus:bg-white focus:outline-none"
                  />
                  {errors.returnDate && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#053B70]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.returnDate}</span>
                    </p>
                  )}
                </div>

                {/* 8. Return Time, where applicable */}
                <div>
                  <label
                    htmlFor="booking-return-time"
                    className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                  >
                    Return Time (Where Applicable)
                  </label>
                  <input
                    id="booking-return-time"
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => handleChange("returnTime", e.target.value)}
                    className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] font-mono focus:border-[#053B70] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 9. Select Vehicle */}
                <div>
                  <label
                    htmlFor="booking-vehicle"
                    className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                  >
                    Select Vehicle <span className="text-[#053B70]">*</span>
                  </label>
                  <select
                    id="booking-vehicle"
                    value={formData.selectedVehicle}
                    onChange={(e) =>
                      handleChange("selectedVehicle", e.target.value)
                    }
                    className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] font-medium focus:border-[#053B70] focus:bg-white focus:outline-none"
                  >
                    {BOOKING_VEHICLE_OPTIONS.map((vehicleOption) => (
                      <option key={vehicleOption} value={vehicleOption}>
                        {vehicleOption}
                      </option>
                    ))}
                  </select>
                  {errors.selectedVehicle && (
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-[#053B70]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.selectedVehicle}</span>
                    </p>
                  )}
                </div>

                {/* 10. Journey Type */}
                <div>
                  <label
                    htmlFor="booking-journey-type"
                    className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                  >
                    Journey Type <span className="text-[#053B70]">*</span>
                  </label>
                  <select
                    id="booking-journey-type"
                    value={formData.journeyType}
                    onChange={(e) =>
                      handleChange(
                        "journeyType",
                        e.target.value as JourneyType
                      )
                    }
                    className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] font-medium focus:border-[#053B70] focus:bg-white focus:outline-none"
                  >
                    <option value="Local">Local</option>
                    <option value="Outstation">Outstation</option>
                  </select>
                </div>
              </div>

              {/* 11. Additional Requirements */}
              <div>
                <label
                  htmlFor="booking-additional"
                  className="block text-xs font-bold uppercase tracking-wider text-[#05284D] mb-1.5"
                >
                  Additional Requirements
                </label>
                <textarea
                  id="booking-additional"
                  rows={3}
                  value={formData.additionalRequirements}
                  onChange={(e) =>
                    handleChange("additionalRequirements", e.target.value)
                  }
                  placeholder="Share number of passengers, luggage details, or multi-stop itinerary notes"
                  className="w-full rounded-lg border border-[#053B70]/25 bg-[#F5F7FA]/50 px-3.5 py-2.5 text-sm text-[#172B45] focus:border-[#053B70] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Mandatory Checkbox */}
              <div className="rounded-xl bg-[#F5F7FA] border border-[#053B70]/15 p-4">
                <label
                  htmlFor="booking-acknowledge"
                  className="flex items-start gap-3 cursor-pointer"
                >
                  <input
                    id="booking-acknowledge"
                    type="checkbox"
                    checked={formData.acknowledgedEnquiryTerms}
                    onChange={(e) =>
                      handleChange(
                        "acknowledgedEnquiryTerms",
                        e.target.checked
                      )
                    }
                    className="mt-1 h-4 w-4 rounded border-[#053B70]/40 text-[#053B70] focus:ring-[#053B70]"
                  />
                  <span className="text-xs sm:text-sm text-[#172B45] leading-relaxed">
                    I understand that this is a booking enquiry and the final booking will be confirmed by the D.S. Tour and Travels team.
                  </span>
                </label>
                {errors.acknowledgedEnquiryTerms && (
                  <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#053B70]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.acknowledgedEnquiryTerms}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="ds-btn-gold relative z-10 w-full py-3.5 px-6 text-sm sm:text-base font-bold rounded-lg cursor-pointer"
              >
                SUBMIT BOOKING ENQUIRY
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
