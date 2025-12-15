"use client";

import { Alert, Spinner } from "@heroui/react";
import RefundSection from "./RefundSection";

const AwaitingPaymentStep = ({ order }: { order: any }) => {
  if (order?.status === "expired") {
    return (
      <Alert
        color="warning"
        title="سفارش منقضی شده است"
        description="مهلت پرداخت مشتری به پایان رسیده و موجودی رزرو شده آزاد شد."
      />
    );
  }

  if (order?.status === "rejected") {
    return (
      <>
        <Alert
          color="danger"
          title="سفارش توسط شما رد شده است"
          description="شما رسید پرداخت را تأیید نکردید."
        />
        <RefundSection order={order} />
      </>
    );
  }

  if (order?.status === "payment_failed") {
    return (
      <Alert
        color="danger"
        title="پرداخت ناموفق بود"
        description="درگاه پرداخت خطا داد یا مشتری پرداخت را لغو کرد."
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-default-600 leading-7 text-center px-4 animate-pulse">
        سفارش در انتظار پرداخت مشتری است.
        <br />
        محصولات تا ۴ ساعت برای مشتری رزرو می‌شود.
      </p>

      <Spinner size="lg" className="my-4" />
    </div>
  );
};

export default AwaitingPaymentStep;
