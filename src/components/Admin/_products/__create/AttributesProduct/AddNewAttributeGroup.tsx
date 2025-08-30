"use client";

import { useAddNewAttributeGroup } from "@/hooks/useAttribute";
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
};

const initialState = { name: "", slug: "", display_order: null };

const AddNewAttributeGroup = ({
  isOpen,
  onOpenChange,
  defaultDatas = initialState,
}: Props) => {
  const [datas, setDatas] = useState(initialState);
  const { mutate: createAttributeGroup } = useAddNewAttributeGroup();

  useEffect(() => {
    setDatas(defaultDatas)
  }, [defaultDatas])

  const handleCreateNewAttributeGroup = () => {
    createAttributeGroup(datas, {
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
              <div className="flex flex-col gap-5">
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

                <Input
                  labelPlacement="outside"
                  isRequired
                  style={{ direction: "ltr" }}
                  label="نامک"
                  placeholder="slug"
                  value={datas.slug}
                  onChange={(e) =>
                    setDatas((prev) => ({ ...prev, slug: e.target.value }))
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                className="w-full mt-4"
                isDisabled={!datas.name.length || !datas.slug.length}
                onPress={handleCreateNewAttributeGroup}
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

export default AddNewAttributeGroup;
