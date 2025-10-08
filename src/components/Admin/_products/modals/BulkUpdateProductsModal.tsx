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
} from "@heroui/react";

// کامپوننت‌های آماده خودت
import LabeledNumberWithUnitInput from "../__create/helpers/LabeledNumberWithUnitInput";
import PriceNumberInput from "../__create/helpers/PriceInput";

type DiscountType = "percent" | "amount";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount?: number;
  // فقط فیلدهای تغییر داده شده برگردانده می‌شوند
  onConfirm: (data: {
    isVisible?: boolean;
    isFeatured?: boolean;
    discountPercent?: number;
    discountAmount?: number;
    priceMode?: "set" | "increase" | "decrease";
    priceValue?: number;
  }) => void;
};

const BulkUpdateProductsModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  selectedCount = 0,
  onConfirm,
}) => {
  // === Minimal states مطابق Swagger ===
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [isFeatured, setIsFeatured] = useState<boolean | null>(null);

  const [discountType, setDiscountType] = useState<DiscountType>("percent");
  const [discountValue, setDiscountValue] = useState<number | null>(null);

  const [priceMode, setPriceMode] = useState<"set" | "increase" | "decrease" | null>(null);
  const [priceValue, setPriceValue] = useState<number | null>(null);

  // کدام آکوردئون‌ها باز باشند (اختیاری)
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set(["visibility", "discount", "price"]));

  const headerNote = useMemo(() => {
    if (selectedCount <= 0) return "محصولی انتخاب نشده است";
    return `${selectedCount} محصول انتخاب شده`;
  }, [selectedCount]);

  // ساخت payload فقط با فیلدهای تغییر یافته
  const buildPayload = () => {
    const payload: {
      isVisible?: boolean;
      isFeatured?: boolean;
      discountPercent?: number;
      discountAmount?: number;
      priceMode?: "set" | "increase" | "decrease";
      priceValue?: number;
    } = {};

    if (isVisible !== null) payload.isVisible = isVisible;
    if (isFeatured !== null) payload.isFeatured = isFeatured;

    if (discountValue !== null && !Number.isNaN(discountValue)) {
      if (discountType === "percent") payload.discountPercent = Number(discountValue);
      if (discountType === "amount") payload.discountAmount = Number(discountValue);
    }

    if (priceMode && priceValue !== null && !Number.isNaN(priceValue)) {
      payload.priceMode = priceMode;
      payload.priceValue = Number(priceValue);
    }

    return payload;
  };

  const resetLocalState = () => {
    setIsVisible(null);
    setIsFeatured(null);
    setDiscountType("percent");
    setDiscountValue(null);
    setPriceMode(null);
    setPriceValue(null);
    setOpenKeys(new Set(["visibility", "discount", "price"]));
  };

  const handleConfirm = () => {
    const payload = buildPayload();
    onConfirm(payload);
    onOpenChange(false);
    resetLocalState();
  };

  const handleCancel = () => {
    onOpenChange(false);
    resetLocalState();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" placement="center">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 font-normal">
              <p>آپدیت گروهی محصولات</p>
              <small className="text-default-500">{headerNote}</small>
            </ModalHeader>

            <ModalBody className="gap-4">
              <Accordion
                selectedKeys={openKeys}
                onSelectionChange={(keys) => setOpenKeys(new Set(keys as any))}
              >
                {/* وضعیت نمایش */}
                <AccordionItem key="visibility" title="وضعیت نمایش / ویژه">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="وضعیت نمایش در وبسایت"
                      labelPlacement="outside"
                      placeholder="انتخاب وضعیت"
                      selectedKeys={
                        isVisible === null ? [] : [isVisible ? "visible" : "hidden"]
                      }
                      onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as string | undefined;
                        if (!key) return setIsVisible(null);
                        setIsVisible(key === "visible");
                      }}
                    >
                      <SelectItem key="visible">نمایش</SelectItem>
                      <SelectItem key="hidden">عدم نمایش</SelectItem>
                    </Select>

                    <div className="flex items-end">
                      <div className="flex flex-col gap-2">
                        <Switch
                          isSelected={isFeatured === true}
                          onValueChange={(val) => setIsFeatured(val)}
                        >
                          افزودن به پیشنهاد ویژه
                        </Switch>
                        <Button size="sm" variant="light" onPress={() => setIsFeatured(null)}>
                          بازنشانی به «بدون تغییر»
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionItem>

                {/* تخفیف */}
                <AccordionItem key="discount" title="تخفیف گروهی">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LabeledNumberWithUnitInput
                      label="تخفیف"
                      placeholder="10"
                      value={discountValue ?? undefined}
                      onValueChange={(val) => {
                        setDiscountValue(typeof val === "number" ? val : null);
                      }}
                      selectedKey={discountType}
                      onSelectChange={(val) => setDiscountType(val as DiscountType)}
                      options={[
                        { key: "percent", title: "درصد" },
                        { key: "amount", title: "مبلغ ثابت" },
                      ]}
                    />
                    <div className="flex items-end">
                      <Button
                        size="sm"
                        variant="light"
                        onPress={() => {
                          setDiscountValue(null);
                          setDiscountType("percent");
                        }}
                      >
                        حذف تغییر تخفیف
                      </Button>
                    </div>
                  </div>
                </AccordionItem>

                {/* قیمت گروهی */}
                <AccordionItem key="price" title="قیمت گروهی">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="حالت تغییر قیمت"
                      labelPlacement="outside"
                      placeholder="انتخاب حالت"
                      selectedKeys={priceMode ? [priceMode] : []}
                      onSelectionChange={(keys) => {
                        const key = Array.from(keys)[0] as
                          | "set"
                          | "increase"
                          | "decrease"
                          | undefined;
                        setPriceMode(key ?? null);
                      }}
                    >
                      <SelectItem key="set">ثبت قیمت جدید</SelectItem>
                      <SelectItem key="increase">افزایش قیمت</SelectItem>
                      <SelectItem key="decrease">کاهش قیمت</SelectItem>
                    </Select>

                    <PriceNumberInput
                      value={priceValue ?? undefined}
                      onChange={(val) => setPriceValue(typeof val === "number" ? val : null)}
                      label="مقدار قیمت"
                      placeholder="10,000"
                      suffix="تومان"
                      isRequired={false}
                      isActiveError={false}
                    />
                  </div>

                  <div className="mt-2">
                    <Button
                      size="sm"
                      variant="light"
                      onPress={() => {
                        setPriceMode(null);
                        setPriceValue(null);
                      }}
                    >
                      حذف تغییر قیمت
                    </Button>
                  </div>
                </AccordionItem>
              </Accordion>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" onPress={handleCancel}>
                انصراف
              </Button>
              <Button color="primary" onPress={handleConfirm} isDisabled={selectedCount <= 0}>
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
