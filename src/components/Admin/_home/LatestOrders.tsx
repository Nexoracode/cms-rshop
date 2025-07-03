"use client"

import { Card, CardBody } from "@heroui/react"
import BoxHeader from "../_products/__create/helpers/BoxHeader"
import { IoReceiptOutline } from "react-icons/io5";
import OrderDetail from "./helpers/OrderDetail";

const LatestOrders = () => {

    return (
        <Card className="shadow-md">
            <BoxHeader
                title="جدیدترین سفارش ها"
                color="bg-blue-700/10 text-blue-700"
                icon={<IoReceiptOutline className="text-3xl" />}
            />
            <CardBody className="flex flex-col gap-4">
                <OrderDetail
                    price={385000}
                    productName="ویندوز 10"
                    status="درخواست شده"
                />
                <OrderDetail
                    price={385000}
                    productName="ویندوز 10"
                    status="درخواست شده"
                />
            </CardBody>
        </Card>
    )
}

export default LatestOrders