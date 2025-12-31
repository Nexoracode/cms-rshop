"use client";

import { useState } from "react";
import SpecialSectionModal from "./SpecialSectionModal";
import AddNewSpecialSection from "./AddNewSpecialSection";
import SectionTemplate from "../../SectionTemplate";
import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import DeleteButton from "@/components/shared/DeleteButton";
import { useDeleteHomeSection } from "@/core/hooks/api/adminHome/useHomeSections";

type PopularSectionContainerProps = {
  specialProducts: any;
};

const SpecialSectionContainer: React.FC<PopularSectionContainerProps> = ({
  specialProducts,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editSection, setEditSection] = useState<any>(null);
  const { mutate: deleteHomeSection } = useDeleteHomeSection();

  return (
    <>
      {editSection && (
        <ProductsSelectionProvider
          initialProducts={editSection?.products || []}
        >
          <SpecialSectionModal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            defaultValues={editSection}
          />
        </ProductsSelectionProvider>
      )}
      {specialProducts ? (
        specialProducts.map((section: any, index: number) => (
          <div key={index}>
            <SectionTemplate
              section={section}
              children={
                <div className="flex items-center gap-2">
                  <ActionButton
                    icon={<TbEdit className="text-gray-700" size={18} />}
                    onClick={() => {
                      setEditSection(section);
                      setIsOpen(true);
                    }}
                  />
                  <DeleteButton
                    onDelete={() => deleteHomeSection(section.id)}
                  />
                </div>
              }
            />
          </div>
        ))
      ) : (
        <AddNewSpecialSection />
      )}
    </>
  );
};

export default SpecialSectionContainer;
