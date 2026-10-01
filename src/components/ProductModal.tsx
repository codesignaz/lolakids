"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product, getProductImages, getProductAgeCategories } from "@/types/product";
import {
  X,
  Phone,
  CheckCircle2,
  Tag,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index whenever a different product is opened
  useEffect(() => {
    setActiveImageIndex(0);
  }, [product?.id]);

  if (!product) return null;

  const images = getProductImages(product);
  const currentImage = images[activeImageIndex] || product.image_url;
  const ageCategories = getProductAgeCategories(product.age_category);

  const getGenderBadge = (gender: string) => {
    switch (gender) {
      case "Boy":
        return {
          label: "Oğlan",
          classes: "bg-sky-500 text-white",
        };
      case "Girl":
        return {
          label: "Qız",
          classes: "bg-pink-500 text-white",
        };
      default:
        return {
          label: "Unisex",
          classes: "bg-emerald-500 text-white",
        };
    }
  };

  const genderInfo = getGenderBadge(product.gender);

  // Discount calculation
  const hasDiscount = Boolean(
    product.original_price && Number(product.original_price) > Number(product.price)
  );

  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.original_price) - Number(product.price)) /
          Number(product.original_price)) *
          100
      )
    : 0;

  const savingsAmount = hasDiscount
    ? (Number(product.original_price) - Number(product.price)).toFixed(2)
    : "0.00";

  const priceText = hasDiscount
    ? `Endirimli qiymət: ${Number(product.price).toFixed(2)} AZN (Əsas qiymət: ${Number(
        product.original_price
      ).toFixed(2)} AZN)`
    : `Qiymət: ${Number(product.price).toFixed(2)} AZN`;

  const whatsappUrl = `https://wa.me/994775599099?text=${encodeURIComponent(
    `Salam, Lola Kids! Bu məhsul haqqında ətraflı məlumat almaq və ya sifariş etmək istəyirəm:\n\n*${product.title}*\n${priceText}\nYaş: ${product.age_category} yaş\nCins: ${genderInfo.label}`
  )}`;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-slate-700 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-md"
          aria-label="Bağla"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Gallery */}
        <div className="relative md:w-1/2 flex flex-col bg-slate-100 shrink-0">
          {/* Main Active Image Container */}
          <div className="relative aspect-square sm:aspect-4/3 md:aspect-auto min-h-[260px] sm:min-h-[300px] md:min-h-[360px] w-full flex-1 overflow-hidden">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={product.title}
                fill
                priority
                className="object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                Şəkil yoxdur
              </div>
            )}

            {/* Badges on Image */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
              <span
                className={`text-xs font-black px-3 py-1 rounded-full shadow-md ${genderInfo.classes}`}
              >
                {genderInfo.label}
              </span>
              {ageCategories.map((age) => (
                <span
                  key={age}
                  className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-400 text-slate-900 shadow-md"
                >
                  {age} Yaş
                </span>
              ))}
            </div>

            {/* Discount Tag Badge on Image */}
            {hasDiscount && (
              <div className="absolute top-3 right-14 sm:right-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>-{discountPercent}% Endirim</span>
              </div>
            )}

            {/* Multi-Image Next / Prev Controls */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-slate-800 hover:bg-white hover:text-rose-600 flex items-center justify-center shadow-md transition-all active:scale-95"
                  aria-label="Əvvəlki şəkil"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-slate-800 hover:bg-white hover:text-rose-600 flex items-center justify-center shadow-md transition-all active:scale-95"
                  aria-label="Növbəti şəkil"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image counter indicator */}
                <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
                  <Images className="w-3 h-3 text-rose-300" />
                  <span>
                    {activeImageIndex + 1} / {images.length}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Multiple Image Thumbnails Strip */}
          {images.length > 1 && (
            <div className="p-2 bg-slate-200/80 border-t border-slate-200 overflow-x-auto flex items-center gap-1.5 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-rose-500 ring-2 ring-rose-300 scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Kiçik şəkil ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 md:w-1/2 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-rose-500 block mb-1">
              Lola Kids Seçimi ✨
            </span>

            <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-tight">
              {product.title}
            </h3>

            {/* Price section: Əsas qiymət və Endirimli qiymət */}
            <div className="mt-3 p-3 bg-rose-50/50 rounded-2xl border border-rose-100">
              {hasDiscount ? (
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-slate-500 font-bold">Əsas qiymət:</span>
                    <span className="line-through text-slate-400 font-bold text-sm">
                      {Number(product.original_price).toFixed(2)} AZN
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-black text-rose-600">
                      {Number(product.price).toFixed(2)}{" "}
                      <span className="text-base font-bold">AZN</span>
                    </span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      Qənaət: {savingsAmount} AZN
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    {Number(product.price).toFixed(2)}{" "}
                    <span className="text-base font-bold">AZN</span>
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mt-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Məhsul Haqqında:
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {product.description ||
                  "Lola Kids uşaq geyimləri ilə balacaların rahatlığı və zərifliyi hər zaman təmin olunur. 100% təbii pambıq, nəfəs alan parça və yüksək keyfiyyət."}
              </p>
            </div>

            {/* Age groups applicable list */}
            {ageCategories.length > 0 && (
              <div className="mt-3.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Uyğun Yaş Qrupları:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {ageCategories.map((age) => (
                    <span
                      key={age}
                      className="px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold"
                    >
                      👶 {age} Yaş
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3.5 space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">100% Təbii və yumşaq pambıq</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-semibold">Mağazada canlı yoxlamaq imkanı</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-3.5 px-4 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/30 active:scale-95"
            >
              {/* WhatsApp SVG Icon */}
              <svg
                className="w-5 h-5 fill-current"
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
              <span>WhatsApp ilə Sifariş Et</span>
            </a>

            <a
              href="tel:+994775599099"
              className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors active:scale-95"
            >
              <Phone className="w-4 h-4 text-rose-500" />
              <span>Zəng et: +994 77 559 90 99</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
