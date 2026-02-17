"use client";

import { useState, useRef, useEffect, useCallback } from "react";

type UseImageUploaderProps = {
  onFile: (file: File) => void;
  changeStatusFile?: any;
  defaultImg?: File | string | null;
};

export const useImageUploader = ({ 
  onFile, 
  changeStatusFile, 
  defaultImg 
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

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setImageFile(file);
      onFile(file);
    }
  }, [onFile]);

  return {
    imageFile,
    inputRef,
    handleImageClick,
    handleImageChange,
  };
};