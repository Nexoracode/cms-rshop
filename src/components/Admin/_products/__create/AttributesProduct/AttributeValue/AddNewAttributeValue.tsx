"use client";

import {
  useAddNewAttributeGroup,
  useAddNewAttributeValue,
} from "@/hooks/attributes/useAttribute";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
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
  const [isActiveColorPicker, setIsActiveColorPicker] = useState(false);
  //? Hooks
  const { mutate: createAttributeValue } = useAddNewAttributeValue(attributeId);
  //
  useEffect(() => {
    if (attributeId) {
      setDatas((prev) => ({ ...prev, attribute_id: attributeId }));
    }
  }, [attributeId]);

  const handleCreateNewAttributeValue = () => {
    createAttributeValue(datas, {
      onSuccess: () => {
        onOpenChange();
        setDatas(prev => ({...prev, display_color: "", is_active: true, value: ""}));
      },
    });
  };

  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader className="w-full px-8 flex items-center justify-between">
              <p className="font-normal text-[16px]">افزودن مقدار ویژگی</p>
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
                    setDatas((prev) => ({ ...prev, value: e.target.value }))
                  }
                />
                {isActiveColorPicker ? (
                  <input type="color" className="w-full h-12 bg-transparent rounded-[20px]" onChange={(e) => setDatas(prev => ({...prev, display_color: e.target.value})) }/>
                ) : (
                  ""
                )}
                <div className="flex items-center gap-6">
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
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                className="w-full mt-4"
                isDisabled={!datas.value.length || (isActiveColorPicker && !datas.display_color.length)}
                onPress={handleCreateNewAttributeValue}
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
