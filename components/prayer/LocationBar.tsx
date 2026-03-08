"use client";

interface Props {
  city: string;
  country: string;
  onDetect: () => void;
  onClear: () => void;
}

export default function LocationBar({
  city,
  country,
  onDetect,
  onClear,
}: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-blue-900/50 border border-blue-700/40">
      <div className="flex items-center gap-2 text-blue-200">
        {/* Pin icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-4 h-4 text-amber-400 flex-shrink-0"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
        <span className="text-sm font-medium">
          {city}، {country}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Re-detect GPS */}
        <button
          onClick={onDetect}
          title="تحديد الموقع تلقائياً"
          className="text-blue-400 hover:text-amber-300 transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        </button>

        {/* Change city */}
        <button
          onClick={onClear}
          className="text-blue-400 hover:text-amber-300 transition-colors text-xs"
        >
          تغيير
        </button>
      </div>
    </div>
  );
}
