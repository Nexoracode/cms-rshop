"use client";

import React, { useEffect, useState } from "react";
import SelectableCard from "@/components/ui/SelectableCard";
import ProductVariantsTemplate from "./ProductVariantsTemplate";

type Product = Record<string, any>;

type Props = {
  product: Product;
  initialItemsSelected?: Product[] | null;
  disableSelect?: boolean;
  onChange?: (data: Product | null) => void;
};

const SelectableProductVariants: React.FC<Props> = ({
  product,
  initialItemsSelected = null,
  onChange,
  disableSelect,
}) => {
  const [selectedMood, setSelectedMood] = useState<
    "variants" | "product" | "null"
  >("null");
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);

  useEffect(() => {
    if (!initialItemsSelected) return;

    const found = initialItemsSelected.find((p: any) => p.id === product.id);
    if (!found) return;

    if (!found.variants || !found.variants.length) {
      setSelectedMood("product");
      setSelectedProduct(true);
      setSelectedVariants([]);
    } else {
      setSelectedMood("variants");
      setSelectedProduct(false);
      setSelectedVariants(found.variants.map((v: any) => v.id));
    }
  }, [initialItemsSelected, product]);

  const emitChange = (
    mode: "product" | "variants" | "null",
    variants?: number[]
  ) => {
    if (mode === "null") {
      onChange?.(null);
    } else if (mode === "product") {
      onChange?.({ ...product, variants: null });
    } else {
      const selectedVariantsData = product.variants?.filter((v: any) =>
        variants?.includes(v.id)
      );
      onChange?.({ ...product, variants: selectedVariantsData });
    }
  };

  const handleProductSelect = (selected: boolean) => {
    if (selected) {
      setSelectedMood("product");
      setSelectedProduct(true);
      setSelectedVariants([]);
      emitChange("product");
    } else {
      setSelectedMood("null");
      setSelectedProduct(false);
      setSelectedVariants([]);
      emitChange("null");
    }
  };

  const handleVariantSelect = (variantId: number, selected: boolean) => {
    let newSelected = [...selectedVariants];
    if (selected) {
      newSelected.push(variantId);
    } else {
      newSelected = newSelected.filter((v) => v !== variantId);
    }

    if (newSelected.length === 0) {
      setSelectedMood("null");
      setSelectedProduct(false);
      setSelectedVariants([]);
      emitChange("null");
    } else {
      setSelectedMood("variants");
      setSelectedProduct(false);
      setSelectedVariants(newSelected);
      emitChange("variants", newSelected);
    }
  };

  const getSelectedProductIds = () => (selectedProduct ? [product.id] : []);
  const getSelectedVariantIds = () => selectedVariants;

  // wrapper برای product (SelectableCard)
  const productWrapper = (
    <SelectableCard
      id={product.id}
      selectedIds={getSelectedProductIds()}
      onSelectionChange={(id, isSelected) => handleProductSelect(isSelected)}
      disabled={disableSelect || selectedMood === "variants"}
    />
  );

  // wrapper برای هر variant (SelectableCard)
  const variantWrapper = (
    <SelectableCard
      selectedIds={getSelectedVariantIds()}
      onSelectionChange={(idVal, sel) => handleVariantSelect(+idVal, sel)}
      disabled={disableSelect || selectedMood === "product"}
    />
  );

  return (
    <ProductVariantsTemplate
      product={product}
      children={productWrapper} // wrap productContent
      variantChildren={variantWrapper} // wrap هر variantContent
    />
  );
};

export default SelectableProductVariants;
