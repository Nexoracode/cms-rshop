"use client";

import {
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
import { useState } from "react";
import { Product } from "../types/create-product";
import AddNewCategoryModal from "../__categories/AddNewCategoryModal";
import LabeledNumberWithUnitInput from "./helpers/LabeledNumberWithUnitInput";
import ShippingModeSwitcher from "./helpers/ShippingModeSwitcher";
import SizeGuide from "./SizeGuide/SizeGuide";
import AddNewBrandModal from "./BrandItem/AddNewBrandModal";
import { useGetBrands } from "@/hooks/useBrandItem";

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
};

const ProductInitialForm = () => {
  const [product, setProduct] = useState<Product>(initProduct);
  // Helper States
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
  //
  const cardStyle = "w-full shadow-md";
  const cardBodyStyle = "flex flex-col gap-6";
  const headerStyle = "bg-black text-white";

  return (
    <>
      <section>
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
              onAddNewClick={onOpenChangeCategory}
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
      </section>
      <AddNewCategoryModal
        isOpen={isOpenCategory}
        onOpenChange={onOpenCategory}
        onCategoryPayload={(cats) => setCategories(cats)}
      />
      <AddNewBrandModal isOpen={isOpenBrand} onOpenChange={onOpenBrand} />
    </>
  );
};

export default ProductInitialForm;
