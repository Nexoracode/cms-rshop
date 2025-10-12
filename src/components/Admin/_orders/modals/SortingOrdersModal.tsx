"use client";

import { useState } from "react";
import { Listbox, ListboxItem } from "@heroui/react";
import {
  TbShoppingCartBolt,
  TbShoppingCartDown,
  TbShoppingCartExclamation,
  TbShoppingCartUp,
  TbSortAscendingShapes,
} from "react-icons/tb";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DynamicModal from "@/components/Helper/DynamicModal";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const SortingOrdersModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // مقدار اولیه از URL
  const activeSortFromURL = searchParams.getAll("sortBy")?.[0] ?? "";
  const [selectedSort, setSelectedSort] = useState<string>(activeSortFromURL);

  // ✅ تأیید مرتب‌سازی
  const handleConfirm = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sortBy");

    if (selectedSort) {
      params.append("sortBy", selectedSort);
      params.set("page", "1");
    }

    router.push(`${pathname}?${params.toString()}`);
    onOpenChange(false);
  };

  // 🚫 حذف مرتب‌سازی (هم از URL، هم از state)
  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sortBy");

    setSelectedSort(""); // ← ریست انتخاب در Listbox
    router.push(`${pathname}?${params.toString()}`);
    onOpenChange(false);
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="مرتب‌سازی سفارشات"
      icon={<TbSortAscendingShapes className="text-2xl" />}
      confirmText="تأیید"
      cancelText="حذف مرتب‌سازی"
      confirmColor="primary"
      onConfirm={handleConfirm}
      onCancel={handleClear}
      size="sm"
    >
      <Listbox
        aria-label="گزینه‌های مرتب‌سازی"
        variant="faded"
        selectionMode="single"
        selectedKeys={selectedSort ? [selectedSort] : []} // ← فقط وقتی مقدار دارد، تیک بزن
        onSelectionChange={(keys) => {
          const key = Array.from(keys)[0] as string | undefined;
          setSelectedSort(key ?? "");
        }}
      >
        <ListboxItem
          key="createdAt:DESC"
          startContent={
            <TbShoppingCartBolt className="text-2xl text-[var(--primary)]" />
          }
          description="نمایش جدیدترین سفارش‌ها"
        >
          جدیدترین
        </ListboxItem>

        <ListboxItem
          key="createdAt:ASC"
          startContent={
            <TbShoppingCartExclamation className="text-2xl text-[var(--primary)]" />
          }
          description="نمایش قدیمی‌ترین سفارش‌ها"
        >
          قدیمی‌ترین
        </ListboxItem>

        <ListboxItem
          key="total:DESC"
          startContent={
            <TbShoppingCartUp className="text-2xl text-[var(--primary)]" />
          }
          description="سفارش‌ها با بیشترین مبلغ"
        >
          بیشترین مبلغ
        </ListboxItem>

        <ListboxItem
          key="total:ASC"
          startContent={
            <TbShoppingCartDown className="text-2xl text-[var(--primary)]" />
          }
          description="سفارش‌ها با کمترین مبلغ"
        >
          کمترین مبلغ
        </ListboxItem>
      </Listbox>
    </DynamicModal>
  );
};

export default SortingOrdersModal;
