"use client"

import { Button, Chip, Input, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { TbCategoryPlus } from "react-icons/tb";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
}

const AddNewCategoryModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
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
                                name="title"
                                placeholder="نام دسته بندی را وارد کنید"
                            />
                            <div className="w-full px-2 flex items-center justify-between">
                                <span>تصویر دسته بندی</span>
                                <Button color="secondary" variant="light">+ افزودن تصویر</Button>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-[80px] h-[80px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                    <div className="p-3 bg-gray-100 rounded-lg">
                                        <TbCategoryPlus className="text-4xl text-gray-500" />
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
                        </ModalBody>
                        <ModalFooter>
                            <Button className="w-full" variant="solid" color="secondary">افزودن دسته بندی</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default AddNewCategoryModal