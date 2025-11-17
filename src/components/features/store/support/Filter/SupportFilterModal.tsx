"use client";

import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";

const SupportFilterModal: React.FC = () => {
  const fields: FilterField[] = [
    { key: "discount", label: "تخفیف", type: "discount" },
    { key: "created_at", label: "تاریخ ثبت", type: "dateRange" },
  ];

  return <FilterModal title="فیلتر گفت و گو ها" fields={fields} />;
};

export default SupportFilterModal;
