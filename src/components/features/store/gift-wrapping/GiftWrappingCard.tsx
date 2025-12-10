"use client";

import BaseCard from "@/components/ui/BaseCard";
import { LuGift, LuPackage } from "react-icons/lu";
import StatusBadge from "@/components/shared/StatusBadge";
import { FiPackage } from "react-icons/fi";
import { Image } from "@heroui/react";
import DeleteButton from "@/components/shared/DeleteButton";

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
      bodyClassName="flex flex-col gap-4 p-2 hover-reveal-parent group"
      redirect={`/admin/store/gift-wrapping/create?edit_id=${gift.id}`}
    >
      <div className="hover-reveal-child">
        <DeleteButton onDelete={() => {}} />
      </div>
      <div className="relative flex justify-center">
        {gift.image ? (
          <>
            <div className="w-full h-full bg-slate-200 aspect-[3/2] overflow-hidden rounded-2xl">
              <Image
                alt={gift.name}
                className="group-hover:scale-150 transition-transform duration-300 w-full min-h-[160px] md:min-h-[120px] object-cover"
                width={"100%"}
                src={gift.image.url}
              />
            </div>
            {gift.status === "active" ? (
              <div className="z-50">
                <StatusBadge
                  className="w-fit absolute top-2 right-2"
                  isActive={false}
                />
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-48 h-44 flex flex-col items-center justify-center text-gray-400">
            <LuPackage className="text-5xl mb-2" />
            <p className="text-sm">بدون تصویر</p>
          </div>
        )}
      </div>
      <h3 className="text-md text-center font-semibold text-gray-700 mt-1">
        {gift.name}
      </h3>
      <div className="flex items-center gap-3">
        {gift.is_for_gift ? (
          <div className="w-full flex items-center justify-center gap-1 bg-pink-50 p-1.5 px-2 rounded-lg">
            <LuGift className="text-2xl text-pink-600" />
            <p className="text-sm text-pink-600">هدیه</p>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center gap-1 bg-sky-50 p-1.5 px-2 rounded-lg">
            <FiPackage className="text-2xl text-sky-400" />
            <p className="text-sm text-sky-500">بسته بندی</p>
          </div>
        )}
      </div>
    </BaseCard>
  );
};

export default GiftWrappingCard;
