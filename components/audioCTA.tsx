import Button from "./Button";
import quran from "@/public/quran.png";
import Image from "next/image";

export default function AudioCTA() {
  return (
    <div className="py-20 w-full bg-blue-950" dir="rtl">
      <div className="w-[90%] max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Text side */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl lg:text-5xl text-amber-200 font-bold leading-snug">
              اسمع وتدبر كلام الله
            </h1>
            <h2 className="text-xl lg:text-2xl text-white/80 leading-relaxed">
              اجعل تلاوة القرآن عادة يومية، فهو شفاء ورحمة للمؤمنين
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button src="/surah" light={false} flex>
              استمع لتلاوة هادئة
            </Button>
            <Button
              src="https://www.pdfquran.com/download/standard1/standard1-quran.pdf"
              light
              flex
            >
              تحميل المصحف
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Image
            src={quran}
            alt="quran"
            width={500}
            height={500}
            className="w-full md:max-w-sm max-w-lg"
          />
        </div>
      </div>
    </div>
  );
}
