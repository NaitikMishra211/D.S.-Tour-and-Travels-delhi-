import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

export type AppRoute =
  | "/"
  | "/about-us"
  | "/contact-us"
  | `/routes/${string}`;

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string, sectionId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/", sectionId: undefined },
    { label: "About Us", path: "/about-us", sectionId: undefined },
    { label: "Our Fleet", path: "/", sectionId: "our-fleet" },
    { label: "Our Rates", path: "/", sectionId: "our-rates" },
    { label: "Contact Us", path: "/contact-us", sectionId: undefined },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId?: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path, sectionId);
  };

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate("/", "booking-enquiry");
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full overflow-hidden transition-all duration-200 border-b ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_8px_30px_rgba(3,29,61,0.08)] border-[#05284D]/15"
          : "bg-white border-[#05284D]/10"
      }`}
    >
      {/* Full luxury taxi image in top header (50% opacity with smooth readability blend) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src="/assets/aistudio/Gemini_Generated_Image_57trql57trql57tr_686f931f.png"
          alt=""
          referrerPolicy="no-referrer"
          data-testid="header-taxi-bg-image"
          className="h-full w-full object-cover object-[center_58%] opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/35" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Zone 1: Brand Title (Single-line logo + wordmark) */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          aria-label="D.S. Tour and Travels Home"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#053B70] rounded-lg shrink-0 transition-transform duration-200 hover:scale-[1.01]"
        >
          <BrandLogo variant="dark-text" size="md" />
        </a>

        {/* Zone 2: Exactly 5 Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#0B223E]"
        >
          {navItems.map((item) => {
            const isActive =
              item.path === currentPath && !item.sectionId;
            return (
              <a
                key={item.label}
                href={item.sectionId ? `/#${item.sectionId}` : item.path}
                onClick={(e) => handleNavClick(e, item.path, item.sectionId)}
                data-active={isActive ? "true" : "false"}
                className={`ds-nav-link whitespace-nowrap shrink-0 py-1.5 ${
                  isActive
                    ? "text-[#05284D] font-bold"
                    : "text-[#0B223E]/85 hover:text-[#05284D]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action ("BOOK A TAXI") + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/#booking-enquiry"
            onClick={handleBookClick}
            className="ds-btn-gold hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg whitespace-nowrap shrink-0"
          >
            BOOK A TAXI
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-[#05284D] hover:bg-[#EDF2F9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#053B70] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="relative z-10 lg:hidden bg-white/95 backdrop-blur-md border-t border-[#05284D]/10 px-4 pt-3 pb-5 shadow-lg">
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col space-y-1"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.sectionId ? `/#${item.sectionId}` : item.path}
                onClick={(e) => handleNavClick(e, item.path, item.sectionId)}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-[#0B223E] hover:bg-[#EDF2F9] hover:text-[#05284D] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="/#booking-enquiry"
                onClick={handleBookClick}
                className="ds-btn-gold flex w-full items-center justify-center px-5 py-3 text-sm font-bold rounded-lg"
              >
                BOOK A TAXI
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
