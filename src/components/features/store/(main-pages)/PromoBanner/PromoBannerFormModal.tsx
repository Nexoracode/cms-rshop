"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useCreatePromoBanner,
  useUpdatePromoBanner,
} from "@/core/hooks/api/adminHome/usePromoBanner";
import { useForm } from "@/core/hooks/common/form/useForm";
import TextInput from "@/components/ui/inputs/TextInput";
import { handleMutation } from "@/core/utils/mutationHelper";
import { TfiLayoutMediaOverlay } from "react-icons/tfi";
import { useUploadSliderImages } from "@/core/hooks/api/adminHome/useUploadSliderImages";
import Textarea from "@/components/ui/inputs/Textarea";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import ColorPickerField from "@/components/shared/ColorPickerField";
import IsoDatePicker from "@/components/forms/Inputs/IsoDatePicker";
import NumberInput from "@/components/ui/inputs/NumberInput"; // کامپوننت جدید عددی

const initialPromoBannerForm = {
  title: "",
  description: "",
  imageUrl: "",
  mediaFile: null as File | null,

  link: "",
  linkText: "",

  backgroundColor: "",
  textColor: "#FFFFFF",

  isActive: true,
  isClosable: true,

  priority: 10,
  displayDuration: 10,

  startDate: null as string | null,
  endDate: null as string | null,
};

type PromoBannerFormModalProps = {
  bannerId?: number;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const PromoBannerFormModal: React.FC<PromoBannerFormModalProps> = ({
  bannerId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { mutateAsync: createBanner, isPending: isCreating } =
    useCreatePromoBanner();
  const { mutateAsync: updateBanner, isPending: isUpdating } =
    useUpdatePromoBanner();
  const { mutateAsync: uploadImageSlider, isPending: isUploading } =
    useUploadSliderImages();

  const [showLinkFields, setShowLinkFields] = useState<boolean>(false);

  const {
    form,
    errors,
    setForm,
    handleFieldChange,
    handleMultipleFieldsChange,
    reset,
    submit,
  } = useForm(initialPromoBannerForm, {
    onValidate: (data) => {
      const errs: any = {};

      if (!data.title.trim()) errs.title = "عنوان الزامی است";
      if (!data.imageUrl && !data.mediaFile)
        errs.imageUrl = "تصویر بنر الزامی است";

      if (showLinkFields) {
        if (!data.linkText?.trim()) errs.linkText = "متن دکمه الزامی است";
        if (!data.link?.trim()) errs.link = "لینک دکمه الزامی است";
      }

      if (!data.startDate || !data.endDate)
        errs.startDate = "بازه زمانی اعتبار الزامی است";

      return errs;
    },
    runValidationOnChange: true,
  });

  // پر کردن فرم در حالت ویرایش
  useEffect(() => {
    if (!defaultValues) return;

    setForm({
      ...initialPromoBannerForm,
      ...defaultValues,
      startDate: defaultValues.startDate || null,
      endDate: defaultValues.endDate || null,
      imageUrl: defaultValues.imageUrl || "",
      priority: defaultValues.priority ?? 10,
      displayDuration: defaultValues.displayDuration ?? 10,
    });

    if (defaultValues.linkText || defaultValues.link) {
      setShowLinkFields(true);
    }
  }, [defaultValues]);

  // بررسی وضعیت دکمه لینک وقتی مودال باز میشه
  useEffect(() => {
    if (form.linkText || form.link) {
      setShowLinkFields(true);
    }
  }, [isOpen]);

  const handleSubmit = submit(async () => {
    let finalImageUrl = form.imageUrl;

    if (form.mediaFile) {
      const fd = new FormData();
      fd.append("files", form.mediaFile);

      const uploadRes = await handleMutation(() => uploadImageSlider(fd), {
        returnResponse: true,
      });

      if (!uploadRes.ok) return false;
      finalImageUrl = uploadRes.data[0].url;
    }

    const payload: any = {
      title: form.title.trim(),
      description: form.description?.trim() || "",
      imageUrl: finalImageUrl,
      isActive: form.isActive,
      isClosable: form.isClosable,
      priority: Number(form.priority),
      displayDuration: Number(form.displayDuration),
      startDate: form.startDate,
      endDate: form.endDate,
    };

    if (form.backgroundColor) payload.backgroundColor = form.backgroundColor;
    if (form.textColor) payload.textColor = form.textColor;
    if (showLinkFields && form.linkText?.trim())
      payload.linkText = form.linkText.trim();
    if (showLinkFields && form.link?.trim()) payload.link = form.link.trim();

    if (bannerId) {
      return handleMutation(
        () => updateBanner({ id: bannerId, data: payload }),
        {
          resetForm,
        }
      );
    } else {
      return handleMutation(() => createBanner(payload), { resetForm });
    }
  });

  const resetForm = () => {
    reset();
    setShowLinkFields(false);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange?.(val);
        if (!val) resetForm();
      }}
      triggerProps={
        bannerId
          ? null
          : {
              title: "+ افزودن بنر تبلیغاتی",
              className: "bg-secondary-light text-secondary",
            }
      }
      title={bannerId ? "ویرایش بنر تبلیغاتی" : "افزودن بنر تبلیغاتی جدید"}
      confirmText={bannerId ? "بروزرسانی" : "ایجاد بنر"}
      onConfirm={handleSubmit}
      size="xl"
      icon={<TfiLayoutMediaOverlay />}
      isConfirmDisabled={isCreating || isUpdating || isUploading}
    >
      <div className="flex flex-col gap-6">
        {/* بازه زمانی اعتبار */}
        <IsoDatePicker
          label="بازه اعتبار بنر"
          enableRange
          valueIsoRange={{ start: form.startDate, end: form.endDate }}
          onChangeIsoRange={(range) => {
            handleMultipleFieldsChange({
              startDate: range?.start || null,
              endDate: range?.end || null,
            });
          }}
          showMonthAndYearPickers
          className="w-full"
          isRequired
          errorMessage={errors.startDate}
        />

        {/* عنوان و توضیحات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberInput
            label="اولویت نمایش"
            placeholder="10"
            value={form.priority}
            onChange={(val) => handleFieldChange("priority", val)}
            min={1}
            max={1000}
            suffix="(عدد کمتر = اولویت بالاتر)"
            isRequired
          />
          <NumberInput
            label="مدت نمایش خودکار"
            placeholder="10"
            value={form.displayDuration}
            onChange={(val) => handleFieldChange("displayDuration", val)}
            min={5}
            max={60}
            suffix="ثانیه"
            isRequired
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* وضعیت نمایش */}
          <ToggleSection
            title={`وضعیت نمایش: ${form.isActive ? "فعال" : "غیرفعال"}`}
            initialMode={form.isActive}
            onChange={(val) => handleFieldChange("isActive", val)}
          />

          {/* قابلیت بستن توسط کاربر */}
          <ToggleSection
            title={`قابل بستن توسط کاربر: ${form.isClosable ? "بله" : "خیر"}`}
            initialMode={form.isClosable}
            onChange={(val) => handleFieldChange("isClosable", val)}
          />
        </div>

        {/* دکمه لینک */}
        <ToggleSection
          title="نمایش دکمه لینک"
          initialMode={showLinkFields}
          onChange={(val) => {
            setShowLinkFields(val);
            if (!val) {
              handleMultipleFieldsChange({
                linkText: "",
                link: "",
              });
            }
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="متن دکمه"
              placeholder="مشاهده محصولات"
              value={form.linkText || ""}
              isRequired={showLinkFields}
              errorMessage={errors.linkText}
              onChange={(val) => handleFieldChange("linkText", val)}
              allowEnglishOnly={false}
            />
            <TextInput
              label="لینک دکمه"
              placeholder="/collections/sale"
              value={form.link || ""}
              isRequired={showLinkFields}
              errorMessage={errors.link}
              onChange={(val) => handleFieldChange("link", val)}
              inputAlign="left"
              allowSpecialChars
              allowedSpecialChars={["/", "-", "?", "=", "&", "_"]}
            />
          </div>
        </ToggleSection>

        {/* تصویر بنر */}
        <div>
          <p className="text-sm font-medium mb-2">
            تصویر بنر <span className="text-red-500">*</span>
          </p>
          <ImageBoxUploader
            changeStatusFile={form.mediaFile}
            defaultImg={form.imageUrl ?? null}
            onFile={(file) =>
              handleMultipleFieldsChange({
                mediaFile: file,
                imageUrl: "",
              })
            }
            errorMessage={errors.imageUrl}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="عنوان بنر"
            placeholder="مثلاً: تخفیف ویژه عید نوروز"
            value={form.title}
            errorMessage={errors.title}
            isRequired
            onChange={(val) => handleFieldChange("title", val)}
            allowEnglishOnly={false}
          />
          <ColorPickerField
            label="رنگ پس‌زمینه"
            value={form.backgroundColor}
            onChange={(color) => handleFieldChange("backgroundColor", color)}
            widthFull
          />
        </div>

        <Textarea
          label="توضیحات"
          value={form.description}
          onChange={(val) => handleFieldChange("description", val)}
          placeholder="توضیحات خود را وارد کنید"
          isRequired
          errorMessage={errors.description}
        />

        {/* رنگ‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
      </div>
    </BaseModal>
  );
};

export default PromoBannerFormModal;
