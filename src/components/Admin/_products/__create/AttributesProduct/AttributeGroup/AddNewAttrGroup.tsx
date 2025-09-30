"use client";

import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import AddNewAttributeGroupModal from "./AddNewAttributeGroupModal";
import React, { useState } from "react";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";
import { useDeleteAttributeGroup } from "@/hooks/attributes/useAttributeGroup";
import SelectWithAddButton from "../../helpers/SelectWithAddButton";

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
  //? Hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    <>
      <div className={!isDisabledEdit ? "mt-2 bg-gray-50 rounded-xl p-4" : ""}>
        <SelectWithAddButton
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
          selectedId={selectedAttrGroupId || -1}
          onChange={(id) => {
            onChange(+id);
            setSelectedAttrGroupId(+id);
          }}
          onAddNewClick={() => {
            onOpen();
            setType("add");
          }}
        />
        {/* <Select
          isRequired
          label="گروه ویژگی"
          placeholder="گروه را انتخاب کنید"
          labelPlacement="outside"
          onChange={(e) => {
            onChange(+e.target.value);
            setSelectedAttrGroupId(+e.target.value);
          }}
          endContent={
            <Button
              color="secondary"
              variant="flat"
              size="sm"
              onPress={() => {
                onOpen();
                setType("add");
              }}
            >
              + افزودن
            </Button>
          }
        >
          {attrGroup && attrGroup.length ? (
            attrGroup.map((item: any) => (
              <SelectItem key={item.id}>{item.name}</SelectItem>
            ))
          ) : (
            <SelectItem isDisabled>فعلا آیتمی وجود ندارد</SelectItem>
          )}
        </Select> */}

        {selectedAttrGroupId && !isDisabledEdit ? (
          <div className="flex items-center gap-4 mt-2">
            <DoubleClickBtn
              onPress={handleDeleteAttrGroup}
              textBtn="حذف گروه فعلی"
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
              ویرایش گروه فعلی
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      <AddNewAttributeGroupModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        defaultDatas={attrGroup?.find((g: any) => g.id === selectedAttrGroupId)}
        type={type}
      />
    </>
  );
};

export default AddNewAttrGroup;
