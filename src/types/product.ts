export type AgeCategory = "0-2" | "3-5" | "6-12" | "13-18" | string;
export type Gender = "Boy" | "Girl" | "Unisex";

export const AGE_CATEGORY_OPTIONS = [
  { id: "0-2", label: "0 - 2 Yaş (Körpə)" },
  { id: "3-5", label: "3 - 5 Yaş" },
  { id: "6-12", label: "6 - 12 Yaş" },
  { id: "13-18", label: "13 - 18 Yaş (Yeniyetmə)" },
] as const;

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // Endirimli qiymət (cari satış qiyməti)
  original_price?: number | null; // Əsas qiymət (əvvəlki/standart qiymət, cızılmış)
  age_category: AgeCategory; // Saxlanılan əsas yaş dəyəri və ya vergüllə ayrılmış yaşlar (məs: "0-2, 3-5")
  age_categories?: AgeCategory[]; // Çoxsaylı seçilmiş yaş kateqoriyaları
  gender: Gender;
  image_url: string; // Əsas/ilk şəkil linki
  images?: string[]; // Bütün əlavə edilmiş şəkillər
  created_at?: string;
  updated_at?: string;
}

export type ProductInput = Omit<Product, "id" | "created_at" | "updated_at">;

/**
 * Məhsulun bütün şəkillərini massiv kimi qaytaran köməkçi funksiya
 */
export function getProductImages(product?: { image_url?: string; images?: string[] } | null): string[] {
  if (!product) return [];
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    return product.images.filter(Boolean);
  }
  if (!product.image_url) return [];
  const trimmed = product.image_url.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {}
  }
  if (trimmed.includes(",")) {
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [trimmed];
}

/**
 * Məhsulun yaş kateqoriyalarını massiv kimi qaytaran köməkçi funksiya
 */
export function getProductAgeCategories(ageCategory?: string | null): string[] {
  if (!ageCategory) return [];
  return ageCategory
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
