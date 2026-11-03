import React, { useState, useEffect } from "react";
import { MessageSquare, ArrowUp, Phone } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/businessConfig";

interface FloatingActionsProps {
  onBookTaxi: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onBookTaxi,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop & Tablet Floating WhatsApp & Back-to-Top Buttons */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 flex flex-col items-end gap-3">
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#05284D] text-white border border-white/20 shadow-md hover:bg-[#053B70] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <a
          href={BUSINESS_CONFIG.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat on WhatsApp at ${BUSINESS_CONFIG.whatsapp}`}
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#FFB319] hover:bg-[#FFA500] px-3.5 py-2.5 text-xs font-bold text-[#05284D] shadow-md transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Compact Mobile Sticky Bottom Booking & Call Bar (Strictly under 15% viewport height cap) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#05284D] border-t border-[#FFB319]/40 px-3 py-2 shadow-lg">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={BUSINESS_CONFIG.phoneHref}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-white/10 py-2.5 text-xs font-bold text-white whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-[#FFB319]" />
            <span>Call</span>
          </a>

          <a
            href={BUSINESS_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-white/10 py-2.5 text-xs font-bold text-white whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#FFB319]" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onBookTaxi}
            className="flex items-center justify-center rounded-lg bg-[#FFB319] py-2.5 text-xs font-bold text-[#05284D] whitespace-nowrap cursor-pointer"
          >
            Book Taxi
          </button>
        </div>
      </div>
    </>
  );
};
