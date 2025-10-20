"use client";

import React, { useState } from "react";
import SelectableBox from "@/components/shared/SelectionBox/SelectionBox";
import VariantsSelectionModal from "./VariantsSelectionModal";
import { MdOutlineCategory } from "react-icons/md";
import ProductWithVariantsBox from "../ProductWithVariantsBox";

type Product = any;

type VariantItem = { id: number; quantity: number };
type OnSelectOutput = { product_id: number; variants: VariantItem[] | null };

type Props = {
  onChange?: (products: Product[]) => void;
  initialVariants?: { product: any; item: OnSelectOutput }[];
};

const SelectableVariantsBox: React.FC<Props> = ({
  onChange,
  initialVariants = [],
}) => {
  const [isVariantsOpen, setIsVariantsOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] =
    useState<{ product: any; item: OnSelectOutput }[]>(initialVariants);

  const handleConfirm = (
    variants: { product: any; item: OnSelectOutput }[]
  ) => {
    setSelectedVariants(variants);
    onChange?.(variants);
    setIsVariantsOpen(false);
  };

  return (
    <SelectableBox
      title="تنوع محصول ها انتخاب شده"
      icon={<MdOutlineCategory className="text-5xl" />}
      initial={selectedVariants}
      onOpen={() => setIsVariantsOpen(true)}
      modal={
        <VariantsSelectionModal
          isOpen={isVariantsOpen}
          onOpenChange={setIsVariantsOpen}
          onConfirm={handleConfirm}
        />
      }
    >
      <div className="flex flex-col gap-4">
        {selectedVariants.map((productSpecification) => (
          <ProductWithVariantsBox
            key={productSpecification.product.id}
            product={productSpecification.product}
            selectedItem={productSpecification.item}
            disableSelect
          />
        ))}
      </div>
    </SelectableBox>
  );
};

export default SelectableVariantsBox;
