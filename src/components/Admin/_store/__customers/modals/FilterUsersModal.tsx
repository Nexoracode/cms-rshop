"use client";

import { useState } from "react";
import { DateRangePicker } from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";
import { usePathname, useRouter } from "next/navigation";
import DynamicModal from "@/components/Helper/DynamicModal";
import { eqBool10, rangeDate } from "@/utils/queryFilters";
import { calToJs } from "@/utils/dateHelpers";

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
    >
      {/* محتویات مدال */}
      <div className="flex flex-col gap-6">
        {/* وضعیت فعال */}
        <div>
          <label className="block mb-2 text-sm text-default-600">وضعیت فعال</label>
          <select
            dir="rtl"
            value={filters.isActive}
            onChange={(e) => updateFilter("isActive", e.target.value as "" | "1" | "0")}
            className="w-full rounded-md border p-2"
          >
            <option value="">همه</option>
            <option value="1">فعال</option>
            <option value="0">غیرفعال</option>
          </select>
        </div>

        {/* تاریخ عضویت */}
        <DateRangePicker
          label="تاریخ عضویت"
          labelPlacement="outside"
          value={
            filters.createdAtRange &&
            (filters.createdAtRange.start || filters.createdAtRange.end)
              ? {
                  start: filters.createdAtRange.start ?? filters.createdAtRange.end!,
                  end: filters.createdAtRange.end ?? filters.createdAtRange.start!,
                }
              : undefined
          }
          onChange={(range: any) => updateFilter("createdAtRange", range ?? null)}
        />
      </div>
    </DynamicModal>
  );
};

export default FilterUsersModal;
