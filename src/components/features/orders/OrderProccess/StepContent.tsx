"use client";

import { Input, Select, SelectItem, Switch } from "@heroui/react";
import { useState } from "react";
import DoubleClickBtn from "@/components/ui/buttons/DoubleClickBtn";
import { OrderStepKey } from "./orderSteps";
import FormActionButtons from "@/components/common/FormActionButtons";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import OptionButton from "@/components/ui/buttons/OptionButton";
import { FiCheckCircle } from "react-icons/fi";
import TextInput from "@/components/ui/inputs/TextInput";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import SelectBox from "@/components/ui/inputs/SelectBox";

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
      return (
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
          <p className="text-default-600 leading-7 mb-4 p-2">
            لطفا در صورت اطمینان از تحویل مرسوله به مشتری، وضعیت سفارش را "تحویل
            شده" تعیین کنید.
          </p>
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
