"use client";

import { useState } from "react";
import { Button, Input, ModalFooter, Textarea } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    onSubmit: (title: string, description: string) => void,
    defaultValues?: { title: string; description: string };
};

const AddNewPropertyModal: React.FC<Props> = ({ isOpen, onOpenChange, onSubmit, defaultValues }) => {
    const [title, setTitle] = useState(defaultValues?.title || "");
    const [description, setDescription] = useState(defaultValues?.description || "");


    const isDisabled = !title.trim() || !description.trim();

    const handleSubmit = () => {
        if (!isDisabled) {
            onSubmit(title.trim(), description.trim());
            setTitle("");
            setDescription("");
            onOpenChange();
        }
    };

    return (
        <Modal
            dir="rtl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="auto"
        >
            <ModalContent className="max-w-[700px] w-full">
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <p className="font-normal text-[16px]">مشخصه جدید</p>
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-gray-500">
                                مشخصه، اطلاعات مختصری از محصول شماست که در بخش مشخصات در صفحه محصول نمایش داده می‌شود.
                            </p>
                            <Input
                                isRequired
                                label="عنوان"
                                labelPlacement="outside"
                                name="title"
                                placeholder="عنوان را وارد کنید"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Textarea
                                labelPlacement="outside"
                                isRequired
                                label="توضیحات"
                                placeholder="توضیح خود را وارد کنید"
                                maxLength={300}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="w-full"
                                variant="solid"
                                color="secondary"
                                isDisabled={isDisabled}
                                onClick={handleSubmit}
                            >
                                ثبت مشخصه
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddNewPropertyModal;
