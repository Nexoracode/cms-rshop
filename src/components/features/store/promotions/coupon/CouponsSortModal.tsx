"use client";

import SortModal from "@/components/ui/modals/SortModal";
import { BiSortDown, BiSortUp, BiCalendarAlt } from "react-icons/bi";
import { LuClock } from "react-icons/lu";

const SORT_OPTIONS = [
  { key: "id-desc", value: "id:DESC", label: "جدیدترین (شناسه نزولی)", icon: <BiSortDown className="text-xl" /> },
  { key: "id-asc", value: "id:ASC", label: "قدیمی‌ترین (شناسه صعودی)", icon: <BiSortUp className="text-xl" /> },
  { key: "createdAt-desc", value: "createdAt:DESC", label: "جدیدترین زمان ایجاد", icon: <LuClock className="text-xl" /> },
  { key: "createdAt-asc", value: "createdAt:ASC", label: "قدیمی‌ترین زمان ایجاد", icon: <LuClock className="text-xl rotate-180" /> },
  { key: "startDate-desc", value: "startDate:DESC", label: "تاریخ شروع (جدیدترین)", icon: <BiCalendarAlt className="text-xl" /> },
  { key: "startDate-asc", value: "startDate:ASC", label: "تاریخ شروع (قدیمی‌ترین)", icon: <BiCalendarAlt className="text-xl rotate-180" /> },
  { key: "endDate-desc", value: "endDate:DESC", label: "تاریخ پایان (جدیدترین)", icon: <BiCalendarAlt className="text-xl text-danger-500" /> },
  { key: "endDate-asc", value: "endDate:ASC", label: "تاریخ پایان (قدیمی‌ترین)", icon: <BiCalendarAlt className="text-xl text-danger-500 rotate-180" /> },
];

const CouponsSortModal = () => {
  return <SortModal options={SORT_OPTIONS} title="مرتب‌سازی کدهای تخفیف" />;
};

export default CouponsSortModal;
