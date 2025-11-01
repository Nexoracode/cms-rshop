"use client";

import React, { useMemo } from "react";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";
import AddNewBrandModal from "./AddNewBrandModal";
import { useGetBrands } from "@/hooks/api/useBrand";

type Props = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  label?: string;
  placeholder?: string;
  withAddButton?: boolean;
  onAddNewClick?: () => void;
  isActiveError?: boolean;
  isDisabled?: boolean;
  withAddModal?: boolean;
};

const BrandSelect: React.FC<Props> = ({
  value,
  onChange,
  label = "برند",
  placeholder = "برند مورد نظر را انتخاب کنید",
  withAddButton = false,
  onAddNewClick,
  isActiveError = false,
  isDisabled = false,
  withAddModal = false,
}) => {
  const { data: allBrands } = useGetBrands();

  const options: SelectOption[] = useMemo(() => {
    return (
      allBrands?.data?.items?.map((brand: any) => ({
        key: String(brand.id),
        title: brand.name,
      })) ?? []
    );
  }, [allBrands?.data?.items]);

  return (
    <div className="w-full flex items-end gap-2">
      <SelectBox
        label={label}
        value={value ? String(value) : ""}
        onChange={(val) => onChange(val ?? null)}
        options={
          options.length
            ? options
            : [{ key: "-1", title: "آیتمی موجود نیست" }]
        }
        placeholder={placeholder}
        disabled={isDisabled}
        size="md"
        addButton={
          withAddButton && onAddNewClick
            ? { onClick: onAddNewClick, label: "+ افزودن برند" }
            : undefined
        }
        isActiveError={isActiveError}
      />

      {/* ✅ فقط اگر بخوای مدال رو فعال کنی */}
      {withAddModal && <AddNewBrandModal />}
    </div>
  );
};

export default BrandSelect;
