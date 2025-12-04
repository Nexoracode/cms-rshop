"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import InfoRow from "../../../shared/InfoRow";
import { LuUserRound } from "react-icons/lu";
import { TiInfoLargeOutline } from "react-icons/ti";
import { IoMdPaper } from "react-icons/io";
import { TbTruckLoading, TbUserPin, TbUserQuestion } from "react-icons/tb";
import { OrderData } from "../order-types";
import StepContent from "./StepContent";
import CardHeader from "@/components/common/Card/CardHeader";

type OrderProcessProps = {
  order: OrderData | undefined;
  /**
   * اگر از بیرون خواستی کنترل StepContent رو بدی (مثلاً از OrderWizard)
   * می‌تونی actionBox بسازی و پاس بدی؛ در غیر این صورت OrderProcess خودش
   * یک actionBox می‌سازه و داخلی مدیریت مرحله رو انجام میده.
   */
  actionBox?: React.ReactNode;
};

type StepKey = any;

const statusToStep = (status: any /* OrderData["status"] */): any => {
  //StepKey
  switch (status) {
    case "pending":
      return "1";
    case "paid":
      // من اینجا paid رو به "3" نگاشت زدم (پرداخت انجام شده -> در انتظار تایید).
      // اگر می‌خوای paid برابر "4" باشه (آماده‌سازی) اینجا تغییرش بده.
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

  // --- استخراج پایه از order ---
  const {
    id,
    status,
    subtotal,
    discount_total,
    total,
    coupon_code,
    is_manual,
    note,
    created_at,
    user,
  } = order;

  // === اطلاعات سفارش ===
  const orderInfo = {
    code: `ORD-${id}`,
    date: new Date(created_at).toLocaleDateString("fa-IR"),
    paymentMethod: is_manual ? "پرداخت دستی" : "درگاه بانکی",
    amount: `${Number(total).toLocaleString("fa-IR")} تومان`,
    deliveryDate: "-",
    readyIn: "-",
    promoCode: coupon_code ?? "ندارد",
    instruction: note ?? "",
  };

  // === اطلاعات فاکتور ===
  const invoice = {
    total: `${Number(subtotal).toLocaleString("fa-IR")} تومان`,
    discount: `${Number(discount_total).toLocaleString("fa-IR")} تومان`,
    code: coupon_code ?? "ندارد",
    tax: "۰ تومان",
    shippingCost: "۰ تومان",
    packagingCost: "۰ تومان",
    totalDue: `${Number(total).toLocaleString("fa-IR")} تومان`,
  };

  // === اطلاعات ارسال (فعلاً از API موجود نیست، placeholder) ===
  const shipping = {
    method: "ارسال نشده",
    cost: "۰ تومان",
    time: "-",
    weight: "-",
  };

  // === مدیریت مرحله (فقط در صورتی که actionBox از بیرون نیومده باشه) ===
  const [step, setStep] = useState<StepKey>(() => statusToStep(status));
  useEffect(() => {
    // اگر order تغییر کنه، مرحله رو بر اساس status جدید ریست کن
    setStep(statusToStep(status));
  }, [status]);

  const next = () => {
    const nextNum = Math.min(Number(step) + 1, 6);
    setStep(String(nextNum) as StepKey);
  };
  const prev = () => {
    const prevNum = Math.max(Number(step) - 1, 1);
    setStep(String(prevNum) as StepKey);
  };

  const localActionBox = <StepContent step={step} onNextStep={next} />;

  const usedActionBox = actionBox ?? localActionBox;

  // === UI === (استایل/طراحی دست نخورده؛ فقط داده‌ها از order پر میشه)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* ستون اول */}
      <div className="space-y-6">
        {/* باکس کد سفارش */}
        <Card className="shadow-md border border-gray-100">
          {/*    <BoxHeader
            title={orderInfo.code}
            color="text-blue-700 bg-blue-700/10"
            textSize="text-[16px]"
            icon={orderInfo.date}
          /> */}
          <CardBody className="text-right">{usedActionBox}</CardBody>
        </Card>

        {/* باکس فاکتور */}
        <Card className="shadow-md border border-gray-100">
          {/*   <BoxHeader
            title="محصولات و فاکتور"
            color="text-gray-100 bg-black"
            textSize="text-[16px]"
            icon={<IoMdPaper className="text-2xl" />}
          /> */}
          <CardBody>
            <div className="mb-4">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow p-2 rounded-xl w-full flex flex-col gap-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="rounded-xl w-16 h-16 object-cover shrink-0"
                    />

                    {/* — محتوای محصول + variant — */}
                    <div className="w-full flex flex-col justify-between py-1">
                      {/* محصول + تعداد */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700 font-medium">
                          {item.product?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          تعداد: {item.quantity}
                        </p>
                      </div>

                      {/* قیمت‌ها */}
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-600">
                          قیمت واحد: {item.unit_price.toLocaleString()} تومان
                        </p>
                        <p className="text-xs text-gray-700 font-semibold">
                          مجموع: {item.line_total.toLocaleString()} تومان
                        </p>
                      </div>

                      {/* — این قسمت: variant زیر کل باکس محصول — */}
                    </div>
                  </div>
                  {item.variant?.attributes?.length > 0 && (
                    <div className="mt-2 border-t pt-2 text-xs text-gray-500 space-y-1">
                      {item.variant.attributes.map((attr) => (
                        <div
                          key={attr.name}
                          className="flex items-center gap-2"
                        >
                          <span>
                            {attr.name}: {attr.value}
                          </span>

                          {/* دایره رنگ فقط اگر display_color وجود داشته باشد */}
                          {attr.display_color && (
                            <span
                              className="inline-block w-3 h-3 rounded-full border"
                              style={{ backgroundColor: attr.display_color }}
                            ></span>
                          )}
                        </div>
                      ))}
                      <p className="text-xs">
                        قیمت: {item.variant.price.toLocaleString()} تومان
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <InfoRow label="جمع کل" value={invoice.total} isActiveBg />

              <InfoRow label="تخفیف محصولات" value={invoice.discount} />

              <InfoRow label="کد تخفیف" value={invoice.code} isActiveBg />

              <InfoRow label="مالیات" value={invoice.tax} />

              <InfoRow
                label="هزینه ارسال"
                value={invoice.shippingCost}
                isActiveBg
              />

              <InfoRow label="هزینه بسته بندی" value={invoice.packagingCost} />

              <Divider className="bg-gray-200" />

              <InfoRow label="مبلغ قابل پرداخت" value={invoice.totalDue} />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ستون دوم */}
      <div className="space-y-6">
        {/* اطلاعات مشتری */}

        <Card className="shadow-md border border-gray-100">
          <CardBody className="overflow-x-hidden">
            <div className="space-y-1 -mt-1">
              <InfoRow
                label="نام و نام خوانوادگی"
                value={`${order.user.first_name} ${order.user.last_name}`}
              />
              <InfoRow
                label="شماره موبایل"
                value={order.user.phone}
                isActiveBg
              />
              <InfoRow
                label="ایمیل"
                value={order.user.email ?? "example@gmail.com"}
              />
              <InfoRow
                label="سفارش برای"
                value={
                  order.address.is_self
                    ? "خودم"
                    : order.address.recipient_name
                    ? `${order.address.recipient_name} (${
                        order.address.recipient_phone ?? "بدون شماره"
                      })`
                    : "شخص دیگر"
                }
                isActiveBg
              />
              <InfoRow
                label="کدپستی"
                value={order.address.postal_code ?? "example@gmail.com"}
              />
              <InfoRow
                label="شهر و استان"
                value={`${order.address.province} , ${order.address.city}`}
                isActiveBg
              />
              <div className="p-2 px-3 text-right !mt-2">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-gray-700">آدرس کامل</p>
                  {order.address.is_primary ? (
                    <p className="text-xs text-green-600 bg-green-100 rounded-lg p-0.5 px-2">
                      اصلی
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="min-h-10 h-full flex items-center justify-center text-gray-700 leading-7">
                  <p>{`${order.address.address_line} , پلاک ${order.address.plaque} , واحد ${order.address.unit} `}</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* اطلاعات سفارش */}
        <Card className="shadow-md border border-gray-100">
          {/*   <BoxHeader
            title="اطلاعات سفارش"
            color="text-orange-700 bg-orange-700/10"
            textSize="text-[16px]"
            icon={<TiInfoLargeOutline className="text-2xl" />}
          /> */}
          <CardBody>
            <div className="space-y-1">
              <InfoRow label="کد سفارش" value={orderInfo.code} />
              <InfoRow label="تاریخ ثبت" value={orderInfo.date} isActiveBg />
              <InfoRow label="روش پرداخت" value={orderInfo.paymentMethod} />
              <InfoRow label="مبلغ" value={orderInfo.amount} isActiveBg />
              <InfoRow label="تاریخ تحویل" value={orderInfo.deliveryDate} />
              <InfoRow
                label="آماده‌سازی"
                value={orderInfo.readyIn}
                isActiveBg
              />
              <InfoRow label="کد تخفیف" value={orderInfo.promoCode} />
            </div>
          </CardBody>
        </Card>

        {/* اطلاعات ارسال */}
        <Card className="shadow-md border border-gray-100">
          {/*  <BoxHeader
            title="اطلاعات ارسال"
            color="text-orange-700 bg-orange-700/10"
            textSize="text-[16px]"
            icon={<TbTruckLoading className="text-2xl" />}
          /> */}
          <CardBody>
            <div className="space-y-2">
              <InfoRow label="روش ارسال" value={shipping.method} />
              <InfoRow label="هزینه ارسال" value={shipping.cost} isActiveBg />
              <InfoRow label="زمان ارسال" value={shipping.time} />
              <InfoRow label="وزن مرسوله" value={shipping.weight} isActiveBg />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default OrderProcess;
