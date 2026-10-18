"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Upload,
  CheckCircle,
  Truck,
  MapPin,
  Phone,
  MessageSquare,
  ArrowRight,
  X,
  Eye,
  Sparkles,
  Info,
} from "lucide-react";

export default function CreateAdPage() {
  const router = useRouter();

  const [title, setTitle] = useState(
    "Kuchli flagman noutbuk 16 dyuym, 32GB RAM / 1TB SSD"
  );
  const [category, setCategory] = useState(
    "Elektronika > Noutbuklar va kompyuterlar"
  );
  const [description, setDescription] = useState(
    "Noutbuk ideal holatda, yangi qutisida. Karobka-dokumentlari to'liq, 1 yil rasmiy kafolat bilan beriladi. Batareya quvvati 100%, 12 ta sikl zaryad olgan. Hech qanday tirnalish yoki nuqsoni yo'q. Qolgan savollar bo'yicha telefon orqali bog'lanishingiz mumkin."
  );
  const [price, setPrice] = useState("58 400 000");
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [condition, setCondition] = useState("Yangi (qadoqda)");
  const [freeDelivery, setFreeDelivery] = useState(true);
  const [location, setLocation] = useState(
    "Toshkent shahri, Yunusobod tumani"
  );
  const [contactMethod, setContactMethod] = useState("both");
  const [phoneNumber, setPhoneNumber] = useState("+998 90 123 45 67");
  const [contactPerson, setContactPerson] = useState("Anvar N.");

  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80",
  ]);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newUrl = URL.createObjectURL(e.target.files[0]);
      if (images.length < 8) {
        setImages([...images, newUrl]);
      }
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("E'loningiz muvaffaqiyatli qabul qilindi va moderatsiyaga yuborildi!");
    router.push("/profile");
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#002f34] transition-colors">
          Bosh sahifa
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#002f34]">Yangi e&apos;lon berish</span>
      </nav>

      {/* 2. Header & Stepper */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#002f34] tracking-tight">
            Yangi e&apos;lon joylashtirish
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            E&apos;loningizni joylashtiring va butun O&apos;zbekistondan millionlab xaridorlarni toping.
          </p>
        </div>

        {/* Stepper bar */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-4 shadow-sm flex items-center justify-between sm:justify-center sm:gap-12 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#23e5db] text-[#002f34] font-black flex items-center justify-center text-xs">
              1
            </span>
            <span className="font-bold text-[#002f34]">Ma&apos;lumotlar</span>
          </div>

          <div className="w-8 sm:w-16 h-0.5 bg-gray-200"></div>

          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-xs">
              2
            </span>
            <span className="font-medium text-gray-500 hidden sm:inline">
              Joylashuv va narx
            </span>
          </div>

          <div className="w-8 sm:w-16 h-0.5 bg-gray-200"></div>

          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-xs">
              3
            </span>
            <span className="font-medium text-gray-500 hidden sm:inline">
              Chop etish
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ================= SECTION 1: ABOUT PRODUCT ================= */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-black text-[#002f34]">
              Bizga e&apos;loningiz haqida gapirib bering
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Aniq va tushunarli sarlavha ko&apos;proq e&apos;tibor jalb etadi
            </p>
          </div>

          {/* Title input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#002f34]">
                Sarlavha <span className="text-red-500">*</span>
              </label>
              <span className="text-gray-400 font-mono text-[11px]">
                {title.length} / 70 belgi
              </span>
            </div>
            <input
              type="text"
              value={title}
              maxLength={70}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masalan: iPhone 15 Pro 256GB yoki Noutbuk HP"
              required
              className="w-full bg-[#f2f4f5] text-xs sm:text-sm font-medium px-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] focus:ring-2 focus:ring-[#23e5db]/20 transition-all text-[#002f34]"
            />
          </div>

          {/* Category Selector Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002f34] block">
              Rukn (Kategoriya) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center justify-between p-3.5 bg-[#f8fafc] border border-gray-200 rounded-2xl">
              <div>
                <span className="text-xs font-bold text-[#002f34] block">
                  {category}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                  <CheckCircle className="w-3 h-3" />
                  Kompaniya qoidalari asosida to&apos;g&apos;ri rukn tanlangan
                </span>
              </div>
              <button
                type="button"
                onClick={() => alert("Kategoriyalar ro'yxati ochilmoqda...")}
                className="text-xs font-bold text-[#008f87] hover:underline"
              >
                O&apos;zgartirish
              </button>
            </div>
          </div>

          {/* Photos Upload Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#002f34]">
                Rasmlar
              </label>
              <span className="text-gray-400 font-medium text-[11px]">
                {images.length} / 8 yuklandi
              </span>
            </div>
            <p className="text-[11px] text-gray-500">
              Birinchi rasm asosiy bo&apos;ladi. Sifatli va real suratlardan foydalaning (maksimal 8 ta).
            </p>

            {/* Photos slots grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 group"
                >
                  <img
                    src={img}
                    alt={`Upload ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {idx === 0 && (
                    <span className="absolute top-2 left-2 bg-[#002f34] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Asosiy
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Upload button slot */}
              {images.length < 8 && (
                <label className="relative aspect-[4/3] rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#23e5db] bg-[#f8fafc] flex flex-col items-center justify-center text-center p-3 cursor-pointer transition-colors group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#23e5db] transition-colors mb-1.5">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#002f34]">
                    Rasm qo&apos;shish
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5">
                    JPG, PNG, WebP
                  </span>
                </label>
              )}
            </div>

            <p className="text-[11px] text-gray-400 italic pt-1">
              Suratlarni surish orqali ularning ketma-ketligini o&apos;zgartirishingiz mumkin.
            </p>
          </div>
        </div>

        {/* ================= SECTION 2: DESCRIPTION ================= */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-[#002f34]">
              Tavsif
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Mahsulot holati, to&apos;plami va afzalliklari haqida batafsil yozing (kamida 80 ta belgi).
            </p>
          </div>

          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mahsulot haqida batafsil ma'lumot kiriting..."
            required
            className="w-full bg-[#f2f4f5] text-xs sm:text-sm font-normal p-4 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] focus:ring-2 focus:ring-[#23e5db]/20 transition-all text-[#002f34] leading-relaxed resize-none"
          ></textarea>

          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold text-emerald-600">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Tavsif yetarli darajada to&apos;liq yozilgan
            </span>
            <span className="text-gray-400 font-mono text-[11px]">
              {description.length} / 9 000 belgi
            </span>
          </div>
        </div>

        {/* ================= SECTION 3: PRICE & DELIVERY ================= */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-black text-[#002f34]">
              Narx va yetkazib berish
            </h2>
          </div>

          {/* Price input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#002f34] block">
              Narx <span className="text-red-500">*</span>
            </label>
            <div className="relative max-w-sm">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="58 400 000"
                required
                className="w-full bg-[#f2f4f5] text-base font-bold px-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded-md">
                so&apos;m
              </span>
            </div>

            <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isNegotiable}
                onChange={(e) => setIsNegotiable(e.target.checked)}
                className="rounded text-[#002f34] focus:ring-[#23e5db]"
              />
              <span>Kelishilgan holda (narxni kelishish mumkin)</span>
            </label>
          </div>

          {/* Condition selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#002f34] block">
              Holati <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Yangi (qadoqda)",
                "Ishlatilgan (ideal)",
                "Ishlatilgan (yaxshi)",
              ].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCondition(c)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    condition === c
                      ? "bg-[#23e5db] text-[#002f34] shadow-sm"
                      : "bg-[#f2f4f5] text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* OLX Delivery Toggle Box */}
          <div className="bg-[#eafbf9] border border-[#23e5db]/40 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#23e5db] text-[#002f34] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#002f34]">
                  Bepul yetkazib berish (OLX Dostavka orqali)
                </h4>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-md mt-0.5">
                  📈 Xaridorlar uchun jozibadorlikni 40% ga oshiradi
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFreeDelivery(!freeDelivery)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
                freeDelivery ? "bg-[#23e5db]" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  freeDelivery ? "translate-x-6" : "translate-x-0"
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* ================= SECTION 4: CONTACT INFO ================= */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-black text-[#002f34]">
              Aloqa uchun ma&apos;lumotlar
            </h2>
          </div>

          {/* Location input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002f34] block">
              Joylashuv (Shahar, tuman) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Shahar va tumanni kiriting"
                required
                className="w-full bg-[#f2f4f5] text-xs sm:text-sm font-medium pl-10 pr-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
              />
            </div>
          </div>

          {/* Communication method */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#002f34] block">
              Muloqot usuli
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setContactMethod("both")}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-colors ${
                  contactMethod === "both"
                    ? "bg-[#f8fafc] border-[#23e5db] ring-1 ring-[#23e5db]"
                    : "bg-[#f8fafc] border-gray-200"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    contactMethod === "both"
                      ? "border-[#23e5db] bg-[#23e5db]"
                      : "border-gray-400"
                  }`}
                >
                  {contactMethod === "both" && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#002f34]"></div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#002f34]">
                  <Phone className="w-4 h-4 text-[#23e5db]" />
                  <span>Qo&apos;ng&apos;iroq va xabarlar</span>
                </div>
              </label>

              <label
                onClick={() => setContactMethod("chat-only")}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-colors ${
                  contactMethod === "chat-only"
                    ? "bg-[#f8fafc] border-[#23e5db] ring-1 ring-[#23e5db]"
                    : "bg-[#f8fafc] border-gray-200"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    contactMethod === "chat-only"
                      ? "border-[#23e5db] bg-[#23e5db]"
                      : "border-gray-400"
                  }`}
                >
                  {contactMethod === "chat-only" && (
                    <div className="w-1.5 h-1.5 rounded-full bg-[#002f34]"></div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#002f34]">
                  <MessageSquare className="w-4 h-4 text-[#23e5db]" />
                  <span>Faqat xabarlar</span>
                </div>
              </label>
            </div>
          </div>

          {/* Phone and Contact person row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#002f34] block">
                Telefon raqam <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full bg-[#f2f4f5] text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-[#23e5db]" />
                  Tasdiqlangan
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#002f34] block">
                Aloqada bo&apos;ladigan shaxs <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                required
                className="w-full bg-[#f2f4f5] text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
              />
            </div>
          </div>
        </div>

        {/* ================= ACTION BAR ================= */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-semibold"
          >
            <X className="w-4 h-4" />
            <span>Bekor qilish</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => router.push("/product/macbook-pro-16")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#002f34] transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Oldindan ko&apos;rish</span>
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <span>E&apos;lonni chop etish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
