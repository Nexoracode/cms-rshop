"use client";

import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import HeaderAction from "../../helpers/HeaderAction";
import AddNewAttributeGroupModal from "./AddNewAttributeGroupModal";
import React, { useEffect, useState } from "react";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";
import { useDeleteAttributeGroup } from "@/hooks/useAttributeGroup";

type Props = {
  onChange: (value: number | undefined) => void;
  attrGroup: Record<string, any>[];
};

const AddNewAttrGroup: React.FC<Props> = ({
  onChange,
  attrGroup: attributeGroup,
}) => {
  const [attrGroup, setAttrGrop] = useState<Record<string, any>>([]);
  const [selectedAttrGroup, setSelectedAttrGroup] = useState<
    Record<string, any> | undefined
  >(undefined);
  const [type, setType] = useState<"edit" | "add">("add");
  //? Hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const deleteAttributeGroup = useDeleteAttributeGroup();

  useEffect(() => {
    setAttrGrop(attributeGroup);
  }, [attributeGroup]);

  const handleDeleteAttrGroup = () => {
    if (!selectedAttrGroup) return;
    deleteAttributeGroup.mutate(selectedAttrGroup.id, {
      onSuccess: () => {
        setSelectedAttrGroup(undefined);
        setAttrGrop((prev) =>
          prev.filter((g: any) => g.id !== selectedAttrGroup.id)
        );
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
            const selected = attrGroup.find(
              (a: any) => a.id === +e.target.value
            );
            setSelectedAttrGroup(selected);
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
        {selectedAttrGroup ? (
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
        defaultDatas={selectedAttrGroup}
        type={type}
      />
    </>
  );
};

export default AddNewAttrGroup;
