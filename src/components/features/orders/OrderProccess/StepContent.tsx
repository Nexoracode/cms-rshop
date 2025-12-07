"use client";

import { Alert, Spinner, Switch } from "@heroui/react";
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

  // مبلغ سفارش رو یه جا محاسبه می‌کنیم (بعداً از order می‌گیریم)
  const refundableAmount = order?.total_price
    ? `${order.total_price.toLocaleString()} تومان`
    : "—";

  switch (step) {
    /* ==================================================================
       تب ۱ – درخواست شده
       ================================================================== */
    case "pending_approval":
      // مشتری خودش کنسل کرده
      if (order?.status === "cancelled") {
        return (
          <Alert
            color="danger"
            title="سفارش توسط مشتری لغو شده است"
            description="مشتری قبل از پرداخت، سفارش را کنسل کرد."
          />
        );
      }

      // حالت عادی: منتظر تأیید فروشنده
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-default-600 leading-7">
            سفارش ثبت شده و در انتظار تأیید اولیه شما است.
          </p>
          <FormActionButtons
            onCancel={() => {}}
            onSubmit={() => {}}
            isSubmitting={false}
            cancelText="عدم تأیید"
            submitText="تأیید سفارش"
          />
        </div>
      );

    /* ==================================================================
       تب ۲ – در انتظار پرداخت
       ================================================================== */
    case "awaiting_payment":
      // ۱. منقضی شده
      if (order?.status === "expired") {
        return (
          <div>
            <Alert
              color="warning"
              title="سفارش منقضی شده است"
              description="مهلت پرداخت مشتری به پایان رسیده و موجودی رزرو شده آزاد شد."
            />
            <RefundSection refundableAmount={refundableAmount} order={order} />
          </div>
        );
      }

      // ۲. توسط فروشنده رد شده
      if (order?.status === "rejected") {
        return (
          <div>
            <Alert
              color="danger"
              title="سفارش توسط شما رد شده است"
              description="شما سفارش را تأیید نکردید."
            />
            <RefundSection refundableAmount={refundableAmount} order={order} />
          </div>
        );
      }

      // ۳. پرداخت ناموفق
      if (order?.status === "payment_failed") {
        return (
          <Alert
            color="danger"
            title="پرداخت ناموفق بود"
            description="درگاه پرداخت خطا داد یا مشتری پرداخت را لغو کرد."
          />
        );
      }

      // ۴. حالت عادی: منتظر پرداخت مشتری
      return (
        <div className="flex flex-col items-center justify-center">
          <p className="text-default-600 leading-7 text-center px-4 animate-pulse">
            سفارش در انتظار پرداخت مشتری است.
            <br />
            محصولات تا ۴ ساعت برای مشتری رزرو می‌شود.
          </p>
          <Spinner
            color="secondary"
            labelColor="secondary"
            variant="spinner"
            size="lg"
            className="my-4"
          />
        </div>
      );

    /* ==================================================================
       تب ۳ – تأیید پرداخت (رسید کارت به کارت)
       ================================================================== */
    case "confirming_payment":
      return (
        <div className="text-center">
          <p className="text-default-600 leading-7 mb-6">
            مشتری پرداخت کارت به کارت انجام داده و تصویر رسید را ارسال کرده است.
          </p>
          <img
            src={order?.payment?.receipt_image || "/images/placeholder.png"}
            alt="رسید پرداخت"
            className="w-48 mx-auto mt-4 rounded-lg hover:scale-150 transition-all duration-300 shadow-lg"
          />
          <div className="mt-8">
            <FormActionButtons
              onCancel={() => {}}
              onSubmit={() => {}}
              isSubmitting={false}
              cancelText="عدم تأیید"
              submitText="تأیید پرداخت"
            />
          </div>
        </div>
      );

    /* ==================================================================
       تب ۴ – در حال آماده‌سازی
       ================================================================== */
    case "preparing":
      return (
        <div>
          <p className="text-default-600 leading-7 text-center mb-6">
            زمان آماده‌سازی سفارش به پایان رسیده. لطفاً در سریع‌ترین زمان سفارش
            را ارسال کنید.
          </p>

          <div className="rounded-xl border bg-gray-50/50 p-4 mx-2 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">
                کد پیگیری مرسوله
              </span>
              <Switch
                isSelected={isTrackingEnabled}
                onValueChange={setIsTrackingEnabled}
                size="sm"
              />
            </div>

            {isTrackingEnabled && (
              <div className="!space-y-10 mt-10">
                <SlugInput
                  label="کد رهگیری"
                  value=""
                  onChange={() => {}}
                  size="sm"
                />
                <SelectBox
                  label="نوع ارسال"
                  value=""
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
            submitText="تأیید و ارسال مرسوله"
          />
        </div>
      );

    /* ==================================================================
       تب ۵ – در حال ارسال
       ================================================================== */
    case "shipping":
      return (
        <div>
          {order?.status === "not_delivered" && (
            <Alert
              color="warning"
              title="مشکل در تحویل مرسوله"
              description="مشتری گزارش داده که سفارش به دستش نرسیده. لطفاً پیگیری کنید."
              className="mb-6"
            />
          )}

          <p className="text-default-600 leading-7 text-center">
            {order?.status === "not_delivered"
              ? "لطفاً وضعیت ارسال را بررسی و مشکل را برطرف کنید."
              : "در صورت اطمینان از تحویل مرسوله به مشتری، وضعیت را «تحویل شده» قرار دهید."}
          </p>

          <div className="mt-8 text-center">
            <FormActionButtons
              onSubmit={() => {}}
              isSubmitting={false}
              submitText="تأیید تحویل به مشتری"
            />
          </div>
        </div>
      );

    /* ==================================================================
       تب ۶ – تحویل شده / استرداد وجه
       ================================================================== */
    case "delivered":
      // استرداد وجه شده
      if (order?.status === "refunded") {
        return (
          <div className="text-center py-12 bg-orange-50 rounded-2xl border border-orange-200">
            <p className="font-semibold text-orange-700 mb-3">
              مبلغ سفارش به مشتری بازگشت داده شد
            </p>
            <p className="text-default-600">
              وجه به حساب یا کارت مشتری واریز گردید.
            </p>
          </div>
        );
      }

      // تحویل موفق
      return (
        <div className="text-center py-12 bg-green-50 rounded-2xl border border-green-200">
          <p className="font-semibold text-green-700 mb-3">
            مرسوله با موفقیت به مشتری تحویل داده شد!
          </p>
          <p className="text-default-600">سفارش با موفقیت تکمیل شد.</p>
        </div>
      );

    default:
      return null;
  }
};

/* ==================================================================
   کامپوننت کوچک برای بخش استرداد وجه (تکرار نشه)
   ================================================================== */
const RefundSection = ({
  refundableAmount,
  order,
}: {
  refundableAmount: string;
  order: any;
}) => (
  <>
    <div className="my-6 space-y-1.5">
      <InfoRow label="مبلغ قابل بازگشت" value={refundableAmount} hoverable />
      <InfoRow
        label="شماره همراه مشتری"
        value={order?.user?.phone || order?.user?.email || "—"}
        hoverable
        isActiveBg
      />
      <InfoRow
        label="شماره کارت مشتری"
        value={order?.user?.card_number || "—"}
        hoverable
      />
    </div>

    <FormActionButtons
      onSubmit={() => {}}
      isSubmitting={false}
      submitText="تأیید پرداخت وجه به مشتری"
    />
  </>
);

export default StepContent;
