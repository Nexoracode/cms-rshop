import InfoRow from "@/components/shared/InfoRow";
import FormActionButtons from "@/components/common/FormActionButtons";

const RefundSection = ({
  refundableAmount,
  order,
}: {
  refundableAmount: string;
  order: any;
}) => {
  return (
    <>
      <div className="my-6 space-y-1.5">
        <InfoRow label="مبلغ قابل بازگشت" value={refundableAmount} hoverable />
        <InfoRow
          label="شماره همراه مشتری"
          value={order?.user?.phone || order?.user?.email || "—"}
          hoverable
          isActiveBg
        />
        <InfoRow
          label="شماره کارت مشتری"
          value={order?.user?.card_number || "—"}
          hoverable
        />
      </div>

      <FormActionButtons
        onSubmit={() => {}}
        isSubmitting={false}
        submitText="تأیید پرداخت وجه به مشتری"
      />
    </>
  );
};

export default RefundSection;
