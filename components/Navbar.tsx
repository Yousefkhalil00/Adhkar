"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsMoonStars } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/surah", label: "القرآن الكريم" },
    { href: "/adhkar", label: "الأذكار والأدعية" },
    { href: "/prayer", label: "الاذان" },
  ];

  return (
    <div className="w-full mx-auto bg-blue-950 sticky top-0 z-50" dir="rtl">
      <div className="container md:max-w-[80%] mx-auto">
        <nav className=" mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className={`flex items-center gap-2 font-bold text-white text-2xl group ${open ? "opacity-0" : ""}`}
            >
              <div className="p-1.5 bg-amber-400 rounded-md text-blue-950 group-hover:bg-amber-300 transition-colors">
                <BsMoonStars />
              </div>
              ذكر
            </Link>

            {navLinks.map((link) => (
              <div
                key={link.href}
                className="hidden md:flex items-center gap-8 lg:gap-10"
              >
                <Link
                  href={link.href}
                  className={`whitespace-nowrap text-sm lg:text-base transition-colors ${
                    pathname === link.href
                      ? "text-amber-400"
                      : "text-white hover:text-amber-200"
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}

            <button
              onClick={() => setOpen((o) => !o)}
              className={`md:hidden text-white text-2xl hover:text-amber-300 transition-colors ${open && "opacity-0"}`}
            >
              {!open ? <HiMenu /> : <HiX />}
            </button>
          </div>
        </nav>

        <div
          className={`  bg-blue-950
          md:hidden  fixed inset-0  top-0  z-40
           items-center justify-center gap-8
          transition-all duration-300 flex flex-col
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
          dir="rtl"
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 left-5 text-white text-3xl hover:text-amber-300 transition-colors"
          >
            <HiX />
          </button>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 font-bold text-white text-3xl mb-4"
          >
            <div className="p-2 bg-amber-400 rounded-md text-blue-950">
              <BsMoonStars />
            </div>
            ذكر
          </Link>

          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              className={`
              text-2xl font-semibold transition-all duration-300
              ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
              ${
                pathname === link.href
                  ? "text-amber-400"
                  : "text-white hover:text-amber-200"
              }
            `}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
