"use client";

import { useEffect, useState } from "react";
import { Button, Input, ModalFooter, Textarea } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import ImageBoxUploader from "../helpers/ImageBoxUploader";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    onSubmit: (title: string, description: string, image: File | null) => void;
    defaultValues?: {
        title: string;
        description: string;
        imageFile?: File | null;
    };
};

const AddNewSizeGuideModal: React.FC<Props> = ({
    isOpen,
    onOpenChange,
    onSubmit,
    defaultValues
}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        setTitle(defaultValues?.title || "");
        setDescription(defaultValues?.description || "");
        setImageFile(defaultValues?.imageFile || null);
    }, [defaultValues]);

    const isDisabled = !title.trim() || !description.trim() || !imageFile;

    const handleSubmit = () => {
        if (!isDisabled) {
            onSubmit(title.trim(), description.trim(), imageFile);
            setTitle("");
            setDescription("");
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
                                {defaultValues ? "ویرایش راهنمای سایز" : "افزودن راهنمای سایز"}
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                labelPlacement="outside"
                                isRequired
                                label="عنوان"
                                placeholder="عنوان را وارد کنید"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Textarea
                                labelPlacement="outside"
                                isRequired
                                label="توضیحات"
                                placeholder="اگر توضیحی دارید اینجا وارد کنید"
                                maxLength={300}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <ImageBoxUploader
                                textBtn={imageFile ? "تغییر تصویر" : "افزودن تصویر"}
                                title="تصویر"
                                changeStatusFile={imageFile}
                                onFile={(file) => setImageFile(file)}
                                sizeText="سایز تصویر: 540x540"
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
                                تایید و ثبت
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddNewSizeGuideModal;
