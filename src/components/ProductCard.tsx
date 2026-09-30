"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  // Gender badge label and style
  const getGenderBadge = (gender: string) => {
    switch (gender) {
      case "Boy":
        return {
          label: "Oğlan",
          classes: "bg-sky-500 text-white border-sky-400",
        };
      case "Girl":
        return {
          label: "Qız",
          classes: "bg-pink-500 text-white border-pink-400",
        };
      default:
        return {
          label: "Unisex",
          classes: "bg-emerald-500 text-white border-emerald-400",
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

  // WhatsApp pre-filled inquiry text
  const priceText = hasDiscount
    ? `Endirimli qiymət: ${Number(product.price).toFixed(2)} AZN (Əsas qiymət: ${Number(
        product.original_price
      ).toFixed(2)} AZN)`
    : `Qiymət: ${Number(product.price).toFixed(2)} AZN`;

  const whatsappUrl = `https://wa.me/994775599099?text=${encodeURIComponent(
    `Salam, Lola Kids! Bu məhsul haqqında məlumat almaq və ya sifariş etmək istəyirəm:\n\n*${product.title}*\n${priceText}\nYaş qrupu: ${product.age_category} yaş\nCins: ${genderInfo.label}`
  )}`;

  return (
    <div className="group bg-white rounded-3xl border border-pink-100/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-pink-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image Box */}
        <div
          className="relative aspect-square w-full bg-slate-100 overflow-hidden cursor-pointer"
          onClick={() => onQuickView && onQuickView(product)}
        >
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 text-xs">
              Şəkil yoxdur
            </div>
          )}

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1">
            <span
              className={`text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 rounded-full border shadow-xs ${genderInfo.classes}`}
            >
              {genderInfo.label}
            </span>
            <span className="text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 rounded-full border bg-amber-400 text-slate-900 border-amber-300 shadow-xs">
              {product.age_category} Yaş
            </span>
          </div>

          {/* Discount Percentage Badge */}
          {hasDiscount && (
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-black text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full shadow-md animate-pulse">
              -{discountPercent}%
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-3 sm:p-4">
          <h3
            onClick={() => onQuickView && onQuickView(product)}
            className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 hover:text-rose-600 transition-colors cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>

          <p className="mt-1 text-[11px] sm:text-xs text-slate-500 line-clamp-1">
            {product.description || "100% pambıq uşaq geyimi"}
          </p>
        </div>
      </div>

      {/* Card Footer: Əsas Qiymət & Endirimli Qiymət */}
      <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-1 flex items-center justify-between gap-2 border-t border-slate-50">
        <div>
          {hasDiscount ? (
            <div>
              <span className="line-through text-slate-400 text-[11px] font-bold block leading-none">
                {Number(product.original_price).toFixed(2)} ₼
              </span>
              <span className="text-base sm:text-lg font-black text-rose-600 tracking-tight leading-tight">
                {Number(product.price).toFixed(2)}{" "}
                <span className="text-xs font-bold text-rose-500">₼</span>
              </span>
            </div>
          ) : (
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">
                Qiymət
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
                {Number(product.price).toFixed(2)}{" "}
                <span className="text-xs font-bold text-rose-500">₼</span>
              </span>
            </div>
          )}
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 sm:gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] active:scale-90 text-white font-black text-[11px] sm:text-xs px-2.5 sm:px-3 py-2 rounded-xl shadow-xs transition-all"
          title="WhatsApp ilə sifariş et"
        >
          {/* WhatsApp SVG Icon */}
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0"
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
          <span>Sifariş</span>
        </a>
      </div>
    </div>
  );
}
