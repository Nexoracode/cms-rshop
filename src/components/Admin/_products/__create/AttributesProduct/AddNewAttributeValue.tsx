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
  attributeId: number;
  isOpen: boolean;
  onOpenChange: () => void;
};

const initialDatas = {
  value: "",
  attribute_id: -1,
  display_color: "",
  display_order: null,
  is_active: true,
};

const AddNewAttributeValue = ({ isOpen, onOpenChange, attributeId }: Props) => {
  const [datas, setDatas] = useState(initialDatas);
  //? Hooks
  const { mutate: createAttributeGroup } = useAddNewAttributeGroup();
  //

  useEffect(() => {
    if (attributeId) {
      setDatas((prev) => ({ ...prev, attribute_id: attributeId }));
    }
  }, [attributeId]);

  const handleCreateNewAttributeGroup = () => {
    createAttributeGroup(datas, {
      onSuccess: () => {
        onOpenChange();
        setDatas(initialDatas);
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
                  label="عنوان مقدار"
                  placeholder="عنوان مقدار را وارد کنید"
                  value={datas.value}
                  onChange={(e) =>
                    setDatas((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                className="w-full mt-4"
                isDisabled={!datas.value.length || !datas.display_color.length}
                onPress={handleCreateNewAttributeGroup}
              >
                افزودن مقدار ویژگی
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewAttributeValue;
