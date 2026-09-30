import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Lola Kids",
  description: "Lola Kids İdarəetmə Paneli",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {children}
    </div>
  );
}
