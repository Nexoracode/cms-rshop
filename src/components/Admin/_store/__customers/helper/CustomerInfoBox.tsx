"use client"

import { FaUser, FaPhone, FaCalendarAlt, FaShoppingBag } from "react-icons/fa";
import { Button, Card, CardBody } from "@heroui/react";
import React from "react";

type Props = {
    firstName: string;
    lastName: string;
    phone: string;
    membership: string; // حالا به‌صورت تاریخ
    lastPurchase: string;
    onShowDetail: () => void;
};

const CustomerInfoBox: React.FC<Props> = ({
    firstName,
    lastName,
    phone,
    membership,
    lastPurchase,
    onShowDetail,
}) => {
    return (
        <Card className="w-full p-2 rounded-xl shadow-md bg-slate-50">
            <CardBody className="space-y-2 text-sm text-gray-700">
                <div className="flex gap-4 justify-between items-center">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <FaUser className="text-gray-500" />
                            <span>{firstName} {lastName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaPhone className="text-gray-500" />
                            <span>{phone}</span>
                        </div>
                    </div>
                    <Button
                        onPress={onShowDetail}
                        className="text-sm"
                        variant="flat"
                        color="primary"
                    >
                        مشاهده جزئیات
                    </Button>
                </div>
                <div className="flex items-center bg-slate-100 rounded-xl p-2 py-3 !mt-4 justify-between">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-500" />
                        <span>عضویت از: {membership}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaShoppingBag className="text-gray-500" />
                        <span>آخرین خرید: {lastPurchase}</span>
                    </div>
                </div>

            </CardBody>
        </Card>
    );
};

export default CustomerInfoBox;
