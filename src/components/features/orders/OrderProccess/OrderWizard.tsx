"use client";

import { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "@heroui/react";
import OrderProcess from "./OrderProccess";
import StepContent from "./StepContent";
import { OrderData } from "../order-types";
import { getCurrentStep, STEP_TITLES, type OrderStepKey } from "./orderSteps";

type Props = {
  order?: OrderData;
};

const OrderWizard: React.FC<Props> = ({ order }) => {
  const [step, setStep] = useState<OrderStepKey>("pending_approval");

  // اولین بار و هر بار که وضعیت سفارش تغییر کرد
  useEffect(() => {
    if (order?.status) {
      setStep(getCurrentStep(order.status));
    }
  }, [order?.status]);

  // ترتیب دقیق استپ‌ها (مهم برای دکمه‌های بعدی/قبلی)
  const stepOrder: OrderStepKey[] = [
    "pending_approval",
    "awaiting_payment",
    "confirming_payment",
    "preparing",
    "shipping",
    "delivered",
  ];

  const currentIndex = stepOrder.indexOf(step);

  const next = () => {
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const goToStep = (key: OrderStepKey) => {
    setStep(key);
  };

  if (!order) {
    return;
  }

  return (
    <div className="space-y-6">
      {/* تب‌های مراحل سفارش */}
      <Tabs
        selectedKey={step}
        onSelectionChange={(k) => goToStep(k as OrderStepKey)}
        aria-label="مراحل سفارش"
        classNames={{
          tabList: "w-full justify-between bg-gray-50 p-1 rounded-xl",
          cursor: "bg-white shadow-md",
          tab: "flex-1 py-3 font-medium",
        }}
      >
        {stepOrder.map((key) => (
          <Tab
            key={key}
            title={STEP_TITLES[key]}
            // فقط استپ فعلی فعال باشه، بقیه غیرفعال (برای زیبایی)
            isDisabled={key !== step}
          />
        ))}
      </Tabs>

      {/* محتوای اصلی + باکس اکشن سمت چپ */}
      <OrderProcess
        order={order}
        actionBox={<StepContent step={step} onNextStep={next} />}
      />

      {/* دکمه‌های قبلی و بعدی */}
      <div className="flex justify-between items-center">
        <Button
          variant="flat"
          color="default"
          onPress={prev}
          isDisabled={currentIndex === 0}
        >
          قبلی
        </Button>

        <div className="text-sm text-gray-500">
          مرحله {currentIndex + 1} از {stepOrder.length}
        </div>

        <Button
          variant="flat"
          color="primary"
          onPress={next}
          isDisabled={currentIndex === stepOrder.length - 1}
        >
          بعدی
        </Button>
      </div>
    </div>
  );
};

export default OrderWizard;
