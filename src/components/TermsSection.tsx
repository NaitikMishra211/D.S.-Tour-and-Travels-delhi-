import React from "react";
import { PRICING_CONDITIONS } from "../data/vehiclePricing";

export const TermsSection: React.FC = () => {
  return (
    <section
      id="terms-and-conditions"
      aria-labelledby="terms-heading"
      className="ds-section-gradient-soft py-16 sm:py-20 border-b border-[#05284D]/10 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ds-reveal max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#083D73]">
            Pricing Conditions &amp; Booking Guidelines
          </p>
          <h2
            id="terms-heading"
            className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#05284D] tracking-tight"
          >
            TERMS &amp; CONDITIONS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#0B223E]/80">
            Please review all ten standard pricing conditions applicable to local and outstation taxi bookings with D.S. Tour and Travels.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRICING_CONDITIONS.map((condition, index) => {
            const numberLabel = String(index + 1).padStart(2, "0");
            const isHighlighted =
              index === 0 || index === 2 || index === 7 || index === 9;
            return (
              <div
                key={numberLabel}
                className={`ds-interactive-card ds-reveal flex items-start gap-4 rounded-xl border p-5 ${
                  isHighlighted
                    ? "bg-white border-[#05284D]/20 shadow-2xs"
                    : "bg-white/90 border-[#05284D]/10"
                }`}
              >
                <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#083D73] to-[#05284D] font-mono text-xs font-bold text-[#FCB017] tabular-nums">
                  {numberLabel}
                </span>
                <p className="relative z-10 text-sm sm:text-base font-medium text-[#0B223E] leading-relaxed">
                  {condition}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
