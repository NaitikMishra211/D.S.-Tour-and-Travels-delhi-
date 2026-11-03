/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { BUSINESS_CONFIG } from "./config/businessConfig";
import { getRouteBySlug } from "./data/delhiRoutes";
import { OpeningIntro } from "./components/OpeningIntro";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { OwnerSection } from "./components/OwnerSection";
import { FleetSection } from "./components/FleetSection";
import { RatesSection } from "./components/RatesSection";
import { BookingSection } from "./components/BookingSection";
import { WhyChooseUsSection } from "./components/WhyChooseUsSection";
import { CustomerReviewsSection } from "./components/CustomerReviewsSection";
import { ServiceStatsSection } from "./components/ServiceStatsSection";
import { TermsSection } from "./components/TermsSection";
import { ClosingStatementSection } from "./components/ClosingStatementSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingActions } from "./components/FloatingActions";
import { InteractiveCursor } from "./components/InteractiveCursor";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { RouteLandingPage } from "./pages/RouteLandingPage";

const GOOGLE_MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || "";

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || "/";
  });

  const [preselectedVehicle, setPreselectedVehicle] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath === "/") {
      document.title = BUSINESS_CONFIG.seo.homeTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", BUSINESS_CONFIG.seo.homeDescription);
      }
    }
  }, [currentPath]);

  // Subtle scroll-reveal observer for sections & cards with .ds-reveal
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      (window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".ds-reveal")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("ds-reveal-pending");
            entry.target.classList.add("ds-reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -24px 0px",
      }
    );

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Keep elements already within initial viewport immediately visible
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add("ds-reveal-visible");
      } else {
        el.classList.add("ds-reveal-pending");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [currentPath, showIntro]);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  const scrollToElement = useCallback((sectionId: string) => {
    window.setTimeout(() => {
      const element =
        document.getElementById(sectionId) ||
        (sectionId === "booking-enquiry"
          ? document.getElementById("contact-section")
          : null);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  }, []);

  const handleNavigate = useCallback(
    (path: string, sectionId?: string) => {
      if (path !== currentPath) {
        window.history.pushState({}, "", sectionId ? `${path}#${sectionId}` : path);
        setCurrentPath(path);
        if (sectionId) {
          scrollToElement(sectionId);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        if (sectionId) {
          window.history.replaceState({}, "", `${path}#${sectionId}`);
          scrollToElement(sectionId);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    },
    [currentPath, scrollToElement]
  );

  const handleViewRatesFromFleet = useCallback(
    (ratesSectionId: "sedan-suv-rates" | "luxury-car-rates") => {
      handleNavigate("/", ratesSectionId);
    },
    [handleNavigate]
  );

  const handleBookVehicleFromFleet = useCallback(
    (bookingOptionName: string) => {
      setPreselectedVehicle(bookingOptionName);
      handleNavigate("/", "booking-enquiry");
    },
    [handleNavigate]
  );

  const renderPageContent = () => {
    if (currentPath === "/about-us") {
      return <AboutPage onNavigate={handleNavigate} />;
    }

    if (currentPath === "/contact-us") {
      return <ContactPage onNavigate={handleNavigate} />;
    }

    if (currentPath.startsWith("/routes/")) {
      const slug = currentPath.replace("/routes/", "").replace(/\/$/, "");
      const matchedRoute = getRouteBySlug(slug);
      // Only publish a route page after D.S. Tour and Travels confirms that the business can serve that destination
      if (matchedRoute && matchedRoute.confirmed) {
        return (
          <RouteLandingPage route={matchedRoute} onNavigate={handleNavigate} />
        );
      }
    }

    // Default: Vehicle-First Delhi Homepage
    return (
      <main>
        {/* Homepage Hero Section – Vehicle First */}
        <HeroSection
          onBookTaxi={() => handleNavigate("/", "booking-enquiry")}
          onViewRates={() => handleNavigate("/", "our-rates")}
          onSelectVehicleForBooking={handleBookVehicleFromFleet}
        />

        {/* Key Taxi Service Highlights (12,500+ Trips, 4.9/5.0 Rating, 100% Commercial Permitted Cabs, 24x7 Dispatch) */}
        <ServiceStatsSection />

        {/* Customer Testimonials Section – Placed Directly Below Header */}
        <CustomerReviewsSection />

        {/* Our Fleet – Large Vehicle Images */}
        <FleetSection
          onViewRates={handleViewRatesFromFleet}
          onBookVehicle={handleBookVehicleFromFleet}
        />

        {/* Our Vehicle Rates – Complete Pricing Section */}
        <RatesSection
          onViewTerms={() => handleNavigate("/", "terms-and-conditions")}
        />

        {/* Short About Section on Homepage with Link to /about-us */}
        <AboutSection
          onNavigateAboutPage={() => handleNavigate("/about-us")}
          showFullPageLink={true}
        />

        {/* Owner Section – Daljeet Singh */}
        <OwnerSection />

        {/* Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* 11. Terms & Conditions */}
        <TermsSection />

        {/* 12. Business Closing Statement */}
        <ClosingStatementSection
          onContactClick={() => handleNavigate("/contact-us")}
        />

        {/* 13. Short Contact Section on Homepage */}
        <ContactSection
          onNavigateContactPage={() => handleNavigate("/contact-us")}
          showFullPageLink={true}
        />
      </main>
    );
  };

  const appTree = (
    <div className="min-h-screen flex flex-col bg-[#F6F8FC] text-[#0B223E] relative">
      {/* Desktop Custom Cursor & Logo-Colored Mouse Spotlight */}
      <InteractiveCursor />

      {showIntro && <OpeningIntro onComplete={handleIntroComplete} />}

      {/* 3. Sticky Header and Navigation */}
      <Header currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Main Page View with Smooth Page Transition */}
      <div key={currentPath} className="flex-1 animate-page-enter">
        {renderPageContent()}
      </div>

      {/* 14. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 15. Floating WhatsApp, Back-to-top & Mobile Sticky Booking CTA */}
      <FloatingActions
        onBookTaxi={() => handleNavigate("/", "booking-enquiry")}
      />
    </div>
  );

  if (!GOOGLE_MAPS_API_KEY) {
    return appTree;
  }

  return (
    <APIProvider
      apiKey={GOOGLE_MAPS_API_KEY}
      region="IN"
      language="en"
      libraries={["places", "routes", "marker"]}
    >
      {appTree}
    </APIProvider>
  );
}


