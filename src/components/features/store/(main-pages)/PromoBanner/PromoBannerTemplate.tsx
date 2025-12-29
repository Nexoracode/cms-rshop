"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import PromoBannerFormModal from "./PromoBannerFormModal";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeletePromoBanner } from "@/core/hooks/api/adminHome/usePromoBanner";
import Image from "next/image";

type PromoBannerProps = {
  banner: any;
};

const PromoBannerTemplate: React.FC<PromoBannerProps> = ({ banner }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { mutate: deletePromo } = useDeletePromoBanner();

  const {
    title,
    description,
    image_url,
    link,
    link_text,
    id,
    background_color,
    text_color = "#FFFFFF",
    display_duration = 10,
  } = banner;

  console.log("banner =>", banner);

  return (
    <div
      className="relative w-full rounded-xl shadow-md cursor-pointer border h-[64px]"
      onClick={() => setIsEditOpen(true)}
    >
      <PromoBannerFormModal
        bannerId={banner.id}
        defaultValues={banner}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <div className="hover-reveal-parent z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 h-full">
        <div
          className={
            "hover-reveal-child !left-14 z-50 flex items-center gap-2 rounded-lg px-2 py-1.5 bg-gray-700"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <PromoBannerFormModal />
          <DeleteButton onDelete={() => deletePromo(id)} />
        </div>

        {/* محتوای متنی */}
        {(title || description) && (
          <div>
            <h2 className={`text-lg`}>{title}</h2>
            <p className={`text-md truncate`}>{description}</p>
          </div>
        )}

        {/* دکمه لینک */}
        {link && link_text && (
          <div className="mt-6 md:mt-0">
            <Button
              variant={"flat"}
              size="sm"
              className="hover:scale-105 transition-transform"
            >
              {link_text}
            </Button>
          </div>
        )}

        {/* Image */}
        {image_url ? (
          <Image
            src={image_url}
            alt={"gif"}
            fill
            priority
            className="object-cover absolute inset-0 z-10 opacity-40"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PromoBannerTemplate;
