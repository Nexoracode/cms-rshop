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
import { LuPercent } from "react-icons/lu";

type Props = {
  sectionId?: number;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const initialForm = {
  title: "",
  slug: "featured-products",
  description: "",
  section_type: "featured",
  display_style: "carousel",
  products_limit: 10,
  show_view_all_button: false,
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
  //
  const [showLink, setShowLink] = useState<boolean>(false);

  const { form, errors, setForm, handleFieldChange, reset, submit } = useForm(
    initialForm,
    {
      onValidate: (data: any) => feauturedSectionValidation(data, showLink),
      runValidationOnChange: true,
    }
  );

  useEffect(() => {
    if (!defaultValues) return;

    const { show_view_all_button, view_all_link, products } = defaultValues;
    
    setForm({
      ...initialForm,
      show_view_all_button,
      view_all_link,
      products_limit: products.length ?? 10,
    });
  }, [defaultValues]);

  useEffect(() => {
    if (form) {
      if (form.show_view_all_button) {
        setShowLink(true);
      }
    }
  }, [isOpen]);

  const handleSubmit = submit(async () => {
    const payload: Record<string, any> = {
      ...form,
    };

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
    setShowLink(false);
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
      title={defaultValues?.id ? "ویرایش پیشنهاد" : "افزودن پیشنهاد"}
      confirmText={defaultValues?.id ? "ویرایش پیشنهاد" : "ایجاد پیشنهاد"}
      onConfirm={handleSubmit}
      icon={<LuPercent />}
      isConfirmDisabled={isCreating || isUpdating}
    >
      <div className="flex flex-col gap-4">
        <NumberInput
          label="تعداد محدودیت نمایش"
          placeholder="10"
          suffix="عدد"
          min={0}
          max={30}
          value={form.products_limit}
          onChange={(limit) => handleFieldChange("products_limit", limit)}
        />

        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />

        <ToggleSection
          title={"نمایش لینک"}
          initialMode={showLink}
          onChange={(val) => {
            handleFieldChange("show_view_all_button", val);
            setShowLink(val);
          }}
        >
          <TextInput
            label=""
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
        </ToggleSection>
      </div>
    </BaseModal>
  );
};

export default CtegorySectionModal;
