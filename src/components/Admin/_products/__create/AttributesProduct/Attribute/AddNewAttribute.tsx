"use client";

import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import HeaderAction from "../../helpers/HeaderAction";
import AddNewAttributeModal from "./AddNewAttributeModal";
import { useState } from "react";
import { useDeleteAttribute } from "@/hooks/attributes/useAttribute";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";

type Props = {
  onChange: (value: number | undefined) => void;
  attr: Record<string, any>[];
  selectedAttrId: number | undefined;
  isDisabledEdit: boolean
};

const AddNewAttribute: React.FC<Props> = ({
  onChange,
  attr,
  selectedAttrId,
  isDisabledEdit
}) => {
  const [type, setType] = useState<"edit" | "add">("add");
  //? Hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    <>
      <div className="mt-2 bg-gray-50 rounded-xl p-4">
        <Select
          isRequired
          label="ویژگی"
          placeholder="ویژگی را انتخاب کنید"
          labelPlacement="outside"
          selectedKeys={selectedAttrId ? [selectedAttrId.toString()] : []}
          onChange={(e) => {
            onChange(+e.target.value);
          }}
        >
          {attr && attr?.length ? (
            attr.map((item: any) => (
              <SelectItem key={item.id}>{item.name}</SelectItem>
            ))
          ) : (
            <SelectItem isDisabled>فعلا آیتمی وجود ندارد</SelectItem>
          )}
        </Select>

        <HeaderAction
          title={"در صورت نیاز میتوانید ویژگی جدیدی را اضافه کنید"}
          textBtn={"+ افزودن"}
          onPress={() => {
            onOpen();
            setType("add");
          }}
        />

        {selectedAttrId && !isDisabledEdit ? (
          <div className="flex items-center gap-4 mt-2">
            <DoubleClickBtn
              onPress={handleDeleteAttr}
              textBtn="حذف ویژگی فعلی"
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
              ویرایش ویژگی فعلی
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
      <AddNewAttributeModal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
        }}
        defaultDatas={attr?.find(attr => attr.id === selectedAttrId)}
        type={type}
      />
    </>
  );
};

export default AddNewAttribute;
