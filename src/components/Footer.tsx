import React from "react";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { BUSINESS_CONFIG } from "../config/businessConfig";
import { getPublishedRoutes } from "../data/delhiRoutes";

interface FooterProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const publishedRoutes = getPublishedRoutes();

  const quickLinks = [
    { label: "Home", path: "/", sectionId: undefined },
    { label: "About Us", path: "/about-us", sectionId: undefined },
    { label: "Our Fleet", path: "/", sectionId: "our-fleet" },
    { label: "Our Rates", path: "/", sectionId: "our-rates" },
    { label: "Contact Us", path: "/contact-us", sectionId: undefined },
    {
      label: "Terms & Conditions",
      path: "/",
      sectionId: "terms-and-conditions",
    },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    sectionId?: string
  ) => {
    e.preventDefault();
    onNavigate(path, sectionId);
  };

  return (
    <footer className="bg-gradient-to-b from-[#031D3D] to-[#05284D] text-white border-t-4 border-[#FCB017] pb-20 sm:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand Logo & Short Delhi Business Description */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              aria-label="D.S. Tour and Travels Home"
              className="inline-block transition-transform duration-200 hover:scale-[1.01]"
            >
              <BrandLogo variant="light-text" size="md" />
            </a>

            <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-md">
              {BUSINESS_CONFIG.footerDescription}
            </p>

            <p className="text-xs font-semibold text-[#FCB017]">
              Owner: {BUSINESS_CONFIG.ownerName}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FCB017]">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.sectionId ? `/#${item.sectionId}` : item.path}
                    onClick={(e) =>
                      handleLinkClick(e, item.path, item.sectionId)
                    }
                    className="text-white/85 hover:text-[#FCB017] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#FCB017]">
              Contact Information
            </h3>

            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FCB017] shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-white/70">Call Number</span>
                  <a
                    href={BUSINESS_CONFIG.phoneHref}
                    className="font-mono font-bold text-white hover:text-[#FCB017] transition-colors tabular-nums"
                  >
                    {BUSINESS_CONFIG.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-[#FCB017] shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-white/70">
                    WhatsApp Number
                  </span>
                  <a
                    href={BUSINESS_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-white hover:text-[#FCB017] transition-colors tabular-nums"
                  >
                    {BUSINESS_CONFIG.whatsapp}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FCB017] shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-white/70">
                    Office Address
                  </span>
                  <span className="font-medium leading-relaxed">
                    {BUSINESS_CONFIG.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Confirmed Delhi-Origin Routes Links (Only displayed when confirmed by business) */}
        {publishedRoutes.length > 0 && (
          <div className="mt-10 pt-8 border-t border-white/15">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FCB017] mb-3">
              Confirmed Outstation Taxi Routes from Delhi
            </h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/80">
              {publishedRoutes.map((route) => (
                <a
                  key={route.id}
                  href={`/routes/${route.slug}`}
                  onClick={(e) => handleLinkClick(e, `/routes/${route.slug}`)}
                  className="hover:text-[#FCB017] transition-colors"
                >
                  Delhi to {route.destination} Taxi
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Exact Copyright Text with Clickable "Powered by LeadX Technology" */}
        <div className="mt-12 pt-6 border-t border-white/15 text-center text-xs sm:text-sm text-white/80">
          <p>
            © {BUSINESS_CONFIG.copyrightYear} {BUSINESS_CONFIG.businessName}. All Rights Reserved.{" "}
            <a
              href={BUSINESS_CONFIG.poweredByWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FCB017] underline underline-offset-4 transition-colors"
            >
              Powered by {BUSINESS_CONFIG.poweredBy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
