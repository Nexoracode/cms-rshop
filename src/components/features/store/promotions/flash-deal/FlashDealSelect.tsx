"use client";

import React, { useMemo } from "react";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";
import { FlashDealHooks } from "@/core/hooks/api/usePromotions";
import OptionButton from "@/components/ui/buttons/OptionButton";

type Props = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  errorMessage?: string;
  isRequired?: boolean;
};

const FlashDealSelect: React.FC<Props> = ({
  value,
  onChange,
  errorMessage,
  isRequired = false,
}) => {
  const { search } = useListQueryParams({
    searchKey: "promotion",
  });

  const { data: promotions } = FlashDealHooks.useGetList({
    page: 1,
    search,
  });

  console.log(promotions);
  

  const options = useMemo(() => {
    return (
      promotions?.data?.items
        ?.filter((item: any) =>
          item.conditions?.some(
            (condition: any) => condition.type === "product",
          ),
        )
        .map((item: any) => ({
          id: String(item.id),
          title: item.name,
        })) ?? []
    );
  }, [promotions?.data?.items]);

  return (
    <div
      className={`w-full flex ${
        errorMessage?.length ? "items-center" : "items-end"
      } gap-2`}
    >
      <AutocompleteInput
        label="پروموشن"
        placeholder="انتخاب کنید"
        options={
          options.length ? options : [{ id: 0, title: "آیتمی موجود نیست" }]
        }
        selectedId={value ? String(value) : ""}
        onChange={(val) => {
          onChange(val ?? null);
        }}
        isRequired={isRequired}
        searchKey="promotion"
        syncSearchToUrl
        errorMessage={errorMessage}
      />
      <div className="flex items-center gap-4">
        <OptionButton
          title="افزودن"
          href="/admin/store/promotions/flash-deal/products"
          className="py-5 rounded-xl"
        />
      </div>
    </div>
  );
};

export default FlashDealSelect;
