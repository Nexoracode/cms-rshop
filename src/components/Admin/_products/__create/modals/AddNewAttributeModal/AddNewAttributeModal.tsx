"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardBody, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import AddNewSubAttribute from "./AddNewSubAttribute";
import AddNewAttribute from "./AddNewAttribute";
import BoxHeader from "../../helpers/BoxHeader";
import { MdOutlineCategory } from "react-icons/md";
//
import { Attribute, AttributeData } from "./Types";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: () => void;
};

const AddNewAttributeModal: React.FC<Props> = ({ isOpen, onOpenChange, onSubmit }) => {

  const [attributes, setAttributes] = useState<AttributeData[]>([]);

  useEffect(() => {
    //console.log("!!!!!!!!!!!!!!!!!!", attributes);

  }, [attributes])

  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader className="w-full px-8 flex items-center justify-between">
              <p className="font-normal text-[16px]">ویژگی‌های محصول</p>
              <Button variant="flat" className="text-xl" size="sm" onPress={() => { }}>
                <TbSettings />
              </Button>
            </ModalHeader>

            <ModalBody>

              <AddNewAttribute
                onNewAttribute={data => setAttributes((prev) => [...prev, data])}
                selectedAttributes={(attributes.map(item => item.attr)) as Attribute[]}
              />

              {attributes.length > 0 && (
                <Card className="mx-2">
                  <BoxHeader
                    title="ویژگی‌های اضافه‌شده"
                    color="bg-green-700/10 text-green-700"
                    icon={<MdOutlineCategory className="text-3xl" />}
                  />
                  <CardBody className="flex flex-col gap-4 bg-green-100/20">
                    {attributes.map((attr) => (
                      <AddNewSubAttribute
                        key={attr.id}
                        attribute={attr}
                        onDelete={id => setAttributes(prev => prev.filter(item => item.id !== id))}
                        onNewSubAttribute={data => {
                          setAttributes(prev => {
                            let filterdeAttr = prev.filter(attr => attr.id !== data.id)
                            let newDatas = [...filterdeAttr, data]
                            return newDatas
                          })
                        }}
                      />
                    ))}
                  </CardBody>
                </Card>
              )}
            </ModalBody>

            <ModalFooter>
              <Button isDisabled={attributes.length === 0} className="w-full" variant="solid" color="secondary" onPress={() => {
                onSubmit();
                onOpenChange();
              }}>
                ثبت تغییرات
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewAttributeModal;
