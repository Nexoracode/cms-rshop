"use client";

import { useState } from "react";
import SpecialSectionModal from "./SpecialSectionModal";
import AddNewSpecialSection from "./AddNewSpecialSection";
import SectionTemplate from "../../SectionTemplate";
import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";

type PopularSectionContainerProps = {
  specialProducts: any;
};

const SpecialSectionContainer: React.FC<PopularSectionContainerProps> = ({
  specialProducts,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {specialProducts ? (
        specialProducts.map((section: any, index: number) => (
          <div key={index}>
            <ProductsSelectionProvider initialProducts={[]}>
              <SpecialSectionModal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                defaultValues={specialProducts}
              />
            </ProductsSelectionProvider>
            <SectionTemplate key={section.id} section={section} />
          </div>
        ))
      ) : (
        <AddNewSpecialSection />
      )}
    </div>
  );
};

export default SpecialSectionContainer;
