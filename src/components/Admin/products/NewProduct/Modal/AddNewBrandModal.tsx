"use client";

import { useEffect, useState } from "react";
import { Button, Chip, Input, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { TbCategoryPlus } from "react-icons/tb";

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
                                <div className="w-full px-2 flex items-center justify-between my-3">
                                    <span>تصویر لوگو</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="logo-upload"
                                        onChange={handleImageChange}
                                        className="bg-black z-50 h-10 absolute left-0 opacity-0"
                                    />
                                    <label htmlFor="logo-upload">
                                        <p className="ml-2 text-[var(--primary)] transition">
                                            {imageFile ? "تغییر لوگو" : "+ افزودن لوگو"}
                                        </p>
                                    </label>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-[80px] h-[80px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                        <div className={`${!imageFile ? "p-3 bg-gray-100 rounded-lg" : ""}`}>
                                            {
                                                imageFile ?
                                                    <img
                                                        src={URL.createObjectURL(imageFile)}
                                                        alt="preview"
                                                        className="rounded-2xl w-[80px] h-[80px] p-2 object-cover"
                                                    />
                                                    :
                                                    <TbCategoryPlus className="text-4xl text-gray-500" />
                                            }
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-[12px] gap-1 text-gray-500">
                                        <p>نمایش تصویر پیش فرض به این شکل است.</p>
                                        <div>فرمت تصویر:
                                            <Chip color="secondary" variant="flat" size="sm" radius="sm">
                                                <small>JPEG</small>
                                            </Chip>  ,
                                            <Chip color="success" variant="flat" size="sm" radius="sm">
                                                <small>JPG</small>
                                            </Chip>  ,
                                            <Chip color="warning" variant="flat" size="sm" radius="sm">
                                                <small>PNG</small>
                                            </Chip>
                                        </div>
                                        <p>سایز تصویر: 160x160</p>
                                    </div>
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
