"use client"

import React from "react";
import { Card, CardBody, Image, Button } from "@heroui/react";
import { IoMdMore } from "react-icons/io";

type Props = {
    title: string,
    pathImg: string,
    onShowMore: () => void,
    onMoreDetail: () => void,
    price: string | number,
    varientsCount: string | number,
}

const ProductBox: React.FC<Props> = ({title, onShowMore, price, varientsCount, pathImg, onMoreDetail}) => {

    return (
        <Card
            isBlurred
            className="border-none"
            shadow="sm"
        >
            <CardBody>
                <div className="flex gap-4 items-center justify-between h-28">
                    <div className="w-full">
                        <div className="flex justify-between items-start">
                            <Button
                                isIconOnly
                                className="-translate-y-2"
                                variant="light"
                                onPress={onMoreDetail}
                            >
                                <IoMdMore className="text-lg" />
                            </Button>
                            <p className="text-sm">{title}</p>
                        </div>

                        <div className="mt-3 text-end">
                            <Button variant="flat" size="sm" color="success" onPress={onShowMore}>نمایش</Button>
                        </div>

                        <div className="flex w-full items-center justify-between mt-1.5">
                           <small>از {price.toLocaleString()} <span className="text-gray-500">تومان</span></small>
                           <small className="text-gray-500">موجودی تنوع ها {varientsCount} تا</small>
                        </div>
                    </div>
                    <div className="w-fit">
                        <Image
                            alt="productr cover"
                            className="object-cover h-[110px]"
                            shadow="sm"
                            src={pathImg}
                            width="150px"
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default ProductBox