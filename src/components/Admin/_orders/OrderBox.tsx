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

const statusOptions = [
    { key: "preparing", label: "در حال آماده‌سازی" },
    { key: "shipped", label: "ارسال شده" },
    { key: "delivered", label: "تحویل داده شد" },
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
}) => {
    const [selectedStatus, setSelectedStatus] = useState(
        statusOptions.find((s) => s.key === status) || statusOptions[0]
    );
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card isBlurred className="border-none shadow-md">
            <div className="w-full h-[4px] bg-cyan-200 rounded-t-md" />
            <CardBody className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src={image}
                            alt="cover"
                            className="w-12 h-12 object-cover rounded-full"
                        />
                        <div className="flex flex-col">
                            <span className="text-[13px] font-semibold text-gray-700">{orderId}</span>
                            <span className="text-xs text-gray-500">{date}</span>
                        </div>
                    </div>
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
                                className="capitalize text-sm"
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

                <hr className="my-3 border-gray-200" />

                <div className="flex justify-between items-center text-sm text-gray-700">
                    <span className="flex items-center gap-1">
                        <PiMoneyWavy className="text-xl" /> {price} تومان
                    </span>
                    <span className="flex items-center gap-1">
                        <TbTruckLoading className="text-xl" /> {delivery}
                    </span>
                    <span className="flex items-center gap-1">
                        <GrLocation className="text-xl" /> {province} - {city}
                    </span>
                    <span className="text-[13p] flex items-center gap-1 text-gray-600">
                        <LuUserRound className="text-xl" />
                        {name}
                    </span>
                </div>
            </CardBody>
        </Card>
    );
};

export default OrderBox;
