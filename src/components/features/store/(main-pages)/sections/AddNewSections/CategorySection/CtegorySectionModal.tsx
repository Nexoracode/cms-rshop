"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { useForm } from "@/core/hooks/common/form/useForm";
import TextInput from "@/components/ui/inputs/TextInput";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import NumberInput from "@/components/ui/inputs/NumberInput";
import {
  useCreateHomeSection,
  useUpdateHomeSection,
} from "@/core/hooks/api/adminHome/useHomeSections";
import { handleMutation } from "@/core/utils/mutationHelper";
import { feauturedSectionValidation } from "../FeaturedOffersSection/feautured-section-validation";
import { TbCategory } from "react-icons/tb";

type Props = {
  sectionId?: number;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const initialForm = {
  title: "",
  slug: "product-categories",
  description: "",
  section_type: "category_based",
  display_style: "carousel",
  products_limit: 10,
  show_view_all_button: true,
  view_all_link: "",
  is_active: true,
};

const CtegorySectionModal: React.FC<Props> = ({
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { mutateAsync: createSection, isPending: isCreating } =
    useCreateHomeSection();
  const { mutateAsync: updateSection, isPending: isUpdating } =
    useUpdateHomeSection(defaultValues?.id ?? 0);

  const { form, errors, setForm, handleFieldChange, reset, submit } = useForm(
    initialForm,
    {
      onValidate: (data: any) => feauturedSectionValidation(data),
      runValidationOnChange: true,
    }
  );

  useEffect(() => {
    if (!defaultValues) return;

    const { view_all_link, products_limit, is_active } = defaultValues;
    console.log(defaultValues);

    setForm({
      ...initialForm,
      view_all_link,
      products_limit,
      is_active,
    });
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    const { is_active, products_limit, view_all_link } = form;

    const payload: Record<string, any> = {
      is_active,
      show_view_all_button: true,
      products_limit,
      view_all_link,
    };

    console.log(payload);

    if (defaultValues?.id) {
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

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
      triggerProps={
        defaultValues?.id
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary",
            }
      }
      title={defaultValues?.id ? "ویرایش دسته بندی" : "افزودن دسته بندی"}
      confirmText={defaultValues?.id ? "ویرایش" : "ایجاد"}
      onConfirm={handleSubmit}
      icon={<TbCategory />}
      isConfirmDisabled={isCreating || isUpdating}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <NumberInput
            label="تعداد محدودیت نمایش"
            placeholder="10"
            suffix="عدد"
            min={0}
            max={30}
            value={form.products_limit}
            onChange={(limit) => handleFieldChange("products_limit", limit)}
          />
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
        </div>

        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />
      </div>
    </BaseModal>
  );
};

export default CtegorySectionModal;
