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
  useDisclosure,
} from "@heroui/react";
import { LuTextCursorInput } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import AddNewCategoryModal from "../__categories/AddNewCategoryModal";
import { useEffect, useState } from "react";
import { Stock } from "@/types";
import BoxHeader from "./helpers/BoxHeader";

interface InitInfosProps {
  onChange: (data: {
    name: string;
    price: number;
    stock: number;
    is_limited_stock: boolean;
    discount_percent?: number;
    discount_amount?: number;
    is_featured: boolean;
    category_id: number;
  }) => void;
}

const InitInfos: React.FC<InitInfosProps> = ({ onChange }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categoriesData, setCategoriesData] = useState<
    { id: number; title: string }[]
  >([]);
  //
  const [formData, setFormData] = useState({
    name: "",
    price: 10000,
    is_limited_stock: false,
    discountValue: 0,
    discountType: "percent" as Stock,
    is_featured: false,
    category_id: 0,
    stock: 5,
  });

  useEffect(() => {
    const {
      category_id,
      discountType,
      discountValue,
      is_featured,
      is_limited_stock,
      name,
      price,
      stock,
    } = formData;
    onChange({
      name,
      price,
      is_limited_stock,
      ...(discountType === "percent"
        ? { discount_percent: discountValue }
        : { discount_amount: discountValue }),
      is_featured,
      category_id: category_id ? category_id : 0,
      stock,
    });
  }, [formData]);

  return (
    <>
      <Card className="w-full shadow-md">
        <BoxHeader
          title="اطلاعات اولیه محصول"
          color="bg-black text-white"
          icon={<LuTextCursorInput className="text-3xl" />}
        />
        <CardBody dir="rtl" className="flex flex-col gap-6">
          <Input
            isRequired
            label="نام"
            labelPlacement="outside"
            placeholder="نام محصول را وارد کنید"
            value={formData.name}
            onValueChange={(title) =>
              setFormData((prev) => ({ ...prev, name: title }))
            }
          />

          <div className="flex flex-col items-start">
            <NumberInput
              label="قیمت"
              labelPlacement="outside"
              placeholder="10,000"
              min={1}
              isRequired
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">تومان</span>
                </div>
              }
              value={+formData.price}
              onValueChange={(price) =>
                setFormData((prev) => ({ ...prev, price }))
              }
            />
            {formData.price && formData.discountValue !== 0 && (
              <p className="text-green-600 text-sm mt-2 mr-3">
                قیمت با تخفیف:{" "}
                {formData.discountType === "percent"
                  ? (
                      +formData.price *
                      (1 - formData.discountValue / 100)
                    ).toLocaleString()
                  : (
                      +formData.price - formData.discountValue
                    ).toLocaleString()}{" "}
                تومان
              </p>
            )}
          </div>

          <NumberInput
            label="موجودی"
            labelPlacement="outside"
            placeholder="1"
            minValue={1}
            isRequired
            isDisabled={formData.is_limited_stock}
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small truncate">
                  عدد موجود
                </span>
              </div>
            }
            value={+formData.stock}
            onValueChange={(stock) =>
              setFormData((prev) => ({ ...prev, stock }))
            }
          />
          <Checkbox
            isSelected={formData.is_limited_stock}
            onValueChange={(is_limited_stock) =>
              setFormData((prev) => ({ ...prev, is_limited_stock }))
            }
          >
            <p className="text-sm">موجودی نامحدود</p>
          </Checkbox>

          <div className="flex flex-col gap-3">
            <Select
              isRequired
              labelPlacement="outside"
              startContent={
                <FiSearch className="text-lg pointer-events-none" />
              }
              label="دسته بندی"
              placeholder="دسته بندی مورد نظر را جستجو یا اضافه کنید"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  category_id: +e.target.value,
                }));
              }}
            >
              {categoriesData.length ? (
                categoriesData.map((cat) => (
                  <SelectItem key={cat.id}>{cat.title}</SelectItem>
                ))
              ) : (
                <SelectItem isDisabled>دسته بندی موجود نیست</SelectItem>
              )}
            </Select>
            <div className="w-full flex items-center justify-between">
              <p className="text-[13px] text-gray-600">
                درصورت نیاز میتوانید دسته بندی جدیدی را از این جا اضافه کنید
              </p>
              <Button variant="flat" color="primary" size="sm" onPress={onOpen}>
                +  افزودن دسته بندی چدید
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <NumberInput
              label="تخفیف"
              labelPlacement="outside"
              placeholder="10"
              minValue={1}
              endContent={
                <select
                  aria-label="Select discount type"
                  className="outline-none border-0 bg-transparent text-default-400 text-small"
                  value={formData.discountType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      discountType: e.target.value as Stock,
                    }))
                  }
                >
                  <option value="percent">درصد</option>
                  <option value="money">مبلغ ثابت (تومان)</option>
                </select>
              }
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, discountValue: value }))
              }
              isDisabled={!formData.price}
            />
            {!formData.price && (
              <p className="text-gray-500 text-[13px]">
                برای تعریف تخفیف ابتدا قیمت را وارد کنید.
              </p>
            )}
          </div>

          <Checkbox
            isSelected={formData.is_featured}
            onValueChange={(is_featured) =>
              setFormData((prev) => ({ ...prev, is_featured }))
            }
          >
            <span className="text-sm">افزودن محصول به لیست پیشنهاد ویژه</span>
          </Checkbox>
        </CardBody>
      </Card>

      <AddNewCategoryModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onCategoryPayload={(cats) => setCategoriesData(cats)}
      />
    </>
  );
};

export default InitInfos;
