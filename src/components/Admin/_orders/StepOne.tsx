"use client";

import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Divider,
} from "@heroui/react";
import { FiShoppingCart } from "react-icons/fi";

type CustomerInfo = {
    name: string;
    phone: string;
    address: string;
    notes: string;
};

type OrderInfo = {
    code: string;
    date: string;
    instruction?: string;
    paymentMethod: string;
    amount: string;
    deliveryDate: string;
    readyIn: string;
    promoCode: string;
};

type InvoiceItem = {
    label: string;
    value: string;
};

type ShippingInfo = {
    method: string;
    cost: string;
    time: string;
    weight: string;
};

type StepOneProps = {
    customer: CustomerInfo;
    order: OrderInfo;
    invoice: InvoiceItem[];
    shipping: ShippingInfo;
    onReview: () => void;
};

export function StepOne({
    customer,
    order,
    invoice,
    shipping,
    onReview,
}: StepOneProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* ستون اول */}
            <div className="space-y-6">
                {/* باکس کد سفارش */}
                <Card className="shadow-md border border-gray-100">
                    <CardHeader className="flex sm:justify-between bg-blue-100 sm:items-center gap-2">
                        <p className="font-bold text-blue-500">{order.code}</p>
                        <p className="">{order.date}</p>
                    </CardHeader>
                    {order.instruction && (
                        <CardBody className="text-right mt-3">
                            <p className="text-default-600">
                                پس از تایید درخواست سفارش ، مشتری میتواند مبلغ سفارش را به صورت کارت به کارت پرداخت کند.
                            </p>
                            <div className="w-full flex items-center gap-2">
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onReview}
                                    size="sm"
                                    className="mt-4 w-full"
                                >
                                    عدم تایید
                                </Button>
                                <Button
                                    color="primary"
                                    startContent={<FiShoppingCart />}
                                    onPress={onReview}
                                    size="sm"
                                    className="mt-4 w-full"
                                >
                                    تایید درخواست
                                </Button>
                            </div>
                        </CardBody>
                    )}
                </Card>

                {/* باکس فاکتور */}
                <Card className="shadow-md border border-gray-100">
                    <CardHeader className="flex bg-blue-100 flex-col gap-2 justify-start items-start">
                        <p className="font-bold text-blue-500">محصولات و فاکتور</p>
                        <div className="bg-white shadow p-2 rounded-xl w-full flex gap-2">
                            <img src="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg" alt="product" className="rounded-xl w-16" />
                            <div className="w-full flex flex-col justify-between py-1">
                                <div className="w-full flex items-center justify-between">
                                    <p>ویندوز 10</p>
                                    <p>تعداد : 10</p>
                                </div>
                                <div className="w-full flex items-center justify-between">
                                    <p>50000 تومان</p>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-1">
                            {invoice.map((item, idx) => (
                                <div key={idx} className={`flex justify-between rounded-md p-2 ${idx % 2 !== 0 ? "bg-slate-100" : ""}`}>
                                    <span className="text-default-600">{item.label}</span>
                                    <span className="font-medium">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* ستون دوم */}
            <div className="space-y-6">
                {/* اطلاعات مشتری */}
                <Card className="shadow-md border border-gray-100">
                    <CardHeader>
                        <p className="font-bold">اطلاعات مشتری</p>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-2">
                            <InfoRow label="نام" value={customer.name} />
                            <InfoRow label="شماره موبایل" value={customer.phone} />
                            <InfoRow label="آدرس" value={customer.address} />
                            <InfoRow label="توضیحات مشتری" value={customer.notes} />
                        </div>
                    </CardBody>
                </Card>

                {/* اطلاعات سفارش */}
                <Card className="shadow-md border border-gray-100">
                    <CardHeader>
                        <p className="font-bold">اطلاعات سفارش</p>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-2">
                            <InfoRow label="کد سفارش" value={order.code} />
                            <InfoRow label="تاریخ ثبت" value={order.date} />
                            <InfoRow label="روش پرداخت" value={order.paymentMethod} />
                            <InfoRow label="مبلغ" value={order.amount} />
                            <InfoRow label="تاریخ تحویل" value={order.deliveryDate} />
                            <InfoRow label="آماده‌سازی" value={order.readyIn} />
                            <InfoRow label="کد تخفیف" value={order.promoCode} />
                        </div>
                    </CardBody>
                </Card>

                {/* اطلاعات ارسال */}
                <Card className="shadow-md border border-gray-100">
                    <CardHeader>
                        <p className="font-bold">اطلاعات ارسال</p>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-2">
                            <InfoRow label="روش ارسال" value={shipping.method} />
                            <InfoRow label="هزینه ارسال" value={shipping.cost} />
                            <InfoRow label="زمان ارسال" value={shipping.time} />
                            <InfoRow label="وزن مرسوله" value={shipping.weight} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between text-sm border-b border-default-100 pb-1">
            <span className="text-default-400">{label}</span>
            <span className="font-medium text-right">{value}</span>
        </div>
    );
}
