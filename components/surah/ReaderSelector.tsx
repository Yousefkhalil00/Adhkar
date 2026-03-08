"use client";

import { useState, useRef, useEffect } from "react";
import { Reciter } from "@/types/quran";
import { RECITERS } from "@/lib/quran";

interface Props {
  selected: Reciter;
  onChange: (reciter: Reciter) => void;
  loading?: boolean;
}

export default function ReaderSelector({ selected, onChange, loading }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" dir="rtl">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={loading}
        className="
          flex items-center gap-3 px-4 py-3 rounded-xl
          bg-blue-900/60 border border-blue-700/40
          hover:border-amber-400/40 transition-all
          text-sm text-right w-full sm:w-auto
          disabled:opacity-50
        "
      >
        {/* Mic icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4 text-amber-400 flex-shrink-0"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>

        <div className="flex-1 text-right">
          <p className="text-blue-400/60 text-xs leading-none mb-0.5">القارئ</p>
          <p className="text-amber-300 font-medium">{selected.name}</p>
        </div>

        {/* Loading spinner or chevron */}
        {loading ? (
          <div className="w-4 h-4 border border-amber-400/30 border-t-amber-400 rounded-full animate-spin flex-shrink-0" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`w-4 h-4 text-blue-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
          absolute top-full right-0 mt-2 z-50
          w-64 rounded-2xl overflow-hidden
          bg-blue-900 border border-blue-700/50
          shadow-2xl shadow-black/40 

        "
        >
          <p className="text-blue-500/60 text-xs px-4 py-2 border-b border-blue-800/50">
            اختر القارئ
          </p>
          <ul>
            {RECITERS.map((reciter) => (
              <li key={reciter.id}>
                <button
                  onClick={() => {
                    onChange(reciter);
                    setOpen(false);
                  }}
                  className={`
                    cursor-pointer hover:text-amber-200
                    w-full text-right px-4 py-3 text-sm
                    flex items-center justify-between gap-3
                    hover:bg-blue-800/50 transition-colors
                    ${selected.id === reciter.id ? "text-amber-300" : "text-blue-200"}
                  `}
                >
                  <span>{reciter.name}</span>
                  {selected.id === reciter.id && (
                    <span className="text-amber-400 text-xs">✓</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
