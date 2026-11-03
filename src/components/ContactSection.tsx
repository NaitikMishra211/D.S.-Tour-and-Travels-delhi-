import React from "react";
import { Phone, MessageSquare, MapPin, User, ArrowRight } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/businessConfig";

interface ContactSectionProps {
  onNavigateContactPage?: () => void;
  showFullPageLink?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onNavigateContactPage,
  showFullPageLink = true,
}) => {
  return (
    <section
      id="contact-section"
      aria-labelledby="contact-heading"
      className="ds-section-gradient-white py-16 sm:py-20 border-b border-[#05284D]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="ds-reveal flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#083D73]">
              New Delhi Office &amp; Booking Desk
            </p>
            <h2
              id="contact-heading"
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#05284D] tracking-tight"
            >
              GET IN TOUCH
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#0B223E]/80">
              Reach out to {BUSINESS_CONFIG.businessName} in New Delhi for local taxi booking, outstation cab enquiries, and vehicle rate details.
            </p>
          </div>

          {showFullPageLink && onNavigateContactPage && (
            <button
              type="button"
              onClick={onNavigateContactPage}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#083D73] hover:text-[#05284D] transition-colors cursor-pointer group self-start md:self-auto"
            >
              <span>Visit Full Contact Us Page</span>
              <ArrowRight className="w-4 h-4 text-[#FCB017] transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>

        <div className="mt-10">
          {/* Verified Business Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Business & Owner Card */}
            <div className="ds-interactive-card ds-reveal rounded-xl bg-[#F6F8FC] border border-[#05284D]/12 p-6">
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#083D73] to-[#05284D] text-[#FCB017] mb-4">
                <User className="w-5 h-5" />
              </div>
              <p className="relative z-10 text-xs font-bold uppercase tracking-wider text-[#083D73]">
                Business &amp; Owner
              </p>
              <h3 className="relative z-10 mt-1 text-lg font-bold text-[#05284D]">
                {BUSINESS_CONFIG.businessName}
              </h3>
              <p className="relative z-10 mt-1 text-sm font-medium text-[#0B223E]/85">
                Owner: {BUSINESS_CONFIG.ownerName}
              </p>
            </div>

            {/* Call Card */}
            <div className="ds-interactive-card ds-reveal rounded-xl bg-[#F6F8FC] border border-[#05284D]/12 p-6 flex flex-col justify-between">
              <div className="relative z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#083D73] to-[#05284D] text-[#FCB017] mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#083D73]">
                  Call Number
                </p>
                <p className="mt-1 font-mono text-xl font-bold text-[#05284D] tabular-nums">
                  {BUSINESS_CONFIG.phone}
                </p>
              </div>
              <div className="relative z-10 mt-4">
                <a
                  href={BUSINESS_CONFIG.phoneHref}
                  className="ds-btn-navy inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold"
                >
                  <Phone className="w-4 h-4 text-[#FCB017]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="ds-interactive-card ds-reveal rounded-xl bg-[#F6F8FC] border border-[#05284D]/12 p-6 flex flex-col justify-between">
              <div className="relative z-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#083D73] to-[#05284D] text-[#FCB017] mb-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#083D73]">
                  WhatsApp Number
                </p>
                <p className="mt-1 font-mono text-xl font-bold text-[#05284D] tabular-nums">
                  {BUSINESS_CONFIG.whatsapp}
                </p>
              </div>
              <div className="relative z-10 mt-4">
                <a
                  href={BUSINESS_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ds-btn-gold inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Office Address Card */}
            <div className="ds-interactive-card ds-reveal rounded-xl bg-[#F6F8FC] border border-[#05284D]/12 p-6">
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#083D73] to-[#05284D] text-[#FCB017] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <p className="relative z-10 text-xs font-bold uppercase tracking-wider text-[#083D73]">
                Office Address
              </p>
              <p className="relative z-10 mt-1.5 text-sm font-semibold text-[#05284D] leading-relaxed">
                {BUSINESS_CONFIG.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

