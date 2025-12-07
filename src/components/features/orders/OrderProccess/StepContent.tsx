"use client";

import { Alert, Switch } from "@heroui/react";
import { useState } from "react";
import { OrderStepKey } from "./orderSteps";
import FormActionButtons from "@/components/common/FormActionButtons";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import SelectBox from "@/components/ui/inputs/SelectBox";
import InfoRow from "@/components/shared/InfoRow";

type Props = {
  step: OrderStepKey;
  onNextStep: () => void;
  order?: any;
};

const StepContent = ({ step, onNextStep, order }: Props) => {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

  switch (step) {
    case "pending_approval":
      return (
        <>
          <p className="text-default-600 leading-7 text-center">
            سفارش ثبت شده و در انتظار تأیید اولیه شما است.
          </p>
          <div className="mt-5">
            <FormActionButtons
              onCancel={() => {}}
              onSubmit={() => {}}
              isSubmitting={false}
              cancelText="عدم تایید"
              submitText="تایید سفارش"
            />
          </div>
        </>
      );

    case "awaiting_payment":
      return order?.status === "expired" || order?.status === "rejected" ? (
        <div>
          {
            order?.status === "expired"
            ?
            <Alert
              color={"warning"}
              title={
                "متاسفانه مهلت بررسی سفارش به پایان رسیده و سفارش منقضی شده است."
              }
            />
            :
            <Alert
              color={"warning"}
              title={
                "سفارش مشتری بدلیل عدم تایید شما رد شده است."
              }
            />
          }
          <div className="my-4 space-y-1.5">
            <InfoRow label="مبلغ قابل برگشت" value={`385000 تومان`} hoverable />
            <InfoRow
              label="شماره همراه مشتری"
              value={order.user?.phone || order.user?.email}
              hoverable
              isActiveBg
            />
            <InfoRow label="شماره کارت مشتری" value={`-`} hoverable />
          </div>
          <FormActionButtons
            onSubmit={() => {}}
            isSubmitting={false}
            submitText="پرداخت شد"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center cursor-default">
          <p className="text-default-600 leading-7 p-2 animate-pulse">
            سفارش در انتظار پرداخت مشتری است. محصولات آن تا 4 ساعت برای مشتری
            رزرو می شود.
          </p>
          <LoadingApiCall />
        </div>
      );

    case "confirming_payment":
      return (
        <>
          <div className="flex flex-col items-center justify-center">
            <p className="text-default-600 leading-7 p-2">
              سفارش کارت به کارت توسط مشتری پرداخت شده و تصویر رسید ارسال شده
              است.
            </p>
            <img
              src={order?.payment?.receipt_image || "/images/placeholder.png"}
              alt="factor"
              className="w-36 mt-4 rounded-lg hover:scale-150 transition-all z-10 mb-6"
            />
          </div>
          <FormActionButtons
            onCancel={() => {}}
            onSubmit={() => {}}
            isSubmitting={false}
            cancelText="عدم تایید"
            submitText="تایید"
          />
        </>
      );

    case "preparing":
      return (
        <>
          <p className="text-default-600 leading-7 p-2">
            زمان آماده سازی سفارش به پایان رسیده. لطفا در سریع ترین زمان، سفارش
            را برای مشتری را ارسال کنید.
          </p>

          <div className="rounded-xl p-2 border mx-2 mb-6 mt-2">
            <div className="flex items-center justify-between">
              <p className="text-gray-700">کد پیگیری مرسوله</p>
              <Switch
                isSelected={isTrackingEnabled}
                onValueChange={setIsTrackingEnabled}
                size="sm"
              />
            </div>

            {isTrackingEnabled && (
              <div className="space-y-10 mt-12 px-2 pb-2">
                <SlugInput
                  label="کد رهگیری"
                  value={""}
                  onChange={() => {}}
                  size="sm"
                />
                <SelectBox
                  label="نوع ارسال"
                  value={""}
                  onChange={() => {}}
                  options={[
                    { key: "post", title: "پست" },
                    { key: "tipax", title: "تیپاکس" },
                  ]}
                  placeholder="انتخاب کنید"
                  isRequired
                  size="sm"
                />
              </div>
            )}
          </div>
          <FormActionButtons
            onSubmit={() => {}}
            isSubmitting={false}
            submitText="تایید و ارسال"
          />
        </>
      );

    case "shipping":
      return (
        <>
          {order?.status === "not_delivered" ? (
            <div className="mb-4">
              <Alert
                color={"warning"}
                title={
                  "طبق گزارش مشتری ، سفارش به او تحویل داده نشده است. لطفا مشکل پیش آمده در ارسال را پیگیری کنید."
                }
              />
            </div>
          ) : (
            <p className="text-default-600 leading-7 mb-4 p-2">
              لطفا در صورت اطمینان از تحویل مرسوله به مشتری، وضعیت سفارش را
              "تحویل شده" تعیین کنید.
            </p>
          )}
          <FormActionButtons
            onSubmit={() => {}}
            isSubmitting={false}
            submitText="تحویل شده"
          />
        </>
      );

    case "delivered":
      return (
        <div className="text-center py-10 bg-green-50 rounded-xl">
          <p className="text-[17px] text-green-600">
            مرسوله با موفقیت به مشتری تحویل داده شد!
          </p>
          <p className="text-default-600 mt-4">سفارش با موفقیت تکمیل شد.</p>
        </div>
      );

    default:
      return null;
  }
};

export default StepContent;
