"use client";

import React, { useEffect, useState } from "react";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import {
  useAddNewAttribute,
  useUpdateAttribute,
} from "@/hooks/api/attributes/useAttribute";
import { useGetAllAttributeGroup } from "@/hooks/api/attributes/useAttributeGroup";
import { Input, Select, SelectItem, Switch } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import { AiOutlineFontColors } from "react-icons/ai";
import { BsMenuDown, BsPalette } from "react-icons/bs";
import { FiCheckSquare, FiCircle } from "react-icons/fi";
import { MdNumbers } from "react-icons/md";
import { ImCheckmark2 } from "react-icons/im";
import { AttributePayload, AttributeTypes } from "..";

type Props = {
  defaultDatas?: AttributePayload;
  type?: "edit" | "add";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialState: AttributePayload = {
  name: "",
  group_id: null,
  is_public: false,
  slug: "",
  type: "text",
  display_order: null,
  is_variant: false,
};

const AddNewAttributeModal: React.FC<Props> = ({
  defaultDatas,
  type = "add",
  isOpen,
  onOpenChange,
}) => {
  const [datas, setDatas] = useState<AttributePayload>(initialState);

  const { data: getAllAttributeGroup } = useGetAllAttributeGroup();
  const { mutate: createAttribute } = useAddNewAttribute(
    datas.group_id || undefined
  );
  const { mutate: updateAttribute } = useUpdateAttribute(datas.id ?? -1);

  useEffect(() => {
    type === "add"
      ? setDatas(initialState)
      : setDatas(defaultDatas || initialState);
  }, [defaultDatas, type]);

  // نوع‌های ویژگی
  const productInputTypes = [
    {
      key: "text",
      label: "متنی",
      icon: <AiOutlineFontColors className="w-4 h-4" />,
    },
    { key: "number", label: "عددی", icon: <MdNumbers className="w-4 h-4" /> },
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

  const isDisabled =
    !datas.name.trim() || !datas.slug.trim() || !datas.group_id || !datas.type;

  const handleConfirm = (close: (open: boolean) => void) => {
    const payload = { ...datas };

    if (type === "edit" && defaultDatas?.id) {
      updateAttribute(payload, {
        onSuccess: () => {
          close(false);
          setDatas(initialState);
        },
      });
    } else {
      createAttribute(payload, {
        onSuccess: () => {
          close(false);
          setDatas(initialState);
        },
      });
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerProps={
        type === "add"
          ? {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
          : undefined
      }
      trigger={
        type === "edit" ? (
          <ActionButton icon={<TbEdit size={20} />} />
        ) : undefined
      }
      title={type === "edit" ? "ویرایش ویژگی" : "افزودن ویژگی جدید"}
      confirmText="ثبت تغییرات"
      confirmColor="primary"
      onConfirm={handleConfirm}
      isConfirmDisabled={isDisabled}
      isActiveFooter={true}
      size="lg"
      icon={<AiOutlineFontColors />}
    >
      <div className="flex flex-col gap-5 px-2">
        {/* عنوان */}
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

        {/* اسلاگ */}
        <SlugInput
          value={datas.slug}
          onChange={(val) => setDatas((prev) => ({ ...prev, slug: val }))}
          isActiveError={true}
        />

        {/* نوع ویژگی */}
        <Select
          isRequired
          label="تایپ ویژگی"
          placeholder="تایپ ویژگی را انتخاب کنید"
          labelPlacement="outside"
          selectedKeys={datas.type ? [datas.type] : []}
          onChange={(e) =>
            setDatas((prev) => ({ ...prev, type: e.target.value as AttributeTypes }))
          }
        >
          {productInputTypes.map((item) => (
            <SelectItem key={item.key} startContent={item.icon}>
              {item.label}
            </SelectItem>
          ))}
        </Select>

        {/* گروه ویژگی */}
        <Select
          isRequired
          label="دسته‌بندی ویژگی"
          placeholder="دسته‌بندی ویژگی را انتخاب کنید"
          labelPlacement="outside"
          selectedKeys={datas.group_id ? [datas.group_id.toString()] : []}
          onChange={(e) =>
            setDatas((prev) => ({ ...prev, group_id: +e.target.value }))
          }
        >
          {getAllAttributeGroup?.data?.length ? (
            getAllAttributeGroup.data.map((item: any) => (
              <SelectItem key={item.id}>{item.name}</SelectItem>
            ))
          ) : (
            <SelectItem isDisabled>فعلاً آیتمی وجود ندارد</SelectItem>
          )}
        </Select>

        {/* سوئیچ‌ها */}
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
    </BaseModal>
  );
};

export default AddNewAttributeModal;
