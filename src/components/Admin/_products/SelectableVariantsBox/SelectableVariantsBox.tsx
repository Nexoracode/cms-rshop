"use client";

import React, { useState } from "react";
import SelectableBox from "@/components/common/SelectionBox/SelectionBox";
import UserInfoCard from "../../_store/__customers/UserInfoCard";
import VariantsSelectionModal from "./VariantsSelectionModal";
import { MdOutlineCategory } from "react-icons/md";
import ProductWithVariantsBox from "../ProductWithVariantsBox";

type Product = any;

type Props = {
  onChange?: (products: Product[]) => void;
  initialVariants?: Product[];
};

const SelectableVariantsBox: React.FC<Props> = ({
  onChange,
  initialVariants = [],
}) => {
  const [isVariantsOpen, setIsVariantsOpen] = useState(false);
  const [selectedVariants, setSelectedVariants] =
    useState<Product[]>(initialVariants);

  const handleConfirm = (products: Product[]) => {
    setSelectedVariants(products);
    onChange?.(products);
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
          selectedIds={selectedVariants.map((p) => p.id)}
        />
      }
    >
      <div className="flex flex-col gap-4">
        {selectedVariants.map((product) => (
          <ProductWithVariantsBox
            key={product.id}
            product={product}
            disableSelect
          />
        ))}
      </div>
    </SelectableBox>
  );
};

export default SelectableVariantsBox;
