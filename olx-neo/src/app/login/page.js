import React from "react";
import Link from "next/link";
import { Phone, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Tizimga kirish",
  description: "OLX Neo hisobingizga kiring va barcha e'lonlaringizni boshqaring.",
};

export default function LoginPage() {
  return (
    <div className="max-w-[480px] mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-2">
            <span className="text-3xl font-black text-[#002f34]">olx</span>
            <span className="bg-[#23e5db] text-[#002f34] text-xs font-black uppercase px-2 py-0.5 rounded-full">
              NEO
            </span>
          </Link>
          <h1 className="text-2xl font-black text-[#002f34]">
            Hisobga kirish
          </h1>
          <p className="text-xs text-gray-500">
            E&apos;lonlaringizni boshqarish va xaridorlar bilan muloqot qilish
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002f34] block">
              Telefon raqami yoki Email
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="+998 90 123 45 67"
                defaultValue="+998 90 123 45 67"
                className="w-full bg-[#f2f4f5] text-xs font-medium pl-10 pr-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#002f34]">Parol</label>
              <a href="#" className="text-teal-700 hover:underline">
                Parolni unutdingizmi?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="••••••••"
                defaultValue="password123"
                className="w-full bg-[#f2f4f5] text-xs font-medium pl-10 pr-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
              />
            </div>
          </div>

          <Link
            href="/profile"
            className="w-full py-3.5 rounded-2xl bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Kirish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="relative flex items-center justify-center pt-2">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-gray-400 uppercase font-bold absolute">
              Yoki
            </span>
          </div>

          <button
            type="button"
            className="w-full py-3 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-[#008f87]" />
            <span>OneID orqali xavfsiz kirish</span>
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Hisobingiz yo&apos;qmi?{" "}
          <Link href="/signup" className="font-bold text-teal-800 hover:underline">
            Ro&apos;yxatdan o&apos;tish
          </Link>
        </div>
      </div>
    </div>
  );
}
