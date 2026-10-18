import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Car,
  Building2,
  Laptop,
  Briefcase,
  Wrench,
  Shirt,
  Baby,
  Armchair,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import TrustBanner from "@/components/TrustBanner";
import HomeSearch from "@/components/HomeSearch";
import HomeLatestFeed from "@/components/HomeLatestFeed";
import { VIP_PRODUCTS, LATEST_PRODUCTS } from "@/data/mockData";

export const metadata = {
  title: "Bosh sahifa | O'zbekiston bo'ylab 3 milliondan ortiq e'lonlar",
  description:
    "O'zbekistondagi eng yirik zamonaviy savdo maydonchasi. Avto, noutbuklar, ko'chmas mulk va ish o'rinlari.",
};

export default function HomePage() {
  const categoryIcons = [
    { name: "Avto", icon: Car, href: "/catalog?cat=avto" },
    { name: "Ko'chmas mulk", icon: Building2, href: "/catalog?cat=re" },
    { name: "Elektronika", icon: Laptop, href: "/catalog" },
    { name: "Ish o'rinlari", icon: Briefcase, href: "/catalog?cat=jobs" },
    { name: "Xizmatlar", icon: Wrench, href: "/catalog?cat=services" },
    { name: "Moda va stil", icon: Shirt, href: "/catalog?cat=fashion" },
    { name: "Bolalar dunyosi", icon: Baby, href: "/catalog?cat=kids" },
    { name: "Uy va bog'", icon: Armchair, href: "/catalog?cat=home" },
  ];

  const popularSearches = [
    "iPhone 15 Pro",
    "Chevrolet Cobalt",
    "2-xonalik kvartira",
    "Noutbuklar",
    "Vakansiyalar",
  ];

  return (
    <div className="space-y-10 sm:space-y-12 pb-16 pt-4 sm:pt-6">
      {/* 1. HERO SECTION (Server Rendered HTML with Client Search Island) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#113d39] via-[#0d3431] to-[#072422] text-white p-6 sm:p-10 md:p-14 overflow-hidden shadow-xl text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#23e5db]/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#23e5db]">
              <span className="w-2 h-2 rounded-full bg-[#23e5db] animate-pulse"></span>
              <span>YANGI AVLOD SAVDO MAYDONCHASI</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-tight">
              O&apos;zbekiston bo&apos;ylab 3 milliondan ortiq <br className="hidden sm:block" />
              e&apos;lonlar
            </h1>

            <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto">
              Kerakli narsani osongina toping, soting yoki xarid qiling
            </p>

            {/* Client Search Island */}
            <HomeSearch />

            {/* Popular tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-gray-300">
              <span className="font-semibold text-gray-400">Ommabop:</span>
              {popularSearches.map((item) => (
                <Link
                  key={item}
                  href={`/catalog?q=${encodeURIComponent(item)}`}
                  className="bg-white/10 hover:bg-white/20 text-gray-200 px-3 py-1 rounded-full text-[11px] sm:text-xs transition-colors backdrop-blur-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION (Pure Server HTML) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#002f34] tracking-tight">
              Barcha ruknlar
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Eng ommabop yo&apos;nalishlar bo&apos;yicha saralangan e&apos;lonlar
            </p>
          </div>

          <Link
            href="/catalog"
            className="flex items-center gap-1 text-xs font-bold text-[#002f34] hover:text-[#008f87] transition-colors"
          >
            <span>Barcha 12 ta rukn</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categoryIcons.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group bg-white rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#f2f4f5] group-hover:bg-[#e6faf9] flex items-center justify-center text-[#002f34] group-hover:text-[#008f87] transition-colors mb-2.5">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#002f34] group-hover:text-[#008f87] transition-colors">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. VIP E'LONLAR SECTION (Server Rendered) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#ffce32] text-[#002f34] flex items-center justify-center shadow-sm">
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#002f34] tracking-tight">
                VIP E&apos;lonlar
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                O&apos;zbekiston bo&apos;yicha eng sara va tekshirilgan takliflar
              </p>
            </div>
          </div>

          <Link
            href="/catalog"
            className="flex items-center gap-1 text-xs font-bold text-[#002f34] hover:text-[#008f87] transition-colors"
          >
            <span>VIP e&apos;lon berish</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VIP_PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      </section>

      {/* 4. YANGI E'LONLAR SECTION (Interactive Filter Feed) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <HomeLatestFeed initialProducts={LATEST_PRODUCTS} />
      </section>

      {/* 5. TRUST & STATS BANNER */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <TrustBanner />
      </section>
    </div>
  );
}
