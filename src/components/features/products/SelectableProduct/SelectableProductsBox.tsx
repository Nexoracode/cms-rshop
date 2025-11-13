"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import ProductsSelectionModal from "./ProductsSelectionModal";
import { useProductsSelection } from "./ProductsSelectionContext";
import ProductVariantsTemplate from "../ProductVariantsTemplate";
import { TbPackages } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";

type Props = {
  onChange?: (ids: number[]) => void;
};

const InnerSelectableProductsBox: React.FC<{
  onChange?: (ids: number[]) => void;
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

  useEffect(() => {
    console.log(selectedProducts);
    onChange?.(selectedProducts.map((c: any) => c.id));
  }, [selectedProducts]);

  return (
    <SelectionBox
      title="محصولات انتخاب‌شده"
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
              <div className="deselect-icon">
                <AiOutlineCloseCircle 
                  className="text-[16px]" 
                  onClick={() => removeVariantFromProduct(selectedProduct.id, variant.id)}
                />
              </div>
            )}
          />
        ))}
      </div>
    </SelectionBox>
  );
};

const SelectableProductsBox: React.FC<Props> = ({ onChange }) => {
  return <InnerSelectableProductsBox onChange={onChange} />;
};

export default SelectableProductsBox;