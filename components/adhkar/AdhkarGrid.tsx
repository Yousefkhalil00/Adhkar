"use client";

import { useState } from "react";
import Link from "next/link";
import { AdhkarCategory } from "./types";

interface Props {
  categories: AdhkarCategory[];
}

export default function AdhkarGrid({ categories }: Props) {
  const [search, setSearch] = useState("");

  const filtered = categories.filter((c) => c.category.includes(search));

  return (
    <>
      {/* Search */}
      <div className="mb-8 max-w-sm mx-auto" dir="rtl">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن ذكر..."
          className="
            w-full px-4 py-3 rounded-xl
            bg-blue-900/60 border border-blue-700/40
            text-blue-100 placeholder-blue-400/50
            focus:outline-none focus:border-amber-400/50
            transition-colors text-sm
          "
        />
      </div>

      <div
        className="
          container md:max-w-[80%] mx-auto
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-4
        "
        dir="rtl"
      >
        {filtered.map((cat) => (
          <Link
            key={cat.id}
            href={`/adhkar/${cat.id}`}
            className="
              group flex flex-col justify-between
              p-5 rounded-2xl min-h-[140px]
              bg-blue-900/60 border border-blue-700/40
              hover:border-amber-400/50 hover:bg-blue-900/80
              transition-all duration-300 shadow-lg
            "
          >
            <span className="text-amber-400  text-xs ">
              {String(cat.id).padStart(2, "0")}
            </span>

            <h2 className="text-white text-base font-bold text-right leading-relaxed mt-2 flex-1">
              {cat.category}
            </h2>

            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-blue-400/70 bg-blue-950/50 px-2 py-0.5 rounded-full">
                {cat.array?.length ?? 0} ذكر
              </span>
              <span className="text-amber-400/60 text-3xl group-hover:translate-x-[-4px] transition-transform duration-200">
                ←
              </span>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-4 text-center text-blue-400 py-12">
            لا توجد نتائج لـ &quot;{search}&quot;
          </p>
        )}
      </div>
    </>
  );
}
