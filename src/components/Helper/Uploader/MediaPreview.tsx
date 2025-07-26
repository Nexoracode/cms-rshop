import React, { useState } from "react";
import { LuPin } from "react-icons/lu";
import { Media } from "@/types";

interface Props {
  items: Media[];
  onItemPinned: (id: number) => void;
  onChange: (id: number) => void;
}

const MediaPreview: React.FC<Props> = ({ items, onChange, onItemPinned }) => {

  const [imgs, setImgs] = useState<Media[]>(items);
  const [itemPinned, setItemPinned] = React.useState<number | null>(null);

  const handlePin = (idx: number) => {
    setItemPinned(idx);
    onItemPinned(idx);
  };

  const handleRemove = (idx: number) => {
    const updated = imgs.filter((_, i) => i !== idx);
    setImgs(updated);
    onChange(idx);
  };

  return (
    <div className="w-full mb-4 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {imgs.map((item, idx) => {
        const type = item.url?.match(/\.(mp4)$/i) ? "video" : "image";
        const url = URL.createObjectURL(item.url);

        return (
          <div
            key={idx}
            className="relative mx-auto group w-28 h-28 border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            onClick={() => type === "image" && handlePin(idx)}
          >
            {type === "image" ? (
              <img
                src={url}
                alt="image-preview"
                className="object-cover w-full h-full cursor-pointer"
              />
            ) : (
              <video
                src={url}
                className="object-cover w-full h-full"
                muted
                controls
              />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item.id);
              }}
              className="absolute top-1 right-1 bg-white rounded-full px-1.5 hover:bg-red-200 text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              ×
            </button>
            {itemPinned === idx ? (
              <LuPin className="absolute top-1 left-1 bg-white rounded-full p-1 text-2xl -rotate-45" />
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaPreview;
