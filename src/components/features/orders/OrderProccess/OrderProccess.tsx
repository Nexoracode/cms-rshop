"use client";
import { useState, useEffect } from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import InfoRow from "../../../shared/InfoRow";
import { OrderData } from "../order-types";
import StepContent from "./StepContent";

type OrderProcessProps = {
  order: OrderData | undefined;
  actionBox?: React.ReactNode;
};

const statusToStep = (status: string): string => {
  switch (status) {
    case "pending":
      return "1";
    case "paid":
    case "preparing": // وضعیت جدید تو داده‌ها
      return "3";
    case "shipped":
      return "5";
    case "delivered":
      return "6";
    case "cancelled":
    case "refunded":
    case "failed":
    default:
      return "1";
  }
};

const OrderProcess: React.FC<OrderProcessProps> = ({ order, actionBox }) => {
  if (!order) return null;

  const {
    id,
    status,
    subtotal,
    discount_total,
    total,
    coupon_code,
    created_at,
    user,
    address,
    payment,
    items,
  } = order;

  // تبدیل تاریخ به فرمت شمسی خوانا
  const persianDate = new Date(created_at).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // اطلاعات فاکتور
  const invoice = {
    total: `${Number(subtotal).toLocaleString("fa-IR")} تومان`,
    discount: `${Number(discount_total).toLocaleString("fa-IR")} تومان`,
    code: coupon_code ?? "ندارد",
    shippingCost: "رایگان",
    packagingCost: "۰ تومان",
    totalDue: `${Number(total).toLocaleString("fa-IR")} تومان`,
  };

  // مدیریت استپ‌ها
  const [step, setStep] = useState<string>(() => statusToStep(status));

  useEffect(() => {
    setStep(statusToStep(status));
  }, [status]);

  const next = () => setStep((prev) => String(Math.min(Number(prev) + 1, 6)));
  const prev = () => setStep((prev) => String(Math.max(Number(prev) - 1, 1)));

  const localActionBox = <StepContent step={step} onNextStep={next} />;
  const usedActionBox = actionBox ?? localActionBox;

  // وضعیت پرداخت
  const paymentMethod = payment
    ? payment.payment_method === "online"
      ? "پرداخت آنلاین (زرین‌پال)"
      : "کارت به کارت"
    : "پرداخت نشده";

  const paymentStatus =
    payment?.status === "success"
      ? "پرداخت موفق"
      : payment?.status === "failed"
      ? "پرداخت ناموفق"
      : "در انتظار پرداخت";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* ستون اول */}
      <div className="space-y-6">
        {/* استپ‌های سفارش */}
        <Card className="shadow-md border border-gray-100">
          <CardBody className="text-right">{usedActionBox}</CardBody>
        </Card>

        {/* محصولات و فاکتور */}
        <Card className="shadow-md border border-gray-100">
          <CardBody>
            <h3 className="text-lg mb-4 text-right">محصولات</h3>
            <div className="space-y-4 mb-6">
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-4 flex gap-4 border border-gray-200"
                >
                  <img
                    src={item.product?.image || "/placeholder.jpg"}
                    alt={item.product?.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-gray-800">
                        {item.product?.name}
                      </p>
                      <span className="text-sm text-gray-500 mr-auto">
                        تعداد: {item.quantity}
                      </span>
                    </div>

                    {/* واریانت‌ها */}
                    {item.variant?.attributes &&
                      item.variant.attributes.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-600">
                          {item.variant.attributes.map((attr: any) => (
                            <div
                              key={attr.name}
                              className="flex items-center gap-2"
                            >
                              <span>
                                {attr.name}: {attr.value}
                              </span>
                              {attr.display_color && (
                                <span
                                  className="w-4 h-4 rounded-full border-2 border-gray-300 inline-block"
                                  style={{
                                    backgroundColor: attr.display_color,
                                  }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                    <div className="flex justify-between mt-3 text-sm">
                      <span className="text-gray-600">
                        قیمت واحد:{" "}
                        {Number(item.unit_price).toLocaleString("fa-IR")} تومان
                      </span>
                      <span className="font-semibold">
                        {Number(item.line_total).toLocaleString("fa-IR")} تومان
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1">
              <InfoRow
                label="جمع کل محصولات"
                value={invoice.total}
                isActiveBg
              />
              <InfoRow label="تخفیف محصولات" value={invoice.discount}/>
              <InfoRow label="کد تخفیف" value={invoice.code} isActiveBg/>
              <InfoRow
                label="هزینه ارسال"
                value={invoice.shippingCost}
              />
              <InfoRow label="هزینه بسته‌بندی" value={invoice.packagingCost} isActiveBg/>
              <Divider className="!mt-4"/>
              <InfoRow label="مبلغ قابل پرداخت" value={invoice.totalDue} hoverable/>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ستون دوم */}
      <div className="space-y-6">
        {/* اطلاعات مشتری و گیرنده */}
        <Card className="shadow-md border border-gray-100">
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">اطلاعات گیرنده</h3>
            <div className="space-y-3">
              <InfoRow
                label="نام و نام خانوادگی"
                value={`${user.first_name} ${user.last_name}`}
                hoverable
              />
              <InfoRow
                label="شماره موبایل"
                value={user.phone}
                isActiveBg
                hoverable
              />
              <InfoRow
                label="ایمیل"
                value={user.email || "ثبت نشده"}
                hoverable
              />

              <InfoRow
                label="سفارش برای"
                value={
                  address.is_self
                    ? "خودم"
                    : `${address.recipient_name} (${
                        address.recipient_phone || "بدون شماره"
                      })`
                }
                isActiveBg
              />

              <InfoRow
                label="استان و شهر"
                value={`${address.province}، ${address.city}`}
                isActiveBg
              />
              <InfoRow label="کد پستی" value={address.postal_code} />

              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">آدرس کامل</span>
                  {address.is_primary && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      آدرس اصلی
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {address.address_line}
                  {address.plaque && `، پلاک ${address.plaque}`}
                  {address.unit && `، واحد ${address.unit}`}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* اطلاعات کلی سفارش */}
        <Card className="shadow-md border border-gray-100">
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">اطلاعات سفارش</h3>
            <div className="space-y-3">
              <InfoRow label="کد سفارش" value={`#${id}`} hoverable />
              <InfoRow
                label="تاریخ و ساعت ثبت"
                value={persianDate}
                isActiveBg
              />
              <InfoRow
                label="وضعیت سفارش"
                value={status === "preparing" ? "در حال آماده‌سازی" : status}
                isActiveBg
              />
              <InfoRow label="روش پرداخت" value={paymentMethod} />
              <InfoRow
                label="وضعیت پرداخت"
                value={paymentStatus}
                className={
                  payment?.status === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }
              />
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md border border-gray-100">
          <CardBody>
            <h3 className="text-lg mb-4 text-right">اطلاعات ارسال</h3>
            <div className="text-sm text-gray-500 text-center">
              <p>هنوز ارسال نشده است.</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default OrderProcess;
