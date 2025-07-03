"use client"

import { Card, CardBody } from "@heroui/react"
import BoxHeader from "../_products/__create/helpers/BoxHeader"
import { TfiShoppingCartFull } from "react-icons/tfi";

const ProductListMostViewed = () => {

    return (
        <Card className="shadow-md">
            <BoxHeader
                title="پربازدید ترین محصول ها"
                color="bg-green-700/10 text-green-700"
                icon={<TfiShoppingCartFull className="text-3xl" />}
            />
            <CardBody className="flex flex-col gap-4">
              
            </CardBody>
        </Card>
    )
}

export default ProductListMostViewed