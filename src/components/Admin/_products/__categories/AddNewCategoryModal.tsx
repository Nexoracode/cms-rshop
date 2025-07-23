"use client";

import { useState } from "react";
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
  Spinner,
} from "@heroui/react";
import ImageBoxUploader from "@/components/Helper/ImageBoxUploader";
import {
  useGetAllCategories,
  useCreateCategory,
} from "@/hooks/categories/useCategory";
import { fetcher } from "@/utils/fetcher";
import { CategoryData } from "./category-types";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const AddNewCategoryModal = ({ isOpen, onOpenChange }: Props) => {
  const [data, setData] = useState<CategoryData>({
    title: "",
    slug: "",
    discount: "0",
    parentId: 0,
    mediaId: "",
  });
  const [isSelected, setIsSelected] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: categoriesData } = useGetAllCategories();
  const { mutate: createCategory, isPending } = useCreateCategory();

  const isDisabled =
    !data.title.trim() || !data.slug.trim() || !imageFile || isPending;

  const handleCreateNewCategory = async () => {
    if (isDisabled) return;

    const formData = new FormData();
    formData.append("files", imageFile);

    const res = await fetcher({
      route: "/category/upload",
      body: formData,
      isActiveToast: true,
      method: "POST",
      loadingText: "در حال آپلود تصویر...",
      successText: "تصویر با موفقیت آپلود شد",
    });

    console.log(res?.data);

    if (res.ok) {
      const mediaId = res.data[0].id;
      const { discount, parentId, slug, title } = data;

      createCategory(
        {
          mediaId,
          discount,
          parentId,
          slug,
          title
        },
        {
          onSuccess: () => {
            setData({
              title: "",
              slug: "",
              discount: "0",
              parentId: 0,
              mediaId: "",
            });
            setImageFile(null);
            onOpenChange();
          },
        }
      );
    }
  };

  return (
    <Modal
      dir="rtl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
    >
      <ModalContent className="max-w-[700px] w-full">
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
                  onChange={(value) => setData({ ...data, parentId: +value })}
                >
                  {categoriesData?.data?.length ? (
                    categoriesData.data.map((cat: CategoryData) => (
                      <SelectItem key={cat._id}>{cat.title}</SelectItem>
                    ))
                  ) : (
                    <SelectItem isDisabled>دسته بندی موجود نیست</SelectItem>
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
                  label="عنوان دسته بندی"
                  labelPlacement="outside"
                  value={data.title}
                  placeholder="نام دسته بندی را وارد کنید"
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                />

                <Input
                  isRequired
                  label="عنوان انگلیسی دسته بندی"
                  labelPlacement="outside"
                  value={data.slug}
                  placeholder="slug"
                  style={{ direction: "ltr" }}
                  onChange={(e) => setData({ ...data, slug: e.target.value })}
                />
              </div>
              {/*  */}
              <NumberInput
                labelPlacement="outside"
                label="تخفیف"
                placeholder="مقدار تخفیف را وارد کنید"
                minValue={0}
                endContent={<p>%</p>}
                onValueChange={value =>
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
                isLoading={isPending}
                onPress={handleCreateNewCategory}
              >
                {isPending ? "" : <span>ثبت تغیرات</span>}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewCategoryModal;
