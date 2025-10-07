// AddNewAttributeValue.tsx
"use client";

import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import AddNewAttributeValueModal from "./AddNewAttributeValueModal";
import React, { useState } from "react";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";
import { useDeleteAttributeValue } from "@/hooks/api/attributes/useAttributeValue";
import { useAttributeContext } from "../../../context/AttributeContext";
import SelectWithAddButton from "../../helpers/SelectWithAddButton";
import MultiSelectSearch from "@/components/Helper/SearchableMultiSelect";
import AnimatedMultiSelect from "@/components/Helper/SearchableMultiSelect";

type Props = {
  attrValues: Record<string, any>[]; // list of possible values from server
  selectedValues: number[]; // selected value ids (from parent state)
  onChange: (values: number[]) => void; // notify parent with array of selected ids
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
  const [editAttrValue, setEditAttrValue] = useState(false);
  const [type, setType] = useState<"edit" | "add">("add");
  const [selectedAttrValueId, setSelectedAttrValueId] = useState<
    number | undefined
  >(undefined);
  //? Hooks
  const deleteAttributeValue = useDeleteAttributeValue();
  const { attrInfos } = useAttributeContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDeleteAttrValue = () => {
    if (!selectedAttrValueId) return;
    deleteAttributeValue.mutate(selectedAttrValueId, {
      onSuccess: () => {},
    });
  };

  const handleChange = (e: any) => {
    const raw = e.target.value || "";
    const arr = raw
      .toString()
      .split(",")
      .map((s: any) => s.trim())
      .filter(Boolean)
      .map((s: any) => +s);

    onChange(arr);
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
              onClick={onOpen}
            >
              + افزودن
            </p>
          </div>
        ) : (
          ""
        )}

        {!isDisabledEdit ? (
          <>
            <SelectWithAddButton
              label="مقدار ویژگی"
              placeholder="مقدار ویژگی را انتخاب کنید"
              options={
                attrValues?.map((d: any) => ({
                  id: d.id,
                  title: d.value,
                })) ?? []
              }
              selectedId={selectedAttrValueId ?? ""}
              onChange={(id) => setSelectedAttrValueId(+id)}
              onAddNewClick={onOpen} // اینو می‌دی تا همون +افزودن کار کنه
            />
          </>
        ) : (
          ""
        )}

        {selectedValues && !isDisabledEdit ? (
          <div className="flex items-center gap-4 mt-2">
            {selectedAttrValueId ? (
              <>
                <DoubleClickBtn
                  onPress={handleDeleteAttrValue}
                  textBtn="حذف مقدار ویژگی فعلی"
                  color="danger"
                  size="sm"
                  isActiveDoubleClick
                  className="w-full"
                />
                <Button
                  size="sm"
                  className="w-full"
                  onPress={() => {
                    onOpen();
                    setType("edit");
                  }}
                >
                  ویرایش مقدار ویژگی فعلی
                </Button>
              </>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      <AddNewAttributeValueModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        attributeId={selectedAttrId}
        defaultDatas={attrValues?.find((val) => val.id === selectedAttrValueId)}
        type={type}
      />
    </>
  );
};

export default AddNewAttributeValue;
