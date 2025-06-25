"use client"

import { Button, Input, ModalFooter, Textarea } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
}

const AddNewPropertyModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
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
                        <ModalHeader><p className="font-normal text-[16px]">مشخصه جدید</p></ModalHeader>
                        <ModalBody>
                            <Input
                                isRequired
                                label="عنوان"
                                labelPlacement="outside"
                                name="title"
                                placeholder="عنوان را وارد کنید"
                            />
                            <Textarea labelPlacement="outside" isRequired label="توضیحات" placeholder="توضیح خود را وارد کنید" maxLength={300}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="w-full" variant="solid" color="secondary">ثبت مشخصه</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default AddNewPropertyModal