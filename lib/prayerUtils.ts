import { Prayer, PrayerTimesRaw, PrayerName } from "@/types/prayer";

const PRAYER_MAP: {
  key: keyof PrayerTimesRaw;
  name: PrayerName;
  nameEn: string;
}[] = [
  { key: "Fajr", name: "الفجر", nameEn: "Fajr" },
  { key: "Sunrise", name: "الشروق", nameEn: "Sunrise" },
  { key: "Dhuhr", name: "الظهر", nameEn: "Dhuhr" },
  { key: "Asr", name: "العصر", nameEn: "Asr" },
  { key: "Maghrib", name: "المغرب", nameEn: "Maghrib" },
  { key: "Isha", name: "العشاء", nameEn: "Isha" },
];

export function parseTime(raw: string): string {
  return raw.split(" ")[0];
}

export function formatTimeAr(time: string): string {
  const [hStr, mStr] = time.split(":");
  const h = parseInt(hStr, 10);
  const m = mStr;
  const suffix = h < 12 ? "ص" : "م";
  const h12 = h % 12 || 12;
  return `${h12}:${m} ${suffix}`;
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function buildPrayers(
  timings: PrayerTimesRaw,
  nowMinutes: number,
): Prayer[] {
  const prayers: Prayer[] = PRAYER_MAP.map(({ key, name, nameEn }) => {
    const time = parseTime(timings[key]);
    return {
      name,
      nameEn,
      time,
      timeDisplay: formatTimeAr(time),
      isNext: false,
      isPast: timeToMinutes(time) < nowMinutes,
    };
  });

  const nextIndex = prayers.findIndex((p) => !p.isPast);
  if (nextIndex !== -1) prayers[nextIndex].isNext = true;

  return prayers;
}

export function getCountdown(nextTime: string, nowMinutes: number): string {
  let diff = timeToMinutes(nextTime) - nowMinutes;
  if (diff < 0) diff += 24 * 60;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h > 0) return `${h} س ${m} د`;
  return `${m} د`;
}

export const HIJRI_MONTHS_AR = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الثاني",
  "جمادى الأولى",
  "جمادى الثانية",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

export const GREGORIAN_MONTHS_AR = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
