import { Alert } from "@heroui/react";
import FormActionButtons from "@/components/common/FormActionButtons";

const ShippingStep = ({ order }: { order: any }) => {
  return (
    <div>
      {order?.status === "not_delivered" && (
        <Alert
          color="warning"
          title="مشکل در تحویل مرسوله"
          description="مشتری گزارش داده که سفارش به دستش نرسیده. لطفاً پیگیری کنید."
          className="mb-6"
        />
      )}

      <p className="text-default-600 leading-7 text-center">
        {order?.status === "not_delivered"
          ? "لطفاً وضعیت ارسال را بررسی و مشکل را برطرف کنید."
          : "در صورت اطمینان از تحویل مرسوله به مشتری، وضعیت را «تحویل شده» قرار دهید."}
      </p>

      <div className="mt-8 text-center">
        <FormActionButtons
          onSubmit={() => {}}
          isSubmitting={false}
          submitText="تأیید تحویل به مشتری"
        />
      </div>
    </div>
  );
};

export default ShippingStep;
