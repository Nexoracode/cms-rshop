// components/Admin/_products/SelectableProductsBox/SelectableProductsBox.tsx
"use client";

import React, { useState } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import ProductSelectionModal from "@/components/Admin/_products/SelectableProductsBox/ProductSelectionModal";
import { FiShoppingBag } from "react-icons/fi";
import ProductBox from "@/components/Admin/_products/ProductBox";

type Product = any;

type Props = {
  label?: string;
  onChange?: (products: Product[]) => void;
  initialProducts?: Product[];
  addButtonText?: string;
};

const SelectableProductsBox: React.FC<Props> = ({
  label = "محصولات انتخاب‌شده",
  onChange,
  initialProducts = [],
  addButtonText = "افزودن محصول",
}) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(initialProducts);

  const handleOpenChange = (open: boolean) => setIsProductsOpen(open);

  // now receives product objects from modal
  const handleConfirm = (products: Product[]) => {
    setSelectedProducts(products);
    onChange?.(products);
    setIsProductsOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <p className="font-medium">{label}</p>
        <Button
          color="secondary"
          variant="flat"
          size="sm"
          onPress={() => setIsProductsOpen(true)}
        >
          {selectedProducts.length ? "ویرایش" : addButtonText}
        </Button>
      </div>

      <Card className="shadow-sm border border-gray-100">
        <CardBody className="flex flex-col gap-4">
          {selectedProducts.length ? (
            <div className="flex flex-col gap-4">
              {selectedProducts.map((product) => (
                <ProductBox
                  key={product.id}
                  product={product}
                  cancleRemove={[]}
                  disableSelect
                  disableAction
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-gray-500">
              <FiShoppingBag className="text-5xl mb-2" />
              <p>هنوز محصولی انتخاب نکرده‌اید</p>
            </div>
          )}
        </CardBody>
      </Card>

      <ProductSelectionModal
        isOpen={isProductsOpen}
        onOpenChange={handleOpenChange}
        onConfirm={handleConfirm}
        selectedIds={selectedProducts.map((p) => p.id)}
      />
    </div>
  );
};

export default SelectableProductsBox;
