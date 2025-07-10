"use client"

import BackToPage from "@/components/Helper/BackToPage"
import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction"
import { useState } from "react"
import { GrAnnounce } from "react-icons/gr"
import { useDisclosure } from "@heroui/react"
import PromotionsModal from "@/components/Admin/_store/__promotions/PromotionsModal"

const Promotions = () => {

    const [prom, setProm] = useState<any[]>([])
    const {
        isOpen,
        onOpen,
        onOpenChange,
    } = useDisclosure();

    return (
        <>
            <div className="flex flex-col gap-6">
                <BackToPage title="پروموشن‌ها" link="/admin/store" />

                <div className="bg-white p-4 rounded-2xl">
                    <HeaderAction
                        title="تعریف شده ها"
                        textBtn={"+ ساخت پروموشن جدید"}
                        onPress={onOpen}
                    />

                    <div className="flex flex-col gap-6 mt-6">

                        {
                            !prom.length
                                ?
                                !prom.length && (
                                    <div className="flex items-center flex-col gap-2">
                                        <GrAnnounce className="text-[90px] text-gray-600 animate-bounce" />
                                        <p className="text-center animate-pulse pb-4">
                                            هنوز هیچ پروموشنی تعریف نشده است
                                        </p>
                                    </div>
                                )
                                :
                                ""
                        }

                    </div>
                </div>
            </div>
            
            <PromotionsModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    )
}

export default Promotions