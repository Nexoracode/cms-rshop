"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Input, ModalFooter, Textarea } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { LuImage } from "react-icons/lu";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    onSubmit: (title: string, description: string) => void;
    defaultValues?: { title: string; description: string };
};

const AddNewSizeGuideModal: React.FC<Props> = ({
    isOpen,
    onOpenChange,
    onSubmit,
    defaultValues
}) => {
    const [title, setTitle] = useState(defaultValues?.title || "");
    const [description, setDescription] = useState(defaultValues?.description || "");

    // ✅ Sync with parent defaultValues
    useEffect(() => {
        setTitle(defaultValues?.title || "");
        setDescription(defaultValues?.description || "");
    }, [defaultValues]);

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
                            <p className="font-normal text-[16px]">
                                {defaultValues ? "ویرایش راهنما سایز" : "راهنما سایز"}
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                isRequired
                                label="عنوان"
                                labelPlacement="outside"
                                name="title"
                                placeholder="عنوان را وارد کنید"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div>
                                <p className="pb-2">تصویر</p>
                                <Button color="secondary" variant="light" className={"w-full border border-dashed border-[var(--primary)] h-[79px] rounded-md flex-col-reverse"} endContent={<LuImage className="text-2xl" />}>
                                    افزودن تصویر
                                </Button>
                                <div className="w-full flex items-center my-3">
                                    <Alert className="h-[40px] flex items-center p-0 bg-transparent" variant="flat" radius="full" color="warning" dir="rtl" title={<p className="text-[12px]" dir="rtl">حداکثر حجم فایل تصویر 5MB</p>}/>
                                </div>
                            </div>
                            <Textarea
                                labelPlacement="outside"
                                label="توضیحات"
                                placeholder="اگر توضیحی در مورد سایز بندی محصول دارید اینجا وارد کنید."
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

export default AddNewSizeGuideModal;
