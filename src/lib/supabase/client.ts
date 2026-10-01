import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  Product,
  ProductInput,
  getProductImages,
  getProductAgeCategories,
} from "@/types/product";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes("your-supabase-url") &&
    !supabaseAnonKey.includes("your-anon-key")
  );
};

// Singleton client instance
let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      supabaseUrl || "https://placeholder.supabase.co",
      supabaseAnonKey || "placeholder-key",
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    );
  }
  return supabaseInstance;
};

export const supabase = getSupabase();

/**
 * Storage helper: Upload product image to 'product-images' bucket
 */
export async function uploadProductImage(file: File): Promise<string> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured yet. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
    );
  }

  const client = getSupabase();
  const fileExt = file.name.split(".").pop();
  const cleanFileName = file.name
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/\.[^/.]+$/, "");
  const fileName = `${Date.now()}_${cleanFileName}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await client.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: publicUrlData } = client.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

/**
 * Köməkçi: Supabase-dən gələn sətri Product obyektinə çevirir və şəkillər/yaşları normallaşdırır
 */
export function formatProductFromDb(row: any): Product {
  const images = getProductImages(row);
  const ageCategories = getProductAgeCategories(row.age_category);
  return {
    ...row,
    image_url: images[0] || row.image_url || "",
    images: images.length > 0 ? images : (row.image_url ? [row.image_url] : []),
    age_categories: ageCategories,
  };
}

/**
 * Köməkçi: Supabase bazasına yazılarkən xətaların qarşısını almaq üçün təhlükəsiz payload hazırlayır
 */
export function preparePayloadForDb(product: Partial<ProductInput>): any {
  const payload: any = { ...product };

  // Şəkillər massivdirsə, bazada image_url sütununda vergüllə saxlanılır
  if (Array.isArray(payload.images) && payload.images.length > 0) {
    payload.image_url = payload.images.filter(Boolean).join(",");
  }
  delete payload.images;

  // Çoxsaylı yaş kateqoriyaları varsa, age_category sütununda vergüllə saxlanılır
  if (Array.isArray(payload.age_categories) && payload.age_categories.length > 0) {
    payload.age_category = payload.age_categories.filter(Boolean).join(", ");
  }
  delete payload.age_categories;

  return payload;
}

/**
 * Fetch all products from Supabase
 */
export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const client = getSupabase();
  const { data, error } = await client
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products from Supabase:", error);
    throw error;
  }

  return ((data || []) as any[]).map(formatProductFromDb);
}

/**
 * Add a new product
 */
export async function addProduct(product: ProductInput): Promise<Product> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured yet. Please set environment variables."
    );
  }

  const client = getSupabase();
  const dbPayload = preparePayloadForDb(product);

  const { data, error } = await client
    .from("products")
    .insert([dbPayload])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return formatProductFromDb(data);
}

/**
 * Update an existing product
 */
export async function updateProduct(
  id: string,
  product: Partial<ProductInput>
): Promise<Product> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured yet. Please set environment variables."
    );
  }

  const client = getSupabase();
  const dbPayload = preparePayloadForDb(product);

  const { data, error } = await client
    .from("products")
    .update({ ...dbPayload, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return formatProductFromDb(data);
}

/**
 * Delete a product by ID
 */
export async function deleteProduct(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured yet. Please set environment variables."
    );
  }

  const client = getSupabase();
  const { error } = await client.from("products").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
