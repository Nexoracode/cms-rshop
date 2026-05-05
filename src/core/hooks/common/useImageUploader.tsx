"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import imageCompression from "browser-image-compression";

type UseImageUploaderProps = {
  onFile: (file: File) => void;
  changeStatusFile?: any;
  defaultImg?: File | string | null;
};

const MAX_SIZE = 100 * 1024; // 100KB

async function toWebp(blob: Blob, name: string): Promise<File> {
  return new Promise((resolve) => {
    const img = document.createElement("img");

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (webpBlob) => {
          if (!webpBlob) return;

          const file = new File(
            [webpBlob],
            name.replace(/\.(jpg|jpeg|png)$/i, ".webp"),
            {
              type: "image/webp",
              lastModified: Date.now(),
            }
          );

          resolve(file);
        },
        "image/webp",
        0.8
      );
    };

    img.src = URL.createObjectURL(blob);
  });
}

async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 0.1, // ~100KB target
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };

  const compressedBlob = await imageCompression(file, options);

  // 🔥 force WebP conversion
  return await toWebp(compressedBlob, file.name);
}

export const useImageUploader = ({
  onFile,
  changeStatusFile,
  defaultImg,
}: UseImageUploaderProps) => {
  const [imageFile, setImageFile] = useState<File | string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (changeStatusFile) setImageFile(changeStatusFile);
    else if (defaultImg) setImageFile(defaultImg);
    else setImageFile(null);
  }, [changeStatusFile, defaultImg]);

  const handleImageClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      let processedFile: File;

      // اگر کوچیک بود دست نزن
      if (file.size <= MAX_SIZE) {
        processedFile = await toWebp(file, file.name);
      } else {
        processedFile = await compressImage(file);
      }

      // اگر هنوز بزرگ بود → reject
      if (processedFile.size > MAX_SIZE) {
        alert("حجم تصویر باید حداکثر 100KB باشد");
        return;
      }

      setImageFile(processedFile);
      onFile(processedFile);
    },
    [onFile]
  );

  return {
    imageFile,
    inputRef,
    handleImageClick,
    handleImageChange,
  };
};