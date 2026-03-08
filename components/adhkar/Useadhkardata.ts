import { useState, useEffect } from "react";
import { AdhkarCategory } from "./types";

const ADHKAR_JSON_URL = "/adhkar.json";
// IDs from the JSON that match our 4 display categories
export const FEATURED_IDS = {
  morningEvening: 1, 
  sleep: 2, 
  wakeUp: 3, 
  leavingHome: 8, 
  afterPrayer: 27, 
};

export function useAdhkarData() {
  const [allCategories, setAllCategories] = useState<AdhkarCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(ADHKAR_JSON_URL)
      .then((r) => {
        console.log("status:", r.status, r.url); // ← add this
        return r.json();
      })
      .then((data: AdhkarCategory[]) => {
        console.log("loaded categories:", data.length); // ← and this
        setAllCategories(data);
      })
      .catch(() => setError("فشل تحميل بيانات الأذكار"))
      .finally(() => setLoading(false));
  }, []);

  return { allCategories, loading, error };
}
