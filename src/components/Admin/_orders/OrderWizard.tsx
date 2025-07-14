"use client"

import { useState } from "react"
import { Tabs, Tab, Card, CardBody, Button } from "@heroui/react"

type StepKey = "1" | "2" | "3" | "4" | "5" | "6"

const STEP_TITLES: Record<StepKey, string> = {
  "1": "درخواست شده",
  "2": "در انتظار پرداخت",
  "3": "در انتظار تایید",
  "4": "در حال آماده‌سازی",
  "5": "در حال ارسال",
  "6": "تحویل شده",
}

export default function OrderWizard() {
  const [step, setStep] = useState<StepKey>("1")

  // فانکشن نمونه برای جابجایی بین مراحل
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

      {/* Content */}
      <Card className="shadow-md">
        <CardBody className="py-6 text-right">
          <StepContent step={step} />
        </CardBody>
      </Card>

      {/* کنترل‌های نمونه */}
      <div className="flex justify-between">
        <Button variant="flat" onPress={prev} isDisabled={step === "1"}>
          قبلی
        </Button>
        <Button variant="flat" onPress={next} isDisabled={step === "6"}>
          بعدی
        </Button>
      </div>
    </div>
  )
}

function StepContent({ step }: { step: StepKey }) {
  switch (step) {
    case "1":
      return <p>مرحله ۱: درخواست ثبت شد.</p>
    case "2":
      return <p>مرحله ۲: لطفاً پرداخت را انجام دهید.</p>
    case "3":
      return <p>مرحله ۳: در انتظار تأیید سفارش.</p>
    case "4":
      return <p>مرحله ۴: سفارش در حال آماده‌سازی است.</p>
    case "5":
      return <p>مرحله ۵: سفارش در حال ارسال است.</p>
    case "6":
      return <p>مرحله ۶: سفارش تحویل شده.</p>
    default:
      return null
  }
}
