import React, { useEffect, useState } from "react";
import { BUSINESS_CONFIG } from "../config/businessConfig";

interface OpeningIntroProps {
  onComplete: () => void;
}

export const OpeningIntro: React.FC<OpeningIntroProps> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setFadingOut(true);
    }, 2400);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setFadingOut(true);
    window.setTimeout(() => {
      onComplete();
    }, 150);
  };

  return (
    <div
      role="dialog"
      aria-label="D.S. Tour and Travels Cinematic Opening Intro"
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#05284D] text-white transition-opacity duration-400 ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 1 & 2. Heavily Blurred Modern Highway Background (NO mountains, hills, trees, buildings, or tourist scenery) */}
      <div
        className="pointer-events-none absolute inset-0 animate-cinematic-road"
        aria-hidden="true"
      >
        {/* Deep dark navy ambient depth-of-field vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05284D] via-[#053B70]/85 to-[#031326]" />

        {/* Heavily blurred highway surface & perspective motion blur */}
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter
              id="highway-depth-blur"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="24" />
            </filter>
            <filter
              id="road-motion-blur"
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
            >
              <feGaussianBlur stdDeviation="6 18" />
            </filter>
            <linearGradient
              id="asphalt-gradient"
              x1="720"
              y1="380"
              x2="720"
              y2="900"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#05284D" stopOpacity="0.2" />
              <stop offset="45%" stopColor="#071C36" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#020B16" stopOpacity="1" />
            </linearGradient>
            <radialGradient
              id="headlight-road-glow"
              cx="50%"
              cy="66%"
              r="44%"
            >
              <stop offset="0%" stopColor="#FFB319" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#053B70" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#05284D" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft out-of-focus highway bokeh lights in distance (strictly abstract light orbs, zero scenery) */}
          <g filter="url(#highway-depth-blur)">
            <ellipse
              cx="720"
              cy="410"
              rx="540"
              ry="95"
              fill="#053B70"
              fillOpacity="0.6"
            />
            <circle cx="470" cy="390" r="38" fill="#FFB319" fillOpacity="0.24" />
            <circle cx="970" cy="390" r="38" fill="#FFB319" fillOpacity="0.24" />
            <circle cx="615" cy="375" r="24" fill="#FFFFFF" fillOpacity="0.18" />
            <circle cx="825" cy="375" r="24" fill="#FFFFFF" fillOpacity="0.18" />
          </g>

          {/* Perspective Modern Highway Surface */}
          <polygon
            points="570,390 870,390 1440,900 0,900"
            fill="url(#asphalt-gradient)"
          />

          {/* Ambient Headlight Reflection on Asphalt */}
          <ellipse
            cx="720"
            cy="645"
            rx="550"
            ry="225"
            fill="url(#headlight-road-glow)"
          />

          {/* Motion-blurred Highway Lane Markings */}
          <g filter="url(#road-motion-blur)">
            {/* Left Highway Golden Edge Line */}
            <line
              x1="595"
              y1="400"
              x2="110"
              y2="900"
              stroke="#FFB319"
              strokeWidth="9"
              strokeOpacity="0.65"
            />
            {/* Right Highway Golden Edge Line */}
            <line
              x1="845"
              y1="400"
              x2="1330"
              y2="900"
              stroke="#FFB319"
              strokeWidth="9"
              strokeOpacity="0.65"
            />
            {/* High-Speed Center Dashed Taxi Route Line */}
            <line
              x1="720"
              y1="405"
              x2="720"
              y2="900"
              stroke="#FFFFFF"
              strokeWidth="7"
              strokeDasharray="48 36"
              strokeOpacity="0.75"
              className="animate-road-dash"
            />
          </g>
        </svg>

        {/* Animated road speed streaks */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 flex justify-center pointer-events-none overflow-hidden">
          <div className="h-36 w-1.5 rounded-full bg-gradient-to-b from-transparent via-[#FFB319]/80 to-transparent animate-highway-streak" />
        </div>
      </div>

      {/* 7. Top Official D.S. Tour and Travels Logo & Taxi-Themed H1 Reveal */}
      <div className="relative z-20 mx-auto w-full max-w-5xl px-4 pt-5 sm:pt-8 text-center animate-intro-header">
        {/* Exact Uploaded Official Logo */}
        <div className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.45)] border-2 border-[#FFB319]">
          <img
            src={BUSINESS_CONFIG.logoPath}
            alt="D.S. Tour and Travels – Taxi Service Official Logo"
            className="h-16 sm:h-24 w-auto object-contain block"
          />
        </div>

        <h1 className="mt-3.5 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-md">
          D.S. Tour and Travels
        </h1>

        <p className="mt-1.5 text-sm sm:text-lg font-semibold text-[#FFB319] tracking-wide">
          Local Taxi Booking &amp; Outstation Cab Services in Delhi
        </p>

        {/* Logo-Inspired Golden Taxi Route Ribbon Accent */}
        <div className="mt-2.5 mx-auto flex items-center justify-center gap-3 max-w-xs">
          <span className="h-0.5 flex-1 bg-[#FFB319]/80" />
          <span className="skew-x-[-14deg] bg-[#FFB319] px-3 py-0.5 text-[10px] font-extrabold tracking-widest uppercase text-[#05284D]">
            TAXI SERVICE
          </span>
          <span className="h-0.5 flex-1 bg-[#FFB319]/80" />
        </div>
      </div>

      {/* 3, 4, 5 & 6. ONE Extremely Sharp, Detailed Hero Car Moving Rapidly Towards the Viewer */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-xl animate-cinematic-car will-change-transform">
          <svg
            viewBox="0 0 600 360"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-[0_28px_40px_rgba(0,0,0,0.85)]"
            aria-label="Detailed executive taxi approaching on highway"
          >
            <defs>
              <linearGradient
                id="car-body-metallic"
                x1="300"
                y1="70"
                x2="300"
                y2="280"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="52%" stopColor="#F8FAFC" />
                <stop offset="88%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <linearGradient
                id="car-hood-crease"
                x1="300"
                y1="140"
                x2="300"
                y2="220"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#F1F5F9" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
              <linearGradient
                id="windshield-glass"
                x1="300"
                y1="78"
                x2="300"
                y2="148"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#031529" />
                <stop offset="60%" stopColor="#05284D" />
                <stop offset="100%" stopColor="#053B70" />
              </linearGradient>
              <radialGradient id="headlight-flare" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="45%" stopColor="#FFB319" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FFB319" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Realistic Ground Contact Shadow & Golden Road Reflection */}
            <ellipse
              cx="300"
              cy="302"
              rx="235"
              ry="26"
              fill="#020B16"
              fillOpacity="0.92"
            />
            <ellipse
              cx="165"
              cy="315"
              rx="75"
              ry="14"
              fill="#FFB319"
              fillOpacity="0.38"
            />
            <ellipse
              cx="435"
              cy="315"
              rx="75"
              ry="14"
              fill="#FFB319"
              fillOpacity="0.38"
            />

            {/* Front Tires (Left & Right) */}
            <rect
              x="92"
              y="224"
              width="54"
              height="76"
              rx="12"
              fill="#05162B"
              stroke="#05284D"
              strokeWidth="3"
            />
            <rect
              x="454"
              y="224"
              width="54"
              height="76"
              rx="12"
              fill="#05162B"
              stroke="#05284D"
              strokeWidth="3"
            />

            {/* Side Mirrors (Left & Right) with Golden Turn Indicators */}
            <path
              d="M126 136 L88 128 C80 128 76 135 80 143 L118 150 Z"
              fill="#05284D"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <rect x="82" y="136" width="22" height="3.5" rx="1.5" fill="#FFB319" />
            <path
              d="M474 136 L512 128 C520 128 524 135 520 143 L482 150 Z"
              fill="#05284D"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <rect x="496" y="136" width="22" height="3.5" rx="1.5" fill="#FFB319" />

            {/* Golden TAXI Roof Sign (Matching the Official Uploaded Logo) */}
            <path
              d="M248 64 L258 42 H342 L352 64 Z"
              fill="#FFB319"
              stroke="#05284D"
              strokeWidth="3"
            />
            <text
              x="300"
              y="58"
              textAnchor="middle"
              fill="#05284D"
              fontSize="13"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="1.5"
            >
              TAXI
            </text>

            {/* Main Cabin & Roofline */}
            <path
              d="M148 150 L188 72 C194 64 206 62 222 62 H378 C394 62 406 64 412 72 L452 150 Z"
              fill="url(#car-body-metallic)"
              stroke="#05284D"
              strokeWidth="3"
            />

            {/* Dark Tinted Windshield (No people or driver close-ups) */}
            <path
              d="M164 146 L198 80 H402 L436 146 H164 Z"
              fill="url(#windshield-glass)"
              stroke="#05284D"
              strokeWidth="2"
            />
            {/* Sleek diagonal studio reflection across windshield */}
            <polygon
              points="190,144 226,82 262,82 216,144"
              fill="#FFFFFF"
              fillOpacity="0.18"
            />
            <polygon
              points="234,144 274,82 288,82 246,144"
              fill="#FFFFFF"
              fillOpacity="0.09"
            />

            {/* Sculpted Front Hood & Wide Fenders */}
            <path
              d="M100 210 C102 178 122 154 148 146 H452 C478 154 498 178 500 210 L506 266 C506 278 496 286 482 286 H118 C104 286 94 278 94 266 L100 210 Z"
              fill="url(#car-body-metallic)"
              stroke="#05284D"
              strokeWidth="3"
            />

            {/* Aerodynamic Hood Lines */}
            <path
              d="M164 146 L205 212 H395 L436 146 Z"
              fill="url(#car-hood-crease)"
              stroke="#05284D"
              strokeWidth="2"
            />

            {/* Executive Front Grille (Matching the Logo Car Horizontal Slats) */}
            <polygon
              points="204,212 396,212 380,260 220,260"
              fill="#05284D"
              stroke="#FFB319"
              strokeWidth="2.5"
            />
            {/* Horizontal Chrome Grille Slats */}
            <line
              x1="214"
              y1="224"
              x2="386"
              y2="224"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            <line
              x1="218"
              y1="236"
              x2="382"
              y2="236"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            <line
              x1="222"
              y1="248"
              x2="378"
              y2="248"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />

            {/* Sharp LED Headlight Assemblies (Left & Right) */}
            {/* Left Headlight */}
            <polygon
              points="114,196 196,208 190,232 110,222"
              fill="#05284D"
              stroke="#FFB319"
              strokeWidth="2"
            />
            <polyline
              points="116,216 154,222 188,212"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle
              cx="152"
              cy="212"
              r="46"
              fill="url(#headlight-flare)"
              className="animate-headlight-pulse"
            />

            {/* Right Headlight */}
            <polygon
              points="486,196 404,208 410,232 490,222"
              fill="#05284D"
              stroke="#FFB319"
              strokeWidth="2"
            />
            <polyline
              points="484,216 446,222 412,212"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle
              cx="448"
              cy="212"
              r="46"
              fill="url(#headlight-flare)"
              className="animate-headlight-pulse"
            />

            {/* Lower Front Air Intakes */}
            <polygon
              points="116,250 186,256 182,276 112,272"
              fill="#05284D"
            />
            <rect x="124" y="260" width="44" height="5" rx="2.5" fill="#FFB319" />

            <polygon
              points="484,250 414,256 418,276 488,272"
              fill="#05284D"
            />
            <rect x="432" y="260" width="44" height="5" rx="2.5" fill="#FFB319" />

            {/* Front Number Plate Frame (Delhi Registration Identity) */}
            <rect
              x="244"
              y="264"
              width="112"
              height="22"
              rx="3"
              fill="#FFB319"
              stroke="#05284D"
              strokeWidth="2"
            />
            <text
              x="300"
              y="279"
              textAnchor="middle"
              fill="#05284D"
              fontSize="11"
              fontWeight="bold"
              fontFamily="monospace"
            >
              NEW DELHI
            </text>
          </svg>
        </div>
      </div>

      {/* Bottom Controls: Skip Intro Button */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-6 sm:pb-8">
        <span className="text-xs font-medium tracking-wider uppercase text-white/75">
          Your Journey, Our Responsibility
        </span>

        <button
          type="button"
          onClick={handleSkip}
          className="px-5 py-2.5 text-xs font-bold text-[#05284D] bg-[#FFB319] hover:bg-[#FFA500] rounded-lg transition-colors cursor-pointer shadow-md"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
};
