"use client";

import React, { useEffect, useState } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import ProductsSelectionModal from "./ProductsSelectionModal";
import { useProductsSelection } from "./ProductsSelectionContext";
import ProductVariantsTemplate from "../ProductVariantsTemplate";
import { TbPackages } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";

type Props = {
  onChange?: (products: any[]) => void;
  error?: boolean;
};

const InnerSelectableProductsBoxWithQuantity: React.FC<{
  onChange?: (products: any[]) => void;
  error?: boolean;
}> = ({ onChange, error }) => {
  const { selectedProducts, removeProduct, setSelectedProducts } =
    useProductsSelection();
  const isFirstRender = React.useRef(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    const newQuantities: Record<string, number> = { ...quantities };
    let hasNewVariant = false;

    selectedProducts.forEach((p: any) => {
      if (p.variants) {
        p.variants.forEach((v: any) => {
          const key = `${p.id}-${v.id}`;
          if (newQuantities[key] === undefined) {
            newQuantities[key] = 1;
            hasNewVariant = true;
          }
        });
      }
    });

    hasNewVariant && setQuantities(newQuantities);

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const productsWithQuantity = selectedProducts.map((p: any) => ({
      ...p,
      variants:
        p.variants?.map((v: any) => ({
          ...v,
          quantity: newQuantities[`${p.id}-${v.id}`] ?? 1,
        })) ?? [],
    }));

    onChange?.(productsWithQuantity);
  }, [selectedProducts, quantities]);

  const removeVariantFromProduct = (productId: number, variantId: number) => {
    setSelectedProducts((prev: any) => {
      return prev.map((product: any) => {
        if (product.id === productId && product.variants) {
          const newVariants = product.variants.filter(
            (v: any) => v.id !== variantId
          );
          // حتی اگر همه واریانت‌ها حذف شدند، محصول را نگه دارید
          return { ...product, variants: newVariants };
        }
        return product;
      });
    });
  };

  const updateQuantity = (
    productId: number,
    variantId: number,
    quantity: number
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [`${productId}-${variantId}`]: Math.max(1, quantity),
    }));
  };

  return (
    <SelectionBox
      title="محصولات انتخاب‌شده با تعداد"
      icon={<TbPackages className="text-5xl" />}
      initial={selectedProducts}
      modal={<ProductsSelectionModal />}
      error={error}
    >
      <div className="flex flex-col gap-4">
        {selectedProducts.map((selectedProduct) => (
          <ProductVariantsTemplate
            key={selectedProduct.id}
            product={selectedProduct}
            showVariants={selectedProduct?.variants?.length ? true : false}
            contentProduct={
              <div className="deselect-icon">
                <AiOutlineCloseCircle
                  onClick={() => removeProduct(selectedProduct.id)}
                />
              </div>
            }
            contentVariant={(variant: any) => (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={quantities[`${selectedProduct.id}-${variant.id}`] || 1}
                  onChange={(e) =>
                    updateQuantity(
                      selectedProduct.id,
                      variant.id,
                      +e.target.value
                    )
                  }
                  className="w-12 h-6 text-center border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="1"
                />
                <div className="deselect-icon">
                  <AiOutlineCloseCircle
                    className="text-[16px]"
                    onClick={() =>
                      removeVariantFromProduct(selectedProduct.id, variant.id)
                    }
                  />
                </div>
              </div>
            )}
          />
        ))}
      </div>
    </SelectionBox>
  );
};

const SelectableProductsBoxWithQuantity: React.FC<Props> = ({
  onChange,
  error,
}) => {
  return (
    <InnerSelectableProductsBoxWithQuantity onChange={onChange} error={error} />
  );
};

export default SelectableProductsBoxWithQuantity;
