"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { useForm } from "@/core/hooks/common/form/useForm";
import { handleMutation } from "@/core/utils/mutationHelper";
import TextInput from "@/components/ui/inputs/TextInput";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import {
  useCreateFaqCategory,
  useUpdateFaqCategory,
} from "@/core/hooks/api/faq/useFaqCat";
import { faqFormValidation } from "./faq-form-validate";
import { LuMessageCircleQuestion } from "react-icons/lu";

type Props = {
  faqcatId?: number | null;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialFaqForm = {
  name: "",
  icon_id: null as number | null,
  is_active: true,
};

const FaqFormModal: React.FC<Props> = ({
  faqcatId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialFaqForm,
    {
      onValidate: faqFormValidation,
      runValidationOnChange: true,
    },
  );

  const { mutateAsync: updateCategory } = useUpdateFaqCategory();
  const { mutateAsync: createCategory } = useCreateFaqCategory();

  useEffect(() => {
    setFormHandler();
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    const { name, icon_id, is_active } = form;

    const data = {
      name,
      icon_id,
      is_active,
    };

    if (faqcatId)
      return handleMutation(() => updateCategory({ id: faqcatId, data }), {
        resetForm,
      });
    else
      return handleMutation(() => createCategory(data as any), {
        resetForm,
      });
  });

  const resetForm = () => reset();

  const setFormHandler = () => {
    if (defaultValues) {
      setForm(defaultValues);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange?.(val);
      }}
      triggerProps={
        faqcatId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      onCancel={() => {
        !faqcatId ? resetForm() : setFormHandler();
      }}
      title={faqcatId ? "ویرایش سوال" : "افزودن سوال"}
      confirmText={faqcatId ? "ویرایش سوال" : "ایجاد سوال"}
      onConfirm={handleSubmit}
      icon={<LuMessageCircleQuestion />}
    >
      <div className="flex flex-col gap-6">
        <TextInput
          label="عنوان"
          placeholder="عنوان سوال را وارد کنید"
          value={form.name}
          onChange={(name) => {
            handleFieldChange("name", name);
          }}
          isRequired
          inputAlign="right"
          allowEnglishOnly={false}
          errorMessage={errors.name}
        />
        <ToggleSection
          title={`وضعیت ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />
      </div>
    </BaseModal>
  );
};

export default FaqFormModal;
