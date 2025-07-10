"use client"

import { Button, DateRangePicker, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
}

export const animals = [
    { key: "cat", label: "جدید" },
    { key: "dog", label: "قدیمی" },
    { key: "elephant", label: "تازه" },
];

const FilterModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
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
                        <ModalHeader><p className="font-normal text-[16px]">فیلتر</p></ModalHeader>
                        <ModalBody className="overflow-y-auto">
                            <DateRangePicker label="تاریخ ثبت" labelPlacement="outside" />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger">حذف فیلتر</Button>
                            <Button>اعمال</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default FilterModal