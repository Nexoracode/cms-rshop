"use client"

import { Card, CardBody } from "@heroui/react"
import BoxHeader from "../_products/__create/helpers/BoxHeader"
import { IoReceiptOutline } from "react-icons/io5";

const LatestOrders = () => {

    return (
        <div>
            <Card className="shadow-md">
                <BoxHeader
                    title="جدیدترین سفارش ها"
                    color="bg-blue-700/10 text-blue-700"
                    icon={<IoReceiptOutline className="text-3xl" />}
                />
                <CardBody>

                </CardBody>
            </Card>
        </div>
    )
}

export default LatestOrders