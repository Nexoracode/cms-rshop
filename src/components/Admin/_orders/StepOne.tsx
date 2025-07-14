"use client";

import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Divider,
} from "@heroui/react";
import { FiShoppingCart } from "react-icons/fi";
import InfoRow from "./helper/InfoRow";
import BoxHeader from "../_products/__create/helpers/BoxHeader";
import { LuUserRound } from "react-icons/lu";
import { TiInfoLargeOutline } from "react-icons/ti";
import { IoMdPaper } from "react-icons/io";
import { TbTruckLoading } from "react-icons/tb";

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
                    <BoxHeader
                        title={order.code}
                        color="text-blue-700 bg-blue-700/10"
                        textSize="text-[16px]"
                        icon={order.date}
                    />
                    {order.instruction && (
                        <CardBody className="text-right">
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
                    <BoxHeader
                        title="محصولات و فاکتور"
                        color="text-gray-100 bg-black"
                        textSize="text-[16px]"
                        icon={<IoMdPaper className="text-2xl" />}
                    />
                    <CardBody>
                        <div className="mb-4">
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
                        </div>
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
                    <BoxHeader
                        title="اطلاعات مشتری"
                        color="text-orange-700 bg-orange-700/10"
                        textSize="text-[16px]"
                        icon={<LuUserRound className="text-2xl" />}
                    />
                    <CardBody>
                        <div className="space-y-1 -mt-1">
                            <InfoRow
                                label="نام و نام خوانوادگی"
                                value={customer.name}
                            />
                            <InfoRow
                                label="شماره موبایل"
                                value={customer.phone}
                                isActiveBg
                            />
                            <InfoRow
                                label="آدرس"
                                value={customer.address}
                            />
                            <InfoRow
                                label="توضیحات مشتری"
                                value={customer.notes}
                                isActiveBg
                            />
                        </div>
                    </CardBody>
                </Card>

                {/* اطلاعات سفارش */}
                <Card className="shadow-md border border-gray-100">
                    <BoxHeader
                        title="اطلاعات سفارش"
                        color="text-orange-700 bg-orange-700/10"
                        textSize="text-[16px]"
                        icon={<TiInfoLargeOutline className="text-2xl" />}
                    />
                    <CardBody>
                        <div className="space-y-1">
                            <InfoRow label="کد سفارش" value={order.code} />
                            <InfoRow label="تاریخ ثبت" value={order.date} isActiveBg />
                            <InfoRow label="روش پرداخت" value={order.paymentMethod} />
                            <InfoRow label="مبلغ" value={order.amount} isActiveBg />
                            <InfoRow label="تاریخ تحویل" value={order.deliveryDate} />
                            <InfoRow label="آماده‌سازی" value={order.readyIn} isActiveBg />
                            <InfoRow label="کد تخفیف" value={order.promoCode} />
                        </div>
                    </CardBody>
                </Card>

                {/* اطلاعات ارسال */}
                <Card className="shadow-md border border-gray-100">
                    <BoxHeader
                        title="اطلاعات ارسال"
                        color="text-orange-700 bg-orange-700/10"
                        textSize="text-[16px]"
                        icon={<TbTruckLoading className="text-2xl" />}
                    />
                    <CardBody>
                        <div className="space-y-2">
                            <InfoRow label="روش ارسال" value={shipping.method} />
                            <InfoRow label="هزینه ارسال" value={shipping.cost} isActiveBg/>
                            <InfoRow label="زمان ارسال" value={shipping.time} />
                            <InfoRow label="وزن مرسوله" value={shipping.weight} isActiveBg/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

