// src/lib/api.js
// Client API layer connecting OLX Neo frontend to Desktop Backend (Node/Express/Convex)

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

// Fallback seed products for safety if backend is starting up
const SEED_FALLBACK = [
  {
    id: "1",
    slug: "macbook-pro-16-m3-max",
    title: "Apple MacBook Pro 16\" M3 Max 36GB / 1TB SSD Space Black",
    subTitle: "Apple MacBook Pro 16\" M3 Max (36GB / 1TB)",
    price: 58400000,
    priceFormatted: "58 400 000 so'm",
    priceUsd: "Taqriban $4 620 USD",
    category: "Elektronika",
    location: "Toshkent, Yunusobod",
    date: "Bugun 10:45",
    badge: "VIP",
    negotiable: true,
    condition: "Yangi (Qadoqda, muhrlangan)",
    views: 542,
    favorites: 34,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=85",
    ],
    specs: [
      { label: "Brend", value: "Apple" },
      { label: "Model", value: "MacBook Pro 16 M3 Max" },
      { label: "RAM", value: "36 GB Unified" },
      { label: "Xotira", value: "1 TB SSD" },
      { label: "Holati", value: "Yangi qadoqda" },
    ],
    description:
      "AQSH rasmiy Apple Store do'konidan keltirilgan, mutlaqo yangi flagman noutbuk. Qadoq plyonkasi ochilmagan, zavod muhrlari buzilmagan (sealed box). 1 yil rasmiy xalqaro Apple Care kafolati mavjud.",
    seller: {
      name: "Aziz Rahimov",
      phone: "+998 90 123 45 67",
      avatar: "AR",
      verified: true,
      rating: 4.9,
      deals: "48 ta muvaffaqiyatli bitim",
    },
  },
];

// Fetch all products with filter support
export async function getProducts(params = {}) {
  try {
    const searchParams = new URLSearchParams();
    if (params.category && params.category !== "Barchasi") {
      searchParams.append("category", params.category);
    }
    if (params.q) searchParams.append("q", params.q);
    if (params.minPrice) searchParams.append("minPrice", params.minPrice);
    if (params.maxPrice) searchParams.append("maxPrice", params.maxPrice);

    const queryStr = searchParams.toString();
    const url = `${API_BASE_URL}/products${queryStr ? `?${queryStr}` : ""}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Backend response error");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn("Could not reach Backend API, using cached products:", err);
    return SEED_FALLBACK;
  }
}

// Fetch single product by ID or Slug
export async function getProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Mahsulot topilmadi");
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn("Error fetching product by ID from backend:", err);
    return SEED_FALLBACK[0];
  }
}

// Create new product
export async function createProduct(productData) {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Mahsulot qo'shishda xatolik");
    return json;
  } catch (err) {
    console.error("Create product failed:", err);
    throw err;
  }
}

// Upload image file to backend
export async function uploadImageFile(file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Rasm yuklashda xatolik");
    return json.url;
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
}

// Delete product (Admin)
export async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "O'chirishda xatolik");
    return json;
  } catch (err) {
    console.error("Delete error:", err);
    throw err;
  }
}

// Update product (Admin)
export async function updateProduct(id, updateData) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Tahrirlashda xatolik");
    return json;
  } catch (err) {
    console.error("Update error:", err);
    throw err;
  }
}

// Admin stats
export async function getAdminStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, { cache: "no-store" });
    const json = await res.json();
    return json.stats || null;
  } catch (err) {
    console.error("Stats error:", err);
    return null;
  }
}

// Admin users
export async function getAdminUsers() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/users`, { cache: "no-store" });
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Users error:", err);
    return [];
  }
}

// Auth Login
export async function apiLogin(phone, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Kirishda xatolik");
  return json;
}

// Auth Register
export async function apiRegister(name, phone, password) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Ro'yxatdan o'tishda xatolik");
  return json;
}
