"use client"

import { useState } from "react"
import { Tabs, Tab, Button } from "@heroui/react"
import OrderProcess from "./OrderProcess"
import StepContent from "./StepContent"
import { StepKey } from "./type"

const STEP_TITLES: Record<StepKey, string> = {
  "1": "درخواست شده",
  "2": "در انتظار پرداخت",
  "3": "در انتظار تایید",
  "4": "در حال آماده‌سازی",
  "5": "در حال ارسال",
  "6": "تحویل شده",
}

const OrderWizard = () => {
  const [step, setStep] = useState<StepKey>("1")

  const next = () => {
    const nextNum = Math.min(Number(step) + 1, 6)
    setStep(String(nextNum) as StepKey)
  }
  const prev = () => {
    const prevNum = Math.max(Number(step) - 1, 1)
    setStep(String(prevNum) as StepKey)
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <Tabs
        aria-label="Order Steps"
        selectedKey={step}
        onSelectionChange={() => { }}
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
        customer={{
          name: "علی رضایی",
          phone: "09121234567",
          address: "تهران، خیابان آزادی",
          notes: "تحویل بعد از ظهر انجام شود",
        }}
        order={{
          code: "ORD-12345",
          date: "۱۴۰۳/۰۴/۲۴",
          instruction: "لطفاً محصول سالم باشد",
          paymentMethod: "پرداخت در محل",
          amount: "۲٬۰۰۰٬۰۰۰ تومان",
          deliveryDate: "۱۴۰۳/۰۴/۳۰",
          readyIn: "۲ روز",
          promoCode: "OFF50",
        }}
        invoice={{
          code: "INV-982341",
          discount: "۵۰٬۰۰۰ تومان",
          packagingCost: "۱۵٬۰۰۰ تومان",
          shippingCost: "رایگان",
          tax: "۳۵٬۰۰۰ تومان",
          total: "۴۸۵٬۰۰۰ تومان",
          totalDue: "۴۳۵٬۰۰۰ تومان"
        }}
        shipping={{
          method: "پست پیشتاز",
          cost: "۲۰۰٬۰۰۰ تومان",
          time: "۲ الی ۳ روز کاری",
          weight: "۱٫۲ کیلوگرم",
        }}
        actionBox={<StepContent step={step} onNextStep={next} />}
      />

      {/* <div className="flex justify-between">
        <Button variant="flat" onPress={prev} isDisabled={step === "1"}>
          قبلی
        </Button>
        <Button variant="flat" onPress={next} isDisabled={step === "6"}>
          بعدی
        </Button>
        </div> */}
      <Button variant="flat" onPress={next} isDisabled={step === "6"}>
        بعدی
      </Button>
    </div>
  )
}

export default OrderWizard