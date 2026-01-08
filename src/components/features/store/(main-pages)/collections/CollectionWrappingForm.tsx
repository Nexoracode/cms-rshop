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

import toast from "react-hot-toast";
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

export const initialCollectionWrappingForm = {
  name: "",
  description: "",
  price: 0,
  image_id: null,
  image: null,
  is_active: false,
  is_for_gift: true,
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

  const {setSelectedProducts} = useProductsSelection()
  const { mutateAsync: createCollection } = useCreateCollection();
  const { mutateAsync: updateCollection } = useUpdateCollection();
  const { mutateAsync: uploadImage } = useUploadSliderImages();

  const {
    form,
    errors,
    handleFieldChange,
    handleMultipleFieldsChange,
    setForm,
    submit,
  } = useForm(initialCollectionWrappingForm, {
    onValidate: collectionWrappingValidation,
    runValidationOnChange: true,
  });

  useEffect(() => {
    data && setForm(data);
  }, [data]);

  const handleSubmit = submit(async (changed) => {
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: +form.price,
      image_id: form.image_id,
      is_active: form.is_active,
      is_for_gift: form.is_for_gift,
    };
    console.log(payload);

    if (id) {
      return handleMutation(() => updateCollection(payload), {
        resetForm,
        redirect: "/admin/store/home-builder/collections" 
      });
    } else {
      return handleMutation(() => createCollection(payload), {
        resetForm,
      });
    }
  });

  const resetForm = () => {
    setForm(initialCollectionWrappingForm)
    setSelectedProducts([])
  };

  return (
    <BaseCard
      CardHeaderProps={{
        title: id ? "ویرایش مجموعه" : "ایجاد مجموعه",
        icon: <HiOutlineCollection className="w-6 h-6" />,
        showIconInActionSlot: true,
      }}
      wrapperContents
      isLoading={isLoading}
    >
      <ImageBoxUploader
        title="تصویر مجموعه"
        textBtn={"+ افزودن تصویر"}
        defaultImg={form?.image}
        onFile={async (file) => {
          const formData = new FormData();
          formData.append("files", file);
          const uploadRes = await uploadImage(formData);
          if (!uploadRes.ok) return;
          handleMultipleFieldsChange({
            image_id: uploadRes.data.id,
            image: uploadRes.data,
          });
        }}
        errorMessage={errors.image_id}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="نام مجموعه"
          placeholder="مثلاً: جعبه کادو لوکس"
          value={form.name}
          onChange={(val) => handleFieldChange("name", val)}
          isRequired
          errorMessage={errors.name}
          allowEnglishOnly={false}
        />

        <SlugInput
          value={form.slug}
          onChange={(val) => handleFieldChange("slug", val)}
          isActiveError={true}
          errorMessage={errors.slug}
        />
      </div>
      <IsoDatePicker
        label="بازه اعتبار"
        enableRange
        valueIsoRange={{ start: form.starts_at, end: form.ends_at }}
        onChangeIsoRange={(range) => {
          handleMultipleFieldsChange({
            starts_at: range?.start,
            ends_at: range?.end,
          });
        }}
        showMonthAndYearPickers
        className="w-full"
        isRequired
        errorMessage={errors.starts_at}
      />
      <Textarea
        label="توضیحات"
        placeholder="جنس، ابعاد، مناسب برای چه محصولاتی..."
        value={form.description}
        onChange={(val) => handleFieldChange("description", val)}
        isRequired
        minRows={5}
        errorMessage={errors.description}
      />
      <ToggleSection
        title="وضعیت نمایش"
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
      />
    </BaseCard>
  );
};

export default CollectionWrappingForm;
