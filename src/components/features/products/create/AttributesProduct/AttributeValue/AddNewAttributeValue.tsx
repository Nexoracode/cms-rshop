"use client";

import React, { useState } from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import AddNewAttributeValueModal from "./AddNewAttributeValueModal";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";
import { useDeleteAttributeValue } from "@/hooks/api/attributes/useAttributeValue";
import { useAttributeContext } from "../../context/AttributeContext";
import AnimatedMultiSelect from "@/components/forms/Inputs/SearchableMultiSelect";
import { AttributeValue } from "../attribute.types";

type Props = {
  attrValues: AttributeValue[];
  selectedValues: number[];
  onChange: (values: number[]) => void;
  selectedAttrId: number | undefined;
  isDisabledEdit: boolean;
};

const AddNewAttributeValue: React.FC<Props> = ({
  attrValues,
  selectedValues,
  onChange,
  selectedAttrId,
  isDisabledEdit,
}) => {
  const [selectedValueId, setSelectedValueId] = useState<number | undefined>(
    undefined
  );

  const deleteAttributeValue = useDeleteAttributeValue();
  const { attrInfos } = useAttributeContext(); // این خط رو اضافه کردیم

  const handleDelete = () => {
    if (!selectedValueId) return;
    deleteAttributeValue.mutate(selectedValueId, {
      onSuccess: () => {
        setSelectedValueId(undefined);
        onChange(selectedValues.filter((id) => id !== selectedValueId));
      },
    });
  };

  return (
    <div className={!isDisabledEdit ? "mt-2 bg-gray-50 rounded-xl p-4" : ""}>
      {/* حالت ویرایش (چند انتخابی با AnimatedMultiSelect) */}
      {isDisabledEdit ? (
        <div className="flex gap-2 items-end">
          <AnimatedMultiSelect
            label="مقادیر ویژگی"
            options={(attrValues ?? [])
              .filter((val: any) => {
                if (!attrInfos.length) return true;
                const existVal = attrInfos.find((v: any) => v.id === val.id);
                return !existVal;
              })
              .map((v: any) => ({
                value: v.id,
                label: v.value,
                color: v.display_color,
              }))}
            selectedValues={selectedValues}
            onChange={(vals) => onChange(vals.map(Number))}
            placeholder="مقادیر مورد نظر را جستجو و انتخاب کنید"
          />

          <AddNewAttributeValueModal attributeId={selectedAttrId}/>
        </div>
      ) : (
        /* حالت ادیت (انتخاب یکی با AutocompleteInput) */
        <div className="flex items-end gap-2">
          <AutocompleteInput
            label="مقدار ویژگی"
            placeholder="مقدار را جستجو یا انتخاب کنید"
            selectedId={selectedValueId ?? ""}
            onChange={(id) => setSelectedValueId(Number(id))}
            options={
              attrValues?.map((v) => ({
                id: v.id,
                title: v.value,
              })) ?? []
            }
          />

          <AddNewAttributeValueModal attributeId={selectedAttrId}/>
        </div>
      )}

      {/* نمایش نام + ویرایش/حذف */}
      {selectedValueId && !isDisabledEdit && (
        <div className="flex justify-between items-center pt-4 gap-2 mt-4 border-t">
          <p className="font-medium text-gray-700">
            مقدار: (
            {attrValues.find((v) => v.id === selectedValueId)?.value ||
              "نامشخص"}
            )
          </p>
          <div className="flex gap-2">
            <AddNewAttributeValueModal
              type="edit"
              attributeId={selectedAttrId}
              defaultDatas={
                attrValues.find((v) => v.id === selectedValueId) as
                  | AttributeValue
                  | undefined
              }
            />
            <DeleteButton onDelete={handleDelete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewAttributeValue;
