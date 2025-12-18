"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import ProductsSelectionModal from "./ProductsSelectionModal";
import { useProductsSelection } from "./ProductsSelectionContext";
import ProductVariantsTemplate from "../ProductVariantsTemplate";
import { TbPackages } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ProductVariants } from "./selectable-product";

const InnerSelectableProductsBox: React.FC<{
  onChange?: (data: ProductVariants) => void;
  error?: boolean;
}> = ({ onChange, error }) => {
  const { selectedProducts, removeProduct, addProduct } =
    useProductsSelection();
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log(selectedProducts);

    const products = selectedProducts.map((p: any) => ({
      product_id: p.id,
      variant_ids: p.variants?.map((v: any) => v.id) ?? [],
    }));

    onChange?.(products);
  }, [selectedProducts]);

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

  return (
    <SelectionBox
      title="محصولات انتخاب‌شده"
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
              <div className="deselect-icon">
                <AiOutlineCloseCircle
                  className="text-[16px]"
                  onClick={() =>
                    removeVariantFromProduct(selectedProduct.id, variant.id)
                  }
                />
              </div>
            )}
          />
        ))}
      </div>
    </SelectionBox>
  );
};

type Props = {
  onChange?: (data: ProductVariants) => void;
  error?: boolean;
};

const SelectableProductsBox: React.FC<Props> = ({ onChange, error }) => {
  return <InnerSelectableProductsBox onChange={onChange} error={error} />;
};

export default SelectableProductsBox;
