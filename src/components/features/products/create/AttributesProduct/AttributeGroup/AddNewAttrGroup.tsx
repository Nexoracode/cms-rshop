"use client";

import React, { useState } from "react";
import AutocompleteWithAddButton from "../../helpers/AutocompleteWithAddButton";
import DeleteButton from "@/components/shared/DeleteButton";
import AddNewAttributeGroupModal from "./AddNewAttributeGroupModal";

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

  const handleDeleteAttrGroup = () => {
    if (!selectedAttrGroupId) return;
    const {
      useDeleteAttributeGroup,
    } = require("@/hooks/api/attributes/useAttributeGroup");
    const deleteAttributeGroup = useDeleteAttributeGroup();
    deleteAttributeGroup.mutate(selectedAttrGroupId, {
      onSuccess: () => {
        setSelectedAttrGroupId(undefined);
        onChange(undefined);
      },
    });
  };

  return (
    <div className={!isDisabledEdit ? "mt-2 bg-gray-50 rounded-xl p-4" : ""}>
      <div className="flex items-end gap-2">
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
          onAddNewClick={() => {}}
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
              defaultDatas={attrGroup?.find(
                (g: any) => g.id === selectedAttrGroupId
              )}
            />
            <DeleteButton onDelete={handleDeleteAttrGroup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewAttrGroup;
