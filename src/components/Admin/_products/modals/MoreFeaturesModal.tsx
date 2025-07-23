"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, Listbox, ListboxItem } from "@heroui/react";
import { AiOutlinePercentage } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { TbBrandCupra, TbEdit } from "react-icons/tb";
import { GrWorkshop } from "react-icons/gr";
import { useRouter } from "next/navigation";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
}

const MoreFeaturesModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
    
    const router = useRouter()

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
                        <ModalHeader><p className="font-normal text-[16px]">امکانات بیشتر</p></ModalHeader>
                        <ModalBody>
                            <Listbox aria-label="Listbox menu with descriptions" variant="faded">
                                <ListboxItem
                                    key="group"
                                    startContent={<TbEdit className="text-2xl text-[var(--primary)]" />}
                                >
                                    ویرایش گروهی
                                </ListboxItem>
                                <ListboxItem
                                    key="category"
                                    startContent={<BiCategory className="text-2xl text-[var(--primary)]" />}
                                    onPress={() => router.push('/admin/products/categories')}
                                >
                                    دسته بندی
                                </ListboxItem>
                                <ListboxItem
                                    key="brands"
                                    startContent={<TbBrandCupra className="text-2xl text-[var(--primary)]" />}
                                >
                                    برندها
                                </ListboxItem>
                                <ListboxItem
                                    key="off"
                                    startContent={<AiOutlinePercentage className="text-2xl text-[var(--primary)]" />}
                                >
                                    تخفیف
                                </ListboxItem>
                                <ListboxItem
                                    key="excel"
                                    startContent={<PiMicrosoftExcelLogoFill className="text-2xl text-[var(--primary)]" />}
                                >
                                    خروجی گروهی محصول با اکسل
                                </ListboxItem>
                                <ListboxItem
                                    key="manage"
                                    startContent={<GrWorkshop className="text-2xl text-[var(--primary)]" />}
                                >
                                    مدیریت ویژگی های محصولات
                                </ListboxItem>
                            </Listbox>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default MoreFeaturesModal