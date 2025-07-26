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

const ProductBox: React.FC<Props> = ({ title, onShowMore, price, varientsCount, pathImg, onMoreDetail }) => {

    return (
        <Card
            isBlurred
            className="border-none shadow-md"
        >
            <CardBody>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between sm:h-32">
                    <div className="w-fit">
                        <Image
                            alt="productr cover"
                            className="object-cover h-[110px]"
                            shadow="sm"
                            src={pathImg}
                            width="150px"
                        />
                    </div>
                    <div className="w-full mt-2 sm:mt-0">
                        <div className="flex justify-between items-start">
                            <p className="text-[17px]">{title}</p>
                            <Button
                                isIconOnly
                                className="-translate-y-2"
                                variant="light"
                                onPress={onMoreDetail}
                            >
                                <IoMdMore className="text-lg" />
                            </Button>
                        </div>

                        <div className="flex gap-3 flex-col-reverse sm:flex-col">
                            <div className="text-start">
                                <Button variant="flat" size="sm" color="success" className="w-full sm:w-fit" onPress={onShowMore}>نمایش</Button>
                            </div>

                            <div className="flex flex-col bg-gray-100 sm:bg-transparent sm:p-o rounded-xl p-3 gap-3 phone:gap-0 items-start phone:flex-row w-full phone:items-center justify-between">
                                <p className="text-gray-500 text-[13px]">موجودی تنوع ها {varientsCount} تا</p>
                                <p className="text-end w-full phone:w-fit">از {price.toLocaleString("fa-IR")} <span className="text-gray-500">تومان</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default ProductBox