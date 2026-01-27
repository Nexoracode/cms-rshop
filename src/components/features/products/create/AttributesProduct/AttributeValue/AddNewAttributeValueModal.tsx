"use client";

import React, { useEffect } from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import { FiCheckSquare } from "react-icons/fi";
import {
  useCreateAttributeValue,
  useUpdateAttributeValue,
} from "@/core/hooks/api/attributes/useAttributeValue";
import { handleMutation } from "@/core/utils/mutationHelper";
import { useAttributesByGroupGroup } from "@/core/hooks/api/attributes/useAttributeGroup";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import ColorPickerField from "@/components/shared/ColorPickerField";
import { useAttributesByGroup } from "@/core/hooks/api/attributes/useAttribute";
import { useForm } from "@/core/hooks/common/form/useForm";
import { attributeValueValidation } from "./attribute-value-validate";

type Props = {
  type?: "add" | "edit";
  defaultDatas?: any;
  attributeId?: number | null;
  attributeGroupId?: number | null;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialForm = {
  value: "",
  attribute_id: null as number | null,
  group_id: null as number | null,
  display_color: null as string | null,
  is_active: true,
  is_active_color_picker: false,
};

const AddNewAttributeValueModal: React.FC<Props> = ({
  defaultDatas,
  attributeId,
  attributeGroupId,
  isOpen,
  onOpenChange,
  type = "add",
}) => {
  const isEdit = type === "edit";

  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialForm,
    {
      onValidate: attributeValueValidation,
      runValidationOnChange: true,
    }
  );

  const { data: getAllAttributeGroup } = useAttributesByGroupGroup();
  const { data: getAllAttribute } = useAttributesByGroup(form.group_id || 0);

  const { mutateAsync: createAttributeValue, isPending: isPendingCreate } =
    useCreateAttributeValue();

  const { mutateAsync: updateAttributeValue, isPending: isPendingUpdate } =
    useUpdateAttributeValue();

  // sync edit mode
  useEffect(() => {
    if (defaultDatas) {
      setForm({
        ...defaultDatas,
        group_id: attributeGroupId ?? null,
        attribute_id: attributeId ?? null,
        is_active_color_picker: !!defaultDatas.display_color,
      });
    }
  }, [defaultDatas]);

  // sync color picker
  useEffect(() => {
    handleFieldChange(
      "display_color",
      form.is_active_color_picker ? "#000000" : null
    );
  }, [form.is_active_color_picker]);

  const handleConfirm = submit(async () => {
    const { attribute_id, display_color, is_active, value } = form;

    const payload = {
      attribute_id,
      display_color,
      is_active,
      value,
    };

    console.log(payload);

    if (isEdit) {
      return handleMutation(
        () => updateAttributeValue({ data: payload, id: defaultDatas?.id }),
        { resetForm }
      );
    }

    return handleMutation(() => createAttributeValue(payload), { resetForm });
  });

  const resetForm = () => reset();

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerProps={
        !isEdit
          ? {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
          : undefined
      }
      trigger={
        isEdit ? (
          <ActionButton icon={<TbEdit size={20} />} stopPropagation={false} />
        ) : undefined
      }
      title={isEdit ? "ویرایش مقدار ویژگی" : "افزودن مقدار ویژگی جدید"}
      confirmText="ثبت تغییرات"
      onConfirm={handleConfirm}
      isConfirmDisabled={isPendingCreate || isPendingUpdate}
      icon={<FiCheckSquare />}
      size="md"
    >
      <div className="flex flex-col gap-5 px-2">
        {/* گروه ویژگی */}
        <Select
          isRequired
          label="گروه ویژگی"
          placeholder="گروه ویژگی را انتخاب کنید..."
          labelPlacement="outside"
          selectedKeys={form.group_id ? [form.group_id.toString()] : []}
          onChange={(e) => handleFieldChange("group_id", +e.target.value)}
        >
          {getAllAttributeGroup?.data?.map((item: any) => (
            <SelectItem key={item.id}>{item.name}</SelectItem>
          ))}
        </Select>

        {/* ویژگی */}
        {form.group_id ? (
          <Select
            isRequired
            label="ویژگی"
            placeholder="ویژگی را انتخاب کنید..."
            labelPlacement="outside"
            selectedKeys={
              form.attribute_id ? [form.attribute_id.toString()] : []
            }
            onChange={(e) => handleFieldChange("attribute_id", +e.target.value)}
            errorMessage={errors.attribute_id}
          >
            {getAllAttribute?.data?.map((item: any) => (
              <SelectItem key={item.id}>{item.name}</SelectItem>
            ))}
          </Select>
        ) : (
          ""
        )}

        {/* عنوان مقدار */}
        <Input
          isRequired
          label="عنوان مقدار"
          placeholder="عنوان مقدار را وارد کنید..."
          labelPlacement="outside"
          value={form.value}
          onChange={(e) => handleFieldChange("value", e.target.value)}
          errorMessage={errors.value}
        />

        <div className="flex items-center gap-2">
          <ToggleSection
            title="انتخاب رنگ"
            initialMode={form.is_active_color_picker}
            onChange={(val) => handleFieldChange("is_active_color_picker", val)}
          />

          {form.is_active_color_picker && (
            <ColorPickerField
              value={form.display_color || "#000000"}
              onChange={(color) => handleFieldChange("display_color", color)}
              widthFull
              label=""
            />
          )}
        </div>

        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />
      </div>
    </BaseModal>
  );
};

export default AddNewAttributeValueModal;
