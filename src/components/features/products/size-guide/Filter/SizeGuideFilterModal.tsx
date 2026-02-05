"use client";

import { useMemo } from "react";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";

const SizeGuideFilterModal: React.FC = () => {
  const fields: FilterField[] = useMemo(
    () => [
      { key: "createdAt", label: "تاریخ ثبت سفارش", type: "dateRange" },
    ],
    []
  );

  return <FilterModal title="فیلتر راهنمای سایز" fields={fields} />;
};

export default SizeGuideFilterModal;
