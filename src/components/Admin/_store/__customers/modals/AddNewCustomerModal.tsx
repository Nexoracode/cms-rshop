"use client";

import { useState } from "react";
import { Button, Input, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    onSubmit: (brandNameFa: string, brandNameEn: string, image: File | null) => void;
};

const AddNewCustomerModal: React.FC<Props> = ({
    isOpen,
    onOpenChange,
    onSubmit,
}) => {
    const [brandFa, setBrandFa] = useState("");
    const [brandEn, setBrandEn] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const isDisabled = !brandFa.trim() || !brandEn.trim() || !imageFile;

    const handleSubmit = () => {
        if (!isDisabled) {
            onSubmit(brandFa.trim(), brandEn.trim(), imageFile);
            setBrandFa("");
            setBrandEn("");
            setImageFile(null);
            onOpenChange();
        }
    };

    return (
        <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="max-w-[700px] w-full">
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <p className="font-normal text-[16px]">
                                افزودن کاربر
                            </p>
                        </ModalHeader>
                        <ModalBody>
                          
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="w-full"
                                variant="solid"
                                color="secondary"
                                isDisabled={isDisabled}
                                onPress={handleSubmit}
                            >
                                تایید و ثبت
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddNewCustomerModal;
