"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteBrand } from "@/hooks/api/useBrand";
import { Image } from "@heroui/react";
import BaseCard from "@/components/ui/BaseCard";

type BrandCardProps = {
  brand: {
    id: number;
    name: string;
    slug: string;
    logo: string;
  };
  onEdit?: (brand: Record<string, any>) => void;
};

const BrandCard: React.FC<BrandCardProps> = ({ brand, onEdit }) => {
  const { mutate: deleteBrand } = useDeleteBrand();

  return (
    <BaseCard
      className="cursor-auto shadow-md rounded-2xl border w-[235px]"
      bodyClassName="overflow-hidden p-2.5 relative cursor-pointer"
      onClick={() => onEdit?.(brand)}
    >
      {/* دکمه حذف */}
      <div className="absolute top-2.5 left-2.5 z-50">
        <DeleteButton onDelete={() => deleteBrand(brand.id)} />
      </div>

      {/* تصویر برند */}
      <Image
        alt={brand.name}
        className="w-full rounded-2xl object-cover h-[140px]"
        radius="lg"
        src={brand.logo}
        width="100%"
      />

      {/* نام و اسلاگ */}
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col items-center leading-7 w-[200px] pt-2 rounded-2xl">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[15px]">{brand.name}</p>
            <p className="text-default-500">{brand.slug}</p>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default BrandCard;
