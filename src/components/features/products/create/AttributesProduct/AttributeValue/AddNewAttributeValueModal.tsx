"use client";

import React, { useEffect, useState } from "react";
import { Input, Select, SelectItem, Switch } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import { FiCheckSquare } from "react-icons/fi";
import {
  useCreateAttributeValue,
  useUpdateAttributeValue,
} from "@/core/hooks/api/attributes/useAttributeValue";
import { AttributeValue, CreateAttributeValue } from "../attribute.types";
import { handleMutation } from "@/core/utils/mutationHelper";
import { useAttributesByGroupGroup } from "@/core/hooks/api/attributes/useAttributeGroup";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";

type Props = {
  defaultDatas?: AttributeValue;
  type?: "edit" | "add";
  attributeId?: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialState: CreateAttributeValue = {
  value: "",
  attribute_id: 0,
  display_color: "",
  display_order: null,
  is_active: true,
};

const AddNewAttributeValueModal: React.FC<Props> = ({
  defaultDatas,
  type = "add",
  attributeId,
  isOpen,
  onOpenChange,
}) => {
  const [datas, setDatas] = useState<CreateAttributeValue | AttributeValue>(
    initialState
  );
  const [isActiveColorPicker, setIsActiveColorPicker] = useState(false);
  const { data: getAllAttributeGroup } = useAttributesByGroupGroup();

  const { mutateAsync: createAttributeValue, isPending: isPendingCreate } =
    useCreateAttributeValue();
  const { mutateAsync: updateAttributeValue, isPending: isPendingUpdate } =
    useUpdateAttributeValue(
      type === "edit" ? (datas as AttributeValue).id : -1
    );

  useEffect(() => {
    if (isActiveColorPicker) {
      setDatas((prev) => ({
        ...prev,
        display_color: "#000",
      }));
    } else {
      setDatas((prev) => ({
        ...prev,
        display_color: null,
      }));
    }
  }, [isActiveColorPicker]);

  useEffect(() => {
    if (type === "add") {
      setDatas({ ...initialState, attribute_id: attributeId || 0 });
    } else {
      setDatas(defaultDatas || initialState);
    }
    setIsActiveColorPicker(!!defaultDatas?.display_color);
  }, [defaultDatas, type, attributeId]);

  const handleConfirm = async () => {
    if (type === "edit") {
      const { id, ...rest } = datas as AttributeValue;
      return handleMutation(
        () => updateAttributeValue({ ...rest, attribute_id: attributeId }),
        { resetForm }
      );
    } else {
      const payload = {
        ...datas,
        attribute_id: attributeId,
      };
      return handleMutation(() => createAttributeValue(payload), { resetForm });
    }
  };

  const resetForm = () => {
    setDatas(initialState);
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
          <ActionButton icon={<TbEdit size={20} />} stopPropagation={false} />
        ) : undefined
      }
      title={type === "edit" ? "ویرایش مقدار ویژگی" : "افزودن مقدار ویژگی جدید"}
      confirmText="ثبت تغییرات"
      onConfirm={handleConfirm}
      isConfirmDisabled={isPendingCreate || isPendingUpdate}
      isActiveFooter={true}
      size="md"
      icon={<FiCheckSquare />}
    >
      <div className="flex flex-col gap-5 px-2">
        {/* عنوان مقدار */}
        <Input
          labelPlacement="outside"
          isRequired
          label="عنوان مقدار"
          placeholder="عنوان مقدار را وارد کنید"
          value={datas.value}
          onChange={(e) =>
            setDatas((prev) => ({ ...prev, value: e.target.value }))
          }
        />

        {/* رنگ (اختیاری) */}
        {isActiveColorPicker && (
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">رنگ نمایشی</label>
            <input
              type="color"
              className="w-full h-12 rounded-xl cursor-pointer"
              value={datas.display_color || "#000000"}
              onChange={(e) =>
                setDatas((prev) => ({
                  ...prev,
                  display_color: e.target.value,
                }))
              }
            />
          </div>
        )}

        {/* گروه ویژگی */}
        <Select
          isRequired
          label="گروه ویژگی"
          placeholder="گروه ویژگی را انتخاب کنید"
          labelPlacement="outside"
          selectedKeys={
            datas.attribute_id ? [datas.attribute_id.toString()] : []
          }
          onChange={(e) =>
            setDatas((prev) => ({ ...prev, attribute_id: +e.target.value }))
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

        <ToggleSection
          title="انتخاب رنگ"
          initialMode={isActiveColorPicker}
          onChange={setIsActiveColorPicker}
        />

        <ToggleSection
          title={`وضعیت نمایش ${datas.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={datas.is_active}
          onChange={(status) =>
            setDatas((prev) => ({ ...prev, is_active: status }))
          }
        />
      </div>
    </BaseModal>
  );
};

export default AddNewAttributeValueModal;
