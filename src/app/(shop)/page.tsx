"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  ShoppingBag,
  Star,
  Heart,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import ContactSection from "@/components/ContactSection";
import { Product } from "@/types/product";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";
import { getProducts, isSupabaseConfigured } from "@/lib/supabase/client";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(
    null
  );

  useEffect(() => {
    async function loadData() {
      if (isSupabaseConfigured()) {
        try {
          const supabaseProducts = await getProducts();
          if (supabaseProducts && supabaseProducts.length > 0) {
            setProducts(supabaseProducts);
          }
        } catch (error) {
          console.warn("Could not load from Supabase, using sample catalog:", error);
        }
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Featured 4 products
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION - Vibrant, Fun & Kid-Friendly */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/60 via-rose-50/50 to-white pt-8 pb-14 md:py-20 border-b border-rose-100/70">
        {/* Floating playful background dots */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-pink-300/30 rounded-full blur-2xl -z-10" />
        <div className="absolute top-20 right-10 w-32 h-32 bg-amber-300/30 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-sky-300/30 rounded-full blur-2xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              {/* Joyful Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-rose-200 text-rose-600 text-xs font-black tracking-wide uppercase">
                <span className="animate-spin text-amber-500">✨</span>
                <span>Yeni Payız-Qış Kolleksiyası 2026</span>
                <span className="text-amber-500">🧸</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Balacalar üçün <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                  Ən Rəngarəng və Zərif
                </span>{" "}
                Uşaq Geyimləri! 🎈
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Körpənizin həssas dərisi üçün 100% təbii pambıq, nəfəs alan parçalar və ən sevimli dizaynlar. Bakıda, Yasamal rayonu, Abbas Mirzə Şərifzadə küçəsi, 171C ünvanındakı mağazamızda və WhatsApp ilə saniyələr içində sifariş edin!
              </p>

              {/* Action Buttons (Mobile-first full width on small screens) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-pink-600 text-white font-black px-8 py-4 rounded-full text-sm sm:text-base shadow-lg shadow-rose-300/40 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Kolleksiyanı Kəşf Et</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-7 py-4 rounded-full text-sm sm:text-base border-2 border-slate-200 shadow-xs hover:border-slate-300 active:scale-95 transition-all"
                >
                  <span>Mağaza & Ünvan</span>
                </a>
              </div>

              {/* Trust Indicators (Mobile 3 items) */}
              <div className="pt-4 border-t border-rose-200/60 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-slate-700 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold">100% Pambıq</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold">0-18 Yaş Seçim</span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold">Sürətli Çatdırılma</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Playful Elements */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                {/* Visual Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5">
                  <Image
                    src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop&q=80"
                    alt="Lola Kids Uşaq Geyimləri"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-pink-500 text-white text-[11px] font-black uppercase tracking-wider w-fit">
                      Lola Kids Baku
                    </span>
                    <h2 className="text-lg sm:text-xl font-black mt-2 leading-tight">
                      Uşaqlar üçün ən zərif və rahat geyimlər
                    </h2>
                    <a
                      href="https://maps.app.goo.gl/b84PAJuB4GAPBbSu8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-200 hover:text-white mt-1 underline-offset-2 hover:underline inline-flex items-center gap-1 transition-colors"
                    >
                      📍 Bakı, Yasamal rayonu, Abbas Mirzə Şərifzadə küçəsi, 171C
                    </a>
                  </div>
                </div>

                {/* Floating Mascot Badge */}
                <div className="absolute -top-4 -left-4 bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl border-2 border-rose-200 flex items-center gap-2.5 animate-float-slow">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-rose-100 shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Lola Kids Loqo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 leading-tight">
                      Lola Kids
                    </p>
                    <p className="text-[10px] font-bold text-rose-500">
                      Ən Yaxşı Seçim ⭐
                    </p>
                  </div>
                </div>

                {/* Floating Price Promo Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border-2 border-amber-300 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-white flex items-center justify-center font-black text-sm shadow-md">
                    %
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900 leading-tight">
                      Münasib Qiymət
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold">
                      Hər ailənin büdcəsinə uyğun
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PLAYFUL CATEGORIES GRID (Vibrant Colors & Emojis) */}
      <section className="py-10 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-amber-100 text-amber-800 mb-2">
              Seçim Asanlığı 🎨
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Kateqoriyalar üzrə Seçin
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Övladınızın yaşına və zövqünə uyğun ən gözəl uşaq geyimləri
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {/* Category: 0-2 Years */}
            <Link
              href="/products?age=0-2"
              className="group p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 text-white shadow-md shadow-amber-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-white/20 text-4xl font-black select-none pointer-events-none">
                0-2
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center text-2xl mb-3 shadow-inner group-hover:rotate-6 transition-transform">
                👶
              </div>
              <h3 className="font-black text-base sm:text-lg leading-tight">
                0 - 2 Yaş
              </h3>
              <p className="text-xs text-amber-100 font-semibold mt-0.5">
                Körpə geyimləri
              </p>
            </Link>

            {/* Category: 3-5 Years */}
            <Link
              href="/products?age=3-5"
              className="group p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-400 text-white shadow-md shadow-pink-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-white/20 text-4xl font-black select-none pointer-events-none">
                3-5
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center text-2xl mb-3 shadow-inner group-hover:rotate-6 transition-transform">
                🧒
              </div>
              <h3 className="font-black text-base sm:text-lg leading-tight">
                3 - 5 Yaş
              </h3>
              <p className="text-xs text-rose-100 font-semibold mt-0.5">
                Məktəbəqədər dəb
              </p>
            </Link>

            {/* Category: 6-12 Years */}
            <Link
              href="/products?age=6-12"
              className="group p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-500 text-white shadow-md shadow-sky-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-white/20 text-4xl font-black select-none pointer-events-none">
                6-12
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center text-2xl mb-3 shadow-inner group-hover:rotate-6 transition-transform">
                🎒
              </div>
              <h3 className="font-black text-base sm:text-lg leading-tight">
                6 - 12 Yaş
              </h3>
              <p className="text-xs text-sky-100 font-semibold mt-0.5">
                Məktəbli və aktiv
              </p>
            </Link>

            {/* Category: 13-18 Years */}
            <Link
              href="/products?age=13-18"
              className="group p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-purple-500 via-indigo-500 to-fuchsia-500 text-white shadow-md shadow-purple-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-white/20 text-4xl font-black select-none pointer-events-none">
                13-18
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-md flex items-center justify-center text-2xl mb-3 shadow-inner group-hover:rotate-6 transition-transform">
                🧢
              </div>
              <h3 className="font-black text-base sm:text-lg leading-tight">
                13 - 18 Yaş
              </h3>
              <p className="text-xs text-purple-100 font-semibold mt-0.5">
                Yeniyetmə & gənc dəbi
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (Mobile-First 2 Columns) */}
      <section className="py-12 sm:py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-rose-100 text-rose-700 mb-2">
                Seçilmiş Modellər ⭐
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Ən Çox Bəyənilən Uşaq Geyimləri
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Lola Kids-in valideynlər tərəfindən ən çox sevilən və tələb görən modelləri
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-rose-600 hover:text-rose-700 hover:underline shrink-0"
            >
              <span>Bütün Məhsullara Bax</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 animate-pulse">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-3xl h-72 border border-slate-100 shadow-xs"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setActiveModalProduct(p)}
                />
              ))}
            </div>
          )}

          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-pink-600 text-white font-black px-8 py-3.5 rounded-full text-xs sm:text-sm shadow-md shadow-rose-200 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Geniş Kataloqa Bax ({products.length} Məhsul)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY LOLA KIDS? (Advantages) */}
      <section id="about" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-rose-100 text-rose-700 mb-2">
              Niyə Lola Kids? 💖
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Valideynlərin Güvəndiyi Sevimli Mağaza
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
              Biz hər bir tikişdə uşaqlarınızın təbəssümünü, rahatlığını və dərisinin sağlamlığını düşünürük.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-pink-50/70 border border-pink-100 text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-pink-500 text-white flex items-center justify-center mb-4 shadow-md shadow-pink-200">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                100% Təbii və Təhlükəsiz
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bütün məhsullarımız antiallergik, boyasız və ya zərərsiz təbii boyalarla hazırlanmış yumşaq pambıq parçalardan tikilir.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/70 border border-amber-100 text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-md shadow-amber-200">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                Hər Yaşa Uyğun Rahat Ölçülər
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                0-2 yaş yenidoğulmuş körpələrdən 18 yaşadək yeniyetmə və gənclərə qədər geniş ölçü çeşidi və sərbəst hərəkət üçün rahat qəliblər.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/70 border border-emerald-100 text-center flex flex-col items-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-200">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mb-2">
                Sürətli Çatdırılma & Canlı WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Bəyəndiyiniz modeli WhatsApp ilə saniyələr içində sifariş edin və ya Abbas Mirzə Şərifzadə küçəsi, 171C ünvanındakı mağazamıza yaxınlaşın.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT & MAP SECTION */}
      <ContactSection />

      {/* Quick view modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </div>
  );
}
