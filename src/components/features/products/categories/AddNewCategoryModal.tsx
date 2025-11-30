"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Checkbox, NumberInput } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useGetAllCategories,
  useCreateCategory,
  useUpdateCategory,
  useCategoryImageUpload,
} from "@/core/hooks/api/categories/useCategory";
import { flattenCategories } from "@/core/utils/flattenCategories";
import { useFormHandler } from "@/core/hooks/common/useFormHandler";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import SelectBox from "@/components/ui/inputs/SelectBox";
import { BiCategoryAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { validateCategory } from "./category-validation";
import TextInput from "@/components/ui/inputs/TextInput";
import FieldErrorText from "@/components/forms/FieldErrorText";

const initialCategoryForm = {
  title: "",
  slug: "",
  discount: "0",
  parentId: 0,
  mediaId: "",
  mediaFile: null,
};

const AddNewCategoryModal = ({
  categoryId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const [isParent, setIsParent] = useState(true);

  const { data: categoriesData } = useGetAllCategories();
  const { mutateAsync: createCategory, isPending: isCreating } =
    useCreateCategory();
  const { mutateAsync: updateCategory, isPending: isUpdating } =
    useUpdateCategory();
  const { mutateAsync: uploadImageCategory, isPending: isUploading } =
    useCategoryImageUpload();

  const {
    form,
    errors,
    setForm,
    handleFieldChange,
    handleMultipleFieldsChange,
    canSubmit,
  } = useFormHandler(initialCategoryForm, {
    onValidate: validateCategory,
    runValidationOnChange: true,
  });

  useEffect(() => {
    if (!defaultValues) {
      setForm(initialCategoryForm);
      setIsParent(true);
      return;
    }

    const { discount, media, slug, title, parent_id } = defaultValues;

    setForm({
      title,
      slug,
      discount,
      parentId: parent_id,
      mediaId: media?.id ?? "",
      mediaFile: null,
    });

    setIsParent(parent_id === 0);
  }, [defaultValues]);

  const flatOptions = useMemo(
    () => flattenCategories(categoriesData?.data),
    [categoriesData?.data]
  );

  const handleSubmit = async () => {
    if (!canSubmit()) return;

    try {
      let finalMediaId = form.mediaId;

      if (form.mediaFile) {
        const fd = new FormData();
        fd.append("files", form.mediaFile);
        const res = await uploadImageCategory(fd);
        if (!res.ok) return;
        finalMediaId = res.data[0].id;
      }

      const payload = {
        id: categoryId,
        title: form.title,
        slug: form.slug,
        discount: form.discount,
        parentId: form.parentId,
        mediaId: finalMediaId,
      };

      const res = categoryId
        ? await updateCategory(payload)
        : await createCategory(payload);

      if (!res.ok) return;

      toast.success(
        categoryId
          ? "دسته‌بندی با موفقیت ویرایش شد"
          : "دسته‌بندی با موفقیت افزوده شد"
      );

      setForm(initialCategoryForm);
      setIsParent(false);
      onOpenChange?.(false);
    } catch (err) {
      console.error(err);
      toast.error("خطای ناشناخته. با برنامه‌نویس تماس بگیرید");
    }
  };

  console.log(errors);

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerProps={
        categoryId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      title={categoryId ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
      confirmText={categoryId ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی"}
      onConfirm={handleSubmit}
      isConfirmDisabled={isCreating || isUpdating || isUploading}
      size="xl"
      icon={<BiCategoryAlt />}
    >
      <div className="flex flex-col gap-6">

        <div>
          <div
            className={`flex flex-col gap-4 p-4 border-1.5 rounded-2xl ${
              errors?.parentId?.length
                ? "border border-red-300"
                : "border-slate-300"
            }`}
          >
            <SelectBox
              label="دسته‌بندی والد"
              value={isParent ? "" : String(form.parentId)}
              disabled={isParent}
              onChange={(val) =>
                handleFieldChange("parentId", Number(val) || 0)
              }
              options={flatOptions.map((opt) => ({
                key: opt.id,
                title: opt.title,
              }))}
              placeholder="انتخاب کنید"
            />
            <Checkbox
              isSelected={isParent}
              onValueChange={(val) => {
                setIsParent(val);
                if (!val) {
                  setForm((prev) => ({ ...prev, parentId: -1 }));
                }
                if (val) handleFieldChange("parentId", 0);
              }}
            >
              <span className="text-sm">دسته‌بندی مادر</span>
            </Checkbox>
          </div>
          <div className="mt-2">
            {errors.parentId ? <FieldErrorText error={errors.parentId} /> : ""}
          </div>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row items-start sm:gap-4">
          <TextInput
            label="عنوان"
            placeholder="عنوان دسته بندی را وارد کنید"
            value={form.title}
            errorMessage={errors.title}
            isRequired
            onChange={(val) => handleFieldChange("title", val)}
          />

          <SlugInput
            value={form.slug}
            onChange={(val) => handleFieldChange("slug", val)}
            isActiveError={true}
            errorMessage={errors.slug}
          />
        </div>

        <NumberInput
          label="تخفیف"
          labelPlacement="outside"
          hideStepper
          minValue={0}
          maxValue={99}
          endContent={<>%</>}
          value={+form.discount}
          onValueChange={(val) =>
            handleFieldChange("discount", String(val) || "0")
          }
        />

        <ImageBoxUploader
          changeStatusFile={form.mediaFile}
          defaultImg={form.mediaId ? form.mediaId : null}
          onFile={(file) =>
            handleMultipleFieldsChange({
              mediaFile: file,
              mediaId: typeof file === "string" ? file : "",
            })
          }
        />
      </div>
    </BaseModal>
  );
};

export default AddNewCategoryModal;
