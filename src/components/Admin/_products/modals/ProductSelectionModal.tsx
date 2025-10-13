"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Spinner } from "@heroui/react";
import DynamicModal from "@/components/Helper/DynamicModal";
import ProductBox from "@/components/Admin/_products/ProductBox";
import { useGetProducts } from "@/hooks/api/products/useProduct";
import { BsShop } from "react-icons/bs";
import ProductsFilter from "@/components/Admin/_products/ProductsFilter";
import { useSearchParams } from "next/navigation";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selectedIds: number[]) => void;
  selectedIds?: number[];
  title?: string;
  confirmText?: string;
  cancelText?: string;
};

const ProductSelectionModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  selectedIds = [],
  title = "انتخاب محصولات",
  confirmText = "تأیید انتخاب",
  cancelText = "لغو",
}) => {
  const [selected, setSelected] = useState<number[]>(selectedIds);

  // همگام‌سازی اولیه و هنگام باز شدن مدال یا تغییر prop
  useEffect(() => {
    if (isOpen) {
      setSelected(selectedIds ?? []);
    }
  }, [isOpen, selectedIds]);

  // read URL search params (ProductsFilter writes to URL) and forward them to the hook
  const searchParams = useSearchParams();

  const page = useMemo(() => {
    const p = searchParams.get("page");
    const n = Number(p ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams?.toString()]);

  const sortBy = useMemo(() => {
    const sorts = searchParams.getAll("sortBy");
    return sorts.length ? (sorts as any) : undefined;
  }, [searchParams?.toString()]);

  const search = useMemo(() => {
    const s = searchParams.get("search")?.trim();
    return s ? s : undefined;
  }, [searchParams?.toString()]);

  const searchBy = useMemo(() => {
    const s = searchParams.getAll("searchBy");
    return s.length ? s : undefined;
  }, [searchParams?.toString()]);

  const filter = useMemo(() => {
    const f: Record<string, string[]> = {};
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!key.startsWith("filter.")) continue;
      const [, field] = key.split(".");
      if (!field) continue;
      if (!f[field]) f[field] = [];
      f[field].push(value);
    }
    return Object.keys(f).length ? (f as any) : undefined;
  }, [searchParams?.toString()]);

  const { data: products, isLoading } = useGetProducts({
    page,
    filter,
    search,
    searchBy,
    sortBy,
  });

  const handleSelect = (id: number, checked: boolean) => {
    setSelected((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const handleConfirm = () => {
    onConfirm(selected);
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center gap-2">
          <BsShop className="text-xl" />
          <span>{title}</span>
        </div>
      }
      confirmText={confirmText}
      cancelText={cancelText}
      confirmColor="secondary"
      confirmVariant="solid"
      onConfirm={handleConfirm}
      isConfirmDisabled={!selected.length}
      size="5xl"
    >
      <div className="flex flex-col gap-4">
        {/* Reuse existing ProductsFilter (it updates the URL search params) */}
        <ProductsFilter />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner label="در حال بارگذاری محصولات..." color="secondary" />
          </div>
        ) : products?.data?.items?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto pr-2">
            {products.data.items.map((product: any) => (
              <ProductBox
                key={product.id}
                product={product}
                onSelect={handleSelect}
                cancleRemove={selected}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            محصولی برای نمایش وجود ندارد.
          </p>
        )}
      </div>
    </DynamicModal>
  );
};

export default ProductSelectionModal;
