"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, ShoppingBag, Sparkles, ChevronRight } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
      {/* Top Colorful Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white text-[11px] sm:text-xs font-black py-1.5 px-3 text-center tracking-wide flex items-center justify-center gap-2">
        <span className="hidden sm:inline">🎈</span>
        <span>Yeni Kolleksiya 2026 • 100% Təbii Pambıq Uşaq Geyimləri</span>
        <span className="hidden md:inline">• Bakı daxili sürətli çatdırılma</span>
        <span className="text-yellow-200">✨</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shadow-md shadow-rose-200 group-hover:scale-105 transition-transform duration-200 border-2 border-rose-200 bg-white p-0.5 shrink-0">
              <Image
                src="/logo.png"
                alt="Lola Kids Loqo"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                Lola{" "}
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                  Kids
                </span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1">
                <span>Uşaq Geyimləri</span>
                <span className="text-amber-400">✨</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-bold text-slate-700">
            <Link
              href="/"
              className="hover:text-rose-600 transition-colors py-1 hover:border-b-2 hover:border-rose-500"
            >
              Əsas Səhifə
            </Link>
            <Link
              href="/products"
              className="hover:text-rose-600 transition-colors py-1 hover:border-b-2 hover:border-rose-500 flex items-center gap-1.5"
            >
              <span>Kataloq</span>
              <span className="text-[10px] font-black bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full">
                Yeni
              </span>
            </Link>
            <Link
              href="/#about"
              className="hover:text-rose-600 transition-colors py-1 hover:border-b-2 hover:border-rose-500"
            >
              Haqqımızda
            </Link>
            <Link
              href="/#contact"
              className="hover:text-rose-600 transition-colors py-1 hover:border-b-2 hover:border-rose-500"
            >
              Ünvan & Əlaqə
            </Link>
          </nav>

          {/* Action Buttons (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct WhatsApp Callout */}
            <a
              href="https://wa.me/994775599099?text=Salam,%20Lola%20Kids!%20M%C9%99hsullar%20bar%C9%99d%C9%99%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-3 py-2 rounded-xl text-xs transition-colors border border-emerald-200"
              title="WhatsApp ilə yaz"
            >
              {/* WhatsApp SVG Icon */}
              <svg
                className="w-4 h-4 fill-emerald-600"
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
              <span>WhatsApp</span>
            </a>

            {/* Catalog Button */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold px-5 py-2.5 rounded-full text-xs shadow-md shadow-rose-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Kolleksiya</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="tel:+994775599099"
              className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shadow-2xs active:scale-90 transition-transform"
              aria-label="Zəng et"
              title="Birbaşa Zəng"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors active:scale-95"
              aria-label="Menyunu aç/bağla"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Rich & Fun) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 px-4 pt-4 pb-6 space-y-4 animate-fadeIn shadow-2xl">
          {/* Quick Categories Bar in Mobile Menu */}
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block px-2">
              Kolleksiyalar
            </span>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/products?age=0-2"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-100 text-xs font-bold text-slate-800"
              >
                <span>👶</span>
                <span>0-2 Yaş (Körpə)</span>
              </Link>
              <Link
                href="/products?age=3-5"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-pink-50 border border-pink-100 text-xs font-bold text-slate-800"
              >
                <span>🧒</span>
                <span>3-5 Yaş</span>
              </Link>
              <Link
                href="/products?age=6-12"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50 border border-sky-100 text-xs font-bold text-slate-800"
              >
                <span>🎒</span>
                <span>6-12 Yaş</span>
              </Link>
              <Link
                href="/products?age=13-18"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50 border border-purple-100 text-xs font-bold text-slate-800"
              >
                <span>🧢</span>
                <span>13-18 Yaş (Gənc)</span>
              </Link>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600"
            >
              <span>Əsas Səhifə</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600"
            >
              <span>Bütün Məhsullar (Kataloq)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600"
            >
              <span>Niyə Lola Kids?</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-rose-50 hover:text-rose-600"
            >
              <span>Ünvan & İş Qrafiki</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Quick Mobile Contact Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://wa.me/994775599099"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-extrabold py-3 rounded-2xl text-xs shadow-md active:scale-95"
            >
              <svg
                className="w-4 h-4 fill-current"
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
              <span>WhatsApp ilə Canlı Yaz</span>
            </a>

            <a
              href="tel:+994775599099"
              className="flex items-center justify-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 py-2.5 rounded-2xl active:scale-95"
            >
              <Phone className="w-4 h-4 text-rose-500" />
              <span>Zəng et: +994 77 559 90 99</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
