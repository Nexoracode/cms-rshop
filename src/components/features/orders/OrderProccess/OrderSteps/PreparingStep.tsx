import { useState } from "react";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import SelectBox from "@/components/ui/inputs/SelectBox";
import FormActionButtons from "@/components/common/FormActionButtons";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";

const PreparingStep = ({ order }: { order: any }) => {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

  return (
    <div>
      <p className="text-default-600 leading-7 text-center mb-6">
        زمان آماده‌سازی سفارش به پایان رسیده. لطفاً در سریع‌ترین زمان سفارش
        را ارسال کنید.
      </p>

      <div className="mx-2 mb-6">
        <ToggleSection
          title="کد پیگیری مرسوله"
          subtitle="در صورت فعال‌سازی، اطلاعات ارسال را وارد کنید"
          initialMode={isTrackingEnabled}
          onChange={setIsTrackingEnabled}
        >
          <div className="!space-y-10">
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
        </ToggleSection>
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
