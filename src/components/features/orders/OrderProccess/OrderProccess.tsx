"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import InfoRow from "../../../shared/InfoRow";
import { LuUserRound } from "react-icons/lu";
import { TiInfoLargeOutline } from "react-icons/ti";
import { IoMdPaper } from "react-icons/io";
import { TbTruckLoading } from "react-icons/tb";
import { OrderData } from "../order-types";
import StepContent from "./StepContent";
import { StepKey } from "./type";

type OrderProcessProps = {
  order: OrderData | undefined;
  /**
   * اگر از بیرون خواستی کنترل StepContent رو بدی (مثلاً از OrderWizard)
   * می‌تونی actionBox بسازی و پاس بدی؛ در غیر این صورت OrderProcess خودش
   * یک actionBox می‌سازه و داخلی مدیریت مرحله رو انجام میده.
   */
  actionBox?: React.ReactNode;
};

const statusToStep = (status: any /* OrderData["status"] */): any => { //StepKey
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

  // === اطلاعات مشتری ===
  const customer = {
    name:
      user.first_name && user.last_name
        ? `${user.first_name} ${user.last_name}`
        : "بدون نام",
    phone: user.phone,
    address: "آدرس در حال حاضر در API نیست",
    notes: note ?? "بدون توضیح",
  };

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
              {/* TODO: اگر order.items در OrderData اضافه شد، اینجا لیست محصولات رو دینامیک رندر کن */}
              <div className="bg-white shadow p-2 rounded-xl w-full flex gap-2">
                <img
                  src="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg"
                  alt="product"
                  className="rounded-xl w-16"
                />
                <div className="w-full flex flex-col justify-between py-1">
                  <div className="w-full flex items-center justify-between">
                    <p>ویندوز 10</p>
                    <p>تعداد : 10</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <p>50000 تومان</p>
                  </div>
                </div>
              </div>
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
              <Divider />
              <InfoRow label="مبلغ قابل پرداخت" value={invoice.totalDue} />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ستون دوم */}
      <div className="space-y-6">
        {/* اطلاعات مشتری */}
        <Card className="shadow-md border border-gray-100">
       {/*    <BoxHeader
            title="اطلاعات مشتری"
            color="text-orange-700 bg-orange-700/10"
            textSize="text-[16px]"
            icon={<LuUserRound className="text-2xl" />}
          /> */}
          <CardBody>
            <div className="space-y-1 -mt-1">
              <InfoRow label="نام و نام خوانوادگی" value={customer.name} />
              <InfoRow label="شماره موبایل" value={customer.phone} isActiveBg />
              <InfoRow label="آدرس" value={customer.address} />
              <InfoRow
                label="توضیحات مشتری"
                value={customer.notes}
                isActiveBg
              />
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
              <InfoRow label="آماده‌سازی" value={orderInfo.readyIn} isActiveBg />
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
