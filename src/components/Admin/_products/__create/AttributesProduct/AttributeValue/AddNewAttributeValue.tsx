"use client";

import { useDisclosure } from "@heroui/react";
import AddNewAttributeValueModal from "./AddNewAttributeValueModal";
import React, { useState } from "react";
import { useDeleteAttributeValue } from "@/hooks/attributes/useAttributeValue";
import { useAttributeContext } from "../../../context/AttributeContext";
import SelectWithAddButton from "../../helpers/SelectWithAddButton";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import DynamicModal from "@/components/Helper/DynamicModal";
import { Select, SelectItem } from "@heroui/react";

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

  const deleteAttributeValue = useDeleteAttributeValue();
  const { attrInfos } = useAttributeContext();

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

  const handleDeleteAttrValue = () => {
    if (!selectedAttrValueId) return;
    deleteAttributeValue.mutate(selectedAttrValueId, {
      onSuccess: () => {
        setSelectedAttrValueId(undefined);
      },
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
          // حالت فقط انتخاب
          <div className="flex gap-2 items-center justify-center w-full">
            <Select
              label="مقادیر ویژگی"
              labelPlacement="outside"
              placeholder="مقادیر مورد نظر را انتخاب نمایید"
              selectedKeys={selectedValues?.map(String) ?? []}
              selectionMode="multiple"
              onChange={handleChange}
              isRequired
            >
              {attrValues && attrValues.length ? (
                attrValues
                  .filter((val) => {
                    if (!attrInfos.length) return true;
                    const existVal = attrInfos.find(
                      (value) => value.id === val.id
                    );
                    return !existVal && val;
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
            <p
              className="w-24 z-10 text-center text-purple-700 bg-purple-200 rounded-xl mt-[24px] py-1.5 cursor-pointer truncate"
              onClick={onOpenAdd}
            >
              + افزودن
            </p>
          </div>
        ) : (
          // حالت قابل ویرایش
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
              onAddNewClick={() => {
                onOpenAdd();
                setType("add");
              }}
            />

            {selectedAttrValueId && !isDisabledEdit ? (
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
          </>
        )}
      </div>

      {/* افزودن / ویرایش */}
      <AddNewAttributeValueModal
        isOpen={isOpenAdd}
        onOpenChange={onOpenChangeAdd}
        attributeId={selectedAttrId}
        defaultDatas={attrValues?.find((val) => val.id === selectedAttrValueId)}
        type={type}
      />

      {/* حذف */}
      <DynamicModal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        onConfirm={handleDeleteAttrValue}
      >
        <p className="leading-7 text-danger-600">
          با حذف مقدار ویژگی انتخاب شده دیگر قابل بازگردانی نیست! آیا از حذف
          اطمینان دارید؟
        </p>
      </DynamicModal>
    </>
  );
};

export default AddNewAttributeValue;
