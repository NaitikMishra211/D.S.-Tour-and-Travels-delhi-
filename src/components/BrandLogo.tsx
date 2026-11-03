import React from "react";
import { BUSINESS_CONFIG } from "../config/businessConfig";

interface BrandLogoProps {
  variant?: "dark-text" | "light-text";
  size?: "sm" | "md" | "lg" | "xl";
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "dark-text",
  size = "md",
}) => {
  const imageDimensions =
    size === "xl"
      ? "h-24 sm:h-28 w-auto"
      : size === "lg"
      ? "h-16 sm:h-20 w-auto"
      : size === "sm"
      ? "h-11 sm:h-12 w-auto"
      : "h-14 sm:h-16 w-auto";

  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 select-none">
      <span
        className={`inline-flex items-center justify-center overflow-hidden shrink-0 ${
          variant === "light-text"
            ? "rounded-xl bg-white px-3.5 py-1.5 shadow-md border-2 border-[#FFB319]"
            : "rounded-lg bg-white"
        }`}
      >
        <img
          src={BUSINESS_CONFIG.logoPath}
          alt="D.S. Tour and Travels – Taxi Service in Delhi"
          className={`${imageDimensions} object-contain block`}
        />
      </span>
      <span className="sr-only">D.S. Tour and Travels</span>
    </span>
  );
};
