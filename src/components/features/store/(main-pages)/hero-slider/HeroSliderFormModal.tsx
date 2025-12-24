"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useCreateHeroSlider,
  useUpdateHeroSlider,
} from "@/core/hooks/api/adminHome/useHeroSlider";
import { useForm } from "@/core/hooks/common/form/useForm";
import TextInput from "@/components/ui/inputs/TextInput";
import { handleMutation } from "@/core/utils/mutationHelper";
import { TfiLayoutSlider } from "react-icons/tfi";
import { useUploadSliderImages } from "@/core/hooks/api/adminHome/useUploadSliderImages";
import { validateHeroSlider } from "./hero-slider-validation";
import DualToggleSection from "@/components/shared/Toggle/DualToggleSection";
import ColorPickerField from "@/components/shared/ColorPickerField";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import Textarea from "@/components/ui/inputs/Textarea";

const initialSliderForm = {
  title: "",
  image_url: null as any,
  mediaFile: null as File | null,
  is_dark: false,
  background_color: "",
  use_background: false,
  is_active: false,
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

    const { title, background_color, is_dark, image_url, is_active } =
      defaultValues;

    setForm({
      title,
      image_url,
      is_active,
      mediaFile: null,
      background_color: background_color ?? "",
      is_dark: Boolean(is_dark),
      use_background: Boolean(background_color),
    });
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    let finalMediaId = form.image_url;

    if (form.mediaFile) {
      const fd = new FormData();
      fd.append("files", form.mediaFile);

      const uploadRes = (await handleMutation(() => uploadImageSlider(fd), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      finalMediaId = uploadRes.data[0].url;
    }

    const payload = {
      id: categoryId,
      title: form.title,
      mediaId: finalMediaId,
      background_color: form.use_background ? form.background_color : undefined,
      is_dark: form.use_background ? form.is_dark : undefined,
    };

    if (categoryId)
      return handleMutation(() => updateSlider(payload), {
        resetForm,
      });
    else
      return handleMutation(() => createSlider(payload), {
        resetForm,
      });
  });

  const resetForm = () => {
    reset();
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
        <TextInput
          label="عنوان"
          placeholder="عنوان اسلایدر را وارد کنید"
          value={form.title}
          errorMessage={errors.title}
          isRequired
          onChange={(val) => handleFieldChange("title", val)}
          allowEnglishOnly={false}
        />

        <Textarea
          label="توضیحات"
          value={form.description}
          onChange={(value) => handleFieldChange("description", val)}
          placeholder="توضیحات را وارد کنید"
        />

        <ToggleSection
          title={"نمایش دکمه"}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
          children={
            <div className="flex items-center gap-2">
              <TextInput
                placeholder="عنوان دکمه را وارد کنید"
                value={form.title}
                errorMessage={errors.title}
                isRequired
                onChange={(val) => handleFieldChange("title", val)}
                allowEnglishOnly={false}
              />
              <TextInput
                placeholder="لینک دکمه را وارد کنید"
                value={form.title}
                errorMessage={errors.title}
                isRequired
                onChange={(val) => handleFieldChange("title", val)}
                allowEnglishOnly={false}
              />
            </div>
          }
        />

        <DualToggleSection
          mode2Title="پس‌زمینه بدون عکس"
          title="پس‌زمینه عکس‌دار"
          value={Boolean(form.use_background)}
          onChange={(isBackground: boolean) => {
            if (isBackground) {
              handleMultipleFieldsChange({
                use_background: true,
                mediaFile: null,
              });
            } else {
              handleMultipleFieldsChange({
                use_background: false,
                background_color: "",
                is_dark: false,
              });
            }
          }}
          children={
            <ImageBoxUploader
              changeStatusFile={form.mediaFile}
              defaultImg={form?.image_url ? form?.image_url : null}
              onFile={(file) =>
                handleMultipleFieldsChange({
                  mediaFile: file,
                  use_background: false,
                })
              }
              errorMessage={errors.mediaId}
            />
          }
          mode2Children={
            <div className="flex flex-col gap-4">
              <ColorPickerField
                label=""
                value={form.background_color}
                onChange={(color) => {
                  // وقتی کاربر رنگ را انتخاب می‌کند، مود background را فعال کن و رنگ را ذخیره کن
                  handleMultipleFieldsChange({
                    background_color: color,
                    use_background: true,
                  });
                }}
              />
              <ToggleSection
                title={`تم پس‌زمینه ${form.is_dark ? "تاریک" : "روشن"}`}
                initialMode={form.is_dark}
                onChange={(val) => handleFieldChange("is_dark", val)}
              />
            </div>
          }
        />
        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />
      </div>
    </BaseModal>
  );
};

export default HeroSliderFormModal;
