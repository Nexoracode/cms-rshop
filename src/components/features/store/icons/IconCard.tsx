"use client";

import React from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteIcon } from "@/core/hooks/api/useIcon";
import BaseCard from "@/components/ui/BaseCard";

type IconCardProps = {
  icon: {
    id: number;
    name: string;
    svg: string; // اینجا slug و logo رو به svg تغییر بده
  };
  onEdit?: (icon: Record<string, any>) => void;
};

const IconCard: React.FC<IconCardProps> = ({ icon, onEdit }) => {
  const { mutate: deleteIcon } = useDeleteIcon();

  return (
    <BaseCard
      bodyClassName="p-2 hover-reveal-parent group"
      onClick={() => onEdit?.(icon)}
      className="rounded-md shadow-none border border-gray-200 hover:shadow-md"
    >
      <div className="hover-reveal-child">
        <DeleteButton onDelete={() => deleteIcon({ id: icon.id })} />
      </div>

      {/* نمایش SVG */}
      <div className="border-b border-gray-200 px-12 py-8">
        <div
          className="[&>svg]:w-8 mr-1 [&>svg]:h-auto [&>svg]:max-h-12"
          dangerouslySetInnerHTML={{ __html: icon.svg }}
        />
      </div>

      <p className="text-[14px] text-center text-gray-500 pt-4 pb-2">
        {icon.name}
      </p>
    </BaseCard>
  );
};

export default IconCard;
