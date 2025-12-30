"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { useForm } from "@/core/hooks/common/form/useForm";
import TextInput from "@/components/ui/inputs/TextInput";
import Textarea from "@/components/ui/inputs/Textarea";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import NumberInput from "@/components/ui/inputs/NumberInput";
import {
  useCreateHomeSection,
  useUpdateHomeSection,
} from "@/core/hooks/api/adminHome/useHomeSections";
import { validateHomeSection } from "./home-section-validation";
import { handleMutation } from "@/core/utils/mutationHelper";

type Props = {
  sectionId?: number;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const initialForm = {
  title: "",
  slug: "",
  description: "",
  section_type: "",
  display_style: "",
  products_limit: 10,
  show_view_all_button: false,
  view_all_link: "",
  is_active: true,
};

const SpecialSectionModal: React.FC<Props> = ({
  sectionId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { mutateAsync: createSection, isPending: isCreating } =
    useCreateHomeSection();
  const { mutateAsync: updateSection, isPending: isUpdating } =
    useUpdateHomeSection(sectionId ?? 0);
  //

  const { form, errors, setForm, handleFieldChange, reset, submit } = useForm(
    initialForm,
    {
      onValidate: (data: any) => validateHomeSection(data),
      runValidationOnChange: true,
    }
  );

  useEffect(() => {
    if (!defaultValues) return;

    setForm({
      ...initialForm,
      ...defaultValues,
    });
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    const { section_type, ...other } = form;

    const payload: Record<string, any> = {
      section_type: "special_products",
      ...other,
    };

    if (sectionId) {
      return handleMutation(() => updateSection(payload), {
        resetForm,
      });
    } else {
      return handleMutation(() => createSection(payload), {
        resetForm,
      });
    }
  });

  const resetForm = () => {
    reset();
  };

  const displayOptions: SelectOption[] = [
    { key: "carousel", title: "اسلایدر" },
    { key: "grid", title: "شبکه ای" },
    { key: "list", title: "لیستی" },
  ];

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
      triggerProps={
        sectionId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      title={sectionId ? "ویرایش بخش" : "افزودن بخش جدید"}
      confirmText={sectionId ? "ویرایش بخش" : "ایجاد بخش"}
      onConfirm={handleSubmit}
      size="xl"
      icon={<TfiLayoutSliderAlt />}
      isConfirmDisabled={isCreating || isUpdating}
    >
      <div className="flex flex-col gap-6">
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
          <SlugInput
            value={form.slug}
            onChange={(val) => handleFieldChange("slug", val)}
            isActiveError={true}
            isRequired
            errorMessage={errors.slug}
          />
        </div>

        <div className="flex items-center gap-2">
          <TextInput
            label="لینک"
            placeholder="path/to/1"
            value={form.view_all_link}
            allowSpecialChars
            allowedSpecialChars={["/", "-"]}
            isRequired
            errorMessage={errors.view_all_link}
            onChange={(val) => {
              handleFieldChange("view_all_link", val);
            }}
            inputAlign="left"
            allowSpaces={false}
          />
          <SelectBox
            label="نوع نمایش"
            value={form.display_style}
            onChange={(val) => handleFieldChange("display_style", val)}
            options={displayOptions}
            placeholder="انتخاب نوع نمایش"
            isRequired
            errorMessage={errors.display_style}
          />
        </div>

        <NumberInput
          label="تعداد محدودیت نمایش"
          placeholder="10"
          suffix="عدد"
          min={0}
          max={30}
          value={form.products_limit}
          onChange={(limit) => handleFieldChange("products_limit", limit)}
        />

        <Textarea
          label="توضیحات"
          value={form.description}
          onChange={(val) => handleFieldChange("description", val)}
          placeholder="توضیحات را وارد کنید"
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

export default SpecialSectionModal;
