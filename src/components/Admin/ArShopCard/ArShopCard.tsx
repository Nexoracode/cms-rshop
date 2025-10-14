"use client"

import { Card, CardBody } from "@heroui/react"

type Props = {
    activeOrderBadge?: boolean,
    children: React.ReactNode
}

const ArShopCard: React.FC<Props> = ({ activeOrderBadge= false, children }) => {

    return (
        <Card className="shadow-md bg-gradient-to-r from-white via-purple-400">
            <CardBody className="p-2">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between">
                    <div className="flex items-center gap-3 text-start">
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            className="w-20 h-20 object-contain bg-[rgba(255,255,255,.8)] rounded-2xl"
                        />
                        <div>
                            <p className="text-xl text-white">فروشگاه آرشاپ</p>
                            <p className="mt-1 text-sm">محصولات فرهنگی و مذهبی</p>
                            {
                                activeOrderBadge
                                    ?
                                    <div className="mt-2 bg-green-700/60 rounded-xl flex justify-start px-2 w-fit items-center gap-2 text-green-200">
                                        <span className="relative flex size-3">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-200 opacity-75"></span>
                                            <span className="relative inline-flex size-3 rounded-full bg-green-300"></span>
                                        </span>
                                        <p className="text-[12px]">سفارش گیری فعال</p>
                                    </div>
                                    : ""
                            }
                        </div>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default ArShopCard