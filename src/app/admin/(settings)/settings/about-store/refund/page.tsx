"use client"

import { Button, Card, CardBody, CardFooter, Textarea } from "@heroui/react"
import { HiOutlineReceiptRefund } from "react-icons/hi"

const Refund = () => {

    return (
        <>
            <Card className="shadow-md mt-6">
           {/*      <BoxHeader
                    title="شرایط بازگشت کالا"
                    color="text-orange-700 bg-orange-700/10"
                    icon={<HiOutlineReceiptRefund className="text-3xl" />}
                /> */}
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