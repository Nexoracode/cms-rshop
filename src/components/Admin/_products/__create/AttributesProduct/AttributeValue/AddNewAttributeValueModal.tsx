"use client";

import { useEffect, useState } from "react";
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
import {
  useAddNewAttributeValue,
  useUpdateAttributeValue,
} from "@/hooks/attributes/useAttributeValue";

type Props = {
  attributeId: number | undefined;
  isOpen: boolean;
  onOpenChange: () => void;
  defaultDatas: any;
  type: "edit" | "add";
};

type AttrValue = {
  id?: number;
  value: string;
  attribute_id: number;
  display_color: string;
  display_order: null;
  is_active: boolean;
};

const initialState: AttrValue = {
  value: "",
  attribute_id: -1,
  display_color: "",
  display_order: null,
  is_active: true,
};

const AddNewAttributeValueModal = ({
  isOpen,
  onOpenChange,
  attributeId,
  defaultDatas,
  type,
}: Props) => {
  const [datas, setDatas] = useState(initialState);
  const [isActiveColorPicker, setIsActiveColorPicker] = useState(false);
  //? Hooks
  const { mutate: createAttributeValue } = useAddNewAttributeValue(attributeId);
  const { mutate: updateAttributeValue } = useUpdateAttributeValue(
    datas?.id ? datas.id : -1,
    attributeId
  );

  useEffect(() => {
    type === "add"
      ? setDatas(initialState)
      : setDatas(defaultDatas || initialState);
    
    setIsActiveColorPicker(defaultDatas?.display_color?.length);
  }, [defaultDatas, type]);

  const handleUpdateAttributeValue = () => {
    const { id, attribute_id, ...rest } = datas;
    console.log("$$$$$$$$$", { ...rest, attribute_id: attributeId });
    updateAttributeValue(
      { ...rest, attribute_id: attributeId },
      {
        onSuccess: () => {
          onOpenChange();
          setDatas(initialState);
        },
      }
    );
  };

  const handleCreateNewAttributeValue = () => {
    const { attribute_id, ...rest } = datas;

    const newAttrVal = {
      attribute_id: attributeId,
      ...rest,
    };

    createAttributeValue(newAttrVal, {
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
                {isActiveColorPicker || datas?.display_color?.length ? (
                  <input
                    type="color"
                    className="w-full h-12 bg-transparent rounded-[20px]"
                    value={datas.display_color}
                    onChange={(e) =>
                      setDatas((prev) => ({
                        ...prev,
                        display_color: e.target.value,
                      }))
                    }
                  />
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
                isDisabled={
                  !datas.value.length ||
                  (isActiveColorPicker && !datas.display_color.length)
                }
                onPress={() => {
                  type === "edit"
                    ? handleUpdateAttributeValue()
                    : handleCreateNewAttributeValue();
                }}
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

export default AddNewAttributeValueModal;
