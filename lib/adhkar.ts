import { AdhkarCategory } from "@/components/adhkar/types";
import adhkarData from "@/public/adhkar.json";

export async function getAllCategories(): Promise<AdhkarCategory[]> {
  return adhkarData as unknown as AdhkarCategory[];
}

export async function getCategoryById(
  id: number,
): Promise<AdhkarCategory | null> {
  const categories = adhkarData as unknown as AdhkarCategory[];
  return categories.find((c) => c.id === id) ?? null;
}
