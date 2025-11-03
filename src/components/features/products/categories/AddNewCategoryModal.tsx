"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Checkbox, Input, NumberInput } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useGetAllCategories,
  useCreateCategory,
  useUpdateCategory,
  useCategoryImageUpload,
} from "@/core/hooks/api/categories/useCategory";
import { flattenCategories } from "@/core/utils/flattenCategories";
import toast from "react-hot-toast";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import SelectBox from "@/components/ui/inputs/SelectBox";
import { BiCategoryAlt } from "react-icons/bi";

type Props = {
  categoryId?: number;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const AddNewCategoryModal: React.FC<Props> = ({
  categoryId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const [data, setData] = useState({
    title: "",
    slug: "",
    discount: "0",
    parentId: 0,
    mediaId: "",
  });
  const [isSelected, setIsSelected] = useState(false);
  const [imageFile, setImageFile] = useState<File | null | string>(null);

  const { data: categoriesData } = useGetAllCategories();
  const { mutateAsync: createCategory, isPending: isPendingCategory } =
    useCreateCategory();
  const { mutateAsync: updateCategory, isPending: isPendingUpdate } =
    useUpdateCategory();
  const { mutateAsync: uploadImageCategory, isPending: isPendingUpload } =
    useCategoryImageUpload();

  useEffect(() => {
    if (!defaultValues) {
      setData({ title: "", slug: "", discount: "0", parentId: 0, mediaId: "" });
      setImageFile(null);
      setIsSelected(false);
      return;
    }
    const { discount, media, slug, title, parent_id } = defaultValues;
    setData({
      title,
      slug,
      discount,
      parentId: parent_id,
      mediaId: media?.id ?? -1,
    });
    setIsSelected(parent_id === 0);
    setImageFile(media?.url);
  }, [defaultValues]);

  const flatOptions = useMemo(
    () => flattenCategories(categoriesData?.data),
    [categoriesData?.data]
  );

  const isDisabled =
    !data.title.trim() ||
    !data.slug.trim() ||
    (!isSelected && !data.parentId) ||
    (categoryId ? false : !imageFile) ||
    isPendingUpload ||
    isPendingCategory ||
    isPendingUpdate;

  const handleSubmit = async () => {
    if (isDisabled) return;

    try {
      let mediaId = data.mediaId;
      if (typeof imageFile !== "string" && imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);
        const res = await uploadImageCategory(formData);
        if (!res.ok) return;
        mediaId = res.data[0].id;
      }

      const payload = {
        title: data.title,
        slug: data.slug,
        discount: data.discount,
        parentId: data.parentId,
        mediaId,
        id: categoryId,
      };
      const response = categoryId
        ? await updateCategory(payload)
        : await createCategory(payload);
      if (!response.ok) return;

      toast.success(
        categoryId
          ? "دسته‌بندی با موفقیت ویرایش شد"
          : "دسته‌بندی با موفقیت افزوده شد"
      );
      setData({ title: "", slug: "", discount: "0", parentId: 0, mediaId: "" });
      setImageFile(null);
      onOpenChange?.(false);
    } catch (error) {
      console.error("خطا:", error);
      toast.error("خطای ناشناخته. با برنامه‌نویس تماس بگیرید");
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerProps={
        categoryId
          ? undefined
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      title={categoryId ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
      confirmText={categoryId ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی"}
      onConfirm={handleSubmit}
      isConfirmDisabled={isDisabled}
      size="xl"
      icon={<BiCategoryAlt />}
    >
      {/* انتخاب دسته‌بندی مادر */}
      <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-2xl">
        <SelectBox
          label="دسته‌بندی والد"
          value={isSelected ? "" : String(data.parentId)}
          onChange={(val) =>
            setData((prev) => ({ ...prev, parentId: Number(val) || 0 }))
          }
          options={flatOptions.map((opt) => ({
            key: opt.id,
            title: opt.title,
          }))}
          disabled={isSelected}
          placeholder="انتخاب کنید"
        />
        <Checkbox
          isSelected={isSelected}
          onValueChange={(val) => {
            setIsSelected(val);
            if (val) setData((prev) => ({ ...prev, parentId: 0 }));
          }}
        >
          <span className="text-sm">دسته‌بندی مادر</span>
        </Checkbox>
      </div>

      {/* عنوان و اسلاگ */}
      <div className="flex flex-col gap-6 sm:flex-row items-start sm:gap-4">
        <Input
          isRequired
          label="عنوان"
          labelPlacement="outside"
          value={data.title}
          placeholder="نام دسته‌بندی"
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <SlugInput
          value={data.slug}
          onChange={(val) => setData((prev) => ({ ...prev, slug: val }))}
          isActiveError={true}
        />
      </div>

      {/* تخفیف */}
      <NumberInput
        hideStepper
        labelPlacement="outside"
        label="تخفیف"
        placeholder="مقدار تخفیف"
        minValue={0}
        maxValue={99}
        endContent={<>%</>}
        value={+data.discount}
        onValueChange={(value) =>
          setData({ ...data, discount: String(value) || "0" })
        }
      />

      {/* آپلود عکس */}
      <ImageBoxUploader
        textBtn="+ افزودن تصویر"
        title="تصویر دسته‌بندی"
        changeStatusFile={imageFile}
        defaultImg={imageFile}
        onFile={(file) => setImageFile(file)}
      />
    </BaseModal>
  );
};

export default AddNewCategoryModal;
