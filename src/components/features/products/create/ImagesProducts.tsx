"use client";

import { Button, Card, CardBody } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useProductUpload } from "@/core/hooks/api/products/useProduct";
import MediaPicker from "@/components/media/uploader/MediaPicker";
import MediaPreview from "@/components/media/uploader/MediaPreview";
import FieldErrorText from "@/components/forms/FieldErrorText";

type Props = {
  onMedia_ids: (medias: number[]) => void;
  onMedia_pinned_id: (id: number | null) => void;
  initialMedias?: any[];
  initialPinnedId?: number | null;
  errorMessage?: string;
};

const ImagesProducts = ({
  onMedia_ids,
  onMedia_pinned_id,
  initialMedias = [],
  initialPinnedId = null,
  errorMessage,
}: Props) => {
  const [medias, setMedias] = useState<File[]>([]);
  const [mediasUrl, setMediasUrl] = useState<any[]>([]);
  const [pinnedId, setPinnedId] = useState<number | null>(null);
  //
  const { mutate: uploadMedias, isPending } = useProductUpload();

  useEffect(() => {
    !mediasUrl.length && setMedias([]);
  }, [mediasUrl]);

  useEffect(() => {
    initialMedias.length && setMediasUrl(initialMedias);
  }, [initialMedias]);

  useEffect(() => {
    initialPinnedId && setPinnedId(initialPinnedId);
  }, [initialPinnedId]);

  useEffect(() => {
    medias.length && handleUpload();
  }, [medias]);

  useEffect(() => {
    //onMedia_ids(mediasUrl.map((media) => media.id));

    const images = mediasUrl.filter((media) => media.type === "image");
    if (!images.length) {
      setPinnedId(null);
      //onMedia_pinned_id(null);
    }

    if (images.length && !pinnedId) {
      mediasUrl.some((media) => {
        if (media.type === "image") {
          setPinnedId(media.id);
          //onMedia_pinned_id(media.id);
          return;
        }
      });
    }
  }, [mediasUrl]);

  const handleUpload = () => {
    const formData = new FormData();
    medias.forEach((media) => {
      formData.append("files", media);
    });

    uploadMedias(formData, {
      onSuccess: (response) => {
        response.data && setMediasUrl((prev) => [...prev, ...response.data]);
      },
    });
  };

  return (
    <Card className="w-full shadow-none rounded-none">
      <CardBody className="px-0 py-1">
        <div
          className={`p-4 ${
            errorMessage?.length
              ? "border-1.5 border-red-300 rounded-xl"
              : "border border-slate-300 rounded-xl"
          }`}
        >
          {mediasUrl.length ? (
            <MediaPreview
              onItemPinned={(id) => {
                setPinnedId(id);
                onMedia_pinned_id(id);
              }}
              onRemove={(id) => {
                setMediasUrl((prev) => prev.filter((media) => media.id !== id));
                if (id === pinnedId) {
                  setPinnedId(null);
                  onMedia_pinned_id(null);
                }
              }}
              items={mediasUrl}
              pinnedId={pinnedId}
            />
          ) : (
            ""
          )}

          <MediaPicker onSelect={(files) => setMedias(files)} />
          {medias.length ? (
            <Button
              isLoading={isPending}
              variant="flat"
              color="secondary"
              className={`w-full mt-4 ${!isPending ? "hidden" : ""}`}
            >
              بارگذاری (پس از اتمام تغییرات)
            </Button>
          ) : (
            ""
          )}
        </div>
        {errorMessage?.length ? (
          <div className="text-right mt-2">
            <FieldErrorText error={errorMessage} />
          </div>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default ImagesProducts;
