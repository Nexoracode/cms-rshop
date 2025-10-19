"use client";

import dynamic from "next/dynamic";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  NumberInput,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import BoxHeader from "./helpers/BoxHeader";
import { LuScrollText } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import PriceWithDiscountInput from "./helpers/PriceWithDiscountInput";
import SelectWithAddButton from "./helpers/SelectWithAddButton";
import { useEffect, useMemo, useState } from "react";
import { Product } from "../types/create-product";
import AddNewCategoryModal from "../__categories/AddNewCategoryModal";
import NumberWithSelect from "../../../Shared/Inputs/NumberWithSelect";
import ShippingModeSwitcher from "./helpers/ShippingModeSwitcher";
import SizeGuide from "./SizeGuide/SizeGuide";
import AddNewBrandModal from "../__brands/AddNewBrandModal";
import { useGetBrands } from "@/hooks/api/useBrand";
import OrderLimitSwitcher from "./helpers/OrderLimitSwitcher";
import ImagesProducts from "./ImagesProducts";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useGetOneProduct,
  useProductCreate,
  useProductUpdate,
} from "@/hooks/api/products/useProduct";
import ToggleableSection from "./helpers/ToggleableSection";
import { flattenCategories } from "@/utils/flattenCategories";
import { useGetAllCategories } from "@/hooks/api/categories/useCategory";
import { scrollToFirstErrorField } from "@/utils/scrollToErrorField";
import TextInputWithError from "@/components/Helper/TextInput/TextInput";

const TextEditor = dynamic(() => import("../../TextEditor"), {
  ssr: false,
});

const initProduct: Product = {
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
  medias: [],
};

const ProductInitialForm = () => {
  const cardStyle = "w-full shadow-md";
  const cardBodyStyle = "flex flex-col gap-6 text-right";
  //
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit_id");
  //
  const [product, setProduct] = useState<Product>(initProduct);
  //
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    hasMedia: false,
    hasPinned: false,
    hasName: false,
    hasPrice: false,
    hasCategory: false,
    hasWeight: false,
    hasBrand: false,
    hasDesc: false,
  });

  //?Disclosure
  const {
    isOpen: isOpenCategory,
    onOpen: onOpenCategory,
    onOpenChange: onOpenChangeCategory,
  } = useDisclosure();
  const {
    isOpen: isOpenBrand,
    onOpen: onOpenBrand,
    onOpenChange: onOpenChangeBrand,
  } = useDisclosure();
  //? Hooks
  const { data: allBrands } = useGetBrands();
  const { data: categoriesData } = useGetAllCategories();
  const { mutate: createProduct } = useProductCreate();
  const { data: oneProduct } = useGetOneProduct(editId ? +editId : undefined);
  const { mutate: updateProduct } = useProductUpdate(
    editId ? +editId : undefined
  );
  //

  useEffect(() => {
    if (oneProduct?.data) {
      setProduct(oneProduct.data);
    }
  }, [oneProduct]);

  const flatOptions = useMemo(() => {
    return flattenCategories(categoriesData?.data);
  }, [categoriesData?.data]);

  const stripHtml = (html?: string) =>
    (html ?? "")
      .replace(/<[^>]*>/g, "") // حذف تگ‌ها
      .replace(/&nbsp;/g, " ") // حذف nbsp
      .trim();

  const canSubmit = useMemo(() => {
    const hasMedia =
      ((product.media_ids?.length || oneProduct?.data?.medias?.length) ?? 0) >
      0;
    const hasPinned = !!product.media_pinned_id;
    const hasName = !!product.name?.trim();
    const hasPrice = Number(product.price) > 0;
    const hasCategory = Number(product.category_id) > 0;
    const hasWeight = Number(product.weight) > 0;
    const hasBrand = Number(product.brand_id) > 0;
    const hasDesc = stripHtml(product.description || "").length > 0;

    return (
      hasMedia &&
      hasPinned &&
      hasName &&
      hasPrice &&
      hasCategory &&
      hasWeight &&
      hasDesc &&
      hasBrand
    );
  }, [product]);

  const handleChangeProduct = () => {
    // بررسی فیلدها
    const hasMedia =
      ((product.media_ids?.length || oneProduct?.data?.medias?.length) ?? 0) >
      0;
    const hasPinned = !!product.media_pinned_id;
    const hasName = !!product.name?.trim();
    const hasPrice = Number(product.price) > 0;
    const hasCategory = Number(product.category_id) > 0;
    const hasWeight = Number(product.weight) > 0;
    const hasBrand = Number(product.brand_id) > 0;
    const hasDesc = stripHtml(product.description || "").length > 0;

    // فعال کردن وضعیت بررسی
    setIsSubmitAttempted(true);

    // ذخیره وضعیت خطاها در state
    setFieldErrors({
      hasMedia,
      hasPinned,
      hasName,
      hasPrice,
      hasCategory,
      hasWeight,
      hasBrand,
      hasDesc,
    });

    if (
      !hasMedia ||
      !hasPinned ||
      !hasName ||
      !hasPrice ||
      !hasCategory ||
      !hasWeight ||
      !hasDesc ||
      !hasBrand
    ) {
      setTimeout(() => scrollToFirstErrorField(), 0);
      return;
    }

    const {
      medias,
      helper,
      media_pinned,
      brand,
      category,
      updated_at,
      created_at,
      variants,
      id,
      specifications,
      attribute_nodes,
      ...sendableData
    } = product;

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
    } = sendableData;

    const result: Product = {
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

    console.log(result);

    if (!editId) {
      createProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            router.push("/admin/products");
            setProduct(initProduct);
          }
        },
      });
    } else {
      updateProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            router.push("/admin/products");
            setProduct(initProduct);
          }
        },
      });
    }
  };

  return (
    <>
      <section className="flex flex-col gap-6">
        <Card className={cardStyle} data-error={isSubmitAttempted}>
          <BoxHeader
            title="اطلاعات کلیدی محصول"
            color="text-white bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"
            icon={<LuScrollText className="text-3xl" />}
          />
          <CardBody className={cardBodyStyle}>
            <ImagesProducts
              onMedia_ids={(datas) => {
                setProduct((prev) => ({ ...prev, media_ids: datas }));
              }}
              onMedia_pinned_id={(id) => {
                setProduct((prev) => ({ ...prev, media_pinned_id: id }));
              }}
              initialMedias={product.medias}
              initialPinnedId={product.media_pinned_id}
              isActiveError={isSubmitAttempted && !fieldErrors.hasMedia}
            />
            <hr />
            <TextInputWithError
              label="نام"
              placeholder="نام محصول را وارد کنید"
              value={product.name}
              onChange={(name) => setProduct((p) => ({ ...p, name }))}
              isRequired
              isActiveError={isSubmitAttempted && !fieldErrors.hasName}
              inputAlign="right"
              allowEnglishOnly={false}
            />

            <PriceWithDiscountInput
              price={product.price}
              discount_amount={product.discount_amount ?? 0}
              discount_percent={product.discount_percent ?? 0}
              onPriceChange={(price) =>
                setProduct((prev) => ({ ...prev, price: +price }))
              }
              onDiscountChange={(type, value) =>
                setProduct((prev) => ({
                  ...prev,
                  discount_amount: type === "amount" ? +value : 0,
                  discount_percent: type === "percent" ? +value : 0,
                }))
              }
              isActiveError={
                isSubmitAttempted &&
                (!fieldErrors.hasPrice || !fieldErrors.hasPinned)
              }
            />

            <div className="flex flex-col md:flex-row gap-4">
              <SelectWithAddButton
                label="دسته بندی"
                placeholder="دسته بندی مورد نظر را انتخاب کنید"
                options={flatOptions}
                selectedId={product.category_id}
                onChange={(id) =>
                  setProduct((prev) => ({ ...prev, category_id: +id }))
                }
                onAddNewClick={onOpenCategory}
                isActiveError={isSubmitAttempted && !fieldErrors.hasCategory}
              />

              <SelectWithAddButton
                label="برند"
                placeholder="برند مورد نظر را انتخاب کنید"
                options={
                  allBrands?.data?.items?.map((brand: any) => ({
                    id: brand.id,
                    title: brand.name,
                  })) ?? []
                }
                selectedId={product.brand_id ?? 0}
                onChange={(id) =>
                  setProduct((prev) => ({
                    ...prev,
                    brand_id: +id,
                  }))
                }
                onAddNewClick={onOpenBrand}
                isActiveError={isSubmitAttempted && !fieldErrors.hasBrand}
              />
            </div>

            <NumberWithSelect
              isRequired
              label="وزن"
              value={product.weight}
              onValueChange={(val) =>
                setProduct((prev) => ({ ...prev, weight: val ?? 0 }))
              }
              selectedKey={product.weight_unit}
              onSelectChange={(val) =>
                setProduct((prev) => ({ ...prev, weight_unit: val }))
              }
              options={[
                { key: "گرم", title: "گرم" },
                { key: "کیلوگرم", title: "کیلوگرم" },
              ]}
              isActiveError={isSubmitAttempted && !fieldErrors.hasWeight}
            />

            <TextEditor
              value={product.description ?? ""}
              onChange={(content) =>
                setProduct((prev) => ({
                  ...prev,
                  description: content,
                }))
              }
              label="توضیحات"
              isActiveError={isSubmitAttempted && !fieldErrors.hasDesc}
            />
          </CardBody>
        </Card>
        <Card className={`${cardStyle}`}>
          <BoxHeader
            title="اطلاعات تکمیلی محصول"
            color="text-white bg-gradient-to-r from-indigo-600 to-indigo-500"
            icon={<FiShoppingBag className="text-3xl" />}
          />
          <CardBody className={cardBodyStyle}>
            <ShippingModeSwitcher
              defaultMood={product.requires_preparation ? "mood2" : "mood1"}
              onChangeType={(type) =>
                setProduct((prev) => ({
                  ...prev,
                  requires_preparation: type === "mood2" ? true : false,
                  preparation_days:
                    type === "mood2" ? product.preparation_days || 1 : 0,
                  is_same_day_shipping: type === "mood2" ? false : true,
                }))
              }
              title="شرایط ارسال"
              textMood1="محصول نیاز به زمان آماده‌ سازی دارد"
              textMood2="می‌خواهم محصول “ارسال امروز” داشته باشد."
              childrenMood1={
                <NumberInput
                  hideStepper
                  label="زمان آماده‌سازی"
                  placeholder="3"
                  minValue={1}
                  value={product.preparation_days ?? 0}
                  onValueChange={(val) =>
                    setProduct((prev) => ({ ...prev, preparation_days: +val }))
                  }
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">روز</span>
                    </div>
                  }
                  labelPlacement="outside"
                />
              }
              childrenMood2={
                <small className="text-gray-500 mt-1">
                  برچسب “ارسال امروز” روی کارت این محصول در فروشگاه نمایش داده
                  خواهد شد.
                </small>
              }
            />
            <OrderLimitSwitcher
              title="محدودیت تعداد برای هر سفارش"
              initialMode={product.order_limit > 0 ? "enabled" : "disabled"}
              onChange={(val) =>
                setProduct((prev) => ({
                  ...prev,
                  order_limit:
                    val === "enabled" ? +product.order_limit || 1 : 0,
                }))
              }
            >
              <NumberInput
                hideStepper
                label="حداکثر تعداد قابل سفارش"
                placeholder="3"
                minValue={1}
                value={product.order_limit ?? 0}
                labelPlacement="outside"
                onValueChange={(val) =>
                  setProduct((prev) => ({
                    ...prev,
                    order_limit: +val || 1,
                  }))
                }
              />
            </OrderLimitSwitcher>
            <ToggleableSection
              label="موجودی نامحدود"
              onOptionalToggle={(checked) =>
                setProduct((prev) => ({
                  ...prev,
                  is_limited_stock: checked,
                  stock: checked ? 0 : +product.stock,
                }))
              }
              isChecked={product.is_limited_stock}
            >
              <NumberInput
                hideStepper
                label="موجودی"
                placeholder="1"
                minValue={0}
                value={product.stock}
                onValueChange={(val) =>
                  setProduct((prev) => ({ ...prev, stock: +val }))
                }
                labelPlacement="outside"
              />
            </ToggleableSection>

            <hr />
            <Select
              dir="rtl"
              labelPlacement="outside"
              label="وضعیت نمایش در وبسایت"
              placeholder="انتخاب وضعیت محصول"
              className="!mt-8"
              selectedKeys={[product.is_visible ? "visible" : "hidden"]}
              onSelectionChange={(keys) => {
                const value = Array.from(keys)[0];
                setProduct((prev) => ({
                  ...prev,
                  is_visible: value === "visible",
                }));
              }}
            >
              <SelectItem key="visible">
                نمایش - در فروشگاه نمایش داده میشود
              </SelectItem>
              <SelectItem key="hidden">
                عدم نمایش - در فروشگاه نمایش داده نمی شود
              </SelectItem>
            </Select>

            <Checkbox
              isSelected={product.is_featured}
              onValueChange={(is_featured) =>
                setProduct((prev) => ({ ...prev, is_featured }))
              }
            >
              <span className="text-sm">افزودن محصول به لیست پیشنهاد ویژه</span>
            </Checkbox>
            <SizeGuide
              onHelperId={(id) => {
                setProduct((prev) => ({ ...prev, helper_id: id }));
              }}
              sizeGuide={product.helper}
            />
          </CardBody>
        </Card>
        <Button
          color="success"
          className="text-white"
          onPress={handleChangeProduct}
        >
          ثبت تغییرات
        </Button>
      </section>
      <AddNewCategoryModal
        isOpen={isOpenCategory}
        onOpenChange={onOpenChangeCategory}
      />
      <AddNewBrandModal isOpen={isOpenBrand} onOpenChange={onOpenChangeBrand} />
    </>
  );
};

export default ProductInitialForm;
