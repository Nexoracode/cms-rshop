"use client";

import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import BoxHeader from "./helpers/BoxHeader";
import { LuScrollText, LuTextCursorInput } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import PriceWithDiscountInput from "./helpers/PriceWithDiscountInput";
import SelectWithAddButton from "./helpers/SelectWithAddButton";
import { useEffect, useState } from "react";
import { Product } from "../types/create-product";
import AddNewCategoryModal from "../__categories/AddNewCategoryModal";
import LabeledNumberWithUnitInput from "./helpers/LabeledNumberWithUnitInput";
import ShippingModeSwitcher from "./helpers/ShippingModeSwitcher";
import SizeGuide from "./SizeGuide/SizeGuide";
import AddNewBrandModal from "./BrandItem/AddNewBrandModal";
import { useGetBrands } from "@/hooks/useBrandItem";
import OrderLimitSwitcher from "./helpers/OrderLimitSwitcher";
import ImagesProducts from "./ImagesProducts";
import { useSearchParams } from "next/navigation";
import {
  useGetOneProduct,
  useProductCreate,
  useProductUpdate,
} from "@/hooks/products/useProduct";

const initProduct: Product = {
  name: "",
  price: 0,
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
  media_pinned_id: 0,
  helper_id: 0,
  brand_id: 0,
  media: [],
};

const ProductInitialForm = () => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit_id");
  //
  const [product, setProduct] = useState<Product>(initProduct);
  const [categories, setCategories] = useState<{ id: number; title: string }[]>(
    []
  );
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
  const { mutate: createProduct } = useProductCreate();
  const { data: oneProduct } = useGetOneProduct(editId ? +editId : undefined);
  const { mutate: updateProduct } = useProductUpdate(
    editId ? +editId : undefined
  );
  //
  const cardStyle = "w-full shadow-md";
  const cardBodyStyle = "flex flex-col gap-6 text-right";
  const headerStyle = "bg-black text-white";

  useEffect(() => {
    if (oneProduct) {
      const {
        name,
        price,
        stock,
        is_limited_stock,
        is_featured,
        discount_amount,
        discount_percent,
        category_id,
        weight,
        weight_unit,
        is_same_day_shipping,
        requires_preparation,
        preparation_days,
        description,
        is_visible,
        order_limit,
        helper_id,
        brand_id,
        media_pinned_id,
        medias,
      } = oneProduct.data;

      setProduct({
        name,
        price: +price,
        stock,
        is_limited_stock,
        is_featured,
        discount_amount: discount_amount ?? 0,
        discount_percent: discount_percent ?? 0,
        category_id,
        weight: +weight,
        weight_unit,
        is_same_day_shipping,
        requires_preparation,
        preparation_days,
        description,
        is_visible,
        order_limit,
        helper_id,
        brand_id,
        media_pinned_id,
        media: medias || [],
        media_ids: medias?.map((m: any) => m.id) || [], // 🔥
      });
    }
  }, [oneProduct]);

  const handleChangeProduct = () => {
    const {
      media, // حذف میشه
      helper, // حذف میشه
      ...sendableData
    } = product;

    const result = {
      ...sendableData,
    };

    if (!editId) {
      createProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            console.log("✅ محصول ایجاد شد", res.data);
            // ادامه روند مثل سوییچ به فرم بعدی...
          }
        },
      });
    } else {
      updateProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            console.log("✅ محصول آپدیت شد", res.data);
            // ادامه روند مثل سوییچ به فرم بعدی...
          }
        },
      });
    }
  };

  return (
    <>
      <section className="flex flex-col gap-6">
        <ImagesProducts
          onMedia_ids={(datas) =>
            setProduct((prev) => ({ ...prev, media_ids: datas }))
          }
          onMedia_pinned_id={(id) =>
            setProduct((prev) => ({ ...prev, media_pinned_id: id }))
          }
          initialMedias={product.media}
          initialPinnedId={product.media_pinned_id}
        />
        <Card className={cardStyle}>
          <BoxHeader
            title="اطلاعات اولیه محصول"
            color={headerStyle}
            icon={<LuTextCursorInput className="text-3xl" />}
          />
          <CardBody className={cardBodyStyle}>
            <Input
              isRequired
              label="نام"
              labelPlacement="outside"
              placeholder="نام محصول را وارد کنید"
              value={product?.name}
              onValueChange={(name) =>
                setProduct((prev) => {
                  if (!prev) return prev;
                  return { ...prev, name };
                })
              }
            />

            <PriceWithDiscountInput
              price={product.price}
              discount_amount={product.discount_amount ?? 0}
              discount_percent={product.discount_percent ?? 0}
              onPriceChange={(price) =>
                setProduct((prev) => ({ ...prev, price }))
              }
              onDiscountChange={(type, value) =>
                setProduct((prev) => ({
                  ...prev,
                  discount_amount: type === "amount" ? value : 0,
                  discount_percent: type === "percent" ? value : 0,
                }))
              }
            />

            <SelectWithAddButton
              label="دسته بندی"
              placeholder="دسته بندی مورد نظر را انتخاب کنید"
              options={categories}
              selectedId={product.category_id}
              onChange={(id) =>
                setProduct((prev) => ({ ...prev, category_id: +id }))
              }
              onAddNewClick={onOpenCategory}
            />

            <Checkbox
              isSelected={product.is_featured}
              onValueChange={(is_featured) =>
                setProduct((prev) => ({ ...prev, is_featured }))
              }
            >
              <span className="text-sm">افزودن محصول به لیست پیشنهاد ویژه</span>
            </Checkbox>
          </CardBody>
        </Card>
        <Card className={cardStyle}>
          <BoxHeader
            title="اطلاعات میانی محصول"
            color={headerStyle}
            icon={<FiShoppingBag className="text-3xl" />}
          />
          <CardBody className={cardBodyStyle}>
            <LabeledNumberWithUnitInput
              label="وزن"
              value={product.weight}
              onValueChange={(val) =>
                setProduct((prev) => ({ ...prev, weight: +val }))
              }
              selectedKey={product.weight_unit}
              onSelectChange={(val) =>
                setProduct((prev) => ({ ...prev, weight_unit: val }))
              }
              options={[
                { key: "گرم", title: "گرم" },
                { key: "کیلوگرم", title: "کیلوگرم" },
              ]}
            />
            <ShippingModeSwitcher
              onChangeType={(type) =>
                setProduct((prev) => ({
                  ...prev,
                  requires_preparation: type === "mood2" ? true : false,
                }))
              }
              title="شرایط ارسال"
              textMood1="محصول نیاز به زمان آماده‌ سازی دارد"
              textMood2="می‌خواهم محصول “ارسال امروز” داشته باشد."
              childrenMood1={
                <NumberInput
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
          </CardBody>
        </Card>
        <Card className={cardStyle}>
          <BoxHeader
            title="اطلاعات تکمیلی محصول"
            color={headerStyle}
            icon={<LuScrollText className="text-3xl" />}
          />
          <CardBody className={cardBodyStyle}>
            <Textarea
              placeholder="توضیحات را وارد نمایید"
              labelPlacement="outside"
              label="توضیحات"
              value={product.description ?? ""}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            <Select
              dir="rtl"
              labelPlacement="outside"
              label="وضعیت نمایش در وبسایت"
              placeholder="انتخاب وضعیت محصول"
              className="!mt-8"
              onChange={(e) => {
                setProduct((prev) => ({
                  ...prev,
                  is_visible: e.target.value ? true : false,
                }));
              }}
              selectedKeys={[product.is_visible ? "visible" : "hidden"]}
            >
              <SelectItem key="visible">
                نمایش - در فروشگاه نمایش داده میشود
              </SelectItem>
              <SelectItem key="hidden">
                عدم نمایش - در فروشگاه نمایش داده نمی شود
              </SelectItem>
            </Select>

            <OrderLimitSwitcher
              title="محدودیت تعداد برای هر سفارش"
              initialMode={product.order_limit ? "enabled" : "disabled"}
              onChange={(val) =>
                val === 0 &&
                setProduct((prev) => ({
                  ...prev,
                  order_limit: 0,
                }))
              }
            >
              <NumberInput
                label="حداکثر تعداد قابل سفارش"
                placeholder="3"
                minValue={1}
                value={product.order_limit ?? 0}
                labelPlacement="outside"
                onValueChange={(val) =>
                  setProduct((prev) => ({
                    ...prev,
                    order_limit: +val,
                  }))
                }
              />
            </OrderLimitSwitcher>

            <SelectWithAddButton
              label="برند"
              placeholder="برند مورد نظر را انتخاب کنید"
              options={
                allBrands?.data?.map((brand: any) => ({
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
            />

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
          ثبت تغیرات
        </Button>
      </section>
      <AddNewCategoryModal
        isOpen={isOpenCategory}
        onOpenChange={onOpenChangeCategory}
        onCategoryPayload={(cats) => setCategories(cats)}
      />
      <AddNewBrandModal isOpen={isOpenBrand} onOpenChange={onOpenChangeBrand} />
    </>
  );
};

export default ProductInitialForm;
