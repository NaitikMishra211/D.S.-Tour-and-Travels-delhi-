import React, { useState } from "react";
import { Star, Quote, CheckCircle2, CarFront, MapPin, Pause, Play } from "lucide-react";

export interface CustomerReview {
  id: string;
  name: string;
  roleOrLocality: string;
  avatarUrl: string;
  vehicleBooked: string;
  tripType: string;
  rating: number;
  reviewText: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rajesh-sharma",
    name: "Rajesh Sharma",
    roleOrLocality: "Gulmohar Park, New Delhi",
    avatarUrl: "/assets/reviews/rajesh-sharma.svg",
    vehicleBooked: "Toyota Crysta",
    tripType: "Delhi to Jaipur Family Trip",
    rating: 5,
    reviewText:
      "We booked a Toyota Crysta from D.S. Tour and Travels for our family trip from South Delhi to Jaipur. The vehicle arrived spotless and 15 minutes early, and all per-kilometre rates were shared clearly upfront.",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    roleOrLocality: "Hauz Khas, New Delhi",
    avatarUrl: "/assets/reviews/priya-nair.svg",
    vehicleBooked: "Honda Elevate",
    tripType: "8 Hrs / 80 Kms Local Duty",
    rating: 5,
    reviewText:
      "Booked the Honda Elevate for a full-day corporate schedule across New Delhi. Very polite chauffeur, smooth driving through city traffic, and completely transparent billing with zero hidden charges.",
  },
  {
    id: "vikramjit-singh",
    name: "Vikramjit Singh",
    roleOrLocality: "Punjabi Bagh, New Delhi",
    avatarUrl: "/assets/reviews/vikramjit-singh.svg",
    vehicleBooked: "16 Seater Urbania Tempo",
    tripType: "Outstation Group Pilgrimage",
    rating: 5,
    reviewText:
      "Daljeet Singh Ji personally coordinated our 16 Seater Urbania Tempo booking for a family group journey. The cabin was extraordinarily clean, spacious, and comfortable for our senior family members.",
  },
  {
    id: "ananya-iyer",
    name: "Ananya Iyer",
    roleOrLocality: "Vasant Vihar, New Delhi",
    avatarUrl: "/assets/reviews/ananya-iyer.svg",
    vehicleBooked: "Honda City",
    tripType: "Executive Local & Airport Transfer",
    rating: 5,
    reviewText:
      "D.S. Tour and Travels is our trusted choice in South Delhi whenever visiting clients need a Honda City. Punctual pickups, courteous drivers, and clear vehicle-wise rates every single time.",
  },
  {
    id: "sandeep-gupta",
    name: "Sandeep Gupta",
    roleOrLocality: "Greater Kailash, New Delhi",
    avatarUrl: "/assets/reviews/sandeep-gupta.svg",
    vehicleBooked: "Toyota Etios",
    tripType: "Full Day Local Delhi Package",
    rating: 5,
    reviewText:
      "I regularly book a Toyota Etios from their Gulmohar Park office for my parents' hospital and local visits. The drivers are patient, respectful, and always on time.",
  },
  {
    id: "meera-kapoor",
    name: "Meera Kapoor",
    roleOrLocality: "Defence Colony, New Delhi",
    avatarUrl: "/assets/reviews/meera-kapoor.svg",
    vehicleBooked: "Mercedes E-Class",
    tripType: "Wedding Guest Hospitality",
    rating: 5,
    reviewText:
      "We arranged a Mercedes E-Class and a Fortuner through D.S. Tour and Travels for family wedding guests in New Delhi. Impeccable car presentation and seamless coordination throughout the event.",
  },
  {
    id: "arjun-malhotra",
    name: "Arjun Malhotra",
    roleOrLocality: "Connaught Place, New Delhi",
    avatarUrl: "/assets/reviews/arjun-malhotra.svg",
    vehicleBooked: "Fortuner",
    tripType: "Delhi to Chandigarh Outstation",
    rating: 5,
    reviewText:
      "Took the Fortuner for a two-day business visit to Chandigarh. The SUV was in showroom condition, highway driving was very steady, and the final invoice matched the listed rates to the rupee.",
  },
  {
    id: "neha-verma",
    name: "Neha Verma",
    roleOrLocality: "Saket, New Delhi",
    avatarUrl: "/assets/reviews/neha-verma.svg",
    vehicleBooked: "Toyota Urban Cruiser",
    tripType: " Delhi NCR Weekend Outing",
    rating: 5,
    reviewText:
      "Quick WhatsApp booking confirmation and a neat, well-maintained Toyota Urban Cruiser right at our doorstep in Saket. Highly dependable service for families in New Delhi.",
  },
];

export const CustomerReviewsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate list for a seamless 50% continuous horizontal marquee loop
  const marqueeReviews = [...CUSTOMER_REVIEWS, ...CUSTOMER_REVIEWS];

  return (
    <section
      id="customer-reviews"
      aria-labelledby="customer-reviews-heading"
      className="ds-section-gradient-soft py-16 sm:py-20 border-b border-[#05284D]/10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="ds-reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#05284D]/8 border border-[#05284D]/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#083D73]">
              <Star className="w-3.5 h-3.5 fill-[#FCB017] text-[#FCB017]" />
              <span>Client Testimonials</span>
            </div>
            <h2
              id="customer-reviews-heading"
              className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#05284D] tracking-tight"
            >
              Trusted by Travellers Across New Delhi &amp; NCR
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#0B223E]/80 leading-relaxed">
              Genuine feedback from families, corporate executives, and outstation
              travellers who ride with D.S. Tour and Travels.
            </p>
          </div>

          {/* Rating Summary Pill & Scroll Pause Control */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 rounded-xl bg-white border border-[#05284D]/12 px-4 py-2.5 shadow-xs">
              <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FCB017] text-[#FCB017]"
                  />
                ))}
              </div>
              <div className="h-4 w-px bg-[#05284D]/15" />
              <span className="text-xs sm:text-sm font-bold text-[#05284D]">
                4.9 / 5 Client Satisfaction
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-pressed={isPaused}
              aria-label={
                isPaused
                  ? "Resume testimonials horizontal scroll"
                  : "Pause testimonials horizontal scroll"
              }
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-[#05284D] text-[#05284D] hover:text-white border border-[#05284D]/15 px-3.5 py-2.5 text-xs font-bold transition-colors duration-200 cursor-pointer shadow-xs"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#FCB017] fill-[#FCB017]" />
                  <span>Resume Scroll</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#FCB017]" />
                  <span>Pause Scroll</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Slow-Moving Horizontal Marquee Viewport */}
      <div className="relative mt-10">
        {/* Soft Left & Right Brand-Matched Edge Fade Gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-20 lg:w-32 bg-gradient-to-r from-[#F6F8FC] via-[#F6F8FC]/85 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-20 lg:w-32 bg-gradient-to-l from-[#F6F8FC] via-[#F6F8FC]/85 to-transparent"
        />

        <div
          className="ds-reviews-marquee-track gap-6 px-4 sm:px-6 py-3"
          data-paused={isPaused ? "true" : "false"}
          data-testid="customer-reviews-marquee"
        >
          {marqueeReviews.map((review, index) => {
            const isDuplicate = index >= CUSTOMER_REVIEWS.length;
            return (
              <article
                key={`${review.id}-${index}`}
                aria-hidden={isDuplicate ? "true" : undefined}
                className="ds-interactive-card w-[320px] sm:w-[370px] shrink-0 rounded-2xl bg-white border border-[#05284D]/12 p-6 shadow-sm flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-[#FCB017]/80"
              >
                <div>
                  {/* Top Row: DP Avatar + Indian Client Name + Quote Accent */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="relative h-14 w-14 shrink-0 rounded-full p-0.5 bg-gradient-to-br from-[#FCB017] via-[#FFC43D] to-[#083D73] shadow-xs">
                        <img
                          src={review.avatarUrl}
                          alt={`${review.name} – D.S. Tour and Travels client portrait`}
                          width={56}
                          height={56}
                          className="h-full w-full rounded-full object-cover bg-[#05284D]"
                        />
                        <span
                          title="Verified Client"
                          className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#05284D] text-[#FCB017] ring-2 ring-white"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-[#05284D] leading-snug">
                          {review.name}
                        </h3>
                        <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-[#0B223E]/70">
                          <MapPin className="w-3 h-3 text-[#083D73] shrink-0" />
                          <span>{review.roleOrLocality}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F6F8FC] border border-[#05284D]/10 text-[#FCB017]">
                      <Quote className="w-4 h-4" />
                    </div>
                  </div>

                  {/* 5-Star Rating Row */}
                  <div className="relative z-10 mt-4 flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-4 h-4 fill-[#FCB017] text-[#FCB017]"
                      />
                    ))}
                    <span className="ml-1.5 text-xs font-bold text-[#05284D]">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Testimonial Copy */}
                  <p className="relative z-10 mt-3 text-sm text-[#0B223E]/90 leading-relaxed">
                    &ldquo;{review.reviewText}&rdquo;
                  </p>
                </div>

                {/* Bottom Vehicle & Trip Footer inside Card */}
                <div className="relative z-10 mt-5 pt-4 border-t border-[#05284D]/10 flex items-center justify-between gap-2.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap font-bold text-[#05284D] bg-[#F6F8FC] border border-[#05284D]/12 px-2.5 py-1 rounded-md">
                    <CarFront className="w-3.5 h-3.5 text-[#FCB017] shrink-0" />
                    <span>{review.vehicleBooked}</span>
                  </span>
                  <span className="font-medium text-[#083D73] truncate text-right">
                    {review.tripType.trim()}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
