"use client";

import { Chip } from "@heroui/react";
import { useEffect, useState } from "react";
import BaseCard from "../ui/BaseCard";
import { LuImages, LuImageUp } from "react-icons/lu";
import OptionButton from "../ui/buttons/OptionButton";

type Props = {
  title: string;
  textBtn?: string;
  onFile: (file: File) => void;
  changeStatusFile?: any;
  sizeText?: string;
  defaultImg?: File | string | null;
};

const ImageBoxUploader: React.FC<Props> = ({
  textBtn= "+ افزودن تصویر",
  title,
  onFile,
  changeStatusFile,
  sizeText,
  defaultImg,
}) => {
  const [imageFile, setImageFile] = useState<File | string | null>(null);

  useEffect(() => {
    if (changeStatusFile) {
      setImageFile(changeStatusFile);
    } else if (defaultImg) {
      setImageFile(defaultImg);
    } else {
      setImageFile(null);
    }
  }, [changeStatusFile, defaultImg]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setImageFile(file);
      onFile(file);
    }
  };

  return (
    <BaseCard
      CardHeaderProps={{
        title,
        btnClassName: "bg-secondary-light text-secondary",
        icon: <LuImages />,
        className: "px-0",
        children: (
          <div className="w-full flex items-center justify-between">
            <input
              type="file"
              accept="image/*"
              id="logo-upload"
              onChange={handleImageChange}
              className="bg-black z-50 h-10 absolute left-0 opacity-0 cursor-pointer"
            />
            <OptionButton
              title={textBtn}
              className="bg-secondary-light text-secondary"
            />
          </div>
        ),
      }}
      className="shadow-none border-none"
      bodyClassName="cursor-auto flex flex-col xs:flex-row items-start gap-3 px-4"
    >
      <div className="w-[80px] h-[80px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        <div className={`${!imageFile ? "p-3 bg-gray-100 rounded-lg" : ""}`}>
          {imageFile ? (
            <img
              src={
                typeof imageFile === "object"
                  ? URL.createObjectURL(imageFile)
                  : imageFile
              }
              alt="preview"
              className="rounded-2xl w-[8p5x] h-[80px] p-2 object-cover transition-all hover:scale-125"
            />
          ) : (
            <LuImageUp className="text-4xl text-gray-500" />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 text-[12px] text-gray-500">
        <p>نمایش تصویر پیش فرض به این شکل است.</p>
        <div>
          فرمت تصویر:  
          <Chip
            className="bg-primary-light text-primary"
            variant="flat"
            size="sm"
            radius="sm"
          >
            <small>JPEG</small>
          </Chip>
            , 
          <Chip color="success" variant="flat" size="sm" radius="sm">
            <small>JPG</small>
          </Chip>
            , 
          <Chip color="warning" variant="flat" size="sm" radius="sm">
            <small>PNG</small>
          </Chip>
        </div>
        <p>{sizeText ? sizeText : "سایز تصویر: 160x160"}</p>
      </div>
    </BaseCard>
  );
};

export default ImageBoxUploader;
