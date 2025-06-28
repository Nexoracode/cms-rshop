"use client"

import { Button, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import AttributeVarient from "../../temps/AttributeVarient";
import AddNewAttribute from "./AddNewAttribute";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
    onSubmit: () => void;
}

const AddNewAttributeModal: React.FC<Props> = ({ isOpen, onOpenChange, onSubmit }) => {

    const isDisabled = true

    const handleSubmit = () => {
        onSubmit();
        onOpenChange();
    };

    return (
        <Modal
            dir="rtl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="auto"    // uses Hero UI auto: bottom on mobile, center on larger screens
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
                            <AddNewAttribute onNewAttribute={() => {}}/>
                            <AttributeVarient />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                isDisabled={isDisabled}
                                className="w-full"
                                variant="solid"
                                color="secondary"
                                onClick={handleSubmit}
                            >ثبت تغیرات</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default AddNewAttributeModal