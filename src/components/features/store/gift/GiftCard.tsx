"use client";

import BaseCard from "@/components/ui/BaseCard";
import { Chip } from "@heroui/react";
import { toPersianUTC } from "@/core/utils/date";
import { LuGift, LuPackage } from "react-icons/lu";

type GiftCardProps = {
  gift: {
    id: number;
    name: string;
    description?: string | null;
    price: string | number;
    image?: string | null;
    status: "active" | "inactive";
    display_order: number;
    created_at: string;
    is_for_gift: boolean;
  };
};

const GiftCard: React.FC<GiftCardProps> = ({ gift }) => {
  const isActive = gift.status === "active";

  return (
    <BaseCard
      bodyClassName="flex flex-col gap-4 p-5 min-w-[320px] sm:w-[386px] md:w-full hover:shadow-lg transition-shadow"
      redirect={`/admin/store/gift-wrapping/edit/${gift.id}`}
      className="cursor-pointer"
    >
      {/* هدر کارت */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-dashed border-pink-300 rounded-xl p-4">
            <LuGift className="text-3xl text-pink-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{gift.name}</h3>
            <span className="text-xs text-gray-500">
              {toPersianUTC(gift.created_at, { showTime: false })}
            </span>
          </div>
        </div>

        {/* وضعیت فعال/غیرفعال */}
        <Chip
          size="sm"
          variant={isActive ? "flat" : "faded"}
          color={isActive ? "success" : "danger"}
          className="font-medium"
        >
            {isActive ? "فعال" : "غیرفعال"}
        </Chip>
      </div>

      {/* تصویر یا placeholder */}
      <div className="flex justify-center my-2">
        {gift.image ? (
          <img
            src={gift.image}
            alt={gift.name}
            className="w-full max-w-xs h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-full max-w-xs h-48 flex flex-col items-center justify-center text-gray-400">
            <LuPackage className="text-5xl mb-2" />
            <p className="text-sm">بدون تصویر</p>
          </div>
        )}
      </div>

      {/* توضیحات کوتاه */}
      {gift.description && (
        <p className="text-sm text-gray-600 line-clamp-2 text-right leading-relaxed">
          {gift.description}
        </p>
      )}

      {/* فوتر: قیمت + ترتیب نمایش */}
      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">ترتیب نمایش:</span>
          <span className="font-bold text-lg text-primary">
            #{gift.display_order}
          </span>
        </div>

        <div className="text-left">
          <span className="text-2xl font-bold text-green-600">
            {Number(gift.price).toLocaleString("fa-IR")}
          </span>
          <span className="text-sm text-gray-600 mr-1">تومان</span>
        </div>
      </div>
    </BaseCard>
  );
};

export default GiftCard;