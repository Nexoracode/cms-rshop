import FormActionButtons from "@/components/common/FormActionButtons";
import { useReviewCardToCardPayment } from "@/core/hooks/api/card/useCard";
import { useUpdateOrderStatus } from "@/core/hooks/api/orders/useOrder";
import RejectReceiptImageModal from "./RejectReceiptImageModal";
import Link from "next/link";

const ConfirmingPaymentStep = ({ order }: { order: any }) => {
  const reviewCardToCardPayment = useReviewCardToCardPayment();
  const updateOrderStatus = useUpdateOrderStatus();

  const rejectReceiptImage = (admin_note: string) => {
    reviewCardToCardPayment.mutate({
      paymentId: order.payment.id,
      status: "rejected",
      admin_note,
    });
  };

  const acceptReceiptImage = () => {
    updateOrderStatus.mutate({ id: order.id, status: "preparing" });
  };

  return (
    <>
      <div className="text-center">
        <p className="text-default-600 leading-7 mb-6">
          مشتری پرداخت کارت به کارت انجام داده و تصویر رسید را ارسال کرده است.
        </p>

        <Link
          href={order?.payment?.receipt_image || "/images/placeholder.png"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={order?.payment?.receipt_image || "/images/placeholder.png"}
            alt="رسید پرداخت"
            className="w-48 mx-auto mt-4 rounded-lg hover:scale-110 transition-all cursor-pointer duration-300 shadow-lg"
          />
        </Link>

        <div className="mt-8 flex items-center justify-center">
          <RejectReceiptImageModal
            onConfirm={(admin_note) => rejectReceiptImage(admin_note)}
          />
          <FormActionButtons
            onSubmit={acceptReceiptImage}
            isSubmitting={false}
            submitText="تأیید پرداخت"
          />
        </div>
      </div>
    </>
  );
};

export default ConfirmingPaymentStep;
