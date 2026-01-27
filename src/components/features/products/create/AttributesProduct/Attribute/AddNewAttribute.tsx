"use client";

import React, { useState } from "react";
import AddNewAttributeModal from "./AddNewAttributeModal";
import { useDeleteAttribute } from "@/core/hooks/api/attributes/useAttribute";
import { Attribute } from "../attribute.types";
import AttributeBox from "../AttributeBox";

type Props = {
  onChange: (value: number | undefined) => void;
  attr: Attribute[];
  isDisabledEdit: boolean;
};

const AddNewAttribute: React.FC<Props> = ({ onChange, attr }) => {
  const [selectedAttrEdit, setSelectedAttrEdit] = useState<number | undefined>(
    undefined
  );

  const { mutate: deleteAttribute } = useDeleteAttribute();

  const handleDelete = (id: number) => {
    deleteAttribute(id, {
      onSuccess: () => onChange(undefined),
    });
  };

  return (
    <AttributeBox
      attr={attr}
      onChoose={onChange}
      onEdit={setSelectedAttrEdit}
      deleteAttr={handleDelete}
      addBtn={<AddNewAttributeModal />}
      placeholderInput="جستجو ویژگی..."
    >
      <AddNewAttributeModal
        type="edit"
        defaultDatas={attr?.find((a) => a.id === selectedAttrEdit)}
      />
    </AttributeBox>
  );
};

export default AddNewAttribute;
