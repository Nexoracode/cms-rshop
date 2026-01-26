"use client";

import React, { useState } from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import AddNewAttributeValueModal from "./AddNewAttributeValueModal";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";
import { useDeleteAttributeValue } from "@/core/hooks/api/attributes/useAttributeValue";
import { useAttributeContext } from "../../context/AttributeContext";
import AnimatedMultiSelect from "@/components/forms/Inputs/SearchableMultiSelect";
import { AttributeValue } from "../attribute.types";
import AttributeBox from "../AttributeBox";

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
  const [selectedAttrEdit, setSelectedAttrEdit] = useState<number | undefined>(
    undefined
  );
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
    <>
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

          <AddNewAttributeValueModal attributeId={selectedAttrId} />
        </div>
      ) : (
        <AttributeBox
          attr={attrValues}
          onChoose={(id) => {
            if (!id) return;
            if (!selectedValues.includes(id)) {
              onChange([...selectedValues, id]);
            }
          }}
          onEdit={setSelectedAttrEdit}
          deleteAttr={handleDelete}
          addBtn={<AddNewAttributeValueModal attributeId={selectedAttrId} />}
        >
          <AddNewAttributeValueModal
            type="edit"
            attributeId={selectedAttrId}
            defaultDatas={attrValues?.find((v) => v.id === selectedAttrEdit)}
          />
        </AttributeBox>
      )}
    </>
  );
};

export default AddNewAttributeValue;
