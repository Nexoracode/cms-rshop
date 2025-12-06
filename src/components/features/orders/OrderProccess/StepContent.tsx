"use client";

import { Input, Select, SelectItem, Switch } from "@heroui/react";
import { useState } from "react";
import DoubleClickBtn from "@/components/ui/buttons/DoubleClickBtn";
import { OrderStepKey } from "./orderSteps";
import { FaTruckLoading } from "react-icons/fa";

type Props = {
  step: OrderStepKey;
  onNextStep: () => void;
  order?: any; // اگر نیاز داشتی وضعیت دقیق رو ببینی
};

const StepContent = ({ step, onNextStep }: Props) => {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

  switch (step) {
    case "pending_approval":
      return (
        <>
          <p className="text-default-600 leading-7">
            سفارش ثبت شده و در انتظار تأیید اولیه شما است.
          </p>
          <div className="flex gap-3 mt-5">
            <DoubleClickBtn
              onPress={() => console.log("رد سفارش")}
              textBtn="رد سفارش"
              color="danger"
              className="flex-1"
              isActiveDoubleClick
            />
            <DoubleClickBtn
              onPress={onNextStep}
              textBtn="تایید درخواست"
              startContent={<FaTruckLoading className="text-lg" />}
              color="success"
              className="flex-1"
              isActiveDoubleClick
            />
          </div>
        </>
      );

    case "awaiting_payment":
      return (
        <p className="text-default-600 leading-7">
          سفارش تأیید شده و مشتری باید مبلغ را پرداخت کند (آنلاین یا کارت به کارت). محصولات تا ۴ ساعت رزرو هستند.
        </p>
      );

    case "confirming_payment":
      return (
        <>
          <p className="text-default-600 leading-7 mb-4">
            مشتری رسید کارت به کارت را آپلود کرده است. لطفاً رسید را بررسی و تأیید کنید.
          </p>
          <div className="flex gap-3">
            <DoubleClickBtn
              onPress={() => console.log("رد رسید")}
              textBtn="رد رسید"
              color="danger"
              className="flex-1"
              isActiveDoubleClick
            />
            <DoubleClickBtn
              onPress={onNextStep}
              textBtn="تایید پرداخت"
              color="success"
              className="flex-1"
              isActiveDoubleClick
            />
          </div>
        </>
      );

    case "preparing":
      return (
        <>
          <p className="text-default-600 leading-7 mb-4">
            پرداخت تأیید شده. لطفاً محصولات را آماده و ارسال کنید.
          </p>

          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-medium">وارد کردن کد رهگیری</p>
              <Switch
                isSelected={isTrackingEnabled}
                onValueChange={setIsTrackingEnabled}
                size="sm"
              />
            </div>
            <p className="text-sm text-gray-600 mb-3">
              در صورت استفاده از پست یا تیپاکس، کد رهگیری را وارد کنید تا برای مشتری نمایش داده شود.
            </p>

            {isTrackingEnabled && (
              <div className="space-y-4 mt-4">
                <Input label="کد رهگیری" placeholder="مثلاً: 12345678901234567890" />
                <Select label="نوع ارسال" labelPlacement="outside" placeholder="انتخاب کنید">
                  <SelectItem key="post">پست پیشتاز / سفارشی</SelectItem>
                  <SelectItem key="tipax">تیپاکس</SelectItem>
                  <SelectItem key="other">سایر</SelectItem>
                </Select>
              </div>
            )}
          </div>

          <DoubleClickBtn
            onPress={onNextStep}
            textBtn="ثبت و ارسال سفارش"
            color="success"
            className="mt-5 w-full"
            isActiveDoubleClick
          />
        </>
      );

    case "shipping":
      return (
        <>
          <p className="text-default-600 leading-7">
            مرسوله ارسال شده است. در صورت تحویل به مشتری، وضعیت را به "تحویل شده" تغییر دهید.
          </p>
          <DoubleClickBtn
            onPress={onNextStep}
            textBtn="تأیید تحویل به مشتری"
            color="secondary"
            variant="solid"
            className="mt-5 w-full"
            isActiveDoubleClick
          />
        </>
      );

    case "delivered":
      return (
        <div className="text-center py-8">
          <p className="text-lg font-semibold text-green-600">مرسوله با موفقیت به مشتری تحویل داده شد!</p>
          <p className="text-default-600 mt-2">سفارش با موفقیت تکمیل شد.</p>
        </div>
      );

    default:
      return null;
  }
};

export default StepContent;