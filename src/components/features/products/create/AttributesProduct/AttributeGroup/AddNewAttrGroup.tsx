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
  const [selectedAttrGroupId, setSelectedAttrGroupId] = useState<
    number | undefined
  >(undefined);
  const { mutate: deleteAttributeGroup } = useDeleteAttributeGroup();

  const handleDeleteAttrGroup = (id: number) => {
    console.log(selectedAttrGroupId);
    if (!selectedAttrGroupId && !id) return;
    
    deleteAttributeGroup(selectedAttrGroupId ? selectedAttrGroupId : +id, {
      onSuccess: (res) => {
        console.log(res);

        setSelectedAttrGroupId(undefined);
        onChange(undefined);
      },
    });
  };

  return (
    <AttributeBox
      attr={attrGroup}
      addBtn={<AddNewAttributeGroupModal />}
      onClick={(id) => {
        setSelectedAttrGroupId(id);
        onChange(id);
      }}
      deleteAttr={handleDeleteAttrGroup}
    >
      <AddNewAttributeGroupModal
        type="edit"
        defaultDatas={
          attrGroup?.length
            ? (attrGroup.find(
                (g: any) => g.id === selectedAttrGroupId
              ) as AttributeGroup)
            : undefined
        }
      />
    </AttributeBox>
  );
};

export default AddNewAttrGroup;
