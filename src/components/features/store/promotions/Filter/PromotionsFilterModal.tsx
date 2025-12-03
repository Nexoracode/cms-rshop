"use client";

import { useMemo } from "react";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";

const PromotionsFilterModal: React.FC = () => {
  const fields: FilterField[] = useMemo<FilterField[]>(
    () => [
      {
        key: "isActive",
        label: "وضعیت فعال بودن",
        type: "boolean01",
        default: "",
      },
      { key: "startDate", label: "بازه اعتبار", type: "dateRange" },
    ],
    []
  );

  return <FilterModal title="فیلتر" fields={fields} />;
};

export default PromotionsFilterModal;
