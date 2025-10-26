"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import CategorySelect from "../../CategorySelect";
import BulkModalHeader from "./BulkModalHeader";
import { TbCategory } from "react-icons/tb";

type Props = {
  triggerProps?: React.ComponentProps<typeof Button>;
  selectedCount?: number;
  onConfirm: (data: { category_id?: number }) => void;
};

const BulkCategoryModal: React.FC<Props> = ({
  selectedCount = 0,
  onConfirm,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const reset = () => setCategoryId(null);

  const handleConfirm = () => {
    if (categoryId) {
      onConfirm({ category_id: categoryId });
    }
    reset();
  };

  return (
    <BaseModal
      triggerProps={{
        icon: <TbCategory size={20} />,
        title: "دسته‌بندی گروهی",
        className: "w-full"
      }}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      icon={<TbCategory size={22} className="text-purple-500" />}
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
    </BaseModal>
  );
};

export default BulkCategoryModal;
