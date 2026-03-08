import { getAllCategories } from "@/lib/adhkar";
import AdhkarGrid from "@/components/adhkar/AdhkarGrid";

export default async function AdhkarPage() {
  const categories = await getAllCategories();

  return (
    <main className="min-h-screen bg-blue-950 py-16 px-4">
      <div className="text-center mb-12" dir="rtl">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-amber-400/50 text-4xl">&#125;</span>
          <h1 className="text-amber-200 text-5xl font-bold tracking-wide">
            ذكر الله حصن المؤمن -{" "}
            <span className="text-5xl text-white">اذكار وادعية يومية</span>
          </h1>
          <span className="text-amber-400/50 text-4xl">&#123;</span>
        </div>
        <p className="text-blue-300/70 text-sm mt-2">
          مجموعة من الاذكار والادعية المأثورة لتطمئن بها القلوب ويزداد بها
          الايمان
        </p>
      </div>

      <AdhkarGrid categories={categories} />
    </main>
  );
}
