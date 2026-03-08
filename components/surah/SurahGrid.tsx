"use client";

import { useState } from "react";
import Link from "next/link";
import { Surah } from "@/types/quran";

interface Props {
  surahs: Surah[];
}

const REVELATION_LABEL: Record<string, string> = {
  Meccan: "مكية",
  Medinan: "مدنية",
};

function stripTashkeel(text: string): string {
  return text.replace(/[\u0610-\u061A\u064B-\u065F]/g, "");
}

export default function SurahGrid({ surahs }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "Meccan" | "Medinan">("all");

  const filtered = surahs.filter((s) => {
    const matchesSearch =
      stripTashkeel(s.name).includes(stripTashkeel(search)) ||
      s.englishName.toLowerCase().includes(search.toLowerCase()) ||
      String(s.number).includes(search);

    const matchesFilter = filter === "all" || s.revelationType === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-[80%] mx-auto" dir="rtl">
      {/* Search + filter row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن سورة..."
          className="
            flex-1 px-4 py-3 rounded-xl text-sm
            bg-blue-900/60 border border-blue-700/40
            text-blue-100 placeholder-blue-400/50
            focus:outline-none focus:border-amber-400/50
            transition-colors
          "
        />

        {/* Filter tabs */}
        <div className="flex gap-2">
          {(["all", "Meccan", "Medinan"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`
                px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${
                  filter === type
                    ? "bg-amber-400 text-blue-950"
                    : "bg-blue-900/60 border border-blue-700/40 text-blue-300 hover:border-amber-400/30"
                }
              `}
            >
              {type === "all" ? "الكل" : REVELATION_LABEL[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((surah) => (
          <Link
            key={surah.number}
            href={`/surah/${surah.number}`}
            className="
              group flex items-center gap-4 p-4 rounded-2xl
              bg-blue-900/50 border border-blue-700/40
              hover:border-amber-400/50 hover:bg-blue-900/80
              transition-all duration-200 
            "
          >
            {/* Number badge */}
            <div
              className="
              flex-shrink-0 w-10 h-10 rounded-xl
              bg-amber-400/10 border border-amber-400/20
              flex items-center justify-center
              text-amber-400 text-sm font-bold font-mono
            "
            >
              {surah.number}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 flex gap-1 justify-center flex-col">
              <p
                className="text-amber-300 font-bold text-base truncate"
                style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
              >
                {stripTashkeel(surah.name)}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-blue-400/60 text-xs">
                  {surah.numberOfAyahs} آية
                </span>
                <span className="text-blue-100 text-xs">•</span>
                <span
                  className={`
                  text-xs px-2 py-1 rounded-lg
                  bg-amber-400/10 text-amber-400/80
                  `}
                >
                  {REVELATION_LABEL[surah.revelationType]}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <span className="text-amber-300 text-3xl flex-shrink-0 group-hover:text-amber-400/60 transition-all duration-200 ">
              ←
            </span>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-4 text-center text-blue-400/60 py-16">
            لا توجد نتائج لـ &quot;{search}&quot;
          </p>
        )}
      </div>
    </div>
  );
}
