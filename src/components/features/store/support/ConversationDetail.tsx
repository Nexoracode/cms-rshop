"use client";

import { useSearchParams } from "next/navigation";
import {
  useGetSupportDetail,
  useReplySupport,
} from "@/core/hooks/api/support/useSupport";
import { toPersianUTC } from "@/core/utils/date";
import { useState, useRef, useEffect } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { AiOutlineSmile } from "react-icons/ai";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";

/**
 * مجموعه بزرگی از ایموجی‌های متداول (بدون موارد توهین‌آمیز).
 * اگر خواستی می‌تونم لیست بیشتری اضافه کنم یا حذف/اضافه کنم.
 */
const EMOJI_CATEGORIES: Record<string, string[]> = {
  "صورتک‌ها": [
    "😀","😃","😄","😁","😆","😅","😂","🤣","🙂","🙃",
    "😉","😊","😇","🥰","😍","🤩","😘","😗","☺️","😚",
    "😙","😋","😛","😜","🤪","🤨","🧐","🤓","😎","🥳",
    "🤠","😏","😒","😞","😔","😟","😕","🙁","☹️","😣",
    "😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬",
    "🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗"
  ],
  "حرکات": ["👍","👎","👏","🙌","👐","🤝","🙏","🤘","✌️","🤙","👌","✋","👋"],
  "مردم": ["👶","🧒","👦","👧","🧑","👩","👨","👵","👴","👮‍♀️","👩‍⚕️","👨‍🍳","🧑‍🏫"],
  "خوراکی": ["🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍒","🍑","🍍","🥭","🍔","🍟","🍕","🌭","🍣","🍱","🍩","🍪","☕","🍺","🍷"],
  "اشیاء": ["⌚","📱","💻","⌨️","🖥️","🖨️","📷","🎧","📺","📻","🔑","💡","📦","🔧"],
  "نمادها": ["❤️","🧡","💛","💚","💙","💜","🖤","💔","✨","⭐","🔥","💥","💫"],
  "فعالیت/ورزش": ["⚽","🏀","🏈","🎾","🏐","🏆","🎮","🎲","🏃‍♂️","🚴‍♀️","⛳","🏊‍♀️"]
};

const ConversationDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const chatId = Number(searchParams.get("chat-id"));

  const [message, setMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = useGetSupportDetail(chatId);
  const replyMutation = useReplySupport(chatId);

  // scroll to bottom on data change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  // focus input and set caret to end
  const focusInputToEnd = () => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    const length = el.value.length;
    try {
      el.setSelectionRange(length, length);
    } catch {
      // some browsers/input types might throw; ignore safely
    }
  };

  const handleSend = () => {
    if (!message.trim() || !chatId) return;
    replyMutation.mutate(message, {
      onSuccess: () => {
        setMessage("");
        // ensure focus remains for quick replies
        setTimeout(() => focusInputToEnd(), 50);
      },
    });
  };

  const handleEmojiClick = (emoji: string) => {
    // add emoji, close popover and focus input
    setMessage((prev) => prev + emoji);
    setIsPopoverOpen(false);
    // focus after closing (slight delay to allow popover unmount)
    setTimeout(() => focusInputToEnd(), 50);
  };

  if (!chatId)
    return (
      <div className="flex flex-1 items-center justify-center text-gray-400 text-sm">
        یک گفت‌وگو انتخاب کنید
      </div>
    );

  if (isLoading) return <div className="p-4 text-sm">در حال بارگذاری...</div>;

  const conv = data?.data;
  if (!conv)
    return (
      <div className="p-4 text-red-500 text-sm">مشکلی در دریافت اطلاعات رخ داد</div>
    );

  return (
    <div className="relative flex flex-col w-full h-[60vh] rounded-lg overflow-hidden">
      {/* subtle grayscale background with dark overlay (no blur on content) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center filter grayscale"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/564x/d2/a7/76/d2a77609f5d97b9081b117c8f699bd37.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* content on top */}
      <div className="relative z-10 flex flex-col h-full">
        {/* header */}
        <div className="px-4 py-3 border-b bg-white/80 backdrop-blur-sm">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {conv.subject}
          </p>
        </div>

        {/* messages area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {conv.messages.map((msg: any) => {
            const isAdmin = msg.sender?.role === "admin";
            // use self-start/self-end to ensure correct side in RTL/LTR
            return (
              <div
                key={msg.id}
                className={`${isAdmin ? "self-end" : "self-start"} flex flex-col max-w-[78%]`}
              >
                <div
                  className={`px-4 py-2 rounded-lg shadow-sm whitespace-pre-wrap break-words ${
                    isAdmin
                      ? "bg-slate-100 text-slate-800" // soft admin bubble
                      : "bg-white text-gray-800 border"
                  }`}
                >
                  <div className="text-sm">{msg.content}</div>
                  {/* timestamp under the message */}
                  <div className={`text-[11px] mt-2 ${isAdmin ? "text-gray-500 text-left" : "text-gray-500 text-right"}`}>
                    {toPersianUTC(msg.created_at)}
                  </div>
                </div>
                {/* small sender label above or below — keep subtle */}
                <div className="mt-1 text-[11px] text-gray-400">
                  {msg.sender?.name}
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* input row */}
        <div className="px-3 py-2 border-t bg-white/90 backdrop-blur-sm flex items-center gap-2">
          {/* Hero UI Popover controlled */}
          <Popover
            isOpen={isPopoverOpen}
            onOpenChange={(v: boolean) => setIsPopoverOpen(v)}
            placement="top"
            backdrop="transparent"
            offset={8}
            showArrow
            className="relative"
          >
            <PopoverTrigger>
              <button
                aria-label="انتخاب ایموجی"
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <AiOutlineSmile size={20} />
              </button>
            </PopoverTrigger>

            <PopoverContent
              className="w-[330px] max-h-60 overflow-y-auto bg-white border rounded-xl shadow-lg p-3"
              // titleProps pattern: use function child for accessibility if needed
            >
              {/* render all categories sequentially; each category has a thin label and a grid */}
              {Object.entries(EMOJI_CATEGORIES).map(([cat, emojis]) => (
                <div key={cat} className="mb-3 last:mb-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">{cat}</span>
                    <span className="text-[11px] text-gray-400">{emojis.length}</span>
                  </div>

                  <div className="grid grid-cols-8 gap-2">
                    {emojis.map((e) => (
                      <button
                        key={e}
                        onClick={(ev) => {
                          ev.stopPropagation();
                          handleEmojiClick(e);
                        }}
                        className="p-1 text-lg rounded hover:bg-gray-100 transition"
                        aria-label={`ایموجی ${e}`}
                        type="button"
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </PopoverContent>
          </Popover>

          {/* input */}
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 bg-white border rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />

          <button
            onClick={handleSend}
            disabled={replyMutation.isPending || !message.trim()}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white p-2 disabled:opacity-50 transition"
            aria-label="ارسال پیام"
            title="ارسال"
          >
            <HiOutlinePaperAirplane size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetail;
