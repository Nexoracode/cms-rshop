import { StatusOrder } from "./order-types";

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
];