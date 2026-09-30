"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  // Auto show a friendly floating tooltip after 3 seconds for engagement
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappPhone = "994775599099";
  const defaultMessage = encodeURIComponent(
    "Salam, Lola Kids! Mağazanız və uşaq geyimləri barədə məlumat almaq istəyirəm."
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="WhatsApp Canlı Dəstək"
      className="hidden md:flex fixed bottom-7 right-7 z-50 flex-col items-end pointer-events-none"
    >
      {/* Playful Floating Speech Bubble / Tooltip */}
      {hasPrompted && (
        <div className="pointer-events-auto mb-3 max-w-[280px] sm:max-w-xs bg-white rounded-2xl p-3.5 shadow-2xl border-2 border-emerald-400 text-slate-800 animate-bounce-slow relative transition-all">
          <button
            onClick={() => setHasPrompted(false)}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs hover:bg-rose-500 transition-colors shadow-md"
            aria-label="Bildirişi bağla"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">
              Lola Kids Online • Canlı Əlaqə
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Salam! 👋 Övladınız üçün uyğun ölçü və ya model seçməkdə kömək edək?
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs py-2 px-3 rounded-xl transition-all shadow-md active:scale-95"
          >
            {/* WhatsApp Mini SVG */}
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
            <span>WhatsApp ilə Yaz</span>
          </a>
        </div>
      )}

      {/* Main Floating WhatsApp Circular Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ilə əlaqə saxlayın"
        className="pointer-events-auto group relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_35px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse-glow"
      >
        {/* Unread badge dot */}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-black text-[11px] flex items-center justify-center border-2 border-white shadow-md">
          1
        </span>

        {/* WhatsApp Icon */}
        <svg
          className="w-8 h-8 md:w-9 md:h-9 fill-current transition-transform duration-300 group-hover:rotate-6"
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

        {/* Hover label for desktop */}
        <span className="hidden md:group-hover:block absolute right-full mr-3.5 bg-slate-900/90 text-white text-xs font-bold py-1.5 px-3 rounded-xl whitespace-nowrap shadow-xl backdrop-blur-md">
          WhatsApp ilə Sifariş & Əlaqə
        </span>
      </a>
    </aside>
  );
}
