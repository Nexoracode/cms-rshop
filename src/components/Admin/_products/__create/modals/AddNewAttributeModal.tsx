"use client"

import { Button, Divider, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useState } from "react";
import { TbSettings } from "react-icons/tb";
import AttributeVarient from "../temps/AttributeVarient";
import Link from "next/link";

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
                        <ModalHeader className="w-full px-8 flex items-center justify-between">
                            <p className="font-normal text-[16px]">ویژگی های محصول</p>
                            <div className="flex items-center">
                                <div className="flex h-7 items-center space-x-2 gap-2">
                                    <Link href={'/admin/home'}>
                                        <TbSettings className="text-2xl text-[var(--primary)]" />
                                    </Link>
                                    <Divider className="px-[0.1rem]" orientation="vertical" />
                                </div>
                                <Button variant="flat" color="secondary" onClick={() => { }}>
                                    + افزودن ویژگی
                                </Button>
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-gray-600 mb-3">شما می‌توانید ویژگی‌های محصول مانند رنگ را تعریف و برای هر ویژگی مقدار معرفی کنید، مانند خاکستری.</p>
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