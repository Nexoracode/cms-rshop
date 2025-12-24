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
import { TfiLayoutSlider } from "react-icons/tfi";
import DualToggleSection from "@/components/shared/Toggle/DualToggleSection";
import ColorPickerField from "@/components/shared/ColorPickerField";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import { validateSideBanner } from "./side-banner-validation";
import { SideBannerPosition } from "./side-banner.types";

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
  mediaFile: null as File | null,

  background_color: "",
  is_dark: false,

  link: "",
  show_link: false,

  badge_text: "",
  badge_color: "",
  show_badge: false,

  is_active: true,
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
    useUpdateSideBanner(bannerId ?? 0);
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useUploadSliderImages();

  const [showLinkFields, setShowLinkFields] = useState<boolean>(false);
  const [showBadgeFields, setShowBadgeFields] = useState<boolean>(false);

  const {
    form,
    errors,
    setForm,
    handleFieldChange,
    handleMultipleFieldsChange,
    reset,
    submit,
  } = useForm(initialForm, {
    // pass showLinkFields & showBadgeFields to validator so it can check link/badge conditionally
    onValidate: (data: any) =>
      validateSideBanner(data, showLinkFields, showBadgeFields),
    runValidationOnChange: true,
  });

  // initialize form from defaultValues (edit flow)
  useEffect(() => {
    if (!defaultValues) {
      setForm(initialForm);
      setShowLinkFields(false);
      setShowBadgeFields(false);
      return;
    }

    setForm({
      title: defaultValues.title ?? "",
      subtitle: defaultValues.subtitle ?? "",
      image_url: defaultValues.image_url ?? "",
      mediaFile: null,

      background_color: defaultValues.background_color ?? "",
      is_dark: Boolean(defaultValues.is_dark),

      link: defaultValues.link ?? "",
      show_link: Boolean(defaultValues.link),

      badge_text: defaultValues.badge_text ?? "",
      badge_color: defaultValues.badge_color ?? "",
      show_badge: Boolean(defaultValues.badge_text),

      is_active: Boolean(defaultValues.is_active),
    });

    setShowLinkFields(Boolean(defaultValues.link));
    setShowBadgeFields(Boolean(defaultValues.badge_text));
  }, [defaultValues, setForm]);

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

    // build payload according to backend spec for side-banners
    const {
      title,
      subtitle,
      background_color,
      is_dark,
      link,
      badge_text,
      badge_color,
      is_active,
      show_link,
      show_badge,
    } = form;

    const payload: Record<string, any> = {
      title,
      subtitle,
      image_url: finalImageUrl,
      position, // position must come from parent
      is_active,
    };

    // optional background_color
    if (background_color && background_color.trim() !== "") {
      payload.background_color = background_color;
    }

    // include is_dark only if a background color is used
    payload.is_dark =
      background_color && background_color.trim() !== ""
        ? Boolean(is_dark)
        : false;

    // link (optional) but only if show_link true or link provided
    if (showLinkFields || (link && link.trim() !== "")) {
      payload.link = link && link.trim() !== "" ? link : undefined;
    }

    // badge (optional)
    if (showBadgeFields || (badge_text && badge_text.trim() !== "")) {
      payload.badge_text =
        badge_text && badge_text.trim() !== "" ? badge_text : undefined;
      payload.badge_color =
        badge_color && badge_color.trim() !== "" ? badge_color : undefined;
    }

    // send
    if (bannerId) {
      // update: updateBanner expects data as body (hook was created with id param)
      return handleMutation(() => updateBanner(payload), {
        resetForm,
      });
    } else {
      // create
      return handleMutation(() => createBanner(payload), {
        resetForm,
      });
    }
  });

  const resetForm = () => {
    reset();
    setShowLinkFields(false);
    setShowBadgeFields(false);
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
      icon={<TfiLayoutSlider />}
      isConfirmDisabled={isCreating || isUpdating || isUploading}
    >
      <div className="flex flex-col gap-4">
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
            placeholder="لینک بنر را وارد کنید"
            value={form.link}
            errorMessage={errors.link}
            allowSpecialChars
            allowedSpecialChars={["/", "-"]}
            onChange={(val) => {
              handleFieldChange("link", val);
              // keep showLinkFields true when user types
              if (!showLinkFields && val) setShowLinkFields(true);
              handleMultipleFieldsChange({ show_link: Boolean(val) });
            }}
          />
        </div>

        <Textarea
          label="متن / زیرعنوان"
          value={form.subtitle}
          onChange={(val) => handleFieldChange("subtitle", val)}
          placeholder="زیرعنوان را وارد کنید"
          isRequired
        />

        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />

        {/* badge toggle */}
        <ToggleSection
          title={"نمایش برچسب (Badge)"}
          initialMode={showBadgeFields}
          onChange={(val) => {
            setShowBadgeFields(val);
            handleMultipleFieldsChange({
              show_badge: val,
            });
            if (!val) {
              handleMultipleFieldsChange({
                badge_text: "",
                badge_color: "",
              });
            }
          }}
        >
          <div className="flex items-center gap-2">
            <TextInput
              label="متن برچسب"
              placeholder="مثلاً 14% یا جدید"
              value={form.badge_text}
              errorMessage={errors.badge_text}
              onChange={(val) => {
                handleFieldChange("badge_text", val);
                if (!showBadgeFields && val) setShowBadgeFields(true);
                handleMultipleFieldsChange({ show_badge: Boolean(val) });
              }}
              allowEnglishOnly={false}
            />
            <ColorPickerField
              label="رنگ برچسب"
              value={form.badge_color}
              onChange={(color) => handleFieldChange("badge_color", color)}
            />
          </div>
        </ToggleSection>

        {/* image / background */}
        <DualToggleSection
          mode2Title="پس‌زمینه رنگی"
          title="پس‌زمینه عکس‌دار"
          value={!Boolean(form.background_color)}
          onChange={(isPhotoBackground: boolean) => {
            if (isPhotoBackground) {
              handleMultipleFieldsChange({
                background_color: "",
              });
            } else {
              // user chose background color mode; keep mediaFile intact (do not clear it)
              handleMultipleFieldsChange({
                // nothing else forced here
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
                  // if user selects an image, background color shouldn't be prioritized
                  background_color: "",
                })
              }
              errorMessage={errors.image_url}
            />
          }
          mode2Children={
            <div className="flex flex-col gap-4">
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
          }
        />
      </div>
    </BaseModal>
  );
};

export default SideBannerFormModal;
