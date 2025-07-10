"use client"

import { Card, CardBody, Input } from "@heroui/react";
import BoxHeader from "../../_products/__create/helpers/BoxHeader";
import { LuTextCursorInput } from "react-icons/lu";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { FiSearch } from "react-icons/fi";
import OrderBox from "../../_orders/OrderBox";
import { LuUser } from "react-icons/lu";
import BoxInfo from "./helper/BoxInfo";
import { TiPhoneOutline } from "react-icons/ti";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

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
            <Card className="w-full shadow-md">
                <BoxHeader
                    title="اطلاعات مشتری"
                    color="bg-orange-700/10 text-orange-700"
                    icon={<LuTextCursorInput className="text-3xl" />}
                />
                <CardBody className="flex flex-row gap-8 pb-6 items-center justify-center">
                    <BoxInfo title={`${firstName} ${lastName}`} icon={<LuUser className="text-2xl" />} />
                    <BoxInfo title={phone} icon={<TiPhoneOutline className="text-2xl" />} />
                    <BoxInfo title={birthday} icon={<LiaBirthdayCakeSolid className="text-2xl" />} />
                    <BoxInfo title={membership} icon={<p className="py-[2px]">عضویت</p>} />
                    <BoxInfo title={lastPurchase} icon={<TfiShoppingCartFull className="text-2xl" />} />
                </CardBody>
            </Card>
            <Card className="w-full shadow-md">
                <BoxHeader
                    title="سفارشات"
                    color="bg-blue-700/10 text-blue-700"
                    icon={<TfiShoppingCartFull className="text-3xl" />}
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
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default CustomerInfo