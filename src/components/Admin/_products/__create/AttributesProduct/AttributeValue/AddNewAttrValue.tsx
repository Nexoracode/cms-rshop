"use client";

import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import AddNewAttributeValue from "../AddNewAttributeValue";
import HeaderAction from "../../helpers/HeaderAction";
import { useState } from "react";

const AddNewAttrValue = () => {

    const [editAttrValue, setEditAttrValue] = useState(false);
    const {
    isOpen: isOpenTypeAttrValue,
    onOpen: onOpenTypeAttrValue,
    onOpenChange: onOpenChangeTypeAttrValue,
  } = useDisclosure();

  return (
    <>
      {selectedAttr ? (
        <div className="mt-2 bg-gray-50 rounded-xl p-4">
          <div className="flex w-full flex-col gap-2">
            <Select
              label="مقادیر مورد نظر را انتخاب کنید"
              labelPlacement="outside"
              placeholder="مقادیر ویژگی"
              selectedKeys={attrValues}
              selectionMode="multiple"
              onChange={(e) => setAttrValues(e.target.value.split(","))}
            >
              {attributeValues?.data && attributeValues.data?.length ? (
                attributeValues.data.map((data: any) => (
                  <SelectItem key={data.id}>{data.value}</SelectItem>
                ))
              ) : (
                <SelectItem key={-1}>فعلا آیتمی وجود ندارد</SelectItem>
              )}
            </Select>
          </div>
          <HeaderAction
            title={"در صورت نیاز میتوانید مقدار جدیدی اضافه کنید"}
            textBtn={"+ افزودن"}
            onPress={onOpenTypeAttrValue}
          />
          {editAttrValue ? (
            <Select
              isRequired
              placeholder="مقدار ویژگی را انتخاب کنید"
              labelPlacement="outside"
              onChange={(e) => {
                setSelectedAttrValue(+e.target.value);
              }}
              className="mb-2"
            >
              {attributeValues?.data && attributeValues.data?.length ? (
                attributeValues.data.map((data: any) => (
                  <SelectItem key={data.id}>{data.value}</SelectItem>
                ))
              ) : (
                <SelectItem key={-1}>فعلا آیتمی وجود ندارد</SelectItem>
              )}
            </Select>
          ) : (
            ""
          )}
          {attrValues.length ? (
            <Button
              size="sm"
              className="w-full"
              onPress={() => setEditAttrValue((prev) => !prev)}
            >
              {!editAttrValue
                ? "ویرایش مقادیر ویژگی"
                : "لغو ویرایش مقادیر ویژگی"}
            </Button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <AddNewAttributeValue
        isOpen={isOpenTypeAttrValue}
        onOpenChange={onOpenChangeTypeAttrValue}
        attributeId={selectedAttr || -1}
      />
    </>
  );
};

export default AddNewAttrValue;
