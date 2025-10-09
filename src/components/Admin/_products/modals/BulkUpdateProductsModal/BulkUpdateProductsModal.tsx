"use client";

import React, { useState, useMemo } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";

// آیکون‌ها از react-icons
import { AiOutlineEye } from "react-icons/ai";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { BiMoneyWithdraw } from "react-icons/bi";

// مدال‌های جدید
import BulkVisibilityModal from "./BulkVisibilityModal";
import BulkDiscountModal from "./BulkDiscountModal";
import BulkPriceModal from "./BulkPriceModal";

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
  // کنترل باز بودن هر مدال داخلی
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  // متن بالای مدال اصلی
  const headerNote = useMemo(() => {
    if (selectedCount <= 0) return "محصولی انتخاب نشده است";
    return `${selectedCount} محصول انتخاب شده`;
  }, [selectedCount]);

  // کال‌بک برای دریافت داده از مدال‌های فرزند
  const handleChildConfirm = (data: any) => {
    onConfirm(data);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xs" placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-normal">
                <p>اعمال تغییرات گروهی</p>
                <small className="text-default-500">{headerNote}</small>
              </ModalHeader>

              <ModalBody className="flex flex-col gap-4 mb-4">
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

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
