"use client";

import React, { useState } from "react";
import AddNewAttributeValueModal from "./AddNewAttributeValueModal";
import { useDeleteAttributeValue } from "@/core/hooks/api/attributes/useAttributeValue";
import { useAttributeContext } from "../../context/AttributeContext";
import { AttributeValue } from "../attribute.types";
import AttributeBox from "../AttributeBox";

type Props = {
  attrValues: AttributeValue[];
  selectedValues: number[];
  onChange: (values: number[]) => void;
  selectedAttrId: number | undefined;
  isDisabledEdit: boolean;
  selectedAttrGroupId: number | undefined;
};

const AddNewAttributeValue: React.FC<Props> = ({
  attrValues,
  selectedValues,
  onChange,
  selectedAttrId,
  selectedAttrGroupId,
  isDisabledEdit,
}) => {
  const [selectedAttrEdit, setSelectedAttrEdit] = useState<number | undefined>(
    undefined,
  );
  const [selectedValueId, setSelectedValueId] = useState<number | undefined>(
    undefined,
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

  const filteredAttrValues = () => {
    if (!attrInfos.length || !attrValues?.length) return attrValues;

    return attrValues.filter((val: any) => {
      const existVal = attrInfos.find((v: any) => v.id === val.id);
      return !existVal;
    });
  };

  return (
    <>
      {isDisabledEdit ? (
        <AttributeBox
          attr={filteredAttrValues()?.map((v: any) => ({
            id: v.id,
            value: v.value,
            color: v.display_color,
          }))}
          multiSelect
          selectedIds={selectedValues}
          onChoose={(id) => {
            if (selectedValues.includes(id)) {
              onChange(selectedValues.filter((v) => v !== id));
            } else {
              onChange([...selectedValues, id]);
            }
          }}
          onEdit={setSelectedAttrEdit}
          deleteAttr={handleDelete}
          addBtn={<AddNewAttributeValueModal attributeId={selectedAttrId} />}
          placeholderInput="جستجو مقدار ویژگی..."
        >
          <AddNewAttributeValueModal
            type="edit"
            attributeId={selectedAttrId}
            attributeGroupId={selectedAttrGroupId}
            defaultDatas={attrValues?.find((v) => v.id === selectedAttrEdit)}
          />
        </AttributeBox>
      ) : (
        <AttributeBox
          attr={attrValues}
          onEdit={setSelectedAttrEdit}
          deleteAttr={handleDelete}
          addBtn={<AddNewAttributeValueModal attributeId={selectedAttrId} />}
          placeholderInput="جستجو مقدار ویژگی..."
          selectedNone
        >
          <AddNewAttributeValueModal
            type="edit"
            attributeId={selectedAttrId}
            attributeGroupId={selectedAttrGroupId}
            defaultDatas={attrValues?.find((v) => v.id === selectedAttrEdit)}
          />
        </AttributeBox>
      )}
    </>
  );
};

export default AddNewAttributeValue;
