import Hand from "@/public/hand.png";
import Carbet from "@/public/Carbet.png";
import Lanter from "@/public/lanter.png";
import Zakat from "@/public/Kaaba.png";
import Kabaa from "@/public/Kaabaa.png";
import Image from "next/image";

const Arkans = [
  {
    image: Hand,
    title: "الشهادتان",
    details: "الإقرار بوحدانية الله ورسالة النبي محمد صلى الله عليه وسلم",
  },
  {
    image: Carbet,
    title: "الصلاة",
    details: "الركن الذي يربط العبد بربه",
  },
  {
    image: Zakat,
    title: "الزكاة",
    details: "تطهير النفس والمال",
  },
  {
    image: Lanter,
    title: "الصيام",
    details: "تهذيب الروح وتقوية الإرادة",
  },
  {
    image: Kabaa,
    title: "الحج",
    details: "رحلة الإيمان لمن استطاع إليه سبيلاً",
  },
];

export default function Arkan() {
  return (
    <div className="bg-blue-950 w-full py-20" dir="rtl">
      <div className="w-[90%] max-w-6xl text-white mx-auto flex flex-col items-center bg-slate-900 rounded-2xl p-8 gap-6">
        <h4 className="text-amber-300 text-lg">أركان الاسلام الخمسة</h4>
        <h3 className="text-3xl font-bold text-center">
          "جوهر الإسلام في خمسة أركان"
        </h3>
        <p className="text-lg text-center leading-relaxed text-white/80 max-w-2xl">
          هي الاساس الذي يبني عليه المسلم إيمانه، فهي تجمع بين العقيدة والعبادة
          والاخلاق، لترشد الإنسان إلى طريق الهداية والتقوى.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full mt-4">
          {Arkans.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center justify-start text-center gap-3"
            >
              <div className="flex items-center justify-center w-32 h-32 bg-slate-800 rounded-full border-2 border-amber-300">
                <Image
                  src={item.image}
                  width={90}
                  height={90}
                  alt={item.title}
                />
              </div>
              <h3 className="font-bold text-amber-200">{item.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
