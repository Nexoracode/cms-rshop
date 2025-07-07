"use client"

import { useState } from "react"
import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Listbox,
    ListboxItem,
} from "@heroui/react"
import { MdMoreVert } from "react-icons/md"
import ArShopCard from "../ArShopCard/ArShopCard"
import { RxLapTimer } from "react-icons/rx"
import { TbEyeShare } from "react-icons/tb"
import { BsCopy } from "react-icons/bs"
import MediaGallery from "@/components/Helper/MediaGallery"

const ShopInfosCard = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <ArShopCard activeOrderBadge>
            <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-xl items-center">
                <MediaGallery />
                <Popover
                    showArrow
                    backdrop="blur"
                    offset={10}
                    placement="bottom"
                    isOpen={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}
                >
                    <PopoverTrigger>
                        <Button
                            color="secondary"
                            variant="flat"
                            size="sm"
                            className="rounded-md"
                        >
                            <MdMoreVert className="text-lg" /> بیشتر
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                        <div className="flex flex-col items-center mt-3 gap-1">
                            <p>فروشگاه آرشاپ</p>
                            <small className="text-gray-600">arshop.ir</small>
                        </div>
                        <div className="mt-4">
                            <Listbox aria-label="Listbox menu with icons" variant="faded">
                                <ListboxItem key="visit" startContent={<TbEyeShare className="text-[var(--primary)] text-xl" />}>
                                    مشاهده فروشگاه
                                </ListboxItem>
                                <ListboxItem showDivider key="copy" startContent={<BsCopy className="text-[var(--primary)] text-xl" />}>
                                    کپی لینک فروشگاه
                                </ListboxItem>
                                <ListboxItem
                                    key="disable-order"
                                    startContent={<RxLapTimer className="text-[var(--primary)] text-xl" />}
                                >
                                    غیرفعال سازی سفارش گیری
                                </ListboxItem>
                            </Listbox>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </ArShopCard>
    )
}

export default ShopInfosCard
