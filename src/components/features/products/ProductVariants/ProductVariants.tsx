"use client";

import React, { useEffect, useState } from "react";
import SelectableCard from "@/components/ui/SelectableCard";
import ProductVariantsList from "./ProductVariantsList";

type VariantItem = { id: number; quantity: number };
type OnSelectOutput = { product_id: number; variants: VariantItem[] | null };

type Props = {
  product: any;
  onSelect?: (
    selected: boolean,
    product?: any,
    item?: OnSelectOutput | null
  ) => void;
  selectedItem?: OnSelectOutput | null;
  disableSelect?: boolean;
};

const ProductVariants: React.FC<Props> = ({
  product,
  onSelect,
  selectedItem = null,
}) => {
  const [productSelected, setProductSelected] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);

  /** همگام‌سازی وضعیت انتخاب با prop از parent */
  useEffect(() => {
    if (!selectedItem || selectedItem.product_id !== product.id) {
      setProductSelected(false);
      setSelectedVariants([]);
      return;
    }

    if (selectedItem.variants === null) {
      setProductSelected(true);
      setSelectedVariants([]);
    } else {
      setProductSelected(false);
      setSelectedVariants(selectedItem.variants.map((v) => v.id));
    }
  }, [selectedItem, product.id]);

  const emitSelect = (selected: boolean, variants: VariantItem[] | null) => {
    onSelect?.(selected, product, {
      product_id: product.id,
      variants,
    });
  };

  const handleProductSelect = (selected: boolean) => {
    setProductSelected(selected);
    if (selected) setSelectedVariants([]);

    emitSelect(
      selected,
      selected
        ? null
        : selectedVariants.length
        ? selectedVariants.map((id) => ({ id, quantity: 1 }))
        : null
    );
  };

  const handleVariantSelect = (variantId: number, selected: boolean) => {
    let updatedVariants = [...selectedVariants];
    if (selected) {
      if (!updatedVariants.includes(variantId)) updatedVariants.push(variantId);
    } else {
      updatedVariants = updatedVariants.filter((id) => id !== variantId);
    }

    setSelectedVariants(updatedVariants);

    // اگر حداقل یک وریانت انتخاب شده، محصول اصلی باید false بشه
    if (updatedVariants.length > 0) setProductSelected(false);

    emitSelect(
      productSelected || updatedVariants.length > 0,
      updatedVariants.length > 0
        ? updatedVariants.map((id) => ({ id, quantity: 1 }))
        : null
    );
  };

  return (
    <SelectableCard
      id={product.id}
      selectedIds={productSelected ? [product.id] : []}
      //disabled={disableSelect || selectedVariants.length > 0}
      onSelectionChange={(idVal, sel) => handleProductSelect(sel)}
     // className="max-w-[300px] w-full sm:max-w-full"
    >
      {/* اطلاعات اصلی محصول */}
      <div className="flex flex-col items-center sm:flex-row gap-4 text-start">
        <div className="relative w-fit h-full">
          <img
            alt="product cover"
            className="object-cover w-full sm:w-[130px] h-[188px] sm:h-[110px] rounded-xl"
            src={product.media_pinned?.url ?? product.image}
          />
          {!product.is_visible && (
            <div className="absolute inset-0 text-center flex items-center justify-center text-lg px-3 py-1 bg-gray-600/60 text-white shadow-lg rounded-lg">
              <p className="animate-bounce">عدم نمایش</p>
            </div>
          )}
        </div>

        <div className="w-full sm:h-[110px] flex flex-col justify-between pr-0 sm:p-2 gap-4">
          <div className="flex flex-col gap-3 sm:flex-row justify-between items-center w-full">
            <div className="text-[15px] text-black/80 flex flex-col sm:flex-row items-center gap-1">
              <p className="truncate max-w-[220px] sm:max-w-[240px]">
                {product.name ?? product.title}
              </p>
              <span className="text-gray-600 text-xs">
                ({product.category?.title})
              </span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2 cursor-auto">
              <p className="text-gray-600 text-[13px]">
                موجودی{" "}
                {product.is_limited_stock
                  ? "نامحدود"
                  : product.stock === 0
                  ? "ندارد"
                  : `${product.stock} عدد`}
              </p>
            </div>

            <div className="flex items-end">
              <div className="text-gray-600">
                {product.discount_amount > 0 || product.discount_percent > 0 ? (
                  <div className="flex flex-col items-end gap-2 sm:gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 line-through decoration-2 decoration-gray-400">
                        {Number(product.price).toLocaleString("fa-IR")}
                      </span>
                      <span>تومان</span>
                    </div>
                    <span className="text-[15px] text-gray-800">
                      {Number(
                        Math.max(
                          0,
                          product.price -
                            (product.discount_amount > 0
                              ? product.discount_amount
                              : (product.discount_percent / 100) *
                                product.price)
                        )
                      ).toLocaleString("fa-IR")}{" "}
                      تومان
                    </span>
                  </div>
                ) : (
                  <span className="text-[15px] text-gray-800">
                    {Number(product.price).toLocaleString("fa-IR")} تومان
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* وریانت‌ها */}
      {product.variants?.length > 0 && (
        <ProductVariantsList />
      )}
    </SelectableCard>
  );
};

export default ProductVariants;
