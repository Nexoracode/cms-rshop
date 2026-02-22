"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import { useForm } from "@/core/hooks/common/form/useForm";
import { handleMutation } from "@/core/utils/mutationHelper";
import { faqcatFormValidation } from "./faqcat-form-validate";
import TextInput from "@/components/ui/inputs/TextInput";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import {
  useCreateFaqCategory,
  useUpdateFaqCategory,
} from "@/core/hooks/api/faq/useFaqCat";
import { TbFolderQuestion } from "react-icons/tb";
import SelectableIconsBox from "../../icons/SelectableIconBox/SelectableIconsBox";

type Props = {
  iconId?: number | null;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialCategoryForm = {
  name: "",
  svg: "",
  icon_id: null as number | null,
  is_active: true,
};

const FaqCatFormModal: React.FC<Props> = ({
  iconId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialCategoryForm,
    {
      onValidate: faqcatFormValidation,
      runValidationOnChange: true,
    },
  );

  const { mutateAsync: updateCategory } = useUpdateFaqCategory();
  const { mutateAsync: createCategory } = useCreateFaqCategory();

  useEffect(() => {
    setFormHandler();
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    const { name, svg } = form;
    if (iconId)
      return handleMutation(
        () => updateCategory({ id: iconId, data: { name, svg } }),
        {
          resetForm,
        },
      );
    else
      return handleMutation(() => createCategory({ name, svg } as any), {
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
        iconId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      onCancel={() => {
        !iconId ? resetForm() : setFormHandler();
      }}
      title={iconId ? "ویرایش دسته بندی" : "افزودن دسته بندی"}
      confirmText={iconId ? "ویرایش دسته بندی" : "ایجاد دسته بندی"}
      onConfirm={handleSubmit}
      icon={<TbFolderQuestion />}
    >
      <div className="flex flex-col gap-6">
        <TextInput
          label="نام"
          placeholder="نام دسته بندی را وارد کنید"
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

        <SelectableIconsBox
          onChange={(ids) => handleFieldChange("icon_id", ids[0] || null)}
          classNameIconsWrapper="grid-cols-1 xs:!grid-cols-2 md:!grid-cols-3"
        />
      </div>
    </BaseModal>
  );
};

export default FaqCatFormModal;
