"use client";

import React, { useState } from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import AddNewAttributeModal from "./AddNewAttributeModal";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";
import { useDeleteAttribute } from "@/hooks/api/attributes/useAttribute";
import { Attribute } from "../attribute.types";

type Props = {
  onChange: (value: number | undefined) => void;
  attr: Attribute[];
  selectedAttrId: number | undefined;
  isDisabledEdit: boolean;
};

const AddNewAttribute: React.FC<Props> = ({
  onChange,
  attr,
  selectedAttrId: propSelectedAttrId, // از props
  isDisabledEdit,
}) => {
  // همیشه از prop استفاده کن، نه state داخلی
  const [internalSelectedId, setInternalSelectedId] = useState<
    number | undefined
  >(undefined);

  console.log(attr);

  const selectedAttrId = isDisabledEdit
    ? propSelectedAttrId
    : internalSelectedId;

  const deleteAttribute = useDeleteAttribute();

  const handleDeleteAttr = () => {
    if (!selectedAttrId) return;
    deleteAttribute.mutate(selectedAttrId, {
      onSuccess: () => {
        setInternalSelectedId(undefined);
        onChange(undefined);
      },
    });
  };

  const handleSelect = (id: string) => {
    const numId = +id;
    setInternalSelectedId(numId);
    onChange(numId);
  };

  return (
    <div className={!isDisabledEdit ? "mt-2 bg-slate-50 rounded-xl p-4" : ""}>
      <div className="flex items-end gap-2">
        <AutocompleteInput
          isRequired={isDisabledEdit}
          label="ویژگی"
          placeholder="ویژگی را جستجو یا انتخاب کنید"
          selectedId={selectedAttrId ?? ""}
          onChange={handleSelect}
          options={
            attr?.length
              ? attr.map((item) => ({
                  id: item.id!,
                  title: item.name,
                }))
              : []
          }
        />

        {!isDisabledEdit && <AddNewAttributeModal />}
      </div>

      {/* نمایش نام ویژگی انتخاب‌شده + ویرایش/حذف */}
      {selectedAttrId && !isDisabledEdit && (
        <div className="flex justify-between items-center pt-4 gap-2 mt-4 border-t">
          <p className="font-medium text-gray-700">
            ویژگی (
            {attr?.find((g) => g.id === selectedAttrId)?.name || "نامشخص"})
          </p>
          <div className="flex gap-2">
            <AddNewAttributeModal
              type="edit"
              defaultDatas={
                attr.find((g) => g.id === selectedAttrId) as
                  | Attribute
                  | undefined
              }
            />
            <DeleteButton onDelete={handleDeleteAttr} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewAttribute;
