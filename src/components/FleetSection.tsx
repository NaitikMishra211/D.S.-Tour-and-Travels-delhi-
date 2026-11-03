import React, { useState, useRef } from "react";
import { CarFront, Upload, Maximize2, X, Trash2 } from "lucide-react";
import { FleetVehicle, VehicleCategory } from "../data/vehiclePricing";
import {
  useVehiclePhotos,
  resolveVehicleImageUrl,
  getVehiclesByCategory,
} from "../utils/vehiclePhotoStore";

interface FleetSectionProps {
  onViewRates: (ratesSectionId: "sedan-suv-rates" | "luxury-car-rates") => void;
  onBookVehicle: (bookingOptionName: string) => void;
}

type GalleryFilter = "all" | VehicleCategory;

export const FleetSection: React.FC<FleetSectionProps> = ({
  onViewRates,
  onBookVehicle,
}) => {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("all");
  const [lightboxVehicle, setLightboxVehicle] = useState<{
    vehicle: FleetVehicle;
    imageUrl: string;
  } | null>(null);

  const { customPhotos, uploadPhotoForVehicle, clearPhotoForVehicle } =
    useVehiclePhotos();

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const taxiVehicles = getVehiclesByCategory("TAXI");
  const tempoTravellerVehicles = getVehiclesByCategory("TEMPO TRAVELLER");
  const luxuryVehicles = getVehiclesByCategory("LUXURY CARS");

  const handleTriggerUpload = (vehicleId: string) => {
    const input = fileInputRefs.current[vehicleId];
    if (input) {
      input.click();
    }
  };

  const handleFileChange = (
    vehicleId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadPhotoForVehicle(vehicleId, file);
    }
    e.target.value = "";
  };

  const renderVehicleCard = (vehicle: FleetVehicle) => {
    const activeImageUrl = resolveVehicleImageUrl(vehicle, customPhotos);
    const hasCustomPhoto = Boolean(customPhotos[vehicle.id]);

    return (
      <article
        key={vehicle.id}
        className="ds-interactive-card ds-reveal group flex flex-col justify-between rounded-2xl bg-white border border-[#05284D]/12 overflow-hidden transition-all duration-200 hover:-translate-y-1.5 hover:border-[#FCB017]"
      >
        <div className="relative z-10">
          {/* Hidden File Input for Direct Vehicle Photo Upload */}
          <input
            ref={(el) => {
              fileInputRefs.current[vehicle.id] = el;
            }}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(vehicle.id, e)}
            className="sr-only"
            aria-label={`Upload photograph for ${vehicle.name}`}
          />

          {/* Large 16:10 Vehicle Image Frame – Primary Visual Focus */}
          <div
            className="relative flex aspect-[16/10] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F6F8FC] to-[#EDF2F9] border-b border-[#05284D]/10"
            aria-label={`${vehicle.name} photograph frame`}
          >
            {activeImageUrl ? (
              <>
                <img
                  src={activeImageUrl}
                  alt={vehicle.name}
                  onClick={() =>
                    setLightboxVehicle({
                      vehicle,
                      imageUrl: activeImageUrl,
                    })
                  }
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
                  loading="lazy"
                />

                {/* Subtle Top-Right Controls for Full View or Updating Photo */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxVehicle({
                        vehicle,
                        imageUrl: activeImageUrl,
                      })
                    }
                    aria-label={`View full size photograph of ${vehicle.name}`}
                    className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-[#031D3D]/85 text-white hover:bg-[#031D3D] transition-colors cursor-pointer shadow-sm"
                  >
                    <Maximize2 className="w-4 h-4 text-[#FCB017]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTriggerUpload(vehicle.id)}
                    aria-label={`Change photograph for ${vehicle.name}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#031D3D]/85 px-2.5 h-8 text-[11px] font-bold text-white hover:bg-[#031D3D] transition-colors cursor-pointer shadow-sm whitespace-nowrap"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#FCB017]" />
                    <span>Change Photo</span>
                  </button>

                  {hasCustomPhoto && (
                    <button
                      type="button"
                      onClick={() => clearPhotoForVehicle(vehicle.id)}
                      aria-label={`Remove uploaded photograph for ${vehicle.name}`}
                      className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-[#031D3D]/85 text-white hover:bg-[#031D3D] transition-colors cursor-pointer shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-[#FCB017]" />
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Clean Placeholder When Vehicle Photograph Has Not Been Uploaded Yet */
              <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#05284D]/[0.03] to-[#083D73]/[0.08]">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#05284D] text-[#FCB017] shadow-sm transition-transform duration-200 group-hover:scale-105">
                  <CarFront className="w-8 h-8" />
                </div>

                <span className="text-base sm:text-lg font-bold text-[#05284D]">
                  {vehicle.name}
                </span>

                <span className="mt-1 text-xs font-medium text-[#0B223E]/60">
                  Vehicle Photograph Placeholder
                </span>

                <button
                  type="button"
                  onClick={() => handleTriggerUpload(vehicle.id)}
                  aria-label={`Upload photograph for ${vehicle.name}`}
                  className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg bg-white hover:bg-[#05284D] text-[#05284D] hover:text-white border border-[#083D73]/25 px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
                >
                  <Upload className="w-3.5 h-3.5 text-[#FCB017]" />
                  <span>Upload Vehicle Photo</span>
                </button>
              </div>
            )}
          </div>

          {/* Minimal Vehicle Identity – Correct Vehicle Name Only */}
          <div className="px-6 pt-5 pb-3 flex items-baseline justify-between gap-3">
            <h4 className="text-xl sm:text-2xl font-bold text-[#05284D] tracking-tight group-hover:text-[#083D73] transition-colors">
              {vehicle.name}
            </h4>
            <span className="text-xs font-semibold text-[#083D73] whitespace-nowrap shrink-0">
              {vehicle.category}
            </span>
          </div>
        </div>

        {/* Clean Action Bar */}
        <div className="relative z-10 px-6 pb-6 pt-2 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onViewRates(vehicle.ratesSectionId)}
            aria-label={`View rates for ${vehicle.name}`}
            className="px-4 py-3 text-xs font-bold text-[#05284D] bg-[#F6F8FC] hover:bg-[#05284D] hover:text-white border border-[#05284D]/18 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            VIEW RATES
          </button>

          <button
            type="button"
            onClick={() => onBookVehicle(vehicle.bookingOptionName)}
            aria-label={`Book ${vehicle.name}`}
            className="ds-btn-gold px-4 py-3 text-xs font-bold rounded-xl cursor-pointer whitespace-nowrap"
          >
            BOOK THIS VEHICLE
          </button>
        </div>
      </article>
    );
  };

  return (
    <section
      id="our-fleet"
      aria-labelledby="fleet-heading"
      className="ds-section-gradient-soft py-16 sm:py-22 border-b border-[#05284D]/10 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Clean Header & Category Filter Controls */}
        <div className="ds-reveal flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#05284D]/15 pb-8">
          <div>
            <p className="text-xs font-bold tracking-widest text-[#083D73]">
              D.S. Tour and Travels Vehicle Gallery
            </p>
            <h2
              id="fleet-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold text-[#05284D] tracking-tight"
            >
              Our Vehicles
            </h2>
            <p className="mt-1.5 text-base sm:text-lg font-medium text-[#0B223E]/80">
              TAXI, TEMPO TRAVELLER and LUXURY CARS Available in Delhi
            </p>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            role="group"
            aria-label="Filter vehicles by category"
            className="inline-flex flex-wrap items-center gap-1.5 rounded-xl bg-white p-1.5 border border-[#05284D]/15 shadow-2xs self-start md:self-auto"
          >
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeFilter === "all"
                  ? "bg-[#05284D] text-[#FCB017] shadow-xs"
                  : "text-[#05284D] hover:bg-[#EDF2F9]"
              }`}
            >
              All Vehicles
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("TAXI")}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeFilter === "TAXI"
                  ? "bg-[#05284D] text-[#FCB017] shadow-xs"
                  : "text-[#05284D] hover:bg-[#EDF2F9]"
              }`}
            >
              TAXI
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("TEMPO TRAVELLER")}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeFilter === "TEMPO TRAVELLER"
                  ? "bg-[#05284D] text-[#FCB017] shadow-xs"
                  : "text-[#05284D] hover:bg-[#EDF2F9]"
              }`}
            >
              TEMPO TRAVELLER
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("LUXURY CARS")}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeFilter === "LUXURY CARS"
                  ? "bg-[#05284D] text-[#FCB017] shadow-xs"
                  : "text-[#05284D] hover:bg-[#EDF2F9]"
              }`}
            >
              LUXURY CARS
            </button>
          </div>
        </div>

        {/* Category 1: TAXI */}
        {(activeFilter === "all" || activeFilter === "TAXI") && (
          <div className="mt-12">
            <div className="ds-reveal mb-7 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-xs bg-[#FCB017]" aria-hidden="true" />
                <h3 className="text-2xl sm:text-3xl font-bold text-[#05284D] tracking-tight">
                  TAXI
                </h3>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#083D73] tabular-nums">
                {taxiVehicles.length} Vehicles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {taxiVehicles.map(renderVehicleCard)}
            </div>
          </div>
        )}

        {/* Category 2: TEMPO TRAVELLER */}
        {(activeFilter === "all" || activeFilter === "TEMPO TRAVELLER") && (
          <div className="mt-16">
            <div className="ds-reveal mb-7 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-xs bg-[#FCB017]" aria-hidden="true" />
                <h3 className="text-2xl sm:text-3xl font-bold text-[#05284D] tracking-tight">
                  TEMPO TRAVELLER
                </h3>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#083D73] tabular-nums">
                {tempoTravellerVehicles.length}{" "}
                {tempoTravellerVehicles.length === 1 ? "Vehicle" : "Vehicles"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {tempoTravellerVehicles.map(renderVehicleCard)}
            </div>
          </div>
        )}

        {/* Category 3: LUXURY CARS */}
        {(activeFilter === "all" || activeFilter === "LUXURY CARS") && (
          <div className="mt-16">
            <div className="ds-reveal mb-7 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-xs bg-[#FCB017]" aria-hidden="true" />
                <h3 className="text-2xl sm:text-3xl font-bold text-[#05284D] tracking-tight">
                  LUXURY CARS
                </h3>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#083D73] tabular-nums">
                {luxuryVehicles.length} Vehicles
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {luxuryVehicles.map(renderVehicleCard)}
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Vehicle Photograph Lightbox Modal */}
      {lightboxVehicle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxVehicle.vehicle.name} full size photograph`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#05284D]/90 p-4 sm:p-6"
          onClick={() => setLightboxVehicle(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl bg-white overflow-hidden shadow-2xl border-2 border-[#FFB319]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-[#05284D] text-white">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFB319]">
                  {lightboxVehicle.vehicle.category}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {lightboxVehicle.vehicle.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxVehicle(null)}
                aria-label="Close vehicle photograph preview"
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-[#F5F7FA] flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={lightboxVehicle.imageUrl}
                alt={lightboxVehicle.vehicle.name}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-6 py-4 bg-white border-t border-[#053B70]/10">
              <span className="text-sm font-bold text-[#05284D]">
                {lightboxVehicle.vehicle.name}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const sectionId = lightboxVehicle.vehicle.ratesSectionId;
                    setLightboxVehicle(null);
                    onViewRates(sectionId);
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-[#053B70] bg-[#F5F7FA] hover:bg-[#053B70] hover:text-white rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  VIEW RATES
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const optionName = lightboxVehicle.vehicle.bookingOptionName;
                    setLightboxVehicle(null);
                    onBookVehicle(optionName);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-[#05284D] bg-[#FFB319] hover:bg-[#FFA500] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  BOOK THIS VEHICLE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
