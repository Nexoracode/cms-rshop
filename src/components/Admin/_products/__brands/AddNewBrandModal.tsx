"use client";

import { useState } from "react";
import { Button, Input, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import ImageBoxUploader from "@/components/Helper/ImageBoxUploader";
import { useProductUpload } from "@/hooks/products/useProduct";
import { useCreateBrand, useUpdateBrand } from "@/hooks/useBrand";
import ModalHeaderNavigator from "../ModalHeaderNavigator";
import { TbBrandArc } from "react-icons/tb";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  defaultValues?: any;
  brandId?: number | null;
};

const AddNewBrandModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  defaultValues,
  brandId,
}) => {
  const [datas, setDatas] = useState({
    name: "",
    slug: "",
    logo: null,
    ...(defaultValues ? defaultValues : {}),
  });
  //? Hooks
  const { mutateAsync: uploadMedias, isPending: isPendingUpload } =
    useProductUpload();
  const { mutateAsync: createBrand, isPending: isPendingCreate } =
    useCreateBrand();
  const { mutateAsync: updateBrand, isPending: isPendingUpdate } =
    useUpdateBrand(brandId || 0);

  const isDisabled = !datas.name.trim() || !datas.slug.trim() || !datas.logo;

  const handleCreateNewBrand = async () => {
    if (!datas.logo) return;

    try {
      const formData = new FormData();
      formData.append("files", datas.logo);

      const response = await uploadMedias(formData);
      if (!response.ok) return;

      const img = response.data[0];
      if (!img) return;

      if (brandId) {
        const updateRes = await updateBrand({ ...datas, logo: img.url });
        if (!updateRes.ok) return;
      } else {
        const createRes = await createBrand({ ...datas, logo: img.url });
        if (!createRes.ok) return;
      }
      //
      setDatas({ name: "", logo: null, slug: "" });
      onOpenChange();
      toast.success(
        brandId ? "برند با موفقیت بروزرسانی شد" : "برند با موفقیت افزوده شد"
      );
    } catch (error) {
      console.error("خطا:", error);
      toast.error("خطای ناشناخته. با برنامه نویس تماس بگیرید");
    }
  };

  return (
    <Modal
      dir="rtl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
      isDismissable={false}
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <ModalHeaderNavigator
                mainTitle="برند"
                title="افزودن برند جدید"
                navigateTo="/admin/products/brands"
                icon={<TbBrandArc className="text-2xl" />}
              />
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-6 sm:flex-row items-center sm:gap-4 mb-2">
                <Input
                  labelPlacement="outside"
                  isRequired
                  label="عنوان"
                  placeholder="عنوان برند را وارد کنید"
                  value={datas.name}
                  onChange={(e) =>
                    setDatas((prev: any) => ({ ...prev, name: e.target.value }))
                  }
                  className="mb-2"
                />
                <Input
                  style={{ direction: "ltr" }}
                  labelPlacement="outside"
                  isRequired
                  label="نامک"
                  placeholder="slug"
                  value={datas.slug}
                  onChange={(e) =>
                    setDatas((prev: any) => ({ ...prev, slug: e.target.value }))
                  }
                />
              </div>
              <ImageBoxUploader
                textBtn={datas.logo ? "تغییر لوگو" : "+ افزودن لوگو"}
                title="تصویر لوگو"
                changeStatusFile={datas.logo}
                onFile={(file) =>
                  setDatas((prev: any) => ({ ...prev, logo: file }))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                variant="solid"
                color="secondary"
                isDisabled={isDisabled}
                isLoading={isPendingCreate || isPendingUpload}
                onPress={handleCreateNewBrand}
              >
                {isPendingCreate || isPendingUpload
                  ? "در حال ثبت…"
                  : "ایجاد برند"}{" "}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewBrandModal;
