"use client";

import { useSearchParams } from "next/navigation";
import {
  useGetSupportDetail,
  useReplySupport,
} from "@/core/hooks/api/support/useSupport";
import { toPersianUTC } from "@/core/utils/date";
import { useState, useRef, useEffect } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { BsEmojiGrimace } from "react-icons/bs";

const EMOJI_CATEGORIES: Record<string, string[]> = {
  "صورتک‌ها": [
    "😀","😃","😄","😁","😆","😅","😂","🤣","🥹","🙂","🙃","😉","😊","😇","🥰","😍","🤩","😘","😗","☺️","😚",
    "😙","😋","😛","😜","🤪","😏","🥳","🤩","🤗","🤭","🤫","🤔","🫡","🥸","😎"
  ],
  "احساسات": ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","💔","❣️","💕","💞","💓","💗","💖","✨","⭐","🌟","💫"],
  "حرکات دست": ["👍","👎","👌","✌️","🤞","🤟","🤘","🤌","👈","👉","👆","👇","☝️","✋","🤚","🖐️","🫲","🫳"],
  "غذا و نوشیدنی": ["🍎","🍊","🍋","🍌","🍉","🍇","🍓","🍑","🍍","🥭","🍔","🍕","🌮","🍣","🍰","🎂","☕","🍵","🍺"],
  "فعالیت": ["⚽","🏀","🏈","⚾","🎾","🏐","🏓","🎯","🎮","🎲","🎪","🎨","🎭","🎪","✈️","🚗","🚀"]
};

const ConversationDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const chatId = Number(searchParams.get("chat-id"));

  const [message, setMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetSupportDetail(chatId);
  const replyMutation = useReplySupport(chatId);

  // اسکرول خودکار به پایین
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  // قرار دادن کرسر در انتهای متن
  const placeCaretAtEnd = () => {
    const input = inputRef.current;
    if (!input) return;
    input.focus();
    const length = input.value.length;
    input.setSelectionRange(length, length);
  };

  const handleSend = () => {
    if (!message.trim() || replyMutation.isPending) return;
    
    replyMutation.mutate(message, {
      onSuccess: () => {
        setMessage("");
        setTimeout(placeCaretAtEnd, 100);
      },
    });
  };

  const handleEmojiClick = (emoji: string) => {
    const newMessage = message + emoji;
    setMessage(newMessage);
    setIsPopoverOpen(false);
    
    // کرسر را دقیقاً بعد از ایموجی جدید قرار می‌دهیم
    setTimeout(() => {
      const input = inputRef.current;
      if (input) {
        input.focus();
        const pos = newMessage.length;
        input.setSelectionRange(pos, pos);
      }
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chatId) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400 text-lg font-medium">
        یک گفت‌وگو انتخاب کنید
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
          <span>در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  const conv = data?.data;
  if (!conv) {
    return (
      <div className="flex h-full items-center justify-center text-red-500">
        مشکلی در دریافت اطلاعات رخ داد
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-[60vh] bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
      {/* پس‌زمینه مینیمال و زیبا */}
      <div 
        className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 -z-10"
      />

      {/* هدر */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 backdrop-blur-xl bg-opacity-90">
        <h2 className="text-lg font-bold text-gray-800 truncate">{conv.subject}</h2>
        <p className="text-xs text-gray-500 mt-1">پشتیبانی • تیکت #{chatId}</p>
      </div>

      {/* منطقه پیام‌ها */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-gray-300">
        {conv.messages.map((msg: any) => {
          const isAdmin = msg.sender?.role === "admin";
          
          return (
            <div
              key={msg.id}
              className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex flex-col ${isAdmin ? "items-end" : "items-start"} max-w-[80%]`}>
                {/* نام فرستنده */}
                <span className="text-xs font-medium text-gray-500 mb-1 px-1">
                  {msg.sender?.name || (isAdmin ? "پشتیبانی" : "شما")}
                </span>

                {/* باکس پیام */}
                <div
                  className={`relative px-4 py-3 rounded-2xl shadow-sm transition-all ${
                    isAdmin
                      ? "bg-gradient-to-l from-blue-500 to-blue-600 text-white rounded-tr-sm"
                      : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                  
                  {/* زمان */}
                  <span className={`block text-xs mt-2 ${isAdmin ? "text-blue-100" : "text-gray-400"}`}>
                    {toPersianUTC(msg.created_at)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* نوار ورودی */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-end gap-3">
          {/* دکمه ایموجی */}
          <Popover
            isOpen={isPopoverOpen}
            onOpenChange={setIsPopoverOpen}
            placement="top-start"
            offset={12}
            showArrow
          >
            <PopoverTrigger asChild>
              <button
                className="p-2.5 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                aria-label="انتخاب ایموجی"
              >
                <BsEmojiGrimace size={22} />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-80 max-h-96 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
              {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
                <div key={category} className="mb-5 last:mb-0">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2 px-1">
                    {category}
                  </h4>
                  <div className="grid grid-cols-9 gap-1.5">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiClick(emoji)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all hover:scale-110 text-xl"
                        aria-label={emoji}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </PopoverContent>
          </Popover>

          {/* اینپوت */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="پیام خود را بنویسید..."
              className="w-full px-5 py-3 pr-12 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all placeholder-gray-400"
            />
          </div>

          {/* دکمه ارسال */}
          <button
            onClick={handleSend}
            disabled={!message.trim() || replyMutation.isPending}
            className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
            aria-label="ارسال پیام"
          >
            <HiOutlinePaperAirplane size={20} className="rotate-[-45deg]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;