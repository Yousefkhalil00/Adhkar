export interface PrayerTimesRaw {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface HijriDate {
  date: string;
  format: string;
  day: string;
  weekday: { en: string; ar: string };
  month: { number: number; en: string; ar: string };
  year: string;
  designation: { abbreviated: string; expanded: string };
  holidays: string[];
}

export interface GregorianDate {
  date: string;
  format: string;
  day: string;
  weekday: { en: string };
  month: { number: number; en: string };
  year: string;
}

export interface PrayerMeta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: {
    id: number;
    name: string;
  };
}

export interface PrayerTimesData {
  timings: PrayerTimesRaw;
  date: {
    readable: string;
    timestamp: string;
    hijri: HijriDate;
    gregorian: GregorianDate;
  };
  meta: PrayerMeta;
}

export interface AladhanResponse {
  code: number;
  status: string;
  data: PrayerTimesData;
}

export interface AladhanCalendarResponse {
  code: number;
  status: string;
  data: PrayerTimesData[];
}

export type PrayerName =
  | "الفجر"
  | "الشروق"
  | "الظهر"
  | "العصر"
  | "المغرب"
  | "العشاء";

export interface Prayer {
  name: PrayerName;
  nameEn: string;
  time: string;
  timeDisplay: string;
  isNext: boolean;
  isPast: boolean;
}

export interface Location {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export type CalculationMethod =
  | 1 // University of Islamic Sciences, Karachi
  | 2 // Islamic Society of North America
  | 3 // Muslim World League
  | 4 // Umm Al-Qura University, Makkah
  | 5 // Egyptian General Authority of Survey
  | 11 // Majlis Ugama Islam Singapura
  | 12 // Union Organization Islamic de France
  | 13 // Diyanet İşleri Başkanlığı, Turkey
  | 14 // Spiritual Administration of Muslims of Russia
  | 15; // Gulf Region
