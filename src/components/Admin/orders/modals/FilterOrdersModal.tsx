"use client";

import { useState } from "react";
import { Select, SelectItem, DateRangePicker } from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import DynamicModal from "@/components/ui/modals/Modal";
import { eqId, rangeDate } from "@/utils/queryFilters";
import { TbFilter } from "react-icons/tb";
import { calToJs } from "@/utils/dateHelpers";

type Props = { isOpen: boolean; onOpenChange: (open: boolean) => void };

const STATUS_OPTIONS = [
  { key: "", label: "همه وضعیت‌ها" },
  { key: "pending", label: "در انتظار" },
  { key: "paid", label: "پرداخت‌شده" },
  { key: "processing", label: "در حال پردازش" },
  { key: "shipped", label: "ارسال‌شده" },
  { key: "delivered", label: "تحویل‌شده" },
  { key: "canceled", label: "لغو‌شده" },
];

const FilterOrdersModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<{
    status: string;
    createdAtRange: { start?: CalendarDate; end?: CalendarDate } | null;
  }>({
    status: "",
    createdAtRange: null,
  });

  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const onApply = () => {
    // از URL فعلی شروع می‌کنیم → فقط filter.* قبلی پاک می‌شوند
    const params = new URLSearchParams(searchParams.toString());

    // پاک‌کردن همه فیلترهای قبلی
    for (const [k] of Array.from(params.entries())) {
      if (k.startsWith("filter.")) params.delete(k);
    }

    // status → $eq
    eqId(params, "status", filters.status || "");

    // createdAt → $gte/$lte/$btw
    const s = calToJs(filters.createdAtRange?.start);
    const e = calToJs(filters.createdAtRange?.end);
    rangeDate(params, "createdAt", s, e);

    // reset page
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    onOpenChange(false);
  };

  const onClear = () => {
    setFilters({ status: "", createdAtRange: null });

    const params = new URLSearchParams(searchParams.toString());
    for (const [k] of Array.from(params.entries())) {
      if (k.startsWith("filter.")) params.delete(k);
    }
    // صفحه رو هم برگردونیم به ۱ (دلخواه)
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
    onOpenChange(false);
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="فیلتر سفارش‌ها"
      confirmText="اعمال"
      cancelText="حذف فیلتر"
      onConfirm={onApply}
      onCancel={onClear}
      confirmColor="secondary"
      confirmVariant="solid"
      size="md"
      icon={<TbFilter className="text-2xl" />}
    >
      <div className="flex flex-col gap-6">
        <Select
          label="وضعیت سفارش"
          labelPlacement="outside"
          placeholder="انتخاب وضعیت"
          selectedKeys={filters.status ? [filters.status] : []}
          onSelectionChange={(keys) =>
            updateFilter("status", (Array.from(keys)[0] as string) ?? "")
          }
        >
          {STATUS_OPTIONS.map((o) => (
            <SelectItem key={o.key}>{o.label}</SelectItem>
          ))}
        </Select>

        <DateRangePicker
          label="تاریخ ثبت سفارش"
          labelPlacement="outside"
          // اگر فقط یکی از دو طرف را انتخاب کنند هم مشکلی نیست
          value={
            filters.createdAtRange &&
            (filters.createdAtRange.start || filters.createdAtRange.end)
              ? {
                  start: filters.createdAtRange.start ?? filters.createdAtRange.end!,
                  end: filters.createdAtRange.end ?? filters.createdAtRange.start!,
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

export default FilterOrdersModal;
