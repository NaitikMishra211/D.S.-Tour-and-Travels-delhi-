import React from "react";
import { Route, Star, ShieldCheck, Clock } from "lucide-react";

export interface ServiceStatItem {
  id: string;
  value: string;
  label: string;
}

export const SERVICE_STATS: ServiceStatItem[] = [
  {
    id: "outstation-trips",
    value: "12,500+",
    label: "Outstation Taxi Trips Completed",
  },
  {
    id: "passenger-rating",
    value: "4.9 / 5.0",
    label: "Verified Passenger Rating",
  },
  {
    id: "commercial-cabs",
    value: "100%",
    label: "Commercial Permitted Cabs",
  },
  {
    id: "direct-dispatch",
    value: "24 × 7",
    label: "Direct Taxi Dispatch",
  },
];

export const ServiceStatsSection: React.FC = () => {
  const getStatIcon = (id: string) => {
    switch (id) {
      case "outstation-trips":
        return <Route className="w-5 h-5 text-[#FCB017]" />;
      case "passenger-rating":
        return <Star className="w-5 h-5 fill-[#FCB017] text-[#FCB017]" />;
      case "commercial-cabs":
        return <ShieldCheck className="w-5 h-5 text-[#FCB017]" />;
      case "direct-dispatch":
      default:
        return <Clock className="w-5 h-5 text-[#FCB017]" />;
    }
  };

  return (
    <section
      id="service-highlights"
      aria-label="D.S. Tour and Travels Service Highlights"
      data-testid="service-stats-section"
      className="relative bg-gradient-to-r from-[#031D3D] via-[#05284D] to-[#083D73] border-b border-[#FCB017]/30 py-8 sm:py-10 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SERVICE_STATS.map((stat) => (
            <div
              key={stat.id}
              data-testid={`service-stat-${stat.id}`}
              className="ds-interactive-card ds-interactive-card-dark flex items-center gap-4 rounded-2xl bg-[#031D3D]/80 border border-white/15 px-5 py-4 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-[#FCB017]/80"
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FCB017]/15 border border-[#FCB017]/35">
                {getStatIcon(stat.id)}
              </div>
              <div className="relative z-10 min-w-0">
                <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FCB017] tabular-nums leading-tight">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-xs sm:text-sm font-semibold text-white/90 leading-snug">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
