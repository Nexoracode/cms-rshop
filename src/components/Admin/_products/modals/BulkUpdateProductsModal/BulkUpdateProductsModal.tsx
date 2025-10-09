"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@heroui/react";
//
import { AiOutlineEye } from "react-icons/ai";
import { TbAlignBoxRightStretch, TbShoppingCartDiscount } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";
//
import BulkVisibilityModal from "./BulkVisibilityModal";
import BulkDiscountModal from "./BulkDiscountModal";
import BulkPriceModal from "./BulkPriceModal";
import DynamicModal from "@/components/Helper/DynamicModal";

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
        icon={<TbAlignBoxRightStretch size={22}/>}
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
            color="primary"
            variant="flat"
            startContent={<AiOutlineEye size={18} />}
            onPress={() => setIsVisibilityModalOpen(true)}
            isDisabled={selectedCount <= 0}
          >
            وضعیت نمایش
          </Button>

          <Button
            color="warning"
            variant="flat"
            startContent={<TbShoppingCartDiscount size={18} />}
            onPress={() => setIsDiscountModalOpen(true)}
            isDisabled={selectedCount <= 0}
          >
            تخفیف گروهی
          </Button>

          <Button
            color="secondary"
            variant="flat"
            startContent={<BiMoneyWithdraw size={18} />}
            onPress={() => setIsPriceModalOpen(true)}
            isDisabled={selectedCount <= 0}
          >
            قیمت گروهی
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
    </>
  );
};

export default BulkUpdateProductsModal;
