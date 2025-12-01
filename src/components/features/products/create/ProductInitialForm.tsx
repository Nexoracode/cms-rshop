"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { NumberInput } from "@heroui/react";
//? Components
import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import DiscountedPriceInput from "@/components/forms/Inputs/DiscountedPriceInput";
import NumberWithSelect from "@/components/forms/Inputs/NumberWithSelect";
import FormActionButtons from "@/components/common/FormActionButtons";
import ShippingModeSwitcher from "./helpers/ShippingModeSwitcher";
import OrderLimitSwitcher from "./helpers/OrderLimitSwitcher";
import ImagesProducts from "./ImagesProducts";
import SizeGuide from "./SizeGuide/SizeGuide";
import BrandSelect from "../brands/BrandSelect";
import CategorySelect from "../categories/CategorySelect";
const TextEditor = dynamic(() => import("@/components/forms/TextEditor"), {
  ssr: false,
});
//? Icons
import { LuScrollText } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
//? Hooks
import {
  useGetOneProduct,
  useProductCreate,
  useProductUpdate,
} from "@/core/hooks/api/products/useProduct";
import { useForm } from "@/core/hooks/common/form/useForm";
import { validateProduct } from "./product-validation";
import { CreateProductRequest } from "./types/product";
import { mapAPIToLocalProduct } from "./product-helpers";

const initialProductForm: CreateProductRequest = {
  name: "",
  price: 10000,
  stock: 0,
  is_limited_stock: false,
  category_id: 0,
  discount_amount: 0,
  discount_percent: 0,
  is_featured: false,
  weight: 0,
  weight_unit: "کیلوگرم",
  is_same_day_shipping: false,
  requires_preparation: false,
  preparation_days: 0,
  description: "",
  order_limit: 0,
  is_visible: false,
  media_ids: [],
  media_pinned_id: null,
  helper_id: 0,
  brand_id: 0,
};

const ProductInitialForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit_id");
  //? Hooks
  const { mutate: createProduct } = useProductCreate();
  const { data: oneProduct } = useGetOneProduct(editId ? +editId : undefined);
  const { mutate: updateProduct } = useProductUpdate(
    editId ? +editId : undefined
  );

  const {
    form,
    errors,
    handleFieldChange,
    canSubmit,
    setForm,
    handleMultipleFieldsChange,
  } = useForm(initialProductForm, {
    onValidate: validateProduct,
    runValidationOnChange: true,
  });

  useEffect(() => {
    if (oneProduct?.data) {
      setForm(mapAPIToLocalProduct(oneProduct.data));
    }
  }, [oneProduct?.data]);

  const handleChangeProduct = () => {
    console.log(form);
    if (!canSubmit()) return;

    const {
      brand_id,
      category_id,
      discount_amount,
      discount_percent,
      helper_id,
      media_pinned_id,
      order_limit,
      price,
      weight,
      stock,
      ...other
    } = form;

    const result: any = {
      discount_percent: (discount_percent && +discount_percent) || 0,
      discount_amount: (discount_amount && +discount_amount) || 0,
      ...(helper_id ? { helper_id: +helper_id } : {}),
      ...(brand_id ? { brand_id: +brand_id } : {}),
      media_pinned_id,
      category_id: +category_id,
      order_limit: +order_limit,
      weight: +weight,
      price: +price,
      stock: +stock,
      ...other,
    };

    if (!editId) {
      createProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            router.push("/admin/products");
          }
        },
      });
    } else {
      updateProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            router.push("/admin/products");
          }
        },
      });
    }
  };

  return (
    <>
      <BaseCard
        CardHeaderProps={{
          title: "اطلاعات کلیدی محصول",
          icon: <LuScrollText />,
          showIconInActionSlot: true,
        }}
        wrapperContents
      >
        <ImagesProducts
          onMedia_ids={(datas) => {
            handleFieldChange("media_ids", datas);
          }}
          onMedia_pinned_id={(id) => {
            handleFieldChange("media_pinned_id", id);
          }}
          initialMedias={oneProduct?.data?.medias || []}
          initialPinnedId={form.media_pinned_id}
          errorMessage={errors.media_ids || errors.media_pinned_id}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <TextInput
            label="نام"
            placeholder="نام محصول را وارد کنید"
            value={form.name}
            onChange={(name) => handleFieldChange("name", name)}
            isRequired
            inputAlign="right"
            allowEnglishOnly={false}
            errorMessage={errors.name}
          />

          <NumberWithSelect
            isRequired
            label="وزن"
            value={form.weight}
            onValueChange={(val) => handleFieldChange("weight", val ?? 0)}
            selectedKey={form.weight_unit}
            onSelectChange={(val) => handleFieldChange("weight_unit", val)}
            options={[
              { key: "گرم", title: "گرم" },
              { key: "کیلوگرم", title: "کیلوگرم" },
            ]}
            errorMessage={errors.weight}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <CategorySelect
            value={form.category_id}
            onChange={(val) => handleFieldChange("category_id", Number(val))}
            withAddModal
            errorMessage={errors.category_id}
            isRequired
          />

          <BrandSelect
            value={form.brand_id}
            onChange={(val) => handleFieldChange("brand_id", Number(val))}
            withAddModal
            errorMessage={errors.brand_id}
            isRequired
          />
        </div>

        <DiscountedPriceInput
          price={form.price}
          discount_amount={form.discount_amount ?? 0}
          discount_percent={form.discount_percent ?? 0}
          onPriceChange={(price) => handleFieldChange("price", +price)}
          onDiscountChange={(type, value) =>
            handleFieldChange(
              type === "amount" ? "discount_amount" : "discount_percent",
              +value
            )
          }
          errorMessage={errors.price}
        />

        <TextEditor
          value={form.description ?? ""}
          onChange={(content) => handleFieldChange("description", content)}
          label="توضیحات"
          errorMessage={errors.description}
        />
      </BaseCard>

      <BaseCard
        CardHeaderProps={{
          title: "اطلاعات تکمیلی محصول",
          icon: <FiShoppingBag />,
          showIconInActionSlot: true,
        }}
      >
        <ShippingModeSwitcher
          defaultMood={form.requires_preparation ? "mood2" : "mood1"}
          onChangeType={(type) => {
            handleMultipleFieldsChange({
              requires_preparation: type === "mood2",
              preparation_days:
                type === "mood2" ? form.preparation_days || 1 : 0,
              is_same_day_shipping: type !== "mood2",
            });
          }}
          textMood1="محصول نیاز به زمان آماده‌ سازی دارد"
          textMood2="می‌خواهم محصول “ارسال امروز” داشته باشد."
          childrenMood1={
            <NumberInput
              hideStepper
              placeholder="3"
              minValue={1}
              value={form.preparation_days ?? 0}
              onValueChange={(val) =>
                handleFieldChange("preparation_days", +val)
              }
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">روز</span>
                </div>
              }
              labelPlacement="outside"
            />
          }
          childrenTop={
            <>
              <OrderLimitSwitcher
                title="نمایش در فروشگاه"
                initialMode={form.is_visible ? "enabled" : "disabled"}
                onChange={(val) =>
                  handleFieldChange("is_visible", val === "enabled")
                }
              />
              <OrderLimitSwitcher
                title="افزودن محصول به لیست پیشنهاد ویژه"
                initialMode={form.is_featured ? "enabled" : "disabled"}
                onChange={(val) =>
                  handleFieldChange("is_featured", val === "enabled")
                }
              />
            </>
          }
          children={
            <>
              <OrderLimitSwitcher
                title="محدودیت تعداد برای هر سفارش"
                initialMode={form.order_limit > 0 ? "enabled" : "disabled"}
                onChange={(val) =>
                  handleFieldChange(
                    "order_limit",
                    val === "enabled" ? +form.order_limit || 1 : 0
                  )
                }
              >
                <NumberInput
                  hideStepper
                  placeholder="3"
                  minValue={1}
                  value={form.order_limit ?? 0}
                  labelPlacement="outside"
                  onValueChange={(val) =>
                    handleFieldChange("order_limit", +val || 1)
                  }
                  endContent={
                    <span className="text-default-400 text-small">عدد</span>
                  }
                />
              </OrderLimitSwitcher>
              <OrderLimitSwitcher
                title="موجودی نامحدود"
                initialMode={form.is_limited_stock ? "enabled" : "disabled"}
                hideChildrenWhenEnabled // وقتی فعال شد، input مخفی میشه
                onChange={(val) =>
                  handleFieldChange("is_limited_stock", val === "enabled")
                }
              >
                <NumberInput
                  hideStepper
                  label="موجودی"
                  placeholder="1"
                  minValue={0}
                  value={form.stock}
                  labelPlacement="outside"
                  onValueChange={(val) => handleFieldChange("stock", +val)}
                />
              </OrderLimitSwitcher>
            </>
          }
        />
        <SizeGuide
          onHelperId={(id) => {
            handleFieldChange("helper_id", id);
          }}
          sizeGuide={oneProduct?.data?.helper}
        />
      </BaseCard>

      <FormActionButtons
        cancelHref="/admin/products"
        onSubmit={handleChangeProduct}
      />
    </>
  );
};

export default ProductInitialForm;
