import React, { useEffect } from "react";
import { BUSINESS_CONFIG } from "../config/businessConfig";
import { ContactSection } from "../components/ContactSection";
import { BookingSection } from "../components/BookingSection";

interface ContactPageProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    document.title = BUSINESS_CONFIG.seo.contactTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", BUSINESS_CONFIG.seo.contactDescription);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main>
      {/* Page Header Banner */}
      <section className="ds-hero-surface text-white py-14 sm:py-18 border-b border-[#FCB017]/35">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              <li className="font-semibold text-[#FCB017]">Contact Us</li>
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Contact D.S. Tour and Travels
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/90 max-w-2xl">
            Get in touch with our New Delhi office for local taxi booking, outstation cab enquiries, and vehicle rate information.
          </p>
        </div>
      </section>

      {/* Verified Contact Details, Call/WhatsApp Buttons & Address Map Section */}
      <ContactSection showFullPageLink={false} />

      {/* Full Booking Enquiry Form */}
      <BookingSection />
    </main>
  );
};
