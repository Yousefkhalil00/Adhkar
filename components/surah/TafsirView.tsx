"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SurahDetail, SurahTafsir } from "@/types/quran";

interface Props {
  surah: SurahDetail;
  tafsir: SurahTafsir;
  scrollToAyah: number | null;
}

export default function TafsirView({ surah, tafsir, scrollToAyah }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const ayahRefs = useRef<Record<number, HTMLLIElement | null>>({});

  // Auto-expand and scroll to the ayah if coming from AyahCard button
  useEffect(() => {
    if (!scrollToAyah) return;

    // Expand the target ayah
    setExpanded((prev) => ({ ...prev, [scrollToAyah]: true }));

    // Scroll after a short delay to let the DOM render
    const timer = setTimeout(() => {
      ayahRefs.current[scrollToAyah]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [scrollToAyah]);

  const toggleAyah = (n: number) => {
    setExpanded((prev) => ({ ...prev, [n]: !prev[n] }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    surah.ayahs.forEach((a) => (all[a.numberInSurah] = true));
    setExpanded(all);
  };

  const collapseAll = () => setExpanded({});

  const REVELATION_AR: Record<string, string> = {
    Meccan: "مكية",
    Medinan: "مدنية",
  };

  return (
    <div className="max-w-[80%] mx-auto px-4 py-8" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push(`/surah/${surah.number}`)}
          className="flex items-center gap-1.5 text-blue-300 hover:text-amber-300 transition-colors text-sm"
        >
          <span>→</span>
          <span>العودة للسورة</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs text-blue-400 hover:text-amber-300 transition-colors px-2 py-1 rounded-lg border border-blue-800/40 hover:border-amber-400/30"
          >
            توسيع الكل
          </button>
          <button
            onClick={collapseAll}
            className="text-xs text-blue-400 hover:text-amber-300 transition-colors px-2 py-1 rounded-lg border border-blue-800/40 hover:border-amber-400/30"
          >
            طي الكل
          </button>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-blue-500/50 text-xs mb-1">تفسير</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-amber-400/30 text-3xl">﴿</span>
          <h1 className="text-amber-300 text-4xl font-bold">{surah.name}</h1>
          <span className="text-amber-400/30 text-3xl">﴾</span>
        </div>
        <p className="text-blue-400/50 text-sm mt-1">
          {surah.number} • {REVELATION_AR[surah.revelationType]} •{" "}
          {surah.numberOfAyahs} آية
        </p>

        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
          <p className="text-amber-400/70 text-xs">التفسير الميسر</p>
        </div>
      </div>

      <ul className="space-y-3">
        {surah.ayahs.map((ayah) => {
          const tafsirAyah = tafsir.ayahs.find(
            (t) => t.numberInSurah === ayah.numberInSurah,
          );
          const isExpanded = !!expanded[ayah.numberInSurah];
          const isHighlighted = scrollToAyah === ayah.numberInSurah;

          return (
            <li
              key={ayah.number}
              ref={(el) => {
                ayahRefs.current[ayah.numberInSurah] = el;
              }}
            >
              <div
                className={`
                  rounded-2xl border overflow-hidden transition-all duration-300
                  ${
                    isHighlighted
                      ? "border-amber-400/60 shadow-lg shadow-amber-400/10"
                      : "border-blue-800/40"
                  }
                `}
              >
                {/* ── Ayah header (always visible, clickable) ────── */}
                <button
                  onClick={() => toggleAyah(ayah.numberInSurah)}
                  className="
                    w-full flex items-start gap-4 p-4
                    bg-blue-900/40 hover:bg-blue-900/60
                    transition-colors text-right
                  "
                >
                  {/* Number badge */}
                  <div
                    className="
                    flex-shrink-0 w-8 h-8 rounded-full mt-1
                    bg-amber-400/10 border border-amber-400/20
                    flex items-center justify-center
                    text-amber-400 text-xs font-bold
                  "
                  >
                    {ayah.numberInSurah}
                  </div>

                  {/* Ayah text */}
                  <p
                    className="flex-1 text-blue-100 text-lg leading-loose text-right"
                    style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
                  >
                    {ayah.text}
                    <span className="text-amber-400/50 text-base mx-1">
                      ﴿{ayah.numberInSurah}﴾
                    </span>
                  </p>

                  {/* Chevron */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`
                      w-4 h-4 text-blue-500 flex-shrink-0 mt-2
                      transition-transform duration-300
                      ${isExpanded ? "rotate-180" : ""}
                    `}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* ── Tafsir panel (collapsible) ─────────────────── */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                    opacity: isExpanded ? 1 : 0,
                    transition:
                      "grid-template-rows 0.35s ease, opacity 0.3s ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div className="px-5 py-4 bg-blue-950/60 border-t border-blue-800/40">
                      {/* Label */}
                      <p className="text-amber-400/60 text-xs mb-3 flex items-center gap-1.5">
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
                      </p>

                      {/* Tafsir text */}
                      {tafsirAyah ? (
                        <p className="text-blue-200/90 text-sm leading-relaxed text-right">
                          {tafsirAyah.text}
                        </p>
                      ) : (
                        <p className="text-blue-500/50 text-sm">
                          لا يتوفر تفسير لهذه الآية
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
