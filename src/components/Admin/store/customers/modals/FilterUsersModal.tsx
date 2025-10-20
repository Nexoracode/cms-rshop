"use client";

import { useState } from "react";
import { DateRangePicker, Select, SelectItem } from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";
import { usePathname, useRouter } from "next/navigation";
import DynamicModal from "@/components/ui/modals/Modal";
import { eqBool10, rangeDate } from "@/utils/queryFilters";
import { calToJs } from "@/utils/dateHelpers";
import { TbFilter } from "react-icons/tb";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const FilterUsersModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    isActive: "" as "" | "1" | "0",
    createdAtRange: null as { start?: CalendarDate; end?: CalendarDate } | null,
  });

  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const handleApply = () => {
    const params = new URLSearchParams();
    params.set("page", "1");

    eqBool10(params, "isActive", filters.isActive);

    const s = calToJs(filters.createdAtRange?.start);
    const e = calToJs(filters.createdAtRange?.end);
    rangeDate(params, "createdAt", s, e);

    const q = params.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
    onOpenChange();
  };

  const handleClear = () => {
    setFilters({
      isActive: "",
      createdAtRange: null,
    });
    router.push(pathname);
    onOpenChange();
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="فیلتر کاربران"
      confirmText="اعمال"
      cancelText="حذف فیلتر"
      confirmColor="primary"
      onConfirm={handleApply}
      onCancel={handleClear}
      size="md"
      icon={<TbFilter className="text-2xl" />}
    >
      {/* محتویات مدال */}
      <div className="flex flex-col gap-6">
        {/* وضعیت فعال */}
        <Select
          dir="rtl"
          labelPlacement="outside"
          label="وضعیت فعال"
          selectedKeys={filters.isActive ? [filters.isActive] : []}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] as "" | "1" | "0";
            updateFilter("isActive", val ?? "");
          }}
          placeholder="انتخاب وضعیت"
        >
          <SelectItem key="">همه</SelectItem>
          <SelectItem key="1">فعال</SelectItem>
          <SelectItem key="0">غیرفعال</SelectItem>
        </Select>

        {/* تاریخ عضویت */}
        <DateRangePicker
          label="تاریخ عضویت"
          labelPlacement="outside"
          value={
            filters.createdAtRange &&
            (filters.createdAtRange.start || filters.createdAtRange.end)
              ? {
                  start:
                    filters.createdAtRange.start ?? filters.createdAtRange.end!,
                  end:
                    filters.createdAtRange.end ?? filters.createdAtRange.start!,
                }
              : undefined
          }
          onChange={(range: any) =>
            updateFilter("createdAtRange", range ?? null)
          }
        />
      </div>
    </DynamicModal>
  );
};

export default FilterUsersModal;
