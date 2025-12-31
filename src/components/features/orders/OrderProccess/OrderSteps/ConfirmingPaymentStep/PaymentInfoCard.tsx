import InfoRow from "@/components/shared/InfoRow";
import FormActionButtons from "@/components/common/FormActionButtons";
import { price } from "@/core/utils/helper";
import { useUpdateOrderStatus } from "@/core/hooks/api/orders/useOrder";

const PaymentInfoCard = ({ order }: { order: any }) => {
  const updateOrderStatus = useUpdateOrderStatus();

  const submitHandler = () => {
    updateOrderStatus.mutate({ id: order.id, status: "preparing" });
  };

  const unSubmitHandler = () => {
    updateOrderStatus.mutate({ id: order.id, status: "rejected" });
  };

  return (
    <>
      <div className="my-6 space-y-1.5">
        <InfoRow label="مبلغ پرداختی" value={price(order?.payment?.amount)} hoverable />
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
        onSubmit={submitHandler}
        onCancel={unSubmitHandler}
        isSubmitting={false}
        submitText="تأیید پرداخت وجه"
        cancelText="عدم تایید"
      />
    </>
  );
};

export default PaymentInfoCard;
