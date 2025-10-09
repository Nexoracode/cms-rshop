"use client";

import { useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import DynamicModal from "@/components/Helper/DynamicModal";
import PriceNumberInput from "@/components/Admin/_products/__create/helpers/PriceInput";
import BulkModalHeader from "./BulkModalHeader";
import { BiMoneyWithdraw } from "react-icons/bi";

type PriceMode = "set" | "increase" | "decrease";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount?: number;
  onConfirm: (data: { priceMode?: PriceMode; priceValue?: number }) => void;
};

const BulkPriceModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  selectedCount = 0,
  onConfirm,
}) => {
  const [priceMode, setPriceMode] = useState<PriceMode | null>(null);
  const [priceValue, setPriceValue] = useState<number | null>(null);

  const reset = () => {
    setPriceMode(null);
    setPriceValue(null);
  };

  const handleConfirm = () => {
    const payload: { priceMode?: PriceMode; priceValue?: number } = {};
    if (priceMode && priceValue !== null && !Number.isNaN(priceValue)) {
      payload.priceMode = priceMode;
      payload.priceValue = Number(priceValue);
    }
    onConfirm(payload);
    reset();
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      icon={<BiMoneyWithdraw size={22} className="text-purple-500"/>}
      title={
        <BulkModalHeader title="قیمت گروهی" selectedCount={selectedCount} />
      }
      confirmText="اعمال تغییرات"
      confirmColor="primary"
      onConfirm={handleConfirm}
      onCancel={reset}
      isConfirmDisabled={selectedCount <= 0}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="حالت تغییر قیمت"
          labelPlacement="outside"
          placeholder="انتخاب حالت"
          selectedKeys={priceMode ? [priceMode] : []}
          onSelectionChange={(keys) => {
            const key = Array.from(keys)[0] as PriceMode | undefined;
            setPriceMode(key ?? null);
          }}
        >
          <SelectItem key="set">ثبت قیمت جدید</SelectItem>
          <SelectItem key="increase">افزایش قیمت</SelectItem>
          <SelectItem key="decrease">کاهش قیمت</SelectItem>
        </Select>

        <PriceNumberInput
          value={priceValue ?? undefined}
          onChange={(val) =>
            setPriceValue(typeof val === "number" ? val : null)
          }
          label="مقدار قیمت"
          placeholder="10,000"
          suffix="تومان"
          isRequired={false}
          isActiveError={false}
        />
      </div>
    </DynamicModal>
  );
};

export default BulkPriceModal;
