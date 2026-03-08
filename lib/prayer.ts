import {
  AladhanResponse,
  AladhanCalendarResponse,
  PrayerTimesData,
  CalculationMethod,
} from "@/types/prayer";

const BASE = "https://api.aladhan.com/v1";

function todayPath(): string {
  const d = new Date();
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
}

function buildParams(
  lat: number,
  lng: number,
  method: CalculationMethod = 5,
): URLSearchParams {
  return new URLSearchParams({
    latitude: String(lat),
    longitude: String(lng),
    method: String(method),
  });
}

export async function getPrayerTimes(
  lat: number,
  lng: number,
  method: CalculationMethod = 5,
): Promise<PrayerTimesData> {
  const params = buildParams(lat, lng, method);
  const res = await fetch(`${BASE}/timings/${todayPath()}?${params}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`فشل تحميل مواقيت الصلاة: ${res.status}`);

  const json: AladhanResponse = await res.json();
  if (json.code !== 200) throw new Error(json.status);

  return json.data;
}

export async function getPrayerTimesByCity(
  city: string,
  country: string,
  method: CalculationMethod = 5,
): Promise<PrayerTimesData> {
  const params = new URLSearchParams({
    city,
    country,
    method: String(method),
  });

  const res = await fetch(`${BASE}/timingsByCity/${todayPath()}?${params}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`فشل تحميل مواقيت الصلاة: ${res.status}`);

  const json: AladhanResponse = await res.json();
  if (json.code !== 200) throw new Error(json.status);

  return json.data;
}

export async function getMonthlyCalendar(
  lat: number,
  lng: number,
  month: number,
  year: number,
  method: CalculationMethod = 5,
): Promise<PrayerTimesData[]> {
  const params = buildParams(lat, lng, method);
  params.set("month", String(month));
  params.set("year", String(year));

  const res = await fetch(`${BASE}/calendar/${year}/${month}?${params}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`فشل تحميل تقويم الشهر: ${res.status}`);

  const json: AladhanCalendarResponse = await res.json();
  if (json.code !== 200) throw new Error(json.status);

  return json.data;
}

export async function getMonthlyCalendarByCity(
  city: string,
  country: string,
  month: number,
  year: number,
  method: CalculationMethod = 5,
): Promise<PrayerTimesData[]> {
  const params = new URLSearchParams({
    city,
    country,
    method: String(method),
  });

  const res = await fetch(`${BASE}/calendarByCity/${year}/${month}?${params}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`فشل تحميل تقويم الشهر: ${res.status}`);

  const json: AladhanCalendarResponse = await res.json();
  if (json.code !== 200) throw new Error(json.status);

  return json.data;
}
