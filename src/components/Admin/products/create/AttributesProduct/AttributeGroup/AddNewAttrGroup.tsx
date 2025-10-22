"use client";

import {
  useDisclosure,
} from "@heroui/react";
import AddNewAttributeGroupModal from "./AddNewAttributeGroupModal";
import React, { useState } from "react";
import { useDeleteAttributeGroup } from "@/hooks/api/attributes/useAttributeGroup";
import { TbEdit } from "react-icons/tb";
import AutocompleteWithAddButton from "../../helpers/AutocompleteWithAddButton";
import DeleteButton from "@/components/forms/DeleteButton";

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
  const [type, setType] = useState<"edit" | "add">("add");
  const deleteAttributeGroup = useDeleteAttributeGroup();
  //? Hooks
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();

  const handleDeleteAttrGroup = () => {
    if (!selectedAttrGroupId) return;
    deleteAttributeGroup.mutate(selectedAttrGroupId, {
      onSuccess: () => {
        setSelectedAttrGroupId(undefined);
        onChange(undefined);
      },
    });
  };

  return (
    <>
      <div className={!isDisabledEdit ? "mt-2 bg-gray-50 rounded-xl p-4" : ""}>
        <AutocompleteWithAddButton
          label="گروه ویژگی"
          placeholder="گروه را انتخاب کنید"
          options={
            attrGroup?.length
              ? attrGroup.map((item: any) => ({
                  id: item.id,
                  title: item.name,
                }))
              : []
          }
          selectedId={selectedAttrGroupId || ""}
          onChange={(id) => {
            onChange(+id);
            setSelectedAttrGroupId(+id);
          }}
          onAddNewClick={() => {
            onOpenAdd();
            setType("add");
          }}
        />

        {selectedAttrGroupId && !isDisabledEdit ? (
          <div className="flex justify-between items-center pt-4 gap-2 mt-4 border-t">
            <p className="font-medium text-gray-700">عملیات</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onOpenAdd();
                  setType("edit");
                }}
                className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
              >
                <TbEdit size={20} />
              </button>
              <DeleteButton onDelete={handleDeleteAttrGroup} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <AddNewAttributeGroupModal
        isOpen={isOpenAdd}
        onOpenChange={onOpenChangeAdd}
        defaultDatas={attrGroup?.find((g: any) => g.id === selectedAttrGroupId)}
        type={type}
      />
    </>
  );
};

export default AddNewAttrGroup;
