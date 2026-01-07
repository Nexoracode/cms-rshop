"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteBrand } from "@/core/hooks/api/useBrand";
import { Image } from "@heroui/react";
import BaseCard from "@/components/ui/BaseCard";

type CollectionCardProps = {
  collection: any;
  onEdit?: (collection: Record<string, any>) => void;
};

const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  onEdit,
}) => {
  const { mutate: deleteBrand } = useDeleteBrand();

  return (
    <BaseCard
      bodyClassName="p-2 hover-reveal-parent group"
      onClick={() => onEdit?.(collection)}
    >
      <div className="hover-reveal-child">
        <DeleteButton onDelete={() => deleteBrand(collection.id)} />
      </div>

      {/* تصویر برند */}
      <div className="w-full h-full bg-slate-200 aspect-[3/2] overflow-hidden rounded-2xl">
        <Image
          alt={collection.name}
          className="w-full group-hover:scale-150 min-h-[160px] md:min-h-[120px] object-cover rounded-2xl"
          radius="lg"
          width={"100%"}
          src={collection.logo}
        />
      </div>

      {/* نام و اسلاگ */}
      <div className="flex flex-col justify-center items-center gap-2 mt-2">
        <div className="flex flex-col items-center leading-7 w-full rounded-2xl">
          <p className="text-[15px]">{collection.name}</p>
          <p className="text-default-500 text-sm">{collection.slug}</p>
        </div>
      </div>
    </BaseCard>
  );
};

export default CollectionCard;
