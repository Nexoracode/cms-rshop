"use client"

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Listbox, ListboxItem } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import { TbShoppingCartUp, TbShoppingCartDown } from "react-icons/tb";

type Props = { isOpen: boolean; onOpenChange: () => void };

const sortMap: Record<string, string> = {
    "id-desc": "id:DESC",
    "id-asc": "id:ASC",
    "price-desc": "price:DESC",
    "price-asc": "price:ASC",
};

const SortingModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [selected, setSelected] = useState<string>("id-desc");

    const selectAndClose = (key: string) => {
        setSelected(key);
        const sortBy = sortMap[key];
        const params = new URLSearchParams();
        params.set("page", "1");
        params.set("sortBy", sortBy);

        router.push(`${pathname}?${params.toString()}`);
        onOpenChange(); // بستن مدال
    }

    return (
        <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
            <ModalContent>
                <ModalHeader>
                    <p className="font-normal text-[16px]">مرتب سازی</p>
                </ModalHeader>
                <ModalBody>
                    <Listbox variant="faded" aria-label="مرتب سازی محصولات">
                        <ListboxItem onClick={() => selectAndClose("id-desc")} className={selected === "id-desc" ? "bg-gray-100" : ""}>
                            جدیدترین (ID نزولی)
                        </ListboxItem>
                        <ListboxItem onClick={() => selectAndClose("id-asc")} className={selected === "id-asc" ? "bg-gray-100" : ""}>
                            قدیمی‌ترین (ID صعودی)
                        </ListboxItem>
                        <ListboxItem onClick={() => selectAndClose("price-desc")} startContent={<TbShoppingCartUp className="text-2xl text-[var(--primary)]" />} className={selected === "price-desc" ? "bg-gray-100" : ""}>
                            بیشترین قیمت
                        </ListboxItem>
                        <ListboxItem onClick={() => selectAndClose("price-asc")} startContent={<TbShoppingCartDown className="text-2xl text-[var(--primary)]" />} className={selected === "price-asc" ? "bg-gray-100" : ""}>
                            کمترین قیمت
                        </ListboxItem>
                    </Listbox>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SortingModal;
