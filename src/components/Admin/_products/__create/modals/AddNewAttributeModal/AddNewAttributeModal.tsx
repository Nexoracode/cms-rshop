"use client";

import { useState } from "react";
import { Button, Card, CardBody, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import AddNewSubAttribute from "./AddNewSubAttribute";
import AddNewAttribute from "./AddNewAttribute";
import BoxHeader from "../../helpers/BoxHeader";
import { MdOutlineCategory } from "react-icons/md";

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
                                    <>
                                        <Card>
                                            <BoxHeader
                                                title="ویژگی های اضافه شده"
                                                color="bg-green-700/10 text-green-700"
                                                icon={<MdOutlineCategory className="text-3xl" />}
                                            />
                                            <CardBody className="flex flex-col gap-4 bg-green-100/20">
                                                {
                                                    attributes.map((item, index) => (
                                                        <AddNewSubAttribute
                                                            key={index}
                                                            attribute={item}
                                                            onNewAttribute={() => { }}
                                                        />
                                                    ))
                                                }
                                            </CardBody>
                                        </Card>
                                    </>
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
