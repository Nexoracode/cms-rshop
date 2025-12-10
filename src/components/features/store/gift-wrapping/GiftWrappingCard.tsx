"use client";

import BaseCard from "@/components/ui/BaseCard";
import { LuGift, LuPackage } from "react-icons/lu";
import StatusBadge from "@/components/shared/StatusBadge";
import { FiPackage } from "react-icons/fi";

type GiftWrappingCardProps = {
  gift: {
    id: number;
    name: string;
    description?: string | null;
    price: string | number;
    image?: any;
    status: "active" | "inactive";
    display_order: number;
    created_at: string;
    is_for_gift: boolean;
  };
};

const GiftWrappingCard: React.FC<GiftWrappingCardProps> = ({ gift }) => {
  return (
    <BaseCard
      bodyClassName="flex flex-col gap-4 p-2"
      redirect={`/admin/store/gift-wrapping/create?edit_id=${gift.id}`}
    >
      <h3 className="text-md text-center font-semibold text-gray-700 mt-2">
        {gift.name}
      </h3>

      <div className="flex justify-center">
        {gift.image ? (
          <div className="relative">
            <img
              src={gift.image.url}
              alt={gift.name}
              className="w-full object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
            {gift.status === "inactive" ? (
              <StatusBadge
                className="w-fit absolute top-2 left-2"
                isActive={false}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-48 h-44 flex flex-col items-center justify-center text-gray-400">
            <LuPackage className="text-5xl mb-2" />
            <p className="text-sm">بدون تصویر</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        {gift.is_for_gift ? (
          <div className="w-full flex items-center justify-center gap-1 bg-gray-50 p-1 px-2 rounded-lg">
            <LuGift className="text-2xl text-pink-600" />
            <p className="text-xs text-pink-600">هدیه</p>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center gap-1 bg-gray-50 p-1 px-2 rounded-lg">
            <FiPackage className="text-2xl text-sky-400" />
            <p className="text-xs text-sky-500">بسته بندی</p>
          </div>
        )}
      </div>
    </BaseCard>
  );
};

export default GiftWrappingCard;
