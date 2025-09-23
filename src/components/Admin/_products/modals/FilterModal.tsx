"use client";

import { useMemo, useState } from "react";
import {
  Button,
  DateRangePicker,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";
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
import { Category } from "../__categories/category-types";
import LabeledNumberWithUnitInput from "../__create/helpers/LabeledNumberWithUnitInput";
import { eqBool10, eqId, rangeNum, rangeDate } from "@/utils/queryFilters";
import { FiSearch } from "react-icons/fi";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const FilterModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: categoriesData } = useGetAllCategories();
  const { data: brandsData } = useGetBrands();

  const flatOptions = useMemo(() => {
    const result: { id: number; title: string }[] = [];

    // تبدیل تابع به متغیر
    const traverse = (list: Category[], depth = 0) => {
      list.forEach((cat) => {
        result.push({
          id: cat.id,
          title: `${"  ".repeat(depth)}${cat.title}`,
        });
        if (cat.children && cat.children.length) {
          traverse(cat.children, depth + 1);
        }
      });
    };

    if (categoriesData?.data) {
      traverse(categoriesData.data);
    }

    return result;
  }, [categoriesData]);

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
    discountType: "percent" as any,
    discountMin: "" as number | "",
    discountMax: "" as number | "",

    // تاریخ میلادی
    createdAtRange: null as { start?: Date; end?: Date } | null,
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

    // تاریخ میلادی (gte/lte یا btw)
    rangeDate(
      params,
      "created_at",
      filters.createdAtRange?.start,
      filters.createdAtRange?.end
    );

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
                labelPlacement="outside"
                startContent={
                  <FiSearch className="text-lg pointer-events-none" />
                }
                label="دسته بندی"
                placeholder="دسته بندی موردنظر را انتخاب کنید"
                selectedKeys={[String(0)]}
                onChange={(e) => {}}
              >
                {flatOptions.length ? (
                  flatOptions.map((opt) => (
                    <SelectItem key={opt.id}>{opt.title}</SelectItem>
                  ))
                ) : (
                  <SelectItem isDisabled>آیتمی موجود نیست</SelectItem>
                )}
              </Select>

              {/* برند */}
              <Select
                dir="rtl"
                label="برند"
                placeholder="انتخاب برند"
                selectedKeys={filters.brand_id ? [filters.brand_id] : []}
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
                  label="موجودی از"
                  labelPlacement="outside"
                  value={
                    filters.stockMin === "" ? undefined : +filters.stockMin
                  }
                  onValueChange={(v) =>
                    updateFilter("stockMin", v === undefined ? "" : v)
                  }
                  placeholder="حداقل موجودی"
                />
                <NumberInput
                  minValue={0}
                  label="موجودی تا"
                  labelPlacement="outside"
                  value={
                    filters.stockMax === "" ? undefined : +filters.stockMax
                  }
                  onValueChange={(v) =>
                    updateFilter("stockMax", v === undefined ? "" : v)
                  }
                  placeholder="حداکثر موجودی"
                />
              </div>

              {/* قیمت */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <NumberInput
                  minValue={0}
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
                  label="وزن از (kg)"
                  value={
                    filters.weightMin === "" ? undefined : +filters.weightMin
                  }
                  onValueChange={(v) =>
                    updateFilter("weightMin", v === undefined ? "" : v)
                  }
                />
                <NumberInput
                  minValue={0}
                  label="وزن تا (kg)"
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
                onChange={(range: any) => {
                  if (!range) return updateFilter("createdAtRange", null);
                  // heroui ممکن است Date یا {start,end} بدهد
                  if (range.start || range.end) {
                    updateFilter("createdAtRange", {
                      start: range.start ? new Date(range.start) : undefined,
                      end: range.end ? new Date(range.end) : undefined,
                    });
                  } else if (Array.isArray(range)) {
                    const [s, e] = range;
                    updateFilter("createdAtRange", {
                      start: s ? new Date(s) : undefined,
                      end: e ? new Date(e) : undefined,
                    });
                  }
                }}
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
                onSelectChange={(val: "percent" | "amount") =>
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
                onSelectChange={(val: "percent" | "amount") =>
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
