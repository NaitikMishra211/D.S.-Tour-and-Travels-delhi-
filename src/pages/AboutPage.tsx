import React, { useEffect } from "react";
import { Compass, CheckCircle, Handshake, Phone, MessageSquare } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/businessConfig";
import { AboutSection } from "../components/AboutSection";
import { OwnerSection } from "../components/OwnerSection";
import { ClosingStatementSection } from "../components/ClosingStatementSection";

interface AboutPageProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = BUSINESS_CONFIG.seo.aboutTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", BUSINESS_CONFIG.seo.aboutDescription);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main>
      {/* Page Header Banner */}
      <section className="ds-hero-surface text-white py-14 sm:py-18 border-b border-[#FCB017]/35">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-white/75">
            <ol className="flex items-center gap-2">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("/");
                  }}
                  className="hover:text-[#FCB017] transition-colors"
                >
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[#FCB017]">About Us</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            About D.S. Tour and Travels
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/90 max-w-2xl">
            Dependable Local Taxi Booking and Outstation Cab Services Based in Gulmohar Park, New Delhi.
          </p>
        </div>
      </section>

      {/* Core About Section & Three Feature Cards */}
      <AboutSection showFullPageLink={false} />

      {/* Our Vision, Our Service Approach & Customer Relationship Commitment */}
      <section className="ds-section-gradient-soft py-16 sm:py-20 border-b border-[#05284D]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 1. Our Vision */}
            <div className="ds-interactive-card ds-reveal rounded-xl bg-white border border-[#05284D]/15 p-7">
              <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#083D73] to-[#05284D] text-[#FCB017] mb-5">
                <Compass className="w-5 h-5" />
              </div>
              <h2 className="relative z-10 text-xl font-bold text-[#05284D]">Our Vision</h2>
              <p className="relative z-10 mt-3 text-sm sm:text-base text-[#0B223E]/85 leading-relaxed">
                At D.S. Tour and Travels, our vision is to provide dependable transportation services in New Delhi built on trust, comfort, and customer satisfaction. Whether assisting an individual traveler, a family, or a corporate organization, we aim to make every local and outstation journey straightforward and reliable.
              </p>
            </div>

            {/* 2. Our Service Approach */}
            <div className="ds-interactive-card ds-reveal rounded-xl bg-white border border-[#05284D]/15 p-7">
              <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#083D73] to-[#05284D] text-[#FCB017] mb-5">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h2 className="relative z-10 text-xl font-bold text-[#05284D]">
                Our Service Approach
              </h2>
              <p className="relative z-10 mt-3 text-sm sm:text-base text-[#0B223E]/85 leading-relaxed">
                We believe in clear communication and transparent pricing information. Customers can choose from our TAXI, TEMPO TRAVELLER, or LUXURY CARS categories, review our published vehicle rates and pricing conditions upfront, and submit booking enquiries directly to our New Delhi team.
              </p>
            </div>

            {/* 3. Customer Relationship Commitment */}
            <div className="ds-interactive-card ds-reveal rounded-xl bg-white border border-[#05284D]/15 p-7">
              <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#083D73] to-[#05284D] text-[#FCB017] mb-5">
                <Handshake className="w-5 h-5" />
              </div>
              <h2 className="relative z-10 text-xl font-bold text-[#05284D]">
                Customer Relationship Commitment
              </h2>
              <p className="relative z-10 mt-3 text-sm sm:text-base text-[#0B223E]/85 leading-relaxed">
                We value long-term relationships with our clients and organizations. Every booking enquiry is handled personally by our team in New Delhi so that vehicle selection, pickup scheduling, and outstation travel requirements are properly coordinated.
              </p>
            </div>
          </div>

          {/* Direct Enquire CTA Box */}
          <div className="ds-interactive-card ds-reveal mt-12 rounded-2xl bg-white border border-[#05284D]/15 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-[#05284D]">
                Need a Taxi in New Delhi or Planning an Outstation Journey?
              </h3>
              <p className="mt-1 text-sm sm:text-base text-[#0B223E]/80">
                Explore our vehicle rates or get in touch with our team to submit your booking enquiry.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate("/", "booking-enquiry")}
                className="ds-btn-gold px-6 py-3 text-xs sm:text-sm font-bold rounded-lg cursor-pointer whitespace-nowrap"
              >
                BOOK YOUR TAXI
              </button>
              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#05284D] bg-[#F6F8FC] hover:bg-[#05284D] hover:text-white border border-[#05284D]/20 rounded-lg transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_CONFIG.phone}</span>
              </a>
              <a
                href={BUSINESS_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#05284D] bg-[#F6F8FC] hover:bg-[#05284D] hover:text-white border border-[#05284D]/20 rounded-lg transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Profile Section */}
      <OwnerSection />

      {/* Closing Business Statement */}
      <ClosingStatementSection
        onContactClick={() => onNavigate("/contact-us")}
      />
    </main>
  );
};
