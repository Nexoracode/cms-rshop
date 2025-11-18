"use client";

import { useSearchParams } from "next/navigation";
import { useGetSupportDetail } from "@/core/hooks/api/support/useSupport";

const ConversationDetail = () => {
  const searchParams = useSearchParams();
  const chatId = Number(searchParams.get("chat-id"));

  const { data, isLoading, error } = useGetSupportDetail(chatId);

  if (!chatId) return <p>یک گفت‌وگو انتخاب کنید</p>;
  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت اطلاعات</p>;

  return (
    <div className="p-4 border rounded-md">
      <p className="font-semibold mb-2">Conversation Detail:</p>
      <pre className="text-xs bg-gray-100 p-3 rounded">
        {JSON.stringify(data?.data, null, 2)}
      </pre>
    </div>
  );
};

export default ConversationDetail;
