"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Phone, MapPin, MessageCircle } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isProducts = pathname.startsWith("/products");

  return (
    <nav
      aria-label="Mobil alt naviqasiya"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-6px_25px_rgba(0,0,0,0.08)] pb-safe transition-all"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            isHome
              ? "text-rose-600 font-extrabold"
              : "text-slate-500 hover:text-slate-800 font-medium"
          }`}
        >
          <div
            className={`relative p-1 rounded-xl transition-all ${
              isHome ? "bg-rose-100 scale-110" : ""
            }`}
          >
            <Home className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Əsas</span>
        </Link>

        {/* 2. Products Catalog */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center py-1 transition-all ${
            isProducts
              ? "text-rose-600 font-extrabold"
              : "text-slate-500 hover:text-slate-800 font-medium"
          }`}
        >
          <div
            className={`relative p-1 rounded-xl transition-all ${
              isProducts ? "bg-rose-100 scale-110" : ""
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Kataloq</span>
        </Link>

        {/* 3. Center WhatsApp Action (Special Highlight) */}
        <a
          href="https://wa.me/994775599099?text=Salam,%20Lola%20Kids!%20M%C9%99hsullar%20bar%C9%99d%C9%99%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-5 transition-transform active:scale-90"
          aria-label="WhatsApp Canlı Çat"
        >
          <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#20ba5a] to-[#25D366] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.45)] border-3 border-white">
            {/* WhatsApp SVG Icon */}
            <svg
              className="w-7 h-7 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.301-.15-1.776-.877-2.052-.977-.275-.1-.476-.15-.676.15-.2.3-.775.976-.95 1.176-.176.2-.351.226-.652.076-.301-.15-1.272-.469-2.423-1.496-.897-.799-1.503-1.787-1.678-2.087-.176-.3-.019-.462.132-.612.136-.135.301-.35.452-.525.15-.176.2-.3.301-.5.1-.2.05-.376-.025-.526-.075-.15-.676-1.628-.926-2.23-.244-.585-.492-.506-.676-.515-.175-.009-.376-.01-.577-.01-.2 0-.526.075-.801.376-.276.3-1.052 1.028-1.052 2.508 0 1.48 1.077 2.908 1.228 3.109.15.2 2.119 3.237 5.134 4.541.717.311 1.277.497 1.714.636.721.229 1.377.197 1.895.119.578-.087 1.776-.726 2.026-1.428.251-.702.251-1.303.176-1.428-.075-.125-.276-.2-.577-.35z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.05 21.95l4.912-1.353A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.163 8.163 0 01-4.32-1.225l-.31-.184-2.916.804.818-2.835-.203-.324A8.169 8.169 0 1112 20.2z"
              />
            </svg>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-700 mt-1">WhatsApp</span>
        </a>

        {/* 4. Instant Call */}
        <a
          href="tel:+994775599099"
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 font-medium active:scale-95 transition-all"
        >
          <div className="p-1 rounded-xl">
            <Phone className="w-5 h-5 text-rose-500" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Zəng</span>
        </a>

        {/* 5. Address & Location */}
        <Link
          href="/#contact"
          className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 font-medium active:scale-95 transition-all"
        >
          <div className="p-1 rounded-xl">
            <MapPin className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Ünvan</span>
        </Link>
      </div>
    </nav>
  );
}
