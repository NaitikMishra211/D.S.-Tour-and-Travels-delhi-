import React from "react";

interface ClosingStatementSectionProps {
  onContactClick: () => void;
}

export const ClosingStatementSection: React.FC<
  ClosingStatementSectionProps
> = ({ onContactClick }) => {
  return (
    <section
      aria-labelledby="closing-heading"
      className="ds-closing-surface relative overflow-hidden text-white py-16 sm:py-20 border-b border-[#FCB017]/35"
    >
      {/* Subtle Golden Yellow Decorative Accents */}
      <svg
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-12"
        viewBox="0 0 500 400"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="420"
          cy="200"
          r="180"
          stroke="#FCB017"
          strokeWidth="3"
          strokeDasharray="12 12"
        />
        <circle cx="420" cy="200" r="110" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>

      <div className="ds-reveal relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold tracking-widest text-[#FCB017]">
          D.S. Tour and Travels · New Delhi
        </p>

        <h2
          id="closing-heading"
          className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance"
        >
          LET&apos;S BUILD A GREAT BUSINESS RELATIONSHIP
        </h2>

        <div className="mt-6 space-y-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
          <p>
            Please give us a chance to serve you and your esteemed clients. We look forward to building a good business relationship with you and your organization in the future.
          </p>
          <p className="font-semibold text-[#FCB017]">
            Assuring you of our best services at all times.
          </p>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={onContactClick}
            className="ds-btn-gold px-8 py-3.5 text-sm sm:text-base font-bold rounded-lg cursor-pointer whitespace-nowrap"
          >
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
};
