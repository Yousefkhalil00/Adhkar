import { getAllSurahs } from "@/lib/quran";
import SurahGrid from "@/components/surah/SurahGrid";

export default async function SurahPage() {
  const surahs = await getAllSurahs();

  return (
    <main className="min-h-screen bg-blue-950 py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12" dir="rtl">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-amber-400/50 text-4xl">&#125;</span>
          <h1 className="text-amber-300 text-5xl font-bold tracking-wide">
            القرآن الكريم
          </h1>
          <span className="text-amber-400/50 text-4xl">&#123;</span>
        </div>
        <p className="text-blue-300/70 text-sm mt-2">
          اختر سورة للقراءة والاستماع
        </p>
      </div>

      <SurahGrid surahs={surahs} />
    </main>
  );
}
