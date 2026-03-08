import Hero from "@/components/Hero";
import Arkan from "@/components/Arkan";
import AudioCTA from "@/components/audioCTA";
import AdhkarSection from "@/components/adhkar/AdhkarSection";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Arkan />
      <AudioCTA />
      <AdhkarSection />
    </>
  );
}
