import { useState, useEffect, useCallback } from "react";
import { FLEET_VEHICLES, FleetVehicle, VehicleCategory } from "../data/vehiclePricing";

const STORAGE_KEY = "ds_tour_travels_vehicle_photos_v1";
const PHOTO_UPDATE_EVENT = "ds-vehicle-photos-updated";

export type VehiclePhotoMap = Record<string, string>;

export function getStoredVehiclePhotos(): VehiclePhotoMap {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveVehiclePhoto(vehicleId: string, dataUrl: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredVehiclePhotos();
    const updated: VehiclePhotoMap = {
      ...current,
      [vehicleId]: dataUrl,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(PHOTO_UPDATE_EVENT));
  } catch {
    // Ignore storage quota errors in restricted frames
  }
}

export function removeVehiclePhoto(vehicleId: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getStoredVehiclePhotos();
    delete current[vehicleId];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(PHOTO_UPDATE_EVENT));
  } catch {
    // Ignore storage errors
  }
}

export function resolveVehicleImageUrl(
  vehicle: FleetVehicle,
  customPhotos?: VehiclePhotoMap
): string | undefined {
  return vehicle.imageUrl || customPhotos?.[vehicle.id];
}

export function getVehiclesByCategory(category: VehicleCategory): FleetVehicle[] {
  return FLEET_VEHICLES.filter((v) => v.category === category);
}

export function useVehiclePhotos() {
  const [customPhotos, setCustomPhotos] = useState<VehiclePhotoMap>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore storage errors
      }
    }
  }, []);

  const uploadPhotoForVehicle = useCallback((vehicleId: string, file: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        saveVehiclePhoto(vehicleId, reader.result);
        setCustomPhotos(getStoredVehiclePhotos());
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const clearPhotoForVehicle = useCallback((vehicleId: string) => {
    removeVehiclePhoto(vehicleId);
    setCustomPhotos(getStoredVehiclePhotos());
  }, []);

  return {
    customPhotos,
    uploadPhotoForVehicle,
    clearPhotoForVehicle,
  };
}
