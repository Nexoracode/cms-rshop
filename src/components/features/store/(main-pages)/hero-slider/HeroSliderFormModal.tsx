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
  sliderId?: number;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const HeroSliderFormModal: React.FC<HeroSliderFormModalProps> = ({
  sliderId,
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
    onValidate: (data) => validateHeroSlider(data, showButtonFields),
    runValidationOnChange: true,
  });

  useEffect(() => {
    if (!defaultValues) return;

    setForm({
      ...initialSliderForm,
      ...defaultValues,
    });
  }, [defaultValues]);

  useEffect(() => {
    if (form) {
      if (form?.background_color?.length) {
        handleFieldChange("use_background", true);
      }
      if (form?.button_text?.length) {
        setShowButtonFields(true);
      }
    }
  }, [isOpen]);

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

    const {
      background_color,
      button_link,
      button_text,
      description,
      is_active,
      is_dark,
      title,
      use_background,
    } = form;

    const payload = {
      title,
      description,
      image_url: finalImageUrl,
      ...(use_background ? { background_color } : {}),
      ...(button_text ? { button_text } : {}),
      ...(button_link ? { button_link } : {}),
      is_dark: form.use_background ? Boolean(is_dark) : false,
      is_active,
    };

    console.log(payload);

    if (sliderId) {
      return handleMutation(
        () => updateSlider({ id: sliderId, data: payload }),
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
        sliderId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary",
            }
      }
      title={sliderId ? "ویرایش اسلایدر" : "افزودن اسلایدر جدید"}
      confirmText={sliderId ? "ویرایش اسلایدر" : "ایجاد اسلایدر"}
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
          errorMessage={errors.description}
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
              form.button_link?.length && handleFieldChange("button_link", "");
              form.button_text?.length && handleFieldChange("button_text", "");
            }
          }}
        >
          <div className="flex items-center gap-2">
            <TextInput
              label="عنوان دکمه"
              placeholder="عنوان دکمه را وارد کنید"
              value={form.button_text || ""}
              isRequired
              errorMessage={errors.button_text}
              onChange={(val) => handleFieldChange("button_text", val)}
              allowEnglishOnly={false}
            />
            <TextInput
              label="لینک دکمه"
              isRequired
              placeholder="/page/path/1"
              value={form.button_link || ""}
              errorMessage={errors.button_link}
              allowSpecialChars
              allowedSpecialChars={["/", "-"]}
              onChange={(val) => handleFieldChange("button_link", val)}
              inputAlign="left"
              allowSpaces={false}
            />
          </div>
        </ToggleSection>

        <DualToggleSection
          mode2Title="پس‌زمینه بدون عکس"
          title="پس‌زمینه عکس‌دار"
          value={!form.use_background}
          onChange={(isPhotoBackground: boolean) => {
            if (isPhotoBackground) {
              handleMultipleFieldsChange({
                use_background: false,
                background_color: "",
              });
            } else {
              handleMultipleFieldsChange({
                use_background: true,
                background_color: "#000",
                image_url: "",
                mediaFile: null
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
