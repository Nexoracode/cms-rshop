"use client";

import React, { useEffect, useState } from "react";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import {
  useAddNewAttributeGroup,
  useUpdateAttributeGroup,
} from "@/hooks/api/attributes/useAttributeGroup";
import { Input } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ImMakeGroup } from "react-icons/im";
import { OptionButtonProps } from "@/components/ui/buttons/OptionButton";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";

type AttrGroup = {
  id?: number;
  name: string;
  slug: string;
  display_order: null;
};

type Props = {
  defaultDatas?: AttrGroup;
  type?: "edit" | "add";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerProps?: Omit<OptionButtonProps, "onClick">;
};

const initialState: AttrGroup = { name: "", slug: "", display_order: null };

const AddNewAttributeGroupModal: React.FC<Props> = ({
  defaultDatas,
  type = "add",
  isOpen,
  onOpenChange,
  triggerProps,
}) => {
  const [datas, setDatas] = useState<AttrGroup>(initialState);

  const { mutate: createAttributeGroup } = useAddNewAttributeGroup();
  const { mutate: updateAttributeGroup } = useUpdateAttributeGroup(
    datas?.id ?? -1
  );

  useEffect(() => {
    type === "add"
      ? setDatas(initialState)
      : setDatas(defaultDatas || initialState);
  }, [defaultDatas, type]);

  const isDisabled = !datas.name.trim() || !datas.slug.trim();

  const handleConfirm = (close: (open: boolean) => void) => {
    const { id, ...rest } = datas;

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
          <ActionButton
            icon={<TbEdit size={20} />}
          />
        ) : undefined
      }
      title={type === "edit" ? "ویرایش گروه ویژگی" : "افزودن گروه ویژگی جدید"}
      confirmText="ثبت تغییرات"
      confirmColor="primary"
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
