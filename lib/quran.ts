import {
  Surah,
  SurahDetail,
  SurahDetailWithAudio,
  SurahTafsir,
  Reciter,
  AlQuranListResponse,
  AlQuranSurahResponse,
  AlQuranTafsirResponse,
} from "@/types/quran";

const BASE = "https://api.alquran.cloud/v1";
const CDN = "https://cdn.islamic.network/quran/audio-surah";

// ─── Available reciters ────────────────────────────────────────────────────
// id      = AlQuran API edition identifier
// cdnId   = CDN folder name (may differ from API id)

export const RECITERS: Reciter[] = [
  {
    id: "ar.alafasy",
    cdnId: "ar.alafasy",
    hasCDN: true,
    name: "مشاري العفاسي",
    nameEn: "Mishary Alafasy",
    style: "Murattal",
  },
];

export const DEFAULT_RECITER = RECITERS[0];

// ─── Full surah audio URL — tries 128 first, CDN has most reciters at 128 ──
export function getFullSurahAudioUrl(
  surahNumber: number,
  reciter: Reciter = DEFAULT_RECITER,
  bitrate: 128 | 64 | 48 = 128,
): string {
  return `${CDN}/${bitrate}/${reciter.cdnId}/${surahNumber}.mp3`;
}

// ─── Fetch all surahs ─────────────────────────────────────────────────────

export async function getAllSurahs(): Promise<Surah[]> {
  const res = await fetch(`${BASE}/surah`, {
    next: { revalidate: 86400 }, // stable data — cache for 24h
  });

  if (!res.ok) throw new Error(`فشل تحميل قائمة السور: ${res.status}`);

  const json: AlQuranListResponse = await res.json();
  if (json.code !== 200) throw new Error(json.status);

  return json.data;
}

// ─── Fetch single surah (Arabic text only) ────────────────────────────────

export async function getSurah(number: number): Promise<SurahDetail> {
  const res = await fetch(`${BASE}/surah/${number}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`فشل تحميل السورة: ${res.status}`);

  const json: AlQuranSurahResponse = await res.json();
  if (json.code !== 200) throw new Error(json.status);

  return json.data as SurahDetail;
}

// ─── Fetch surah with audio for a specific reciter ────────────────────────

export async function getSurahWithAudio(
  number: number,
  reciterId: string = DEFAULT_RECITER.id,
): Promise<SurahDetailWithAudio> {
  const res = await fetch(`${BASE}/surah/${number}/${reciterId}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`فشل تحميل تلاوة السورة: ${res.status}`);

  const json: AlQuranSurahResponse = await res.json();
  if (json.code !== 200) throw new Error(json.status);

  return json.data as SurahDetailWithAudio;
}

// ─── Fetch tafsir for a surah ─────────────────────────────────────────────
// Using Ibn Kathir tafsir in Arabic (ar.muyassar = simplified tafsir)

export async function getSurahTafsir(
  number: number,
  edition: string = "ar.muyassar",
): Promise<SurahTafsir> {
  const res = await fetch(`${BASE}/surah/${number}/${edition}`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`فشل تحميل التفسير: ${res.status}`);

  const json: AlQuranTafsirResponse = await res.json();
  if (json.code !== 200) throw new Error(json.status);

  return json.data;
}
