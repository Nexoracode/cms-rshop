"use client";

import { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "@heroui/react";
import OrderProcess from "./OrderProccess";
import StepContent from "./StepContent";
import { StepKey } from "./type";
import { OrderData } from "../order-types";

const STEP_TITLES: Record<StepKey, string> = {
  "1": "درخواست شده",
  "2": "در انتظار پرداخت",
  "3": "در انتظار تایید",
  "4": "در حال آماده‌سازی",
  "5": "در حال ارسال",
  "6": "تحویل شده",
};

type Props = {
  order?: OrderData;
};

const statusToStep = (status: any /* OrderData["status"] | undefined */): StepKey => {
  switch (status) {
    case "pending":
      return "1";
    case "paid":
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

const OrderWizard: React.FC<Props> = ({ order }) => {
  const initial = statusToStep(order?.status);
  const [step, setStep] = useState<StepKey>(initial);

  useEffect(() => {
    setStep(statusToStep(order?.status));
  }, [order?.status]);

  const next = () => {
    const nextNum = Math.min(Number(step) + 1, 6);
    setStep(String(nextNum) as StepKey);
  };
  const prev = () => {
    const prevNum = Math.max(Number(step) - 1, 1);
    setStep(String(prevNum) as StepKey);
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <Tabs
        aria-label="Order Steps"
        selectedKey={step}
        onSelectionChange={(k) => setStep(k as StepKey)}
        className="tabs-site w-full"
      >
        {(Object.keys(STEP_TITLES) as StepKey[]).map((key) => (
          <Tab
            key={key}
            title={STEP_TITLES[key]}
            isDisabled={key !== step}
            className="flex-1 text-center"
          />
        ))}
      </Tabs>

      <OrderProcess
        order={order}
        actionBox={<StepContent step={step} onNextStep={next} />}
      />

      <div className="flex justify-between">
        <Button variant="flat" onPress={prev} isDisabled={step === "1"}>
          قبلی
        </Button>
        <Button variant="flat" onPress={next} isDisabled={step === "6"}>
          بعدی
        </Button>
      </div>
    </div>
  );
};

export default OrderWizard;
