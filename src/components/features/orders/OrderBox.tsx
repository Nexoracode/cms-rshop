"use client";

import { useState } from "react";
import BaseCard from "@/components/ui/BaseCard";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Listbox,
  ListboxItem,
  Chip,
  AvatarGroup,
  Avatar,
} from "@heroui/react";
import { useUpdateOrderStatus } from "@/core/hooks/api/orders/useOrder";
import { statusOptions } from "./order-constants";
import { StatusOrder } from "./order-types";
import { statusMap } from "@/core/constants/statusMap";
import CardRows from "@/components/shared/CardRows";
import PopoverSelect, {
  PopoverSelectItem,
} from "@/components/ui/PopoverSelect";
import { TfiShoppingCartFull } from "react-icons/tfi";

type Props = {
  order: any;
  disableAction?: boolean;
};

const OrderCard: React.FC<Props> = ({ order, disableAction = false }) => {
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
      value: `${order.user?.addresses?.province} - ${order.user?.addresses?.city}`,
    },
  ];

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
        {!disableAction ? (
          <PopoverSelect
            items={statusOptions as PopoverSelectItem[]}
            initialKey={selectedStatus.key}
            isLoading={updateOrderStatus.isPending}
            onSelect={(key) => {
              const next = statusOptions.find((s) => s.key === key);
              if (!next) return;

              setSelectedStatus(next);
              updateOrderStatus.mutate(
                { id: order.id, status: next.key },
                {
                  onError: () => setSelectedStatus(selectedStatus),
                }
              );
            }}
            buttonClassName="capitalize w-full xs:w-fit text-sm"
            popoverClassName="w-[240px]"
          />
        ) : (
          <Chip size="sm" variant="flat">
            {statusInfo.title}
          </Chip>
        )}
      </div>

      <CardRows items={rowItems} />

      <div className="flex items-center justify-between w-full py-4 px-2">
        <TfiShoppingCartFull
          className="text-3xl text-sky-700"
          style={{
            display: "inline-block",
            animation: "rotateBack 2s ease-in-out infinite",
          }}
        />

        <style>
          {`
            @keyframes rotateBack {
              0% { transform: rotate(0deg); }
              25% { transform: rotate(15deg); }
              50% { transform: rotate(-15deg); }
              75% { transform: rotate(10deg); }
              100% { transform: rotate(0deg); }
            }
          `}
        </style>

        <AvatarGroup isBordered max={4} total={10} size="sm">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
      </div>
    </BaseCard>
  );
};

export default OrderCard;
