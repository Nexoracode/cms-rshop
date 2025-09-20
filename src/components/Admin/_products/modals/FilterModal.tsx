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
import { Category } from "../__categories/category-types";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const FilterModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: categoriesData } = useGetAllCategories();

  const [filters, setFilters] = useState({
    is_visible: "" as "" | "true" | "false",
    stockMin: "" as number | "",
    stockMax: "" as number | "",
    category_id: "" as string | "",
    priceMin: "" as number | "",
    priceMax: "" as number | "",
    discountMin: "" as number | "",
    discountMax: "" as number | "",
    weightMin: "" as number | "",
    weightMax: "" as number | "",
    requires_preparation: "" as "" | "true" | "false",
    createdAtRange: null as { start?: string; end?: string } | null,
  });

  // فلت کردن دسته‌ها
  const flatOptions = useMemo(() => {
    const result: { id: number; title: string }[] = [];
    const traverse = (list: Category[], depth = 0) => {
      list.forEach((cat) => {
        result.push({
          id: cat.id,
          title: `${"  ".repeat(depth)}${cat.title}`,
        });
        if (cat.children?.length) {
          traverse(cat.children, depth + 1);
        }
      });
    };
    if (categoriesData?.data) traverse(categoriesData.data);
    return result;
  }, [categoriesData]);

  // آپدیت استیت فیلترها
  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const appendFilter = (
    params: URLSearchParams,
    key: string,
    op: "eq" | "gt" | "lt" | "gte" | "lte",
    value: string | number | boolean
  ) => {
    const val = typeof value === "boolean" ? String(value) : value;
    params.append(`filter.${key}`, `$${op}:${val}`);
  };

  const onApply = () => {
    const params = new URLSearchParams();
    params.set("page", "1");

    if (filters.is_visible) {
      appendFilter(
        params,
        "is_visible",
        "eq",
        filters.is_visible === "true" ? "true" : "false"
      );
    }

    if (filters.stockMin !== "")
      appendFilter(params, "stock", "gt", Number(filters.stockMin));
    if (filters.stockMax !== "")
      appendFilter(params, "stock", "lt", Number(filters.stockMax));

    if (filters.category_id)
      appendFilter(params, "category_id", "eq", filters.category_id);

    if (filters.priceMin !== "")
      appendFilter(params, "price", "gt", Number(filters.priceMin));
    if (filters.priceMax !== "")
      appendFilter(params, "price", "lt", Number(filters.priceMax));

    if (filters.discountMin !== "")
      appendFilter(params, "discount", "gt", Number(filters.discountMin));
    if (filters.discountMax !== "")
      appendFilter(params, "discount", "lt", Number(filters.discountMax));

    if (filters.weightMin !== "")
      appendFilter(params, "weight", "gt", Number(filters.weightMin));
    if (filters.weightMax !== "")
      appendFilter(params, "weight", "lt", Number(filters.weightMax));

    if (filters.requires_preparation) {
      appendFilter(
        params,
        "requires_preparation",
        "eq",
        filters.requires_preparation === "true"
      );
    }

    // createdAt → created_at
    if (filters.createdAtRange?.start)
      appendFilter(params, "created_at", "gte", filters.createdAtRange.start);
    if (filters.createdAtRange?.end)
      appendFilter(params, "created_at", "lte", filters.createdAtRange.end);

    const q = params.toString();
    const url = q ? `${pathname}?${q}` : pathname;
    router.push(url);
    onOpenChange();
  };

  // پاک کردن همه فیلترها
  const onClear = () => {
    setFilters({
      is_visible: "",
      stockMin: "",
      stockMax: "",
      category_id: "",
      priceMin: "",
      priceMax: "",
      discountMin: "",
      discountMax: "",
      weightMin: "",
      weightMax: "",
      requires_preparation: "",
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
      <ModalContent className="max-w-[700px] w-full">
        {() => (
          <>
            <ModalHeader>
              <p className="font-normal text-[16px]">فیلتر محصولات</p>
            </ModalHeader>

            <ModalBody className="overflow-y-auto flex flex-col gap-6">
              <Select
                dir="rtl"
                labelPlacement="outside"
                label="وضعیت نمایش"
                selectedKeys={filters.is_visible ? [filters.is_visible] : []}
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as "" | "true" | "false";
                  updateFilter("is_visible", val ?? "");
                }}
                placeholder="انتخاب وضعیت"
              >
                <SelectItem key="">همه</SelectItem>
                <SelectItem key="true">نمایش</SelectItem>
                <SelectItem key="false">عدم نمایش</SelectItem>
              </Select>

              <NumberInput
                minValue={0}
                label="موجودی از"
                labelPlacement="outside"
                value={filters.stockMin === "" ? undefined : +filters.stockMin}
                onValueChange={(v) =>
                  updateFilter("stockMin", v === undefined ? "" : v)
                }
                placeholder="حداقل موجودی"
              />
              <NumberInput
                minValue={0}
                label="موجودی تا"
                labelPlacement="outside"
                value={filters.stockMax === "" ? undefined : +filters.stockMax}
                onValueChange={(v) =>
                  updateFilter("stockMax", v === undefined ? "" : v)
                }
                placeholder="حداکثر موجودی"
              />

              <Select
                dir="rtl"
                label="دسته بندی"
                placeholder="انتخاب دسته بندی"
                selectedKeys={filters.category_id ? [filters.category_id] : []}
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;
                  updateFilter("category_id", val ?? "");
                }}
              >
                {categoriesData?.data && categoriesData.data.length ? (
                  flatOptions.map((opt) => (
                    <SelectItem key={String(opt.id)}>{opt.title}</SelectItem>
                  ))
                ) : (
                  <SelectItem key="-1" isDisabled>
                    دسته‌بندی وجود ندارد
                  </SelectItem>
                )}
              </Select>

              <DateRangePicker
                label="تاریخ ثبت"
                labelPlacement="outside"
                onChange={(range: any) => {
                  if (!range) {
                    updateFilter("createdAtRange", null);
                    return;
                  }
                  if (range.start || range.end) {
                    updateFilter("createdAtRange", {
                      start: range.start
                        ? new Date(range.start).toISOString()
                        : undefined,
                      end: range.end
                        ? new Date(range.end).toISOString()
                        : undefined,
                    });
                  } else if (Array.isArray(range)) {
                    const [s, e] = range;
                    updateFilter("createdAtRange", {
                      start: s ? new Date(s).toISOString() : undefined,
                      end: e ? new Date(e).toISOString() : undefined,
                    });
                  }
                }}
              />

              <div className="flex gap-4">
                <NumberInput
                  label="قیمت از (تومان)"
                  value={
                    filters.priceMin === "" ? undefined : +filters.priceMin
                  }
                  onValueChange={(v) =>
                    updateFilter("priceMin", v === undefined ? "" : v)
                  }
                />
                <NumberInput
                  label="قیمت تا (تومان)"
                  value={
                    filters.priceMax === "" ? undefined : +filters.priceMax
                  }
                  onValueChange={(v) =>
                    updateFilter("priceMax", v === undefined ? "" : v)
                  }
                />
              </div>

              <div className="flex gap-4">
                <NumberInput
                  label="تخفیف از (%)"
                  value={
                    filters.discountMin === ""
                      ? undefined
                      : +filters.discountMin
                  }
                  onValueChange={(v) =>
                    updateFilter("discountMin", v === undefined ? "" : v)
                  }
                />
                <NumberInput
                  label="تخفیف تا (%)"
                  value={
                    filters.discountMax === ""
                      ? undefined
                      : +filters.discountMax
                  }
                  onValueChange={(v) =>
                    updateFilter("discountMax", v === undefined ? "" : v)
                  }
                />
              </div>

              <div className="flex gap-4">
                <NumberInput
                  label="وزن از (kg)"
                  value={
                    filters.weightMin === "" ? undefined : +filters.weightMin
                  }
                  onValueChange={(v) =>
                    updateFilter("weightMin", v === undefined ? "" : v)
                  }
                />
                <NumberInput
                  label="وزن تا (kg)"
                  value={
                    filters.weightMax === "" ? undefined : +filters.weightMax
                  }
                  onValueChange={(v) =>
                    updateFilter("weightMax", v === undefined ? "" : v)
                  }
                />
              </div>

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
                  const val = Array.from(keys)[0] as "" | "true" | "false";
                  updateFilter("requires_preparation", val ?? "");
                }}
                placeholder="انتخاب"
              >
                <SelectItem key="">همه</SelectItem>
                <SelectItem key="true">دارد</SelectItem>
                <SelectItem key="false">ندارد</SelectItem>
              </Select>
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
