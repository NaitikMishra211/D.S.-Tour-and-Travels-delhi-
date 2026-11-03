import React from "react";
import {
  SEDAN_SUV_RATES,
  LUXURY_CAR_RATES,
  VehicleRateRow,
} from "../data/vehiclePricing";

interface RatesSectionProps {
  onSelectVehicleForBooking?: (vehicleName: string) => void;
  onViewTerms?: () => void;
}

export const RatesSection: React.FC<RatesSectionProps> = ({
  onViewTerms,
}) => {
  const renderRatesTable = (
    rows: VehicleRateRow[],
    nightHeaderLabel: string,
    tableCaption: string
  ) => (
    <div className="ds-reveal overflow-x-auto rounded-xl border border-[#05284D]/15 bg-white shadow-sm">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <caption className="sr-only">{tableCaption}</caption>
        <thead>
          <tr className="bg-gradient-to-r from-[#05284D] via-[#083D73] to-[#05284D] text-white text-xs uppercase tracking-wider">
            <th scope="col" className="py-3.5 px-3.5 font-bold whitespace-nowrap">
              CAB TYPE
            </th>
            <th scope="col" className="py-3.5 px-3 font-bold text-right whitespace-nowrap">
              4 HRS / 40 KMS
            </th>
            <th
              scope="col"
              className="py-3.5 px-3 font-bold text-right text-[#FCB017] whitespace-nowrap"
            >
              8 HRS / 80 KMS
            </th>
            <th scope="col" className="py-3.5 px-3 font-bold text-right whitespace-nowrap">
              EXTRA HRS
            </th>
            <th scope="col" className="py-3.5 px-3 font-bold text-right whitespace-nowrap">
              EXTRA KMS
            </th>
            <th scope="col" className="py-3.5 px-3 font-bold text-right whitespace-nowrap">
              {nightHeaderLabel}
            </th>
            <th
              scope="col"
              className="py-3.5 px-3 font-bold text-right text-[#FCB017] whitespace-nowrap"
            >
              OUTSTATION / KM
            </th>
            <th scope="col" className="py-3.5 px-3.5 font-bold text-right whitespace-nowrap">
              OUTSTATION TA
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#05284D]/10 text-xs sm:text-sm">
          {rows.map((row) => (
            <tr
              key={row.cabType}
              className="hover:bg-[#EDF2F9]/70 transition-colors duration-150"
            >
              <th
                scope="row"
                className="py-3.5 px-3.5 font-bold text-[#05284D] whitespace-nowrap"
              >
                {row.cabType}
              </th>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums text-[#0B223E] whitespace-nowrap">
                {row.fourHrsFortyKms}
              </td>
              <td className="py-3.5 px-3 text-right font-mono font-bold tabular-nums text-[#05284D] bg-[#FCB017]/15 whitespace-nowrap">
                {row.eightHrsEightyKms}
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums text-[#0B223E] whitespace-nowrap">
                {row.extraHrs}
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums text-[#0B223E] whitespace-nowrap">
                {row.extraKms}
              </td>
              <td className="py-3.5 px-3 text-right font-mono tabular-nums text-[#0B223E] whitespace-nowrap">
                {row.localNight}
              </td>
              <td className="py-3.5 px-3 text-right font-mono font-bold tabular-nums text-[#05284D] bg-[#FCB017]/15 whitespace-nowrap">
                {row.outstationPerKm}
              </td>
              <td className="py-3.5 px-3.5 text-right font-mono tabular-nums text-[#0B223E] whitespace-nowrap">
                {row.outstationTa}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <section
      id="our-rates"
      aria-labelledby="rates-heading"
      className="ds-section-gradient-white py-16 sm:py-20 border-b border-[#05284D]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ds-reveal max-w-3xl">
          <p className="text-xs font-bold tracking-widest text-[#083D73]">
            D.S. Tour and Travels · Our Pricing &amp; Vehicle Rates
          </p>
          <h2
            id="rates-heading"
            className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#05284D] tracking-tight"
          >
            OUR VEHICLE RATES
          </h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-[#0B223E]/85">
            Transparent Pricing for Local &amp; Outstation Journeys
          </p>
          <p className="mt-2 text-sm text-[#0B223E]/75">
            Review our complete Sedan &amp; SUV Rates and Luxury Car Rates for local duty slabs (4 Hrs / 40 Kms and 8 Hrs / 80 Kms) and outstation per-kilometre travel from New Delhi with D.S. Tour and Travels.
          </p>
        </div>

        {/* Table A: SEDAN & SUV RATES */}
        <div id="sedan-suv-rates" className="mt-10 scroll-mt-24">
          <div className="ds-reveal mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-[#05284D]">
              Sedan &amp; SUV Rates
            </h3>
            <span className="text-xs font-medium text-[#0B223E]/70">
              Local Night Charges Applicable: 10:00 PM – 05:00 AM
            </span>
          </div>
          {renderRatesTable(
            SEDAN_SUV_RATES,
            "LOCAL NIGHT (10 PM–5 AM)",
            "D.S. Tour and Travels Sedan and SUV Vehicle Rates Table"
          )}
        </div>

        {/* Table B: LUXURY CAR RATES */}
        <div id="luxury-car-rates" className="mt-12 scroll-mt-24">
          <div className="ds-reveal mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-[#05284D]">
              Luxury Car Rates
            </h3>
            <span className="text-xs font-medium text-[#0B223E]/70">
              Local Night Charges Applicable: 11:00 PM – 05:00 AM
            </span>
          </div>
          {renderRatesTable(
            LUXURY_CAR_RATES,
            "LOCAL NIGHT (11 PM–5 AM)",
            "D.S. Tour and Travels Luxury Car Vehicle Rates Table"
          )}
        </div>

        {/* Note referencing Terms & Conditions */}
        <div className="ds-reveal mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-[#F6F8FC] border border-[#05284D]/15 px-5 py-4 text-xs sm:text-sm text-[#0B223E]">
          <p>
            <strong>Pricing Information Note:</strong> All vehicle rates are subject to our{" "}
            {onViewTerms ? (
              <button
                type="button"
                onClick={onViewTerms}
                className="font-bold text-[#083D73] underline hover:text-[#05284D] cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
            ) : (
              <a
                href="#terms-and-conditions"
                className="font-bold text-[#083D73] underline hover:text-[#05284D]"
              >
                Terms &amp; Conditions
              </a>
            )}
            . The 4 Hrs / 40 Kms and 8 Hrs / 80 Kms columns represent standard local pricing slabs.
          </p>
          <span className="font-mono text-xs font-semibold text-[#083D73] shrink-0">
            Valid till 31st March 2027
          </span>
        </div>
      </div>
    </section>
  );
};
