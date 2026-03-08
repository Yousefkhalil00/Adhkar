// ─── Surah list ───────────────────────────────────────────────────────────

export interface Surah {
  number: number;
  name: string; // Arabic: "سُورَةُ الفَاتِحَةِ"
  englishName: string; // "Al-Faatiha"
  englishNameTranslation: string; // "The Opening"
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

// ─── Ayah ─────────────────────────────────────────────────────────────────

export interface Ayah {
  number: number; // global ayah number (1–6236)
  numberInSurah: number; // ayah number within surah
  text: string; // Arabic text
  juz: number;
  page: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
}

export interface AyahWithAudio extends Ayah {
  audio: string; // URL to mp3
  audioSecondary: string[];
}

// ─── Surah with ayahs ─────────────────────────────────────────────────────

export interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: "Meccan" | "Medinan";
  numberOfAyahs: number;
  ayahs: Ayah[];
}

export interface SurahDetailWithAudio {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: "Meccan" | "Medinan";
  numberOfAyahs: number;
  ayahs: AyahWithAudio[];
}

// ─── Tafsir ───────────────────────────────────────────────────────────────

export interface AyahTafsir {
  number: number;
  numberInSurah: number;
  text: string; // tafsir text
}

export interface SurahTafsir {
  number: number;
  name: string;
  englishName: string;
  ayahs: AyahTafsir[];
}

// ─── Reciter ──────────────────────────────────────────────────────────────

export interface Reciter {
  id: string;
  cdnId: string;
  hasCDN: boolean;
  name: string;
  nameEn: string;
  style?: string;
}

// ─── API response wrappers ────────────────────────────────────────────────

export interface AlQuranListResponse {
  code: number;
  status: string;
  data: Surah[];
}

export interface AlQuranSurahResponse {
  code: number;
  status: string;
  data: SurahDetail | SurahDetailWithAudio;
}

export interface AlQuranTafsirResponse {
  code: number;
  status: string;
  data: SurahTafsir;
}
