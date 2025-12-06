import { StatusOrder } from "../order-types";

export const statusOptions: { key: StatusOrder; title: string }[] = [
  { key: "pending_approval", title: "در انتظار تایید" },
  { key: "awaiting_payment", title: "در انتظار پرداخت" },
  { key: "payment_confirmation_pending", title: "در انتظار تایید پرداخت" },
  { key: "preparing", title: "در حال آماده‌سازی" },
  { key: "shipping", title: "در حال ارسال" },
  { key: "delivered", title: "تحویل گرفته" },
  { key: "not_delivered", title: "تحویل نگرفته" },
  { key: "expired", title: "منقضی شده" },
  { key: "rejected", title: "رد شده" },
  { key: "refunded", title: "عودت وجه" },
  { key: "payment_failed", title: "پرداخت ناموفق" },
  { key: "cancelled", title: "لغو شده" },
];

export const getPaymentStatusText = (payment: any): string => {
  // پرداخت آنلاین
  if (payment?.payment_method === "online" || payment?.gateway) {
    switch (payment.status) {
      case "success":     return "پرداخت موفق";
      case "failed":       return "پرداخت ناموفق";
      case "pending":
      case "in_progress":  return "در انتظار پرداخت";
      case "cancelled":    return "لغو شده توسط مشتری";
      case "refunded":         return "وجه بازگشت داده شد";
      default:             return "وضعیت پرداخت نامشخص";
    }
  }

  // کارت به کارت
  if (payment?.payment_method === "card_to_card") {
    switch (payment.card_to_card_status) {
      case "pending":       return "منتظر آپلود رسید";
      case "uploaded":   return "رسید آپلود شد (در انتظار تأیید)";
      case "approved":   return "تأیید شده توسط ادمین";
      case "rejected":   return "رسید رد شد";
      default:           return "کارت به کارت — در انتظار رسید";
    }
  }

  // هیچ پرداختی ثبت نشده
  return "پرداخت نشده";
};