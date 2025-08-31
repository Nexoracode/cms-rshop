"use client";

import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import HeaderAction from "../../helpers/HeaderAction";
import AddNewAttributeModal from "./AddNewAttributeModal";
import { useEffect, useState } from "react";
import { useDeleteAttribute } from "@/hooks/attributes/useAttribute";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";

type Props = {
  onChange: (value: number | undefined) => void;
  attr: Record<string, any>[];
  groupedId: number | undefined;
  selectedAttr: Record<string, any> | undefined;
};

const AddNewAttribute: React.FC<Props> = ({
  onChange,
  attr: attributes,
  groupedId,
  selectedAttr: selectedAttributes,
}) => {
  const [attr, setAttr] = useState<Record<string, any>>([]);
  const [selectedAttr, setSelectedAttr] = useState<
    Record<string, any> | undefined
  >(undefined);
  const [type, setType] = useState<"edit" | "add">("add");
  //? Hooks
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const deleteAttribute = useDeleteAttribute(groupedId);

  useEffect(() => {
    console.log(attributes);
    setAttr(attributes);
  }, [attributes]);

  useEffect(() => {
    setSelectedAttr(selectedAttributes);
  }, [selectedAttributes]);

  const handleDeleteAttr = () => {
    if (!selectedAttr) return;
    deleteAttribute.mutate(selectedAttr.id, {
      onSuccess: () => {
        setSelectedAttr(undefined);
        setAttr((prev) => prev.filter((g: any) => g.id !== selectedAttr.id));
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
          selectedKeys={selectedAttr ? [selectedAttr.id.toString()] : []}
          onChange={(e) => {
            onChange(+e.target.value);
            const selected = attr.find((a: any) => a.id === +e.target.value);
            setSelectedAttr(selected);
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

        {selectedAttr ? (
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
        defaultDatas={selectedAttr}
        type={type}
        onSuccess={(updated) => {
          if (updated && updated.group_id !== groupedId) {
            setSelectedAttr(undefined);
            setAttr((prev) => prev.filter((g: any) => g.id !== updated.id));
            onChange(undefined);
          }
        }}
      />
    </>
  );
};

export default AddNewAttribute;
