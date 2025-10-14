// components/Admin/_products/SelectableProductsBox/ProductSelectionModal.tsx
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
  // now returns array of product objects (not only ids)
  onConfirm: (selectedProducts: any[]) => void;
  selectedIds?: number[]; // optional initial selection by id
};

const ProductSelectionModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  selectedIds = [],
}) => {
  // map of selected products by id
  const [selectedMap, setSelectedMap] = useState<Record<number, any>>({});
  const [selectedOrder, setSelectedOrder] = useState<number[]>(selectedIds);

  // read URL search params for filtering
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

  const { data: productsResponse, isLoading } = useGetProducts({
    page,
    filter,
    search,
    searchBy,
    sortBy,
  });

  const products = productsResponse?.data?.items ?? [];

  useEffect(() => {
    if (!isOpen) return;

    // باز شدن مدال → ریست انتخاب‌ها از props
    const initialMap: Record<number, any> = {};
    selectedIds.forEach((id) => {
      const existing = products.find((p: any) => p.id === id);
      if (existing) initialMap[id] = existing;
    });

    setSelectedOrder(selectedIds);
    setSelectedMap(initialMap);
  }, [isOpen, selectedIds, products]);

  const handleSelect = (product: any, checked: boolean) => {
    setSelectedOrder((prev) =>
      checked
        ? [...new Set([...prev, product.id])]
        : prev.filter((id) => id !== product.id)
    );

    setSelectedMap((prev) => {
      const copy = { ...prev };
      if (checked) copy[product.id] = product;
      else delete copy[product.id];
      return copy;
    });
  };

  const handleConfirm = () => {
    // preserve order using selectedOrder
    const selectedProducts = selectedOrder
      .map((id) => selectedMap[id])
      .filter(Boolean);
    onConfirm(selectedProducts);
    // optionally we can clear selection after confirm, but leave it to parent
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="انتخاب محصولات"
      confirmText="تأیید انتخاب"
      cancelText="لغو"
      confirmColor="secondary"
      confirmVariant="solid"
      onConfirm={handleConfirm}
      icon={<BsShop className="text-2xl" />}
      size="3xl"
    >
      <div className="flex flex-col gap-4">
        <ProductsFilter />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner label="در حال بارگذاری محصولات..." color="secondary" />
          </div>
        ) : products.length ? (
          <div className="flex flex-col gap-4">
            {products.map((product: any) => (
              <ProductBox
                key={product.id}
                product={product}
                selectedIds={selectedOrder}
                onSelect={(id, sel, prod) =>
                  handleSelect(prod ?? product, !!sel)
                }
                disableAction
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
