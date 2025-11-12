"use client";

import React, { useEffect } from "react";
import SelectionBox from "@/components/shared/SelectionBox";
import ProductsSelectionModal from "./ProductsSelectionModal";
import { useProductsSelection } from "./ProductsSelectionContext";
import ProductVariantsTemplate from "../ProductVariants/ProductVariantsTemplate"; // 🟢 تغییر import به template
import { TbPackages } from "react-icons/tb";

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
      icon={<TbPackages className="text-5xl" />}
      initial={selectedProducts}
      modal={<ProductsSelectionModal />}
    >
      <div className="flex flex-col gap-4">
        {selectedProducts.map((selectedProduct) => (
          <ProductVariantsTemplate  // 🟢 تغییر به template (فقط نمایش)
            key={selectedProduct.id}
            product={selectedProduct}
            // disableSelect لازم نیست – template همیشه نمایش می‌ده
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