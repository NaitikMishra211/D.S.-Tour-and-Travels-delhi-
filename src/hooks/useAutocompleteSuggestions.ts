// Source: Google Maps Platform Code Assist
import { useEffect, useRef, useState, useCallback } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

export interface UseAutocompleteSuggestionsReturn {
  suggestions: google.maps.places.AutocompleteSuggestion[];
  isLoading: boolean;
  resetSession: () => void;
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
 * Retrieves autocomplete suggestions using the modern Places API (New)
 * AutocompleteSuggestion.fetchAutocompleteSuggestions with session token bundling.
 * Doc: https://developers.google.com/maps/documentation/javascript/place-autocomplete-data?utm_campaign=gmp_mcp_codeassist_v1_aistudio
 */
export function useAutocompleteSuggestions(
  inputString: string,
  enabled = true
): UseAutocompleteSuggestionsReturn {
  const placesLib = useMapsLibrary("places");
  const sessionTokenRef =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompleteSuggestion[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!placesLib || !enabled) {
      setSuggestions([]);
      return;
    }

    const trimmed = inputString.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;
    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      setIsLoading(true);
      const request: google.maps.places.AutocompleteRequest = {
        input: trimmed,
        sessionToken: sessionTokenRef.current!,
        region: "in",
        language: "en",
      };

      AutocompleteSuggestion.fetchAutocompleteSuggestions(request)
        .then((res) => {
          if (cancelled) return;
          setSuggestions(res?.suggestions ?? []);
          setIsLoading(false);
        })
        .catch((err: unknown) => {
          if (cancelled) return;
          setIsLoading(false);
          setSuggestions([]);
          if (isQuotaError(err)) {
            window.dispatchEvent(new CustomEvent("gmp-quota-exceeded"));
          }
        });
    }, 220);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [placesLib, inputString, enabled]);

  const resetSession = useCallback(() => {
    sessionTokenRef.current = null;
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    isLoading,
    resetSession,
  };
}
