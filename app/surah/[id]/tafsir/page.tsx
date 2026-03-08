import { getSurahTafsir, getSurah } from "@/lib/quran";
import { notFound } from "next/navigation";
import TafsirView from "@/components/surah/TafsirView";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ayah?: string }>;
}

export default async function TafsirPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { ayah } = await searchParams;

  const number = Number(id);
  if (isNaN(number) || number < 1 || number > 114) notFound();

  const [surah, tafsir] = await Promise.all([
    getSurah(number),
    getSurahTafsir(number),
  ]);

  return (
    <main className="min-h-screen bg-blue-950">
      <TafsirView
        surah={surah}
        tafsir={tafsir}
        scrollToAyah={ayah ? Number(ayah) : null}
      />
    </main>
  );
}
