"use client";

import React, { useRef } from "react";
import { Button } from "@heroui/react";
import { LuImage, LuVideo } from "react-icons/lu";

interface Props {
  onSelect: (files: File[]) => void;
}

const MediaPicker: React.FC<Props> = ({ onSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentType = useRef<"image" | "video">("image");

  const handlePick = (type: "image" | "video") => {
    if (!inputRef.current) return;
    currentType.current = type;
    inputRef.current.accept = type === "image" ? ".jpg,.jpeg,.png,.webp" : ".mp4";
    inputRef.current.multiple = type === "image";
    inputRef.current.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const type = currentType.current;
    const maxSize = type === "image" ? 5.5 * 1024 * 1024 : 50 * 1024 * 1024;
    const limit = type === "image" ? 20 : 5;

    const validFiles = files.slice(0, limit).filter((file) => {
      if (file.size > maxSize) {
        alert(`حجم فایل "${file.name}" بیشتر از حد مجاز است`);
        return false;
      }
      return true;
    });

    if (validFiles.length) {
      onSelect(validFiles);
    }

    e.target.value = "";
  };

  return (
    <>
      <input ref={inputRef} type="file" hidden onChange={handleChange} />
      <div className="w-full flex flex-col xs:flex-row flex-wrap xs:flex-nowrap items-center justify-center gap-4">
        <Button
          color="secondary"
          variant="ghost"
          className="w-full xs:w-1/2 border border-dashed h-[60px] rounded-md"
          endContent={<LuImage className="text-2xl" />}
          onPress={() => handlePick("image")}
        >
          افزودن تصویر
        </Button>
        <Button
          color="secondary"
          variant="ghost"
          className="w-full xs:w-1/2 border border-dashed h-[60px] rounded-md"
          endContent={<LuVideo className="text-2xl" />}
          onPress={() => handlePick("video")}
        >
          افزودن ویدیو
        </Button>
      </div>
    </>
  );
};

export default MediaPicker;
