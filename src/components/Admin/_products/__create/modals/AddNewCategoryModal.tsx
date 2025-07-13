"use client"

import { Button, Input, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import ImageBoxUploader from "@/components/Helper/ImageBoxUploader";
import { useState } from "react";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
    onSubmit: (title: string, image: File | null) => void;
}

const AddNewCategoryModal: React.FC<Props> = ({ isOpen, onOpenChange, onSubmit }) => {

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
                        <ModalHeader><p className="font-normal text-[16px]">افزودن دسته بندی جدید</p></ModalHeader>
                        <ModalBody>
                            <Input
                                isRequired
                                label="عنوان دسته بندی"
                                labelPlacement="outside"
                                value={title}
                                placeholder="نام دسته بندی را وارد کنید"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <ImageBoxUploader
                                textBtn="+ افزودن تصویر"
                                title="تصویر دسته بندی"
                                changeStatusFile={imageFile}
                                onFile={(file) => setImageFile(file)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                isDisabled={isDisabled}
                                className="w-full"
                                variant="solid"
                                color="secondary"
                                onClick={handleSubmit}
                            >افزودن دسته بندی</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default AddNewCategoryModal