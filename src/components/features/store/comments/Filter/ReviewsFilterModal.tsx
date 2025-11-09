"use client";

import { useMemo } from "react";
import FilterModal from "@/components/ui/modals/FilterModal/FilterModal";
import { FilterField } from "@/components/ui/modals/FilterModal";

const ReviewsFilterModal: React.FC = () => {
  const fields: FilterField[] = useMemo<FilterField[]>(
    () => [
      { key: "isActive", label: "وضعیت فعال بودن", type: "boolean01", default: "" },
      { key: "forFirstOrder", label: "فقط اولین سفارش", type: "boolean01", default: "" },
      { key: "amount", label: "مقدار تخفیف", type: "discount" },
      { key: "amountType", label: "نوع تخفیف", type: "select", options: [
        { key: "percent", title: "درصد" },
        { key: "fixed", title: "مبلغ ثابت" },
      ] },
      { key: "minOrderAmount", label: "حداقل مبلغ سفارش", type: "numberRange" },
      { key: "usageLimit", label: "محدودیت تعداد", type: "numberRange" },
      { key: "useCount", label: "تعداد استفاده‌شده", type: "numberRange" },
      { key: "startDate", label: "تاریخ شروع اعتبار", type: "dateRange" },
      { key: "endDate", label: "تاریخ پایان اعتبار", type: "dateRange" },
    ],
    []
  );

  return (
    <FilterModal
      title="فیلتر کوپن‌ها"
      fields={fields}
    />
  );
};

export default ReviewsFilterModal;
