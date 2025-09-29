"use client";

import { useEffect, useState } from "react";
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
  const [datas, setDatas] = useState<any>({
    name: "",
    slug: "",
    logo: null,
  });
  //? Hooks
  const { mutateAsync: uploadMedias, isPending: isPendingUpload } =
    useProductUpload();
  const { mutateAsync: createBrand, isPending: isPendingCreate } =
    useCreateBrand();
  const { mutateAsync: updateBrand, isPending: isPendingUpdate } =
    useUpdateBrand(brandId || 0);

  const isDisabled = !datas.name.trim() || !datas.slug.trim() || !datas.logo;

  useEffect(() => {
    setDatas({ name: "", slug: "", logo: null });
  }, []);

  useEffect(() => {
    if (defaultValues) {
      setDatas({
        name: defaultValues.name || "",
        slug: defaultValues.slug || "",
        logo: defaultValues.logo || null,
      });
    }
  }, [defaultValues]);

  const handleCreateNewBrand = async () => {
    if (!datas.logo) return;

    try {
      let logoUrl = typeof datas.logo === "string" ? datas.logo : null;

      if (datas.logo instanceof File) {
        const formData = new FormData();
        formData.append("files", datas.logo);

        const uploadRes = await uploadMedias(formData);
        if (!uploadRes.ok) return;

        const img = uploadRes.data?.[0];
        if (!img) return;

        logoUrl = img.url;
      }

      if (brandId) {
        const updateRes = await updateBrand({ ...datas, logo: logoUrl });
        if (!updateRes.ok) return;
        toast.success("برند با موفقیت بروزرسانی شد");
      } else {
        const createRes = await createBrand({ ...datas, logo: logoUrl });
        if (!createRes.ok) return;
        toast.success("برند با موفقیت افزوده شد");
      }

      setDatas({ name: "", logo: null, slug: "" });
      onOpenChange();
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
                title={
                  defaultValues
                    ? `بروزرسانی برند ${defaultValues?.name}`
                    : "افزودن برند جدید"
                }
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
                isLoading={
                  isPendingCreate || isPendingUpload || isPendingUpdate
                }
                onPress={handleCreateNewBrand}
              >
                {isPendingCreate || isPendingUpload || isPendingUpdate
                  ? "در حال ثبت…"
                  : defaultValues
                  ? "ثبت تغیرات"
                  : "ایجاد برند"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewBrandModal;
