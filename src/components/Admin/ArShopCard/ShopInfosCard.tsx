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
import { TbEyeShare, TbReportAnalytics } from "react-icons/tb"
import { BsCopy } from "react-icons/bs"
import MediaGallery from "@/components/Helper/MediaGallery"
import { FiUsers } from "react-icons/fi"
import { GoCommentDiscussion } from "react-icons/go"
import { GrAnnounce } from "react-icons/gr"
import BoxLink from "../_settings/BoxLink"

const ShopInfosCard = () => {
    const [isOpen, setIsOpen] = useState(false)

    const topLinks = [
        {
            title: "مشتریان",
            icon: <FiUsers className="text-2xl" />,
            route: "store/customers",
            parent: "text-purple-700 bg-purple-700/5 shadow-md",
            iconBg: "bg-purple-700/10",
        },
        {
            title: "گزارشات مالی",
            icon: <TbReportAnalytics className="text-2xl" />,
            route: "settings/finance",
            parent: "text-green-700 bg-green-700/5 shadow-md",
            iconBg: "bg-green-700/10",
        },
        {
            title: "دیدگاه‌ها",
            icon: <GoCommentDiscussion className="text-2xl" />,
            route: "store/comments",
            parent: "text-gray-700 bg-gray-700/5 shadow-md",
            iconBg: "bg-gray-700/10",
        },
        {
            title: "پروموشن‌ها",
            icon: <GrAnnounce className="text-2xl" />,
            route: "store/promotions",
            parent: "text-orange-700 bg-orange-700/5 shadow-md",
            iconBg: "bg-orange-700/10",
        },
    ];

    return (
        <div className="bg-gradient-to-l from-blue-100 via-purple-100 rounded-xl p-4 shadow-md">
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
            <div className="flex items-center justify-around mt-6">
                {topLinks.map(({ title, icon, route, parent, iconBg }) => (
                    <BoxLink
                        key={route}
                        title={title}
                        icon={icon}
                        routeName={route}
                        parentStyle={parent}
                        iconStyle={iconBg}
                    />
                ))}
            </div>
        </div>
    )
}

export default ShopInfosCard
