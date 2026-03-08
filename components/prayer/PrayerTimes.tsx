import { Prayer } from "@/types/prayer";

// Prayer icons map
const ICONS: Record<string, string> = {
  الفجر: "🌙",
  الشروق: "🌅",
  الظهر: "☀️",
  العصر: "🌤",
  المغرب: "🌇",
  العشاء: "🌃",
};

interface Props {
  prayers: Prayer[];
}

export default function PrayerTimes({ prayers }: Props) {
  return (
    <div className="space-y-3" dir="rtl">
      <h3 className="text-blue-400/60 text-xs text-right px-1">
        مواقيت الصلاة — اليوم
      </h3>

      <ul className="space-y-2">
        {prayers.map((prayer) => (
          <li
            key={prayer.nameEn}
            className={`
              flex items-center justify-between
              px-5 py-4 rounded-2xl border
              transition-all duration-200
              ${
                prayer.isNext
                  ? "border-amber-400/50 bg-amber-400/10 shadow-lg shadow-amber-400/5"
                  : prayer.isPast
                    ? "border-blue-800/30 bg-blue-900/20 opacity-50"
                    : "border-blue-700/30 bg-blue-900/40"
              }
            `}
          >
            {/* Right: icon + name */}
            <div className="flex items-center gap-3">
              <span className="text-xl">{ICONS[prayer.name] ?? "🕌"}</span>
              <div>
                <p
                  className={`font-bold text-base ${prayer.isNext ? "text-amber-300" : "text-blue-100"}`}
                >
                  {prayer.name}
                </p>
                <p className="text-blue-500/60 text-xs">{prayer.nameEn}</p>
              </div>
            </div>

            {/* Left: time + badge */}
            <div className="flex items-center gap-3">
              {prayer.isNext && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30">
                  التالية
                </span>
              )}
              {prayer.isPast && !prayer.isNext && (
                <span className="text-xs text-blue-600">✓</span>
              )}
              <p
                className={`text-base font-mono font-bold ${prayer.isNext ? "text-amber-300" : "text-blue-300"}`}
              >
                {prayer.timeDisplay}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
