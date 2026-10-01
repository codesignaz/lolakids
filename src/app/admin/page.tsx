"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  getSupabase,
  isSupabaseConfigured,
  uploadProductImage,
  formatProductFromDb,
} from "@/lib/supabase/client";
import {
  Product,
  ProductInput,
  Gender,
  AgeCategory,
  AGE_CATEGORY_OPTIONS,
  getProductImages,
  getProductAgeCategories,
} from "@/types/product";
import {
  Lock,
  Mail,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle2,
  Package,
  Search,
  X,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Star,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminPage() {
  const [configured, setConfigured] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedGenderFilter, setSelectedGenderFilter] = useState("All");

  // Modal form state (Add/Edit)
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState<string>("");
  const [formOriginalPrice, setFormOriginalPrice] = useState<string>("");
  const [formAges, setFormAges] = useState<string[]>(["0-2"]);
  const [formGender, setFormGender] = useState<Gender>("Unisex");

  // Multi-image state
  const [imagesList, setImagesList] = useState<
    Array<{
      id: string;
      url?: string;
      file?: File;
      preview: string;
    }>
  >([]);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Initial Auth Check
  useEffect(() => {
    const isConfig = isSupabaseConfigured();
    setConfigured(isConfig);

    if (!isConfig) {
      setAuthLoading(false);
      return;
    }

    const client = getSupabase();

    // Check existing session
    client.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
      if (session?.user) {
        fetchProductsList();
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProductsList();
      } else {
        setProducts([]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch products
  const fetchProductsList = async () => {
    setDataLoading(true);
    try {
      const client = getSupabase();
      const { data, error } = await client
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts((data || []).map(formatProductFromDb));
    } catch (err: any) {
      console.error("Məhsulları yükləyərkən xəta baş verdi:", err);
      setStatusMessage({
        type: "error",
        text: "Məhsullar yüklənərkən xəta: " + (err.message || err),
      });
    } finally {
      setDataLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError(null);

    try {
      const client = getSupabase();
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setUser(data.user);
    } catch (err: any) {
      console.error("Login error:", err);
      setAuthError(
        err.message === "Invalid login credentials"
          ? "Daxil edilən email və ya şifrə yanlışdır."
          : err.message || "Giriş zamanı xəta baş verdi."
      );
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      const client = getSupabase();
      await client.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingProduct(null);
    setFormTitle("");
    setFormDescription("");
    setFormPrice("");
    setFormOriginalPrice("");
    setFormAges(["0-2"]);
    setFormGender("Unisex");
    setImagesList([]);
    setCustomImageUrl("");
    setFormError(null);
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormTitle(product.title);
    setFormDescription(product.description || "");
    setFormPrice(product.price.toString());
    setFormOriginalPrice(
      product.original_price ? product.original_price.toString() : ""
    );
    const ages = getProductAgeCategories(product.age_category);
    setFormAges(ages.length > 0 ? ages : ["0-2"]);
    setFormGender(product.gender);

    const imgs = getProductImages(product);
    setImagesList(
      imgs.map((url, idx) => ({
        id: `existing-${idx}-${Date.now()}`,
        url,
        preview: url,
      }))
    );
    setCustomImageUrl("");
    setFormError(null);
    setModalOpen(true);
  };

  // Handle multiple image files selection
  const handleMultipleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems: Array<{
      id: string;
      url?: string;
      file?: File;
      preview: string;
    }> = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError(`"${file.name}" faylının həcmi 5MB-dan çoxdur.`);
        continue;
      }
      newItems.push({
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        preview: URL.createObjectURL(file),
      });
    }

    if (newItems.length > 0) {
      setImagesList((prev) => [...prev, ...newItems]);
      setFormError(null);
    }
    e.target.value = "";
  };

  // Handle adding image via URL
  const handleAddImageUrl = () => {
    const url = customImageUrl.trim();
    if (!url) return;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setFormError(
        "Düzgün şəkil linki daxil edin (http:// və ya https:// ilə başlamalıdır)."
      );
      return;
    }
    setImagesList((prev) => [
      ...prev,
      {
        id: `url-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        url,
        preview: url,
      },
    ]);
    setCustomImageUrl("");
    setFormError(null);
  };

  // Set selected image as the primary (cover) image
  const setAsPrimaryImage = (index: number) => {
    if (index === 0) return;
    setImagesList((prev) => {
      const item = prev[index];
      const remaining = prev.filter((_, i) => i !== index);
      return [item, ...remaining];
    });
  };

  // Remove image from list
  const removeImage = (index: number) => {
    setImagesList((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle age category selection
  const toggleAgeCategory = (ageId: string) => {
    setFormAges((prev) => {
      if (prev.includes(ageId)) {
        if (prev.length === 1) {
          setFormError("Məhsul üçün ən azı 1 yaş kateqoriyası seçilməlidir.");
          return prev;
        }
        setFormError(null);
        return prev.filter((a) => a !== ageId);
      } else {
        setFormError(null);
        return [...prev, ageId];
      }
    });
  };

  // Handle Save Product (Add or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formTitle.trim()) {
      setFormError("Məhsulun adı tələb olunur.");
      return;
    }

    const priceNum = parseFloat(formPrice);
    if (isNaN(priceNum) || priceNum < 0) {
      setFormError("Zəhmət olmasa düzgün satış qiyməti daxil edin.");
      return;
    }

    const origPriceNum = formOriginalPrice ? parseFloat(formOriginalPrice) : null;
    if (formOriginalPrice && (isNaN(origPriceNum!) || origPriceNum! < 0)) {
      setFormError("Zəhmət olmasa düzgün əsas qiymət daxil edin.");
      return;
    }

    if (formAges.length === 0) {
      setFormError("Ən azı 1 yaş kateqoriyası seçilməlidir.");
      return;
    }

    if (imagesList.length === 0) {
      setFormError("Məhsul üçün ən azı 1 şəkil əlavə edilməlidir.");
      return;
    }

    setFormSubmitting(true);

    try {
      setUploadingImage(true);
      const finalImageUrls: string[] = [];

      for (const item of imagesList) {
        if (item.url) {
          finalImageUrls.push(item.url);
        } else if (item.file) {
          const uploadedUrl = await uploadProductImage(item.file);
          finalImageUrls.push(uploadedUrl);
        }
      }
      setUploadingImage(false);

      const client = getSupabase();
      const productPayload: any = {
        title: formTitle.trim(),
        description: formDescription.trim(),
        price: priceNum,
        original_price: origPriceNum && !isNaN(origPriceNum) ? origPriceNum : null,
        age_category: formAges.join(", "),
        gender: formGender,
        image_url: finalImageUrls.join(","),
      };

      if (editingProduct) {
        // Update existing
        const { error } = await client
          .from("products")
          .update({
            ...productPayload,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingProduct.id);

        if (error) throw error;

        setStatusMessage({
          type: "success",
          text: `"${formTitle}" məhsulu uğurla yeniləndi!`,
        });
      } else {
        // Insert new
        const { error } = await client
          .from("products")
          .insert([productPayload]);

        if (error) throw error;

        setStatusMessage({
          type: "success",
          text: `"${formTitle}" məhsulu uğurla əlavə edildi!`,
        });
      }

      setModalOpen(false);
      await fetchProductsList();
    } catch (err: any) {
      console.error("Save product error:", err);
      setFormError(
        err.message ||
          "Məhsulu yadda saxlayarkən xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."
      );
    } finally {
      setFormSubmitting(false);
      setUploadingImage(false);
    }
  };

  // Handle Delete
  const handleDeleteProduct = async (id: string) => {
    setDeleting(true);
    try {
      const client = getSupabase();
      const { error } = await client.from("products").delete().eq("id", id);
      if (error) throw error;

      setStatusMessage({
        type: "success",
        text: "Məhsul uğurla silindi.",
      });
      setDeleteConfirmId(null);
      await fetchProductsList();
    } catch (err: any) {
      console.error("Delete error:", err);
      setStatusMessage({
        type: "error",
        text: "Məhsul silinərkən xəta baş verdi: " + (err.message || err),
      });
    } finally {
      setDeleting(false);
    }
  };

  // Filtered products in admin list
  const filteredProducts = products.filter((p) => {
    if (selectedGenderFilter !== "All" && p.gender !== selectedGenderFilter) {
      return false;
    }
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.age_category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate statistics
  const totalCount = products.length;
  const boysCount = products.filter((p) => p.gender === "Boy").length;
  const girlsCount = products.filter((p) => p.gender === "Girl").length;
  const unisexCount = products.filter((p) => p.gender === "Unisex").length;

  // Auto-hide status banner after 5s
  useEffect(() => {
    if (statusMessage) {
      const t = setTimeout(() => setStatusMessage(null), 5000);
      return () => clearTimeout(t);
    }
  }, [statusMessage]);

  // Loading state
  if (authLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Service unavailable screen
  if (!configured) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 min-h-screen bg-slate-950">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Sistem Xidməti Əlçatmazdır
          </h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            İdarəetmə bazasına qoşulmaq mümkün olmadı. Zəhmət olmasa bir qədər sonra yenidən cəhd edin və ya sistem administratoru ilə əlaqə saxlayın.
          </p>
        </div>
      </div>
    );
  }

  // 1. LOGIN SCREEN (If not authenticated)
  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 min-h-screen bg-slate-950">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 shadow-lg border border-slate-700 bg-white p-1">
              <Image
                src="/logo.png"
                alt="Lola Kids"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Lola Kids İdarəetmə Paneli
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Mağaza idarəetmə panelinə daxil olmaq üçün məlumatlarınızı qeyd edin
            </p>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Email Ünvanı
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-poçt ünvanınızı daxil edin"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Şifrə
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrənizi daxil edin"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3.5 px-4 rounded-2xl text-sm transition-all duration-200 shadow-lg shadow-rose-900/30 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loginLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Daxil olunur...</span>
                </>
              ) : (
                <span>Daxil Ol</span>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Təhlükəsiz İdarəetmə Paneli</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Bu sahə yalnız səlahiyyətli mağaza əməkdaşları üçündür.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. DASHBOARD VIEW (Authenticated)
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-950">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-1 shadow-md shrink-0">
              <Image
                src="/logo.png"
                alt="Lola Kids"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block">
                Lola Kids <span className="text-rose-400">Admin</span>
              </span>
              <span className="text-[11px] text-slate-400 block font-mono">
                {user?.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-rose-900/30"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Məhsul</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 transition-colors"
              title="Çıxış et"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Çıxış</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Status Toast / Alert Banner */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm animate-fadeIn ${
              statusMessage.type === "success"
                ? "bg-emerald-950/60 border border-emerald-800 text-emerald-300"
                : "bg-rose-950/60 border border-rose-800 text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="p-1 hover:opacity-80"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Ümumi Məhsul
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">
                {totalCount}
              </span>
              <span className="text-xs text-slate-400">ədəd</span>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block mb-1">
              Qız Geyimləri
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-pink-400">
                {girlsCount}
              </span>
              <span className="text-xs text-slate-400">ədəd</span>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
              Oğlan Geyimləri
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-sky-400">
                {boysCount}
              </span>
              <span className="text-xs text-slate-400">ədəd</span>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Unisex Modellər
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400">
                {unisexCount}
              </span>
              <span className="text-xs text-slate-400">ədəd</span>
            </div>
          </div>
        </div>

        {/* Control Bar: Search & Filter */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Məhsulları ada görə axtarın..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Gender Filter Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-400 font-semibold mr-1">
              Filtr:
            </span>
            {["All", "Girl", "Boy", "Unisex"].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenderFilter(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedGenderFilter === g
                    ? "bg-rose-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {g === "All"
                  ? "Hamısı"
                  : g === "Girl"
                  ? "Qız"
                  : g === "Boy"
                  ? "Oğlan"
                  : "Unisex"}
              </button>
            ))}

            <button
              onClick={fetchProductsList}
              disabled={dataLoading}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Yenilə"
            >
              <RefreshCw
                className={`w-4 h-4 ${dataLoading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          {dataLoading ? (
            <div className="p-16 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px] bg-slate-950/40">
                    <th className="py-3.5 px-4">Şəkil</th>
                    <th className="py-3.5 px-4">Məhsul Adı</th>
                    <th className="py-3.5 px-4">Yaş Qrupu</th>
                    <th className="py-3.5 px-4">Cins</th>
                    <th className="py-3.5 px-4">Qiymət</th>
                    <th className="py-3.5 px-4 text-right">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Image Thumbnail */}
                      <td className="py-3 px-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                          {product.image_url ? (
                            <Image
                              src={product.image_url}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600 text-[10px]">
                              Yoxdur
                            </div>
                          )}
                          {product.images && product.images.length > 1 && (
                            <div className="absolute bottom-0 right-0 bg-slate-900/90 text-[9px] font-bold text-rose-300 px-1 rounded-tl-md flex items-center gap-0.5">
                              <ImageIcon className="w-2.5 h-2.5" />
                              <span>{product.images.length}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Title & Description */}
                      <td className="py-3 px-4 max-w-xs">
                        <span className="font-bold text-white block line-clamp-1">
                          {product.title}
                        </span>
                        <span className="text-[11px] text-slate-400 block line-clamp-1 mt-0.5">
                          {product.description || "Təsvir qeyd edilməyib"}
                        </span>
                      </td>

                      {/* Age Category */}
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                          {getProductAgeCategories(product.age_category).map((age) => (
                            <span
                              key={age}
                              className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-semibold text-[11px] whitespace-nowrap"
                            >
                              {age} Yaş
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Gender */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                            product.gender === "Girl"
                              ? "bg-pink-500/10 border-pink-500/20 text-pink-300"
                              : product.gender === "Boy"
                              ? "bg-sky-500/10 border-sky-500/20 text-sky-300"
                              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                          }`}
                        >
                          {product.gender === "Girl"
                            ? "Qız"
                            : product.gender === "Boy"
                            ? "Oğlan"
                            : "Unisex"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {product.original_price &&
                        Number(product.original_price) > Number(product.price) ? (
                          <div className="flex flex-col">
                            <span className="line-through text-slate-500 text-[11px] font-semibold">
                              {Number(product.original_price).toFixed(2)} ₼
                            </span>
                            <span className="font-black text-rose-400 text-sm flex items-center gap-1.5">
                              <span>{Number(product.price).toFixed(2)} ₼</span>
                              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded font-bold">
                                -{Math.round(
                                  ((Number(product.original_price) -
                                    Number(product.price)) /
                                    Number(product.original_price)) *
                                    100
                                )}%
                              </span>
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-white text-sm">
                            {Number(product.price).toFixed(2)}{" "}
                            <span className="text-xs text-rose-400">₼</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Düzəliş et"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(product.id)}
                            className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty State */
            <div className="py-16 px-4 text-center">
              <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">
                Heç bir məhsul tapılmadı
              </h3>
              <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                Hələlik heç bir məhsul əlavə edilməyib və ya filtrə uyğun nəticə
                yoxdur.
              </p>
              <button
                onClick={openAddModal}
                className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>İlk Məhsulu Əlavə Et</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 3. ADD / EDIT PRODUCT MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {editingProduct
                    ? "Məhsulda Düzəliş Et"
                    : "Yeni Məhsul Əlavə Et"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Lola Kids mağazası üçün tələb olunan bütün məlumatları doldurun
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error in modal */}
            {formError && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveProduct} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Məhsulun Adı (Başlıq) *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Məsələn: Pambıq Körpə Bodi Dəsti"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Təsvir (Məlumat)
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Məhsulun parçası, xüsusiyyətləri haqqında məlumat..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              {/* Price & Gender Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Original / Base Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Əsas Qiymət (AZN)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    placeholder="Məs: 45.00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Cızılmış köhnə qiymət
                  </span>
                </div>

                {/* Selling / Discounted Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Satış Qiyməti (AZN) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="Məs: 35.00"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                  />
                  <span className="text-[10px] text-rose-400 block mt-1">
                    Müştərinin ödədiyi qiymət
                  </span>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Cins *
                  </label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as Gender)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Boy">Oğlan (Boy)</option>
                    <option value="Girl">Qız (Girl)</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
              </div>

              {/* Age Categories (Multi-select) */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Yaş Kateqoriyaları * (Bir neçəsini seçə bilərsiniz)
                  </label>
                  <span className="text-[11px] text-amber-400 font-semibold">
                    {formAges.length} kateqoriya seçilib
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AGE_CATEGORY_OPTIONS.map((opt) => {
                    const isSelected = formAges.includes(opt.id);
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => toggleAgeCategory(opt.id)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex items-center justify-between gap-1.5 active:scale-95 ${
                          isSelected
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                        }`}
                      >
                        <span className="truncate">{opt.label}</span>
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Images Section (Multi-image) */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Məhsulun Şəkilləri * (Bir neçə şəkil əlavə edin)
                  </label>
                  <span className="text-[11px] text-rose-400 font-semibold">
                    {imagesList.length} şəkil əlavə edilib
                  </span>
                </div>

                {/* Upload File Input (supports multiple) */}
                <div className="border-2 border-dashed border-slate-800 hover:border-rose-500/50 rounded-2xl p-4 text-center bg-slate-950/40 transition-colors">
                  <input
                    type="file"
                    id="product-image-upload"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleFilesChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="product-image-upload"
                    className="cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-rose-400 flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-200">
                      Kompüterdən bir və ya bir neçə şəkil seçin
                    </span>
                    <span className="text-[11px] text-slate-400">
                      PNG, JPG, WEBP (Hər biri maks. 5MB) • Birdən çox fayl seçmək mümkündür
                    </span>
                  </label>
                </div>

                {/* Direct Image URL input */}
                <div className="mt-3 flex gap-2">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddImageUrl();
                      }
                    }}
                    placeholder="və ya şəkil linkini daxil edin: https://..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors shrink-0"
                  >
                    + Linki Əlavə Et
                  </button>
                </div>

                {/* Images Preview Grid */}
                {imagesList.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] text-slate-400 font-semibold block">
                      Seçilmiş Şəkillər (İlk şəkil əsas üz qabığı kimi görünür):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {imagesList.map((item, index) => {
                        const isPrimary = index === 0;
                        return (
                          <div
                            key={item.id}
                            className={`relative group rounded-xl overflow-hidden bg-slate-950 border transition-all ${
                              isPrimary
                                ? "border-amber-400 ring-2 ring-amber-400/30 shadow-md"
                                : "border-slate-800 hover:border-slate-700"
                            }`}
                          >
                            <div className="relative aspect-square w-full">
                              <Image
                                src={item.preview}
                                alt={`Şəkil ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                              {/* Primary badge */}
                              {isPrimary ? (
                                <div className="absolute top-1.5 left-1.5 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                                  <Star className="w-3 h-3 fill-current" />
                                  <span>Əsas Şəkil</span>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setAsPrimaryImage(index)}
                                  className="absolute top-1.5 left-1.5 bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors opacity-90 sm:opacity-0 sm:group-hover:opacity-100 flex items-center gap-1"
                                  title="Əsas şəkil et"
                                >
                                  <Star className="w-3 h-3" />
                                  <span>Əsas et</span>
                                </button>
                              )}

                              {/* Remove button */}
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-md bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-md"
                                title="Şəkli sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                              {/* Index tag */}
                              <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                                #{index + 1}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Ləğv et
                </button>

                <button
                  type="submit"
                  disabled={formSubmitting || uploadingImage}
                  className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-md shadow-rose-900/30 disabled:opacity-50"
                >
                  {formSubmitting || uploadingImage ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>
                        {uploadingImage
                          ? "Şəkil yüklənir..."
                          : "Yadda saxlanılır..."}
                      </span>
                    </>
                  ) : (
                    <span>
                      {editingProduct ? "Dəyişiklikləri Saxla" : "Məhsulu Əlavə Et"}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Məhsulu silmək istəyirsiniz?
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Bu əməliyyat geri qaytarılmır və məhsul bazadan tam silinəcəkdir.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Ləğv et
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                disabled={deleting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-md disabled:opacity-50"
              >
                {deleting ? "Silinir..." : "Bəli, Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
