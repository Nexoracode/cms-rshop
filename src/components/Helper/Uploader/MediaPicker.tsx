"use client";

import React, { useRef } from "react";
import { Button } from "@heroui/react";
import { LuImage, LuImagePlus, LuVideo } from "react-icons/lu";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

interface Props {
  onSelect: (files: File[]) => void;
}

const MediaPicker: React.FC<Props> = ({ onSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentType = useRef<"image" | "video">("image");

  const handlePick = (type: "image" | "video") => {
    if (!inputRef.current) return;
    currentType.current = type;
    inputRef.current.accept =
      type === "image" ? ".jpg,.jpeg,.png,.webp" : ".mp4";
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
      <div className="flex items-center justify-between">
        <div className="text-right">
          <p className="text-gray-600">افزودن تصویر و ویدیو</p>
          <div className="w-full flex items-center mt-2">
            <p className="text-[11px] text-orange-700 animate-pulse">
              حداکثر حجم فایل تصویر 5.5 و ویدئو 50MB است. برای هر محصول 20 تصویر
              و 5 ویدئو میتوانید بارگذاری کنید.
            </p>
          </div>
        </div>
        <div className="w-fit flex gap-2">
          <Button
            size="sm"
            color="secondary"
            variant="flat"
            onPress={() => handlePick("image")}
          >
            <LuImagePlus className="text-xl" />
          </Button>
          <Button
            size="sm"
            color="secondary"
            variant="flat"
            onPress={() => handlePick("video")}
          >
            <AiOutlineVideoCameraAdd className="text-xl" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default MediaPicker;
