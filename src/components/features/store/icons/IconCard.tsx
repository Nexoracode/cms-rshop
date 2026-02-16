"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteBrand } from "@/core/hooks/api/useBrand";
import { Image } from "@heroui/react";
import BaseCard from "@/components/ui/BaseCard";

type IconCardProps = {
  brand: {
    id: number;
    name: string;
    slug: string;
    logo: string;
  };
  onEdit?: (brand: Record<string, any>) => void;
};

const IconCard: React.FC<IconCardProps> = ({ brand, onEdit }) => {
  const { mutate: deleteBrand } = useDeleteBrand();

  return (
    <BaseCard
      bodyClassName="p-2 hover-reveal-parent group"
      onClick={() => onEdit?.(brand)}
    >
      <div className="hover-reveal-child">
        <DeleteButton onDelete={() => deleteBrand(brand.id)} />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-32 bg-slate-200 aspect-[3/2] overflow-hidden rounded-2xl">
          <Image
            alt={brand.name}
            className="w-full group-hover:scale-150 min-h-[160px] md:min-h-[120px] object-cover rounded-2xl"
            radius="lg"
            width={"100%"}
            src={brand.logo}
          />
        </div>

        <p className="text-sm">{brand.name}</p>
      </div>
    </BaseCard>
  );
};

export default IconCard;
