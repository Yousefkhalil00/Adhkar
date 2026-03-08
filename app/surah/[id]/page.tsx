import { getSurahWithAudio, DEFAULT_RECITER } from "@/lib/quran";
import { notFound } from "next/navigation";
import SurahDetail from "@/components/surah/SurahDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SurahDetailPage({ params }: Props) {
  const { id } = await params;
  const number = Number(id);

  if (isNaN(number) || number < 1 || number > 114) notFound();

  const surah = await getSurahWithAudio(number, DEFAULT_RECITER.id);

  return (
    <main className="min-h-screen bg-blue-950">
      <SurahDetail surah={surah} />
    </main>
  );
}
