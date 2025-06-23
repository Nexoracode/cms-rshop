"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, Listbox, ListboxItem } from "@heroui/react";
import { AiOutlineControl } from "react-icons/ai";
import { BsShopWindow } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { LuCopyPlus } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
//
import { TbShoppingBagHeart, TbShoppingBagPlus, TbShoppingCartDollar, TbShoppingCartDown, TbShoppingCartExclamation, TbShoppingCartHeart, TbShoppingCartUp } from "react-icons/tb";
import { TbShoppingCartBolt } from "react-icons/tb";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
}

const Filter: React.FC<Props> = ({ isOpen, onOpenChange }) => {
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
                                    startContent={<TbShoppingCartBolt className="text-2xl" />}
                                >
                                    جدیدترین
                                </ListboxItem>
                                <ListboxItem
                                    key="past"
                                    startContent={<TbShoppingCartExclamation className="text-2xl" />}
                                >
                                    قدیمی ترین
                                </ListboxItem>
                                <ListboxItem
                                    key="high-price"
                                    startContent={<TbShoppingCartUp className="text-2xl" />}
                                >
                                    بیشترین قیمت
                                </ListboxItem>
                                <ListboxItem
                                    key="low-price"
                                    startContent={<TbShoppingCartDown className="text-2xl" />}
                                >
                                    کمترین قیمت
                                </ListboxItem>
                                <ListboxItem
                                    key="more-sales"
                                    startContent={<TbShoppingCartDollar className="text-2xl" />}
                                >
                                    پرفروش ترین
                                </ListboxItem>
                                <ListboxItem
                                    key="more-favorited"
                                    startContent={<TbShoppingCartHeart className="text-2xl" />}
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
export default Filter