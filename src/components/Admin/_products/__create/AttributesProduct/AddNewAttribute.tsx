"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
  useDisclosure,
} from "@heroui/react";
// Icons
import { AiOutlineFontColors, AiOutlineNumber } from "react-icons/ai";
import { BsPalette } from "react-icons/bs";
import { FiCheckSquare, FiCircle, FiImage } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";
import {
  useAddNewAttribute,
  useGetAllAttributeGroup,
} from "@/hooks/useAttribute";
import HeaderAction from "../helpers/HeaderAction";
import AddNewAttributeType from "./AddNewAttributeType";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const AddNewAttribute = ({ isOpen, onOpenChange }: Props) => {
  const [datas, setDatas] = useState({
    name: "",
    group_id: null,
    is_public: false,
    slug: "",
    type: "text",
    display_order: null,
    is_variant: false,
  });
  //? Hooks
  const { data: getAllAttributeGroup } = useGetAllAttributeGroup();
  const { mutate: createAttribute } = useAddNewAttribute(
    datas.group_id === null ? undefined : datas.group_id
  );
  //
  const {
    isOpen: isOpenTypeAttr,
    onOpen: onOpenTypeAttr,
    onOpenChange: onOpenChangeTypeAttr,
  } = useDisclosure();

  // static
  const productInputTypes = [
    {
      key: "text",
      label: "متن",
      icon: <AiOutlineFontColors className="w-4 h-4" />,
    },
    {
      key: "number",
      label: "عدد",
      icon: <AiOutlineNumber className="w-4 h-4" />,
    },
    { key: "color", label: "رنگ", icon: <BsPalette className="w-4 h-4" /> },
    { key: "date", label: "تاریخ", icon: <MdDateRange className="w-4 h-4" /> },
    {
      key: "checkbox",
      label: "چک‌باکس",
      icon: <FiCheckSquare className="w-4 h-4" />,
    },
    {
      key: "radio",
      label: "دکمه انتخابی",
      icon: <FiCircle className="w-4 h-4" />,
    },
    {
      key: "file",
      label: "فایل / تصویر",
      icon: <FiImage className="w-4 h-4" />,
    },
  ];

  const handleNewAttribute = () => {
    createAttribute(datas, {
      onSuccess: () => {
        onOpenChange();
        setDatas({
          name: "",
          slug: "",
          group_id: null,
          is_public: true,
          is_variant: false,
          type: "",
          display_order: null,
        });
      },
    });
  };

  return (
    <>
      <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="max-w-[700px] w-full">
          {(onClose) => (
            <>
              <ModalHeader className="w-full px-8 flex items-center justify-between">
                <p className="font-normal text-[16px]">افزودن ویژگی جدید</p>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5">
                  <Input
                    labelPlacement="outside"
                    isRequired
                    label="عنوان ویژگی"
                    placeholder="عنوان ویژگی را وارد کنید"
                    value={datas.name}
                    onChange={(e) =>
                      setDatas((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />

                  <Input
                    labelPlacement="outside"
                    isRequired
                    style={{ direction: "ltr" }}
                    label="عنوان ویژگی (انگلیسی)"
                    placeholder="slug"
                    value={datas.slug}
                    onChange={(e) =>
                      setDatas((prev) => ({ ...prev, slug: e.target.value }))
                    }
                  />

                  {datas.is_public ? (
                    ""
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Select
                        label="دسته بندی ویژگی"
                        placeholder="دسته بندی ویژگی را انتخاب کنید"
                        labelPlacement="outside"
                        className="-mb-2"
                        onChange={(e) =>
                          setDatas((prev: any) => ({
                            ...prev,
                            group_id: +e.target.value,
                          }))
                        }
                      >
                        {getAllAttributeGroup?.data ? (
                          getAllAttributeGroup.data.map((item: any) => (
                            <SelectItem key={item.id}>{item.name}</SelectItem>
                          ))
                        ) : (
                          <SelectItem isDisabled>
                            فعلا آیتمی وجود ندارد
                          </SelectItem>
                        )}
                      </Select>

                      <HeaderAction
                        title={"در صورت نیاز میتوانید گروه ویژگی اضافه کنید"}
                        textBtn={"+ جدید"}
                        onPress={onOpenTypeAttr}
                      />
                    </div>
                  )}

                  <Select
                    label="تایپ ویژگی"
                    placeholder="تایپ ویژگی را انتخاب کنید"
                    labelPlacement="outside"
                    onChange={(e) =>
                      setDatas((prev) => ({ ...prev, type: e.target.value }))
                    }
                  >
                    {productInputTypes.map((item) => (
                      <SelectItem key={item.key} startContent={item.icon}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="flex items-center gap-8">
                    <Switch
                      color="secondary"
                      size="sm"
                      isSelected={datas.is_variant}
                      onValueChange={(status) =>
                        setDatas((prev) => ({ ...prev, is_variant: status }))
                      }
                    >
                      متغیر
                    </Switch>

                    <Switch
                      color="secondary"
                      size="sm"
                      isSelected={datas.is_public}
                      onValueChange={(status) =>
                        setDatas((prev) => ({ ...prev, is_public: status }))
                      }
                    >
                      سراسری
                    </Switch>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  className="w-full mt-4"
                  isDisabled={
                    (!datas.group_id && !datas.is_public) ||
                    !datas.name.length ||
                    !datas.slug.length ||
                    !datas.type
                  }
                  onPress={handleNewAttribute}
                >
                  افزودن ویژگی
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <AddNewAttributeType
        isOpen={isOpenTypeAttr}
        onOpenChange={onOpenChangeTypeAttr}
      />
    </>
  );
};

export default AddNewAttribute;
