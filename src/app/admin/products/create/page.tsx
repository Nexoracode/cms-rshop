"use client"

import { useEffect, useState } from "react";
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
import BackToPage from "@/components/Helper/BackToPage";

type ProductInfo = {
    medias?: any[],
    initInfos?: any
}

const CreateNewProduct = () => {

    const [productInfos, setProductInfos] = useState<ProductInfo | null>(null)

    useEffect(() => {
        if (productInfos) {
            console.log("FINAL =>", productInfos);
        }
    }, [productInfos])

    return (
        <div>
            <BackToPage title="تعریف محصول" link="/admin/products" />
            <section className="flex flex-col gap-6 py-6">
                <ImagesProducts>
                    <ImageCropper onPreviewsChange={datas =>
                        setProductInfos(prev =>
                            prev
                                ? { ...prev, medias: datas }
                                : { medias: datas }
                        )
                    } />
                </ImagesProducts>
                <InitInfos onChange={datas =>
                    setProductInfos(prev =>
                        prev
                            ? { ...prev, initInfos: datas }
                            : { initInfos: datas }
                    )
                } />
                <MiddAdditionalInfos />
                <LastAdditionalInfos />
                <AttributesProducts />
                <Button color="secondary" isDisabled={productInfos === null ? true : false}>ثبت محصول</Button>
            </section>
        </div>
    )
}

export default CreateNewProduct