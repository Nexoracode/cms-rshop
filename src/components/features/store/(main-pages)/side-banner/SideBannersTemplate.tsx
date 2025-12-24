"use client";

import Image from "next/image";
import { SideBanner } from "./side-banner.types";
import { Chip } from "@heroui/react";
import StatusBadge from "@/components/shared/StatusBadge";

type SideBannersTemplateProps = {
  banner: any;
};

const SideBannersTemplate: React.FC<SideBannersTemplateProps> = ({
  banner,
}) => {
  console.log("Banner =>", banner);

  return (
    <div
      className={`relative overflow-hidden rounded-xl px-4 py-10 text-white hover:scale-95 transition-all hover:shadow-xl cursor-pointer ${
        !banner.image_url
          ? `bg-[ "bg-black/70"}]`
          : "bg-black/70"
      }`}/* ${banner.background_color || */
    >
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
          className={`${
            banner.badge_color ? banner.badge_color : "bg-gray-700"
          } text-white mt-2 rounded-lg z-20`}
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
