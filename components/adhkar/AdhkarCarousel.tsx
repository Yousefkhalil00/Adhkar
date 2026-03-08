import { useRef } from "react";
import { AdhkarCategory } from "./types";
import AdhkarCard from "./AdhkarCard";

interface AdhkarCarouselProps {
  categories: AdhkarCategory[];
  onShowAll: (category: AdhkarCategory) => void;
}

export default function AdhkarCarousel({
  categories,
  onShowAll,
}: AdhkarCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-[80%] mx-auto">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="
          absolute -left-5 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 rounded-full border border-blue-600/50
          bg-blue-900/80 text-blue-200 hover:text-amber-300
          hover:border-amber-400/50 transition-all duration-200
          flex items-center justify-center shadow-lg
        "
      >
        ‹
      </button>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2 px-2"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat) => (
          <div key={cat.id} className="flex-none w-64 sm:w-72">
            <AdhkarCard category={cat} onShowAll={onShowAll} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="
          absolute -right-5 top-1/2 -translate-y-1/2 z-10
          w-10 h-10 rounded-full border border-blue-600/50
          bg-blue-900/80 text-blue-200 hover:text-amber-300
          hover:border-amber-400/50 transition-all duration-200
          flex items-center justify-center shadow-lg
        "
      >
        ›
      </button>
    </div>
  );
}
