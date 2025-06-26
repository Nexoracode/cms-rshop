"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, Listbox, ListboxItem } from "@heroui/react";
import { AiOutlineControl } from "react-icons/ai";
import { BsShopWindow } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { LuCopyPlus } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
    productName: string,
}

const ActionsModal: React.FC<Props> = ({ isOpen, onOpenChange, productName }) => {
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
                        <ModalHeader><p className="font-normal text-[16px]">{productName}</p></ModalHeader>
                        <ModalBody>
                            <Listbox aria-label="Listbox menu with descriptions" variant="flat">
                                <ListboxItem
                                    key="edit"
                                    description="ویرایش جزئیات محصول"
                                    startContent={<FiEdit className="text-2xl" />}
                                >
                                    ویرایش
                                </ListboxItem>
                                <ListboxItem
                                    key="copy"
                                    description="ساخت کپی از این محصول"
                                    startContent={<LuCopyPlus className="text-2xl" />}
                                >
                                    ساخت کپی
                                </ListboxItem>
                                <ListboxItem
                                    key="show"
                                    description="هدایت به صفحه محصول"
                                    startContent={<BsShopWindow className="text-2xl" />}
                                >
                                    نمایش در فروشگاه
                                </ListboxItem>
                                <ListboxItem
                                    key="status"
                                    description="وضعیت فعلی محصول"
                                    showDivider
                                    startContent={<AiOutlineControl className="text-2xl" />}
                                >
                                    وضعیت  (فعال)
                                </ListboxItem>
                                <ListboxItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    description="حذف کردن محصول از فروشگاه"
                                    startContent={<RiDeleteBin6Line className="text-2xl" />}
                                >
                                    حذف محصول
                                </ListboxItem>
                            </Listbox>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default ActionsModal