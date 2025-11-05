"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import ProductsSelectionModal from "./ProductsSelectionModal";
import { useProductsSelection } from "./ProductsSelectionContext";
import { BsShop } from "react-icons/bs";
import ProductVariants from "../ProductVariants/ProductVariants";

type Props = {
  onChange?: (ids: number[]) => void;
};

const InnerSelectableProductsBox: React.FC<{
  onChange?: (ids: number[]) => void;
}> = ({ onChange }) => {
  const { selectedProducts } = useProductsSelection();

  useEffect(() => {
    console.log(selectedProducts);
    onChange?.(selectedProducts.map((c: any) => c.id));
  }, [selectedProducts]);

  return (
    <SelectionBox
      title="محصولات انتخاب‌شده"
      icon={<BsShop className="text-5xl" />}
      initial={selectedProducts}
      modal={<ProductsSelectionModal />}
    >
      <div className="flex flex-col gap-4">
        {selectedProducts.map((selectedProduct) => (
          <ProductVariants
            key={selectedProduct.id}
            product={selectedProduct}
            disableSelect
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
