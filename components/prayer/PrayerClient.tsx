"use client";

import { useState, useEffect } from "react";
import { useLocation } from "@/hooks/useLocation";
import { getPrayerTimes, getPrayerTimesByCity } from "@/lib/prayer";
import { buildPrayers } from "@/lib/prayerUtils";
import { PrayerTimesData, Prayer } from "@/types/prayer";

import LocationBar from "./LocationBar";
import HijriDate from "./HijriDate";
import PrayerCountdown from "./PrayerCountdown";
import PrayerTimes from "./PrayerTimes";

export default function PrayerClient() {
  const { location, status, error, detect, setManual, clear } = useLocation();

  const [data, setData] = useState<PrayerTimesData | null>(null);
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    setLoading(true);
    setFetchError(null);

    const promise =
      status === "manual" || (location.lat === 0 && location.lng === 0)
        ? getPrayerTimesByCity(location.city, location.country)
        : getPrayerTimes(location.lat, location.lng);

    promise
      .then((d) => {
        setData(d);
        const now = new Date();
        const nowMinutes = now.getHours() * 60 + now.getMinutes();
        setPrayers(buildPrayers(d.timings, nowMinutes));
      })
      .catch((e) => {
        clear();
        setFetchError(e.message);
      })
      .finally(() => setLoading(false));
  }, [location, status]);

  const nextPrayer = prayers.find((p) => p.isNext) ?? null;

  if (status === "detecting") {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-4"
        dir="rtl"
      >
        <div className="w-10 h-10 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-blue-300 text-sm">جارٍ تحديد موقعك...</p>
      </div>
    );
  }

  if (status === "denied" || status === "error" || status === "idle") {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4"
        dir="rtl"
      >
        <div className="w-full max-w-sm bg-blue-900/60 border border-blue-700/40 rounded-2xl p-6">
          <h2 className="text-amber-300 text-xl font-bold mb-1 text-center">
            أدخل مدينتك
          </h2>
          {error && (
            <p className="text-blue-400/70 text-xs text-center mb-4">{error}</p>
          )}
          <ManualForm onSubmit={setManual} onRetry={detect} />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-4"
        dir="rtl"
      >
        <div className="w-10 h-10 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-blue-300 text-sm">جارٍ تحميل مواقيت الصلاة...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4"
        dir="rtl"
      >
        <div className="w-full max-w-sm bg-blue-900/60 border border-red-500/30 rounded-2xl p-6">
          <h2 className="text-amber-300 text-xl font-bold mb-1 text-center">
            تعذّر تحميل المواقيت
          </h2>
          <p className="text-red-400/80 text-xs text-center mb-1">
            {fetchError}
          </p>
          <p className="text-blue-400/60 text-xs text-center mb-4">
            تأكد من كتابة اسم المدينة بالإنجليزية
          </p>
          <ManualForm onSubmit={setManual} onRetry={detect} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="container md:max-w-[80%] mx-auto px-4 py-10 space-y-6"
      dir="rtl"
    >
      {location && (
        <LocationBar
          city={location.city}
          country={location.country}
          onDetect={detect}
          onClear={clear}
        />
      )}

      {data && <HijriDate date={data.date} />}

      {nextPrayer && <PrayerCountdown prayer={nextPrayer} />}

      {prayers.length > 0 && <PrayerTimes prayers={prayers} />}
    </div>
  );
}

function ManualForm({
  onSubmit,
  onRetry,
}: {
  onSubmit: (city: string, country: string) => void;
  onRetry: () => void;
}) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = () => {
    if (city.trim() && country.trim()) {
      onSubmit(city.trim(), country.trim());
    }
  };

  return (
    <div className="space-y-3 mt-4">
      <p className="text-blue-400/60 text-xs text-center">
        ⚠️ يجب كتابة الاسم بالإنجليزية فقط
      </p>
      <input
        type="text"
        placeholder="City (e.g. Cairo)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="
          w-full px-4 py-3 rounded-xl text-sm
          bg-blue-950/60 border border-blue-700/40
          text-blue-100 placeholder-blue-400/50
          focus:outline-none focus:border-amber-400/50
        "
      />
      <input
        type="text"
        placeholder="Country (e.g. Egypt)"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className="
          w-full px-4 py-3 rounded-xl text-sm
          bg-blue-950/60 border border-blue-700/40
          text-blue-100 placeholder-blue-400/50
          focus:outline-none focus:border-amber-400/50
        "
      />
      <button
        onClick={handleSubmit}
        disabled={!city.trim() || !country.trim()}
        className="
          w-full py-3 rounded-xl text-sm font-bold
          bg-amber-400 text-blue-950
          hover:bg-amber-300 disabled:opacity-40
          transition-colors
        "
      >
        عرض مواقيت الصلاة
      </button>
      <button
        onClick={onRetry}
        className="w-full text-center text-blue-400 text-xs hover:text-amber-300 transition-colors"
      >
        أو حاول تحديد الموقع تلقائياً
      </button>
    </div>
  );
}
