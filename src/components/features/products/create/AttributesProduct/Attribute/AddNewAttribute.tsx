"use client";

import AddNewAttributeModal from "./AddNewAttributeModal";
import { useState } from "react";
import { useDeleteAttribute } from "@/hooks/api/attributes/useAttribute";
import DeleteButton from "@/components/shared/DeleteButton";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";

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
  const [selectedAttributeId, setSelectedAttributeId] = useState<
    number | undefined
  >(undefined);
  const deleteAttribute = useDeleteAttribute();

  const handleDeleteAttr = () => {
    if (!selectedAttrId) return;
    deleteAttribute.mutate(selectedAttrId, {
      onSuccess: () => {
        onChange(undefined);
      },
    });
  };

  return (
    <div className={!isDisabledEdit ? "mt-2 bg-slate-50 rounded-xl p-4" : ""}>
      <div className="flex items-end gap-2">
        <AutocompleteInput
          isRequired={isDisabledEdit}
          label="ویژگی"
          placeholder="ویژگی را جستجو یا انتخاب کنید"
          selectedId={selectedAttrId || ""}
          onChange={(id) => {
            onChange(+id);
            setSelectedAttributeId(+id);
          }}
          options={
            attr?.length
              ? attr.map((item: any) => ({
                  id: item.id,
                  title: item.name,
                }))
              : []
          }
        />

        {!isDisabledEdit && <AddNewAttributeModal />}
      </div>

      {selectedAttrId && !isDisabledEdit && (
        <div className="flex justify-between items-center pt-4 gap-2 mt-4 border-t">
          <p className="font-medium text-gray-700">
            ویژگی ({attr?.find((g: any) => g.id === selectedAttrId)?.name})
          </p>
          <div className="flex gap-2">
            <AddNewAttributeModal
              type="edit"
              defaultDatas={
                attr.length
                  ? (attr.find((g: any) => g.id === selectedAttrId) as Attr)
                  : undefined
              }
            />
            <DeleteButton onDelete={handleDeleteAttr} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewAttribute;
