"use client";

import React, { useState } from "react";
import SectionTemplate from "../../SectionTemplate";
import AddNewPopularSection from "./AddNewPopularSection";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import PopularSectionModal from "./PopularSectionModal";

type PopularSectionContainer = {
  mostPopular: any;
};

const PopularSectionContainer: React.FC<PopularSectionContainer> = ({
  mostPopular,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PopularSectionModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        defaultValues={mostPopular}
      />
      {mostPopular ? (
        <SectionTemplate
          section={mostPopular}
          title="محبوب ترین محصولات"
          children={
            <ActionButton
              icon={<TbEdit className="text-gray-700" size={18} />}
              onClick={() => {
                setIsOpen(true);
              }}
            />
          }
        />
      ) : (
        <AddNewPopularSection />
      )}
    </>
  );
};

export default PopularSectionContainer;
