"use client";

import { useState } from "react";
import { NumberInput, Select, SelectItem, DatePicker } from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";
import { usePathname, useRouter } from "next/navigation";

import DynamicModal from "@/components/ui/modals/Modal";
import NumberWithSelect from "@/components/forms/Inputs/NumberWithSelect";
import PriceNumberInput from "@/components/ui/inputs/NumberInput";
import { eqBool10, add, rangeNum, rangeDate } from "@/utils/queryFilters";
import { TbFilter } from "react-icons/tb";
import { calToJs } from "@/utils/dateHelpers";

type Props = { isOpen: boolean; onOpenChange: (open: boolean) => void };
type AmountType = "percent" | "fixed";

const FilterCouponsModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    // بولین‌ها (۰/۱)
    isActive: "" as "" | "1" | "0",
    forFirstOrder: "" as "" | "1" | "0",

    // نوع و مقدار تخفیف
    amountType: "percent" as AmountType,
    amountMin: "" as number | "",
    amountMax: "" as number | "",

    // حداقل مبلغ سفارش
    minOrderAmountEq: "" as number | "",

    // محدودیت‌ها
    usageMin: "" as number | "",
    usageMax: "" as number | "",
    useCountMin: "" as number | "",
    useCountMax: "" as number | "",

    // تاریخ‌ها (هرکدام اختیاری)
    startDate: null as CalendarDate | null,
    endDate: null as CalendarDate | null,
  });

  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const onApply = () => {
    const params = new URLSearchParams();
    params.set("page", "1");

    // بولین‌ها
    eqBool10(params, "isActive", filters.isActive);
    eqBool10(params, "forFirstOrder", filters.forFirstOrder);

    // نوع تخفیف
    if (filters.amountType) add(params, "type", `$eq:${filters.amountType}`);

    // مقدار تخفیف از/تا
    rangeNum(params, "amount", filters.amountMin, filters.amountMax);

    // حداقل مبلغ سفارش
    if (filters.minOrderAmountEq !== "")
      add(params, "minOrderAmount", `$eq:${Number(filters.minOrderAmountEq)}`);

    // محدودیت‌ها
    rangeNum(params, "usageLimit", filters.usageMin, filters.usageMax);
    rangeNum(params, "useCount", filters.useCountMin, filters.useCountMax);

    // تاریخ‌ها (هرکدام مستقل)
    const s = calToJs(filters.startDate ?? undefined);
    const e = calToJs(filters.endDate ?? undefined);
    if (s) rangeDate(params, "startDate", s, undefined);
    if (e) rangeDate(params, "endDate", undefined, e);

    const q = params.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
    onOpenChange(false);
  };

  const onClear = () => {
    setFilters({
      isActive: "",
      forFirstOrder: "",
      amountType: "percent",
      amountMin: "",
      amountMax: "",
      minOrderAmountEq: "",
      usageMin: "",
      usageMax: "",
      useCountMin: "",
      useCountMax: "",
      startDate: null,
      endDate: null,
    });
    router.push(pathname);
    onOpenChange(false);
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="فیلتر کدهای تخفیف"
      confirmText="اعمال"
      cancelText="حذف فیلتر"
      confirmColor="secondary"
      confirmVariant="solid"
      onConfirm={onApply}
      onCancel={onClear}
      size="lg"
      icon={<TbFilter className="text-2xl" />}
    >
      <div className="flex flex-col gap-6">
        {/* وضعیت‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="وضعیت فعال بودن"
            labelPlacement="outside"
            placeholder="انتخاب وضعیت"
            selectedKeys={filters.isActive ? [filters.isActive] : []}
            onSelectionChange={(keys) =>
              updateFilter(
                "isActive",
                (Array.from(keys)[0] as "" | "1" | "0") ?? ""
              )
            }
          >
            <SelectItem key="">همه</SelectItem>
            <SelectItem key="1">فعال</SelectItem>
            <SelectItem key="0">غیرفعال</SelectItem>
          </Select>

          <Select
            label="فقط اولین سفارش"
            labelPlacement="outside"
            placeholder="انتخاب وضعیت"
            selectedKeys={filters.forFirstOrder ? [filters.forFirstOrder] : []}
            onSelectionChange={(keys) =>
              updateFilter(
                "forFirstOrder",
                (Array.from(keys)[0] as "" | "1" | "0") ?? ""
              )
            }
          >
            <SelectItem key="">همه</SelectItem>
            <SelectItem key="1">بله</SelectItem>
            <SelectItem key="0">خیر</SelectItem>
          </Select>
        </div>

        {/* مقدار تخفیف از/تا */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberWithSelect
            label="مقدار تخفیف از"
            placeholder={
              filters.amountType === "percent" ? "مثلاً 10" : "مثلاً 5,000"
            }
            value={filters.amountMin === "" ? undefined : +filters.amountMin}
            onValueChange={(v) =>
              updateFilter("amountMin", v === undefined ? "" : v)
            }
            selectedKey={filters.amountType}
            onSelectChange={(val: any) => updateFilter("amountType", val)}
            options={[
              { key: "percent", title: "درصد" },
              { key: "fixed", title: "مبلغ ثابت" },
            ]}
          />

          <NumberWithSelect
            label="مقدار تخفیف تا"
            placeholder={
              filters.amountType === "percent" ? "مثلاً 50" : "مثلاً 80,000"
            }
            value={filters.amountMax === "" ? undefined : +filters.amountMax}
            onValueChange={(v) =>
              updateFilter("amountMax", v === undefined ? "" : v)
            }
            selectedKey={filters.amountType}
            onSelectChange={(val: any) => updateFilter("amountType", val)}
            options={[
              { key: "percent", title: "درصد" },
              { key: "fixed", title: "مبلغ ثابت" },
            ]}
          />
        </div>

        {/* حداقل مبلغ سفارش */}
        <PriceNumberInput
          value={
            filters.minOrderAmountEq === ""
              ? undefined
              : Number(filters.minOrderAmountEq)
          }
          onChange={(v: number | undefined) =>
            updateFilter("minOrderAmountEq", v === undefined ? "" : v)
          }
          label="حداقل مبلغ سفارش"
          placeholder="مثلاً 10,000"
          suffix="تومان"
          isRequired={false}
        />

        {/* محدودیت‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput
            hideStepper
            minValue={0}
            size="sm"
            label="محدودیت تعداد (از)"
            value={filters.usageMin === "" ? undefined : +filters.usageMin}
            onValueChange={(v) =>
              updateFilter("usageMin", v === undefined ? "" : v)
            }
          />
          <NumberInput
            hideStepper
            minValue={0}
            size="sm"
            label="محدودیت تعداد (تا)"
            value={filters.usageMax === "" ? undefined : +filters.usageMax}
            onValueChange={(v) =>
              updateFilter("usageMax", v === undefined ? "" : v)
            }
          />

          <NumberInput
            hideStepper
            minValue={0}
            size="sm"
            label="تعداد استفاده‌شده (از)"
            value={
              filters.useCountMin === "" ? undefined : +filters.useCountMin
            }
            onValueChange={(v) =>
              updateFilter("useCountMin", v === undefined ? "" : v)
            }
          />
          <NumberInput
            hideStepper
            minValue={0}
            size="sm"
            label="تعداد استفاده‌شده (تا)"
            value={
              filters.useCountMax === "" ? undefined : +filters.useCountMax
            }
            onValueChange={(v) =>
              updateFilter("useCountMax", v === undefined ? "" : v)
            }
          />
        </div>

        {/* تاریخ‌ها (اختیاری و مستقل) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker
            label="تاریخ شروع اعتبار"
            labelPlacement="outside"
            showMonthAndYearPickers
            variant="bordered"
            value={filters.startDate ?? undefined}
            onChange={(val: any) => updateFilter("startDate", val ?? null)}
          />

          <DatePicker
            label="تاریخ پایان اعتبار"
            labelPlacement="outside"
            showMonthAndYearPickers
            variant="bordered"
            value={filters.endDate ?? undefined}
            onChange={(val: any) => updateFilter("endDate", val ?? null)}
          />
        </div>
      </div>
    </DynamicModal>
  );
};

export default FilterCouponsModal;
