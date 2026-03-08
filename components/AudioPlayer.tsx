"use client";

import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  title?: string;
  subtitle?: string;
  onEnded?: () => void;
}

function formatTime(s: number): string {
  if (isNaN(s)) return "0:00";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  if (h > 0)
    return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({
  src,
  title,
  subtitle,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Sync time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;
    const rect = bar.getBoundingClientRect();
    // RTL: right side = start
    const ratio = 1 - (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const skipBackward = () => {
    if (audioRef.current) audioRef.current.currentTime -= 10;
  };

  const skipForward = () => {
    if (audioRef.current) audioRef.current.currentTime += 10;
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      setMuted(v === 0);
    }
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div
      className="
        w-full rounded-2xl overflow-hidden
        bg-blue-950/60 border border-blue-700/40
        backdrop-blur-sm
      "
      dir="rtl"
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      {title && (
        <div className="px-5 pt-4 pb-2 flex items-center gap-4">
          <div
            className="
            w-10 h-10 rounded-xl flex-shrink-0
            bg-amber-400/10 border border-amber-400/20
            flex items-center justify-center text-amber-300 text-lg
          "
          >
            🎙
          </div>
          <div>
            <p className="text-xs text-blue-400/70 mb-0.5">
              {subtitle ?? "يتم الاستماع إلى"}
            </p>
            <p className="text-amber-300 font-bold text-sm leading-tight py-2">
              {title}
            </p>
          </div>
        </div>
      )}

      <div className="px-5 pt-3">
        <div
          ref={progressRef}
          onClick={seek}
          className="relative h-1.5 bg-blue-800/60 rounded-full cursor-pointer group"
        >
          <div
            className="absolute inset-y-0 right-0 bg-amber-400 rounded-full transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />

          <div
            className="
              absolute top-1/2 -translate-y-1/2
              w-3 h-3 rounded-full bg-amber-400 shadow
              opacity-0 group-hover:opacity-100 transition-opacity
            "
            style={{ right: `calc(${progress * 100}% - 6px)` }}
          />
        </div>

        <div className="flex justify-between mt-1.5 text-xs text-blue-400/60 font-mono">
          <span>{formatTime(duration - currentTime)}</span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>

      <div className="px-5 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <a
            href={src}
            download
            onClick={(e) => e.stopPropagation()}
            className="text-blue-300 hover:text-amber-300 transition-colors"
            title="تحميل"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
          <button
            onClick={toggleMute}
            className="text-blue-300 hover:text-amber-300 transition-colors text-base w-7"
          >
            {muted || volume === 0 ? (
              // muted icon
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              // volume icon
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={changeVolume}
            className="w-16 accent-amber-400 cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={skipForward}
            className="text-blue-300 hover:text-amber-300 transition-colors"
            title="تقديم 10 ثواني"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M18 13a6 6 0 1 1-6-6v2.5l3.5-3.5L12 2.5V5a8 8 0 1 0 8 8h-2z" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            className="
              w-12 h-12 rounded-full
              border-2 border-amber-400/70
              flex items-center justify-center
              text-amber-300 hover:bg-amber-400/10
              transition-all duration-200 active:scale-95
            "
          >
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 translate-x-0.5"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          {/* Skip backward (RTL: right button) */}
          <button
            onClick={skipBackward}
            className="text-blue-300 hover:text-amber-300 transition-colors"
            title="رجوع 10 ثواني"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M6 13a6 6 0 1 0 6-6v2.5L8.5 6 12 2.5V5a8 8 0 1 1-8 8h2z" />
            </svg>
          </button>
        </div>

        {/* Duration display */}
        <div className="flex-1 text-left">
          <span className="text-blue-400/50 text-xs font-mono">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
