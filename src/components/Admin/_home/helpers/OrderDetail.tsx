"use client"

import { BiMessageSquareDetail } from "react-icons/bi"

type Props = {
    status: string,
    productName: string,
    price: number | string,
}

const OrderDetail: React.FC<Props> = ({price, productName, status}) => {

    return (
        <div className="flex items-center justify-between bg-slate-100 rounded-xl p-2">
            <div className="flex items-center text-start gap-3">
                <div className="bg-gray-300 p-4 rounded-md">
                    <BiMessageSquareDetail className="text-2xl text-gray-600" />
                </div>
                <div className="flex flex-col gap-2">
                    <p>{productName}</p>
                    <p>{price.toLocaleString()} تومان</p>
                </div>
            </div>
            <div>
                <p>
                    {status}
                </p>
            </div>
        </div>
    )
}

export default OrderDetail