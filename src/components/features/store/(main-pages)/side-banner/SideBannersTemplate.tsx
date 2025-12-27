"use client";

import Image from "next/image";
import { Chip } from "@heroui/react";
import StatusBadge from "@/components/shared/StatusBadge";
import SideBannerFormModal from "./SideBannerFormModal";
import { useState } from "react";

type SideBannersTemplateProps = {
  banner: any;
};

const SideBannersTemplate: React.FC<SideBannersTemplateProps> = ({
  banner,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl px-4 py-10 text-white hover:scale-95 transition-all hover:shadow-xl cursor-pointer
        ${!banner.image_url ? `rounded-2xl` : "bg-black/80"}`}
      style={{
        backgroundColor: !banner.image_url ? banner.background_color ?? "" : "",
      }}
      onClick={() => setIsEditOpen(true)}
    >
      <SideBannerFormModal
        bannerId={banner.id}
        defaultValues={banner}
        position={banner.position}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {!banner.is_active ? (
        <StatusBadge
          isActive={false}
          size="sm"
          className="absolute top-3 left-3 z-20"
        />
      ) : (
        ""
      )}

      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-lg font-bold truncate">{banner.title}</h3>
        {banner.subtitle && (
          <p className="text-sm truncate">{banner.subtitle}</p>
        )}
      </div>

      {banner.badge_text ? (
        <Chip
          variant="flat"
          size="sm"
          className={`text-white mt-2 rounded-lg z-20`}
          style={{ backgroundColor: banner.badge_color ?? "gray" }}
        >
          <span
            style={{
              textShadow: "0 0px 15px rgba(0,0,0)",
            }}
          >
            {banner.badge_text}
          </span>
        </Chip>
      ) : (
        ""
      )}

      <Image
        src={banner.image_url}
        alt={banner.title}
        fill
        priority
        className="object-cover absolute inset-0 z-0 opacity-40"
      />
    </div>
  );
};

export default SideBannersTemplate;
