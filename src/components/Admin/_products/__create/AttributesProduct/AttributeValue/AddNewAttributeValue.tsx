// AddNewAttributeValue.tsx
"use client";

import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import AddNewAttributeValueModal from "./AddNewAttributeValueModal";
import HeaderAction from "../../helpers/HeaderAction";
import React, { useState } from "react";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";
import { useDeleteAttributeValue } from "@/hooks/attributes/useAttributeValue";
import { useAttributeContext } from "../../../context/AttributeContext";

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
  const { attrInfos, setAttrInfos } = useAttributeContext();
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
      <div className="mt-2 bg-gray-50 rounded-xl p-4">
        <div className="flex w-full flex-col gap-2">
          <Select
            label="مقادیر مورد نظر را انتخاب کنید"
            labelPlacement="outside"
            placeholder="مقادیر ویژگی"
            selectedKeys={selectedValues?.map(String) ?? []}
            selectionMode="multiple"
            onChange={handleChange}
          >
            {attrValues && attrValues.length ? (
              attrValues
                .filter((val) => {
                  if (!attrInfos.length) return true;

                  const attrInfo = attrInfos.find(
                    (attr) => attr.id === selectedAttrId
                  );

                  if (!attrInfo || !attrInfo.values) return true;

                  return !attrInfo.values.some((v: any) => v.id === val.id);
                })
                .map((data: any) => (
                  <SelectItem key={data.id} textValue={data.value}>
                    <div className="flex items-center gap-2">
                      {data.display_color && (
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: data.display_color }}
                        />
                      )}
                      <span>{data.value}</span>
                    </div>
                  </SelectItem>
                ))
            ) : (
              <SelectItem key={-1} isDisabled>
                فعلا آیتمی وجود ندارد
              </SelectItem>
            )}
          </Select>
        </div>

        <HeaderAction
          title={"در صورت نیاز میتوانید مقدار جدیدی اضافه کنید"}
          textBtn={"+ افزودن"}
          onPress={onOpen}
        />

        {editAttrValue ? (
          <Select
            isRequired
            placeholder="مقدار ویژگی را انتخاب کنید"
            labelPlacement="outside"
            onChange={(e) => {
              setSelectedAttrValueId(+e.target.value);
            }}
            className="mb-4"
          >
            {attrValues ? (
              attrValues.map((data: any) => (
                <SelectItem key={data.id}>{data.value}</SelectItem>
              ))
            ) : (
              <SelectItem key={-1}>فعلا آیتمی وجود ندارد</SelectItem>
            )}
          </Select>
        ) : (
          ""
        )}

        {selectedValues && selectedValues.length && !isDisabledEdit ? (
          <div className="flex items-center gap-4 mt-2">
            <Button
              size="sm"
              className="w-full bg-gray-100"
              onPress={() => {
                setEditAttrValue((prev) => !prev);
                setSelectedAttrValueId(undefined);
              }}
            >
              {!editAttrValue
                ? "ویرایش مقادیر ویژگی"
                : "لغو ویرایش مقادیر ویژگی"}
            </Button>
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
