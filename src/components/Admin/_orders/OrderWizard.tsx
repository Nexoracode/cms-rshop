"use client"

import { useState } from "react"
import { Tabs, Tab, Button, Switch, Select, SelectItem, Input } from "@heroui/react"
import OrderProcess from "./OrderProcess"
import { TbTruckLoading } from "react-icons/tb"

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
        actionBox={<StepContent step={step} />}
      />

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

  const [isSelected, setIsSelected] = useState(true);

  switch (step) {
    case "1":
      return (
        <>
          <p className="text-default-600 leading-7">
            پس از تایید درخواست سفارش ، مشتری میتواند مبلغ سفارش را به صورت کارت به کارت پرداخت کند.
          </p>
          <div className="w-full flex items-center gap-2">
            <Button
              color="danger"
              variant="flat"
              onPress={() => { }}
              size="sm"
              className="mt-4 w-full"
            >
              عدم تایید
            </Button>
            <Button
              color="primary"
              startContent={<TbTruckLoading className="text-lg" />}
              onPress={() => { }}
              size="sm"
              className="mt-4 w-full"
            >
              تایید درخواست
            </Button>
          </div>
        </>
      )
    case "2":
      return (
        <p className="text-default-600 leading-7">
          سفارش در انتظار پرداخت مشتری است. محصولات آن تا 4 ساعت برای مشتری رزرو می شود.
        </p>
      )
    case "3":
      return (
        <>
          <p className="text-default-600 leading-7">
            سفارش کارت به کارت توسط مشتری پرداخت شده و تصویر رسید ارسال شده است.
          </p>
          <div className="w-full flex items-center gap-2">
            <Button
              color="danger"
              variant="flat"
              onPress={() => { }}
              size="sm"
              className="mt-4 w-full"
            >
              عدم تایید
            </Button>
            <Button
              color="primary"
              onPress={() => { }}
              size="sm"
              className="mt-4 w-full"
            >
              تایید
            </Button>
          </div>
        </>
      )
    case "4":
      return (
        <>
          <p className="text-default-600 mb-4 leading-7">
            لطفا پس از آماده سازی محصولات، سفارش را ارسال کنید.
          </p>

          <div className="bg-slate-50 rounded-2xl p-3">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p>کد پیگیری مرسوله</p>
                <Switch isSelected={isSelected} size="sm" onValueChange={setIsSelected} />
              </div>
              <p className="text-gray-600 mb-2 text-[13px] leading-7">اگر از خدمات پست ویا تیپاکس جهت ارسال مرسوله استفاده می‌کنید، میتوانید کد پیگیری مرسوله را در این بخش وارد کنید تا برای مشتری ارسال شود.</p>
            </div>
            {
              isSelected
                ?
                <div className="flex flex-col gap-4 mt-4">
                  <Input labelPlacement="outside" label="کد رهگیری" placeholder="کد را وارد کنید" />
                  <Select
                    dir="rtl"
                    label={"نوع فرستنده"}
                    labelPlacement={"outside"}
                    placeholder="نوع فرستنده را انتخاب کنید"
                  //selectedKeys={selectedCategoryType}
                  //onSelectionChange={setSelectedCategoryType}
                  >
                    <SelectItem key="all">پست</SelectItem>
                    <SelectItem key="selected">تیپاکس</SelectItem>
                  </Select>
                </div>
                :
                ""
            }
          </div>

          <div className="w-full flex items-center gap-2">
            <Button
              color="primary"
              onPress={() => { }}
              size="sm"
              className="mt-4 w-full"
            >
              تایید
            </Button>
          </div>
        </>
      )
    case "5":
      return (
        <>
          <p className="text-default-600 leading-7">
            لطفا در صورت اطمینان از تحویل مرسوله به مشتری، وضعیت سفارش را "تحویل شده" تعیین کنید.
          </p>
          <div className="w-full flex items-center gap-2">
            <Button
              color="secondary"
              onPress={() => { }}
              size="sm"
              className="mt-4 w-full"
            >
              تحویل شده
            </Button>
          </div>
        </>
      )
    case "6":
      return <p>مرسوله به مشتری تحویل داده شده است.</p>
    default:
      return null
  }
}
