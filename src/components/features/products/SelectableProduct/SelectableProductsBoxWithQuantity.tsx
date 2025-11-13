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
};

const InnerSelectableProductsBoxWithQuantity: React.FC<{
  onChange?: (products: any[]) => void;
}> = ({ onChange }) => {
  const { selectedProducts, removeProduct, setSelectedProducts } =
    useProductsSelection();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

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

  const removeVariantFromProduct = (productId: number, variantId: number) => {
    setSelectedProducts((prev: any) => {
      return prev
        .map((product: any) => {
          if (product.id === productId && product.variants) {
            const newVariants = product.variants.filter(
              (v: any) => v.id !== variantId
            );
            if (newVariants.length === 0) {
              return null; // Mark for removal
            }
            return { ...product, variants: newVariants };
          }
          return product;
        })
        .filter(Boolean); // Remove null products
    });
  };

  useEffect(() => {
    const newQuantities: Record<string, number> = {};
    selectedProducts.forEach((p: any) => {
      if (p.variants) {
        p.variants.forEach((v: any) => {
          const key = `${p.id}-${v.id}`;
          if (quantities[key] === undefined) {
            newQuantities[key] = 1;
          } else {
            newQuantities[key] = quantities[key];
          }
        });
      }
    });
    setQuantities(newQuantities);
  }, [selectedProducts]);

  useEffect(() => {
    console.log(selectedProducts);
    const productsWithQuantity = selectedProducts.map((p: any) => ({
      ...p,
      variants:
        p.variants?.map((v: any) => ({
          ...v,
          quantity: quantities[`${p.id}-${v.id}`] || 1,
        })) || [],
    }));
    onChange?.(productsWithQuantity);
  }, [selectedProducts, quantities]);

  return (
    <SelectionBox
      title="محصولات انتخاب‌شده با تعداد"
      icon={<TbPackages className="text-5xl" />}
      initial={selectedProducts}
      modal={<ProductsSelectionModal />}
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
                  className="w-12 h-6 text-center border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
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

const SelectableProductsBoxWithQuantity: React.FC<Props> = ({ onChange }) => {
  return <InnerSelectableProductsBoxWithQuantity onChange={onChange} />;
};

export default SelectableProductsBoxWithQuantity;
