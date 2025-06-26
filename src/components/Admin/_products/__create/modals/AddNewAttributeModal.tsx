"use client"

import { Accordion, AccordionItem, Button, Input, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import ImageBoxUploader from "../helpers/ImageBoxUploader";
import { useState } from "react";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
    onSubmit: (title: string, image: File | null) => void;
}

const AddNewAttributeModal: React.FC<Props> = ({ isOpen, onOpenChange, onSubmit }) => {

    const [title, setTitle] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const isDisabled = !title.trim() || !imageFile;

    const handleSubmit = () => {
        if (!isDisabled) {
            onSubmit(title.trim(), imageFile);
            setTitle("");
            setImageFile(null);
            onOpenChange();
        }
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
                        <ModalHeader><p className="font-normal text-[16px]">ویژگی های محصول</p></ModalHeader>
                        <ModalBody>
                            <p className="text-gray-600 mb-3">شما می‌توانید ویژگی‌های محصول مانند رنگ را تعریف و برای هر ویژگی مقدار معرفی کنید، مانند خاکستری.</p>
                            <Accordion variant="splitted">
                                <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
                                    text
                                </AccordionItem>
                                <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                                    text
                                </AccordionItem>
                                <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                                    text
                                </AccordionItem>
                            </Accordion>
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