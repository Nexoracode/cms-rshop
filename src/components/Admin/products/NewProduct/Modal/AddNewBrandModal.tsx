"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Input, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { LuImage } from "react-icons/lu";

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

    const isDisabled = !brandFa.trim() || !brandEn.trim();

    const handleSubmit = () => {
        if (!isDisabled) {
            onSubmit(brandFa.trim(), brandEn.trim(), imageFile);
            setBrandFa("");
            setBrandEn("");
            setImageFile(null);
            onOpenChange();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setImageFile(file);
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
                            <div>
                                <p className="pb-2">تصویر</p>
                                <label className="w-full">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    <Button
                                        as="span"
                                        color="secondary"
                                        variant="light"
                                        className={`w-full border border-dashed border-[var(--primary)] ${imageFile ? "h-56" : "h-[79px]"} rounded-md flex-col-reverse`}
                                        endContent={
                                            imageFile ?
                                                <img
                                                    src={URL.createObjectURL(imageFile)}
                                                    alt="preview"
                                                    className="mt-3 rounded-md h-40 border"
                                                />
                                                :
                                                <LuImage className="text-2xl" />
                                        }
                                    >
                                        {imageFile ? "تغییر تصویر" : "افزودن تصویر"}
                                    </Button>
                                </label>


                                <div className="my-3">
                                    <Alert
                                        className="h-[40px] flex items-center p-0 bg-transparent"
                                        variant="flat"
                                        radius="full"
                                        color="warning"
                                        title={<p className="text-[12px]">حداکثر حجم فایل تصویر 5MB</p>}
                                    />
                                </div>
                            </div>
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
