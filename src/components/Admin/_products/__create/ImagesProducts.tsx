"use client";

import { Alert, Button, Card, CardBody, CardFooter } from "@heroui/react";
import { FaRegImages } from "react-icons/fa6";
import BoxHeader from "./helpers/BoxHeader";
import React, { useState } from "react";
import MediasUploader from "@/components/Helper/MediasUploader";
import { PreviewMeta } from "@/types";
import { useProductUpload } from "@/hooks/products/useProduct";

type Props = {};

const ImagesProducts = ({}: Props) => {
  const [medias, setMedias] = useState<PreviewMeta[]>([]);
  const [mediasUrl, setMediasUrl] = useState<string[]>([]);
  const { mutate: uploadMedias, isPending } = useProductUpload();

  const handleUpload = () => {
    const formData = new FormData();
    medias.forEach((media) => {
      formData.append("files", media.file);
    });
    uploadMedias(formData, {
      onSuccess: (response) => {
        setMediasUrl((prev) => prev ? [...prev, ...response.data] : response.data);
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
        <MediasUploader onPreviewsChange={(datas) => setMedias((prev) => prev ? [...prev, ...datas] : datas)} />
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
            className="w-full"
            onPress={handleUpload}
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
