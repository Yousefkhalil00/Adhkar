import { PrayerTimesData } from "@/types/prayer";
import { HIJRI_MONTHS_AR } from "@/lib/prayerUtils";

interface Props {
  date: PrayerTimesData["date"];
}

export default function HijriDate({ date }: Props) {
  const { hijri } = date;
  const hijriMonthAr = HIJRI_MONTHS_AR[hijri.month.number - 1];

  return (
    <div className="text-center py-6">
      <p className="text-amber-300 text-3xl font-bold tracking-wide">
        {hijri.day} {hijriMonthAr} {hijri.year}
      </p>

      <div className="flex items-center justify-center gap-3 my-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-700/50" />
        <span className="text-blue-600 text-xs">◆</span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-700/50" />
      </div>

      <p className="text-blue-400/70 text-sm">
        {hijri.weekday.ar} — {date.readable}
      </p>

      {hijri.holidays.length > 0 && (
        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
          <p className="text-amber-300 text-xs">{hijri.holidays.join(" • ")}</p>
        </div>
      )}
    </div>
  );
}
