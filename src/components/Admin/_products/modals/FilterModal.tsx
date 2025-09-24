"use client";

import { useMemo, useState } from "react";
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
import { useGetAllCategories } from "@/hooks/categories/useCategory";
import { useGetBrands } from "@/hooks/useBrandItem";
import LabeledNumberWithUnitInput from "../__create/helpers/LabeledNumberWithUnitInput";
import { eqBool10, eqId, rangeNum, rangeDate } from "@/utils/queryFilters";
import { FiSearch } from "react-icons/fi";
import { flattenCategories } from "@/utils/flattenCategories";
// بالای فایل

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const calToJs = (c?: CalendarDate) =>
  c ? new Date(c.year, c.month - 1, c.day) : undefined;

type DiscountType = "percent" | "amount";

const FilterModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: categoriesData } = useGetAllCategories();
  const { data: brandsData } = useGetBrands();

  const flatOptions = useMemo(() => {
    return flattenCategories(categoriesData?.data);
  }, [categoriesData?.data]);

  const [filters, setFilters] = useState({
    is_visible: "" as "" | "1" | "0", // Backend: true=1, false=0
    requires_preparation: "" as "" | "1" | "0",
    category_id: "" as string | "",
    brand_id: "" as string | "",

    stockMin: "" as number | "",
    stockMax: "" as number | "",
    priceMin: "" as number | "",
    priceMax: "" as number | "",

    weightMin: "" as number | "",
    weightMax: "" as number | "",

    // تخفیف
    discountType: "percent" as DiscountType,
    discountMin: "" as number | "",
    discountMax: "" as number | "",

    // تاریخ میلادی
    createdAtRange: null as { start?: CalendarDate; end?: CalendarDate } | null,
  });

  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  // برندها
  const brandOptions =
    brandsData?.data?.map((b: any) => ({ id: b.id, title: b.name })) ?? [];

  const onApply = () => {
    const params = new URLSearchParams();
    params.set("page", "1");

    // بولین‌ها (1/0)
    eqBool10(params, "is_visible", filters.is_visible);
    eqBool10(params, "requires_preparation", filters.requires_preparation);

    // شناسه‌ها
    eqId(params, "category_id", filters.category_id);
    eqId(params, "brand_id", filters.brand_id);

    // بازه‌های عددی
    rangeNum(params, "stock", filters.stockMin, filters.stockMax);
    rangeNum(params, "price", filters.priceMin, filters.priceMax);
    rangeNum(params, "weight", filters.weightMin, filters.weightMax);

    // تخفیف (فیلد مطابق انتخاب)
    const discountField =
      filters.discountType === "percent"
        ? "discount_percent"
        : "discount_amount";
    rangeNum(params, discountField, filters.discountMin, filters.discountMax);

    const s = calToJs(filters.createdAtRange?.start);
    const e = calToJs(filters.createdAtRange?.end);
    rangeDate(params, "created_at", s, e);

    const q = params.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
    onOpenChange();
  };

  const onClear = () => {
    setFilters({
      is_visible: "",
      requires_preparation: "",
      category_id: "",
      brand_id: "",
      stockMin: "",
      stockMax: "",
      priceMin: "",
      priceMax: "",
      weightMin: "",
      weightMax: "",
      discountType: "percent",
      discountMin: "",
      discountMax: "",
      createdAtRange: null,
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
        {() => (
          <>
            <ModalHeader>
              <p className="font-normal text-[16px]">فیلتر محصولات</p>
            </ModalHeader>

            <ModalBody className="overflow-y-auto flex flex-col gap-6">
              {/* وضعیت نمایش */}
              <Select
                dir="rtl"
                labelPlacement="outside"
                label="وضعیت نمایش"
                selectedKeys={filters.is_visible ? [filters.is_visible] : []}
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as "" | "1" | "0";
                  updateFilter("is_visible", val ?? "");
                }}
                placeholder="انتخاب وضعیت"
              >
                <SelectItem key="">همه</SelectItem>
                <SelectItem key="1">نمایش</SelectItem>
                <SelectItem key="0">عدم نمایش</SelectItem>
              </Select>

              {/* نیاز به آماده‌سازی */}
              <Select
                dir="rtl"
                labelPlacement="outside"
                label="نیاز به آماده‌سازی"
                selectedKeys={
                  filters.requires_preparation
                    ? [filters.requires_preparation]
                    : []
                }
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as "" | "1" | "0";
                  updateFilter("requires_preparation", val ?? "");
                }}
                placeholder="انتخاب"
              >
                <SelectItem key="">همه</SelectItem>
                <SelectItem key="1">دارد</SelectItem>
                <SelectItem key="0">ندارد</SelectItem>
              </Select>

              {/* دسته‌بندی */}
              <Select
                dir="rtl"
                labelPlacement="outside"
                startContent={
                  <FiSearch className="text-lg pointer-events-none" />
                }
                label="دسته بندی"
                placeholder="دسته بندی موردنظر را انتخاب کنید"
                selectedKeys={
                  filters.category_id ? [String(filters.category_id)] : []
                }
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;
                  updateFilter("category_id", val ?? "");
                }}
              >
                {flatOptions.length ? (
                  flatOptions.map((opt) => (
                    <SelectItem key={String(opt.id)}>{opt.title}</SelectItem>
                  ))
                ) : (
                  <SelectItem key="-1" isDisabled>
                    آیتمی موجود نیست
                  </SelectItem>
                )}
              </Select>

              {/* برند */}
              <Select
                dir="rtl"
                label="برند"
                labelPlacement="outside"
                placeholder="انتخاب برند"
                selectedKeys={
                  filters.brand_id ? [String(filters.brand_id)] : []
                }
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;
                  updateFilter("brand_id", val ?? "");
                }}
              >
                {brandOptions.length ? (
                  brandOptions.map((opt: any) => (
                    <SelectItem key={String(opt.id)}>{opt.title}</SelectItem>
                  ))
                ) : (
                  <SelectItem key="-1" isDisabled>
                    برندی موجود نیست
                  </SelectItem>
                )}
              </Select>

              {/* موجودی */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  minValue={0}
                  size="sm"
                  value={
                    filters.stockMin === "" ? undefined : +filters.stockMin
                  }
                  onValueChange={(v) =>
                    updateFilter("stockMin", v === undefined ? "" : v)
                  }
                  label="موجودی از"
                />
                <NumberInput
                  minValue={0}
                  size="sm"
                  value={
                    filters.stockMax === "" ? undefined : +filters.stockMax
                  }
                  onValueChange={(v) =>
                    updateFilter("stockMax", v === undefined ? "" : v)
                  }
                  label="موجودی تا"
                />
              </div>

              {/* قیمت */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  minValue={0}
                  size="sm"
                  label="قیمت از (تومان)"
                  value={
                    filters.priceMin === "" ? undefined : +filters.priceMin
                  }
                  onValueChange={(v) =>
                    updateFilter("priceMin", v === undefined ? "" : v)
                  }
                />
                <NumberInput
                  minValue={0}
                  size="sm"
                  label="قیمت تا (تومان)"
                  value={
                    filters.priceMax === "" ? undefined : +filters.priceMax
                  }
                  onValueChange={(v) =>
                    updateFilter("priceMax", v === undefined ? "" : v)
                  }
                />
              </div>

              {/* وزن */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  minValue={0}
                  size="sm"
                  label="وزن از (گرم)"
                  value={
                    filters.weightMin === "" ? undefined : +filters.weightMin
                  }
                  onValueChange={(v) =>
                    updateFilter("weightMin", v === undefined ? "" : v)
                  }
                />
                <NumberInput
                  minValue={0}
                  size="sm"
                  label="وزن تا (گرم)"
                  value={
                    filters.weightMax === "" ? undefined : +filters.weightMax
                  }
                  onValueChange={(v) =>
                    updateFilter("weightMax", v === undefined ? "" : v)
                  }
                />
              </div>

              {/* تاریخ ثبت (میلادی ارسال می‌شود) */}
              <DateRangePicker
                label="تاریخ ثبت"
                labelPlacement="outside"
                value={
                  filters.createdAtRange &&
                  (filters.createdAtRange.start || filters.createdAtRange.end)
                    ? {
                        start:
                          filters.createdAtRange.start ??
                          filters.createdAtRange.end!,
                        end:
                          filters.createdAtRange.end ??
                          filters.createdAtRange.start!,
                      }
                    : undefined
                }
                onChange={(range: any) =>
                  updateFilter("createdAtRange", range ?? null)
                }
              />

              {/* تخفیف - با LabeledNumberWithUnitInput */}
              {/* «از» */}
              <LabeledNumberWithUnitInput
                label="تخفیف از"
                placeholder="10"
                value={
                  filters.discountMin === "" ? undefined : +filters.discountMin
                }
                onValueChange={(val: number | undefined) =>
                  updateFilter("discountMin", val === undefined ? "" : val)
                }
                selectedKey={filters.discountType}
                onSelectChange={(val: any) =>
                  updateFilter("discountType", val)
                }
                options={[
                  { key: "percent", title: "درصد" },
                  { key: "amount", title: "مبلغ ثابت" },
                ]}
              />
              {/* «تا» */}
              <LabeledNumberWithUnitInput
                label="تخفیف تا"
                placeholder="50"
                value={
                  filters.discountMax === "" ? undefined : +filters.discountMax
                }
                onValueChange={(val: number | undefined) =>
                  updateFilter("discountMax", val === undefined ? "" : val)
                }
                selectedKey={filters.discountType}
                onSelectChange={(val: any) =>
                  updateFilter("discountType", val)
                }
                options={[
                  { key: "percent", title: "درصد" },
                  { key: "amount", title: "مبلغ ثابت" },
                ]}
              />
            </ModalBody>

            <ModalFooter>
              <Button color="danger" onClick={onClear}>
                حذف فیلتر
              </Button>
              <Button onClick={onApply}>اعمال</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
