import React from "react";
import { CarFront, MapPin, Phone, MessageSquare } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/businessConfig";

interface HeroSectionProps {
  onBookTaxi: () => void;
  onViewRates: () => void;
  onSelectVehicleForBooking?: (vehicleName: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookTaxi,
  onViewRates,
}) => {
  return (
    <section
      aria-label="Hero – Taxi Service in Delhi"
      className="ds-hero-surface relative overflow-hidden text-white border-b-4 border-[#FCB017]"
    >
      {/* Full Luxury Taxi Image in Hero Header Background (50% Opacity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src="/assets/aistudio/Gemini_Generated_Image_57trql57trql57tr_686f931f.png"
          alt=""
          referrerPolicy="no-referrer"
          data-testid="hero-header-taxi-bg-image"
          className="h-full w-full object-cover object-[center_58%] opacity-50 brightness-105 contrast-105 transition-transform duration-700"
        />
        <div
          className="
          absolute inset-0
          bg-gradient-to-r from-[#031D3D]/80 via-[#031D3D]/35 to-transparent
        "
        />
      </div>

      {/* Animated Road-Line Perspective Background Graphic */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 1440 760"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-80 680 C 360 540, 720 660, 1140 360 C 1300 240, 1400 220, 1560 120"
          stroke="#FCB017"
          strokeWidth="3.5"
          strokeDasharray="16 14"
          className="animate-road-dash"
        />
        <path
          d="M-80 715 C 360 575, 720 695, 1140 395 C 1300 275, 1400 255, 1560 155"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        {/* Top Row: Main Heading, Subheading & Primary CTAs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/15 animate-fade-up">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase text-[#FCB017]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Taxi Service in Delhi · Gulmohar Park, New Delhi – 110049</span>
              <span aria-hidden="true" className="text-white/40">·</span>
              <span className="text-white/90 font-semibold normal-case tracking-normal">
                {BUSINESS_CONFIG.tagline}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
              {BUSINESS_CONFIG.heroHeading}
            </h1>

            <p className="text-lg sm:text-2xl font-semibold text-[#FCB017] leading-snug text-balance">
              {BUSINESS_CONFIG.heroSubheading}
            </p>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl">
              {BUSINESS_CONFIG.heroDescription}
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3.5 shrink-0 animate-fade-up-delay-1">
            <button
              type="button"
              onClick={onBookTaxi}
              className="ds-btn-gold px-7 py-4 text-sm sm:text-base font-bold rounded-xl cursor-pointer whitespace-nowrap text-center"
            >
              BOOK YOUR TAXI
            </button>

            <button
              type="button"
              onClick={onViewRates}
              className="px-7 py-4 text-sm sm:text-base font-semibold text-white bg-[#031D3D]/75 hover:bg-[#05284D]/90 backdrop-blur-md border border-white/30 hover:border-[#FCB017]/70 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap text-center shadow-md"
            >
              VIEW OUR RATES
            </button>
          </div>
        </div>

        {/* Direct Dispatch Contact Strip */}
        <div className="mt-6 animate-fade-up-delay-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#FCB017]">
              <CarFront className="w-4 h-4" />
              <span>TAXI, TEMPO TRAVELLER &amp; LUXURY CARS</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/90">
              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="inline-flex items-center gap-1.5 font-mono font-bold text-white hover:text-[#FCB017] transition-colors tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[#FCB017]" />
                <span>{BUSINESS_CONFIG.phone}</span>
              </a>
              <span aria-hidden="true" className="text-white/40">·</span>
              <a
                href={BUSINESS_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono font-bold text-[#FCB017] hover:underline tabular-nums"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp {BUSINESS_CONFIG.whatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
