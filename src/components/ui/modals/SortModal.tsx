"use client";

import React, { useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import DynamicModal from "./Modal";
import OptionButton from "../buttons/OptionButton";
import { BiSortAlt2 } from "react-icons/bi";
import { ModalSize } from ".";

type SortOption = {
  key: string;
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type SortModalProps = {
  title?: string;
  options: SortOption[];
  defaultKey?: string;
  size?: ModalSize;
};

const SortModal: React.FC<SortModalProps> = ({
  title = "مرتب‌سازی",
  options,
  defaultKey = "id-desc",
  size = "md",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setIsOpen(open);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // تبدیل value <-> key
  const valueToKey = useMemo(
    () => new Map(options.map((o) => [o.value, o.key])),
    [options]
  );
  const keyToValue = useMemo(
    () => new Map(options.map((o) => [o.key, o.value])),
    [options]
  );

  // sortBy فعلی از URL
  const currentSorts = useMemo(
    () => searchParams.getAll("sortBy"),
    [searchParams]
  );

  const selectedKey = useMemo(() => {
    const first = currentSorts[0];
    return first ? valueToKey.get(first) ?? defaultKey : defaultKey;
  }, [currentSorts, valueToKey, defaultKey]);

  const [selected, setSelected] = useState(selectedKey);
  if (selected !== selectedKey) setSelected(selectedKey);

  // تابع ساخت query جدید
  const buildParamsWithSort = (sortValues: string[] | null) => {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("sortBy");
    if (sortValues) sortValues.forEach((v) => p.append("sortBy", v));
    p.set("page", "1");
    return p;
  };

  const applySingleSort = (key: string) => {
    if (selected === key) {
      clearSort();
      return;
    }

    const sortVal = keyToValue.get(key)!;
    const params = buildParamsWithSort([sortVal]);
    router.push(`${pathname}?${params.toString()}`);
    setSelected(key);
    closeModal();
  };

  const clearSort = () => {
    const params = buildParamsWithSort(null);
    router.push(`${pathname}?${params.toString()}`);
    closeModal();
  };

  return (
    <>
      <OptionButton
        title="مرتب‌سازی"
        icon={<BiSortAlt2 className="!text-[16px]" />}
        className="w-full sm:w-fit text-sky-600 bg-sky-100"
        onClick={openModal}
      />

      <DynamicModal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title={title}
        isActiveFooter={false}
        icon={
          <BiSortAlt2 className="text-3xl text-sky-600 bg-sky-100 rounded-lg p-1" />
        }
        size={size}
      >
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => applySingleSort(opt.key)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all border text-right
                ${
                  selected === opt.key
                    ? "bg-sky-100 text-sky-700 border-sky-200"
                    : "hover:bg-slate-100 border-transparent"
                }`}
            >
              <div className="flex items-center gap-2">
                {opt.icon}
                <span className="text-sm">{opt.label}</span>
              </div>
              {selected === opt.key && (
                <span className="text-sky-600 text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      </DynamicModal>
    </>
  );
};

export default SortModal;
