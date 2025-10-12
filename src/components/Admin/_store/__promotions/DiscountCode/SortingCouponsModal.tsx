"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Listbox,
  ListboxItem,
  Button,
} from "@heroui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  BiSortDown,
  BiSortUp,
  BiCalendarAlt,
} from "react-icons/bi";
import { LuClock } from "react-icons/lu";

type Props = { isOpen: boolean; onOpenChange: () => void };

// 🧭 گزینه‌های مرتب‌سازی مخصوص کوپن‌ها
const SORT_OPTIONS = [
  {
    key: "id-desc",
    value: "id:DESC",
    label: "جدیدترین (شناسه نزولی)",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "id-asc",
    value: "id:ASC",
    label: "قدیمی‌ترین (شناسه صعودی)",
    icon: <BiSortUp className="text-xl" />,
  },
  {
    key: "createdAt-desc",
    value: "createdAt:DESC",
    label: "جدیدترین زمان ایجاد",
    icon: <LuClock className="text-xl" />,
  },
  {
    key: "createdAt-asc",
    value: "createdAt:ASC",
    label: "قدیمی‌ترین زمان ایجاد",
    icon: <LuClock className="text-xl rotate-180" />,
  },
  {
    key: "startDate-desc",
    value: "startDate:DESC",
    label: "تاریخ شروع (جدیدترین)",
    icon: <BiCalendarAlt className="text-xl" />,
  },
  {
    key: "startDate-asc",
    value: "startDate:ASC",
    label: "تاریخ شروع (قدیمی‌ترین)",
    icon: <BiCalendarAlt className="text-xl rotate-180" />,
  },
  {
    key: "endDate-desc",
    value: "endDate:DESC",
    label: "تاریخ پایان (جدیدترین)",
    icon: <BiCalendarAlt className="text-xl text-danger-500" />,
  },
  {
    key: "endDate-asc",
    value: "endDate:ASC",
    label: "تاریخ پایان (قدیمی‌ترین)",
    icon: <BiCalendarAlt className="text-xl text-danger-500 rotate-180" />,
  },
];

// 🔄 مپ برای نگاشت بین key و value
const valueToKey = new Map(SORT_OPTIONS.map((o) => [o.value, o.key]));
const keyToValue = new Map(SORT_OPTIONS.map((o) => [o.key, o.value]));

const CouponsSortingModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // sortBy های فعلی از URL
  const currentSorts = useMemo(
    () => searchParams.getAll("sortBy"),
    [searchParams]
  );

  // انتخاب فعلی در UI
  const selectedKey = useMemo(() => {
    const first = currentSorts[0];
    return first ? valueToKey.get(first) ?? "id-desc" : "id-desc";
  }, [currentSorts]);

  const [selected, setSelected] = useState<string>(selectedKey);
  if (selected !== selectedKey) setSelected(selectedKey);

  // ساخت پارامتر با حفظ بقیه پارامترها
  const buildParamsWithSort = (sortValues: string[] | null) => {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("sortBy");
    if (sortValues) sortValues.forEach((v) => p.append("sortBy", v));
    p.set("page", "1");
    return p;
  };

  const applySingleSort = (key: string) => {
    const sortVal = keyToValue.get(key)!;
    const params = buildParamsWithSort([sortVal]);
    router.push(`${pathname}?${params.toString()}`);
    onOpenChange();
  };

  const clearSort = () => {
    const params = buildParamsWithSort(null);
    router.push(`${pathname}?${params.toString()}`);
    onOpenChange();
  };

  return (
    <Modal
      dir="rtl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
    >
      <ModalContent>
        <ModalHeader>
          <p className="font-normal text-[16px]">مرتب‌سازی کدهای تخفیف</p>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-3">
          <Listbox
            aria-label="مرتب‌سازی کدهای تخفیف"
            selectionMode="single"
            selectedKeys={new Set([selected])}
            onSelectionChange={(keys) => {
              const key = Array.from(keys as Set<string>)[0];
              if (key) applySingleSort(key);
            }}
            variant="faded"
          >
            {SORT_OPTIONS.map((opt) => (
              <ListboxItem key={opt.key} startContent={opt.icon}>
                {opt.label}
              </ListboxItem>
            ))}
          </Listbox>

          <div className="flex justify-end pt-2">
            <Button variant="flat" onPress={clearSort}>
              حذف مرتب‌سازی
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CouponsSortingModal;
