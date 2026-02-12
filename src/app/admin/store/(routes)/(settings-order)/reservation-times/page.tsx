"use client";

import BaseCard from "@/components/ui/BaseCard";
import SelectBox from "@/components/ui/inputs/SelectBox";
import { useGetSetting } from "@/core/hooks/api/useSeting";
import { RiTimerLine } from "react-icons/ri";

// ثابت کردن گزینه‌ها (مشابه orderStatusOptions)
export const reservationTimeOptions = [
  { key: "20",  title: "20 دقیقه (حداقل)" },
  { key: "30",  title: "30 دقیقه" },
  { key: "60",  title: "60 دقیقه" },
  { key: "70",  title: "70 دقیقه (زمان پیش‌فرض)" },
  { key: "120", title: "120 دقیقه (حداکثر)" },
] as const;

const ReservationTimes = () => {
  const { data: reservationOrder } = useGetSetting("reservation_order");

  const currentValue = reservationOrder?.data?.value ?? "70";

  console.log(currentValue, reservationOrder);
  
  return (
    <BaseCard
      CardHeaderProps={{
        title: "زمان رزرو سفارش",
        icon: <RiTimerLine />,
        tooltipTitle: "زمان رزرو سفارش چیست؟",
        tooltipDescription:
          "هنگامی که مشتریان اطلاعات خود را وارد کرده و به صفحه پرداخت هدایت می‌شوند، در صورت ناموفق بودن پرداخت، مدت‌زمان مشخصی فرصت دارند تا به حساب کاربری خود بازگشته و پرداخت را تکمیل کنند. در این مدت، که به آن زمان رزرو سفارش گفته می‌شود، محصولات انتخاب‌شده موقتاً از موجودی کسر شده و برای مشتری نگه‌داشته می‌شود.",
      }}
      bodyClassName="pb-10 pt-4"
    >
      <SelectBox
        label="زمان"
        value={currentValue}
        onChange={(val) => {
          console.log("زمان جدید انتخاب شد:", val);
        }}
        options={reservationTimeOptions.map((opt) => ({
          key: opt.key,
          title: opt.title,
        }))}
        placeholder="انتخاب زمان رزرو"
      />
    </BaseCard>
  );
};

export default ReservationTimes;