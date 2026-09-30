import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppWidget />
      {/* Mobile-First Sticky Bottom Dock */}
      <MobileNav />
    </div>
  );
}
