"use client";

import React, { useEffect, useState } from "react";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import {
  useCreateAttributeGroup,
  useUpdateAttributeGroup,
} from "@/core/hooks/api/attributes/useAttributeGroup";
import { Input } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ImMakeGroup } from "react-icons/im";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import { AttributeGroup, CreateAttributeGroup } from "../attribute.types";

type Props = {
  defaultDatas?: AttributeGroup;
  type?: "edit" | "add";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialState: CreateAttributeGroup = {
  name: "",
  slug: "",
  display_order: null,
};

const AddNewAttributeGroupModal: React.FC<Props> = ({
  defaultDatas,
  type = "add",
  isOpen,
  onOpenChange,
}) => {
  const [datas, setDatas] = useState<CreateAttributeGroup | AttributeGroup>(initialState);

  const { mutate: createAttributeGroup } = useCreateAttributeGroup();
  const { mutate: updateAttributeGroup } = useUpdateAttributeGroup(
    type === "edit" ? (datas as AttributeGroup).id : -1
  );

  useEffect(() => {
    type === "add"
      ? setDatas(initialState)
      : setDatas(defaultDatas || initialState);
  }, [defaultDatas, type]);

  const isDisabled = !datas.name.trim() || !datas.slug.trim();

  const handleConfirm = (close: (open: boolean) => void) => {
    const { id, ...rest } = datas as AttributeGroup;

    if (type === "edit") {
      updateAttributeGroup(rest, {
        onSuccess: () => {
          close(false);
          setDatas(initialState);
        },
      });
    } else {
      createAttributeGroup(rest, {
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
        type == "add"
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
      title={type === "edit" ? "ویرایش گروه ویژگی" : "افزودن گروه ویژگی جدید"}
      confirmText="ثبت تغییرات"
      onConfirm={handleConfirm}
      isConfirmDisabled={isDisabled}
      isActiveFooter={true}
      size="md"
      icon={<ImMakeGroup />}
    >
      <div className="flex items-start gap-4 px-2">
        <Input
          labelPlacement="outside"
          isRequired
          label="عنوان"
          placeholder="عنوان گروه ویژگی را وارد کنید"
          value={datas.name}
          onChange={(e) =>
            setDatas((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <SlugInput
          value={datas.slug}
          onChange={(val) => setDatas((prev) => ({ ...prev, slug: val }))}
          isActiveError={true}
        />
      </div>
    </BaseModal>
  );
};

export default AddNewAttributeGroupModal;
