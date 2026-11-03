import React from "react";
import { CarFront, FileText, HeartHandshake, ArrowRight } from "lucide-react";

interface AboutSectionProps {
  onNavigateAboutPage?: () => void;
  showFullPageLink?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onNavigateAboutPage,
  showFullPageLink = true,
}) => {
  const features = [
    {
      title: "Reliable Transportation",
      description:
        "Dependable local taxi booking in New Delhi and outstation travel coordination tailored to your schedule.",
      icon: CarFront,
    },
    {
      title: "Transparent Pricing",
      description:
        "Clear vehicle-wise rate tables and straightforward pricing conditions shared upfront for every enquiry.",
      icon: FileText,
    },
    {
      title: "Customer-Focused Service",
      description:
        "Dedicated assistance for individuals, families, and organizations seeking comfortable travel from Delhi.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section
      id="about-section"
      aria-labelledby="about-heading"
      className="ds-section-gradient-white py-16 sm:py-20 border-b border-[#05284D]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ds-reveal max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#083D73]">
            Delhi Taxi Service &amp; Outstation Cabs
          </p>
          <h2
            id="about-heading"
            className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#05284D] tracking-tight"
          >
            About D.S. Tour and Travels
          </h2>

          <div className="mt-5 space-y-4 text-base sm:text-lg text-[#0B223E]/90 leading-relaxed">
            <p>
              D.S. Tour and Travels is dedicated to providing reliable and comfortable taxi transportation services in New Delhi. We offer multiple vehicle options, transparent pricing information and professional travel assistance to make every journey convenient for our customers.
            </p>
            <p>
              Our focus is on customer satisfaction, dependable service and building long-term relationships with individuals, families and organizations.
            </p>
          </div>

          {showFullPageLink && onNavigateAboutPage && (
            <div className="mt-6">
              <button
                type="button"
                onClick={onNavigateAboutPage}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#083D73] hover:text-[#05284D] transition-colors cursor-pointer group"
              >
                <span>Read More About D.S. Tour and Travels</span>
                <ArrowRight className="w-4 h-4 text-[#FCB017] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>

        {/* Three Feature Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="ds-interactive-card ds-reveal rounded-xl bg-[#F6F8FC] border border-[#05284D]/12 p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#FCB017]/80"
              >
                <div className="relative z-10 flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#083D73] to-[#05284D] text-[#FCB017] shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#083D73]/55 tabular-nums">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="relative z-10 text-lg font-bold text-[#05284D]">
                  {feature.title}
                </h3>
                <p className="relative z-10 mt-2 text-sm sm:text-base text-[#0B223E]/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
