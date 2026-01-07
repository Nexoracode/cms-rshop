"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteBrand } from "@/core/hooks/api/useBrand";
import { Image } from "@heroui/react";
import BaseCard from "@/components/ui/BaseCard";
import StatusBadge from "@/components/shared/StatusBadge";

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
      bodyClassName="p-0 rounded-xl hover-reveal-parent group overflow-hidden"
      onClick={() => onEdit?.(collection)}
    >
      <div className="hover-reveal-child">
        <DeleteButton onDelete={() => deleteBrand(collection.id)} />
      </div>

      <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-3">
        <StatusBadge isActive={collection.is_active}/>
        <p className="text-white bg-slate-600 p-0.5 px-2 rounded-md">محصولات: {collection.products_count}</p>
      </div>

      <Image
        alt={collection.slug}
        className="w-full group-hover:scale-105 h-[200px] object-cover rounded-xl select-none"
        draggable={false}
        radius="lg"
        width={"100%"}
        src={collection.image}
      />

      {/* نام و اسلاگ */}
      <div className="absolute text-white inset-0 bg-black/50 z-10 flex flex-col justify-center gap-2">
        <div className="leading-9 pr-10">
          <p className="text-2xl truncate">{collection.title}</p>
          <p className="text-md truncate text-gray-300">
            {collection.description}
          </p>
        </div>
      </div>
    </BaseCard>
  );
};

export default CollectionCard;
