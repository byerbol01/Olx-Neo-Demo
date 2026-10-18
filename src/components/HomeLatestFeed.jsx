"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function HomeLatestFeed({ initialProducts }) {
  const [latestFilter, setLatestFilter] = useState("Barchasi");

  const filtered =
    latestFilter === "Barchasi"
      ? initialProducts
      : initialProducts.filter((p) => {
          if (latestFilter === "Transport") return p.category === "Transport";
          if (latestFilter === "Elektronika") return p.category === "Elektronika";
          if (latestFilter === "Shaxsiy buyumlar")
            return p.category === "Uy va bog'" || p.category === "Xizmatlar";
          return true;
        });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#002f34] tracking-tight">
            Yangi E&apos;lonlar
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Oxirgi soatlar ichida qo&apos;shilgan yangi takliflar
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {["Barchasi", "Shaxsiy buyumlar", "Transport", "Elektronika"].map(
            (pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setLatestFilter(pill)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                  latestFilter === pill
                    ? "bg-[#23e5db] text-[#002f34] shadow-sm"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {pill}
              </button>
            )
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((prod) => (
          <ProductCard key={prod.id} {...prod} />
        ))}
      </div>

      {/* Load more button */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-xs sm:text-sm font-bold text-[#002f34] hover:border-gray-300 hover:shadow-md transition-all active:scale-95"
        >
          <span>Ko&apos;proq e&apos;lonlarni ko&apos;rish</span>
          <ChevronDown className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
