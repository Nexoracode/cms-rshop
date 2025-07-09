"use client"

import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction"
import Packaging from "@/components/Admin/_store/__pockets/Packaging"
import BackToPage from "@/components/Helper/BackToPage"
import { useState } from "react"

const Pockets = () => {

    const [isNewPack, setIsNewPack] = useState(false)

    return (
        <div className="flex flex-col gap-6">
            <BackToPage title="پیک فروشگاه" link="/admin/store" />
            <div className="bg-white p-4 rounded-2xl">
                <HeaderAction
                    title="تعریف بسته بندی"
                    textBtn={isNewPack ? "x لغو بسته بندی جدید" : "+ بسته بندی جدید"}
                    onPress={() => setIsNewPack(prev => !prev)}
                />
                <div className="flex flex-col gap-6 mt-6">
                    {
                        isNewPack ?
                            <Packaging cardType="new" />
                            : ""
                    }
                </div>
            </div>
        </div>
    )

}

export default Pockets