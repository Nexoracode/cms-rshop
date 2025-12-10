"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import ToggleSection from "@/components/shared/ToggleSection";
import FormActionButtons from "@/components/common/FormActionButtons";
import Textarea from "@/components/ui/inputs/Textarea";
import DiscountedPriceInput from "@/components/forms/Inputs/DiscountedPriceInput";

import { useForm } from "@/core/hooks/common/form/useForm";
import {
  useCreateGiftWrapping,
  useUpdateGiftWrapping,
  useUploadGiftWrappingImages,
} from "@/core/hooks/api/useGiftWrapping";

import { giftWrappingValidation } from "./gift-wrapping-validation";
import toast from "react-hot-toast";
import { FiGift } from "react-icons/fi";

export const initialGiftWrappingForm: any = {
  name: "",
  description: "",
  price: 0,
  discount_type: "amount",
  discount_value: 0,
  image_id: null,
  image_file: null,
  status: "active",
  is_for_gift: true,
};

type GiftWrappingFormProps = {
  data: any;
  id: number | null;
  isLoading: boolean;
};

const GiftWrappingForm: React.FC<GiftWrappingFormProps> = ({
  data,
  id,
  isLoading,
}) => {
  const router = useRouter();

  const { mutateAsync: createGift } = useCreateGiftWrapping();
  const { mutateAsync: updateGift } = useUpdateGiftWrapping(id);
  const { mutateAsync: uploadImage } = useUploadGiftWrappingImages();

  const {
    form,
    errors,
    handleFieldChange,
    handleMultipleFieldsChange,
    setForm,
    submit,
  } = useForm(initialGiftWrappingForm, {
    onValidate: giftWrappingValidation,
    runValidationOnChange: true,
  });

  useEffect(() => {
    data && setForm(data);
  }, [data]);

  const handleSubmit = submit(async () => {
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: +form.price,
        image_id: form.image_id,
        status: form.status,
        is_for_gift: form.is_for_gift,
        discount_type: form.discount_type,
        discount_value: form.discount_value,
      };

      const result = id ? await updateGift(payload) : await createGift(payload);
      result.ok && router.push("/admin/store/gift-wrapping");
    } catch (err) {
      toast.error("خطایی رخ داد");
    }
  });

  return (
    <BaseCard
      CardHeaderProps={{
        title: id ? "ویرایش بسته‌بندی" : "ایجاد بسته‌بندی",
        icon: <FiGift className="w-6 h-6" />,
        showIconInActionSlot: true,
      }}
      wrapperContents
      isLoading={isLoading}
    >
      <ImageBoxUploader
        title="تصویر بسته‌بندی"
        textBtn={
          form.image_file || form.image_id ? "تغییر تصویر" : "+ افزودن تصویر"
        }
        defaultImg={form?.image?.url}
        onFile={async (file) => {
          const formData = new FormData();
          formData.append("files", file);
          const uploadRes = await uploadImage(formData);
          if (!uploadRes.ok) return;
          handleMultipleFieldsChange({
            image_id: uploadRes.data.id,
            image: uploadRes.data.url,
          });
        }}
        errorMessage={errors.image_id}
      />
      <TextInput
        label="نام بسته‌بندی"
        placeholder="مثلاً: جعبه کادو لوکس"
        value={form.name}
        onChange={(val) => handleFieldChange("name", val)}
        isRequired
        errorMessage={errors.name}
      />

      <DiscountedPriceInput
        price={form.price}
        discount_amount={
          form.discount_type === "amount" ? form.discount_value : 0
        }
        discount_percent={
          form.discount_type === "percent" ? form.discount_value : 0
        }
        onPriceChange={(price) => handleFieldChange("price", +price)}
        onDiscountChange={(type, value) => {
          handleMultipleFieldsChange({
            discount_type: type,
            discount_value: +value || 0,
          });
        }}
        errorMessage={errors.price || errors.discount_value}
      />

      <div className="w-full flex items-center gap-4">
        <ToggleSection
          title="وضعیت"
          subtitle="فعال یا غیرفعال"
          initialMode={form.status === "active" ? true : false}
          onChange={(val) =>
            handleFieldChange("status", val ? "active" : "inactive")
          }
        />

        <ToggleSection
          title="مخصوص هدیه"
          subtitle="بسته بندی مخصوص هدیه است؟"
          initialMode={form.is_for_gift}
          onChange={(val) => handleFieldChange("is_for_gift", val)}
        />
      </div>

      <Textarea
        label="توضیحات"
        placeholder="جنس، ابعاد، مناسب برای چه محصولاتی..."
        value={form.description}
        onChange={(val) => handleFieldChange("description", val)}
        isRequired
        minRows={5}
        errorMessage={errors.description}
      />

      <FormActionButtons
        cancelHref="/admin/gift-wrappings"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </BaseCard>
  );
};

export default GiftWrappingForm;
