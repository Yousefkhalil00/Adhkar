"use client";

import { AdhkarCategory } from "./adhkar/types";
import { useAdhkarData, FEATURED_IDS } from "./adhkar/Useadhkardata";
import AdhkarHeader from "./adhkar/AdhkarHeader";
import AdhkarCarousel from "./adhkar/AdhkarCarousel";
import AdhkarModal from "./adhkar/AdhkarModal";

const FEATURED_CATEGORY_IDS = [
  FEATURED_IDS.morningEvening,
  FEATURED_IDS.sleep,
  FEATURED_IDS.leavingHome,
  FEATURED_IDS.afterPrayer,
];

export default function AdhkarSection() {
  const { allCategories, loading, error } = useAdhkarData();
  const [selectedCategory, setSelectedCategory] =
    useState<AdhkarCategory | null>(null);

  const featuredCategories = allCategories.filter((cat) =>
    FEATURED_CATEGORY_IDS.includes(cat.id),
  );

  return (
    <section className="relative w-full bg-blue-950 py-16 px-4 overflow-hidden">
      <AdhkarHeader />

      {loading && (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        </div>
      )}

      {error && <p className="text-red-400 text-center py-8">{error}</p>}

      {!loading && !error && (
        <AdhkarCarousel
          categories={featuredCategories}
          onShowAll={setSelectedCategory}
        />
      )}

      <AdhkarModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </section>
  );
}
