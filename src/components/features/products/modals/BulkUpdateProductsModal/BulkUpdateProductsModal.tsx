"use client";

import React, { useMemo } from "react";
import { Button } from "@heroui/react";
import { AiOutlineEye } from "react-icons/ai";
import {
  TbAlignBoxRightStretch,
  TbShoppingCartDiscount,
  TbCategory,
} from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";

import BaseModal from "@/components/ui/modals/BaseModal";
import BulkVisibilityModal from "./BulkVisibilityModal";
import BulkDiscountModal from "./BulkDiscountModal";
import BulkPriceModal from "./BulkPriceModal";
import BulkCategoryModal from "./BulkCategoryModal";

type Props = {
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
  selectedCount = 0,
  onConfirm,
}) => {
  const headerNote = useMemo(() => {
    if (selectedCount <= 0) return "محصولی انتخاب نشده است";
    return `${selectedCount} محصول انتخاب شده`;
  }, [selectedCount]);

  return (
    <BaseModal
      title={<small className="text-default-500">{headerNote}</small>}
      isActiveFooter={false}
      triggerProps={{
        title: "بروزرسانی گروهی",
        className: "bg-primary-very-light text-primary",
      }}
      icon={<TbAlignBoxRightStretch size={22} />}
    >
      <div className="flex flex-col gap-4 mb-4">
        <BulkVisibilityModal
          selectedCount={selectedCount}
          onConfirm={onConfirm}
        />

        <BulkDiscountModal
          selectedCount={selectedCount}
          onConfirm={onConfirm}
          trigger={
            <Button
              color="warning"
              variant="flat"
              endContent={<TbShoppingCartDiscount size={20} />}
              isDisabled={selectedCount <= 0}
              className="flex justify-between"
            >
              تخفیف گروهی
            </Button>
          }
        />

        <BulkPriceModal
          selectedCount={selectedCount}
          onConfirm={onConfirm}
          trigger={
            <Button
              variant="flat"
              color="success"
              endContent={<BiMoneyWithdraw size={20} />}
              isDisabled={selectedCount <= 0}
              className="flex justify-between"
            >
              قیمت گروهی
            </Button>
          }
        />

        <BulkCategoryModal
          selectedCount={selectedCount}
          onConfirm={onConfirm}
          trigger={
            <Button
              variant="flat"
              color="secondary"
              endContent={<TbCategory size={20} />}
              isDisabled={selectedCount <= 0}
              className="flex justify-between"
            >
              دسته‌بندی گروهی
            </Button>
          }
        />
      </div>
    </BaseModal>
  );
};

export default BulkUpdateProductsModal;
