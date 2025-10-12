"use client";

import { useState } from "react";
import {
  Button,
  DateRangePicker,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

// همان کامپوننتی که در Product استفاده می‌کنی
import LabeledNumberWithUnitInput from "@/components/Admin/_products/__create/helpers/LabeledNumberWithUnitInput";
import PriceNumberInput from "@/components/Admin/_products/__create/helpers/PriceInput";

// همون helperهایی که در فیلتر محصولات استفاده می‌کنی
import { add, rangeNum, rangeDate } from "@/utils/queryFilters";

type Props = { isOpen: boolean; onOpenChange: () => void };
type AmountType = "percent" | "fixed";

// CalendarDate → Date (مثل محصولات)
const calToJs = (c?: CalendarDate) =>
  c ? new Date(c.year, c.month - 1, c.day) : undefined;

const FilterCouponsModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();

  // دقیقا الگوی محصولات: یک state شیء‌محور
  const [filters, setFilters] = useState({
    // بولین‌ها (swagger => true/false)
    isActive: "" as "" | "true" | "false",
    forFirstOrder: "" as "" | "true" | "false",

    // مقدار تخفیف + نوع واحد (percent/fixed)
    amountType: "percent" as AmountType,
    amountMin: "" as number | "",
    amountMax: "" as number | "",

    // حداقل مبلغ سفارش (=)
    minOrderAmountEq: "" as number | "",

    // محدودیت‌ها
    usageMin: "" as number | "",
    usageMax: "" as number | "",
    useCountMin: "" as number | "",
    useCountMax: "" as number | "",

    // تاریخ‌ها
    createdAtRange: null as { start?: CalendarDate; end?: CalendarDate } | null,
    startDateRange: null as { start?: CalendarDate; end?: CalendarDate } | null,
    endDateRange: null as { start?: CalendarDate; end?: CalendarDate } | null,
  });

  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const onApply = () => {
    // مثل محصولات: از صفر می‌سازیم
    const params = new URLSearchParams();
    params.set("page", "1");

    // بولین‌ها (true/false) → $eq:true|false
    if (filters.isActive !== "")
      add(params, "isActive", `$eq:${filters.isActive}`);
    if (filters.forFirstOrder !== "")
      add(params, "forFirstOrder", `$eq:${filters.forFirstOrder}`);

    // نوع تخفیف (percent/fixed) → filter.type=$eq:<...>
    if (filters.amountType) add(params, "type", `$eq:${filters.amountType}`);

    // مقدار تخفیف (از/تا) → filter.amount=$gte/$lte
    rangeNum(params, "amount", filters.amountMin, filters.amountMax);

    // حداقل مبلغ سفارش (=) → $eq
    if (filters.minOrderAmountEq !== "")
      add(params, "minOrderAmount", `$eq:${Number(filters.minOrderAmountEq)}`);

    // محدودیت‌ها
    rangeNum(params, "usageLimit", filters.usageMin, filters.usageMax);
    rangeNum(params, "useCount", filters.useCountMin, filters.useCountMax);

    // تاریخ‌ها (CreatedAt / StartDate / EndDate)
    const cS = calToJs(filters.createdAtRange?.start);
    const cE = calToJs(filters.createdAtRange?.end);
    rangeDate(params, "createdAt", cS, cE);

    const sS = calToJs(filters.startDateRange?.start);
    const sE = calToJs(filters.startDateRange?.end);
    rangeDate(params, "startDate", sS, sE);

    const eS = calToJs(filters.endDateRange?.start);
    const eE = calToJs(filters.endDateRange?.end);
    rangeDate(params, "endDate", eS, eE);

    const q = params.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
    onOpenChange();
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
      createdAtRange: null,
      startDateRange: null,
      endDateRange: null,
    });
    router.push(pathname);
    onOpenChange();
  };

  return (
    <Modal
      dir="rtl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
    >
      <ModalContent className="max-w-[760px] w-full">
        <>
          <ModalHeader>
            <p className="font-normal text-[16px]">فیلتر کدهای تخفیف</p>
          </ModalHeader>

          <ModalBody className="overflow-y-auto flex flex-col gap-6">
            {/* وضعیت‌ها */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                dir="rtl"
                labelPlacement="outside"
                label="وضعیت فعال بودن"
                selectedKeys={filters.isActive ? [filters.isActive] : []}
                onSelectionChange={(keys) =>
                  updateFilter(
                    "isActive",
                    (Array.from(keys)[0] as "" | "true" | "false") ?? ""
                  )
                }
                placeholder="انتخاب وضعیت"
              >
                <SelectItem key="">همه</SelectItem>
                <SelectItem key="true">فعال</SelectItem>
                <SelectItem key="false">غیرفعال</SelectItem>
              </Select>

              <Select
                dir="rtl"
                labelPlacement="outside"
                label="فقط اولین سفارش"
                selectedKeys={
                  filters.forFirstOrder ? [filters.forFirstOrder] : []
                }
                onSelectionChange={(keys) =>
                  updateFilter(
                    "forFirstOrder",
                    (Array.from(keys)[0] as "" | "true" | "false") ?? ""
                  )
                }
                placeholder="انتخاب"
              >
                <SelectItem key="">همه</SelectItem>
                <SelectItem key="true">بله</SelectItem>
                <SelectItem key="false">خیر</SelectItem>
              </Select>
            </div>

            {/* مقدار تخفیف از/تا + نوع (percent/fixed) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LabeledNumberWithUnitInput
                label="مقدار تخفیف از"
                placeholder={
                  filters.amountType === "percent" ? "مثلاً 10" : "مثلاً 5,000"
                }
                value={
                  filters.amountMin === "" ? undefined : +filters.amountMin
                }
                onValueChange={(v: number | undefined) =>
                  updateFilter("amountMin", v === undefined ? "" : v)
                }
                selectedKey={filters.amountType}
                onSelectChange={(val: any) => updateFilter("amountType", val)}
                options={[
                  { key: "percent", title: "درصد" },
                  { key: "fixed", title: "مبلغ ثابت" },
                ]}
              />

              <LabeledNumberWithUnitInput
                label="مقدار تخفیف تا"
                placeholder={
                  filters.amountType === "percent" ? "مثلاً 50" : "مثلاً 80,000"
                }
                value={
                  filters.amountMax === "" ? undefined : +filters.amountMax
                }
                onValueChange={(v: number | undefined) =>
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

            {/* حداقل مبلغ سفارش (=) با PriceNumberInput */}
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
              placeholder="10,000"
              suffix="تومان"
              isRequired={false}
            />

            {/* محدودیت‌ها */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberInput
                minValue={0}
                size="sm"
                label="محدودیت تعداد (از)"
                value={filters.usageMin === "" ? undefined : +filters.usageMin}
                onValueChange={(v) =>
                  updateFilter("usageMin", v === undefined ? "" : v)
                }
              />
              <NumberInput
                minValue={0}
                size="sm"
                label="محدودیت تعداد (تا)"
                value={filters.usageMax === "" ? undefined : +filters.usageMax}
                onValueChange={(v) =>
                  updateFilter("usageMax", v === undefined ? "" : v)
                }
              />

              <NumberInput
                minValue={0}
                size="sm"
                label="تعداد استفاده شده (از)"
                value={
                  filters.useCountMin === "" ? undefined : +filters.useCountMin
                }
                onValueChange={(v) =>
                  updateFilter("useCountMin", v === undefined ? "" : v)
                }
              />
              <NumberInput
                minValue={0}
                size="sm"
                label="تعداد استفاده شده (تا)"
                value={
                  filters.useCountMax === "" ? undefined : +filters.useCountMax
                }
                onValueChange={(v) =>
                  updateFilter("useCountMax", v === undefined ? "" : v)
                }
              />
            </div>

            <DateRangePicker
              label="شروع اعتبار"
              labelPlacement="outside"
              value={
                filters.startDateRange &&
                (filters.startDateRange.start || filters.startDateRange.end)
                  ? {
                      start:
                        filters.startDateRange.start ??
                        filters.startDateRange.end!,
                      end:
                        filters.startDateRange.end ??
                        filters.startDateRange.start!,
                    }
                  : undefined
              }
              onChange={(range: any) =>
                updateFilter("startDateRange", range ?? null)
              }
            />
            <DateRangePicker
              label="پایان اعتبار"
              labelPlacement="outside"
              value={
                filters.endDateRange &&
                (filters.endDateRange.start || filters.endDateRange.end)
                  ? {
                      start:
                        filters.endDateRange.start ?? filters.endDateRange.end!,
                      end:
                        filters.endDateRange.end ?? filters.endDateRange.start!,
                    }
                  : undefined
              }
              onChange={(range: any) =>
                updateFilter("endDateRange", range ?? null)
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClear}>
              حذف فیلتر
            </Button>
            <Button color="secondary" onPress={onApply}>
              اعمال
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default FilterCouponsModal;
