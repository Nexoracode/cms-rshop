import FormActionButtons from "@/components/common/FormActionButtons";

const ConfirmingPaymentStep = ({ order }: { order: any }) => {
  return (
    <div className="text-center">
      <p className="text-default-600 leading-7 mb-6">
        مشتری پرداخت کارت به کارت انجام داده و تصویر رسید را ارسال کرده است.
      </p>

      <img
        src={order?.payment?.receipt_image || "/images/placeholder.png"}
        alt="رسید پرداخت"
        className="w-48 mx-auto mt-4 rounded-lg hover:scale-150 transition-all duration-300 shadow-lg"
      />

      <div className="mt-8">
        <FormActionButtons
          onCancel={() => {}}
          onSubmit={() => {}}
          isSubmitting={false}
          cancelText="عدم تأیید"
          submitText="تأیید پرداخت"
        />
      </div>
    </div>
  );
};

export default ConfirmingPaymentStep;
