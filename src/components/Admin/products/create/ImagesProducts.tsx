"use client";

import { Button, Card, CardBody } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Media } from "@/types";
import { useProductUpload } from "@/hooks/api/products/useProduct";
import MediaPicker from "@/components/media/Uploader/MediaPicker";
import MediaPreview from "@/components/media/Uploader/MediaPreview";
import FieldErrorText from "@/components/forms/FieldErrorText";

type Props = {
  onMedia_ids: (medias: number[]) => void;
  onMedia_pinned_id: (id: number | null) => void;
  initialMedias?: Media[];
  initialPinnedId?: number | null;
  isActiveError?: boolean;
};

const ImagesProducts = ({
  onMedia_ids,
  onMedia_pinned_id,
  initialMedias = [],
  initialPinnedId = null,
  isActiveError = false,
}: Props) => {
  const [medias, setMedias] = useState<File[]>([]);
  const [mediasUrl, setMediasUrl] = useState<Media[]>([]);
  const [pinnedId, setPinnedId] = useState<number | null>(null);
  const { mutate: uploadMedias, isPending } = useProductUpload();

  useEffect(() => {
    if (!mediasUrl.length) {
      setMedias([])
    }
  }, [mediasUrl])

  useEffect(() => {
    initialMedias && setMediasUrl(initialMedias);
  }, [initialMedias]);

  useEffect(() => {
    initialPinnedId && setPinnedId(initialPinnedId);
  }, [initialPinnedId]);

  useEffect(() => {
    medias.length && handleUpload();
  }, [medias]);

  useEffect(() => {
    onMedia_ids(mediasUrl.map((media) => media.id));

    const images = mediasUrl.filter((media) => media.type === "image");
    if (!images.length) {
      setPinnedId(null);
      onMedia_pinned_id(null);
    }

    if (images.length && !pinnedId) {
      mediasUrl.some((media) => {
        if (media.type === "image") {
          setPinnedId(media.id);
          onMedia_pinned_id(media.id);
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
        setMediasUrl((prev) => [...prev, ...response.data]);
      },
    });
  };

  return (
    <Card className="w-full shadow-none rounded-none">
      <CardBody className="p-0">
        <div>
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
        {isActiveError && !medias.length ? (
          <div className="text-right mt-2 h-6">
            <FieldErrorText error="حداقل یک تصویر باید آپلود شود" />
          </div>
        ) : (
          ""
        )}
      </CardBody>
    </Card>
  );
};

export default ImagesProducts;
