import Button from "../Button";
import { AdhkarCategory } from "./types";

interface AdhkarCardProps {
  category: AdhkarCategory;
  onShowAll: (category: AdhkarCategory) => void;
}

export default function AdhkarCard({ category, onShowAll }: AdhkarCardProps) {
  // Show the first dhikr as preview, truncated
  const previewText = category.array?.[0]?.text ?? "";

  return (
    <div
      className="
        relative flex flex-col justify-between gap-4 p-5 rounded-2xl
        bg-blue-950/60 border border-blue-700/40
        hover:border-amber-400/40 hover:bg-blue-900/80
        transition-all duration-300 shadow-lg
        min-h-[200px]
      "
      dir="rtl"
    >
      <h3 className="text-amber-300 text-lg font-bold text-center tracking-wide">
        {category.category ?? "--"}
      </h3>

      <p className="text-blue-100/80 text-sm leading-relaxed text-right line-clamp-3 flex-1">
        {previewText || "جاري التحميل..."}
      </p>

      <Button src="/adhkar">عرض كل الأذكار</Button>
    </div>
  );
}
