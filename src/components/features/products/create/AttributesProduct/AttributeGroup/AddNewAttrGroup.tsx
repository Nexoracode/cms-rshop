"use client";

import React, { useState } from "react";
import DeleteButton from "@/components/shared/DeleteButton";
import AddNewAttributeGroupModal from "./AddNewAttributeGroupModal";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";
import { useDeleteAttributeGroup } from "@/hooks/api/attributes/useAttributeGroup";
import { AttributeGroup } from "..";

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

  return (
    <div className={!isDisabledEdit ? "mt-2 bg-slate-50 rounded-xl p-4" : ""}>
      <div className="flex items-end gap-2">
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

        {!isDisabledEdit && <AddNewAttributeGroupModal />}
      </div>

      {selectedAttrGroupId && !isDisabledEdit && (
        <div className="flex justify-between items-center pt-4 gap-2 mt-4 border-t">
          <p className="font-medium text-gray-700">
            گروه ویژگی (
            {attrGroup?.find((g: any) => g.id === selectedAttrGroupId)?.name})
          </p>
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
        </div>
      )}
    </div>
  );
};

export default AddNewAttrGroup;
