"use client"

import { Card, CardBody, Input } from "@heroui/react";
import BoxHeader from "../../_products/__create/helpers/BoxHeader";
import { LuTextCursorInput, LuUserSearch } from "react-icons/lu";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import OrderBox from "../../_orders/OrderBox";
import { LuUser } from "react-icons/lu";
import BoxInfo from "./helper/BoxInfo";
import { TiPhoneOutline } from "react-icons/ti";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import CustomerBoxDetail from "./helper/CustomerBoxDetail";

type Props = {
    firstName: string;
    lastName: string;
    phone: string;
    birthday?: string;
    membership: string;
    lastPurchase: string;
};

const CustomerInfo: React.FC<Props> = ({ firstName, lastName, phone, birthday = "نامشخص", membership, lastPurchase }) => {

    return (
        <div className="flex flex-col gap-4">

            <CustomerBoxDetail
                firstName="محمد"
                lastName="کریمی"
                phone="09121234567"
                membership="1403/04/18"
                lastPurchase="1403/04/18"
                onShowDetail={() => { }}
                cardHeader={
                    <BoxHeader
                        title="اطلاعات کاربر"
                        color="bg-purple-700/10 text-purple-700"
                        icon={<LuUserSearch className="text-3xl" />}
                    />
                }
            />


            <Card className="w-full shadow-md">
                <BoxHeader
                    title="سفارشات کاربر"
                    color="bg-blue-700/10 text-blue-700"
                    icon={<FiShoppingBag className="text-3xl" />}
                />
                <CardBody>
                    <Input
                        isClearable
                        size="lg"
                        variant="bordered"
                        className="bg-white rounded-xl"
                        color="secondary"
                        placeholder="جستجو کدسفارش یا نام محصول"
                        startContent={
                            <FiSearch className="text-xl" />
                        }
                    >
                    </Input>
                    <div className="flex flex-col gap-4 mt-6">
                        <OrderBox
                            image="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg"
                            orderId="DF-696620"
                            date="1404/4/12 - 12:21"
                            status="preparing"
                            name="محمدحسین خادم المهدی"
                            province="خراسان رضوی"
                            city="مشهد"
                            delivery="ارسال امروز"
                            price="۳۸۵,۰۰۰"
                            onClicked={() => { }}
                        />
                        <OrderBox
                            image="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg"
                            orderId="DF-696620"
                            date="1404/4/12 - 12:21"
                            status="preparing"
                            name="محمدحسین خادم المهدی"
                            province="خراسان رضوی"
                            city="مشهد"
                            delivery="ارسال امروز"
                            price="۳۸۵,۰۰۰"
                            onClicked={() => { }}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default CustomerInfo