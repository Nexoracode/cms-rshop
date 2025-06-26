"use client"

import { useState } from "react";
import Link from "next/link"
import { Button } from "@heroui/react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { Stock } from "@/types"
//
import ImagesProducts from "@/components/Admin/_products/__create/ImagesProducts";
import InitInfos from "@/components/Admin/_products/__create/InitInfos";
import FirstAdditionalInfos from "@/components/Admin/_products/__create/FirstAdditionalInfos";
import MiddAdditionalInfos from "@/components/Admin/_products/__create/MiddAdditionalInfos";
import LastAdditionalInfos from "@/components/Admin/_products/__create/LastAdditionalInfos";
import AttributesProducts from "@/components/Admin/_products/__create/AttributesProducts";

const CreateNewProduct = () => {

    const [discount, setDiscount] = useState({ value: 0, type: "percent" as Stock })
    const [isPriceExist, setIsPriceExist] = useState(false)

    return (
        <div>
            <header className="flex items-center justify-start">
                <Button variant="flat" type="button">
                    <Link href={'/admin/products'} className="flex items-center gap-2">
                        <MdOutlineArrowBackIos className="text-lg rotate-180" />
                        <span>تعریف محصول</span>
                    </Link>
                </Button>
            </header>
            <div className="w-full h-24 bg-slate-200 animate-pulse rounded-xl mt-4"></div>
            <section className="flex flex-col gap-6 py-6">
                <ImagesProducts />
                <InitInfos discount={discount} onIsPriceExist={(val) => setIsPriceExist(val)} />
                <FirstAdditionalInfos isDisabled={!isPriceExist} onDiscount={(value: any, type: Stock) => setDiscount({ value, type })} />
                <MiddAdditionalInfos />
                <LastAdditionalInfos />
                <AttributesProducts />
                <Button color="secondary">ثبت محصول</Button>
            </section>
        </div>
    )
}

export default CreateNewProduct