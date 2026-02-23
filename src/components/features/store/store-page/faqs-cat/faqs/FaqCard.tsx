"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import BaseCard from "@/components/ui/BaseCard";
import { useDeleteFaq } from "@/core/hooks/api/faq/useFaq";

type FaqCardProps = {
  data: any;
  onEdit?: (faq: Record<string, any>) => void;
  disableAction?: boolean;
};

const FaqCard: React.FC<FaqCardProps> = ({ onEdit, disableAction, data }) => {
  const { mutate: deleteFaq } = useDeleteFaq();

  return (
    <BaseCard
      bodyClassName="p-2 hover-reveal-parent group cursor-pointer"
      onClick={() => onEdit?.(data)}
      className="rounded-md shadow-none border border-gray-200 hover:shadow-md"
    >
      {/* دکمه حذف */}
      <div className="hover-reveal-child">
        {!disableAction ? (
          <DeleteButton onDelete={() => deleteFaq(data.id)} />
        ) : null}
      </div>

      {/* آیکون دسته‌بندی */}
      <div className="border-b border-gray-200 px-4 py-4 w-full flex items-center justify-center">
        <div
          className="[&>svg]:w-8 [&>svg]:h-auto [&>svg]:max-h-12"
          dangerouslySetInnerHTML={{ __html: data?.faq_category?.icon?.svg }}
        />
      </div>

      {/* عنوان سوال */}
      <p className="text-[14px] font-medium text-center pt-2">
        {data.question}
      </p>

      {/* پاسخ کوتاه */}
      <p className="text-[13px] text-center text-gray-500 pt-1">
        {data.answer.length > 80
          ? data.answer.slice(0, 80) + "..."
          : data.answer}
      </p>
    </BaseCard>
  );
};

export default FaqCard;
