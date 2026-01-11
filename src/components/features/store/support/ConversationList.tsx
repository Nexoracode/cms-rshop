"use client";

import React from "react";
import { toPersianUTC } from "@/core/utils/date";
import { LuUser } from "react-icons/lu";
import { useRouter, useSearchParams } from "next/navigation";

type ConversationListProps = {
  conversations: Record<string, any>[];
};

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (conv: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("chat-id", conv.id);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  console.log(conversations);

  return (
    <aside className="min-w-64 max-w-64 border-l max-h-[60vh] overflow-y-auto rounded-md py-1 px-2 flex flex-col gap-2.5">
      {conversations.map((conv, index) => {
        const selectedId = Number(searchParams.get("chat-id"));
        const isSelected = selectedId === conv.id;

        return (
          <div
            key={conv.id}
            onClick={() => handleSelect(conv)}
            className={`flex flex-col shadow-none !h-[90px] ${index !== conversations.length - 1 ? "border-b" : ""} cursor-pointer py-2 px-2.5 hover:scale-95 transition 
              ${isSelected ? "bg-white shadow-md" : ""}`}
          >
            <div>
              <div className="flex items-center gap-2">
                <LuUser className="bg-white p-1 text-gray-600 border border-gray-300 rounded-full text-2xl" />
                {/*  {/* تاریخ آخرین پیام */}
                <p className="text-xs text-gray-400 mt-0.5 text-left">
                  {toPersianUTC(conv.messages[0].created_at)}
                </p>
              </div>
              <p className="text-gray-700 text-xs truncate mt-2">
                {conv.messages[0].content}
              </p>
            </div>

            {conv.product && (
              <div className="mt-1.5">
                <p className="text-xs text-gray-500 truncate">
                  {conv.product.title}
                </p>
              </div>
            )}
            {!conv.product && (
              <p className="text-xs text-orange-400 w-fit truncate mt-2">
                {conv.subject}
              </p>
            )}
          </div>
        );
      })}
    </aside>
  );
};

export default ConversationList;
