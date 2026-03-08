import Link from "next/link";
import { AyahWithAudio } from "@/types/quran";

interface Props {
  ayah: AyahWithAudio;
  surahNumber: number;
  isPlaying: boolean;
  onPlay: () => void;
}

export default function AyahCard({
  ayah,
  surahNumber,
  isPlaying,
  onPlay,
}: Props) {
  const hasSajda =
    ayah.sajda === true ||
    (typeof ayah.sajda === "object" && ayah.sajda !== null);

  return (
    <div
      className={`
        group relative p-5 rounded-2xl border transition-all duration-200
        ${
          isPlaying
            ? "border-amber-400/50 bg-amber-400/5"
            : "border-blue-800/40 bg-blue-900/30 hover:border-blue-700/60"
        }
      `}
    >
      {/* Top row: ayah number + actions */}
      <div className="flex items-center justify-between mb-4">
        {/* Ayah number badge */}
        <div className="flex items-center gap-2">
          <div
            className="
            w-8 h-8 rounded-full
            bg-amber-400/10 border border-amber-400/20
            flex items-center justify-center
            text-amber-400 text-xs font-bold font-mono
          "
          >
            {ayah.numberInSurah}
          </div>

          {/* Sajda indicator */}
          {hasSajda && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-400/10 border border-green-400/20 text-green-400">
              سجدة
            </span>
          )}

          {/* Playing indicator */}
          {isPlaying && (
            <div className="flex gap-0.5 items-end h-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-amber-400 rounded-full animate-pulse"
                  style={{
                    height: `${i * 4 + 4}px`,
                    animationDelay: `${i * 150}ms`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Play this ayah */}
          <button
            onClick={onPlay}
            title="استمع لهذه الآية"
            className={`
              w-8 h-8 rounded-full border flex items-center justify-center
              transition-all duration-200
              ${
                isPlaying
                  ? "border-amber-400 bg-amber-400/20 text-amber-400"
                  : "border-blue-700/50 text-blue-400 hover:border-amber-400/40 hover:text-amber-400"
              }
            `}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3 h-3 translate-x-px"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          {/* Tafsir button → separate page */}
          <Link
            href={`/surah/${surahNumber}/tafsir?ayah=${ayah.numberInSurah}`}
            className="
              flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs
              border border-blue-700/40 text-blue-400
              hover:border-amber-400/30 hover:text-amber-300
              transition-all duration-200
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
            تفسير
          </Link>
        </div>
      </div>

      {/* Ayah text */}
      <p
        className="text-right leading-[2.4] text-xl text-blue-100 font-arabic"
        style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
      >
        {ayah.text}
        {/* Ayah number in text */}
        <span className="text-amber-400/60 text-base mx-1">
          ﴿{ayah.numberInSurah}﴾
        </span>
      </p>
    </div>
  );
}
