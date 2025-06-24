"use client"

import { useEffect, useState } from "react";
import Link from "next/link"
import ImagesProducts from "@/components/Admin/products/NewProduct/ImagesProducts";
import InitInformation from "@/components/Admin/products/NewProduct/InitInformation";
import AdditionalInformation from "@/components/Admin/products/NewProduct/AdditionalInformation";
import { Button } from "@heroui/react";
import { MdOutlineArrowBackIos } from "react-icons/md";

const CreateNewProduct = () => {

    const [discount, setDiscount] = useState(0)
    const [isPriceExist, setIsPriceExist] = useState(false)

    /*   useEffect(() => {
          console.log("discount =>", discount);
      }, [discount])
  */
    useEffect(() => {
        console.log("isPriceExist => ", isPriceExist);
    }, [isPriceExist])

    return (
        <div>
            <header className="flex items-center justify-end">
                <Button variant="flat" type="button">
                    <Link href={'/admin/products'} className="flex items-center gap-2">
                        <span>تعریف محصول</span>
                        <MdOutlineArrowBackIos className="text-lg rotate-180" />
                    </Link>
                </Button>
            </header>
            <div className="w-full h-24 bg-slate-200 animate-pulse rounded-xl mt-4"></div>
            <section className="flex flex-col gap-6 py-6">
                <ImagesProducts />
                <InitInformation discount={discount} onIsPriceExist={(val) => {
                    console.log(val);
                    setIsPriceExist(val)
                }} />
                <AdditionalInformation isDisabled={!isPriceExist} onDiscount={(value: any) => setDiscount(value)} />
            </section>
        </div>
    )
}

export default CreateNewProduct