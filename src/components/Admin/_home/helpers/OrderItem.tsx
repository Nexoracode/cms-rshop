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
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center justify-between bg-slate-100 rounded-xl p-2 sm:p-4">
            <div className="flex items-center text-start gap-3">
                <div className="bg-gray-300 p-4 rounded-xl">
                    <BiMessageSquareDetail className="text-2xl text-gray-600" />
                </div>
                <div className="flex flex-col gap-2">
                    <p>{customerName}</p>
                    <p>{price.toLocaleString()} تومان</p>
                </div>
            </div>
            <div className="w-full flex-col phone:flex-row sm:flex-col bg-white p-2 rounded-xl sm:max-w-36 flex gap-2 items-center">
                <p className="w-1/2 sm:w-auto text-start w-full">{status}</p>
                <Progress isStriped aria-label="Loading..." className="w-full animate-pulse" color="secondary" value={60} />
            </div>
        </div>
    )
}

export default OrderItem