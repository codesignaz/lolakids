import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Heart, Clock, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          {/* Column 1: Store Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 shadow-md shrink-0">
                <Image
                  src="/logo.png"
                  alt="Lola Kids Loqo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Lola <span className="text-rose-400">Kids</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Lola Kids - Bakıda körpələr və uşaqlar üçün ən zərif, keyfiyyətli və rahat geyimlər ünvanı. 100% təbii pambıq parçalar, müasir dəb və münasib qiymətlər.
            </p>
            <div className="flex items-center gap-2 text-xs text-rose-300 bg-rose-950/50 border border-rose-900/60 px-3 py-1.5 rounded-xl w-fit">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>Övladlarınız üçün sevgi ilə seçilmiş</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Bölmələr
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-rose-400 transition-colors inline-block"
                >
                  Əsas Səhifə
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-rose-400 transition-colors inline-block"
                >
                  Bütün Məhsullar (Kataloq)
                </Link>
              </li>
              <li>
                <Link
                  href="/products?age=0-2"
                  className="hover:text-rose-400 transition-colors inline-block"
                >
                  👶 0-2 Yaş Körpə Geyimləri
                </Link>
              </li>
              <li>
                <Link
                  href="/products?age=3-5"
                  className="hover:text-rose-400 transition-colors inline-block"
                >
                  🧒 3-5 Yaş Uşaq Geyimləri
                </Link>
              </li>
              <li>
                <Link
                  href="/products?age=6-12"
                  className="hover:text-rose-400 transition-colors inline-block"
                >
                  🎒 6-12 Yaş Məktəbli Dəbi
                </Link>
              </li>
              <li>
                <Link
                  href="/products?age=13-18"
                  className="hover:text-rose-400 transition-colors inline-block"
                >
                  🧢 13-18 Yaş Yeniyetmə Dəbi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Əlaqə Məlumatları
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-rose-400 mt-1 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+994775599099"
                    className="hover:text-white font-bold transition-colors"
                  >
                    +994 77 559 90 99
                  </a>
                  <a
                    href="tel:+994775699099"
                    className="hover:text-white font-bold transition-colors"
                  >
                    +994 77 569 90 99
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-slate-300">
                    Bakı, Yasamal rayonu, Abbas Mirzə Şərifzadə küçəsi, 171C
                  </span>
                  <a
                    href="https://maps.app.goo.gl/b84PAJuB4GAPBbSu8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 underline font-bold"
                  >
                    <span>Xəritədə bax</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp Action */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              İş Saatları & Sifariş
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hər gün: 10:00 - 21:00</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bakı daxilində sürətli kuryer çatdırılması və mağazadan birbaşa təhvil alma.
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/994775599099?text=Salam,%20Lola%20Kids!%20M%C9%99hsullar%20bar%C9%99d%C9%99%20m%C9%99lumat%20almaq%20ist%C9%99yir%C9%99m."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-3 px-4 rounded-2xl text-xs transition-all shadow-md shadow-emerald-900/30 active:scale-95"
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
                  <span>WhatsApp ilə Sual Ver</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {currentYear} Lola Kids - Uşaq Geyimləri Mağazası. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  );
}
