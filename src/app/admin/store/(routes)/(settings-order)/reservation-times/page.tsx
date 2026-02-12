"use client";

import BaseCard from "@/components/ui/BaseCard";
import { Select, SelectItem } from "@heroui/react";
import { RiTimerLine } from "react-icons/ri";

const ReservationTimes = () => {
  return (
    <BaseCard
      CardHeaderProps={{
        title: "زمان رزرو سفارش",
        icon: <RiTimerLine />,
        tooltipTitle: "زمان رزرو سفارش چیست؟",
        tooltipDescription: "هنگامی که مشتریان اطلاعات خود را وارد کرده و به صفحه پرداخت هدایت می‌شوند، در صورت ناموفق بودن پرداخت، مدت‌زمان مشخصی فرصت دارند تا به حساب کاربری خود بازگشته و پرداخت را تکمیل کنند. در این مدت، که به آن زمان رزرو سفارش گفته می‌شود، محصولات انتخاب‌شده موقتاً از موجودی کسر شده و برای مشتری نگه‌داشته می‌شود.",
      }}
    >
      <Select
        dir="rtl"
        className="mt-4"
        label="زمان"
        labelPlacement="outside"
        defaultSelectedKeys={["70"]}
        onSelectionChange={(value: any) => {}}
      >
        <SelectItem key="20">20 دقیقه (حداقل)</SelectItem>
        <SelectItem key="30">30 دقیقه</SelectItem>
        <SelectItem key="60">60 دقیقه</SelectItem>
        <SelectItem key="70">70 دقیقه (زمان پیش فرض)</SelectItem>
        <SelectItem key="120">120 دقیقه (حداکثر)</SelectItem>
      </Select>
    </BaseCard>
  );
};

export default ReservationTimes;
