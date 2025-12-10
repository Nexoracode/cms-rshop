"use client";

import BaseCard from "@/components/ui/BaseCard";
import { toPersianUTC } from "@/core/utils/date";
import { LuGift, LuPackage } from "react-icons/lu";
import StatusBadge from "@/components/shared/StatusBadge";
import { FiPackage } from "react-icons/fi";
import { price } from "@/core/utils/helper";

type GiftWrappingCardProps = {
  gift: {
    id: number;
    name: string;
    description?: string | null;
    price: string | number;
    image?: any;
    status: "active" | "disable";
    display_order: number;
    created_at: string;
    is_for_gift: boolean;
  };
};

const GiftWrappingCard: React.FC<GiftWrappingCardProps> = ({ gift }) => {
  return (
    <BaseCard
      bodyClassName="flex flex-col gap-4 p-4"
      redirect={`/admin/store/gift-wrapping/create?edit_id=${gift.id}`}
    >
      {/* هدر کارت */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {gift.is_for_gift ? (
            <>
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 border-2 border-dashed border-pink-300 rounded-xl p-4">
                <LuGift className="text-3xl text-pink-600" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-md font-bold text-gray-800">{gift.name}</h3>
                <p className="text-pink-600">هدیه</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-sky-50 border-2 border-dashed border-sky-300 rounded-xl p-4">
                <FiPackage className="text-3xl text-sky-400" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-gray-800">{gift.name}</h3>
                <p className="text-sky-500">بسته بندی</p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <StatusBadge
            className="w-fit"
            isActive={gift.status === "active" ? true : false}
          />
          <p>{price(gift.price)}</p>
        </div>
      </div>

      {/* تصویر یا placeholder */}
      <div className="flex justify-center my-2">
        {gift.image ? (
          <img
            src={gift.image.url}
            alt={gift.name}
            className="w-full h-48 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-48 h-44 flex flex-col items-center justify-center text-gray-400">
            <LuPackage className="text-5xl mb-2" />
            <p className="text-sm">بدون تصویر</p>
          </div>
        )}
      </div>
    </BaseCard>
  );
};

export default GiftWrappingCard;
