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
import ImageBoxUploader from "@/components/Helper/ImageBoxUploader";
import {
  useGetAllCategories,
  useCreateCategory,
  useCategoryImageUpload,
} from "@/hooks/categories/useCategory";
import { flattenCategories } from "@/utils/flattenCategories";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onSelected: (id: number) => void;
};

const AddNewCategoryModal = ({ isOpen, onOpenChange, onSelected }: Props) => {
  const [data, setData] = useState({
    title: "",
    slug: "",
    discount: "0",
    parentId: 0,
    mediaId: "",
  });
  const [isSelected, setIsSelected] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  //? Hooks
  const { data: categoriesData } = useGetAllCategories();
  const { mutateAsync: createCategory, isPending: isPendingCategory } =
    useCreateCategory();
  const { mutateAsync: uplaodImageCategory, isPending: isPendingUpload } =
    useCategoryImageUpload();

  const flatOptions = useMemo(() => {
    return flattenCategories(categoriesData?.data);
  }, [categoriesData?.data]);

  const isDisabled =
    !data.title.trim() ||
    (!isSelected && !data.parentId) ||
    !data.slug.trim() ||
    !imageFile ||
    isPendingUpload ||
    isPendingCategory;

  const handleCreateNewCategory = async () => {
    if (isDisabled) return;

    try {
      const formData = new FormData();
      formData.append("files", imageFile);
      const res = await uplaodImageCategory(formData);
      if (!res.ok) return;
      //
      const mediaId = res.data[0].id;
      const { discount, parentId, slug, title } = data;

      const response = await createCategory({
        mediaId,
        discount,
        parentId,
        slug,
        title,
      });
      if (!response.ok) return;
      //
      onSelected(response?.data?.id);

      setData({
        title: "",
        slug: "",
        discount: "0",
        parentId: 0,
        mediaId: "",
      });
      setImageFile(null);
      onOpenChange();
      toast.success("دسته بندی با موفقیت افزوده شد")
    } catch (error) {
      console.error("خطا:", error);
      toast.error("خطای ناشناخته. با برنامه نویس تماس بگیرید");
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
              <p className="font-normal text-[16px]">افزودن دسته بندی جدید</p>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 bg-slate-50 p-4 rounded-2xl">
                <Select
                  isRequired
                  isDisabled={isSelected}
                  labelPlacement="outside"
                  label="دسته بندی"
                  placeholder="دسته بندی را انتخاب کنید"
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
                  <span className="text-sm">دسته بندی مادر</span>
                </Checkbox>
              </div>
              {/*  */}
              <div className="flex flex-col gap-6 sm:flex-row items-center sm:gap-4">
                <Input
                  isRequired
                  label="عنوان"
                  labelPlacement="outside"
                  value={data.title}
                  placeholder="نام دسته بندی را وارد کنید"
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />

                <Input
                  isRequired
                  label="نامک"
                  labelPlacement="outside"
                  value={data.slug}
                  placeholder="slug"
                  style={{ direction: "ltr" }}
                  onChange={(e) => setData({ ...data, slug: e.target.value })}
                />
              </div>
              {/*  */}
              <NumberInput
                hideStepper
                labelPlacement="outside"
                label="تخفیف"
                placeholder="مقدار تخفیف را وارد کنید"
                minValue={0}
                endContent={<>%</>}
                onValueChange={(value) =>
                  setData({ ...data, discount: String(value) || "0" })
                }
              />
              {/*  */}
              <ImageBoxUploader
                textBtn="+ افزودن تصویر"
                title="تصویر دسته بندی"
                changeStatusFile={imageFile}
                onFile={(file) => setImageFile(file)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={isDisabled}
                className="w-full"
                variant="solid"
                color="secondary"
                isLoading={isPendingCategory || isPendingUpload}
                onPress={handleCreateNewCategory}
              >
                {isPendingCategory || isPendingUpload
                  ? "در حال ثبت…"
                  : "ثبت تغییرات"}{" "}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewCategoryModal;
