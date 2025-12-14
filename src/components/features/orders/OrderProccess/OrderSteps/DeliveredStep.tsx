const DeliveredStep = ({ order }: { order: any }) => {
  if (order?.status === "refunded") {
    return (
      <div className="text-center py-12 bg-orange-50 rounded-2xl border border-orange-200">
        <p className="font-semibold text-orange-700 mb-3">
          مبلغ سفارش به مشتری بازگشت داده شد
        </p>
        <p className="text-default-600">
          وجه به حساب یا کارت مشتری واریز گردید.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-12 bg-green-50 rounded-2xl border border-green-200">
      <p className="font-semibold text-green-700 mb-3">
        مرسوله با موفقیت به مشتری تحویل داده شد!
      </p>
      <p className="text-default-600">سفارش با موفقیت تکمیل شد.</p>
    </div>
  );
};

export default DeliveredStep;
