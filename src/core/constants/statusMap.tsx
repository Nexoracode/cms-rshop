import { TfiShoppingCartFull } from "react-icons/tfi";
import { StatusOrder } from "@/components/features/orders/order-types";
import { LuClock } from "react-icons/lu";
import { PiHandArrowDownFill, PiMoneyWavy } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineCheckCircle, MdOutlineCancel } from "react-icons/md";
import { FaUndo } from "react-icons/fa";

export const statusMap: Record<
  StatusOrder,
  {
    title: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  pending_approval: {
    title: "در انتظار تایید",
    icon: <LuClock />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  awaiting_payment: {
    title: "در انتظار پرداخت",
    icon: <PiMoneyWavy />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  payment_confirmation_pending: {
    title: "در انتظار تایید پرداخت",
    icon: <LuClock />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-purple-200",
  },
  preparing: {
    title: "در حال آماده‌سازی",
    icon: <TfiShoppingCartFull />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  shipping: {
    title: "در حال ارسال",
    icon: <TbTruckDelivery />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  delivered: {
    title: "تحویل گرفته",
    icon: <MdOutlineCheckCircle />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  not_delivered: {
    title: "تحویل نگرفته",
    icon: <PiHandArrowDownFill />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  expired: {
    title: "منقضی شده",
    icon: <MdOutlineCancel />,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
  rejected: {
    title: "رد شده",
    icon: <MdOutlineCancel />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  refunded: {
    title: "عودت وجه",
    icon: <FaUndo />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  payment_failed: {
    title: "پرداخت ناموفق",
    icon: <MdOutlineCancel />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
};
