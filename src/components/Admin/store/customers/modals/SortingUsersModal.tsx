"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Listbox, ListboxItem, Button } from "@heroui/react";
import DynamicModal from "@/components/shared/DynamicModal";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  BiSortDown,
  BiSortUp,
  BiUser,
  BiEnvelope,
  BiPhone,
} from "react-icons/bi";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

// گزینه‌های مرتب‌سازی مطابق Swagger/Backend برای users
const SORT_OPTIONS = [
  { key: "id-desc", value: "id:DESC", label: "جدیدترین (ID نزولی)", icon: <BiSortDown className="text-xl" /> },
  { key: "id-asc", value: "id:ASC", label: "قدیمی‌ترین (ID صعودی)", icon: <BiSortUp className="text-xl" /> },

  { key: "firstName-asc", value: "firstName:ASC", label: "نام (الف → ی)", icon: <BiUser className="text-xl" /> },
  { key: "firstName-desc", value: "firstName:DESC", label: "نام (ی → الف)", icon: <BiUser className="text-xl" /> },

  { key: "email-asc", value: "email:ASC", label: "ایمیل (A → Z)", icon: <BiEnvelope className="text-xl" /> },
  { key: "email-desc", value: "email:DESC", label: "ایمیل (Z → A)", icon: <BiEnvelope className="text-xl" /> },

  { key: "phone-asc", value: "phone:ASC", label: "تلفن (صعودی)", icon: <BiPhone className="text-xl" /> },
  { key: "phone-desc", value: "phone:DESC", label: "تلفن (نزولی)", icon: <BiPhone className="text-xl" /> },
];

const valueToKey = new Map(SORT_OPTIONS.map((o) => [o.value, o.key]));
const keyToValue = new Map(SORT_OPTIONS.map((o) => [o.key, o.value]));

const SortingUsersModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // read current sortBy values from URL
  const currentSorts = useMemo(
    () => searchParams.getAll("sortBy"),
    [searchParams?.toString()]
  );

  // derive a sensible default key (use first sort from URL, fallback to id-desc)
  const selectedKeyFromUrl = useMemo(() => {
    const first = currentSorts[0];
    return first ? valueToKey.get(first) ?? "id-desc" : "id-desc";
  }, [currentSorts]);

  // local selected key (UI)
  const [selected, setSelected] = useState<string>(selectedKeyFromUrl);

  // sync local selected when URL changes (avoid setState in render)
  useEffect(() => {
    setSelected(selectedKeyFromUrl);
  }, [selectedKeyFromUrl]);

  // helper: preserve other params, replace sortBy entries, set page=1
  const buildParamsWithSort = (sortValues: string[] | null) => {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("sortBy");
    if (sortValues) sortValues.forEach((v) => p.append("sortBy", v));
    p.set("page", "1");
    return p;
  };

  const applySingleSort = (key: string) => {
    const sortVal = keyToValue.get(key);
    if (!sortVal) return;
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
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="مرتب‌سازی کاربران"
      confirmText={undefined}
      cancelText={undefined}
      isActiveFooter={false}
      icon={<BiSortDown className="text-2xl" />}
      size="md"
    >
      <div className="flex flex-col gap-3">
        <Listbox
          aria-label="مرتب‌سازی کاربران"
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
      </div>
    </DynamicModal>
  );
};

export default SortingUsersModal;
