"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Input,
  DateRangePicker,
} from "@heroui/react";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// اگر از LabeledNumberWithUnitInput یا utilهای eqBool10/rangeNum/... خواستی استفاده کنی هم میشه.
// این نسخه مستقل و تمیزه.

type Props = { isOpen: boolean; onOpenChange: () => void };

const boolOptions = [
  { key: "true", label: "بله" },
  { key: "false", label: "خیر" },
];

const typeOptions = [
  { key: "percent", label: "درصدی" },
  { key: "fixed", label: "مبلغ ثابت" },
];

// DateRangePicker مقدار calendar-like می‌دهد؛ این کمک‌کننده‌ها به ISO تبدیل می‌کنند:
const toISO = (val?: string) => (val ? new Date(val).toISOString() : "");
const toRangeValue = (from?: string, to?: string) =>
  from || to
    ? {
        start: from ? new Date(from) : new Date(to as string),
        end: to ? new Date(to) : new Date(from as string),
      }
    : undefined;

const FilterCouponsModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // مقادیر فعلی (برای Prefill)
  const preset = useMemo(() => {
    const allOf = (k: string) => searchParams.getAll(k);
    const oneEq = (k: string) =>
      allOf(k)
        .find((x) => x.startsWith("$eq:"))
        ?.split(":")[1] ?? "";

    const fromTo = (k: string) => {
      const arr = allOf(k);
      const gte = arr.find((x) => x.startsWith("$gte:"))?.split(":")[1] ?? "";
      const lte = arr.find((x) => x.startsWith("$lte:"))?.split(":")[1] ?? "";
      return { gte, lte };
    };

    return {
      isActive: oneEq("filter.isActive"),
      forFirstOrder: oneEq("filter.forFirstOrder"),
      type: oneEq("filter.type"),
      amount: fromTo("filter.amount"),
      minOrderAmountEq: oneEq("filter.minOrderAmount"),
      usageLimit: fromTo("filter.usageLimit"),
      useCount: fromTo("filter.useCount"),
      createdAt: fromTo("filter.createdAt"),
      startDate: fromTo("filter.startDate"),
      endDate: fromTo("filter.endDate"),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.toString()]);

  // state محلی فرم
  const [isActive, setIsActive] = useState<string>(preset.isActive);
  const [forFirstOrder, setForFirstOrder] = useState<string>(
    preset.forFirstOrder
  );
  const [type, setType] = useState<string>(preset.type);

  const [amountGte, setAmountGte] = useState<string>(preset.amount.gte);
  const [amountLte, setAmountLte] = useState<string>(preset.amount.lte);

  const [minOrderAmountEq, setMinOrderAmountEq] = useState<string>(
    preset.minOrderAmountEq
  );

  const [usageGte, setUsageGte] = useState<string>(preset.usageLimit.gte);
  const [usageLte, setUsageLte] = useState<string>(preset.usageLimit.lte);

  const [useCountGte, setUseCountGte] = useState<string>(preset.useCount.gte);
  const [useCountLte, setUseCountLte] = useState<string>(preset.useCount.lte);

  // ورودی تاریخ‌ها را به شکل date/time می‌گیریم و در apply به ISO می‌فرستیم
  const [createdFrom, setCreatedFrom] = useState<string>("");
  const [createdTo, setCreatedTo] = useState<string>("");

  const [startFrom, setStartFrom] = useState<string>("");
  const [startTo, setStartTo] = useState<string>("");

  const [endFrom, setEndFrom] = useState<string>("");
  const [endTo, setEndTo] = useState<string>("");

  const build = () => {
    const p = new URLSearchParams(searchParams.toString());

    // پاک‌کردن تمام filter.* قبلی
    for (const [k] of Array.from(p.entries())) {
      if (k.startsWith("filter.")) p.delete(k);
    }

    const appendIf = (k: string, v?: string) => {
      if (v && v.trim() !== "") p.append(k, v.trim());
    };

    // boolean & type
    if (isActive) appendIf("filter.isActive", `$eq:${isActive}`);
    if (forFirstOrder) appendIf("filter.forFirstOrder", `$eq:${forFirstOrder}`);
    if (type) appendIf("filter.type", `$eq:${type}`);

    // amount
    if (amountGte) appendIf("filter.amount", `$gte:${amountGte}`);
    if (amountLte) appendIf("filter.amount", `$lte:${amountLte}`);

    // minOrderAmount = (eq)
    if (minOrderAmountEq)
      appendIf("filter.minOrderAmount", `$eq:${minOrderAmountEq}`);

    // usageLimit
    if (usageGte) appendIf("filter.usageLimit", `$gte:${usageGte}`);
    if (usageLte) appendIf("filter.usageLimit", `$lte:${usageLte}`);

    // useCount
    if (useCountGte) appendIf("filter.useCount", `$gte:${useCountGte}`);
    if (useCountLte) appendIf("filter.useCount", `$lte:${useCountLte}`);

    // createdAt / startDate / endDate → ISO
    const createdFromISO = toISO(createdFrom);
    const createdToISO = toISO(createdTo);
    if (createdFromISO) appendIf("filter.createdAt", `$gte:${createdFromISO}`);
    if (createdToISO) appendIf("filter.createdAt", `$lte:${createdToISO}`);

    const startFromISO = toISO(startFrom);
    const startToISO = toISO(startTo);
    if (startFromISO) appendIf("filter.startDate", `$gte:${startFromISO}`);
    if (startToISO) appendIf("filter.startDate", `$lte:${startToISO}`);

    const endFromISO = toISO(endFrom);
    const endToISO = toISO(endTo);
    if (endFromISO) appendIf("filter.endDate", `$gte:${endFromISO}`);
    if (endToISO) appendIf("filter.endDate", `$lte:${endToISO}`);

    // reset page
    p.set("page", "1");
    return p;
  };

  const onApply = () => {
    const p = build();
    router.push(`${pathname}?${p.toString()}`);
    onOpenChange();
  };

  const onClear = () => {
    const p = new URLSearchParams(searchParams.toString());
    for (const [k] of Array.from(p.entries())) {
      if (k.startsWith("filter.")) p.delete(k);
    }
    p.set("page", "1");
    router.push(`${pathname}?${p.toString()}`);
    onOpenChange();
  };

  return (
    <Modal
      dir="rtl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
    >
      <ModalContent>
        <ModalHeader>فیلتر کدهای تخفیف</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          {/* Boolean & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Select
              label="فعال باشد؟"
              variant="bordered"
              selectedKeys={isActive ? [isActive] : []}
              onSelectionChange={(keys) =>
                setIsActive(Array.from(keys)[0] as string)
              }
            >
              <SelectItem key="">همه</SelectItem>
              {boolOptions.map((o: any) => (
                <SelectItem key={o.key}>{o.label}</SelectItem>
              ))}
            </Select>

            <Select
              label="فقط اولین سفارش؟"
              variant="bordered"
              selectedKeys={forFirstOrder ? [forFirstOrder] : []}
              onSelectionChange={(keys) =>
                setForFirstOrder(Array.from(keys)[0] as string)
              }
            >
              <SelectItem key="">همه</SelectItem>
              {boolOptions.map((o) => (
                <SelectItem key={o.key}>{o.label}</SelectItem>
              ))}
            </Select>

            <Select
              label="نوع تخفیف"
              variant="bordered"
              selectedKeys={type ? [type] : []}
              onSelectionChange={(keys) =>
                setType(Array.from(keys)[0] as string)
              }
            >
              <SelectItem key="">همه</SelectItem>
              {typeOptions.map((o) => (
                <SelectItem key={o.key}>{o.label}</SelectItem>
              ))}
            </Select>
          </div>

          {/* Amount & MinOrderAmount */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              type="number"
              label="Amount ≥"
              variant="bordered"
              value={amountGte}
              onValueChange={setAmountGte}
              min={0}
            />
            <Input
              type="number"
              label="Amount ≤"
              variant="bordered"
              value={amountLte}
              onValueChange={setAmountLte}
              min={0}
            />
            <Input
              type="number"
              label="Min Order Amount (=)"
              variant="bordered"
              value={minOrderAmountEq}
              onValueChange={setMinOrderAmountEq}
              min={0}
            />
          </div>

          {/* UsageLimit & UseCount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                label="Usage Limit ≥"
                variant="bordered"
                value={usageGte}
                onValueChange={setUsageGte}
                min={0}
              />
              <Input
                type="number"
                label="Usage Limit ≤"
                variant="bordered"
                value={usageLte}
                onValueChange={setUsageLte}
                min={0}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                label="Use Count ≥"
                variant="bordered"
                value={useCountGte}
                onValueChange={setUseCountGte}
                min={0}
              />
              <Input
                type="number"
                label="Use Count ≤"
                variant="bordered"
                value={useCountLte}
                onValueChange={setUseCountLte}
                min={0}
              />
            </div>
          </div>

          {/* Ranges: CreatedAt / StartDate / EndDate */}
          <DateRangePicker
            label="Created At (از/تا)"
            labelPlacement="outside"
            value={toRangeValue(preset.createdAt.gte, preset.createdAt.lte)}
            onChange={(range: any) => {
              setCreatedFrom(
                range?.start ? new Date(range.start).toISOString() : ""
              );
              setCreatedTo(range?.end ? new Date(range.end).toISOString() : "");
            }}
          />
          <DateRangePicker
            label="Start Date (از/تا)"
            labelPlacement="outside"
            value={toRangeValue(preset.startDate.gte, preset.startDate.lte)}
            onChange={(range: any) => {
              setStartFrom(
                range?.start ? new Date(range.start).toISOString() : ""
              );
              setStartTo(range?.end ? new Date(range.end).toISOString() : "");
            }}
          />
          <DateRangePicker
            label="End Date (از/تا)"
            labelPlacement="outside"
            value={toRangeValue(preset.endDate.gte, preset.endDate.lte)}
            onChange={(range: any) => {
              setEndFrom(
                range?.start ? new Date(range.start).toISOString() : ""
              );
              setEndTo(range?.end ? new Date(range.end).toISOString() : "");
            }}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="flat" onPress={onClear}>
            حذف فیلترها
          </Button>
          <Button color="secondary" onPress={onApply}>
            اعمال فیلتر
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterCouponsModal;
