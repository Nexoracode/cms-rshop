"use client";

import React, { useMemo } from "react";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";
import { useGetSizeGuide } from "@/core/hooks/api/useSizeGuide";
import AddNewSizeGuideModal from "./AddNewSizeGuideModal";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";

type SizeGuideSelectProps = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  label?: string;
  placeholder?: string;
  withAddButton?: boolean;
  onAddNewClick?: () => void;
  errorMessage?: string;
  isDisabled?: boolean;
  withAddModal?: boolean;
  isRequired?: boolean;
};

const SizeGuideSelect: React.FC<SizeGuideSelectProps> = ({
  value,
  onChange,
  label = "راهنما سایز",
  placeholder = "راهنما سایز مورد نظر را انتخاب کنید",
  withAddButton = false,
  onAddNewClick,
  errorMessage,
  isDisabled = false,
  withAddModal = false,
  isRequired = false,
}) => {
  const { search } = useListQueryParams({
    searchKey: "size",
  });
  const { data: sizeGuide } = useGetSizeGuide({
    page: 1,
    search,
  });
  
  const options: SelectOption[] = useMemo(() => {
    return (
      sizeGuide?.data?.items?.map((s: any) => ({
        key: String(s.id),
        title: s.title,
      })) ?? []
    );
  }, [sizeGuide?.data?.items]);

  return (
    <div
      className={`w-full flex ${errorMessage?.length ? "items-center" : "items-end"} gap-2`}
    >
      <SelectBox
        label={label}
        value={value ? String(value) : ""}
        onChange={(val) => onChange(val ?? null)}
        options={
          options.length ? options : [{ key: "-1", title: "آیتمی موجود نیست" }]
        }
        placeholder={placeholder}
        disabled={isDisabled}
        size="md"
        addButton={
          withAddButton && onAddNewClick
            ? { onClick: onAddNewClick, label: "+ افزودن" }
            : undefined
        }
        errorMessage={errorMessage}
        isRequired={isRequired}
      />

      {withAddModal && <AddNewSizeGuideModal />}
    </div>
  );
};

export default SizeGuideSelect;
