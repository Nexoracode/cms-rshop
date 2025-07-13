"use client"

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader"
import BackToPage from "@/components/Helper/BackToPage"
import { Button, Card, CardBody, CardFooter } from "@heroui/react"
import { TbShoppingCartPlus } from "react-icons/tb";

const ManualOrder = () => {

    return (
        <>
            <BackToPage title="بازگشت" link="/admin/orders" />
            <Card className="shadow-md mt-6">
                <BoxHeader
                    title="سفارش جدید"
                    color="text-blue-700 bg-blue-700/10"
                    icon={<TbShoppingCartPlus className="text-3xl" />}
                />
                <CardBody>
                        
                </CardBody>
                <CardFooter className="w-full">
                    <Button variant="flat" color="secondary" className="w-full">
                        ثبت
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default ManualOrder