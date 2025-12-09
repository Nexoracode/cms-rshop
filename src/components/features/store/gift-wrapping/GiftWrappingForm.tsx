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

import { mapAPIToLocalGiftWrapping } from "./helpers/gift-wrapping-helpers";
import { giftWrappingValidation } from "./helpers/gift-wrapping-validation";
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
  isLoading: boolean
};

const GiftWrappingForm: React.FC<GiftWrappingFormProps> = ({ data, id, isLoading }) => {
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
    data && setForm(mapAPIToLocalGiftWrapping(data));
  }, [data]);

  const handleSubmit = submit(async () => {
    try {
      let finalImageId = form.image_id;

      if (form.image_file) {
        const fd = new FormData();
        fd.append("files", form.image_file);
        const res = await uploadImage(fd);
        if (!res.ok || !res.data?.[0]?.id) {
          toast.error("آپلود تصویر ناموفق بود");
          return;
        }
        finalImageId = res.data[0].id;
      }

      if (!finalImageId) {
        toast.error("انتخاب تصویر الزامی است");
        return;
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: +form.price,
        image_id: finalImageId,
        status: form.status, // "active" یا "disable" — دقیقاً همون چیزی که خودت نوشتی
        is_for_gift: form.is_for_gift,
        discount_type: form.discount_value > 0 ? form.discount_type : null,
        discount_value: form.discount_value > 0 ? form.discount_value : null,
      };

      const result = id
        ? await updateGift(payload)
        : await createGift(payload);

      if (result.ok) {
        toast.success(id ? "بسته‌بندی بروزرسانی شد" : "بسته‌بندی ایجاد شد");
        router.push("/admin/gift-wrappings");
      }
    } catch (err) {
      toast.error("خطایی رخ داد");
    }
  });

  if (isLoading)
    return <div className="text-center py-10">در حال بارگذاری...</div>;

  return (
    <BaseCard
      CardHeaderProps={{
        title: id ? "ویرایش بسته‌بندی" : "ایجاد بسته‌بندی",
        icon: <FiGift className="w-6 h-6" />,
        showIconInActionSlot: true,
      }}
      wrapperContents
    >
      <ImageBoxUploader
        title="تصویر بسته‌بندی"
        textBtn={
          form.image_file || form.image_id ? "تغییر تصویر" : "+ افزودن تصویر"
        }
        defaultImg={form.image_id ? `/uploads/${form.image_id}` : undefined}
        onFile={(file) => {
          handleMultipleFieldsChange({
            image_file: file as File,
            image_id: null,
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
          initialMode={form.status === "active" ? "enabled" : "disabled"}
          onChange={(val) =>
            handleFieldChange(
              "status",
              val === "enabled" ? "active" : "disable"
            )
          }
        />

        <ToggleSection
          title="مخصوص هدیه"
          initialMode={form.is_for_gift ? "enabled" : "disabled"}
          onChange={(val) =>
            handleFieldChange("is_for_gift", val === "enabled")
          }
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
      />
    </BaseCard>
  );
};

export default GiftWrappingForm;
