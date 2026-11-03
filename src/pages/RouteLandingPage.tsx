import React, { useEffect } from "react";
import { Phone, MessageSquare, CarFront, ArrowRight } from "lucide-react";
import { OutstationRoute } from "../data/delhiRoutes";
import { BUSINESS_CONFIG } from "../config/businessConfig";
import { FLEET_VEHICLES } from "../data/vehiclePricing";
import { BookingSection } from "../components/BookingSection";

interface RouteLandingPageProps {
  route: OutstationRoute;
  onNavigate: (path: string, sectionId?: string) => void;
}

export const RouteLandingPage: React.FC<RouteLandingPageProps> = ({
  route,
  onNavigate,
}) => {
  useEffect(() => {
    document.title = route.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", route.metaDescription);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  return (
    <main>
      {/* Route Hero Banner */}
      <section className="bg-gradient-to-br from-[#05284D] via-[#053B70] to-[#05284D] text-white py-14 sm:py-18 border-b border-[#FFB319]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/75">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/");
                  }}
                  className="hover:text-[#FFB319] transition-colors"
                >
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>Outstation Routes from Delhi</li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[#FFB319]">
                Delhi to {route.destination} Taxi
              </li>
            </ol>
          </nav>

          {/* Unique H1 Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {route.h1Heading}
          </h1>

          <p className="mt-3 text-base sm:text-lg text-white/90 max-w-2xl">
            Enquire with {BUSINESS_CONFIG.businessName} in New Delhi for round-trip outstation travel from Delhi to {route.destination}.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={BUSINESS_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFB319] hover:bg-[#FFA500] px-6 py-3 text-xs sm:text-sm font-bold text-[#05284D] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Enquiry ({BUSINESS_CONFIG.whatsapp})</span>
            </a>

            <button
              type="button"
              onClick={() => onNavigate("/", "our-rates")}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 px-6 py-3 text-xs sm:text-sm font-semibold text-white transition-colors cursor-pointer"
            >
              <span>View Our Vehicle Rates</span>
              <ArrowRight className="w-4 h-4 text-[#FFB319]" />
            </button>
          </div>
        </div>
      </section>

      {/* Route Overview Content */}
      <section className="bg-white py-14 sm:py-16 border-b border-[#053B70]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#05284D]">
              {route.h2Overview}
            </h2>
            {route.overviewParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-base text-[#172B45]/85 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#05284D]">
                {route.h2Vehicles}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#172B45]/80">
                Choose from our existing fleet in New Delhi for your Delhi to {route.destination} journey:
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FLEET_VEHICLES.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex items-center justify-between rounded-lg bg-[#F5F7FA] border border-[#053B70]/15 px-4 py-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <CarFront className="w-4 h-4 text-[#053B70]" />
                      <span className="text-sm font-bold text-[#05284D]">
                        {vehicle.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#053B70] font-medium">
                      {vehicle.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Links to Our Rates, Homepage & Contact Us */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="rounded-xl bg-[#F5F7FA] border border-[#053B70]/15 p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#05284D]">
                {route.h2EnquiryProcess}
              </h2>
              <p className="text-sm text-[#172B45]/85 leading-relaxed">
                All outstation bookings from New Delhi follow our published per-kilometre vehicle rates (minimum 250 KM per day from garage to garage) and standard Pricing Conditions.
              </p>
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate("/", "our-rates")}
                  className="w-full rounded-lg bg-[#053B70] hover:bg-[#05284D] px-4 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Check Our Rates Section
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("/contact-us")}
                  className="w-full rounded-lg bg-white hover:bg-[#F5F7FA] border border-[#053B70]/25 px-4 py-2.5 text-xs font-bold text-[#05284D] transition-colors cursor-pointer"
                >
                  Go to Contact Us Page
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate("/")}
                  className="w-full rounded-lg bg-white hover:bg-[#F5F7FA] border border-[#053B70]/25 px-4 py-2.5 text-xs font-bold text-[#053B70] transition-colors cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-[#05284D] text-white p-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#FFB319]">
                Direct Delhi Booking Desk
              </p>
              <p className="text-sm text-white/85">
                {BUSINESS_CONFIG.address}
              </p>
              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="flex items-center gap-2 text-sm font-mono font-bold text-[#FFB319]"
              >
                <Phone className="w-4 h-4" />
                <span>{BUSINESS_CONFIG.phone}</span>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Route-Specific FAQs */}
      <section className="bg-[#F5F7FA] py-14 sm:py-16 border-b border-[#053B70]/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#05284D]">
            Frequently Asked Questions – Delhi to {route.destination} Taxi
          </h2>
          <div className="mt-6 space-y-4">
            {route.faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl bg-white border border-[#053B70]/15 p-5"
              >
                <h3 className="text-base font-bold text-[#05284D]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-[#172B45]/85 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Enquiry Form Preselected for this Destination */}
      <BookingSection preselectedDestination={route.destination} />
    </main>
  );
};
