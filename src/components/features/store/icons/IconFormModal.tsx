"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import {
  useBrandUpload,
  useCreateBrand,
  useUpdateBrand,
} from "@/core/hooks/api/useBrand";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import { TbIcons } from "react-icons/tb";
import { useForm } from "@/core/hooks/common/form/useForm";
import { handleMutation } from "@/core/utils/mutationHelper";
import { IconFormvalidation } from "./icon-form-validate";

type Props = {
  brandId?: number | null;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialIconForm = {
  name: "",
  slug: "",
  logo: null as File | string | null,
};

const IconFormModal: React.FC<Props> = ({
  brandId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialIconForm,
    {
      onValidate: IconFormvalidation,
      runValidationOnChange: true,
    },
  );

  const { mutateAsync: uploadMedias, isPending: isPendingUpload } =
    useBrandUpload();
  const { mutateAsync: createBrand, isPending: isPendingCreate } =
    useCreateBrand();
  const { mutateAsync: updateBrand, isPending: isPendingUpdate } =
    useUpdateBrand();

  useEffect(() => {
    if (defaultValues) {
      setForm(defaultValues);
    }
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    let logoUrl = typeof form.logo === "string" ? form.logo : "";

    if (form.logo instanceof File) {
      const formData = new FormData();
      formData.append("files", form.logo);

      const uploadRes = (await handleMutation(() => uploadMedias(formData), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      logoUrl = uploadRes.data?.[0]?.url ?? null;
    }

    const { name, slug } = form;
    const payload = { name, slug, logo: logoUrl };
    if (brandId)
      return handleMutation(() => updateBrand({ ...payload, id: brandId }), {
        resetForm,
      });
    else return handleMutation(() => createBrand(payload), { resetForm });
  });

  const resetForm = () => reset();

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange?.(val);
      }}
      triggerProps={
        brandId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      title={brandId ? "ویرایش آیکون" : "افزودن آیکون جدید"}
      confirmText={brandId ? "ویرایش آیکون" : "ایجاد آیکون"}
      onConfirm={handleSubmit}
      icon={<TbIcons />}
      isConfirmDisabled={isPendingUpload || isPendingCreate || isPendingUpdate}
    >
      <div className="flex flex-col gap-6">
        <SlugInput
          value={form.name}
          onChange={(val) => handleFieldChange("name", val)}
          isActiveError={true}
          isRequired
          errorMessage={errors.name}
          label="نام آیکون (انگلیسی)"
        />
      </div>
    </BaseModal>
  );
};

export default IconFormModal;
