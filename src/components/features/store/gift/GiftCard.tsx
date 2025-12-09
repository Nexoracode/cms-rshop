"use client";

import BaseCard from "@/components/ui/BaseCard";
import { toPersianUTC } from "@/core/utils/date";
import { LuGift, LuPackage } from "react-icons/lu";
import StatusBadge from "@/components/shared/StatusBadge";
import { FiPackage } from "react-icons/fi";

type GiftCardProps = {
  gift: {
    id: number;
    name: string;
    description?: string | null;
    price: string | number;
    image?: string | null;
    status: "active" | "disable";
    display_order: number;
    created_at: string;
    is_for_gift: boolean;
  };
};

const GiftCard: React.FC<GiftCardProps> = ({ gift }) => {
  return (
    <BaseCard
      bodyClassName="flex flex-col gap-4 p-4"
      redirect={`/admin/store/gift-wrapping/create?edit_id=${gift.id}`}
    >
      {/* هدر کارت */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {gift.is_for_gift ? (
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-dashed border-pink-300 rounded-xl p-4">
              <LuGift className="text-3xl text-pink-600" />
            </div>
          ) : (
            <div className="bg-sky-50 border-2 border-dashed border-sky-300 rounded-xl p-4">
              <FiPackage className="text-3xl text-sky-400" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-gray-800">{gift.name}</h3>
            <span className="text-xs text-gray-500">
              {toPersianUTC(gift.created_at, { showTime: false })}
            </span>
          </div>
        </div>

        <StatusBadge
          isActive={gift.status === "active" ? true : false}
          size="md"
        />
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
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-48 h-44 flex flex-col items-center justify-center text-gray-400">
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
