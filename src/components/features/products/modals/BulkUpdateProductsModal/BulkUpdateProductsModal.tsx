"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@heroui/react";
//
import { AiOutlineEye } from "react-icons/ai";
import { TbAlignBoxRightStretch, TbShoppingCartDiscount } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbCategory } from "react-icons/tb";
//
import BulkVisibilityModal from "./BulkVisibilityModal";
import BulkDiscountModal from "./BulkDiscountModal";
import BulkPriceModal from "./BulkPriceModal";
import DynamicModal from "@/components/ui/modals/BaseModal";
import BulkCategoryModal from "./BulkCategoryModal";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount?: number;
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
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const headerNote = useMemo(() => {
    if (selectedCount <= 0) return "محصولی انتخاب نشده است";
    return `${selectedCount} محصول انتخاب شده`;
  }, [selectedCount]);

  const handleChildConfirm = (data: any) => {
    onConfirm(data);
    setIsVisibilityModalOpen(false);
    setIsDiscountModalOpen(false);
    setIsPriceModalOpen(false);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setIsVisibilityModalOpen(false);
    setIsDiscountModalOpen(false);
    setIsPriceModalOpen(false);
    onOpenChange(false);
  };

  return (
    <>
      <DynamicModal
        isActiveFooter={false}
        icon={<TbAlignBoxRightStretch size={22} />}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={
          <div className="flex gap-2">
            <small className="text-default-500">{headerNote}</small>
          </div>
        }
        confirmText="بستن"
        confirmColor="primary"
        confirmVariant="flat"
        onConfirm={() => onOpenChange(false)}
        onCancel={handleCancel}
        placement="center"
        size="xs"
      >
        <div className="flex flex-col gap-4 mb-4">
          <Button
            variant="flat"
            color="primary"
            endContent={<AiOutlineEye size={20} />}
            onPress={() => setIsVisibilityModalOpen(true)}
            isDisabled={selectedCount <= 0}
            className="flex justify-between"
          >
            وضعیت نمایش
          </Button>

          <Button
            color="warning"
            variant="flat"
            endContent={<TbShoppingCartDiscount size={20} />}
            onPress={() => setIsDiscountModalOpen(true)}
            isDisabled={selectedCount <= 0}
            className="flex justify-between"
          >
            تخفیف گروهی
          </Button>

          <Button
            variant="flat"
            color="success"
            endContent={<BiMoneyWithdraw size={20} />}
            onPress={() => setIsPriceModalOpen(true)}
            isDisabled={selectedCount <= 0}
            className="flex justify-between"
          >
            قیمت گروهی
          </Button>
          <Button
            variant="flat"
            color="secondary"
            endContent={<TbCategory size={20} />}
            onPress={() => setIsCategoryModalOpen(true)}
            isDisabled={selectedCount <= 0}
            className="flex justify-between"
          >
            دسته‌بندی گروهی
          </Button>
        </div>
      </DynamicModal>

      <BulkVisibilityModal
        isOpen={isVisibilityModalOpen}
        onOpenChange={setIsVisibilityModalOpen}
        selectedCount={selectedCount}
        onConfirm={handleChildConfirm}
      />

      <BulkDiscountModal
        isOpen={isDiscountModalOpen}
        onOpenChange={setIsDiscountModalOpen}
        selectedCount={selectedCount}
        onConfirm={handleChildConfirm}
      />

      <BulkPriceModal
        isOpen={isPriceModalOpen}
        onOpenChange={setIsPriceModalOpen}
        selectedCount={selectedCount}
        onConfirm={handleChildConfirm}
      />

      <BulkCategoryModal
        isOpen={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        selectedCount={selectedCount}
        onConfirm={handleChildConfirm}
      />
    </>
  );
};

export default BulkUpdateProductsModal;
