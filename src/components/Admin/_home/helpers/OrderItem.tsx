"use client"

import { Progress } from "@heroui/react"
import { BiMessageSquareDetail } from "react-icons/bi"

type Props = {
    status: string,
    customerName: string,
    price: number | string,
}

const OrderItem: React.FC<Props> = ({price, customerName, status}) => {

    return (
        <div className="flex items-center justify-between bg-slate-100 rounded-xl p-2">
            <div className="flex items-center text-start gap-3">
                <div className="bg-gray-300 p-4 rounded-xl">
                    <BiMessageSquareDetail className="text-2xl text-gray-600" />
                </div>
                <div className="flex flex-col gap-2">
                    <p>{customerName}</p>
                    <p>{price.toLocaleString()} تومان</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center max-w-36 w-full">
                <p>{status}</p>
                <Progress isStriped aria-label="Loading..." className="w-full" color="secondary" value={60} />
            </div>
        </div>
    )
}

export default OrderItem