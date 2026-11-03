import React from "react";
import { BUSINESS_CONFIG } from "../config/businessConfig";

export const OwnerSection: React.FC = () => {
  return (
    <section
      id="owner-section"
      aria-labelledby="owner-heading"
      className="ds-section-gradient-white py-16 sm:py-20 border-b border-[#05284D]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ds-interactive-card ds-reveal rounded-2xl bg-[#F6F8FC] border border-[#05284D]/15 p-6 sm:p-10 lg:p-12">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side: Exact Uploaded Photograph of Owner Daljeet Singh */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="group relative w-full max-w-sm rounded-2xl bg-white p-3 border-2 border-[#FCB017] shadow-md transition-transform duration-300 hover:-translate-y-1">
                <div className="overflow-hidden rounded-xl bg-[#05284D]/5">
                  <img
                    src={BUSINESS_CONFIG.ownerPhotoPath}
                    alt="Daljeet Singh – Founder & Owner of D.S. Tour and Travels, New Delhi"
                    className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-2 py-1">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#083D73]">
                    {BUSINESS_CONFIG.ownerName}
                  </span>
                  <span className="text-xs font-medium text-[#0B223E]/75">
                    New Delhi
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Owner Information */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#083D73]">
                Leadership &amp; Commitment
              </p>

              <h2
                id="owner-heading"
                className="text-2xl sm:text-3xl font-bold text-[#05284D] tracking-tight"
              >
                MEET OUR OWNER
              </h2>

              <div className="pt-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[#083D73]">
                  DALJEET SINGH
                </h3>
                <p className="mt-1 text-sm sm:text-base font-semibold text-[#0B223E]/85">
                  Founder &amp; Owner – D.S. Tour and Travels
                </p>
              </div>

              <p className="text-base sm:text-lg text-[#0B223E]/90 leading-relaxed">
                At D.S. Tour and Travels, our vision is to provide dependable transportation services built on trust, comfort and customer satisfaction. We believe in maintaining professional relationships and delivering service that customers can rely on.
              </p>

              <div className="pt-3 border-t border-[#05284D]/15">
                <p className="text-lg sm:text-xl font-bold text-[#05284D]">
                  &ldquo;Your trust drives our journey.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
