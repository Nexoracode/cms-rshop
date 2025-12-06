"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import InfoRow from "../../../shared/InfoRow";
import { OrderData } from "../order-types";
import StepContent from "./StepContent";
import { statusMap } from "@/core/constants/statusMap";
import { getPaymentStatusText } from "./order-constants";
import { toPersianDate } from "@/core/utils/date";

type OrderProcessProps = {
  order: OrderData | undefined;
  actionBox?: React.ReactNode;
};

const statusToStep = (status: string): string => {
  switch (status) {
    case "pending":
      return "1";
    case "paid":
    case "preparing":
      return "3";
    case "shipped":
      return "5";
    case "delivered":
      return "6";
    case "cancelled":
    case "refunded":
    case "failed":
    default:
      return "1";
  }
};

const OrderProcess: React.FC<OrderProcessProps> = ({ order, actionBox }) => {
  if (!order) return null;

  const {
    id,
    status,
    subtotal,
    discount_total,
    total,
    coupon_code,
    created_at,
    user,
    address,
    payment,
    items,
  } = order;

  // اطلاعات فاکتور
  const invoice = {
    total: `${Number(subtotal).toLocaleString("fa-IR")} تومان`,
    discount: `${Number(discount_total).toLocaleString("fa-IR")} تومان`,
    code: coupon_code ?? "ندارد",
    shippingCost: "رایگان",
    packagingCost: "۰ تومان",
    totalDue: `${Number(total).toLocaleString("fa-IR")} تومان`,
  };

  // مدیریت استپ‌ها
  const [step, setStep] = useState<string>(() => statusToStep(status));

  useEffect(() => {
    setStep(statusToStep(status));
  }, [status]);

  const next = () => setStep((prev) => String(Math.min(Number(prev) + 1, 6)));
  const prev = () => setStep((prev) => String(Math.max(Number(prev) - 1, 1)));

  const localActionBox = <StepContent step={step} onNextStep={next} />;
  const usedActionBox = actionBox ?? localActionBox;

  // وضعیت پرداخت
  const paymentMethod = payment
    ? payment.payment_method === "online"
      ? "پرداخت آنلاین (زرین‌پال)"
      : "کارت به کارت"
    : "-";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* ستون اول */}
      <div className="space-y-6">
        {/* استپ‌های سفارش */}
        <Card className="shadow-md border border-gray-100">
          <CardBody className="text-right">{usedActionBox}</CardBody>
        </Card>

        {/* محصولات و فاکتور */}
        <Card className="shadow-md border border-gray-100">
          <CardBody>
            <h3 className="text-lg mb-4 text-center">محصولات</h3>
            <div className="space-y-3 mb-6">
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl p-2 flex flex-col gap-4 shadow border border-slate-200"
                >
                  <div className="w-full flex items-center gap-2.5">
                    <img
                      src={item.product?.image || "/placeholder.jpg"}
                      alt={item.product?.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="w-full flex flex-col justify-start text-right gap-2.5">
                      <p className="w-full text-gray-800 text-right truncate">
                        {item.product?.name}
                      </p>
                      <div className="w-full flex items-center justify-between">
                        <span className="text-[13px] text-green-600 bg-green-50 rounded-lg p-0.5">
                          قیمت کل:{" "}
                          {Number(item.line_total).toLocaleString("fa-IR")}{" "}
                          تومان
                        </span>
                        <span className="text-[13px] text-gray-500">
                          {item.quantity} عدد
                        </span>
                      </div>
                    </div>
                  </div>

                  {item.variant?.attributes &&
                    item.variant.attributes.length > 0 && (
                      <div className="w-full flex items-center justify-between gap-2 text-xs text-gray-600">
                        <span className="truncate">{item.variant.sku}</span>
                        <span>
                          {Number(item.variant.price).toLocaleString("fa-IR")}{" "}
                        </span>
                      </div>
                    )}
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <InfoRow
                label="جمع کل محصولات"
                value={invoice.total}
                isActiveBg
              />
              <InfoRow label="تخفیف محصولات" value={invoice.discount} />
              <InfoRow label="کد تخفیف" value={invoice.code} isActiveBg />
              <InfoRow label="هزینه ارسال" value={invoice.shippingCost} />
              <InfoRow
                label="هزینه بسته‌بندی"
                value={invoice.packagingCost}
                isActiveBg
              />
              <Divider className="!mt-4" />
              <InfoRow
                label="مبلغ قابل پرداخت"
                value={invoice.totalDue}
                hoverable
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ستون دوم */}
      <div className="space-y-6">
        {/* اطلاعات مشتری و گیرنده */}
        <Card className="shadow-md border border-gray-100">
          <CardBody>
            <h3 className="text-lg mb-4 text-center">اطلاعات گیرنده</h3>
            <div className="space-y-3">
              <InfoRow
                label="نام و نام خانوادگی"
                value={`${user.first_name} ${user.last_name}`}
                hoverable
              />
              <InfoRow
                label="شماره موبایل"
                value={user.phone}
                isActiveBg
                hoverable
              />
              <InfoRow
                label="ایمیل"
                value={user.email || "ثبت نشده"}
                hoverable
              />

              <InfoRow
                label="سفارش برای"
                value={
                  address.is_self
                    ? "خودم"
                    : `${address.recipient_name} (${
                        address.recipient_phone || "بدون شماره"
                      })`
                }
                isActiveBg
                hoverable
              />

              <InfoRow label="کد پستی" value={address.postal_code} hoverable />

              <InfoRow
                label="استان و شهر"
                value={`${address.province}، ${address.city}`}
                isActiveBg
              />

              <div className="mt-4 p-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">آدرس کامل</span>
                  {address.is_primary && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      آدرس اصلی
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed text-right">
                  {address.address_line}
                  {address.plaque && `، پلاک ${address.plaque}`}
                  {address.unit && `، واحد ${address.unit}`}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* اطلاعات کلی سفارش */}
        <Card className="shadow-md border border-gray-100">
          <CardBody>
            <h3 className="text-lg text-center mb-4">اطلاعات سفارش</h3>
            <div className="space-y-3">
              <InfoRow label="کد سفارش" value={`#${id}`} hoverable />
              <InfoRow
                label="تاریخ و ساعت ثبت"
                value={toPersianDate(created_at)}
                isActiveBg
              />
              <InfoRow label="وضعیت سفارش" value={statusMap[status].title} />
              <InfoRow
                label="قیمت کل"
                value={`${Math.floor(+total).toLocaleString()} تومان`}
                isActiveBg
              />
            </div>
          </CardBody>
        </Card>

        {/* اطلاعات پرداخت */}
        <Card className="shadow-md border border-gray-100">
          <CardBody>
            <h3 className="text-lg text-center mb-4">اطلاعات پرداخت</h3>
            <div className="space-y-3">
              <InfoRow
                label="تاریخ پرداخت"
                value={
                  payment?.created_at
                    ? toPersianDate(payment.created_at)
                    : "پرداخت نشده"
                }
              />
              <InfoRow label="روش پرداخت" value={paymentMethod} isActiveBg />
              <InfoRow
                label="وضعیت پرداخت"
                value={getPaymentStatusText(order?.payment)}
              />
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md border border-gray-100">
          <CardBody>
            <h3 className="text-lg mb-4 text-center">اطلاعات ارسال</h3>
            <div className="text-sm text-gray-500 text-center">
              <p>هنوز ارسال نشده است.</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default OrderProcess;
