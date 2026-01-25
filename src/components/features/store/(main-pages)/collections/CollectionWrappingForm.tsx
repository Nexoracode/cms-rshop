"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import FormActionButtons from "@/components/common/FormActionButtons";
import Textarea from "@/components/ui/inputs/Textarea";

import { useForm } from "@/core/hooks/common/form/useForm";

import {
  useCreateCollection,
  useUpdateCollection,
} from "@/core/hooks/api/adminHome/useCollections";
import { collectionWrappingValidation } from "./collection-wrapping-validation";
import { useUploadSliderImages } from "@/core/hooks/api/adminHome/useUploadSliderImages";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import IsoDatePicker from "@/components/forms/Inputs/IsoDatePicker";
import { HiOutlineCollection } from "react-icons/hi";
import ProductSelectionBox from "@/components/features/products/SelectableProduct/Product/ProductSelectionBox";
import { handleMutation } from "@/core/utils/mutationHelper";
import { useProductsSelection } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import NumberInput from "@/components/ui/inputs/NumberInput";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";

export const initialCollectionWrappingForm = {
  title: "",
  slug: "",
  description: "",
  file: null as File | null,
  image: null,
  is_active: false,
  start_date: "",
  end_date: "",
  product_ids: [] as number[],
  display_style: "",
  products_limit: 0,
};

type GiftWrappingFormProps = {
  data: any;
  id: number | null;
  isLoading: boolean;
};

const CollectionWrappingForm: React.FC<GiftWrappingFormProps> = ({
  data,
  id,
  isLoading,
}) => {
  const router = useRouter();

  const { setSelectedProducts } = useProductsSelection();
  const { mutateAsync: createCollection, isPending: isPendingCreate } =
    useCreateCollection();
  const { mutateAsync: updateCollection, isPending: isPendingUpdate } =
    useUpdateCollection();
  const { mutateAsync: uploadImage, isPending: isPendingImage } =
    useUploadSliderImages();

  const {
    form,
    errors,
    handleFieldChange,
    handleMultipleFieldsChange,
    setForm,
    reset,
    submit,
  } = useForm(initialCollectionWrappingForm, {
    onValidate: collectionWrappingValidation,
    runValidationOnChange: true,
  });

  useEffect(() => {
    data && setForm(data);
  }, [data]);

  const handleSubmit = submit(async (changed) => {
    let finalImageUrl = form.image;

    if (form.file) {
      const fd = new FormData();
      fd.append("files", form.file);

      const uploadRes = (await handleMutation(() => uploadImage(fd), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      finalImageUrl = uploadRes.data[0].url;
    }

    const {
      description,
      is_active,
      slug,
      title,
      end_date,
      product_ids,
      start_date,
    } = form;

    const payload = {
      title,
      slug,
      description,
      image: finalImageUrl,
      is_active,
      product_ids,
      start_date,
      end_date,
    };

    if (id) {
      const res = await handleMutation(() =>
        updateCollection({ data: payload, id })
      );
      res && router.push("/admin/store/home-builder/collections");
    } else {
      return handleMutation(() => createCollection(payload), {
        resetForm,
      });
    }
  });

  const resetForm = () => {
    setForm(initialCollectionWrappingForm);
    setSelectedProducts([]);
    reset();
  };

  const displayOptions: SelectOption[] = [
    { key: "carousel", title: "اسلایدر" },
    { key: "grid", title: "شبکه ای" },
    { key: "list", title: "لیستی" },
  ];

  return (
    <BaseCard
      CardHeaderProps={{
        title: id ? "ویرایش مجموعه" : "ایجاد مجموعه",
        icon: <HiOutlineCollection className="w-6 h-6" />,
        showIconInActionSlot: true,
      }}
      wrapperContents
      isLoading={isLoading}
      bodyClassName="pointer-events-none select-none opacity-90"
    >
      <ImageBoxUploader
        title="تصویر مجموعه"
        textBtn={"+ افزودن تصویر"}
        defaultImg={form?.image}
        onFile={async (file) => handleFieldChange("file", file)}
        errorMessage={errors.image}
        changeStatusFile={form.file}
      />

      <div className="flex items-center gap-2">
        <TextInput
          label="عنوان"
          placeholder="عنوان بخش را وارد کنید"
          value={form.title}
          errorMessage={errors.title}
          isRequired
          onChange={(val) => handleFieldChange("title", val)}
          allowEnglishOnly={false}
        />
        <SelectBox
          label="نوع نمایش محصولات"
          value={form.display_style}
          onChange={(val) => handleFieldChange("display_style", val)}
          options={displayOptions}
          placeholder="انتخاب نوع نمایش"
          isRequired
          errorMessage={errors.display_style}
        />
      </div>

      <div className="flex items-center gap-2">
        <SlugInput
          value={form.slug}
          onChange={(val) => handleFieldChange("slug", val)}
          isActiveError={true}
          isRequired
          errorMessage={errors.slug}
        />
        <TextInput
          label="نمایش لینک"
          value={`collections/${form.slug}`}
          allowSpecialChars
          allowedSpecialChars={["/", "-"]}
          onChange={() => {}}
          inputAlign="left"
          readOnly
          errorMessage={errors.slug}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <NumberInput
          label="تعداد محدودیت نمایش"
          placeholder="10"
          suffix="عدد"
          min={0}
          max={30}
          value={form.products_limit}
          onChange={(limit) => handleFieldChange("products_limit", limit)}
          isRequired
          errorMessage={errors.products_limit}
        />

        <IsoDatePicker
          label="بازه اعتبار"
          enableRange
          valueIsoRange={{ start: form.start_date, end: form.end_date }}
          onChangeIsoRange={(range) => {
            handleMultipleFieldsChange({
              start_date: range?.start ?? "",
              end_date: range?.end ?? "",
            });
          }}
          showMonthAndYearPickers
          className="w-full"
          isRequired
          errorMessage={errors.date}
        />
      </div>

      <Textarea
        label="توضیحات"
        isRequired
        value={form.description}
        onChange={(val) => handleFieldChange("description", val)}
        placeholder="توضیحات را وارد کنید"
        errorMessage={errors.description}
      />

      <ToggleSection
        title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
        initialMode={form.is_active}
        onChange={(val) => handleFieldChange("is_active", val)}
      />

      <ProductSelectionBox
        onChange={(items) => {
          const productIds = items.map((item) => item.product_id);
          handleFieldChange("product_ids", productIds);
        }}
        error={!!errors.product_ids}
      />

      <FormActionButtons
        cancelHref="/admin/gift-wrappings"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isSubmitting={isPendingCreate || isPendingUpdate || isPendingImage}
      />
    </BaseCard>
  );
};

export default CollectionWrappingForm;
