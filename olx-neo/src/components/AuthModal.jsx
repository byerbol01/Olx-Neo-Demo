"use client";

import React, { useState } from "react";
import { X, Phone, Lock, User, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function AuthModal({ isOpen, onClose, initialTab = "login" }) {
  const [tab, setTab] = useState(initialTab);
  const [phoneNumber, setPhoneNumber] = useState("+998 ");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpSent(true);
    alert("Tasdiqlash kodi telefoningizga yuborildi! (Sinov kodi: 1234)");
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otpCode === "1234" || otpCode.length === 4 || password) {
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setOtpSent(false);
        window.location.reload();
      }, 1000);
    } else {
      alert("Kod noto'g'ri. Iltimos, 1234 kodini kiriting.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 mb-1">
            <span className="text-2xl font-black text-[#002f34]">olx</span>
            <span className="bg-[#23e5db] text-[#002f34] text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full">
              NEO
            </span>
          </div>
          <h2 className="text-xl font-black text-[#002f34]">
            {tab === "login" ? "Hisobga kirish" : "Ro'yxatdan o'tish"}
          </h2>
          <p className="text-xs text-gray-500">
            {tab === "login"
              ? "E'lonlaringizni boshqarish va xabarlarni ko'rish"
              : "OLX Neo savdo maydonchasining to'liq imkoniyatlaridan foydalaning"}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-[#f2f4f5] p-1 rounded-2xl mb-6">
          <button
            onClick={() => {
              setTab("login");
              setOtpSent(false);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === "login"
                ? "bg-white text-[#002f34] shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Kirish
          </button>
          <button
            onClick={() => {
              setTab("signup");
              setOtpSent(false);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === "signup"
                ? "bg-white text-[#002f34] shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Ro&apos;yxatdan o&apos;tish
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-bold text-sm text-[#002f34]">
              Muvaffaqiyatli! Tizimga kirilmoqda...
            </h3>
          </div>
        ) : !otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {tab === "signup" && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#002f34]">
                  Ismingiz
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: Sardor"
                    required
                    className="w-full bg-[#f2f4f5] text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#002f34]">
                Telefon raqamingiz
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  required
                  className="w-full bg-[#f2f4f5] text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>SMS kod olish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* OneID Login alternative */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  alert("OneID orqali muvaffaqiyatli avtorizatsiya qilindi!");
                  onClose();
                }}
                className="w-full py-2.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center gap-2 border border-teal-200 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>OneID orqali kirish</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1 text-center">
              <label className="text-xs font-bold text-[#002f34]">
                SMS kodni kiriting
              </label>
              <p className="text-[11px] text-gray-500">
                {phoneNumber} raqamiga yuborilgan 4 xonali kod
              </p>
              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="1234"
                autoFocus
                required
                className="w-36 mx-auto text-center tracking-[8px] font-mono font-black text-xl bg-[#f2f4f5] py-2 rounded-xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#23e5db] hover:bg-[#1cd1c7] active:scale-95 text-[#002f34] font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Tasdiqlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-center text-xs text-gray-500 hover:text-gray-800"
            >
              Raqamni o&apos;zgartirish
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
