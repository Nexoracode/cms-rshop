"use client"

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader"
import BackToPage from "@/components/Helper/BackToPage"
import { Button, Card, CardBody, CardFooter, Textarea } from "@heroui/react"
import { IoDocumentTextOutline } from "react-icons/io5"

const Help = () => {

    return (
        <>
            <BackToPage title="بازگشت" link="/admin/settings/about-store" />
            <Card className="shadow-md mt-6">
                <BoxHeader
                    title="راهنمای خرید"
                    color="text-blue-700 bg-blue-700/10"
                    icon={<IoDocumentTextOutline className="text-3xl" />}
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

export default Help