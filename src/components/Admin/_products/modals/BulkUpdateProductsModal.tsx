"use client";

import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionItem,
  Button,
  Select,
  SelectItem,
  Switch,
  NumberInput,
  Checkbox,
} from "@heroui/react";

type BulkPayload = {
  // فقط چیزهایی که مقدار دارند به parent برمی‌گردونیم
  is_visible: boolean | null;
  is_featured: boolean | null;
  is_same_day_shipping: boolean | null;
  // نامحدود/موجودی
  is_limited_stock: boolean | null;
  stock: number | null;
  // محدودیت سفارش
  order_limit: number | null;
  // قیمت و تخفیف — اختیاری، اگر نمی‌خوای فعلاً حذفش کن
  price: number | null;
  discount_amount: number | null;
  discount_percent: number | null;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  /** ids انتخاب‌شده — فقط برای نمایش یا چک کردن */
  selectedCount?: number;
  /** وقتی کاربر روی دکمه تایید زد، payload (فقط فیلدهای تغییر یافته) رو بده بیرون */
  onConfirm: (data: Partial<Record<keyof BulkPayload, any>>) => void;
};

const BulkUpdateProductsModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  selectedCount = 0,
  onConfirm,
}) => {
  // همه چیز پیش‌فرض null -> یعنی تغییری اعمال نشه
  const [is_visible, setIsVisible] = useState<boolean | null>(null);
  const [is_featured, setIsFeatured] = useState<boolean | null>(null);
  const [is_same_day_shipping, setIsSameDayShipping] = useState<boolean | null>(
    null
  );

  const [is_limited_stock, setIsLimitedStock] = useState<boolean | null>(null);
  const [stock, setStock] = useState<number | null>(null);

  const [order_limit, setOrderLimit] = useState<number | null>(null);

  const [price, setPrice] = useState<number | null>(null);
  const [discount_amount, setDiscountAmount] = useState<number | null>(null);
  const [discount_percent, setDiscountPercent] = useState<number | null>(null);

  // چه آکوردئون‌هایی باز باشند
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  // پیام انتخاب‌ها (بالای مدال)
  const headerNote = useMemo(() => {
    if (selectedCount <= 0) return "محصولی انتخاب نشده است";
    return `${selectedCount} محصول انتخاب شده`;
  }, [selectedCount]);

  // ساخت payload نهایی — فقط فیلدهایی که از null خارج شده‌اند
  const buildPayload = (): Partial<Record<keyof BulkPayload, any>> => {
    const obj: Partial<Record<keyof BulkPayload, any>> = {};
    if (is_visible !== null) obj.is_visible = is_visible;
    if (is_featured !== null) obj.is_featured = is_featured;

    if (discount_amount !== null) obj.discount_amount = Number(discount_amount);
    if (discount_percent !== null)
      obj.discount_percent = Number(discount_percent);

    return obj;
  };

  const handleConfirm = () => {
    onConfirm(buildPayload());
    onOpenChange(false);
    // ریست داخلی (اختیاری)
    setIsVisible(null);
    setIsFeatured(null);
    setIsSameDayShipping(null);
    setIsLimitedStock(null);
    setStock(null);
    setOrderLimit(null);
    setPrice(null);
    setDiscountAmount(null);
    setDiscountPercent(null);
    setOpenKeys(new Set());
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      placement="center"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 font-normal">
              <p>آپدیت گروهی محصولات</p>
              <small className="text-default-500">{headerNote}</small>
            </ModalHeader>

            <ModalBody className="gap-4">
              <Accordion
                defaultExpandedKeys={"visibility"}
                selectedKeys={openKeys}
                onSelectionChange={(keys) => setOpenKeys(new Set(keys as any))}
              >
                {/* وضعیت نمایش در وب‌سایت */}
                <AccordionItem key="visibility" title="وضعیت نمایش">
                  <Select
                    label="وضعیت نمایش در وبسایت"
                    labelPlacement="outside"
                    placeholder="انتخاب وضعیت"
                    selectedKeys={
                      is_visible === null
                        ? []
                        : [is_visible ? "visible" : "hidden"]
                    }
                    onSelectionChange={(keys) => {
                      const key = Array.from(keys)[0] as string | undefined;
                      if (!key) {
                        setIsVisible(null);
                        return;
                      }
                      setIsVisible(key === "visible");
                    }}
                  >
                    <SelectItem key="visible">
                      نمایش - در فروشگاه نمایش داده می‌شود
                    </SelectItem>
                    <SelectItem key="hidden">
                      عدم نمایش - در فروشگاه نمایش داده نمی‌شود
                    </SelectItem>
                  </Select>
                </AccordionItem>

                {/* ویژه / Featured */}
                <AccordionItem key="featured" title="پیشنهاد ویژه">
                  <Switch
                    isSelected={is_featured === true}
                    onValueChange={(val) => setIsFeatured(val)}
                  >
                    افزودن به پیشنهاد ویژه
                  </Switch>
                  <div className="mt-2">
                    <Button
                      size="sm"
                      variant="light"
                      onPress={() => setIsFeatured(null)}
                    >
                      بازنشانی به بدون تغییر
                    </Button>
                  </div>
                </AccordionItem>
              </Accordion>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={() => onOpenChange(false)}>
                انصراف
              </Button>
              <Button color="primary" onPress={handleConfirm}>
                اعمال تغییرات
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BulkUpdateProductsModal;
