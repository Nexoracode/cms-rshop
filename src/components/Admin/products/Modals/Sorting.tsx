"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, Listbox, ListboxItem } from "@heroui/react";
import { TbShoppingCartBolt, TbShoppingCartDollar, TbShoppingCartDown, TbShoppingCartExclamation, TbShoppingCartHeart, TbShoppingCartUp } from "react-icons/tb";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
}

const Sorting: React.FC<Props> = ({ isOpen, onOpenChange }) => {
    return (
        <Modal
            dir="rtl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="auto"    // uses Hero UI auto: bottom on mobile, center on larger screens
        >
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader><p className="font-normal text-[16px]">مرتب سازی</p></ModalHeader>
                        <ModalBody>
                            <Listbox aria-label="Listbox menu with descriptions" variant="faded">
                                <ListboxItem
                                    key="new"
                                    startContent={<TbShoppingCartBolt className="text-2xl text-[var(--primary)]" />}
                                >
                                    جدیدترین
                                </ListboxItem>
                                <ListboxItem
                                    key="past"
                                    startContent={<TbShoppingCartExclamation className="text-2xl text-[var(--primary)]" />}
                                >
                                    قدیمی ترین
                                </ListboxItem>
                                <ListboxItem
                                    key="high-price"
                                    startContent={<TbShoppingCartUp className="text-2xl text-[var(--primary)]" />}
                                >
                                    بیشترین قیمت
                                </ListboxItem>
                                <ListboxItem
                                    key="low-price"
                                    startContent={<TbShoppingCartDown className="text-2xl text-[var(--primary)]" />}
                                >
                                    کمترین قیمت
                                </ListboxItem>
                                <ListboxItem
                                    key="more-sales"
                                    startContent={<TbShoppingCartDollar className="text-2xl text-[var(--primary)]" />}
                                >
                                    پرفروش ترین
                                </ListboxItem>
                                <ListboxItem
                                    key="more-favorited"
                                    startContent={<TbShoppingCartHeart className="text-2xl text-[var(--primary)]" />}
                                >
                                    محبوب ترین
                                </ListboxItem>
                            </Listbox>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default Sorting