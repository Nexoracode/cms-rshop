"use client";

import { AttributesContent } from "@/components/features/products/create/AttributesProduct/AttributesContent";
import { MdOutlineCategory } from "react-icons/md";
import BaseCard from "@/components/ui/BaseCard";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const Variants = () => {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <BaseCard
        CardHeaderProps={{
          title: "مدیریت ویژگی ها",
          icon: <MdOutlineCategory />,
          showIconInActionSlot: true,
        }}
      >
        <AttributesContent isActiveHeader={false} isDisabledEdit={false} />
      </BaseCard>
    </div>
  );
};

export default Variants;
