"use client";

import { useEffect, useState } from "react";
import { Button, Input, ModalFooter, Textarea } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import { SizeGuideProp } from "./type";
import { useCreateSizeGuid, useSizeGuideUpload, useUpdateSizeGuid } from "@/core/hooks/api/useSizeGuide";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: (datas: SizeGuideProp) => void;
  defaultValues?: SizeGuideProp | null;
  isNew: boolean;
};

const AddNewSizeGuideModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  defaultValues,
  isNew,
}) => {
  const [datas, setDatas] = useState<SizeGuideProp>({
    id: 0,
    title: "",
    description: "",
    image: null
  });
  
  const { mutate: uploadMedias } = useSizeGuideUpload();
  const { mutate: createSizeGuid } = useCreateSizeGuid();
  const { mutate: updateSizeGuid } = useUpdateSizeGuid(defaultValues?.id || 0);

  useEffect(() => {
    if (defaultValues) {
      setDatas(defaultValues)
    }
  }, [defaultValues])

  const handleUpload = () => {
    if (!datas.image) return;
    const formData = new FormData();
    formData.append("files", datas.image);

    if (!isNew) {
      if (typeof datas.image !== "object") {
        const { id, ...rest } = datas;
        updateSizeGuid(
          { ...rest, image: datas.image },
          {
            onSuccess: (response) => {
              onSubmit(response.data);
              onOpenChange();
            },
          }
        );
      } else {
        uploadMedias(formData, {
          onSuccess: (response) => {
            const img = response.data[0];
            if (img) {
              const { id, ...rest } = datas;
              updateSizeGuid(
                { ...rest, image: img.url },
                {
                  onSuccess: (response) => {
                    onSubmit(response.data);
                    onOpenChange();
                  },
                }
              );
            }
          },
        });
      }
    } else {
      uploadMedias(formData, {
        onSuccess: (response) => {
          const img = response.data[0];
          if (img) {
            const { id, ...rest } = datas;
            createSizeGuid(
              { ...rest, image: img.url },
              {
                onSuccess: (response) => {
                  onSubmit(response.data);
                  onOpenChange();
                },
              }
            );
          }
        },
      });
    }
  };

  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader>
              <p className="font-normal text-[16px]">
                {defaultValues ? "ویرایش راهنمای سایز" : "افزودن راهنمای سایز"}
              </p>
            </ModalHeader>
            <ModalBody>
              <Input
                labelPlacement="outside"
                isRequired
                label="عنوان"
                placeholder="عنوان را وارد کنید"
                value={datas.title}
                onChange={(e) =>
                  setDatas((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <Textarea
                labelPlacement="outside"
                isRequired
                label="توضیحات"
                placeholder="اگر توضیحی دارید اینجا وارد کنید"
                maxLength={300}
                value={datas.description}
                onChange={(e) =>
                  setDatas((prev) => ({ ...prev, description: e.target.value }))
                }
              />
              <ImageBoxUploader
                textBtn={datas.image ? "تغییر تصویر" : "افزودن تصویر"}
                title="تصویر"
                changeStatusFile={datas.image}
                onFile={(file) =>
                  setDatas((prev) => ({ ...prev, image: file }))
                }
                sizeText="سایز تصویر: 540x540"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                variant="solid"
                color="secondary"
                isDisabled={
                  !datas.title.trim() ||
                  !datas.description.trim() ||
                  !datas.image
                }
                onPress={handleUpload}
              >
                تایید و ثبت
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewSizeGuideModal;
