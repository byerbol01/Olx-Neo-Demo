import React from "react";
import Link from "next/link";
import { User, Phone, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Ro'yxatdan o'tish",
  description: "OLX Neo platformasida ro'yxatdan o'ting va bepul e'lon joylashtiring.",
};

export default function SignupPage() {
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
            Ro&apos;yxatdan o&apos;tish
          </h1>
          <p className="text-xs text-gray-500">
            Bepul ro&apos;yxatdan o&apos;ting va savdo qilishni boshlang
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002f34] block">
              Ism va Familiya
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ismingizni kiriting"
                className="w-full bg-[#f2f4f5] text-xs font-medium pl-10 pr-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002f34] block">
              Telefon raqami
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="+998 90 123 45 67"
                className="w-full bg-[#f2f4f5] text-xs font-medium pl-10 pr-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#002f34] block">
              Parol o&apos;ylab toping
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Kamida 8 ta belgi"
                className="w-full bg-[#f2f4f5] text-xs font-medium pl-10 pr-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
              />
            </div>
          </div>

          <Link
            href="/profile"
            className="w-full py-3.5 rounded-2xl bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Davom etish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            type="button"
            className="w-full py-3 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors mt-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#008f87]" />
            <span>OneID orqali tezkor ro&apos;yxatdan o&apos;tish</span>
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Hisobingiz bormi?{" "}
          <Link href="/login" className="font-bold text-teal-800 hover:underline">
            Kirish
          </Link>
        </div>
      </div>
    </div>
  );
}
