"use client";

import React, { useEffect, useState } from "react";
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
  description: "",
  image_url: "",
  mediaFile: null as File | null,

  background_color: "",
  use_background: false,
  is_dark: false,

  button_text: "",
  button_link: "",

  is_active: true,
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
  const [showButtonFields, setShowButtonFields] = useState<boolean>(false);

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

    setForm({
      title: defaultValues.title ?? "",
      description: defaultValues.description ?? "",
      image_url: defaultValues.image_url ?? "",
      mediaFile: null,

      background_color: defaultValues.background_color ?? "",
      use_background: Boolean(defaultValues.background_color),
      is_dark: Boolean(defaultValues.is_dark),

      button_text: defaultValues.button_text ?? "",
      button_link: defaultValues.button_link ?? "",

      is_active: Boolean(defaultValues.is_active),
    });
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    let finalImageUrl = form.image_url;

    if (form.mediaFile) {
      const fd = new FormData();
      fd.append("files", form.mediaFile);

      const uploadRes = (await handleMutation(() => uploadImageSlider(fd), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      finalImageUrl = uploadRes.data[0].url;
    }

    const payload = {
      title: form.title,
      description: form.description,
      image_url: finalImageUrl,

      background_color: form.use_background ? form.background_color : undefined,
      is_dark: form.use_background ? form.is_dark : undefined,

      button_text: form.button_text || undefined,
      button_link: form.button_link || undefined,

      is_active: form.is_active,
    };

    if (categoryId) {
      return handleMutation(
        () => updateSlider({ id: categoryId, ...payload }),
        {
          resetForm,
        }
      );
    } else {
      return handleMutation(() => createSlider(payload), {
        resetForm,
      });
    }
  });

  const resetForm = () => {
    reset();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
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
      <div className="flex flex-col gap-4">
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
          onChange={(val) => handleFieldChange("description", val)}
          placeholder="توضیحات را وارد کنید"
          isRequired
        />

        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />

        <ToggleSection
          title={"نمایش دکمه"}
          initialMode={showButtonFields}
          onChange={(val) => {
            setShowButtonFields(val);
            if (!val) {
              handleMultipleFieldsChange({
                button_text: "",
                button_link: "",
              });
            }
          }}
        >
          <div className="flex items-center gap-2">
            <TextInput
              label="عنوان دکمه"
              placeholder="عنوان دکمه را وارد کنید"
              value={form.button_text}
              isRequired
              errorMessage={errors.button_text}
              onChange={(val) => handleFieldChange("button_text", val)}
              allowEnglishOnly={false}
            />
            <TextInput
              label="لینک دکمه"
              isRequired
              placeholder="لینک دکمه را وارد کنید"
              value={form.button_link}
              errorMessage={errors.button_link}
              onChange={(val) => handleFieldChange("button_link", val)}
            />
          </div>
        </ToggleSection>

        <DualToggleSection
          mode2Title="پس‌زمینه بدون عکس"
          title="پس‌زمینه عکس‌دار"
          value={!form.use_background} // اینطوری وقتی عکس هست switch روی عکس‌دار می‌مونه
          onChange={(isPhotoBackground: boolean) => {
            if (isPhotoBackground) {
              // وقتی switch رو روی عکس می‌کنه
              handleMultipleFieldsChange({
                use_background: false, // رنگ خاموش
                background_color: "", // پاک کردن رنگ
              });
            } else {
              // وقتی switch روی رنگه
              handleMultipleFieldsChange({
                use_background: true,
                // mediaFile دست نخورده باقی می‌مونه
              });
            }
          }}
          children={
            <ImageBoxUploader
              changeStatusFile={form.mediaFile}
              defaultImg={form?.image_url ?? null}
              onFile={(file) =>
                handleMultipleFieldsChange({
                  mediaFile: file,
                  use_background: false, // وقتی عکس انتخاب شد، background رنگی خاموش بشه
                })
              }
              errorMessage={errors.image_url}
            />
          }
          mode2Children={
            <div className="flex gap-4">
              <ColorPickerField
                label=""
                value={form.background_color}
                onChange={(color) => {
                  handleMultipleFieldsChange({
                    background_color: color,
                    use_background: true, // فقط رنگ روشن بشه، عکس پاک نشه
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
      </div>
    </BaseModal>
  );
};

export default HeroSliderFormModal;
