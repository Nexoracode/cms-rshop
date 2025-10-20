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
} from "@heroui/react";
import {
  useAddNewAttribute,
  useUpdateAttribute,
} from "@/hooks/api/attributes/useAttribute";
import { useGetAllAttributeGroup } from "@/hooks/api/attributes/useAttributeGroup";
//? Icons
import { AiOutlineFontColors } from "react-icons/ai";
import { BsMenuDown, BsPalette } from "react-icons/bs";
import { FiCheckSquare, FiCircle } from "react-icons/fi";
import { MdNumbers } from "react-icons/md";
import { ImCheckmark2 } from "react-icons/im";
import SlugInput from "@/components/forms/Inputs/SlugInput";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  defaultDatas: any;
  type: "edit" | "add";
};

type Attr = {
  name: string;
  group_id: number | null;
  is_public: boolean;
  slug: string;
  type: string;
  display_order: null;
  is_variant: boolean;
  id?: number;
};

const initialState: Attr = {
  name: "",
  group_id: null,
  is_public: false,
  slug: "",
  type: "text",
  display_order: null,
  is_variant: false,
};

const AddNewAttributeModal = ({
  isOpen,
  onOpenChange,
  defaultDatas,
  type,
}: Props) => {
  const [datas, setDatas] = useState(initialState);
  //? Hooks
  const { data: getAllAttributeGroup } = useGetAllAttributeGroup();
  const { mutate: createAttribute } = useAddNewAttribute(
    datas?.group_id || undefined
  );
  const { mutate: updateAttribute } = useUpdateAttribute(
    datas?.id ? datas.id : -1
  );

  useEffect(() => {
    type === "add"
      ? setDatas(initialState)
      : setDatas(defaultDatas || initialState);
  }, [defaultDatas, type]);

  // attribute types
  const productInputTypes = [
    {
      key: "text",
      label: "متنی",
      icon: <AiOutlineFontColors className="w-4 h-4" />,
    },
    {
      key: "number",
      label: "عددی",
      icon: <MdNumbers className="w-4 h-4" />,
    },
    {
      key: "color",
      label: "انتخاب رنگ",
      icon: <BsPalette className="w-4 h-4" />,
    },
    {
      key: "checkBox",
      label: "چک‌باکس (چند انتخابی)",
      icon: <FiCheckSquare className="w-4 h-4" />,
    },
    {
      key: "radioButton",
      label: "گزینه‌ای (یک انتخابی)",
      icon: <FiCircle className="w-4 h-4" />,
    },
    {
      key: "select",
      label: "منوی کشویی",
      icon: <BsMenuDown className="w-4 h-4" />,
    },
    {
      key: "boolean",
      label: "بله / خیر",
      icon: <ImCheckmark2 className="w-4 h-4" />,
    },
  ];

  const handleUpdateAttribute = () => {
    const { id, ...rest } = datas;
    console.log(rest);
    updateAttribute(rest, {
      onSuccess: () => {
        onOpenChange();
        setDatas(initialState);
      },
    });
  };

  const handleNewAttribute = () => {
    const { id, ...rest } = datas;
    createAttribute(rest, {
      onSuccess: () => {
        onOpenChange();
        setDatas(initialState);
      },
    });
  };

  return (
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
                  label="عنوان"
                  placeholder="عنوان ویژگی را وارد کنید"
                  value={datas.name}
                  onChange={(e) =>
                    setDatas((prev) => ({ ...prev, name: e.target.value }))
                  }
                />

                <SlugInput
                  value={datas.slug}
                  onChange={(val) =>
                    setDatas((prev: any) => ({
                      ...prev,
                      slug: val,
                    }))
                  }
                  isActiveError={true}
                />

                <Select
                  isRequired
                  label="تایپ ویژگی"
                  placeholder="تایپ ویژگی را انتخاب کنید"
                  labelPlacement="outside"
                  selectedKeys={[datas.type]}
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

                <div className="flex flex-col gap-2">
                  <Select
                    label="دسته بندی ویژگی"
                    placeholder="دسته بندی ویژگی را انتخاب کنید"
                    labelPlacement="outside"
                    className="-mb-2"
                    selectedKeys={
                      datas.group_id ? [datas.group_id.toString()] : []
                    }
                    onChange={(e) => {
                      setDatas((prev: any) => ({
                        ...prev,
                        group_id: +e.target.value,
                      }));
                    }}
                  >
                    {getAllAttributeGroup?.data ? (
                      getAllAttributeGroup.data.map((item: any) => (
                        <SelectItem key={item.id}>{item.name}</SelectItem>
                      ))
                    ) : (
                      <SelectItem isDisabled>فعلا آیتمی وجود ندارد</SelectItem>
                    )}
                  </Select>
                </div>

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
                  !datas.group_id ||
                  !datas.name.length ||
                  !datas.slug.length ||
                  !datas.type
                }
                onPress={() => {
                  type === "edit"
                    ? handleUpdateAttribute()
                    : handleNewAttribute();
                }}
              >
                ثبت تغیرات
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewAttributeModal;
