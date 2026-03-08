import Islamic from "@/public/leftSide.png";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-blue-950 min-h-screen" dir="rtl">
      <div className="absolute inset-0 opacity-10 bg-[url('../public/islamicPattern.png')] bg-repeat" />
      <div className="relative z-10 container md:max-w-[80%]  mx-auto min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-20">
        <div className="flex flex-col gap-6 text-white">
          <h1 className="text-4xl lg:text-5xl leading-relaxed font-bold md:text-right text-center">
            <span className="text-amber-400">ذكر</span> يحيي القلوب ويقوي
            الإيمان ويضيء الدرب بنور القرآن
          </h1>
          <h2 className="text-xl lg:text-2xl text-white/80 leading-relaxed md:text-right text-center">
            استمع إلى القرآن، تعلم الحديث، واذكر الله أينما كنت
          </h2>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src={Islamic}
            alt="Islamic Left Side Pic"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
}
