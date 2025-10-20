"use client"

import { Card, CardBody } from "@heroui/react"
import BoxHeader from "../products/create/helpers/BoxHeader"
import { TfiShoppingCartFull } from "react-icons/tfi";
import ProductItem from "./helpers/ProductItem";

const ProductListMostViewed = () => {

    return (
        <Card className="shadow-md">
            <BoxHeader
                title="پربازدید ترین محصول ها"
                color="bg-green-700/10 text-green-700"
                icon={<TfiShoppingCartFull className="text-3xl" />}
            />
            <CardBody className="flex flex-col gap-4">
                <ProductItem
                    price={385000}
                    img="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg"
                    productName="ویندوز 10"
                    isExist="موجود"
                    subProductName="کمترین قیمت"
                />
                <ProductItem
                    img="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg"
                    price={385000}
                    productName="ویندوز 10"
                    isExist="موجود"
                    subProductName="کمترین قیمت"
                />
                <ProductItem
                    img="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg"
                    price={385000}
                    productName="ویندوز 10"
                    isExist="موجود"
                    subProductName="کمترین قیمت"
                />
                <ProductItem
                    img="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg"
                    price={385000}
                    productName="ویندوز 10"
                    isExist="موجود"
                    subProductName="کمترین قیمت"
                />
            </CardBody>
        </Card>
    )
}

export default ProductListMostViewed