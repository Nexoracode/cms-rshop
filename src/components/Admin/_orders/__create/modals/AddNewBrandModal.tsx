"use client";

import { useEffect, useState } from "react";
import { Button, Input, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import ImageBoxUploader from "@/components/Helper/ImageBoxUploader";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    onSubmit: (brandNameFa: string, brandNameEn: string, image: File | null) => void;
    defaultValues?: {
        brandNameFa: string;
        brandNameEn: string;
        imageFile?: File | null;
    };
};

const AddNewBrandModal: React.FC<Props> = ({
    isOpen,
    onOpenChange,
    onSubmit,
    defaultValues
}) => {
    const [brandFa, setBrandFa] = useState("");
    const [brandEn, setBrandEn] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        setBrandFa(defaultValues?.brandNameFa || "");
        setBrandEn(defaultValues?.brandNameEn || "");
        setImageFile(defaultValues?.imageFile || null);
    }, [defaultValues]);

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
                                {defaultValues ? "ویرایش برند" : "افزودن برند"}
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                labelPlacement="outside"
                                isRequired
                                label="عنوان برند (فارسی)"
                                placeholder="عنوان را وارد کنید"
                                value={brandFa}
                                onChange={(e) => setBrandFa(e.target.value)}
                                className="mb-2"
                            />
                            <Input
                                dir="ltr"
                                labelPlacement="outside"
                                isRequired
                                label="عنوان برند (انگلیسی)"
                                placeholder="title"
                                value={brandEn}
                                onChange={(e) => setBrandEn(e.target.value)}
                            />
                            <ImageBoxUploader
                                textBtn={imageFile ? "تغییر لوگو" : "+ افزودن لوگو"}
                                title="تصویر لوگو"
                                changeStatusFile={imageFile}
                                onFile={(file) => setImageFile(file)}
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

export default AddNewBrandModal;
