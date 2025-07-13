"use client"

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader"
import BackToPage from "@/components/Helper/BackToPage"
import { Button, Card, CardBody, CardFooter } from "@heroui/react"
import { TbUserQuestion } from "react-icons/tb"

const Faq = () => {

    return (
        <>
            <BackToPage title="بازگشت" link="/admin/settings/about-store" />
            <Card className="shadow-md mt-6">
                <BoxHeader
                    title="سوالات متدوال"
                    color="text-green-700 bg-green-700/10"
                    icon={<TbUserQuestion className="text-3xl" />}
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

export default Faq