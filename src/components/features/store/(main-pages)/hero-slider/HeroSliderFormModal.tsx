"use client";

import React, { useEffect } from "react";
import { NumberInput } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useCreateHeroSlider,
  useUpdateHeroSlider,
} from "@/core/hooks/api/adminHome/useHeroSlider";
import { useForm } from "@/core/hooks/common/form/useForm";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import TextInput from "@/components/ui/inputs/TextInput";
import { handleMutation } from "@/core/utils/mutationHelper";
import { TfiLayoutSlider } from "react-icons/tfi";
import { useUploadSliderImages } from "@/core/hooks/api/adminHome/useUploadSliderImages";
import { validateHeroSlider } from "./hero-slider-validation";

const initialSliderForm = {
  title: "",
  slug: "",
  discount: "0",
  mediaId: "",
  media: null as any,
  mediaFile: null as File | null,
};

type HeroSliderFormModalProps = {
  categoryId?: number;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const HeroSliderFormModal: React.FC<HeroSliderFormModalProps> = ({
  categoryId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { mutateAsync: createSlider, isPending: isCreating } =
    useCreateHeroSlider();
  const { mutateAsync: updateSlider, isPending: isUpdating } =
    useUpdateHeroSlider();
  const { mutateAsync: uploadImageSlider, isPending: isUploading } =
    useUploadSliderImages();

  const {
    form,
    errors,
    setForm,
    handleFieldChange,
    handleMultipleFieldsChange,
    reset,
    submit,
  } = useForm(initialSliderForm, {
    onValidate: validateHeroSlider,
    runValidationOnChange: true,
  });

  useEffect(() => {
    if (!defaultValues) {
      setForm(initialSliderForm);
      return;
    }

    const { discount, media, slug, title } = defaultValues;

    setForm({
      title,
      slug,
      discount,
      media,
      mediaId: media?.id ?? "",
      mediaFile: null,
    });

  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    let finalMediaId = form.mediaId;

    if (form.mediaFile) {
      const fd = new FormData();
      fd.append("files", form.mediaFile);

      const uploadRes = (await handleMutation(() => uploadImageSlider(fd), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      finalMediaId = uploadRes.data[0].id;
    }

    const payload = {
      id: categoryId,
      title: form.title,
      slug: form.slug,
      discount: form.discount,
      mediaId: finalMediaId,
    };

    if (categoryId)
      return handleMutation(() => updateSlider(payload), {
        resetForm,
      });
    else return handleMutation(() => createSlider(payload), { resetForm });
  });

  const resetForm = () => {
    reset();
    //setForm(initialSliderForm);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange?.(val);
      }}
      triggerProps={
        categoryId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      title={categoryId ? "ویرایش اسلایدر" : "افزودن اسلایدر جدید"}
      confirmText={categoryId ? "ویرایش اسلایدر" : "ایجاد اسلایدر"}
      onConfirm={handleSubmit}
      size="xl"
      icon={<TfiLayoutSlider />}
      isConfirmDisabled={isCreating || isUpdating || isUploading}
    >
      <div className="flex flex-col gap-6">
        <ImageBoxUploader
          changeStatusFile={form.mediaFile}
          defaultImg={form?.media?.url ? form?.media?.url : null}
          onFile={(file) =>
            handleMultipleFieldsChange({
              mediaFile: file,
              mediaId: typeof file === "string" ? file : "",
            })
          }
          errorMessage={errors.mediaId}
        />

        <div className="flex flex-col gap-6 sm:flex-row items-start sm:gap-4">
          <TextInput
            label="عنوان"
            placeholder="عنوان دسته بندی را وارد کنید"
            value={form.title}
            errorMessage={errors.title}
            isRequired
            onChange={(val) => handleFieldChange("title", val)}
            allowEnglishOnly={false}
          />

          <SlugInput
            value={form.slug}
            onChange={(val) => handleFieldChange("slug", val)}
            isActiveError={true}
            errorMessage={errors.slug}
          />
        </div>

        <NumberInput
          label="تخفیف"
          labelPlacement="outside"
          hideStepper
          minValue={0}
          maxValue={99}
          endContent={<>%</>}
          value={+form.discount}
          onValueChange={(val) =>
            handleFieldChange("discount", String(val) || "0")
          }
        />
      </div>
    </BaseModal>
  );
};

export default HeroSliderFormModal;
