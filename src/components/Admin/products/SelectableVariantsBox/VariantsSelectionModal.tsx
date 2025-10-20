"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Spinner } from "@heroui/react";
import DynamicModal from "@/components/shared/DynamicModal";
import { useGetProducts } from "@/hooks/api/products/useProduct";
import { BsShop } from "react-icons/bs";
import ProductsFilter from "@/components/admin/products/ProductsFilter";
import { useSearchParams } from "next/navigation";
import ProductWithVariantsBox from "../ProductWithVariantsBox";

type VariantItem = { id: number; quantity: number };
type OnSelectOutput = { product_id: number; variants: VariantItem[] | null };

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (
    selectedProducts: { product: any; item: OnSelectOutput }[]
  ) => void;
  selectedItems?: OnSelectOutput[];
};

const VariantsSelectionModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  selectedItems = [],
}) => {
  const searchParams = useSearchParams();

  /** استخراج پارامترهای جستجو و فیلتر */
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

  /** فراخوانی محصولات */
  const { data: productsResponse, isLoading } = useGetProducts({
    page,
    filter,
    search,
    searchBy,
    sortBy,
  });

  const products = productsResponse?.data?.items ?? [];

  const [productVariant, setProductVariant] = useState<
    { product: any; item: OnSelectOutput }[]
  >([]);

  useEffect(() => {
    console.log(productVariant);
  }, [productVariant]);

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="انتخاب تنوع محصول"
      confirmText="تأیید انتخاب"
      cancelText="لغو"
      confirmColor="secondary"
      confirmVariant="solid"
      onConfirm={() => onConfirm(productVariant)}
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
              <ProductWithVariantsBox
                key={product.id}
                product={product}
                selectedItem={
                  productVariant.find((x) => x.product.id === product.id)
                    ?.item ?? null
                }
                onSelect={(selected, product, item) => {
                  console.log("DDDDDDDDD");
                  
                  setProductVariant((prev) => {
                    if (!selected)
                      return prev.filter((x) => x.product.id !== product.id);

                    if (!item) return prev;

                    const exists = prev.find(
                      (x) => x.product.id === product.id
                    );
                    if (exists) {
                      return prev.map((x) =>
                        x.product.id === product.id ? { product, item } : x
                      );
                    } else {
                      return [...prev, { product, item }];
                    }
                  });
                }}
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

export default VariantsSelectionModal;
