"use client";

import { AttributesContent } from "@/components/features/products/create/AttributesProduct/AttributesContent";
import { MdOutlineCategory } from "react-icons/md";
import BaseCard from "@/components/ui/BaseCard";

const Variants = () => {
  return (
    <BaseCard
      CardHeaderProps={{
        title: "مدیریت ویژگی ها",
        icon: <MdOutlineCategory />,
        showIconInActionSlot: true
      }}
    >
      <AttributesContent isActiveHeader={false} isDisabledEdit={false} />
    </BaseCard>
  );
};

export default Variants;
