"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SurahDetailWithAudio } from "@/types/quran";
import { DEFAULT_RECITER, getFullSurahAudioUrl } from "@/lib/quran";
import AudioPlayer from "@/components/AudioPlayer";

interface Props {
  surah: SurahDetailWithAudio;
}

export default function SurahDetail({ surah: initialSurah }: Props) {
  const router = useRouter();
  const surah = initialSurah;

  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);

  const fullSurahSrc = getFullSurahAudioUrl(surah.number, DEFAULT_RECITER);

  const handleAyahPlay = (ayahNumber: number) => {
    setPlayingAyah((prev) => (prev === ayahNumber ? null : ayahNumber));
    setShowFullPlayer(false);
  };

  const REVELATION_AR: Record<string, string> = {
    Meccan: "مكية",
    Medinan: "مدنية",
  };

  const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

  return (
    <div className=" container md:max-w-[80%] mx-auto px-4 py-8" dir="rtl">
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        {/* Right side: back + prev */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/surah")}
            className="flex items-center gap-1.5 text-blue-300 hover:text-amber-300 transition-colors text-sm"
          >
            <span>→</span>
            <span>السور</span>
          </button>
        </div>

        {/* Center: surah info */}
        <div className="text-center">
          <p className="text-blue-500/50 text-xs">
            {surah.number} • {REVELATION_AR[surah.revelationType]} •{" "}
            {surah.numberOfAyahs} آية
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tafsir full page button */}
          <button
            onClick={() => router.push(`/surah/${surah.number}/tafsir`)}
            className="
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs
              border border-blue-700/40 text-blue-400
              hover:border-amber-400/30 hover:text-amber-300
              transition-all
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-3 h-3"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            التفسير
          </button>
        </div>
      </div>

      {/* ── Surah title ─────────────────────────────────────────────── */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-between">
          {surah.number < 114 && (
            <button
              onClick={() => router.push(`/surah/${surah.number + 1}`)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border border-blue-700/40 text-blue-400 hover:border-amber-400/30 hover:text-amber-300 transition-all"
              title="السورة التالية"
            >
              التالية
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3 h-3"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          <div className="flex items-center justify-center gap-3">
            <span className="text-amber-400/30 text-3xl">﴿</span>
            <h1 className="text-amber-300 text-4xl font-bold font-[family-name:var(--font-amiri)]">
              {surah.name}
            </h1>
            <span className="text-amber-400/30 text-3xl">﴾</span>
          </div>
          {surah.number > 1 && (
            <button
              onClick={() => router.push(`/surah/${surah.number - 1}`)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border border-blue-700/40 text-blue-400 hover:border-amber-400/30 hover:text-amber-300 transition-all"
              title="السورة السابقة"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3 h-3"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              السابقة
            </button>
          )}
        </div>
        <p className="text-blue-400/50 text-sm mt-5">
          {surah.englishName} — {surah.englishNameTranslation}
        </p>
      </div>

      {/* ── Full surah button ────────────────────────────────────────── */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowFullPlayer((v) => !v)}
          className="
            flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
            bg-amber-400/10 border border-amber-400/30 text-amber-300
            hover:bg-amber-400/20 transition-all
          "
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          الاستماع للسورة كاملة
        </button>
      </div>

      {showFullPlayer && (
        <div className="mb-6">
          <AudioPlayer
            src={fullSurahSrc}
            title={surah.name}
            subtitle={DEFAULT_RECITER.name}
          />
        </div>
      )}

      {surah.number !== 1 && surah.number !== 9 && (
        <p className="text-center text-amber-300/80 text-2xl mb-8 leading-loose font-[family-name:var(--font-amiri)]">
          {BISMILLAH}
        </p>
      )}

      <div className="p-6 rounded-2xl border border-blue-800/40 bg-blue-900/30">
        <p className="text-right leading-[2.8] text-xl text-blue-100 font-[family-name:var(--font-amiri)]">
          {surah.ayahs.map((ayah) => {
            const displayText =
              ayah.numberInSurah === 1 && ayah.text.startsWith("بِسْمِ")
                ? ayah.text.slice(BISMILLAH.length).trim()
                : ayah.text;

            return (
              <span key={ayah.number}>
                {displayText}
                <span
                  onClick={() => handleAyahPlay(ayah.numberInSurah)}
                  title={`استمع للآية ${ayah.numberInSurah}`}
                  className={`
                    mx-1 cursor-pointer transition-all duration-200
                    ${
                      playingAyah === ayah.numberInSurah
                        ? "text-amber-400"
                        : "text-amber-400/60 hover:text-amber-400"
                    }
                  `}
                >
                  {" "}
                  ﴿{ayah.numberInSurah}﴾{" "}
                </span>
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
