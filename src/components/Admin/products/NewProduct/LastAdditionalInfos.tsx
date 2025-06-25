"use client"

import { Button, Card, CardBody, useDisclosure } from "@heroui/react"
import AddNewPropertyModal from "./Modal/AddNewPropertyModal";

const LastAdditionalInfos = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card className="w-full shadow-md">
                <CardBody dir="rtl" className="flex flex-col gap-6 text-start">
                    <div className="w-full px-2 flex items-center justify-between">
                        <span>مشخصات</span>
                        <Button color="secondary" variant="light" onPress={onOpen}>+ افزودن مشخصات جدید</Button>
                    </div>
                </CardBody>
            </Card>

            <AddNewPropertyModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    )
}

export default LastAdditionalInfos