"use client";

import React, { useEffect } from "react";
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
  const { selectedProducts, removeProduct, addProduct } = useProductsSelection();

  const removeVariantFromProduct = (productId: number, variantId: number) => {
    const product = selectedProducts.find((p: any) => p.id === productId);
    if (!product || !product.variants) return;

    const newVariants = product.variants.filter((v: any) => v.id !== variantId);
    if (newVariants.length === 0) {
      removeProduct(productId);
    } else {
      addProduct({ ...product, variants: newVariants });
    }
  };

  // 🟢 helper برای آپدیت quantity variant
  const updateVariantQuantity = (productId: number, variantId: number, quantity: number) => {
    const product = selectedProducts.find((p: any) => p.id === productId);
    if (!product || !product.variants) return;

    const newVariants = product.variants.map((v: any) =>
      v.id === variantId ? { ...v, quantity: Math.max(1, quantity) } : v
    );
    addProduct({ ...product, variants: newVariants });
  };

  const setDefaultQuantity = (productId: number) => {
    const product = selectedProducts.find((p: any) => p.id === productId);
    if (!product || !product.variants) return;

    const hasAllQuantities = product.variants.every((v: any) => v.quantity !== undefined);
    if (hasAllQuantities) return;

    const newVariants = product.variants.map((v: any) => ({
      ...v,
      quantity: v.quantity || 1
    }));
    addProduct({ ...product, variants: newVariants });
  };

  useEffect(() => {
    console.log(selectedProducts);
    onChange?.(selectedProducts);
  }, [selectedProducts]);

  useEffect(() => {
    selectedProducts.forEach((p: any) => setDefaultQuantity(p.id));
  }, [selectedProducts]);

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
            contentVariant={(variant: any) => {
              if (variant.quantity === undefined) {
                updateVariantQuantity(selectedProduct.id, variant.id, 1);
              }

              return (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={variant.quantity || 1}
                    onChange={(e) => updateVariantQuantity(selectedProduct.id, variant.id, +e.target.value)}
                    className="w-12 h-6 text-center border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="1"
                  />
                  <div className="deselect-icon">
                    <AiOutlineCloseCircle 
                      className="text-[16px]" 
                      onClick={() => removeVariantFromProduct(selectedProduct.id, variant.id)}
                    />
                  </div>
                </div>
              );
            }}
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