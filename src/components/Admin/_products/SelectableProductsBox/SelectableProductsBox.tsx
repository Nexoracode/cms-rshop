"use client";

import React, { useState } from "react";
import ProductsSelectionModal from "@/components/Admin/_products/SelectableProductsBox/ProductsSelectionModal";
import ProductBox from "@/components/Admin/_products/ProductBox";
import SelectableBox from "@/components/common/SelectionBox/SelectionBox";
import { TfiShoppingCartFull } from "react-icons/tfi";

type Product = any;

type Props = {
  onChange?: (products: Product[]) => void;
  initialProducts?: Product[];
};

const SelectableProductsBox: React.FC<Props> = ({
  onChange,
  initialProducts = [],
}) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(initialProducts);

  const handleConfirm = (products: Product[]) => {
    setSelectedProducts(products);
    onChange?.(products);
    setIsProductsOpen(false);
  };

  return (
    <SelectableBox
      title="محصولات انتخاب شده"
      icon={<TfiShoppingCartFull className="text-5xl" />}
      initial={selectedProducts}
      onOpen={() => setIsProductsOpen(true)}
      modal={
        <ProductsSelectionModal
          isOpen={isProductsOpen}
          onOpenChange={setIsProductsOpen}
          onConfirm={handleConfirm}
          selectedIds={selectedProducts.map((p) => p.id)}
        />
      }
    >
      <div className="flex flex-col gap-4">
        {selectedProducts.map((product) => (
          <ProductBox
            key={product.id}
            product={product}
            disableSelect
            disableAction
          />
        ))}
      </div>
    </SelectableBox>
  );
};

export default SelectableProductsBox;
