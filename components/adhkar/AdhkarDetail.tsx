"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdhkarCategory, AdhkarItem } from "./types";
import AudioPlayer from "@/components/AudioPlayer";

interface Props {
  category: AdhkarCategory;
}

export default function AdhkarDetail({ category }: Props) {
  const router = useRouter();
  const [counts, setCounts] = useState<Record<number, number>>({});

  const handleTap = (item: AdhkarItem) => {
    setCounts((prev) => {
      const current = prev[item.id] ?? 0;
      if (current >= item.count) return prev;
      return { ...prev, [item.id]: current + 1 };
    });
  };

  const getCount = (id: number) => counts[id] ?? 0;
  const isDone = (id: number, max: number) => (counts[id] ?? 0) >= max;

  const totalDone = category.array.filter((i) => isDone(i.id, i.count)).length;
  const totalItems = category.array.length;

  const AUDIO_BASE = "https://raw.githubusercontent.com/rn0x/Adhkar-json/main";

  return (
    <main className="min-h-screen bg-blue-950 pb-20" dir="rtl">
      {/* Sticky header */}
      <div className="sticky top-0 z-20 bg-blue-950/95 backdrop-blur border-b border-blue-800/40 px-4 py-4">
        <div className="container md:max-w-[80%] mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => router.push("/adhkar")}
            className="flex items-center gap-1.5 text-blue-300 hover:text-amber-300 transition-colors text-sm"
          >
            <span>→</span>
            <span>رجوع</span>
          </button>

          <h1 className="text-amber-300 text-lg font-bold text-center flex-1 line-clamp-1">
            {category.category}
          </h1>

          <span className="text-blue-400 text-sm whitespace-nowrap">
            {totalDone} / {totalItems}
          </span>
        </div>

        {/* Progress bar */}
        <div className="container md:max-w-[80%] mx-auto mt-3 h-1 bg-blue-800/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${(totalDone / totalItems) * 100}%` }}
          />
        </div>
      </div>

      <div className="container md:max-w-[80%] mx-auto px-4 pt-8">
        {/* Category audio */}
        {category.audio && (
          <div className="mb-8">
            <AudioPlayer
              src={`${AUDIO_BASE}${category.audio}`}
              title={category.category}
              subtitle="يتم الاستماع إلى"
            />
          </div>
        )}

        {/* All done banner */}
        {totalDone === totalItems && totalItems > 0 && (
          <div className="mb-6 p-4 rounded-2xl text-center bg-amber-400/10 border border-amber-400/40">
            <p className="text-amber-300 text-lg font-bold">
              🌟 أحسنت! تم الانتهاء من جميع الأذكار
            </p>
          </div>
        )}

        {/* Adhkar list */}
        <ul className="space-y-5">
          {category.array.map((item) => {
            const current = getCount(item.id);
            const done = isDone(item.id, item.count);
            const progress =
              item.count > 1 ? current / item.count : done ? 1 : 0;

            return (
              <li
                key={item.id}
                onClick={() => handleTap(item)}
                className={`
                  relative rounded-2xl border overflow-hidden
                  cursor-pointer select-none
                  transition-all duration-200 active:scale-[0.985]
                  ${
                    done
                      ? "border-amber-400/50 bg-blue-900/50"
                      : "border-blue-700/40 bg-blue-900/50 hover:border-amber-400/30"
                  }
                `}
              >
                {/* Progress fill */}
                {item.count > 1 && (
                  <div
                    className="absolute inset-0 bg-amber-400/10 transition-all duration-500 pointer-events-none"
                    style={{
                      transform: `scaleX(${progress})`,
                      transformOrigin: "right",
                    }}
                  />
                )}

                <div className="relative p-5">
                  <div className="flex items-start gap-4">
                    {/* Counter circle */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-1 mt-1">
                      <div
                        className={`
                        w-12 h-12 rounded-full border-2 flex items-center justify-center
                        transition-all duration-300
                        ${
                          done
                            ? "border-amber-400 bg-amber-400/20 text-amber-400"
                            : "border-blue-600 bg-blue-950/50 text-blue-200"
                        }
                      `}
                      >
                        <span className="text-sm font-bold">
                          {item.count === 1 ? (done ? "✓" : item.id) : current}
                        </span>
                      </div>
                      {item.count > 1 && (
                        <span className="text-blue-500 text-xs">
                          / {item.count}
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <p
                      className={`
                      flex-1 text-base leading-loose text-right
                      transition-colors duration-300
                      ${done ? "text-blue-300/60" : "text-blue-100"}
                    `}
                    >
                      {item.text}
                    </p>
                  </div>

                  {done && (
                    <p className="text-center text-amber-400/70 text-xs font-semibold mt-3">
                      ✓ تم
                    </p>
                  )}
                  {!done && current === 0 && (
                    <p className="text-right text-blue-500/40 text-xs mt-2">
                      اضغط للعد
                    </p>
                  )}

                  {/* Individual dhikr audio */}
                  {item.audio && (
                    <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                      <AudioPlayer
                        src={`${AUDIO_BASE}${item.audio}`}
                        title={`ذكر ${item.id}`}
                        subtitle={
                          item.count > 1
                            ? `يُكرر ${item.count} مرات`
                            : undefined
                        }
                      />
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Reset */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setCounts({})}
            className="
              px-6 py-2 rounded-xl text-sm
              border border-blue-700/40 text-blue-400
              hover:border-amber-400/30 hover:text-amber-300
              transition-all duration-200
            "
          >
            إعادة العد من البداية
          </button>
        </div>
      </div>
    </main>
  );
}
