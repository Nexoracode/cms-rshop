"use client";

import { useDisclosure } from "@heroui/react";
import React, { useState } from "react";
import AddNewAttributeValueModal from "./AddNewAttributeValueModal";
import { useDeleteAttributeValue } from "@/hooks/api/attributes/useAttributeValue";
import { useAttributeContext } from "../../context/AttributeContext";
import AnimatedMultiSelect from "@/components/forms/Inputs/SearchableMultiSelect";
import { TbEdit } from "react-icons/tb";
import DeleteButton from "@/components/shared/DeleteButton";
import SelectBox from "@/components/ui/inputs/SelectBox";

type Props = {
  attrValues: Record<string, any>[];
  selectedValues: number[];
  onChange: (values: number[]) => void;
  selectedAttrId: number | undefined;
  isDisabledEdit: boolean;
};

const AddNewAttributeValue: React.FC<Props> = ({
  attrValues,
  selectedValues,
  onChange,
  selectedAttrId,
  isDisabledEdit,
}) => {
  const [type, setType] = useState<"edit" | "add">("add");
  const [selectedAttrValueId, setSelectedAttrValueId] = useState<
    number | undefined
  >(undefined);

  // hooks
  const deleteAttributeValue = useDeleteAttributeValue();
  const { attrInfos } = useAttributeContext();

  // modals
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();

  const handleDeleteAttrValue = () => {
    if (!selectedAttrValueId) return;
    deleteAttributeValue.mutate(selectedAttrValueId, {
      onSuccess: () => {
        setSelectedAttrValueId(undefined);
        onChange([]);
      },
    });
  };

  return (
    <>
      <div className={!isDisabledEdit ? "mt-2 bg-gray-50 rounded-xl p-4" : ""}>
        {isDisabledEdit ? (
          <div className="flex gap-2 items-center justify-center w-full">
            <AnimatedMultiSelect
              label="مقادیر ویژگی"
              options={(attrValues ?? [])
                .filter((val: any) => {
                  if (!attrInfos.length) return true;
                  const existVal = attrInfos.find((v: any) => v.id === val.id);
                  return !existVal;
                })
                .map((v: any) => ({
                  value: v.id,
                  label: v.value,
                  color: v.display_color,
                }))}
              selectedValues={selectedValues}
              onChange={(vals) => onChange(vals.map(Number))}
              placeholder="مقادیر مورد نظر را جستجو و انتخاب کنید"
            />

            <p
              className="w-24 z-10 text-center text-purple-700 bg-purple-200 rounded-xl mt-[24px] py-1.5 cursor-pointer truncate"
              onClick={onOpenAdd}
            >
              + افزودن
            </p>
          </div>
        ) : (
          ""
        )}

        {!isDisabledEdit ? (
          <SelectBox
            label="مقدار ویژگی"
            value={selectedAttrValueId ?? ""}
            onChange={(val) => setSelectedAttrValueId(Number(val))}
            options={
              attrValues?.map((d) => ({
                key: d.id,
                title: d.value,
              })) ?? []
            }
            placeholder="مقدار ویژگی را انتخاب کنید"
            addButton={{
              onClick: onOpenAdd,
              label: "+ افزودن",
            }}
            isRequired={false}
          />
        ) : null}

        {selectedValues && !isDisabledEdit && selectedAttrValueId ? (
          <div className="flex justify-between items-center pt-4 gap-2 mt-4 border-t">
            <p className="font-medium text-gray-700">عملیات</p>
            <div className="flex gap-2">
              {/* ویرایش */}
              <button
                onClick={() => {
                  onOpenAdd();
                  setType("edit");
                }}
                className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
              >
                <TbEdit size={20} />
              </button>

              <DeleteButton onDelete={handleDeleteAttrValue} />
            </div>
          </div>
        ) : null}
      </div>

      {/* افزودن یا ویرایش مقدار */}
      <AddNewAttributeValueModal
        isOpen={isOpenAdd}
        onOpenChange={onOpenChangeAdd}
        attributeId={selectedAttrId}
        defaultDatas={attrValues?.find((val) => val.id === selectedAttrValueId)}
        type={type}
      />
    </>
  );
};

export default AddNewAttributeValue;
