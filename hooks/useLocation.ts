"use client";

import { useState, useEffect, useCallback } from "react";
import { Location } from "@/types/prayer";

// ─── Types ─────────────────────────────────────────────────────────────────

type LocationStatus =
  | "idle"
  | "detecting" // GPS in progress
  | "success" // location resolved
  | "denied" // GPS permission denied
  | "error" // GPS failed for other reason
  | "manual"; // user typed city manually

interface UseLocationReturn {
  location: Location | null;
  status: LocationStatus;
  error: string | null;
  detect: () => void; // trigger GPS detection
  setManual: (city: string, country: string) => void; // set location manually
  clear: () => void; // clear saved location
}

// ─── Constants ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "prayer_location";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

// ─── Reverse geocode lat/lng → city + country (free, no key) ──────────────

async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<{ city: string; country: string }> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "ar" } },
    );
    const data = await res.json();
    const address = data.address ?? {};
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.county ||
      "غير معروف";
    const country = address.country ?? "غير معروف";
    return { city, country };
  } catch {
    return { city: "غير معروف", country: "غير معروف" };
  }
}

// ─── Load / save from localStorage ────────────────────────────────────────

interface CachedLocation {
  location: Location;
  savedAt: number;
}

function loadCached(): Location | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: CachedLocation = JSON.parse(raw);
    const age = Date.now() - parsed.savedAt;
    if (age > CACHE_TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed.location;
  } catch {
    return null;
  }
}

function saveCache(location: Location) {
  try {
    const payload: CachedLocation = { location, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage might be unavailable (private mode etc.)
  }
}

function clearCache() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    //
  }
}

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<Location | null>(null);
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  // On mount: check localStorage first
  useEffect(() => {
    const cached = loadCached();
    if (cached) {
      setLocation(cached);
      setStatus("success");
    } else {
      // Auto-trigger GPS detection on first visit
      detect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GPS detection
  const detect = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("denied");
      setError("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    setStatus("detecting");
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const { city, country } = await reverseGeocode(lat, lng);
        const resolved: Location = { lat, lng, city, country };
        setLocation(resolved);
        setStatus("success");
        saveCache(resolved);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus("denied");
          setError("تم رفض الوصول إلى الموقع. يمكنك إدخال مدينتك يدوياً.");
        } else {
          setStatus("error");
          setError("تعذّر تحديد موقعك. يمكنك إدخال مدينتك يدوياً.");
        }
      },
      { timeout: 8000, maximumAge: 1000 * 60 * 30 },
    );
  }, []);

  // Manual city input
  const setManual = useCallback((city: string, country: string) => {
    // We don't have lat/lng here — use 0,0 as placeholder
    // The fetch lib will use timingsByCity endpoint instead
    const manual: Location = { lat: 0, lng: 0, city, country };
    setLocation(manual);
    setStatus("manual");
    setError(null);
    saveCache(manual);
  }, []);

  // Clear saved location
  const clear = useCallback(() => {
    clearCache();
    setLocation(null);
    setStatus("idle");
    setError(null);
  }, []);

  return { location, status, error, detect, setManual, clear };
}
