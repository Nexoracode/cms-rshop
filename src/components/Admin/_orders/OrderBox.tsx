"use client";

import { useRef, useState } from "react";
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
import { PiMoneyWavy } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { useUpdateOrderStatus } from "@/hooks/api/orders/useOrder";
import { StatusOrder } from "./order-types";

const statusOptions: { key: StatusOrder; label: string }[] = [
  { key: "pending", label: "در انتظار" },
  { key: "paid", label: "پرداخت‌شده" },
  { key: "cancelled", label: "لغوشده" },
  { key: "shipped", label: "ارسال‌شده" },
  { key: "delivered", label: "تحویل‌شده" },
  { key: "refunded", label: "عودت وجه" },
  { key: "failed", label: "ناموفق" },
];

type Props = {
  order: any;
  onClicked: () => void;
};

const OrderBox: React.FC<Props> = ({ order, onClicked }) => {
  const updateOrderStatus = useUpdateOrderStatus();

  // داده‌ی خام از بک‌اند (بدون دست‌کاری اضافه)
  const image = "/images/placeholders/order.png";
  const orderIdText = `#${order?.id}`;
  const createdAtFa = order?.created_at
    ? new Date(order.created_at).toLocaleString("fa-IR")
    : "—";

  const total = Number(order?.total ?? 0);
  const totalPriceFa = total.toLocaleString("fa-IR");

  const customerName =
    order?.user?.first_name || order?.user?.last_name
      ? `${order?.user?.first_name ?? ""} ${order?.user?.last_name ?? ""}`
      : order?.user?.phone ?? "—";

  // اطمینان از هم‌حروفی (مثلاً اگر بک‌اند lowercase می‌دهد)
  const initialKey = (order?.status ?? "pending").toLowerCase() as StatusOrder;
  const initialStatus =
    statusOptions.find((s) => s.key === initialKey) ?? statusOptions[0];

  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [isOpen, setIsOpen] = useState(false);
  const prevStatusRef = useRef(initialStatus);

  const handleStatusChange = (key: string) => {
    const next = statusOptions.find((s) => s.key === key) ?? selectedStatus;
    // optimistic UI
    prevStatusRef.current = selectedStatus;
    setSelectedStatus(next);
    setIsOpen(false);

    updateOrderStatus.mutate(
      { id: order.id, status: next.key },
      {
        onError: () => {
          // rollback on error
          setSelectedStatus(prevStatusRef.current);
        },
      }
    );
  };

  return (
    <Card
      isBlurred
      className="border-none shadow-md cursor-pointer transition-all hover:shadow-lg w-full"
    >
      <div className="w-full h-[4px] bg-cyan-200 rounded-t-md" />
      <CardBody className="p-4" onClick={onClicked}>
        <div className="flex flex-col xs:flex-row gap-3 items-center justify-between">
          <div className="flex w-full justify-between xs:justify-start items-center gap-3">
            <div className="flex items-center gap-1">
              <IoIosArrowForward className="text-xl" />
              <Image
                src={image}
                alt="order"
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-gray-700">
                {orderIdText}
              </span>
              <span className="text-xs text-gray-500">{createdAtFa}</span>
            </div>
          </div>

          <div className="w-full">
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
                  {selectedStatus.label}
                  <MdOutlineKeyboardArrowDown className="text-lg" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[240px]">
                <div className="px-1 py-2 w-full">
                  <div className="mt-2 flex flex-col gap-2 w-full">
                    <Listbox
                      items={statusOptions}
                      onAction={(key) => handleStatusChange(String(key))}
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
            <PiMoneyWavy className="text-xl" />
            {totalPriceFa} تومان
          </span>
          <span className="bg-slate-100 rounded-xl p-2 px-4 flex-grow flex items-center gap-1">
            <GrLocation className="text-xl" />
            {"—"} - {"—"}
          </span>
          <span className="bg-slate-100 rounded-xl p-2 px-4 flex-grow flex items-center gap-1">
            <LuUserRound className="text-xl" />
            {customerName}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderBox;
