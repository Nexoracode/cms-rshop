"use client";

import { useDisclosure } from "@heroui/react";
import AddNewAttributeModal from "./AddNewAttributeModal";
import { useState } from "react";
import { useDeleteAttribute } from "@/hooks/api/attributes/useAttribute";
import SelectWithAddButton from "../../helpers/SelectWithAddButton";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import DynamicModal from "@/components/Helper/DynamicModal";
import AutocompleteWithAddButton from "../../helpers/AutocompleteWithAddButton";

type Props = {
  onChange: (value: number | undefined) => void;
  attr: Record<string, any>[];
  selectedAttrId: number | undefined;
  isDisabledEdit: boolean;
};

const AddNewAttribute: React.FC<Props> = ({
  onChange,
  attr,
  selectedAttrId,
  isDisabledEdit,
}) => {
  const [type, setType] = useState<"edit" | "add">("add");

  const deleteAttribute = useDeleteAttribute();

  // modals
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

  const handleDeleteAttr = () => {
    if (!selectedAttrId) return;
    deleteAttribute.mutate(selectedAttrId, {
      onSuccess: () => {
        onChange(undefined);
      },
    });
  };

  return (
    <>
      <div className={!isDisabledEdit ? "mt-2 bg-gray-50 rounded-xl p-4" : ""}>

        <AutocompleteWithAddButton
          label="ویژگی"
          placeholder="ویژگی را جستجو یا انتخاب کنید"
          options={
            attr?.length
              ? attr.map((item: any) => ({
                  id: item.id,
                  title: item.name,
                }))
              : []
          }
          selectedId={selectedAttrId || ""}
          onChange={(id) => {
            onChange(+id);
          }}
          onAddNewClick={() => {
            onOpenAdd();
            setType("add");
          }}
        />

        {selectedAttrId && !isDisabledEdit ? (
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
        ) : null}
      </div>

      {/* ویرایش یا افزودن */}
      <AddNewAttributeModal
        isOpen={isOpenAdd}
        onOpenChange={onOpenChangeAdd}
        defaultDatas={attr?.find((a) => a.id === selectedAttrId)}
        type={type}
      />

      {/* حذف */}
      <DynamicModal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        onConfirm={handleDeleteAttr}
      >
        <p className="leading-7 text-danger-600">
          با حذف ویژگی انتخاب شده دیگر قابل بازگردانی نیست! آیا از حذف اطمینان
          دارید؟
        </p>
      </DynamicModal>
    </>
  );
};

export default AddNewAttribute;
