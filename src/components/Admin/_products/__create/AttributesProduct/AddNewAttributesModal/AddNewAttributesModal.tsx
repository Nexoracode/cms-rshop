"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import AddNewAttribute from "../AddNewAttribute";
import HeaderAction from "../../helpers/HeaderAction";
import {
  useGetAllAttribute,
  useGetAllAttributeGroup,
  useGetAttributeValues,
} from "@/hooks/useAttribute";
import { useState } from "react";
import AddNewAttributeGroup from "../AddNewAttributeGroup";
import AddNewAttributeValue from "../AddNewAttributeValue";

type AttributeData = {
  attr: Record<string, any>;
  values: Record<string, any>[];
};

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: (data: AttributeData) => void;
};

const AddNewAttributesModal = ({ isOpen, onOpenChange, onSubmit }: Props) => {
  const [selectedAttrGroup, setSelectedAttrGroup] = useState<
    number | undefined
  >(undefined);
  const [selectedAttr, setSelectedAttr] = useState<number | undefined>(
    undefined
  );
  const [selectedAttrValue, setSelectedAttrValue] = useState<
    number | undefined
  >(undefined);
  const [attrValues, setAttrValues] = useState<any>([]);
  const [editAttrValue, setEditAttrValue] = useState(false);
  //? Hooks
  const { data: attributeGroup } = useGetAllAttributeGroup();
  const { data: attributes } = useGetAllAttribute(selectedAttrGroup);
  const { data: attributeValues } = useGetAttributeValues(selectedAttr);
  //const addNewCategoryAttribute = useAddNewCategoryAttribute();
  //
  const {
    isOpen: isOpenAttr,
    onOpen: onOpenAttr,
    onOpenChange: onOpenChangeAttr,
  } = useDisclosure();
  const {
    isOpen: isOpenTypeAttr,
    onOpen: onOpenTypeAttr,
    onOpenChange: onOpenChangeTypeAttr,
  } = useDisclosure();
  const {
    isOpen: isOpenTypeAttrValue,
    onOpen: onOpenTypeAttrValue,
    onOpenChange: onOpenChangeTypeAttrValue,
  } = useDisclosure();

  const resetModalInfos = () => {
    onOpenChange();
    setSelectedAttrGroup(undefined);
    setSelectedAttr(undefined);
    setAttrValues([]);
  };

  const handleChangesCategoryAttributes = () => {
    const attr = attributes?.data.find((a: any) => a.id === selectedAttr);

    const values = attributeValues?.data.filter((v: any) =>
      attrValues.includes(v.id.toString())
    );

    if (attr && values?.length) {
      onSubmit({ attr: attr, values: values });
      resetModalInfos();
    }
  };

  return (
    <>
      <Modal dir="rtl" isOpen={isOpen} onOpenChange={resetModalInfos}>
        <ModalContent className="max-w-[700px] w-full">
          {(onClose) => (
            <>
              <ModalHeader className="w-full px-8 flex items-center justify-between">
                <p className="font-normal text-[16px]">افزودن ویژگی محصول</p>
                <Button
                  variant="flat"
                  className="text-xl"
                  size="sm"
                  onPress={() => {}}
                >
                  <TbSettings />
                </Button>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4">
                <div className="mt-2 bg-gray-50 rounded-xl p-4">
                  <Select
                    isRequired
                    label="دسته بندی ویژگی"
                    placeholder="دسته بندی ویژگی را انتخاب کنید"
                    labelPlacement="outside"
                    onChange={(e) => {
                      setSelectedAttrGroup(+e.target.value);
                      setAttrValues([]);
                    }}
                  >
                    {attributeGroup && attributeGroup?.data.length ? (
                      attributeGroup.data.map((item: any) => (
                        <SelectItem key={item.id}>{item.name}</SelectItem>
                      ))
                    ) : (
                      <SelectItem isDisabled>فعلا آیتمی وجود ندارد</SelectItem>
                    )}
                  </Select>

                  <HeaderAction
                    title={"در صورت نیاز میتوانید دسته بندی جدیدی اضافه کنید"}
                    textBtn={"+ افزودن"}
                    onPress={onOpenTypeAttr}
                  />
                  {selectedAttrGroup ? (
                    <Button size="sm" className="w-full">
                      ویرایش دسته بندی انتخاب شده
                    </Button>
                  ) : (
                    ""
                  )}
                </div>

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

                {selectedAttr ? (
                  <div className="mt-2 bg-gray-50 rounded-xl p-4">
                    <div className="flex w-full flex-col gap-2">
                      <Select
                        label="مقادیر مورد نظر را انتخاب کنید"
                        labelPlacement="outside"
                        placeholder="مقادیر ویژگی"
                        selectedKeys={attrValues}
                        selectionMode="multiple"
                        onChange={(e) =>
                          setAttrValues(e.target.value.split(","))
                        }
                      >
                        {attributeValues?.data &&
                        attributeValues.data?.length ? (
                          attributeValues.data.map((data: any) => (
                            <SelectItem key={data.id}>{data.value}</SelectItem>
                          ))
                        ) : (
                          <SelectItem key={-1}>
                            فعلا آیتمی وجود ندارد
                          </SelectItem>
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
                        {attributeValues?.data &&
                        attributeValues.data?.length ? (
                          attributeValues.data.map((data: any) => (
                            <SelectItem key={data.id}>{data.value}</SelectItem>
                          ))
                        ) : (
                          <SelectItem key={-1}>
                            فعلا آیتمی وجود ندارد
                          </SelectItem>
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
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  variant="solid"
                  color="secondary"
                  onPress={handleChangesCategoryAttributes}
                  isDisabled={
                    !selectedAttr || !selectedAttrGroup || !attrValues.length
                      ? true
                      : false
                  }
                >
                  ثبت تغیرات
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <AddNewAttributeGroup
        isOpen={isOpenTypeAttr}
        onOpenChange={onOpenChangeTypeAttr}
      />

      <AddNewAttribute isOpen={isOpenAttr} onOpenChange={onOpenChangeAttr} />

      <AddNewAttributeValue
        isOpen={isOpenTypeAttrValue}
        onOpenChange={onOpenChangeTypeAttrValue}
        attributeId={selectedAttr || -1}
      />
    </>
  );
};

export default AddNewAttributesModal;
