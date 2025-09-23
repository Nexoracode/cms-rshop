"use client";

import { useMemo, useState } from "react";
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
// ✅ همه از یک پکیج مطمئن:
import {
  BiSortDown,
  BiSortUp,
  BiTrendingUp,
  BiTrendingDown,
  BiBarChartAlt2,
} from "react-icons/bi";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

type Props = { isOpen: boolean; onOpenChange: () => void };

// گزینه‌ها مطابق Swagger
const SORT_OPTIONS = [
  {
    key: "id-desc",
    value: "id:DESC",
    label: "جدیدترین (ID نزولی)",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "id-asc",
    value: "id:ASC",
    label: "قدیمی‌ترین (ID صعودی)",
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

  {
    key: "price-desc",
    value: "price:DESC",
    label: "بیشترین قیمت",
    icon: <BiTrendingUp className="text-xl" />,
  },
  {
    key: "price-asc",
    value: "price:ASC",
    label: "کمترین قیمت",
    icon: <BiTrendingDown className="text-xl" />,
  },

  {
    key: "stock-desc",
    value: "stock:DESC",
    label: "بیشترین موجودی",
    icon: <BiBarChartAlt2 className="text-xl" />,
  },
  {
    key: "stock-asc",
    value: "stock:ASC",
    label: "کمترین موجودی",
    icon: <BiBarChartAlt2 className="text-xl rotate-180" />,
  },
];

const valueToKey = new Map(SORT_OPTIONS.map((o) => [o.value, o.key]));
const keyToValue = new Map(SORT_OPTIONS.map((o) => [o.key, o.value]));

const SortingModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // sortByهای فعلی از URL
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

  // ساخت پارام با حفظ بقیه پارامترها
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
          <p className="font-normal text-[16px]">مرتب‌سازی</p>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-3">
          <Listbox
            aria-label="مرتب‌سازی محصولات"
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

export default SortingModal;
