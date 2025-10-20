// components/Admin/_products/__brands/SortingBrandsModal.tsx
"use client";

import { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Listbox,
  ListboxItem,
} from "@heroui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";

type Props = { isOpen: boolean; onOpenChange: () => void };

// فقط فیلدهای مجاز برند
const SORT_OPTIONS = [
  { key: "id-desc", value: "id:DESC", label: "ID نزولی (جدیدترین)", icon: <BiSortDown className="text-xl" /> },
  { key: "id-asc",  value: "id:ASC",  label: "ID صعودی (قدیمی‌ترین)", icon: <BiSortUp className="text-xl" /> },

  { key: "name-asc",  value: "name:ASC",  label: "نام (الف → ی)", icon: <AiOutlineSortDescending className="text-xl" /> },
  { key: "name-desc", value: "name:DESC", label: "نام (ی → الف)", icon: <AiOutlineSortAscending className="text-xl" /> },

  { key: "logo-asc",  value: "logo:ASC",  label: "لوگو (A → Z)", icon: <AiOutlineSortDescending className="text-xl" /> },
  { key: "logo-desc", value: "logo:DESC", label: "لوگو (Z → A)", icon: <AiOutlineSortAscending className="text-xl" /> },
];

const valueToKey = new Map(SORT_OPTIONS.map(o => [o.value, o.key]));
const keyToValue = new Map(SORT_OPTIONS.map(o => [o.key, o.value]));

const SortingBrandsModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // sortBy فعلی از URL (اولین مقدار)
  const currentSorts = useMemo(() => sp.getAll("sortBy"), [sp]);
  const selectedKey = useMemo(() => {
    const first = currentSorts[0];
    return first ? valueToKey.get(first) ?? "id-desc" : "id-desc";
  }, [currentSorts]);

  const [picked, setPicked] = useState<string>(selectedKey);
  if (picked !== selectedKey) setPicked(selectedKey);

  const buildWithSort = (sortValues: string[] | null) => {
    const p = new URLSearchParams(sp.toString());
    p.delete("sortBy");
    if (sortValues) sortValues.forEach(v => p.append("sortBy", v));
    p.set("page", "1");
    return p;
  };

  const applySingle = (key: string) => {
    const val = keyToValue.get(key)!;
    const params = buildWithSort([val]);
    router.replace(`${pathname}?${params.toString()}`);
    onOpenChange();
  };

  const clearSort = () => {
    const params = buildWithSort(null);
    router.replace(`${pathname}?${params.toString()}`);
    onOpenChange();
  };

  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
      <ModalContent>
        <ModalHeader>
          <p className="font-normal text-[16px]">مرتب‌سازی برندها</p>
        </ModalHeader>
        <ModalBody className="flex flex-col gap-3">
          <Listbox
            aria-label="مرتب‌سازی برندها"
            selectionMode="single"
            selectedKeys={new Set([picked])}
            onSelectionChange={(keys) => {
              const key = Array.from(keys as Set<string>)[0];
              if (key) applySingle(key);
            }}
            variant="faded"
          >
            {SORT_OPTIONS.map(opt => (
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

export default SortingBrandsModal;
