"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useCreateSideBanner,
  useUpdateSideBanner,
} from "@/core/hooks/api/adminHome/useSideBanners";
import { useUploadSliderImages } from "@/core/hooks/api/adminHome/useUploadSliderImages";
import { useForm } from "@/core/hooks/common/form/useForm";
import TextInput from "@/components/ui/inputs/TextInput";
import Textarea from "@/components/ui/inputs/Textarea";
import { handleMutation } from "@/core/utils/mutationHelper";
import ColorPickerField from "@/components/shared/ColorPickerField";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import { validateSideBanner } from "./side-banner-validation";
import { SideBannerPosition } from "./side-banner.types";
import { CiImageOn } from "react-icons/ci";

type Props = {
  bannerId?: number;
  position: SideBannerPosition; // از والد پاس داده میشه (top_left | top_right | ...)
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const initialForm = {
  title: "",
  subtitle: "",
  image_url: "",
  background_color: "#000",
  link: "",
  badge_text: "",
  badge_color: null,
  is_active: true,

  mediaFile: null as File | null,
  show_badge: false,
};

const SideBannerFormModal: React.FC<Props> = ({
  bannerId,
  position,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  // hooks for API
  const { mutateAsync: createBanner, isPending: isCreating } =
    useCreateSideBanner();
  // useUpdateSideBanner takes id as argument when creating the hook instance
  const { mutateAsync: updateBanner, isPending: isUpdating } =
    useUpdateSideBanner();
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useUploadSliderImages();

  const [showBadge, setShowBadge] = useState<boolean>(false);
  const [showBgColor, setShowBgColor] = useState<boolean>(false);

  const {
    form,
    errors,
    setForm,
    handleFieldChange,
    handleMultipleFieldsChange,
    reset,
    submit,
  } = useForm(initialForm, {
    onValidate: (data: any) => validateSideBanner(data, showBadge),
    runValidationOnChange: true,
  });

  useEffect(() => {
    if (!defaultValues) return;

    setForm({
      ...initialForm,
      ...defaultValues,
    });
  }, [defaultValues]);

  useEffect(() => {
    if (form) {
      if (form?.badge_color) {
        setShowBgColor(true);
      }
      if (form?.badge_text?.length) {
        setShowBadge(true);
      }
    }
  }, [isOpen]);

  const handleSubmit = submit(async () => {
    let finalImageUrl = form.image_url;

    if (form.mediaFile) {
      const fd = new FormData();
      fd.append("files", form.mediaFile);

      const uploadRes = (await handleMutation(() => uploadImage(fd), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      finalImageUrl = uploadRes.data[0].url;
    }

    const {
      title,
      subtitle,
      background_color,
      link,
      badge_text,
      badge_color,
      is_active,
    } = form;

    const payload: Record<string, any> = {
      title,
      subtitle,
      image_url: finalImageUrl,
      position,
      is_active,
      link,
      background_color,
      badge_text,
      badge_color: badge_color,
    };

    if (bannerId) {
      return handleMutation(
        () => updateBanner({ data: payload, id: bannerId ?? 0 }),
        {
          resetForm,
        }
      );
    } else {
      return handleMutation(() => createBanner(payload), {
        resetForm,
      });
    }
  });

  const resetForm = () => {
    reset();
    setShowBadge(false);
    setShowBgColor(false);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
      triggerProps={
        bannerId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      title={bannerId ? "ویرایش بنر جانبی" : "افزودن بنر جانبی جدید"}
      confirmText={bannerId ? "ویرایش بنر" : "ایجاد بنر"}
      onConfirm={handleSubmit}
      size="xl"
      icon={<CiImageOn />}
      isConfirmDisabled={isCreating || isUpdating || isUploading}
    >
      <div className="flex flex-col gap-6">
        <div className="w-full flex items-center justify-center gap-2 border border-gray-300 p-2 rounded-2xl">
          <ImageBoxUploader
            changeStatusFile={form.mediaFile}
            defaultImg={form?.image_url ?? null}
            onFile={(file) => handleFieldChange("mediaFile", file)}
            errorMessage={errors.image_url}
          />
          <ColorPickerField
            label=""
            value={form.background_color}
            onChange={(color) =>
              handleMultipleFieldsChange({
                background_color: color,
              })
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <TextInput
            label="عنوان"
            placeholder="عنوان بنر را وارد کنید"
            value={form.title}
            errorMessage={errors.title}
            isRequired
            onChange={(val) => handleFieldChange("title", val)}
            allowEnglishOnly={false}
          />
          <TextInput
            label="لینک"
            placeholder="path/to/1"
            value={form.link}
            allowSpecialChars
            allowedSpecialChars={["/", "-"]}
            isRequired
            errorMessage={errors.link}
            onChange={(val) => {
              handleFieldChange("link", val);
            }}
            inputAlign="left"
            allowSpaces={false}
          />
        </div>

        <Textarea
          label="متن / زیرعنوان"
          value={form.subtitle}
          onChange={(val) => handleFieldChange("subtitle", val)}
          placeholder="زیرعنوان را وارد کنید"
          isRequired
          errorMessage={errors.subtitle}
        />

        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />

        {/* badge toggle */}
        <ToggleSection
          title={"نمایش برچسب (Badge)"}
          initialMode={showBadge}
          onChange={(val) => {
            setShowBadge(val);
            handleFieldChange("show_badge", val);
            if (!val) {
              handleFieldChange("badge_text", "");
            }
          }}
        >
          <TextInput
            label="متن برچسب"
            placeholder="مثلاً 14% یا جدید"
            value={form.badge_text}
            onChange={(val) => {
              handleFieldChange("badge_text", val);
              if (!showBadge && val) setShowBadge(true);
              handleMultipleFieldsChange({ show_badge: Boolean(val) });
            }}
            allowSpecialChars
            allowEnglishOnly={false}
            isRequired
            errorMessage={errors.badge_text}
            className="mb-4"
          />
          <ToggleSection
            title={"رنگ پس زمینه پرچسب"}
            initialMode={showBgColor}
            onChange={(val) => {
              setShowBgColor(val);
              handleFieldChange("badge_color", "#000" as any);
              if (!val) {
                handleFieldChange("badge_color", null);
              }
            }}
          >
            <ColorPickerField
              label=""
              value={form.badge_color ?? ""}
              onChange={(color) => handleFieldChange("badge_color", color)}
              widthFull
            />
          </ToggleSection>
        </ToggleSection>
      </div>
    </BaseModal>
  );
};

export default SideBannerFormModal;
