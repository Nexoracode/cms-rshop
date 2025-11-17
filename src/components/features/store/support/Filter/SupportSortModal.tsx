"use client";

import SortModal from "@/components/ui/modals/SortModal";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

const SORT_OPTIONS = [
  {
    key: "id-desc",
    value: "id:DESC",
    label: "جدیدترین",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "id-asc",
    value: "id:ASC",
    label: "قدیمی‌ترین",
    icon: <BiSortUp className="text-xl" />,
  },
  {
    key: "name-asc",
    value: "name:ASC",
    label: "نام (الف→ی)",
    icon: <AiOutlineSortDescending className="text-xl" />,
  },
  {
    key: "name-desc",
    value: "name:DESC",
    label: "نام (ی→الف)",
    icon: <AiOutlineSortAscending className="text-xl" />,
  },
];

const SupportSortModal = () => {
  return <SortModal options={SORT_OPTIONS} />;
};

export default SupportSortModal;
