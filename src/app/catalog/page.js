"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  Check,
  X,
  ChevronLeft,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import TradeInBanner from "@/components/TradeInBanner";
import { CATALOG_LAPTOPS } from "@/data/mockData";

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("noutbuklar");
  const [minPrice, setMinPrice] = useState("5000000");
  const [maxPrice, setMaxPrice] = useState("25000000");
  const [selectedRange, setSelectedRange] = useState("10M - 20M");
  const [selectedBrands, setSelectedBrands] = useState(["Apple", "ASUS"]);
  const [selectedConditions, setSelectedConditions] = useState(["Yangi (qadoqda)"]);
  const [warrantyToggle, setWarrantyToggle] = useState(true);
  const [deliveryToggle, setDeliveryToggle] = useState(true);
  const [sortBy, setSortBy] = useState("Eng ommabop");
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    { id: "noutbuklar", label: "Noutbuklar", count: 1452 },
    { id: "pc", label: "Kompyuterlar & monoblok", count: 840 },
    { id: "gaming", label: "O'yin noutbuklari", count: 524 },
    { id: "accessories", label: "Aksessuarlar", count: 1120 },
    { id: "bags", label: "Sumka va g'iloflar", count: 315 },
  ];

  const brandOptions = [
    { name: "Apple", count: 342 },
    { name: "ASUS", count: 290 },
    { name: "Lenovo", count: 245 },
    { name: "HP", count: 188 },
    { name: "Acer", count: 112 },
  ];

  const conditionOptions = [
    { name: "Barchasi", count: 1452 },
    { name: "Yangi (qadoqda)", count: 618 },
    { name: "Ishlatilgan (ideal)", count: 580 },
    { name: "Ishlatilgan (yaxshi)", count: 254 },
  ];

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const toggleCondition = (cond) => {
    if (selectedConditions.includes(cond)) {
      setSelectedConditions(selectedConditions.filter((c) => c !== cond));
    } else {
      setSelectedConditions([...selectedConditions, cond]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedConditions([]);
    setSelectedRange("");
    setMinPrice("");
    setMaxPrice("");
    setWarrantyToggle(false);
    setDeliveryToggle(false);
  };

  // Filter laptops based on state
  const filteredLaptops = CATALOG_LAPTOPS.filter((laptop) => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(laptop.brand)) {
      return false;
    }
    if (
      selectedConditions.length > 0 &&
      !selectedConditions.includes("Barchasi") &&
      !selectedConditions.includes(laptop.condition)
    ) {
      return false;
    }
    if (warrantyToggle && !laptop.warranty) return false;
    if (deliveryToggle && !laptop.delivery) return false;
    return true;
  });

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#002f34] transition-colors">
          Bosh sahifa
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/catalog" className="hover:text-[#002f34] transition-colors">
          Elektronika
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#002f34]">Noutbuklar</span>
      </nav>

      {/* Header & Guarantee badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#002f34] tracking-tight">
            Toshkentda noutbuklar
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Faol bozor
            </span>
            <span className="text-xs text-gray-500 font-medium">
              1 452 ta e&apos;lon topildi
            </span>
          </div>
        </div>

        {/* Right Safe deal guarantee badge */}
        <div className="flex items-center gap-3 bg-white border border-gray-200/80 rounded-2xl px-4 py-2.5 shadow-sm">
          <div className="w-9 h-9 rounded-full bg-[#23e5db]/20 text-[#008f87] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#008f87]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#002f34]">
              Xavfsiz xarid kafolati
            </div>
            <div className="text-[11px] text-gray-500">
              OLX Dostavka orqali tekshirib to&apos;lang
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter toggle button */}
      <div className="lg:hidden flex items-center justify-between gap-2">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-2.5 text-xs font-bold text-[#002f34] shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#23e5db]" />
          <span>Filtrlar</span>
        </button>

        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg ${viewMode === "grid" ? "bg-gray-100 text-[#002f34]" : "text-gray-400"}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg ${viewMode === "list" ? "bg-gray-100 text-[#002f34]" : "text-gray-400"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* ================= LEFT SIDEBAR FILTERS ================= */}
        <aside
          className={`lg:block ${
            mobileFilterOpen
              ? "fixed inset-0 z-50 bg-white p-5 overflow-y-auto"
              : "hidden"
          } bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm space-y-6`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#002f34]" />
              <h2 className="text-sm font-black uppercase tracking-wider text-[#002f34]">
                Filtrlar
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-red-500 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Tozalash</span>
              </button>
              {mobileFilterOpen && (
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* 1. Category */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002f34]">
              KATEGORIYA
            </h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-[#002f34] text-white font-bold"
                      : "text-gray-700 hover:bg-gray-50 font-medium"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] ${
                      selectedCategory === cat.id ? "text-gray-300" : "text-gray-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Price filter */}
          <div className="space-y-2.5 pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002f34]">
              NARX, SO&apos;M
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Dan</label>
                <input
                  type="text"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="5 000 000"
                  className="w-full bg-[#f2f4f5] text-xs font-semibold px-2.5 py-1.5 rounded-lg outline-none border border-transparent focus:border-[#23e5db]"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1">Gacha</label>
                <input
                  type="text"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="25 000 000"
                  className="w-full bg-[#f2f4f5] text-xs font-semibold px-2.5 py-1.5 rounded-lg outline-none border border-transparent focus:border-[#23e5db]"
                />
              </div>
            </div>

            {/* Quick price chips */}
            <div className="grid grid-cols-4 gap-1 pt-1">
              {["< 5M", "5M - 10M", "10M - 20M", "20M +"].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`py-1 text-[10px] font-semibold rounded-lg border transition-all text-center ${
                    selectedRange === range
                      ? "bg-[#23e5db] text-[#002f34] border-[#23e5db] font-bold"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Condition */}
          <div className="space-y-2.5 pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002f34]">
              HOLATI
            </h3>
            <div className="space-y-1.5">
              {conditionOptions.map((cond) => {
                const checked = selectedConditions.includes(cond.name);
                return (
                  <label
                    key={cond.name}
                    className="flex items-center justify-between text-xs cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => toggleCondition(cond.name)}
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          checked
                            ? "bg-[#002f34] border-[#002f34] text-white"
                            : "border-gray-300 group-hover:border-gray-400 bg-white"
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-gray-700 font-medium">{cond.name}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">{cond.count}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 4. Brand */}
          <div className="space-y-2.5 pt-2 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#002f34]">
              BREND
            </h3>
            <div className="space-y-1.5">
              {brandOptions.map((brand) => {
                const checked = selectedBrands.includes(brand.name);
                return (
                  <label
                    key={brand.name}
                    className="flex items-center justify-between text-xs cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => toggleBrand(brand.name)}
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          checked
                            ? "bg-[#002f34] border-[#002f34] text-white"
                            : "border-gray-300 group-hover:border-gray-400 bg-white"
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-gray-700 font-medium">{brand.name}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">{brand.count}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 5. Toggles */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            {/* Warranty toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#002f34]">
                  Rasmiy kafolat
                </div>
                <div className="text-[10px] text-gray-400">
                  Servis markazlari mavjud
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWarrantyToggle(!warrantyToggle)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                  warrantyToggle ? "bg-[#23e5db]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                    warrantyToggle ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>

            {/* Delivery toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#002f34]">
                  OLX Dostavka
                </div>
                <div className="text-[10px] text-gray-400">
                  Xavfsiz hisob orqali
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeliveryToggle(!deliveryToggle)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                  deliveryToggle ? "bg-[#23e5db]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                    deliveryToggle ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Apply button */}
          <div className="pt-2">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-2.5 rounded-full bg-[#23e5db] hover:bg-[#1cd1c7] active:scale-95 text-[#002f34] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filtrni qo&apos;llash</span>
            </button>
            <button
              onClick={clearAllFilters}
              className="w-full text-center text-[11px] text-gray-500 hover:text-gray-800 font-semibold mt-2.5"
            >
              Barcha filtrlarni tozalash
            </button>
          </div>
        </aside>

        {/* ================= RIGHT MAIN CONTENT ================= */}
        <div className="lg:col-span-3 space-y-5">
          {/* Active filter pills & Sort header */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            {/* Active pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-gray-400 font-medium mr-1 text-[11px]">
                Tanlanganlar:
              </span>
              {selectedConditions.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 bg-[#f2f4f5] text-[#002f34] px-2.5 py-1 rounded-full font-semibold text-[11px]"
                >
                  {c}
                  <button
                    onClick={() => toggleCondition(c)}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedRange && (
                <span className="inline-flex items-center gap-1 bg-[#f2f4f5] text-[#002f34] px-2.5 py-1 rounded-full font-semibold text-[11px]">
                  {selectedRange} so&apos;m
                  <button
                    onClick={() => setSelectedRange("")}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrands.length > 0 && (
                <span className="inline-flex items-center gap-1 bg-[#f2f4f5] text-[#002f34] px-2.5 py-1 rounded-full font-semibold text-[11px]">
                  {selectedBrands.join(" & ")}
                  <button
                    onClick={() => setSelectedBrands([])}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            {/* Sort & Grid/List view controls */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="text-gray-400 hidden sm:inline">Saralash:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-[#002f34] text-xs outline-none cursor-pointer"
                >
                  <option value="Eng ommabop">Eng ommabop</option>
                  <option value="Eng yangilar">Eng yangilar</option>
                  <option value="Narx: arzondan qimmatga">Narx: arzondan qimmatga</option>
                  <option value="Narx: qimmatdan arzonga">Narx: qimmatdan arzonga</option>
                </select>
              </div>

              <div className="hidden sm:flex items-center gap-1 border-l border-gray-200 pl-3">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg ${
                    viewMode === "grid" ? "bg-gray-100 text-[#002f34]" : "text-gray-400"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg ${
                    viewMode === "list" ? "bg-gray-100 text-[#002f34]" : "text-gray-400"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product grid / list */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
                : "space-y-4"
            }
          >
            {filteredLaptops.map((laptop) => (
              <ProductCard
                key={laptop.id}
                {...laptop}
                href="/product/macbook-pro-16"
              />
            ))}
          </div>

          {/* Trade-in Promo Banner */}
          <div className="pt-3">
            <TradeInBanner />
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 pt-6 pb-4">
            <button
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500"
              aria-label="Oldingi"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#002f34] text-white font-bold text-xs flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center">
              2
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center">
              3
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center">
              4
            </button>
            <span className="text-gray-400 text-xs px-1">...</span>
            <button className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center">
              18
            </button>
            <button
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500"
              aria-label="Keyingi"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
