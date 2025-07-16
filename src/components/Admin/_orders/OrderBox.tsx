"use client"

import React, { useState } from "react";
import {
    Card,
    CardBody,
    Button,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Listbox,
    ListboxItem,
} from "@heroui/react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { LuUserRound } from "react-icons/lu";
import { TbTruckLoading } from "react-icons/tb";
import { PiMoneyWavy } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";

const statusOptions = [
    { key: "waiting_for_approval", label: "در انتظار تایید" },
    { key: "waiting_for_payment", label: "در انتظار پرداخت" },
    { key: "waiting_for_payment_confirmation", label: "در انتظار تایید پرداخت" },
    { key: "preparing", label: "در حال آماده‌سازی" },
    { key: "shipping", label: "در حال ارسال" },
    { key: "delivered", label: "تحویل گرفته" },
    { key: "not_delivered", label: "تحویل نگرفته" },
    { key: "expired", label: "منقضی شده" },
    { key: "rejected", label: "رد شده" },
];

const OrderBox = ({
    image,
    orderId,
    date,
    status,
    name,
    city,
    province,
    delivery,
    price,
    onClicked
}: {
    image: string,
    orderId: string,
    date: string,
    status: string,
    name: string,
    city: string,
    province: string,
    delivery: string,
    price: string,
    onClicked: () => void
}) => {
    const [selectedStatus, setSelectedStatus] = useState(
        statusOptions.find((s) => s.key === status) || statusOptions[0]
    );
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card isBlurred className="border-none shadow-md cursor-pointer !transition-all hover:shadow-lg">
            <div className="w-full h-[4px] bg-cyan-200 rounded-t-md" />
            <CardBody className="p-4" onClick={onClicked}>
                <div className="flex flex-col xs:flex-row gap-3 items-center justify-between">
                    <div className="flex w-full justify-between xs:justify-start items-center gap-3">
                        <div className="flex items-center gap-1">
                            <div>
                                <IoIosArrowForward className="text-xl" />
                            </div>
                            <Image
                                src={image}
                                alt="cover"
                                className="w-12 h-12 object-cover rounded-full"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-semibold text-gray-700">{orderId}</span>
                            <span className="text-xs text-gray-500">{date}</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <Popover
                            showArrow
                            backdrop="opaque"
                            offset={10}
                            placement="bottom"
                            isOpen={isOpen}
                            onOpenChange={(open) => setIsOpen(open)}
                        >
                            <PopoverTrigger>
                                <Button
                                    className="capitalize w-full xs:w-fit text-sm"
                                    color="secondary"
                                    variant="flat"
                                    size="sm"
                                >
                                    {selectedStatus.label} <MdOutlineKeyboardArrowDown className="text-lg" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[240px]">
                                <div className="px-1 py-2 w-full">
                                    <div className="mt-2 flex flex-col gap-2 w-full">
                                        <Listbox
                                            items={statusOptions}
                                            onAction={(key) => {
                                                const selected = statusOptions.find((item) => item.key === key);
                                                if (selected) {
                                                    setSelectedStatus(selected);
                                                    setIsOpen(false);
                                                }
                                            }}
                                            selectedKeys={[selectedStatus.key]}
                                        >
                                            {(item) => (
                                                <ListboxItem key={item.key}>{item.label}</ListboxItem>
                                            )}
                                        </Listbox>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <hr className="my-3 border-gray-200" />

                <div className="flex flex-wrap gap-4 justify-between items-center text-sm text-gray-700">
                    <span className="bg-slate-100 rounded-xl p-2 px-4 flex-grow flex items-center gap-1">
                        <PiMoneyWavy className="text-xl" /> {price} تومان
                    </span>
                    <span className="bg-slate-100 rounded-xl p-2 px-4 flex-grow flex items-center gap-1">
                        <TbTruckLoading className="text-xl" /> {delivery}
                    </span>
                    <span className="bg-slate-100 rounded-xl p-2 px-4 flex-grow flex items-center gap-1">
                        <GrLocation className="text-xl" /> {province} - {city}
                    </span>
                    <span className="bg-slate-100 rounded-xl p-2 px-4 flex-grow flex items-center gap-1">
                        <LuUserRound className="text-xl" />
                        {name}
                    </span>
                </div>
            </CardBody>
        </Card>
    );
};

export default OrderBox;
