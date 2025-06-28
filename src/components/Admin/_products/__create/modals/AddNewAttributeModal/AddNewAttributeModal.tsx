"use client";

import { useState } from "react";
import { Button, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import AddNewSubAttribute from "./AddNewSubAttribute";
import AddNewAttribute from "./AddNewAttribute";

type AttributeData = {
    name: string;
    type: string;
    isVariable: boolean;
    isNew: boolean;
};

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    onSubmit: () => void;
};

const AddNewAttributeModal: React.FC<Props> = ({ isOpen, onOpenChange, onSubmit }) => {
    const [attributes, setAttributes] = useState<AttributeData[]>([]);

    const isDisabled = true;

    const handleSubmit = () => {
        onSubmit();
        onOpenChange();
    };

    const handleAddAttribute = (data: AttributeData) => {
        setAttributes((prev) => [...prev, data]);
    };

    return (
        <Modal
            dir="rtl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="auto"
        >
            <ModalContent className="max-w-[700px] w-full">
                {onClose => (
                    <>
                        <ModalHeader className="w-full px-8 flex items-center justify-between">
                            <p className="font-normal text-[16px]">ویژگی های محصول</p>
                            <Button variant="flat" className="text-xl" size="sm" onClick={() => { }}>
                                <TbSettings />
                            </Button>
                        </ModalHeader>
                        <ModalBody>
                            <AddNewAttribute onNewAttribute={handleAddAttribute} />
                            {
                                attributes.length
                                    ?
                                    <AddNewSubAttribute
                                        attributeList={attributes}
                                        onNewAttribute={() => { }}
                                    />
                                    : ""
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                isDisabled={isDisabled}
                                className="w-full"
                                variant="solid"
                                color="secondary"
                                onClick={handleSubmit}
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

export default AddNewAttributeModal;
