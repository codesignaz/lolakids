export type AgeCategory = "0-2" | "3-5" | "6-12" | "13-18" | string;
export type Gender = "Boy" | "Girl" | "Unisex";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number; // Endirimli qiymət (cari satış qiyməti)
  original_price?: number | null; // Əsas qiymət (əvvəlki/standart qiymət, cızılmış)
  age_category: AgeCategory;
  gender: Gender;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

export type ProductInput = Omit<Product, "id" | "created_at" | "updated_at">;
