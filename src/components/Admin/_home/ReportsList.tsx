"use client"

import { Button, Card, CardBody, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ReportBox from "./helpers/ReportBox";
import { TbWorldSearch } from "react-icons/tb";
import { PiMoneyWavyBold } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { useState } from "react";
import BoxHeader from "../_products/__create/helpers/BoxHeader";

const dateOptions = [
    { key: "today", label: "امروز" },
    { key: "last7", label: "7 روز گذشته" },
    { key: "last30", label: "30 روز گذشته" },
    { key: "lastYear", label: "سال گذشته" },
];

const ReportsList = () => {

    const [selectedDate, setSelectedDate] = useState(dateOptions[1]);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="shadow-md">
            <BoxHeader
                title="گزارش ها"
                color="bg-orange-700/10 text-orange-700"
                icon={
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
                                className="capitalize"
                                color="warning"
                                variant="flat"
                                size="sm"
                            >
                                {selectedDate.label} <MdOutlineKeyboardArrowDown className="text-xl" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px]">
                            <div className="px-1 py-2 w-full">
                                <div className="mt-2 flex flex-col gap-2 w-full">
                                    <Listbox
                                        items={dateOptions}
                                        onAction={(key) => {
                                            const selected = dateOptions.find((item) => item.key === key);
                                            if (selected) {
                                                setSelectedDate(selected);
                                                setIsOpen(false); // پاپ‌آپ بسته شود
                                            }
                                        }}
                                        selectedKeys={[selectedDate.key]}
                                    >
                                        {(item) => (
                                            <ListboxItem key={item.key}>{item.label}</ListboxItem>
                                        )}
                                    </Listbox>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                }
            />
            <CardBody className="shadow-md grid xs:grid-cols-2 gap-2 xs:gap-6">
                <ReportBox title="بازدید سایت" icon={<TbWorldSearch className="text-2xl text-purple-600" />} count={"3000"} />
                <ReportBox title="فروش کل" icon={<PiMoneyWavyBold className="text-2xl text-purple-600" />} count={"3000"} />
                <ReportBox title="سفارش ها" icon={<HiOutlineDocumentText className="text-2xl text-purple-600" />} count={"3000"} />
                <ReportBox title="مشتری جدید" icon={<FiUsers className="text-2xl text-purple-600" />} count={"3000"} />
            </CardBody>
        </Card>
    )
}

export default ReportsList