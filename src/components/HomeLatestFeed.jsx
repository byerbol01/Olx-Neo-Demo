"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function HomeLatestFeed({ initialProducts = [] }) {
  const [latestFilter, setLatestFilter] = useState("Barchasi");
  const [visibleCount, setVisibleCount] = useState(8);

  const filterTabs = [
    "Barchasi",
    "Avto",
    "Ko'chmas mulk",
    "Elektronika",
    "Uy va bog'",
    "Moda va stil",
  ];

  const filtered =
    latestFilter === "Barchasi"
      ? initialProducts
      : initialProducts.filter((p) => {
          if (latestFilter === "Avto") return p.category === "Avto" || p.category === "Transport";
          return p.category === latestFilter;
        });

  const displayedProducts = filtered.slice(0, visibleCount);

  const handleLoadMore = () => {
    if (visibleCount < filtered.length) {
      setVisibleCount((prev) => prev + 8);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#002f34] tracking-tight">
            Yangi E&apos;lonlar
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            O&apos;zbekiston bo&apos;ylab oxirgi soatlar ichida qo&apos;shilgan yangi takliflar
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {filterTabs.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => {
                setLatestFilter(pill);
                setVisibleCount(8);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
                latestFilter === pill
                  ? "bg-[#23e5db] text-[#002f34] shadow-xs"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayedProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            {...prod}
            href={`/product/macbook-pro-16`}
          />
        ))}
      </div>

      {/* Load more button */}
      {visibleCount < filtered.length ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-xs sm:text-sm font-bold text-[#002f34] hover:border-gray-300 hover:shadow-md transition-all active:scale-95"
          >
            <span>Ko&apos;proq e&apos;lonlarni ko&apos;rish</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-xs sm:text-sm font-bold text-[#002f34] hover:border-gray-300 hover:shadow-md transition-all active:scale-95"
          >
            <span>Katalogdagi barcha 1 450+ e&apos;lonlarni ko&apos;rish</span>
            <ChevronDown className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
