// Source: Google Maps Platform Code Assist
import React, { useEffect, useState, useCallback } from "react";
import {
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { MapPin, Navigation } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/businessConfig";

interface ResolvedOfficePlace {
  displayName: string;
  formattedAddress: string;
  location: google.maps.LatLngLiteral;
}

function isQuotaError(err: unknown): boolean {
  const msg = String((err as { message?: string })?.message || err || "");
  return (
    msg.includes("OVER_QUERY_LIMIT") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.includes("QuotaExceededError") ||
    msg.includes("429")
  );
}

/**
 * Resolves the D.S. Tour and Travels New Delhi office location dynamically via
 * Places API (New) `Place.searchByText` (no LLM-hardcoded place coordinates)
 * and renders an interactive AdvancedMarker + InfoWindow.
 * Doc: https://developers.google.com/maps/documentation/javascript/place-search?utm_campaign=gmp_mcp_codeassist_v1_aistudio
 */
const OfficeMarkerLayer: React.FC<{
  onResolved?: (place: ResolvedOfficePlace) => void;
}> = ({ onResolved }) => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [officePlace, setOfficePlace] = useState<ResolvedOfficePlace | null>(
    null
  );
  const [infoOpen, setInfoOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!placesLib || !map) return;

    let isMounted = true;
    const { Place } = placesLib;

    const searchRequest: google.maps.places.SearchByTextRequest = {
      textQuery: "Gulmohar Park, Near Siri Fort Auditorium, New Delhi 110049",
      fields: ["displayName", "formattedAddress", "location", "viewport"],
      region: "in",
      language: "en",
      maxResultCount: 1,
    };

    Place.searchByText(searchRequest)
      .then(({ places }) => {
        if (!isMounted) return;
        const firstPlace = places?.[0];
        if (firstPlace && firstPlace.location) {
          const lat = firstPlace.location.lat();
          const lng = firstPlace.location.lng();
          const resolved: ResolvedOfficePlace = {
            displayName:
              firstPlace.displayName || BUSINESS_CONFIG.businessName,
            formattedAddress:
              firstPlace.formattedAddress || BUSINESS_CONFIG.address,
            location: { lat, lng },
          };
          setOfficePlace(resolved);
          onResolved?.(resolved);

          map.panTo(resolved.location);
          map.setZoom(16);
        }
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent("gmp-quota-exceeded"));
        }
      });

    return () => {
      isMounted = false;
    };
  }, [placesLib, map, onResolved]);

  const handleRecenter = useCallback(() => {
    if (map && officePlace) {
      map.panTo(officePlace.location);
      map.setZoom(16);
      setInfoOpen(true);
    }
  }, [map, officePlace]);

  return (
    <>
      {officePlace && (
        <>
          <AdvancedMarker
            ref={markerRef}
            position={officePlace.location}
            title={`${BUSINESS_CONFIG.businessName} – New Delhi Office`}
            onClick={() => setInfoOpen(true)}
          >
            <Pin
              background="#FFB319"
              borderColor="#05284D"
              glyphColor="#05284D"
              scale={1.25}
            />
          </AdvancedMarker>

          {infoOpen && marker && (
            <InfoWindow
              anchor={marker}
              maxWidth={260}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div className="text-[#05284D] p-1">
                <p className="text-xs font-bold tracking-wider text-[#053B70]">
                  {BUSINESS_CONFIG.businessName}
                </p>
                <p className="mt-1 text-xs font-medium text-[#172B45] leading-snug">
                  {BUSINESS_CONFIG.address}
                </p>
                <p className="mt-1.5 text-[11px] font-semibold text-[#053B70]">
                  Call: {BUSINESS_CONFIG.phone}
                </p>
              </div>
            </InfoWindow>
          )}
        </>
      )}

      {/* Map Overlay Action Bar */}
      {officePlace && (
        <div className="absolute top-3 left-3 right-14 flex items-center justify-start gap-2 pointer-events-none">
          <button
            type="button"
            onClick={handleRecenter}
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-lg bg-[#05284D]/95 hover:bg-[#05284D] text-white px-3 py-1.5 text-xs font-bold shadow-md border border-[#FFB319]/40 transition-colors cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-[#FFB319]" />
            <span>Center on Office</span>
          </button>
        </div>
      )}
    </>
  );
};

export const OfficeLocationMap: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  if (!apiKey) {
    return (
      <div className="mt-5 rounded-xl bg-[#053B70]/70 border border-white/15 p-5 text-center">
        <MapPin className="w-6 h-6 text-[#FFB319] mx-auto mb-2" />
        <p className="text-xs font-medium text-white/85">
          {BUSINESS_CONFIG.address}
        </p>
      </div>
    );
  }

  return (
    <div
      className="mt-5 relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-white/20 shadow-inner bg-[#053B70]/40"
      data-testid="office-google-map"
    >
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={2}
        gestureHandling="cooperative"
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={true}
        internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
        className="w-full h-full"
      >
        <OfficeMarkerLayer />
      </GoogleMap>
    </div>
  );
};
