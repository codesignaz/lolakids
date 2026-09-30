"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";
import { getProducts, isSupabaseConfigured } from "@/lib/supabase/client";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import {
  Search,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  X,
  SlidersHorizontal,
} from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialGender = searchParams.get("gender") || "All";
  const initialAge = searchParams.get("age") || "All";

  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGender, setSelectedGender] = useState<string>(initialGender);
  const [selectedAge, setSelectedAge] = useState<string>(initialAge);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(
    null
  );

  // Load products from Supabase
  useEffect(() => {
    async function fetchCatalog() {
      setLoading(true);
      if (isSupabaseConfigured()) {
        try {
          const supabaseData = await getProducts();
          if (supabaseData && supabaseData.length > 0) {
            setProducts(supabaseData);
          }
        } catch (err) {
          console.warn("Could not load products from Supabase, using sample list:", err);
        }
      }
      setLoading(false);
    }

    fetchCatalog();
  }, []);

  // Update filters if URL parameters change
  useEffect(() => {
    const g = searchParams.get("gender");
    const a = searchParams.get("age");
    if (g) setSelectedGender(g);
    if (a) setSelectedAge(a);
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Gender filter
        if (selectedGender !== "All" && p.gender !== selectedGender) {
          return false;
        }

        // Age filter
        if (selectedAge !== "All" && p.age_category !== selectedAge) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = (p.description || "").toLowerCase().includes(q);
          if (!matchTitle && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest") {
          return (
            new Date(b.created_at || "").getTime() -
            new Date(a.created_at || "").getTime()
          );
        }
        return 0; // default featured
      });
  }, [products, selectedGender, selectedAge, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedGender("All");
    setSelectedAge("All");
    setSearchQuery("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedGender !== "All" ||
    selectedAge !== "All" ||
    searchQuery.trim() !== "" ||
    sortBy !== "featured";

  // Category quick filter chips
  const quickFilters = [
    { label: "Bütün Kolleksiya", type: "all" },
    { label: "👶 0-2 Yaş (Körpə)", type: "age", val: "0-2" },
    { label: "🧒 3-5 Yaş", type: "age", val: "3-5" },
    { label: "🎒 6-12 Yaş", type: "age", val: "6-12" },
    { label: "🧢 13-18 Yaş (Gənc)", type: "age", val: "13-18" },
    { label: "👗 Qız Uşaq", type: "gender", val: "Girl" },
    { label: "👕 Oğlan Uşaq", type: "gender", val: "Boy" },
    { label: "🌿 Unisex", type: "gender", val: "Unisex" },
  ];

  return (
    <div className="bg-slate-50/70 min-h-screen py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Page Banner / Header */}
        <div className="mb-6 sm:mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Geniş Çeşid • 100% Pambıq</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Uşaq və Yeniyetmə Geyimləri Kataloqu
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            0-18 yaş körpə, uşaq və yeniyetmələr üçün ən dəbli və rahat modelləri asanlıqla seçin
          </p>
        </div>

        {/* MOBILE-FIRST HORIZONTAL CHIPS SCROLL */}
        <div className="mb-4 overflow-x-auto no-scrollbar flex items-center gap-2 py-1 -mx-3 px-3 sm:mx-0 sm:px-0">
          {quickFilters.map((chip, idx) => {
            const isActive =
              chip.type === "all"
                ? selectedGender === "All" && selectedAge === "All"
                : chip.type === "age"
                ? selectedAge === chip.val
                : selectedGender === chip.val;

            return (
              <button
                key={idx}
                onClick={() => {
                  if (chip.type === "all") {
                    setSelectedGender("All");
                    setSelectedAge("All");
                  } else if (chip.type === "age") {
                    setSelectedAge(chip.val!);
                  } else if (chip.type === "gender") {
                    setSelectedGender(chip.val!);
                  }
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                  isActive
                    ? "bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white shadow-md shadow-pink-200"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-pink-300"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-3.5 sm:p-5 rounded-3xl border border-pink-100 shadow-xs mb-6 sm:mb-8 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Model və ya məhsul adı axtarın..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Age Filter Dropdown & Sort */}
            <div className="md:col-span-6 grid grid-cols-2 gap-2">
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 focus:outline-none focus:border-rose-500"
              >
                <option value="All">Bütün Yaşlar (0-18)</option>
                <option value="0-2">👶 0 - 2 Yaş (Körpə)</option>
                <option value="3-5">🧒 3 - 5 Yaş</option>
                <option value="6-12">🎒 6 - 12 Yaş</option>
                <option value="13-18">🧢 13 - 18 Yaş (Gənc)</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-xs font-bold text-slate-700 focus:outline-none focus:border-rose-500"
              >
                <option value="featured">Seçilmişlər</option>
                <option value="price-asc">Qiymət: Ən Ucuz</option>
                <option value="price-desc">Qiymət: Ən Baha</option>
                <option value="newest">Ən Yenilər</option>
              </select>
            </div>
          </div>

          {/* Active filter summary pill */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Tapılan məhsul: <strong>{filteredProducts.length}</strong> ədəd
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-rose-600 hover:underline font-bold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Filterləri sıfırla</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid (Mobile-First 2 Columns) */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl h-72 border border-slate-100 shadow-xs"
              />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setActiveModalProduct(p)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-md mx-auto border border-pink-100">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-1">
              Məhsul tapılmadı
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Axtarışınıza və ya seçdiyiniz filterə uyğun məhsul tapılmadı.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black px-5 py-2.5 rounded-full text-xs transition-colors shadow-md active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Filterləri Sıfırla</span>
            </button>
          </div>
        )}

        {/* Quick view modal */}
        <ProductModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
