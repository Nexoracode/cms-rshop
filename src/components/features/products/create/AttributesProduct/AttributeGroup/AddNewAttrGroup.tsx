"use client";

import React, { useState } from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import AddNewAttributeGroupModal from "./AddNewAttributeGroupModal";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";
import { useDeleteAttributeGroup } from "@/core/hooks/api/attributes/useAttributeGroup";
import { AttributeGroup } from "../attribute.types";
import { Divider, Input } from "@heroui/react";
import { FaSearch } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

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
  const deleteAttributeGroup = useDeleteAttributeGroup();

  const handleDeleteAttrGroup = () => {
    if (!selectedAttrGroupId) return;
    deleteAttributeGroup.mutate(selectedAttrGroupId, {
      onSuccess: () => {
        setSelectedAttrGroupId(undefined);
        onChange(undefined);
      },
    });
  };

  const AttributeGroupsBtns = () => {
    return (
      <div className="flex gap-2">
        <AddNewAttributeGroupModal
          type="edit"
          defaultDatas={
            attrGroup.length
              ? (attrGroup.find(
                  (g: any) => g.id === selectedAttrGroupId
                ) as AttributeGroup)
              : undefined
          }
        />
        <DeleteButton onDelete={handleDeleteAttrGroup} />
      </div>
    );
  };

  return (
    <div className="p-2">
      <div>
        <div className="flex items-center justify-between">
          <Input
            type="search"
            placeholder="جستجو گروه ویژگی..."
            startContent={<BiSearch size={18} />}
            className="w-fit"
            variant="flat"
            size="sm"
          />
          <div className="flex items-center gap-2">
            {selectedAttrGroupId && !isDisabledEdit && AttributeGroupsBtns()}
            <AddNewAttributeGroupModal />
          </div>
        </div>
        <div className="p-2 rounded-xl mt-3 border border-slate-300 max-h-[200px] h-full">
          <ul className="flex flex-col overflow-y-auto overflow-hidden max-h-[180px]">
            {attrGroup?.length
              ? attrGroup.map((item: any, index) => (
                  <li
                    key={item.id}
                    className={`border-slate-200 text-gray-700 flex items-center justify-between mx-2 p-2 py-1 group ${
                      selectedAttrGroupId === item.id
                        ? "bg-slate-100"
                        : "hover:bg-slate-50"
                    } ${attrGroup?.length - 1 !== index ? "border-b" : ""}`}
                    onClick={() => {
                      onChange(+item.id);
                      setSelectedAttrGroupId(+item.id);
                    }}
                  >
                    <span>{item.name}</span>
                    <div className={`opacity-0 group-hover:opacity-100`}>
                      {AttributeGroupsBtns()}
                    </div>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>

      {/*   <div className="flex items-end gap-2">
        <AutocompleteInput
          isRequired={isDisabledEdit}
          label="گروه ویژگی"
          placeholder="گروه را جستجو یا انتخاب کنید"
          selectedId={selectedAttrGroupId || ""}
          onChange={(id) => {
            onChange(+id);
            setSelectedAttrGroupId(+id);
          }}
          options={
            attrGroup?.length
              ? attrGroup.map((item: any) => ({
                  id: item.id,
                  title: item.name,
                }))
              : []
          }
        />
      </div> */}
    </div>
  );
};

export default AddNewAttrGroup;
