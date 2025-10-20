"use client";

import React, { useMemo } from "react";
import { Spinner } from "@heroui/react";
import DynamicModal from "@/components/shared/DynamicModal";
import ProductBox from "@/components/admin/products/ProductBox";
import { useGetProducts } from "@/hooks/api/products/useProduct";
import { BsShop } from "react-icons/bs";
import ProductsFilter from "@/components/admin/products/ProductsFilter";
import { useSearchParams } from "next/navigation";
import { useSelectableItems } from "@/hooks/system/useSelectableItems";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selectedProducts: any[]) => void;
  selectedIds?: number[];
};

const ProductsSelectionModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  selectedIds = [],
}) => {
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

  const {
    selectedOrder,
    handleSelect,
    handleConfirm: handleConfirmSelection,
  } = useSelectableItems(products, selectedIds, isOpen);

  const handleConfirm = () => {
    const selectedProducts = handleConfirmSelection();
    onConfirm(selectedProducts);
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
                onSelect={(id, sel, p) => p && handleSelect(p, !!sel)}
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

export default ProductsSelectionModal;
