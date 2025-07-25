"use client";

import { Alert, Button, Card, CardBody, CardFooter } from "@heroui/react";
import { FaRegImages } from "react-icons/fa6";
import BoxHeader from "./helpers/BoxHeader";
import React, { useEffect, useState } from "react";
import { Media } from "@/types";
import { useProductUpload } from "@/hooks/products/useProduct";
import MediaPicker from "@/components/Helper/Uploader/MediaPicker";
import MediaPreview from "@/components/Helper/Uploader/MediaPreview";

type Props = {
  onMedia_ids: (medias: number[]) => void;
  onMedia_pinned_id: (id: number) => void;
};

const ImagesProducts = ({ onMedia_ids, onMedia_pinned_id }: Props) => {
  const [medias, setMedias] = useState<File[]>([]);
  const [mediasUrl, setMediasUrl] = useState<Media[]>([]);
  const { mutate: uploadMedias, isPending } = useProductUpload();

  useEffect(() => {
    if (medias.length) {
      handleUpload();
    }
  }, [medias]);

  useEffect(() => {
    onMedia_ids(mediasUrl.map((media) => media.id));
  }, [mediasUrl]);

  const handleUpload = () => {
    const formData = new FormData();
    medias.forEach((media) => {
      formData.append("files", media);
    });

    uploadMedias(formData, {
      onSuccess: (response) => {
        setMediasUrl((prev) => [...prev, ...response.data]);
      },
    });
  };

  return (
    <Card className="w-full shadow-md">
      <BoxHeader
        title="تصویر و ویدیو محصول"
        color="bg-orange-700/10 text-orange-700"
        icon={<FaRegImages className="text-3xl" />}
      />
      <CardBody>
        <MediaPreview
          onItemPinned={(id) => onMedia_pinned_id(id)}
          items={mediasUrl}
          onChange={(id) =>
            setMediasUrl((prev) => prev.filter((media) => media.id !== id))
          }
        />

        <MediaPicker onSelect={(files) => setMedias(files)} />

        <div className="w-full flex items-center animate-pulse text-right mt-3">
          <Alert
            className="h-[40px] flex items-center p-0 bg-transparent"
            variant="flat"
            radius="full"
            color="secondary"
            dir="rtl"
            title={
              <p className="text-[10px] xs:text-[12px]" dir="rtl">
                حداکثر حجم فایل تصویر 5.5 و ویدئو 50MB است. برای هر محصول 20
                تصویر و 5 ویدئو میتوانید بارگذاری کنید.
              </p>
            }
          />
        </div>
      </CardBody>
      {medias.length ? (
        <CardFooter>
          <Button
            isLoading={isPending}
            variant="flat"
            color="secondary"
            className={`w-full ${!isPending ? "hidden" : ""}`}
          >
            بارگذاری (پس از اتمام تغییرات)
          </Button>
        </CardFooter>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ImagesProducts;
