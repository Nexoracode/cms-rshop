"use client";

import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import HeaderAction from "../../helpers/HeaderAction";
import AddNewAttributeGroupModal from "./AddNewAttributeGroupModal";
import React, { useState } from "react";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";
import { useDeleteAttributeGroup } from "@/hooks/attributes/useAttributeGroup";

type Props = {
  onChange: (value: number | undefined) => void;
  attrGroup: Record<string, any>[];
};

const AddNewAttrGroup: React.FC<Props> = ({ onChange, attrGroup }) => {
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
      <div className="mt-2 bg-gray-50 rounded-xl p-4">
        <Select
          isRequired
          label="دسته بندی ویژگی"
          placeholder="دسته بندی ویژگی را انتخاب کنید"
          labelPlacement="outside"
          onChange={(e) => {
            onChange(+e.target.value);
            setSelectedAttrGroupId(+e.target.value);
          }}
        >
          {attrGroup && attrGroup.length ? (
            attrGroup.map((item: any) => (
              <SelectItem key={item.id}>{item.name}</SelectItem>
            ))
          ) : (
            <SelectItem isDisabled>فعلا آیتمی وجود ندارد</SelectItem>
          )}
        </Select>

        <HeaderAction
          title={"در صورت نیاز میتوانید دسته بندی جدیدی اضافه کنید"}
          textBtn={"+ افزودن"}
          onPress={() => {
            onOpen();
            setType("add");
          }}
        />
        {selectedAttrGroupId ? (
          <div className="flex items-center gap-4 mt-2">
            <DoubleClickBtn
              onPress={handleDeleteAttrGroup}
              textBtn="حذف دسته بندی فعلی"
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
              ویرایش دسته بندی فعلی
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
