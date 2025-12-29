"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import PromoBannerFormModal from "./PromoBannerFormModal";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeletePromoBanner } from "@/core/hooks/api/adminHome/usePromoBanner";

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
    background_color,
    text_color = "#FFFFFF",
    display_duration = 10,
  } = banner;

  // تشخیص حالت: اگر background_color مقدار داشته باشه → حالت متنی، در غیر این صورت → تصویری
  const isTextMode = !!background_color;

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg shadow-lg"
      onClick={() => setIsEditOpen(true)}
    >
      <PromoBannerFormModal
        bannerId={banner.id}
        defaultValues={banner}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 md:p-10 h-full">
        <div
          className={
            "hover-reveal-child flex items-center gap-2 rounded-lg px-2 py-1.5"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <PromoBannerFormModal />
          <DeleteButton onDelete={() => deletePromo(banner.id)} />
        </div>

        {/* محتوای متنی */}
        {(title || description) && (
          <div className="text-center md:text-right max-w-2xl">
            {title && (
              <h2
                className={`text-2xl md:text-4xl font-bold mb-3 ${
                  isTextMode ? "" : "text-white drop-shadow-lg"
                }`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`text-lg md:text-xl ${
                  isTextMode ? "opacity-90" : "text-white drop-shadow-md"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* دکمه لینک */}
        {link && link_text && (
          <div className="mt-6 md:mt-0">
            <Button
              size="lg"
              variant={isTextMode ? "bordered" : "faded"}
              className="px-8 py-6 text-lg font-semibold shadow-xl hover:scale-105 transition-transform"
            >
              {link_text}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoBannerTemplate;
