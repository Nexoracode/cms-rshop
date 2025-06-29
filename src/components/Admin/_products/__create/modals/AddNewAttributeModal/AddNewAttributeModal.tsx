"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardBody, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import AddNewSubAttribute from "./AddNewSubAttribute";
import AddNewAttribute from "./AddNewAttribute";
import BoxHeader from "../../helpers/BoxHeader";
import { MdOutlineCategory } from "react-icons/md";

type Attr = { id: number; label: string; isUsed: boolean };

type AttributeData = {
  id: number;
  attr: Attr;
  type: string;
  isVariable: boolean;
  subs?: string[];
};

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onSubmit: () => void;
};

const AddNewAttributeModal: React.FC<Props> = ({ isOpen, onOpenChange, onSubmit }) => {
  const [attributes, setAttributes] = useState<AttributeData[]>([]);
  const isDisabled = attributes.length === 0;

  useEffect(() => {
    console.log("Current attributes:", attributes);
  }, [attributes]);

  const handleSubmit = () => {
    onSubmit();
    onOpenChange();
  };

  const handleAddAttribute = (data: AttributeData) => {
    setAttributes((prev) => [...prev, { ...data, id: prev.length + 1 }]);
  };

  const handleDelete = (id: number) => {
    setAttributes((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateSubs = (newItem: AttributeData) => {
    setAttributes((prev) =>
      prev.map((item) => (item.id === newItem.id ? newItem : item))
    );
  };

  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader className="w-full px-8 flex items-center justify-between">
              <p className="font-normal text-[16px]">ویژگی‌های محصول</p>
              <Button variant="flat" className="text-xl" size="sm" onClick={() => {}}>
                <TbSettings />
              </Button>
            </ModalHeader>
            <ModalBody>
              <AddNewAttribute onNewAttribute={handleAddAttribute} />
              {attributes.length > 0 && (
                <Card className="mx-2">
                  <BoxHeader
                    title="ویژگی‌های اضافه‌شده"
                    color="bg-green-700/10 text-green-700"
                    icon={<MdOutlineCategory className="text-3xl" />}
                  />
                  <CardBody className="flex flex-col gap-4 bg-green-100/20">
                    {attributes.map((item) => (
                      <AddNewSubAttribute
                        key={item.id}
                        attribute={item}
                        onDelete={handleDelete}
                        onNewSubAttribute={handleUpdateSubs}
                      />
                    ))}
                  </CardBody>
                </Card>
              )}
            </ModalBody>
            <ModalFooter>
              <Button isDisabled={isDisabled} className="w-full" variant="solid" color="secondary" onClick={handleSubmit}>
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
