"use client";

import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import HeaderAction from "../../helpers/HeaderAction";
import AddNewAttribute from "../AddNewAttribute";

const AddNewAttr = () => {
  const {
    isOpen: isOpenTypeAttr,
    onOpen: onOpenTypeAttr,
    onOpenChange: onOpenChangeTypeAttr,
  } = useDisclosure();

  return (
    <>
      <div className="mt-2 bg-gray-50 rounded-xl p-4">
        <Select
          isRequired
          label="ویژگی"
          placeholder="ویژگی را انتخاب کنید"
          labelPlacement="outside"
          onChange={(e) => {
            setSelectedAttr(+e.target.value);
            setAttrValues([]);
          }}
        >
          {attributes && attributes?.data?.length ? (
            attributes.data.map((item: any) => (
              <SelectItem key={item.id}>{item.name}</SelectItem>
            ))
          ) : (
            <SelectItem isDisabled>فعلا آیتمی وجود ندارد</SelectItem>
          )}
        </Select>

        <HeaderAction
          title={"در صورت نیاز میتوانید ویژگی جدیدی را اضافه کنید"}
          textBtn={"+ افزودن"}
          onPress={onOpenAttr}
        />
        {selectedAttr ? (
          <Button size="sm" className="w-full">
            ویرایش ویژگی انتخاب شده
          </Button>
        ) : (
          ""
        )}
      </div>
      <AddNewAttribute isOpen={isOpenAttr} onOpenChange={onOpenChangeAttr} />
    </>
  );
};

export default AddNewAttr;
