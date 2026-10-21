"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Share2,
  Heart,
  Maximize2,
  Camera,
  Clock,
  Eye,
  Bookmark,
  Sliders,
  FileText,
  ShieldCheck,
  Truck,
  RotateCw,
  Phone,
  MessageSquare,
  Flag,
  CheckCircle,
  MapPin,
  Compass,
  ArrowRight,
  X,
  Navigation,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SafeDealBanner from "@/components/SafeDealBanner";
import { CURRENT_PRODUCT } from "@/data/mockData";

export default function ProductDetailPage() {
  const router = useRouter();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [fullscreenModal, setFullscreenModal] = useState(false);

  const product = CURRENT_PRODUCT;

  const handleShare = () => {
    if (navigator?.share) {
      navigator.share({
        title: product.title,
        url: window.location.href,
      });
    } else if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Havola nusxalandi!");
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6">
      {/* 1. Breadcrumbs & Meta header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#002f34] transition-colors">
            Bosh sahifa
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/catalog" className="hover:text-[#002f34] transition-colors">
            Elektronika
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/catalog" className="hover:text-[#002f34] transition-colors">
            Noutbuklar
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#002f34] truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-mono text-[11px]">
            ID: {product.id}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-gray-200 hover:border-gray-300 text-[#002f34] font-semibold text-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Ulashish</span>
          </button>
        </div>
      </div>

      {/* 2. Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN (Gallery + Specs + Desc + Map + Similar) ================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* A. Gallery */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-4 sm:p-5 shadow-sm space-y-3">
            {/* Main large photo */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-900 group">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Top Badges */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                <span className="flex items-center gap-1 bg-[#23e5db] text-[#002f34] text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-sm">
                  <CheckCircle className="w-3 h-3" />
                  {product.statusBadge}
                </span>
                <span className="flex items-center gap-1 bg-[#ffce32] text-[#002f34] text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-sm">
                  <CheckCircle className="w-3 h-3" />
                  {product.warrantyText}
                </span>
              </div>

              {/* Action buttons top-right */}
              <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-all active:scale-90"
                  aria-label="Sevimlilarga qo'shish"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFavorite ? "fill-[#ff5636] text-[#ff5636]" : "text-gray-700 hover:text-[#ff5636]"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setFullscreenModal(true)}
                  className="w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-all text-gray-700 hover:text-[#002f34]"
                  aria-label="To'liq ekranda ko'rish"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Photos count pill */}
              <div className="absolute bottom-3.5 left-3.5 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium">
                <Camera className="w-3.5 h-3.5" />
                <span>
                  {selectedImageIndex + 1} / {product.images.length} fotosurat
                </span>
              </div>
            </div>

            {/* Thumbnails row */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all relative ${
                    selectedImageIndex === idx
                      ? "border-[#23e5db] ring-2 ring-[#23e5db]/30 scale-[1.02]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* B. Title & Quick Specs */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-5">
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pb-1 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {product.postedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                {product.views} marta ko&apos;rildi
              </span>
              <span className="flex items-center gap-1.5 text-teal-700 font-medium">
                <Bookmark className="w-3.5 h-3.5 text-[#008f87]" />
                {product.favorites} sevimlilar
              </span>
            </div>

            {/* Main title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#002f34] leading-snug">
              {product.title}
            </h1>

            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {product.quickSpecs.map((item) => (
                <div
                  key={item.label}
                  className="bg-[#f2f4f5] rounded-2xl p-3.5 sm:p-4 border border-gray-100"
                >
                  <span className="text-[11px] text-gray-500 block">
                    {item.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#002f34] block mt-1">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* C. Specifications Table */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#002f34]" />
                <h2 className="text-base font-black text-[#002f34]">
                  Xususiyatlari
                </h2>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                Batafsil ma&apos;lumot
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {product.specs.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#f8fafc] border border-gray-100 text-xs"
                >
                  <span className="text-gray-500">{item.label}</span>
                  {item.isBadge ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      {item.value}
                    </span>
                  ) : item.colorDot ? (
                    <span className="flex items-center gap-1.5 font-bold text-[#002f34]">
                      <span
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: item.colorDot }}
                      ></span>
                      {item.value}
                    </span>
                  ) : (
                    <span className="font-bold text-[#002f34] text-right">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* D. Description & Terms */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <FileText className="w-4 h-4 text-[#002f34]" />
              <h2 className="text-base font-black text-[#002f34]">
                Tavsif va shartlar
              </h2>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
              {product.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {/* Warranty Banner inside description */}
              <div className="bg-[#fff9e6] border border-[#ffce32]/40 rounded-2xl p-4 sm:p-5 space-y-1.5 my-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#7a5200]">
                  <ShieldCheck className="w-4 h-4 text-[#ffce32]" />
                  <span>{product.warrantyBox.title}</span>
                </div>
                <p className="text-xs text-gray-700">
                  {product.warrantyBox.text}
                </p>
              </div>

              {/* Delivery Box */}
              <p className="font-medium text-[#002f34] pt-2">
                {product.deliveryBox}
              </p>

              {/* 3 feature badges */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Truck className="w-3.5 h-3.5 text-[#23e5db]" />
                  <span>O&apos;zbekiston bo&apos;ylab yetkazish</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008f87]" />
                  <span>Xavfsiz to&apos;lov tizimi</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <RotateCw className="w-3.5 h-3.5 text-gray-400" />
                  <span>Obmen/Barter ko&apos;rib chiqilmaydi</span>
                </div>
              </div>
            </div>
          </div>

          {/* E. Safe deal banner */}
          <SafeDealBanner />

          {/* F. Location on Map Block */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#002f34]" />
                <h2 className="text-base font-black text-[#002f34]">
                  Xaritada joylashuvi
                </h2>
              </div>
              <span className="text-xs text-teal-700 font-bold hover:underline cursor-pointer flex items-center gap-1">
                <Navigation className="w-3 h-3" />
                <span>Yo&apos;nalishni ko&apos;rish</span>
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <strong className="text-gray-800 text-sm block">
                    {product.location.district}
                  </strong>
                  <span className="text-gray-500">{product.location.city} • {product.location.metro}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold w-fit">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {product.location.courier}
                </span>
              </div>

              {/* Stylized Map View Box */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100 border border-gray-200 flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-40 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80')",
                  }}
                ></div>
                <div className="relative z-10 flex flex-col items-center gap-2 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-200 max-w-sm text-center">
                  <div className="w-10 h-10 rounded-full bg-[#002f34] text-[#23e5db] flex items-center justify-center shadow-md animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#002f34]">Yunusobod 11-mavze</h4>
                    <p className="text-[11px] text-gray-500">Megaplanet savdo majmuasi yaqinida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* G. Similar Offers */}
          <div className="space-y-4 pt-2">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#002f34] tracking-tight">
                  O&apos;xshash takliflar
                </h2>
                <p className="text-xs text-gray-500">
                  Toshkentdagi boshqa professional noutbuklar
                </p>
              </div>
              <Link
                href="/catalog"
                className="flex items-center gap-1 text-xs font-bold text-[#002f34] hover:text-[#008f87] transition-colors"
              >
                <span>Barchasini ko&apos;rish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {product.similarOffers.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  priceFormatted={item.price}
                  location={item.location}
                  date={item.date}
                  badge={item.badge}
                  image={item.image}
                  href="/product/macbook-pro-16"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT STICKY SIDEBAR ================= */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
          {/* 1. Price & Actions Card */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                NARXI
              </span>
              <span className="bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                Narx kelishiladi
              </span>
            </div>

            {/* Price values */}
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#002f34] tracking-tight">
                {product.priceFormatted}
              </div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">
                {product.priceUsd}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5 pt-2">
              {/* Call button */}
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="w-full flex items-center justify-center gap-2 bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-black text-sm sm:text-base py-3.5 rounded-2xl shadow-sm transition-all"
              >
                <Phone className="w-5 h-5 stroke-[2.5]" />
                <span>
                  {showPhone ? product.seller.phone : "Qo'ng'iroq qilish"}
                </span>
              </button>

              {/* Message button */}
              <button
                onClick={() => router.push("/messages")}
                className="w-full flex items-center justify-center gap-2 bg-[#23e5db] hover:bg-[#1cd1c7] active:scale-95 text-[#002f34] font-black text-sm sm:text-base py-3.5 rounded-2xl shadow-sm transition-all"
              >
                <MessageSquare className="w-5 h-5 stroke-[2.5]" />
                <span>Xabar yozish</span>
              </button>
            </div>

            {/* Secondary actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-600">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center gap-1.5 hover:text-[#ff5636] font-medium transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-[#ff5636] text-[#ff5636]" : "text-gray-400"
                  }`}
                />
                <span>Sevimlilarga qo&apos;shish</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-red-500 font-medium transition-colors">
                <Flag className="w-4 h-4 text-gray-400" />
                <span>Shikoyat qilish</span>
              </button>
            </div>
          </div>

          {/* 2. Seller Card */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-[#002f34] text-white flex items-center justify-center text-lg font-black shrink-0">
                  {product.seller.avatar}
                </div>
                {product.seller.isOnline && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-black text-[#002f34]">
                    {product.seller.name}
                  </h3>
                  <CheckCircle className="w-4 h-4 text-[#23e5db]" />
                </div>
                <div className="text-[11px] text-gray-400">
                  {product.seller.since}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{product.seller.onlineStatus}</span>
                </div>
              </div>
            </div>

            {/* OneID verification badge */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-50 border border-teal-100 text-xs font-semibold text-teal-800">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{product.seller.oneIdText}</span>
            </div>

            {/* Stats list */}
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span>🤝</span>
                <span>{product.seller.deals}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>{product.seller.responseTime}</span>
              </div>
            </div>

            {/* All seller ads button */}
            <button
              onClick={() => router.push("/catalog")}
              className="w-full py-2.5 rounded-2xl border border-gray-200 hover:border-gray-300 text-xs font-bold text-[#002f34] hover:bg-gray-50 transition-colors"
            >
              Sotuvchining barcha e&apos;lonlari ({product.seller.totalAds})
            </button>
          </div>

          {/* 3. Safety Tips Card */}
          <div className="bg-[#f8fafc] rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-2.5 text-xs text-gray-600">
            <h4 className="font-bold text-[#002f34] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Xavfsizlik eslatmasi</span>
            </h4>
            <ul className="space-y-1 text-[11px] list-disc list-inside text-gray-500">
              <li>Hech qachon tovar ko&apos;rilmasdan oldindan pul o&apos;tkazmang.</li>
              <li>OLX Xavfsiz bitim orqali to&apos;lang — pul kafolatda saqlanadi.</li>
              <li>Begona chat yoki shubhali havolalarga o&apos;tmang.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Modal */}
      {fullscreenModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setFullscreenModal(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.images[selectedImageIndex]}
            alt={product.title}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}
