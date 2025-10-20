"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  ModalFooter,
  NumberInput,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useGetAllCategories,
  useCreateCategory,
  useCategoryImageUpload,
  useUpdateCategory,
} from "@/hooks/api/categories/useCategory";
import { flattenCategories } from "@/utils/flattenCategories";
import toast from "react-hot-toast";
import HeaderNavigator from "../HeaderNavigator";
import { TbCategoryPlus } from "react-icons/tb";
import SlugInput from "@/components/forms/Inputs/SlugInput";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  defaultValues?: any;
  categoryId?: number;
};

const AddNewCategoryModal = ({
  isOpen,
  onOpenChange,
  defaultValues,
  categoryId,
}: Props) => {
  const [data, setData] = useState({
    title: "",
    slug: "",
    discount: "0",
    parentId: 0,
    mediaId: "",
  });
  const [isSelected, setIsSelected] = useState(false);
  const [imageFile, setImageFile] = useState<File | null | string>(null);

  //? Hooks
  const { data: categoriesData } = useGetAllCategories();
  const { mutateAsync: createCategory, isPending: isPendingCategory } =
    useCreateCategory();
  const { mutateAsync: updateCategory, isPending: isPendingUpdate } =
    useUpdateCategory();
  const { mutateAsync: uploadImageCategory, isPending: isPendingUpload } =
    useCategoryImageUpload();

  useEffect(() => {
    if (!defaultValues) {
      setData({
        title: "",
        slug: "",
        discount: "0",
        parentId: 0,
        mediaId: "",
      });
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

  const flatOptions = useMemo(() => {
    return flattenCategories(categoriesData?.data);
  }, [categoriesData?.data]);

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
        console.log("FFF");
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

      setData({
        title: "",
        slug: "",
        discount: "0",
        parentId: 0,
        mediaId: "",
      });
      setImageFile(null);
      onOpenChange();
    } catch (error) {
      console.error("خطا:", error);
      toast.error("خطای ناشناخته. با برنامه‌نویس تماس بگیرید");
    }
  };

  return (
    <Modal
      dir="rtl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
      isDismissable={false}
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <HeaderNavigator
                navigateTitle="دسته‌بندی"
                title={
                  categoryId ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"
                }
                navigateTo="/admin/products/categories"
                icon={<TbCategoryPlus className="text-2xl" />}
              />
            </ModalHeader>
            <ModalBody className="flex flex-col gap-6">
              {/* انتخاب دسته‌بندی مادر/فرزند */}
              <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-2xl">
                <Select
                  isDisabled={isSelected}
                  labelPlacement="outside"
                  label="دسته‌بندی والد"
                  placeholder="انتخاب کنید"
                  selectedKeys={
                    data.parentId && !isSelected
                      ? new Set([String(data.parentId)])
                      : new Set()
                  }
                  onSelectionChange={(keys) => {
                    const key = Array.from(keys)[0];
                    if (key === undefined) {
                      setData((prev) => ({ ...prev, parentId: 0 }));
                    } else {
                      setData((prev) => ({ ...prev, parentId: Number(key) }));
                    }
                  }}
                >
                  {categoriesData?.data && categoriesData.data.length ? (
                    flatOptions.map((opt) => (
                      <SelectItem key={opt.id}>{opt.title}</SelectItem>
                    ))
                  ) : (
                    <SelectItem key="-1" isDisabled>
                      دسته‌بندی وجود ندارد
                    </SelectItem>
                  )}
                </Select>
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
                  onChange={(val) =>
                    setData((prev: any) => ({
                      ...prev,
                      slug: val,
                    }))
                  }
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
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={isDisabled}
                className="w-full"
                variant="flat"
                color="secondary"
                isLoading={
                  isPendingCategory || isPendingUpload || isPendingUpdate
                }
                onPress={handleSubmit}
              >
                {categoryId
                  ? isPendingUpdate
                    ? "در حال ویرایش…"
                    : "ویرایش دسته‌بندی"
                  : isPendingCategory || isPendingUpload
                  ? "در حال ثبت…"
                  : "ایجاد دسته‌بندی"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewCategoryModal;
