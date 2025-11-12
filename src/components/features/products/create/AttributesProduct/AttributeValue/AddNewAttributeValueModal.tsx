"use client";

import React, { useEffect, useState } from "react";
import { Input, Switch } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import { FiCheckSquare } from "react-icons/fi";
import {
  useCreateAttributeValue,
  useUpdateAttributeValue,
} from "@/core/hooks/api/attributes/useAttributeValue";
import { AttributeValue, CreateAttributeValue } from "../attribute.types";

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

  const { mutate: createAttributeValue } = useCreateAttributeValue();
  const { mutate: updateAttributeValue } = useUpdateAttributeValue(
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

  const isDisabled =
    !datas.value.trim() ||
    (isActiveColorPicker && !datas.display_color?.trim());

  const handleConfirm = (close: (open: boolean) => void) => {
    if (type === "edit") {
      const { id, ...rest } = datas as AttributeValue;
      updateAttributeValue(
        { ...rest, attribute_id: attributeId },
        {
          onSuccess: () => {
            close(false);
            setDatas(initialState);
          },
        }
      );
    } else {
      const payload = {
        ...datas,
        attribute_id: attributeId,
      };

      createAttributeValue(payload, {
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
      title={type === "edit" ? "ویرایش مقدار ویژگی" : "افزودن مقدار ویژگی جدید"}
      confirmText="ثبت تغییرات"
      onConfirm={handleConfirm}
      isConfirmDisabled={isDisabled}
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

        {/* سوئیچ‌ها */}
        <div className="flex items-center gap-8">
          <Switch
            color="secondary"
            size="sm"
            isSelected={isActiveColorPicker}
            onValueChange={setIsActiveColorPicker}
          >
            انتخاب رنگ
          </Switch>

          <Switch
            color="secondary"
            size="sm"
            isSelected={datas.is_active}
            onValueChange={(status) =>
              setDatas((prev) => ({ ...prev, is_active: status }))
            }
          >
            فعال
          </Switch>
        </div>
      </div>
    </BaseModal>
  );
};

export default AddNewAttributeValueModal;
