"use client";

import React, { useMemo } from "react";
import { useGetBrands } from "@/core/hooks/api/useBrand";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";
import AddNewBrandModal from "./AddNewBrandModal";

type Props = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  errorMessage?: string;
  withAddModal?: boolean;
  isRequired?: boolean;
};

const BrandSelect: React.FC<Props> = ({
  value,
  onChange,
  errorMessage,
  withAddModal = false,
  isRequired = false,
}) => {
  const { search } = useListQueryParams({
    searchKey: "brand",
  });

  const { data: brands } = useGetBrands({
    page: 1,
    search,
  });

  const options = useMemo(() => {
    return (
      brands?.data?.items?.map((brand: any) => ({
        id: String(brand.id),
        title: brand.name,
      })) ?? []
    );
  }, [brands?.data?.items]);

  return (
    <div
      className={`w-full flex ${
        errorMessage?.length ? "items-center" : "items-end"
      } gap-2`}
    >
      <AutocompleteInput
        label="برند"
        placeholder="در صورت نیاز انتخاب کنید (اختیاری)"
        options={
          options.length ? options : [{ id: 0, title: "آیتمی موجود نیست" }]
        }
        selectedId={value ? String(value) : ""}
        onChange={(val) => {
          console.log("#$$$$$$$$$$$",val);
          
          onChange(val ?? null)
        }}
        isRequired={isRequired}
        searchKey="brand"
        syncSearchToUrl
        errorMessage={errorMessage}
      />

      {withAddModal && <AddNewBrandModal />}
    </div>
  );
};

export default BrandSelect;
