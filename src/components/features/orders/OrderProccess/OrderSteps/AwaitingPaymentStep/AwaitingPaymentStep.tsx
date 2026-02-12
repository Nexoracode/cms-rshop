"use client";

import { Alert, Spinner } from "@heroui/react";
import RefundSection from "./RefundSection";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import { useState } from "react";

const AwaitingPaymentStep = ({ order }: { order: any }) => {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

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
          className="mb-4"
        />

        <ToggleSection
          title="بازگشت وجه"
          subtitle="در صورت پرداخت مشتری، مبلغ را بازگردانید."
          initialMode={isTrackingEnabled}
          onChange={setIsTrackingEnabled}
        >
          <RefundSection order={order} />
        </ToggleSection>
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
        محصولات برای مشتری رزرو شده است.
      </p>

      <Spinner size="lg" className="my-4" />
    </div>
  );
};

export default AwaitingPaymentStep;
