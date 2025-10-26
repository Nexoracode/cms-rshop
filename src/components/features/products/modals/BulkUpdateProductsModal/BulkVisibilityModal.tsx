"use client";

import { useState } from "react";
import { Select, SelectItem, Switch, Button } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { AiOutlineEye } from "react-icons/ai";
import BulkModalHeader from "./BulkModalHeader";

type Props = {
  selectedCount?: number;
  onConfirm: (data: { isVisible?: boolean; isFeatured?: boolean }) => void;
};

const BulkVisibilityModal: React.FC<Props> = ({
  selectedCount = 0,
  onConfirm,
}) => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);
  const [isFeatured, setIsFeatured] = useState<boolean | null>(null);

  const reset = () => {
    setIsVisible(null);
    setIsFeatured(null);
  };

  const handleConfirm = () => {
    const payload: { isVisible?: boolean; isFeatured?: boolean } = {};
    if (isVisible !== null) payload.isVisible = isVisible;
    if (isFeatured !== null) payload.isFeatured = isFeatured;
    onConfirm(payload);
    reset();
  };

  return (
    <BaseModal
      title={
        <BulkModalHeader
          title="ویرایش گروهی وضعیت نمایش"
          selectedCount={selectedCount}
        />
      }
      confirmText="اعمال تغییرات"
      confirmColor="primary"
      onConfirm={handleConfirm}
      onCancel={reset}
      isConfirmDisabled={selectedCount <= 0}
      icon={<AiOutlineEye size={22} className="text-sky-500" />}
      triggerProps={{
        title: "وضعیت نمایش",
        icon: <AiOutlineEye size={20} />,
        className: "w-full"
      }}
    >
      <div className="space-y-5">
        <Select
          label="وضعیت نمایش"
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

        <Switch
          isSelected={isFeatured === true}
          onValueChange={(val) => setIsFeatured(val)}
          size="sm"
        >
          افزودن به پیشنهاد ویژه
        </Switch>
      </div>
    </BaseModal>
  );
};

export default BulkVisibilityModal;
