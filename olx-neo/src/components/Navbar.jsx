"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  LayoutGrid,
  Heart,
  MessageSquare,
  Plus,
  ChevronDown,
  Menu,
  X,
  LogIn,
  UserPlus,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import AuthModal from "@/components/AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Butun O'zbekiston");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Simulate logged-in state stored in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("olx_neo_logged_in") === "true";
    }
    return false;
  });

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("olx_neo_logged_in");
    }
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    router.push("/");
  };

  const openAuthModal = (tab) => {
    setAuthTab(tab);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const cities = [
    "Butun O'zbekiston",
    "Toshkent shahri",
    "Samarqand viloyati",
    "Farg'ona viloyati",
    "Andijon viloyati",
    "Namangan viloyati",
    "Buxoro viloyati",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#e5eaed] shadow-sm">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-between gap-3 md:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
              <span className="text-[28px] font-black tracking-tight text-[#002f34] leading-none">
                olx
              </span>
              <span className="bg-[#23e5db] text-[#002f34] text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full tracking-wider group-hover:bg-[#1cd1c7] transition-colors">
                NEO
              </span>
            </Link>

            {/* Location button */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 hover:border-gray-300 text-xs font-medium text-[#002f34] bg-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#23e5db]" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs hover:bg-[#f2f4f5] transition-colors ${
                        selectedCity === city
                          ? "font-bold text-[#002f34] bg-teal-50"
                          : "text-gray-700"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Categories button */}
            <Link
              href="/catalog"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 hover:border-gray-300 text-xs font-semibold text-[#002f34] bg-white transition-colors shrink-0"
            >
              <LayoutGrid className="w-4 h-4 text-[#002f34]" />
              <span>Barcha ruknlar</span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-[480px] hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nima qidiryapsiz?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f2f4f5] text-[#002f34] placeholder-gray-500 text-xs md:text-sm pl-4 pr-10 py-2.5 rounded-full border border-transparent focus:bg-white focus:border-[#23e5db] focus:ring-2 focus:ring-[#23e5db]/20 outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#002f34] transition-colors"
                  aria-label="Qidirish"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Favorites */}
              <Link
                href="/favorites"
                className={`hidden sm:flex items-center gap-1.5 text-xs font-medium px-2 py-1.5 rounded-lg transition-colors ${
                  pathname === "/favorites" ? "text-[#002f34] font-bold" : "text-gray-600 hover:text-[#002f34]"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    pathname === "/favorites"
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                />
                <span className="hidden lg:inline">Sevimlilar</span>
              </Link>

              {/* Messages */}
              <Link
                href="/messages"
                className={`hidden sm:flex relative items-center gap-1.5 text-xs font-medium px-2 py-1.5 rounded-lg transition-colors ${
                  pathname === "/messages" ? "text-[#002f34] font-bold" : "text-gray-600 hover:text-[#002f34]"
                }`}
              >
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </div>
                <span className="hidden lg:inline">Xabarlar</span>
              </Link>

              {/* Auth area */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#002f34] text-white flex items-center justify-center text-xs font-bold">
                      AN
                    </div>
                    <span className="hidden md:inline font-semibold text-[#002f34]">
                      Anvar N.
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs hover:bg-gray-50 text-gray-700 font-medium"
                      >
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>Mening kabinetim</span>
                      </Link>
                      <Link
                        href="/favorites"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs hover:bg-gray-50 text-gray-700 font-medium"
                      >
                        <Heart className="w-3.5 h-3.5 text-gray-400" />
                        <span>Sevimlilar</span>
                      </Link>
                      <Link
                        href="/messages"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 text-xs hover:bg-gray-50 text-gray-700 font-medium"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
                        <span>Xabarlar</span>
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 px-3.5 py-2 text-xs hover:bg-red-50 text-red-600 font-medium w-full text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Chiqish</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    onClick={() => openAuthModal("login")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 hover:border-gray-300 text-xs font-semibold text-[#002f34] transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Kirish</span>
                  </button>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#f2f4f5] hover:bg-gray-200 text-xs font-semibold text-[#002f34] transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Ro&apos;yxat</span>
                  </button>
                </div>
              )}

              {/* Post Ad Button */}
              <Link
                href="/create"
                className="flex items-center gap-1.5 bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-bold text-xs md:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-sm transition-all"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span className="whitespace-nowrap hidden sm:inline">
                  E&apos;lon joylashtirish
                </span>
                <span className="sm:hidden">E&apos;lon</span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-[#002f34]"
                aria-label="Menyu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="mt-2.5 md:hidden">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Nima qidiryapsiz?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f2f4f5] text-[#002f34] text-xs pl-3.5 pr-9 py-2 rounded-full outline-none focus:bg-white focus:ring-1 focus:ring-[#23e5db]"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Mobile dropdown drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-3 pb-2 border-t border-gray-100 mt-2 space-y-2">
              {!isLoggedIn ? (
                <div className="flex gap-2 pb-2">
                  <button
                    onClick={() => openAuthModal("login")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-[#002f34]"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Kirish</span>
                  </button>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#f2f4f5] text-xs font-semibold text-[#002f34]"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Ro&apos;yxat</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pb-2 px-1">
                  <div className="w-8 h-8 rounded-full bg-[#002f34] text-white flex items-center justify-center text-xs font-bold">
                    AN
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#002f34]">Anvar N.</p>
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="text-[11px] text-teal-700 hover:underline">
                      Profilga o&apos;tish →
                    </Link>
                  </div>
                </div>
              )}

              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#002f34] hover:bg-gray-50"
              >
                <LayoutGrid className="w-4 h-4 text-[#23e5db]" />
                <span>Barcha ruknlar</span>
              </Link>

              <Link
                href="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#002f34] hover:bg-gray-50"
              >
                <Heart className="w-4 h-4 text-red-500" />
                <span>Sevimlilar</span>
              </Link>

              <Link
                href="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#002f34] hover:bg-gray-50"
              >
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span>Xabarlar</span>
              </Link>

              <div className="px-3 py-1 text-xs text-gray-500 font-medium">
                Hudud: {selectedCity}
              </div>
              <div className="flex flex-wrap gap-1 px-2">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCity(c)}
                    className={`text-xs px-2.5 py-1 rounded-full border ${
                      selectedCity === c
                        ? "bg-[#002f34] text-white border-[#002f34]"
                        : "bg-white text-gray-700 border-gray-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authTab}
      />
    </>
  );
}
