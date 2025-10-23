"use client"

import { Card, CardBody } from "@heroui/react"
import BoxHeader from "../../common/Card/HeaderCard"
import { IoReceiptOutline } from "react-icons/io5";
import OrderItem from "./helpers/OrderItem";

const LatestOrders = () => {

    return (
        <Card className="shadow-md">
            <BoxHeader
                title="جدیدترین سفارش ها"
                color="bg-blue-700/10 text-blue-700"
                icon={<IoReceiptOutline className="text-3xl" />}
            />
            <CardBody className="flex flex-col gap-4">
                <OrderItem
                    price={385000}
                    customerName="علی اصغر حبیبی"
                    status="درخواست شده"
                />
                <OrderItem
                    price={385000}
                    customerName="محمدحسین علی دوست"
                    status="درخواست شده"
                />
            </CardBody>
        </Card>
    )
}

export default LatestOrders