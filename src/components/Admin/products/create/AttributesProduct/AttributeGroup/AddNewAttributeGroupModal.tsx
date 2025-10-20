"use client";

import SlugInput from "@/components/forms/Inputs/SlugInput";
import {
  useAddNewAttributeGroup,
  useUpdateAttributeGroup,
} from "@/hooks/api/attributes/useAttributeGroup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  defaultDatas: any;
  type: "edit" | "add";
};

type AttrGroup = {
  name: string;
  slug: string;
  display_order: null;
  id?: number;
};

const initialState: AttrGroup = { name: "", slug: "", display_order: null };

const AddNewAttributeGroupModal = ({
  isOpen,
  onOpenChange,
  defaultDatas = initialState,
  type,
}: Props) => {
  const [datas, setDatas] = useState(initialState);
  const { mutate: createAttributeGroup } = useAddNewAttributeGroup();
  const { mutate: updateAttributeGroup } = useUpdateAttributeGroup(
    datas?.id ? datas.id : -1
  );

  useEffect(() => {
    type === "add" ? setDatas(initialState) : setDatas(defaultDatas);
  }, [defaultDatas, type]);

  const handleUpdateAttributeGroup = () => {
    const { id, ...rest } = datas;
    updateAttributeGroup(rest, {
      onSuccess: () => {
        onOpenChange();
        setDatas(initialState);
      },
    });
  };

  const handleCreateNewAttributeGroup = () => {
    const { id, ...rest } = datas;
    createAttributeGroup(rest, {
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
              <p className="font-normal text-[16px]">افزودن دسته بندی ویژگی</p>
            </ModalHeader>
            <ModalBody>
              <div className="flex items-start gap-4">
                <Input
                  labelPlacement="outside"
                  isRequired
                  label="عنوان"
                  placeholder="عنوان  دسته بندی را وارد کنید"
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
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                className="w-full mt-4"
                isDisabled={!datas.name.length || !datas.slug.length}
                onPress={() =>
                  type === "edit"
                    ? handleUpdateAttributeGroup()
                    : handleCreateNewAttributeGroup()
                }
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

export default AddNewAttributeGroupModal;
