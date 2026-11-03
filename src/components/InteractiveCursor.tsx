import React, { useEffect, useRef, useState } from "react";

/**
 * Desktop-only interactive cursor with a precision center dot, smooth trailing
 * ring, ambient logo-colored radial spotlight, and per-card mouse glow coordinates.
 * Automatically disabled on touchscreens and when prefers-reduced-motion is active.
 */
export const InteractiveCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateAvailability = () => {
      setEnabled(finePointerQuery.matches && !reducedMotionQuery.matches);
    };

    updateAvailability();

    finePointerQuery.addEventListener("change", updateAvailability);
    reducedMotionQuery.addEventListener("change", updateAvailability);

    return () => {
      finePointerQuery.removeEventListener("change", updateAvailability);
      reducedMotionQuery.removeEventListener("change", updateAvailability);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let isVisible = false;
    let hoverMode: "default" | "interactive" | "card" = "default";
    let rafId = 0;
    let activeCardEl: HTMLElement | null = null;

    const applyVisibility = (visible: boolean) => {
      const opacity = visible ? "1" : "0";
      if (dotRef.current) dotRef.current.style.opacity = opacity;
      if (ringRef.current) ringRef.current.style.opacity = opacity;
      if (spotlightRef.current) spotlightRef.current.style.opacity = opacity;
    };

    const applyHoverMode = (mode: "default" | "interactive" | "card") => {
      if (!ringRef.current || !dotRef.current) return;
      ringRef.current.dataset.mode = mode;
      dotRef.current.dataset.mode = mode;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        currentX = targetX;
        currentY = targetY;
        isVisible = true;
        applyVisibility(true);
      }

      // Update dot and ambient spotlight immediately for crisp responsiveness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(560px circle at ${targetX}px ${targetY}px, rgba(252, 176, 23, 0.095), rgba(8, 61, 115, 0.065) 45%, transparent 78%)`;
      }

      const targetEl = e.target as HTMLElement | null;
      if (!targetEl) return;

      // Update per-card cursor highlight coordinates on vehicle and feature cards
      const cardEl = targetEl.closest<HTMLElement>(".ds-interactive-card");
      if (cardEl) {
        activeCardEl = cardEl;
        const rect = cardEl.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        cardEl.style.setProperty("--card-mouse-x", `${relX}px`);
        cardEl.style.setProperty("--card-mouse-y", `${relY}px`);
      } else if (activeCardEl) {
        activeCardEl = null;
      }

      const clickable = targetEl.closest(
        "a, button, select, input, textarea, label, [role='button']"
      );

      const nextMode: "default" | "interactive" | "card" = clickable
        ? "interactive"
        : cardEl
        ? "card"
        : "default";

      if (nextMode !== hoverMode) {
        hoverMode = nextMode;
        applyHoverMode(hoverMode);
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      applyVisibility(false);
    };

    const animateTrailingRing = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX.toFixed(
          2
        )}px, ${currentY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(animateTrailingRing);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = window.requestAnimationFrame(animateTrailingRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
    >
      {/* Soft ambient logo-colored light following cursor movement */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 opacity-0 transition-opacity duration-300"
      />

      {/* Smooth trailing outer ring */}
      <div
        ref={ringRef}
        data-mode="default"
        className="ds-cursor-ring pointer-events-none fixed top-0 left-0 opacity-0"
      />

      {/* Crisp center dot */}
      <div
        ref={dotRef}
        data-mode="default"
        className="ds-cursor-dot pointer-events-none fixed top-0 left-0 opacity-0"
      />
    </div>
  );
};
