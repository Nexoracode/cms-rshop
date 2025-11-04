"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import ProductsSelectionModal from "./ProductsSelectionModal";
import { useProductsSelection } from "./ProductsSelectionContext";
import ProductVariants from "../ProductVariants/ProductVariants";
import { BsShop } from "react-icons/bs";

type Props = {
  onChange?: (ids: number[]) => void;
};

const InnerSelectableProductsBox: React.FC<{
  onChange?: (ids: number[]) => void;
}> = ({ onChange }) => {
  const { selectedProducts, removeProducts } = useProductsSelection();

  useEffect(() => {
    onChange?.(selectedProducts.map((c: any) => c.id));
  }, [selectedProducts]);

  return (
    <SelectionBox
      title="محصولات انتخاب‌شده"
      icon={<BsShop className="text-5xl" />}
      initial={selectedProducts}
      modal={<ProductsSelectionModal />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* {selectedProducts.map((productSpecification) => (
          <ProductVariants
            key={productSpecification.product.id}
            product={productSpecification.product}
            selectedItem={productSpecification.item}
            disableSelect
          />
        ))} */}
      </div>
    </SelectionBox>
  );
};

const SelectableProductsBox: React.FC<Props> = ({ onChange }) => {
  return <InnerSelectableProductsBox onChange={onChange} />;
};

export default SelectableProductsBox;
