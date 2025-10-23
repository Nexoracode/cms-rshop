"use client";

import React, { useState } from "react";
import DynamicModal from "@/components/ui/modals/BaseModal";
import CategorySelect from "../../CategorySelect";
import BulkModalHeader from "./BulkModalHeader";
import { TbCategory } from "react-icons/tb";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount?: number;
  onConfirm: (data: { category_id?: number }) => void;
};

const BulkCategoryModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  selectedCount = 0,
  onConfirm,
}) => {
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const reset = () => setCategoryId(null);

  const handleConfirm = () => {
    if (categoryId) {
      onConfirm({ category_id: categoryId });
    }
    reset();
    onOpenChange(false);
  };

  return (
    <DynamicModal
      icon={<TbCategory size={22} className="text-purple-500" />}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={
        <BulkModalHeader
          title="ویرایش گروهی دسته‌بندی"
          selectedCount={selectedCount}
        />
      }
      confirmText="اعمال تغییرات"
      confirmColor="primary"
      onConfirm={handleConfirm}
      onCancel={reset}
      isConfirmDisabled={!categoryId || selectedCount <= 0}
      placement="center"
    >
      <div className="mt-2">
        <CategorySelect
          value={categoryId}
          onChange={(val) => setCategoryId(val ? Number(val) : null)}
          label="انتخاب دسته‌بندی جدید"
          placeholder="دسته‌بندی موردنظر را انتخاب کنید"
        />
      </div>
    </DynamicModal>
  );
};

export default BulkCategoryModal;
