// src/utils/compressImageFile.ts
"use client";

import imageCompression from "browser-image-compression";

const MAX_SIZE = 100 * 1024; // 100KB

async function toWebp(blob: Blob, name: string): Promise<File> {
  return new Promise((resolve) => {
    const img = document.createElement("img");

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(new File([blob], name, { type: blob.type }));

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (webpBlob) => {
          if (!webpBlob) return resolve(new File([blob], name, { type: blob.type }));

          resolve(
            new File([webpBlob], name.replace(/\.(jpg|jpeg|png|webp)$/i, ".webp"), {
              type: "image/webp",
              lastModified: Date.now(),
            })
          );
        },
        "image/webp",
        0.8
      );
    };

    img.src = URL.createObjectURL(blob);
  });
}

export async function compressImageFile(file: File): Promise<File> {
  if (file.size <= MAX_SIZE && file.type === "image/webp") return file;

  const options = {
    maxSizeMB: 0.1, // حدود 100KB
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };

  const compressedBlob = await imageCompression(file, options);
  const webpFile = await toWebp(compressedBlob, file.name);

  if (webpFile.size > MAX_SIZE) return webpFile; // تصمیم نهایی با parent می‌مونه

  return webpFile;
}