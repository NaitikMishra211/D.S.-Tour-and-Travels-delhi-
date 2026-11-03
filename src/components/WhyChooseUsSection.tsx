import React from "react";
import { CarFront, FileSpreadsheet, UserCheck, Handshake } from "lucide-react";

export const WhyChooseUsSection: React.FC = () => {
  const cards = [
    {
      title: "Multiple Vehicle Choices",
      description: "Choose from regular, SUV and luxury vehicle options.",
      icon: CarFront,
    },
    {
      title: "Transparent Pricing",
      description: "Clear vehicle-wise pricing for better convenience.",
      icon: FileSpreadsheet,
    },
    {
      title: "Professional Service",
      description:
        "We focus on dependable and customer-friendly transportation.",
      icon: UserCheck,
    },
    {
      title: "Customer Relationships",
      description: "We value trust and long-term business relationships.",
      icon: Handshake,
    },
  ];

  return (
    <section
      aria-labelledby="why-choose-heading"
      className="ds-section-gradient-white py-16 sm:py-20 border-b border-[#05284D]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ds-reveal max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#083D73]">
            Dependable Taxi Service in New Delhi
          </p>
          <h2
            id="why-choose-heading"
            className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#05284D] tracking-tight"
          >
            Why Choose D.S. Tour and Travels?
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="ds-interactive-card ds-reveal rounded-xl bg-[#F6F8FC] border border-[#05284D]/12 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#FCB017]/80"
              >
                <div className="relative z-10 flex items-center justify-between mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#083D73] to-[#05284D] text-[#FCB017] shadow-xs">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#083D73]/55 tabular-nums">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="relative z-10 text-lg font-bold text-[#05284D]">
                  {card.title}
                </h3>
                <p className="relative z-10 mt-2 text-sm text-[#0B223E]/85 leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
