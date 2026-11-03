// Source: Google Maps Platform Code Assist
import React, { useEffect, useRef, useState } from "react";
import {
  Map as GoogleMap,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Navigation, Clock, Route as RouteIcon } from "lucide-react";

interface JourneyRouteMapProps {
  pickupLocation: string;
  destination: string;
}

interface RouteMetrics {
  distanceKm: string;
  durationText: string;
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

function formatDurationMillis(durationMillis: number): string {
  const totalMinutes = Math.round(durationMillis / 60000);
  if (totalMinutes < 60) {
    return `${Math.max(1, totalMinutes)} mins`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return mins > 0 ? `${hours} hr ${mins} mins` : `${hours} hr`;
}

/**
 * Computes and renders driving routes using the modern Routes API (`Route.computeRoutes`)
 * via `useMapsLibrary('routes')` and `primaryRoute.createPolylines()`.
 * Doc: https://developers.google.com/maps/documentation/javascript/routes?utm_campaign=gmp_mcp_codeassist_v1_aistudio
 */
const RoutePolylineLayer: React.FC<{
  origin: string;
  destination: string;
  onRouteMetrics: (metrics: RouteMetrics | null) => void;
  onStatusChange: (loading: boolean, error: string | null) => void;
}> = ({ origin, destination, onRouteMetrics, onStatusChange }) => {
  const map = useMap();
  const routesLib = useMapsLibrary("routes");
  const placesLib = useMapsLibrary("places");
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  // Center on New Delhi dynamically via Places API (New) when no route is active
  useEffect(() => {
    if (!map || !placesLib) return;
    if (origin.trim().length >= 3 && destination.trim().length >= 3) return;

    let active = true;
    const { Place } = placesLib;
    Place.searchByText({
      textQuery: "Gulmohar Park, New Delhi 110049",
      fields: ["location", "viewport"],
      region: "in",
      language: "en",
      maxResultCount: 1,
    })
      .then(({ places }) => {
        if (!active) return;
        const first = places?.[0];
        if (first?.location) {
          map.panTo(first.location);
          map.setZoom(11);
        }
      })
      .catch((err: unknown) => {
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent("gmp-quota-exceeded"));
        }
      });

    return () => {
      active = false;
    };
  }, [map, placesLib, origin, destination]);

  useEffect(() => {
    if (!routesLib || !map) return;

    const cleanOrigin = origin.trim();
    const cleanDest = destination.trim();

    // Clear previous polylines & waypoint markers
    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];
    markersRef.current.forEach((m) => {
      m.map = null;
    });
    markersRef.current = [];

    if (cleanOrigin.length < 3 || cleanDest.length < 3) {
      onRouteMetrics(null);
      onStatusChange(false, null);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      onStatusChange(true, null);

      const RouteClass = (
        routesLib as unknown as {
          Route?: {
            computeRoutes: (req: Record<string, unknown>) => Promise<{
              routes?: Array<{
                distanceMeters?: number;
                durationMillis?: number;
                viewport?: google.maps.LatLngBounds;
                createPolylines?: () => google.maps.Polyline[];
                createWaypointAdvancedMarkers?: (
                  mapInstance: google.maps.Map
                ) => Promise<google.maps.marker.AdvancedMarkerElement[]>;
              }>;
            }>;
          };
        }
      ).Route;

      if (!RouteClass || typeof RouteClass.computeRoutes !== "function") {
        onStatusChange(false, null);
        return;
      }

      const request = {
        origin: cleanOrigin,
        destination: cleanDest,
        travelMode: "DRIVING",
        fields: ["path", "distanceMeters", "durationMillis", "viewport", "legs"],
      };

      RouteClass.computeRoutes(request)
        .then(async ({ routes }) => {
          if (cancelled) return;
          const primaryRoute = routes?.[0];
          if (!primaryRoute) {
            onRouteMetrics(null);
            onStatusChange(
              false,
              "Enter specific pickup and destination locations in Delhi NCR or outstation cities to preview the driving route."
            );
            return;
          }

          if (typeof primaryRoute.createPolylines === "function") {
            const newPolylines = primaryRoute.createPolylines();
            newPolylines.forEach((polyline) => {
              polyline.setOptions({
                strokeColor: "#053B70",
                strokeWeight: 5,
                strokeOpacity: 0.9,
              });
              polyline.setMap(map);
            });
            polylinesRef.current = newPolylines;
          }

          if (
            typeof primaryRoute.createWaypointAdvancedMarkers === "function"
          ) {
            try {
              const waypointMarkers =
                await primaryRoute.createWaypointAdvancedMarkers(map);
              if (!cancelled && Array.isArray(waypointMarkers)) {
                markersRef.current = waypointMarkers;
              }
            } catch {
              // Ignore optional waypoint marker creation failure
            }
          }

          if (primaryRoute.viewport) {
            map.fitBounds(primaryRoute.viewport);
          }

          const distanceMeters = primaryRoute.distanceMeters ?? 0;
          const durationMillis = primaryRoute.durationMillis ?? 0;
          onRouteMetrics({
            distanceKm: (distanceMeters / 1000).toFixed(1),
            durationText: formatDurationMillis(durationMillis),
          });
          onStatusChange(false, null);
        })
        .catch((err: unknown) => {
          if (cancelled) return;
          if (isQuotaError(err)) {
            window.dispatchEvent(new CustomEvent("gmp-quota-exceeded"));
          }
          onRouteMetrics(null);
          onStatusChange(
            false,
            "Unable to preview driving route for the entered locations. You can still submit your booking enquiry normally."
          );
        });
    }, 650);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
      markersRef.current.forEach((m) => {
        m.map = null;
      });
      markersRef.current = [];
    };
  }, [routesLib, map, origin, destination, onRouteMetrics, onStatusChange]);

  return null;
};

export const JourneyRouteMap: React.FC<JourneyRouteMapProps> = ({
  pickupLocation,
  destination,
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const [metrics, setMetrics] = useState<RouteMetrics | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = React.useCallback(
    (isLoading: boolean) => {
      setLoading(isLoading);
    },
    []
  );

  if (!apiKey) {
    return null;
  }

  return (
    <div
      className="rounded-xl bg-white border border-[#053B70]/15 overflow-hidden shadow-xs"
      data-testid="journey-route-map-card"
    >
      <div className="bg-[#05284D] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#053B70]">
        <div className="flex items-center gap-2">
          <RouteIcon className="w-4 h-4 text-[#FFB319]" />
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
            Google Maps Journey Route Preview
          </h3>
        </div>
        {loading && (
          <span className="text-xs text-[#FFB319] font-medium">
            Calculating route...
          </span>
        )}
      </div>

      {/* Route Distance & Estimated Travel Time Bar */}
      {metrics && (
        <div className="bg-[#F5F7FA] px-5 py-3 border-b border-[#053B70]/10 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#053B70]" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#172B45]/70">
                Approx. Driving Distance
              </p>
              <p className="text-sm font-mono font-bold text-[#05284D] tabular-nums">
                {metrics.distanceKm} km
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#053B70]" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#172B45]/70">
                Estimated Travel Time
              </p>
              <p className="text-sm font-mono font-bold text-[#05284D] tabular-nums">
                {metrics.durationText}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-64 sm:h-72 relative">
        <GoogleMap
          mapId="DEMO_MAP_ID"
          defaultCenter={{ lat: 0, lng: 0 }}
          defaultZoom={2}
          gestureHandling="cooperative"
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
          className="w-full h-full"
        >
          <RoutePolylineLayer
            origin={pickupLocation}
            destination={destination}
            onRouteMetrics={setMetrics}
            onStatusChange={handleStatusChange}
          />
        </GoogleMap>
      </div>
    </div>
  );
};
