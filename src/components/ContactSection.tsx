"use client";

import React from "react";
import { Phone, MapPin, Clock, ExternalLink, Navigation } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-20 bg-rose-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase bg-rose-100 text-rose-700 mb-2">
            Bizimlə Əlaqə 📍
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Mağazamızda Sizi Gözləyirik!
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
            Körpəniz üçün ən uyğun ölçü və modeli seçmək üçün mağazamıza yaxınlaşa və ya birbaşa WhatsApp ilə əlaqə saxlaya bilərsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Phone Card */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-rose-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-200">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                    Telefon Nömrələri
                  </h3>
                  <div className="space-y-1">
                    <div>
                      <a
                        href="tel:+994775599099"
                        className="text-base sm:text-lg font-black text-slate-900 hover:text-rose-600 transition-colors"
                      >
                        +994 77 559 90 99
                      </a>
                    </div>
                    <div>
                      <a
                        href="tel:+994775699099"
                        className="text-base sm:text-lg font-black text-slate-900 hover:text-rose-600 transition-colors"
                      >
                        +994 77 569 90 99
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Zəng və ya WhatsApp vasitəsilə 7/24 sifariş verə bilərsiniz.
                  </p>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-amber-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-200">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                    Mağazamızın Ünvanı
                  </h3>
                  <p className="text-sm sm:text-base font-black text-slate-900 mb-3">
                    Bakı, Yasamal rayonu, Abbas Mirzə Şərifzadə küçəsi, 171C
                  </p>
                  <a
                    href="https://maps.app.goo.gl/b84PAJuB4GAPBbSu8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-400" />
                    <span>Xəritədə Marşrut Qur</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hours & Instant WhatsApp */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-emerald-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-200">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                    İş Qrafiki
                  </h3>
                  <p className="text-sm font-black text-slate-900">
                    Hər gün: 08:30 - 20:00
                  </p>
                  <div className="mt-3.5 pt-3 border-t border-slate-100">
                    <a
                      href="https://wa.me/994775599099?text=Salam,%20Lola%20Kids!%20M%C9%99hsullar%20bar%C9%99d%C9%99%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 active:scale-95"
                    >
                      {/* WhatsApp SVG Icon */}
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
                      <span>WhatsApp ilə Canlı Yazın</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map iframe */}
          <div className="lg:col-span-7 bg-white p-3 rounded-3xl border border-rose-100 shadow-xs overflow-hidden flex flex-col min-h-[360px]">
            <div className="relative w-full h-full min-h-[340px] rounded-2xl overflow-hidden border border-slate-100">
              <iframe
                title="Lola Kids Mağazası - Bakı, Yasamal rayonu, Abbas Mirzə Şərifzadə küçəsi, 171C"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1519.1!2d49.8040573!3d40.3799457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0060b1e521%3A0xf4238d8f5c8d9c79!2zVcWfYXEgbWFsbGFywLE!5e0!3m2!1saz!2saz!4v1710000000000!5m2!1saz!2saz"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "340px" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-md border border-slate-100 flex items-center justify-between gap-3 text-xs">
                <span className="font-bold text-slate-800">
                  📍 Yasamal r-nu, A.M. Şərifzadə küç., 171C
                </span>
                <a
                  href="https://maps.app.goo.gl/b84PAJuB4GAPBbSu8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-black text-rose-600 hover:text-rose-700 hover:underline shrink-0"
                >
                  Xəritədə aç ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
