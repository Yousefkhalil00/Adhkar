import { AdhkarCategory } from "@/components/adhkar/types";

const ADHKAR_JSON_URL = "http://localhost:3000/adhkar.json";

export async function getAllCategories(): Promise<AdhkarCategory[]> {
  const res = await fetch(ADHKAR_JSON_URL, { cache: "force-cache" });
  if (!res.ok) throw new Error("فشل تحميل بيانات الأذكار");
  return res.json();
}

export async function getCategoryById(
  id: number,
): Promise<AdhkarCategory | null> {
  const categories = await getAllCategories();
  return categories.find((c) => c.id === id) ?? null;
}
