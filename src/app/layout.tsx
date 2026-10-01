import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FF3366",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lolakids.az"),
  title: "Lola Kids - Uşaq Geyimləri | Bakı",
  description:
    "Lola Kids - Bakıda körpələr, uşaqlar və yeniyetmələr üçün ən zərif, keyfiyyətli və rahat geyimlər mağazası. 0-18 yaş oğlan və qızlar üçün canlı və dəbli geyim kolleksiyası.",
  keywords: [
    "Lola Kids",
    "Uşaq Geyimləri",
    "Bakı uşaq geyimləri",
    "uşaq paltarları",
    "körpə geyimləri",
    "qız uşaq geyimləri",
    "oğlan uşaq geyimləri",
    "0-2 yaş uşaq geyimi",
    "3-5 yaş uşaq geyimi",
    "6-12 yaş uşaq geyimi",
    "13-18 yaş yeniyetmə geyimi",
    "0-18 yaş uşaq dəbi",
    "uşaq dəbi Bakı",
    "Abbas Mirzə Şərifzadə 171C",
    "Yasamal uşaq geyimləri",
  ],
  authors: [{ name: "Lola Kids" }],
  creator: "Lola Kids",
  publisher: "Lola Kids",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    title: "Lola Kids - Uşaq Geyimləri (0-18 Yaş)",
    description:
      "Bakıda keyfiyyətli və dəbli uşaq və yeniyetmə geyimləri mağazası. 0-18 yaş üçün 100% təbii pambıq, rahat və münasib qiymətlər.",
    url: "https://lolakids.az",
    siteName: "Lola Kids",
    locale: "az_AZ",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Lola Kids - Uşaq Geyimləri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lola Kids - Uşaq Geyimləri (0-18 Yaş)",
    description:
      "Bakıda keyfiyyətli və dəbli uşaq və yeniyetmə geyimləri mağazası. 0-18 yaş uşaq geyimləri.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "Lola Kids",
    description: "Uşaq Geyimləri Mağazası - Bakı",
    telephone: ["+994775599099", "+994775699099"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bakı, Yasamal rayonu, Abbas Mirzə Şərifzadə küçəsi, 171C",
      addressLocality: "Baku",
      addressCountry: "AZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.3799457,
      longitude: 49.8040573,
    },
    hasMap: "https://maps.app.goo.gl/b84PAJuB4GAPBbSu8",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:30",
        closes: "20:00",
      },
    ],
  };

  return (
    <html
      lang="az"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50/50 text-slate-900 font-sans selection:bg-pink-300 selection:text-pink-950">
        {children}
      </body>
    </html>
  );
}
