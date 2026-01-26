"use client";

import AddNewAttributeGroupModal from "./AddNewAttributeGroupModal";
import { useDeleteAttributeGroup } from "@/core/hooks/api/attributes/useAttributeGroup";
import { AttributeGroup } from "../attribute.types";
import AttributeBox from "../AttributeBox";
import { useState } from "react";

type Props = {
  onChange: (value: number | undefined) => void;
  attrGroup: Record<string, any>[];
  isDisabledEdit: boolean;
};

const AddNewAttrGroup: React.FC<Props> = ({
  onChange,
  attrGroup,
  isDisabledEdit,
}) => {
  const [selectedAttrEdit, setSelectedAttrEdit] = useState<number | undefined>(
    undefined
  );
  const { mutate: deleteAttributeGroup } = useDeleteAttributeGroup();

  const handleDeleteAttrGroup = (id: number) => {
    deleteAttributeGroup(+id, {
      onSuccess: () => onChange(undefined),
    });
  };

  return (
    <AttributeBox
      attr={attrGroup}
      addBtn={<AddNewAttributeGroupModal />}
      onChoose={(id) => onChange(id)}
      onEdit={setSelectedAttrEdit}
      deleteAttr={handleDeleteAttrGroup}
    >
      <AddNewAttributeGroupModal
        type="edit"
        defaultDatas={
          attrGroup?.length
            ? (attrGroup?.find(
                (g: any) => g.id === selectedAttrEdit
              ) as AttributeGroup)
            : undefined
        }
      />
    </AttributeBox>
  );
};

export default AddNewAttrGroup;
