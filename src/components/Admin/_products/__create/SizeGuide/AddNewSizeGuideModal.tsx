"use client";

import { useState } from "react";
import { Button, Input, ModalFooter, Textarea } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import ImageBoxUploader from "@/components/Helper/ImageBoxUploader";
import { SizeGuideProp } from "./type";
import { useProductUpload } from "@/hooks/products/useProduct";
import { useCreateSizeGuid, useUpdateSizeGuid } from "@/hooks/useSizeGuide";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: (datas: SizeGuideProp, id?: number) => void;
  defaultValues?: SizeGuideProp | null;
  helperId?: number | null;
};

const AddNewSizeGuideModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  defaultValues,
  helperId,
}) => {
  const [datas, setDatas] = useState<SizeGuideProp>({
    title: "",
    description: "",
    image: null,
    ...(defaultValues ? defaultValues : {}),
  });
  const { mutate: uploadMedias } = useProductUpload();
  const { mutate: createSizeGuid } = useCreateSizeGuid();
  const { mutate: updateSizeGuid } = useUpdateSizeGuid(helperId || 0);

  const handleUpload = () => {
    if (!datas.image) return;
    const formData = new FormData();
    formData.append("files", datas.image);

    if (datas.image && typeof datas.image !== "object") {
      updateSizeGuid(
        { ...datas, image: datas.image },
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
            createSizeGuid(
              { ...datas, image: img.url },
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
