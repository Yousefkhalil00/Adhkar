import { getCategoryById } from "@/lib/adhkar";
import AdhkarDetail from "@/components/adhkar/AdhkarDetail";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdhkarDetailPage({ params }: Props) {
  const { id } = await params;
  const category = await getCategoryById(Number(id));

  if (!category) notFound();

  return <AdhkarDetail category={category} />;
}
