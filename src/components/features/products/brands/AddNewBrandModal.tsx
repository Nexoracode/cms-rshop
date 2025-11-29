"use client";

import React, { useEffect } from "react";
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
import TextInput from "@/components/ui/inputs/TextInput";
import { useFormHandler } from "@/core/hooks/common/useFormHandler";
import { validateBrand } from "./brand-validation";

type Props = {
  brandId?: number | null;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialBrandForm = {
  name: "",
  slug: "",
  logo: null as File | string | null,
};

const AddNewBrandModal: React.FC<Props> = ({
  brandId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {

  const {
    form,
    errors,
    handleFieldChange,
    canSubmit,
    setForm,
  } = useFormHandler(initialBrandForm, {
    onValidate: validateBrand,
    runValidationOnChange: true,
  });

  const { mutateAsync: uploadMedias, isPending: isPendingUpload } =
    useBrandUpload();
  const { mutateAsync: createBrand, isPending: isPendingCreate } =
    useCreateBrand();
  const { mutateAsync: updateBrand, isPending: isPendingUpdate } =
    useUpdateBrand();

  useEffect(() => {
    if (defaultValues) {
      setForm({
        name: defaultValues.name ?? "",
        slug: defaultValues.slug ?? "",
        logo: defaultValues.logo ?? null,
      });
    }
  }, [defaultValues]);

  const handleSubmit = async () => {
    if (!canSubmit()) return;

    try {
      let logoUrl = typeof form.logo === "string" ? form.logo : "";

      if (form.logo instanceof File) {
        const formData = new FormData();
        formData.append("files", form.logo);
        const uploadRes = await uploadMedias(formData);
        if (!uploadRes.ok) return;
        logoUrl = uploadRes.data?.[0]?.url ?? null;
      }

      const payload = { name: form.name, slug: form.slug, logo: logoUrl };

      const res = brandId
        ? await updateBrand({ ...payload, id: brandId })
        : await createBrand(payload);

      if (!res.ok) return;

      toast.success(
        brandId ? "برند با موفقیت بروزرسانی شد" : "برند با موفقیت ایجاد شد"
      );
      setForm({ name: "", slug: "", logo: null });
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
      icon={<TbBrandArc />}
    >
      <div className="flex flex-col gap-6">
        <TextInput
          label="نام برند"
          placeholder="نام برند را وارد کنید"
          value={form.name}
          onChange={(val) => handleFieldChange("name", val)}
          allowEnglishOnly={false}
          isRequired
          errorMessage={errors.name}
        />

        <SlugInput
          value={form.slug}
          onChange={(val) => handleFieldChange("slug", val)}
          isActiveError={true}
          isRequired
          errorMessage={errors.slug}
        />

        <ImageBoxUploader
          textBtn={form.logo ? "تغییر لوگو" : "+ افزودن لوگو"}
          title="لوگوی برند"
          changeStatusFile={form.logo}
          defaultImg={form.logo}
          onFile={(file) => handleFieldChange("logo", file)}
          errorMessage={errors.logo}
        />
      </div>
    </BaseModal>
  );
};

export default AddNewBrandModal;
