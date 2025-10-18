"use client";

import React, { useEffect, useState } from "react";
import ProductsSelectionModal from "@/components/Admin/_products/SelectableProductsBox/ProductsSelectionModal";
import ProductBox from "@/components/Admin/_products/ProductBox";
import SelectableBox from "@/components/Common/SelectionBox/SelectionBox";
import { TfiShoppingCartFull } from "react-icons/tfi";

type Product = any;

type Props = {
  onChange?: (productIds: number[]) => void;
  initialProducts?: Product[];
};

const SelectableProductsBox: React.FC<Props> = ({
  onChange,
  initialProducts = [],
}) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] =
    useState<Product[]>([]);

  useEffect(() => {
    if (!initialProducts.length) return;
    setSelectedProducts(initialProducts);
  }, [initialProducts]);

  const handleConfirm = (products: Product[]) => {
    setSelectedProducts(products);
    onChange?.(products.map((p) => p.id));
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
