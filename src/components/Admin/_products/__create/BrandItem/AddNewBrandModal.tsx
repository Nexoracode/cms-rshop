"use client";

import { useState } from "react";
import { Button, Input, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import ImageBoxUploader from "@/components/Helper/ImageBoxUploader";
import { BrandItemProp } from "./type";
import { useProductUpload } from "@/hooks/products/useProduct";
import { useCreateBrandItem, useUpdateBrand } from "@/hooks/useBrandItem";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: (datas: BrandItemProp, id?: number) => void;
  defaultValues?: BrandItemProp | null;
  brandId?: number | null;
};

const AddNewBrandModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  defaultValues,
  brandId,
}) => {
  const [datas, setDatas] = useState<BrandItemProp>({
    name: "",
    slug: "",
    logo: null,
    ...(defaultValues ? defaultValues : {}),
  });
  const { mutate: uploadMedias } = useProductUpload();
  const { mutate: createBrand } = useCreateBrandItem();
  const { mutate: updateBrand } = useUpdateBrand(brandId || 0);

  const handleUpload = () => {
    if (!datas.logo) return;
    const formData = new FormData();
    formData.append("files", datas.logo);

    uploadMedias(formData, {
      onSuccess: (response) => {
        const img = response.data[0];
        if (img) {
          if (brandId) {
            updateBrand(
              { ...datas, logo: img.url },
              {
                onSuccess: (response) => {
                  onSubmit(response.data);
                  onOpenChange();
                },
              }
            );
          } else {
            createBrand(
              { ...datas, logo: img.url },
              {
                onSuccess: (response) => {
                  onSubmit(response.data);
                  onOpenChange();
                },
              }
            );
          }
        }
      },
    });
  };

  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader>
              <p className="font-normal text-[16px]">
                {defaultValues ? "ویرایش برند" : "افزودن برند"}
              </p>
            </ModalHeader>
            <ModalBody>
              <Input
                labelPlacement="outside"
                isRequired
                label="عنوان برند (فارسی)"
                placeholder="عنوان را وارد کنید"
                value={datas.name}
                onChange={(e) =>
                  setDatas((prev) => ({ ...prev, name: e.target.value }))
                }
                className="mb-2"
              />
              <Input
                dir="ltr"
                labelPlacement="outside"
                isRequired
                label="عنوان برند (انگلیسی)"
                placeholder="title"
                value={datas.slug}
                onChange={(e) =>
                  setDatas((prev) => ({ ...prev, slug: e.target.value }))
                }
              />
              <ImageBoxUploader
                textBtn={datas.logo ? "تغییر لوگو" : "+ افزودن لوگو"}
                title="تصویر لوگو"
                changeStatusFile={datas.logo}
                onFile={(file) => setDatas((prev) => ({ ...prev, logo: file }))}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                variant="solid"
                color="secondary"
                isDisabled={
                  !datas.name.trim() || !datas.slug.trim() || !datas.logo
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

export default AddNewBrandModal;
