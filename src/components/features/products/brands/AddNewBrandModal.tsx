"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useBrandUpload,
  useCreateBrand,
  useUpdateBrand,
} from "@/core/hooks/api/useBrand";
import toast from "react-hot-toast";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import { TbBrandArc } from "react-icons/tb";

type Props = {
  brandId?: number | null;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const AddNewBrandModal: React.FC<Props> = ({
  brandId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const [data, setData] = useState({
    name: "",
    slug: "",
    logo: null as File | string | null,
  });

  const { mutateAsync: uploadMedias, isPending: isPendingUpload } =
    useBrandUpload();
  const { mutateAsync: createBrand, isPending: isPendingCreate } =
    useCreateBrand();
  const { mutateAsync: updateBrand, isPending: isPendingUpdate } =
    useUpdateBrand();

  const isDisabled =
    !data.name.trim() ||
    !data.slug.trim() ||
    (!brandId && !data.logo) ||
    isPendingUpload ||
    isPendingCreate ||
    isPendingUpdate;

  useEffect(() => {
    if (defaultValues) {
      setData({
        name: defaultValues.name || "",
        slug: defaultValues.slug || "",
        logo: defaultValues.logo || null,
      });
    } else {
      setData({ name: "", slug: "", logo: null });
    }
  }, [defaultValues]);

  const handleSubmit = async () => {
    if (isDisabled) return;

    try {
      let logoUrl = typeof data.logo === "string" ? data.logo : "";

      if (data.logo instanceof File) {
        const formData = new FormData();
        formData.append("files", data.logo);
        const uploadRes = await uploadMedias(formData);
        if (!uploadRes.ok) return;
        logoUrl = uploadRes.data?.[0]?.url ?? null;
      }

      const payload = { name: data.name, slug: data.slug, logo: logoUrl };

      const res = brandId
        ? await updateBrand({ ...payload, id: brandId })
        : await createBrand(payload);

      if (!res.ok) return;

      toast.success(
        brandId ? "برند با موفقیت بروزرسانی شد" : "برند با موفقیت ایجاد شد"
      );
      setData({ name: "", slug: "", logo: null });
      onOpenChange?.(false);
    } catch (err) {
      console.error(err);
      toast.error("خطای ناشناخته رخ داد.");
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerProps={
        brandId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      title={brandId ? "ویرایش برند" : "افزودن برند جدید"}
      confirmText={brandId ? "ویرایش برند" : "ایجاد برند"}
      onConfirm={handleSubmit}
      isConfirmDisabled={isDisabled}
      size="xl"
      icon={<TbBrandArc />}
    >
      <div className="flex flex-col gap-6 sm:flex-row items-start sm:gap-4 mb-4">
        <Input
          isRequired
          labelPlacement="outside"
          label="نام برند"
          placeholder="نام برند را وارد کنید"
          value={data.name}
          onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
        />
        <SlugInput
          value={data.slug}
          onChange={(val) => setData((p) => ({ ...p, slug: val }))}
          isActiveError={true}
        />
      </div>

      <ImageBoxUploader
        textBtn={data.logo ? "تغییر لوگو" : "+ افزودن لوگو"}
        title="لوگوی برند"
        changeStatusFile={data.logo}
        defaultImg={data.logo}
        onFile={(file) => setData((p) => ({ ...p, logo: file }))}
      />
    </BaseModal>
  );
};

export default AddNewBrandModal;
