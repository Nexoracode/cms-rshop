"use client"

import { useState } from "react";
import Link from "next/link"
import { Button } from "@heroui/react";
import { MdOutlineArrowBackIos } from "react-icons/md";
//
import ImagesProducts from "@/components/Admin/_products/__create/ImagesProducts";
import InitInfos from "@/components/Admin/_products/__create/InitInfos";
import MiddAdditionalInfos from "@/components/Admin/_products/__create/MiddAdditionalInfos";
import LastAdditionalInfos from "@/components/Admin/_products/__create/LastAdditionalInfos";
import AttributesProducts from "@/components/Admin/_products/__create/AttributesProducts";
import ImageCropper from "@/components/Helper/ImageCropper";

type ProductInfo = {
    medias: any[],
}

const CreateNewProduct = () => {

    const [productInfos, setProductInfos] = useState<ProductInfo | null>(null)

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
                <ImagesProducts>
                    <ImageCropper onPreviewsChange={datas => setProductInfos(prev => ({ ...prev, medias: datas }))} />
                </ImagesProducts>
                <InitInfos onChange={(data) => console.log(data)} />
                <MiddAdditionalInfos />
                <LastAdditionalInfos />
                <AttributesProducts />
                <Button color="secondary" isDisabled={productInfos === null ? true : false}>ثبت محصول</Button>
            </section>
        </div>
    )
}

export default CreateNewProduct