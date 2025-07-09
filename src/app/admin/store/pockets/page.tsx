"use client"

import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction"
import Packaging from "@/components/Admin/_store/__pockets/Packaging"
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
                <div className="flex flex-col gap-6 mt-6">
                    <Packaging cardType="new">

                    </Packaging>
                </div>
            </div>
        </div>
    )

}

export default Pockets