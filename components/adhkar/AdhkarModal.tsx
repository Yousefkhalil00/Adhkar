import { useState } from "react";
import Button from "../Button";
import { AdhkarCategory } from "./types";

const AUDIO_BASE_URL =
  "https://raw.githubusercontent.com/rn0x/Adhkar-json/main";

interface AdhkarModalProps {
  category: AdhkarCategory | null;
  onClose: () => void;
}

export default function AdhkarModal({ category, onClose }: AdhkarModalProps) {
  const [counts, setCounts] = useState<Record<number, number>>({});

  const handleClose = () => {
    setCounts({});
    onClose();
  };

  const handleTap = (id: number, maxCount: number) => {
    setCounts((prev) => {
      const current = prev[id] ?? 0;
      if (current >= maxCount) return prev;
      return { ...prev, [id]: current + 1 };
    });
  };

  const isDone = (id: number, maxCount: number) =>
    (counts[id] ?? 0) >= maxCount;
  const getCount = (id: number) => counts[id] ?? 0;

  if (!category) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="
          relative w-full max-w-lg max-h-[80vh] overflow-y-auto
          bg-blue-900 border border-amber-400/30 rounded-2xl
          p-6 shadow-2xl shadow-black/50
        "
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-amber-300 text-2xl font-bold">
            {category.category}
          </h2>
          <button
            onClick={handleClose}
            className="text-blue-300 hover:text-amber-300 transition-colors text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Category audio player */}
        {category.audio && (
          <audio
            controls
            className="w-full mb-4 rounded-lg"
            src={`${AUDIO_BASE_URL}${category.audio}`}
          />
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mb-6" />

        {/* Adhkar list */}
        <ul className="space-y-4">
          {category.array.map((item) => {
            const current = getCount(item.id);
            const done = isDone(item.id, item.count);
            const progress =
              item.count > 1 ? current / item.count : done ? 1 : 0;

            return (
              <li
                key={item.id}
                onClick={() => handleTap(item.id, item.count)}
                className={`
                  relative p-4 rounded-xl border overflow-hidden
                  cursor-pointer select-none
                  transition-all duration-200 active:scale-[0.98]
                  ${
                    done
                      ? "border-amber-400/60 bg-amber-400/10"
                      : "border-blue-700/30 bg-blue-950/50 hover:border-amber-400/30"
                  }
                `}
              >
                {/* Progress fill */}
                {item.count > 1 && (
                  <div
                    className="absolute inset-0 bg-amber-400/10 transition-all duration-300"
                    style={{
                      transform: `scaleX(${progress})`,
                      transformOrigin: "right",
                    }}
                  />
                )}

                {/* Top row */}
                <div className="relative flex items-center justify-between mb-2">
                  {/* Dhikr number */}
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
                    {item.id}
                  </span>

                  {/* Counter for repeated dhikr */}
                  {item.count > 1 && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-lg font-bold transition-colors ${
                          done ? "text-amber-400" : "text-blue-200"
                        }`}
                      >
                        {current}
                      </span>
                      <span className="text-blue-500 text-xs">/</span>
                      <span className="text-blue-400 text-sm">
                        {item.count}
                      </span>
                    </div>
                  )}

                  {/* Checkmark for single dhikr */}
                  {item.count === 1 && (
                    <span
                      className={`text-lg transition-all duration-300 ${
                        done ? "opacity-100 scale-110" : "opacity-0 scale-75"
                      }`}
                    >
                      ✅
                    </span>
                  )}
                </div>

                {/* Dhikr text */}
                <p className="relative text-blue-100 text-base leading-loose text-right">
                  {item.text}
                </p>

                {/* Done label */}
                {done && item.count > 1 && (
                  <p className="relative mt-2 text-center text-amber-400 text-xs font-semibold tracking-wide">
                    ✓ تم
                  </p>
                )}

                {/* Individual audio - stop propagation so tap doesn't count */}
                {item.audio && (
                  <audio
                    controls
                    className="relative w-full mt-3 rounded-lg"
                    src={`${AUDIO_BASE_URL}${item.audio}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Close button */}
        <div className="mt-6">
          <Button onClick={handleClose}>إغلاق</Button>
        </div>
      </div>
    </div>
  );
}
