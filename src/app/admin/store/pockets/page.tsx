"use client"

import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction"
import BackToPage from "@/components/Helper/BackToPage"

const Pockets = () => {

    return (
        <div className="flex flex-col gap-6">
            <BackToPage title="پیک فروشگاه" link="/admin/store" />
            <div className="bg-white p-4 rounded-2xl">
                <HeaderAction
                    title="تعریف بسته بندی"
                    textBtn="+ بسته بندی جدید"
                    onPress={() => { }}
                />
            </div>
        </div>
    )

}

export default Pockets