"use client"

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItem
} from "@heroui/react";
import { IoMdMore } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { MdOutlineCreditCard } from "react-icons/md";

interface OrderBoxProps {
  imageSrc: string;
  title: string;
  statusOptions: { key: string; label: string }[];
  selectedStatus: { key: string; label: string };
  onStatusChange: (status: { key: string; label: string }) => void;
  dateTime: string;
  orderId: string;
  customer: string;
  location: string;
  shipping: string;
  price: string;
}

const OrderBox: React.FC<OrderBoxProps> = ({
  imageSrc,
  title,
  statusOptions,
  selectedStatus,
  onStatusChange,
  dateTime,
  orderId,
  customer,
  location,
  shipping,
  price,
}) => {
  const [statusOpen, setStatusOpen] = useState(false);

  return (
    <Card className="border-none shadow-sm rounded-xl overflow-hidden">
      <div className="border-t-4 border-teal-200">
        <CardBody className="pb-3 pt-4 px-4">
          <div className="flex items-center gap-4">
            <Image
              alt="product cover"
              className="object-cover rounded-md"
              shadow="sm"
              src={imageSrc}
              width={80}
              height={80}
            />

            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{orderId}</span>
                  <span className="text-xs">|</span>
                  <span>{dateTime}</span>
                </div>
                <Popover
                  showArrow
                  placement="bottom"
                  offset={8}
                  isOpen={statusOpen}
                  onOpenChange={setStatusOpen}
                >
                  <PopoverTrigger>
                    <Button
                      variant="flat"
                      size="sm"
                      color="primary"
                      className="rounded-full px-3 text-xs font-semibold"
                    >
                      {selectedStatus.label}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <Listbox
                      items={statusOptions}
                      selectedKeys={[selectedStatus.key]}
                      onAction={(key) => {
                        const next = statusOptions.find((i) => i.key === key);
                        if (next) {
                          onStatusChange(next);
                          setStatusOpen(false);
                        }
                      }}
                    >
                      {(item) => (
                        <ListboxItem key={item.key}>{item.label}</ListboxItem>
                      )}
                    </Listbox>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 text-[13px] text-gray-600">
                <div className="flex items-center gap-1 col-span-1">
                  <HiOutlineUser className="text-[15px]" />
                  {customer}
                </div>
                <div className="flex items-center gap-1 col-span-1">
                  <MdOutlineLocationOn className="text-[15px]" />
                  {location}
                </div>
                <div className="flex items-center gap-1 col-span-1">
                  <FaTruck className="text-[14px]" />
                  {shipping}
                </div>
                <div className="flex items-center gap-1 col-span-1">
                  <MdOutlineCreditCard className="text-[15px]" />
                  <span className="text-black font-semibold">{price}</span>
                  <span className="text-gray-400 text-xs">تومان</span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </div>
    </Card>
  );
};

export default OrderBox;
