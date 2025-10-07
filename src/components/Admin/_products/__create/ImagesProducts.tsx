"use client";

import { Button, Card, CardBody } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Media } from "@/types";
import { useProductUpload } from "@/hooks/api/products/useProduct";
import MediaPicker from "@/components/Helper/Uploader/MediaPicker";
import MediaPreview from "@/components/Helper/Uploader/MediaPreview";

type Props = {
  onMedia_ids: (medias: number[]) => void;
  onMedia_pinned_id: (id: number | null) => void;
  initialMedias?: Media[];
  initialPinnedId?: number | null;
};

const ImagesProducts = ({
  onMedia_ids,
  onMedia_pinned_id,
  initialMedias = [],
  initialPinnedId = null,
}: Props) => {
  const [medias, setMedias] = useState<File[]>([]);
  const [mediasUrl, setMediasUrl] = useState<Media[]>([]);
  const [pinnedId, setPinnedId] = useState<number | null>(null);
  const { mutate: uploadMedias, isPending } = useProductUpload();

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
    <Card className="w-full shadow-none">
      <CardBody className="p-0">
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
      </CardBody>
    </Card>
  );
};

export default ImagesProducts;
