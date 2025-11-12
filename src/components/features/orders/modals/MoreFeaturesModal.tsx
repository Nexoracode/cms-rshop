"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, Listbox, ListboxItem } from "@heroui/react";
import { FaTags } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPrinter } from "react-icons/bs";


type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
}

const MoreFeaturesModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
    return (
        <Modal
            dir="rtl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="auto"
        >
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader><p className="font-normal text-[16px]">امکانات بیشتر</p></ModalHeader>
                        <ModalBody>
                            <Listbox aria-label="More Features List" variant="faded">
                                <ListboxItem
                                    key="order-settings"
                                    startContent={<IoSettingsOutline className="text-2xl text-[var(--primary)]" />}
                                >
                                    تنظیمات سفارش
                                </ListboxItem>
                                <ListboxItem
                                    key="print-invoice"
                                    startContent={<BsPrinter className="text-2xl text-[var(--primary)]" />}
                                >
                                    پرینت گروهی فاکتور
                                </ListboxItem>
                                <ListboxItem
                                    key="print-label"
                                    startContent={<FaTags className="text-2xl text-[var(--primary)]" />}
                                >
                                    پرینت گروهی برچسب
                                </ListboxItem>
                            </Listbox>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default MoreFeaturesModal;
