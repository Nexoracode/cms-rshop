"use client";

import TextEditor from "@/components/forms/TextEditor";
import BaseCard from "@/components/ui/BaseCard";
import { useForm } from "@/core/hooks/common/form/useForm";
import { useEffect } from "react";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { storeFormValidation } from "./store-form-validate";

type StorePageFormProps = {
  initialData: any;
  type: "";
  isLoading: boolean;
};

const initialStoreForm = {
    type: "",
    title: "",
    content: "",
    meta_title: "",
    meta_description: "",
    is_active: true
}

const StorePageForm: React.FC<StorePageFormProps> = ({
  initialData,
  type,
  isLoading,
}) => {
  const {
    form,
    errors,
    handleFieldChange,
    setForm,
    handleMultipleFieldsChange,
    submit,
    getChangedFields,
  } = useForm(initialStoreForm, {
    onValidate: storeFormValidation,
    runValidationOnChange: true,
  });

  useEffect(() => {
    initialData && setForm(initialData);
  }, [initialData]);

  return (
    <BaseCard
      CardHeaderProps={{
        title: "",
        icon: <TfiShoppingCartFull />,
        showIconInActionSlot: true,
      }}
      wrapperContents
      isLoading={isLoading}
    >
      <TextEditor
        value={form.content ?? ""}
        onChange={(content) => handleFieldChange("content", content)}
        label="توضیحات"
        errorMessage={errors.content}
      />
    </BaseCard>
  );
};

export default StorePageForm;
