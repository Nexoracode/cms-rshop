"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  useDisclosure,
} from "@heroui/react";
import AddNewAttributeGroupModal from "./AddNewAttributeGroupModal";
import React, { useState } from "react";
import { useDeleteAttributeGroup } from "@/hooks/attributes/useAttributeGroup";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import DynamicModal from "@/components/Helper/DynamicModal";
import { LuPlus } from "react-icons/lu";
import AutocompleteWithAddButton from "../../helpers/AutocompleteWithAddButton";

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
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();
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
          options={attrGroup.map((g) => ({ id: g.id, title: g.name }))}
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
              <button
                onClick={() => {
                  onOpenDelete();
                }}
                className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
              >
                <RiDeleteBin5Line size={20} />
              </button>
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
      <DynamicModal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        onConfirm={handleDeleteAttrGroup}
      >
        <p className="leading-7 text-danger-600">
          با حذف گروه ویژگی انتخاب شده دیگر قابل بازگردانی نیست! آیا از حذف
          اطمینان دارید؟
        </p>
      </DynamicModal>
    </>
  );
};

export default AddNewAttrGroup;
