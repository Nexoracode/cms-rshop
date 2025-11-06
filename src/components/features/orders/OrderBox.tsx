"use client";

import { useState } from "react";
import BaseCard from "@/components/ui/BaseCard";
import { GrLocation } from "react-icons/gr";
import { LuUserRound } from "react-icons/lu";
import { PiMoneyWavy } from "react-icons/pi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Listbox,
  ListboxItem,
} from "@heroui/react";
import { useUpdateOrderStatus } from "@/core/hooks/api/orders/useOrder";
import { statusOptions } from "./order-constants";
import { StatusOrder } from "./order-types";
import { statusMap } from "@/core/constants/statusMap";
import CardRows from "@/components/shared/CardRows";

type Props = {
  order: any;
  disableAction?: boolean;
  onClicked?: () => void;
};

const OrderCard: React.FC<Props> = ({
  order,
  disableAction = false,
  onClicked,
}) => {
  const updateOrderStatus = useUpdateOrderStatus();
  const initialKey = (order?.status ?? "pending").toLowerCase() as StatusOrder;
  const initialStatus =
    statusOptions.find((s) => s.key === initialKey) ?? statusOptions[0];
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = (key: string) => {
    const next = statusOptions.find((s) => s.key === key) ?? selectedStatus;
    setSelectedStatus(next);
    setIsOpen(false);
    updateOrderStatus.mutate(
      { id: order.id, status: next.key },
      { onError: () => setSelectedStatus(initialStatus) }
    );
  };

  const rowItems = [
    {
      label: "مبلغ کل",
      value: `${Number(order?.total ?? 0).toLocaleString("fa-IR")} تومان`,
    },
    {
      label: "مشتری",
      value: `${order.user.first_name ?? "نام"} ${
        order.user.last_name ?? "و نام خوانوادگی"
      }`.trim(),
    },
    {
      label: "شماره تماس",
      value: order.user.phone,
    },
    {
      label: "آدرس",
      value: `${order.user.addresses[0].province} - ${order.user.addresses[0].city}`,
    },
  ];

  console.log(order);

  const status = order.status as StatusOrder;
  const statusInfo = statusMap[status];

  return (
    <BaseCard
      bodyClassName="flex flex-col gap-3 p-4 w-auto"
      redirect={`/admin/orders/order?id=${order.id}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`text-2xl rounded-full border p-4 ${statusInfo.color} ${statusInfo.bgColor} ${statusInfo.borderColor}`}
          >
            <span className="text-2xl">{statusInfo.icon}</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[17px] text-primary">#{order?.id}</p>
            <span className="text-xs text-gray-500">
              {order?.created_at
                ? new Date(order.created_at).toLocaleString("fa-IR")
                : "—"}
            </span>
          </div>
        </div>

        {!disableAction && (
          <div className="w-full xs:w-fit">
            <Popover
              showArrow
              backdrop="opaque"
              offset={10}
              placement="bottom"
              isOpen={isOpen}
              onOpenChange={setIsOpen}
            >
              <PopoverTrigger>
                <Button
                  className="capitalize w-full xs:w-fit text-sm"
                  color="secondary"
                  variant="flat"
                  size="sm"
                  isLoading={updateOrderStatus.isPending}
                >
                  {selectedStatus.title}
                  <MdOutlineKeyboardArrowDown className="text-lg" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[240px]">
                <div className="px-1 py-2 w-full">
                  <Listbox
                    items={statusOptions}
                    onAction={(key) => handleStatusChange(String(key))}
                    selectedKeys={[selectedStatus.key]}
                  >
                    {(item) => (
                      <ListboxItem key={item.key}>{item.title}</ListboxItem>
                    )}
                  </Listbox>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <CardRows items={rowItems} />
    </BaseCard>
  );
};

export default OrderCard;
