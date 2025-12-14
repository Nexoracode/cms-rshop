import { Switch } from "@heroui/react";
import { useState } from "react";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import SelectBox from "@/components/ui/inputs/SelectBox";
import FormActionButtons from "@/components/common/FormActionButtons";

const PreparingStep = ({ order }: { order: any }) => {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

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
};

export default PreparingStep;
