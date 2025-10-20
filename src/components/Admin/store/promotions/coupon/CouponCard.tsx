"use client";

import { TableActionButtons } from "@/components/forms/TableActionButtons";
import { useDeleteCoupon } from "@/hooks/api/useCoupon";
import { Card, CardBody } from "@heroui/react";

type Props = {
  item: any;
  editRoute: string;
};

const CouponCard: React.FC<Props> = ({ item, editRoute }) => {
  const deleteCoupon = useDeleteCoupon();

  const rowItems = [
    {
      label: "نوع تخفیف",
      value: item.type === "percent" ? "درصدی" : "مبلغ ثابت",
    },
    {
      label: "مقدار",
      value:
        item.type === "percent"
          ? `${item.amount}%`
          : `${Number(item.amount ?? 0).toLocaleString("fa-IR")} تومان`,
    },
    {
      label: "حداقل مبلغ سفارش",
      value: item.min_order_amount
        ? `${Number(item.min_order_amount).toLocaleString("fa-IR")} تومان`
        : "—",
    },
    {
      label: "سقف تخفیف",
      value: item.max_discount_amount
        ? `${Number(item.max_discount_amount).toLocaleString("fa-IR")} تومان`
        : "—",
    },
    {
      label: "شروع اعتبار",
      value: item.start_date
        ? new Date(item.start_date).toLocaleDateString("fa-IR")
        : "—",
    },
    {
      label: "پایان اعتبار",
      value: item.end_date
        ? new Date(item.end_date).toLocaleDateString("fa-IR")
        : "—",
    },
    {
      label: "محدودیت تعداد",
      value: item.usage_limit ?? "—",
    },
    {
      label: "اولین سفارش",
      value: item.for_first_order ? "بله" : "خیر",
    },
    {
      label: "کاربران مجاز",
      value: item.allowed_users?.length
        ? `${item.allowed_users.length} نفر`
        : "—",
    },
    {
      label: "محصولات مجاز",
      value: item.allowed_products?.length
        ? `${item.allowed_products.length} عدد`
        : "—",
    },
    {
      label: "دسته‌بندی‌های مجاز",
      value: item.allowed_categories?.length
        ? `${item.allowed_categories.length} مورد`
        : "—",
    },
  ];

  return (
    <Card
      key={item.id}
      shadow="sm"
      className="bg-white rounded-2xl overflow-hidden hover:shadow-lg !transition-all"
    >
      <CardBody className="flex flex-col gap-2 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg font-bold text-primary">{item.code}</p>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.is_active
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {item.is_active ? "فعال" : "غیرفعال"}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col divide-y divide-gray-200 rounded-lg overflow-hidden">
          {rowItems.filter(Boolean).map((row: any, index: number) => (
            <div
              key={index}
              className={`flex justify-between border-none items-center rounded-xl px-3 py-2 text-sm ${
                index % 2 === 1 ? "bg-slate-100" : "bg-white"
              }`}
            >
              <span className="text-gray-600">{row.label}:</span>
              <span className="font-medium text-gray-800">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <TableActionButtons
            editRoute={editRoute}
            onDelete={() => deleteCoupon.mutate(item.id)}
            deleteItem={item.id}
            deleteTitle="تایید حذف کد تخفیف"
            deleteMessage="آیا مطمئن هستید می‌خواهید این کد تخفیف را حذف کنید؟"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default CouponCard;
