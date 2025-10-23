"use client"

import BoxHeader from "@/components/common/Card/CardHeader"
import BackToPage from "@/components/common/Breadcrumbs"
import { Button, Card, CardBody, CardFooter, Textarea } from "@heroui/react"
import { HiOutlineReceiptRefund } from "react-icons/hi"

const Refund = () => {

    return (
        <>
            <BackToPage title="بازگشت" link="/admin/settings/about-store" />
            <Card className="shadow-md mt-6">
                <BoxHeader
                    title="شرایط بازگشت کالا"
                    color="text-orange-700 bg-orange-700/10"
                    icon={<HiOutlineReceiptRefund className="text-3xl" />}
                />
                <CardBody className=" text-right">
                    <Textarea
                        labelPlacement="outside"
                        isClearable
                        placeholder="وارد کنید"
                        variant="flat"
                        onClear={() => console.log("textarea cleared")}
                    />
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

export default Refund