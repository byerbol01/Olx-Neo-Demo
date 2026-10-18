"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  Phone,
  MoreVertical,
  ExternalLink,
  ShieldAlert,
  Send,
  Paperclip,
  CheckCheck,
  Truck,
  Headphones,
  Lock,
} from "lucide-react";
import { useRealtimeChat } from "@/lib/realtimeChat";

export default function MessagesPage() {
  const {
    chats,
    activeChat,
    activeChatId,
    totalUnread,
    isTyping,
    selectChat,
    sendMessage,
  } = useRealtimeChat();

  const [chatFilter, setChatFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e?.preventDefault();
    if (inputText.trim()) {
      sendMessage(activeChatId, inputText.trim(), "me");
      setInputText("");
    }
  };

  const handleQuickReply = (text) => {
    sendMessage(activeChatId, text, "me");
  };

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.item.shortTitle.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (chatFilter === "unread") return chat.unread > 0;
    return true;
  });

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6">
      {/* 1. Breadcrumbs & Security Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#002f34] transition-colors">
            Bosh sahifa
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#002f34]">Xabarlar markazi</span>
        </nav>

        <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 text-teal-800 px-3 py-1 rounded-full font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#23e5db] animate-pulse"></span>
          <span>Jonli Real-Time Aloqa (BroadcastChannel)</span>
        </div>
      </div>

      {/* 2. Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#002f34] tracking-tight">
            Xabarlar
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Xaridorlar va sotuvchilar bilan real vaqtda xavfsiz muloqot
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            Jami suhbatlar: {chats.length}
          </span>
          {totalUnread > 0 && (
            <span className="bg-[#fff4d2] border border-[#ffce32]/50 text-[#7a5200] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ffce32]"></span>
              {totalUnread} ta o&apos;qilmagan
            </span>
          )}
        </div>
      </div>

      {/* 3. Main Chat Interface Container */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* ================= LEFT SIDEBAR (CONVERSATIONS LIST) ================= */}
        <div className="lg:col-span-4 border-r border-gray-100 flex flex-col bg-[#fafbfc]">
          {/* Search inside chats */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Xabarlardan qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f2f4f5] text-xs pl-9 pr-3.5 py-2.5 rounded-xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setChatFilter("all")}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  chatFilter === "all"
                    ? "bg-[#002f34] text-white"
                    : "bg-[#f2f4f5] text-gray-600 hover:bg-gray-200"
                }`}
              >
                Barchasi ({chats.length})
              </button>
              <button
                onClick={() => setChatFilter("unread")}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  chatFilter === "unread"
                    ? "bg-[#002f34] text-white"
                    : "bg-[#f2f4f5] text-gray-600 hover:bg-gray-200"
                }`}
              >
                O&apos;qilmagan
              </button>
            </div>
          </div>

          {/* Conversations Scroll Area */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filteredChats.map((chat) => {
              const isSelected = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  onClick={() => selectChat(chat.id)}
                  className={`w-full text-left p-4 flex items-start gap-3 transition-colors ${
                    isSelected
                      ? "bg-white border-l-4 border-l-[#23e5db]"
                      : "hover:bg-white"
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={chat.user.avatar}
                      alt={chat.user.name}
                      className="w-11 h-11 rounded-full object-cover border border-gray-200"
                    />
                    {chat.user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-bold text-xs sm:text-sm text-[#002f34] truncate">
                          {chat.user.name}
                        </span>
                        {chat.user.role && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-teal-50 text-teal-700">
                            {chat.user.role}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                        {chat.lastTime}
                      </span>
                    </div>

                    <div className="text-[11px] text-teal-800 font-semibold truncate flex items-center gap-1 mt-0.5">
                      <span className="text-gray-400">📦</span>
                      <span>{chat.item?.shortTitle}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-1">
                      <p className="text-xs text-gray-500 truncate leading-snug">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="w-4 h-4 rounded-full bg-[#ffce32] text-[#002f34] font-black text-[10px] flex items-center justify-center shrink-0">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT ACTIVE CHAT ================= */}
        {activeChat ? (
          <div className="lg:col-span-8 flex flex-col bg-white">
            {/* Top Bar */}
            <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={activeChat.user.avatar}
                    alt={activeChat.user.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  {activeChat.user.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-[#002f34]">
                      {activeChat.user.name}
                    </h3>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-teal-50 text-teal-700">
                      {activeChat.user.role}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold hidden sm:inline">
                      • {activeChat.user.lastSeen}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                    <span className="font-medium text-[#002f34]">
                      {activeChat.item?.shortTitle}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-emerald-700">
                      {activeChat.item?.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/product/macbook-pro-16"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-[#002f34] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">E&apos;longa o&apos;tish</span>
                </Link>

                <button
                  onClick={() => alert("+998 90 123 45 67 raqamiga ulanmoqda...")}
                  className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-[#002f34]"
                  aria-label="Qo'ng'iroq qilish"
                >
                  <Phone className="w-4 h-4" />
                </button>

                <button
                  className="w-8 h-8 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-500"
                  aria-label="Ko'proq"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#f8fafc]/50">
              <div className="flex justify-center">
                <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  Bugun
                </span>
              </div>

              {/* Safety notice */}
              <div className="bg-[#e6faf9] border border-[#23e5db]/40 rounded-2xl p-3.5 text-xs text-[#002f34] flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-[#008f87] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="font-bold">Xavfsizlik eslatmasi:</strong> Barcha
                  suhbatlar va to&apos;lovlarni OLX Neo orqali amalga oshiring.
                  Begona havolalarga bank karta ma&apos;lumotlarini kiritmang!
                </p>
              </div>

              {/* Messages list */}
              {activeChat.messages?.map((msg) => {
                const isMe = msg.sender === "me";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMe && (
                      <img
                        src={activeChat.user.avatar}
                        alt={activeChat.user.name}
                        className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                      />
                    )}

                    <div
                      className={`max-w-[80%] sm:max-w-md rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                        isMe
                          ? "bg-[#002f34] text-white rounded-br-none"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                          isMe ? "text-gray-300" : "text-gray-400"
                        }`}
                      >
                        <span>{msg.time}</span>
                        {isMe && (
                          <CheckCheck className="w-3.5 h-3.5 text-[#23e5db]" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-gray-400 italic pl-9">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                  <span>{activeChat.user.name} yozmoqda...</span>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {activeChat.quickReplies && (
              <div className="px-4 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap">
                  Tezkor:
                </span>
                {activeChat.quickReplies.map((qr) => (
                  <button
                    key={qr}
                    type="button"
                    onClick={() => handleQuickReply(qr)}
                    className="px-3 py-1 rounded-full bg-[#f2f4f5] hover:bg-[#e6faf9] hover:text-[#002f34] text-gray-600 text-[11px] font-medium whitespace-nowrap transition-colors"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 sm:p-4 border-t border-gray-100 flex items-center gap-2 bg-white"
            >
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-[#002f34] rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Fayl biriktirish"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder="Xabar yozing (Real-time sinxronizatsiya)..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-[#f2f4f5] text-[#002f34] placeholder-gray-400 text-xs sm:text-sm px-4 py-2.5 rounded-full outline-none focus:bg-white focus:ring-2 focus:ring-[#23e5db]/30 border border-transparent focus:border-[#23e5db] transition-all"
              />

              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#23e5db] hover:bg-[#1cd1c7] active:scale-95 text-[#002f34] flex items-center justify-center shadow-sm transition-all"
                aria-label="Yuborish"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-8 flex items-center justify-center p-12 text-gray-400 text-sm">
            Suhbatni tanlang
          </div>
        )}
      </div>

      {/* 4. Bottom 3 Safe feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#002f34]">
              Neo Xavfsiz Savdo
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
              Mablag&apos; mahsulot tekshirilgandan so&apos;ng sotuvchiga o&apos;tkaziladi.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#002f34]">
              Kuryer orqali yetkazish
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
              Toshkent bo&apos;ylab 3 soat ichida eshikkacha yetkazib berish.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#002f34]">
              24/7 Qo&apos;llab-quvvatlash
            </h4>
            <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
              Har qanday shubhali holatda darhol moderatorga xabar bering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
