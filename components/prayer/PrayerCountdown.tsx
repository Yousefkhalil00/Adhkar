"use client";

import { useState, useEffect } from "react";
import { Prayer } from "@/types/prayer";
import { getCountdown, timeToMinutes } from "@/lib/prayerUtils";

interface Props {
  prayer: Prayer;
}

export default function PrayerCountdown({ prayer }: Props) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      setCountdown(getCountdown(prayer.time, nowMinutes));
    };

    update();
    const interval = setInterval(update, 60000); // update every minute
    return () => clearInterval(interval);
  }, [prayer]);

  return (
    <div
      className="
      relative overflow-hidden
      rounded-2xl border border-amber-400/30
      bg-gradient-to-br from-blue-900/80 to-blue-950/80
      p-6 text-center
    "
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-amber-400/5 rounded-2xl pointer-events-none" />

      <p className="text-blue-400/70 text-sm mb-1">الصلاة القادمة</p>

      <h2 className="text-amber-300 text-4xl font-bold mb-1">{prayer.name}</h2>

      <p className="text-blue-300 text-lg mb-4">{prayer.timeDisplay}</p>

      {/* Countdown */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-400/10 border border-amber-400/20">
        {/* Clock icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4 text-amber-400"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-amber-300 font-bold text-lg tracking-wider">
          {countdown}
        </span>
      </div>

      <p className="text-blue-500/50 text-xs mt-3">متبقٍ على الصلاة</p>
    </div>
  );
}
