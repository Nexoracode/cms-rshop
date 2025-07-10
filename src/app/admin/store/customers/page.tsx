"use client"

import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction"
import AddNewCustomerModal from "@/components/Admin/_store/__customers/modals/AddNewCustomerModal";
import FilterModal from "@/components/Admin/_store/__customers/modals/FilterModal";
import SortingModal from "@/components/Admin/_store/__customers/modals/SortingModal";
import BackToPage from "@/components/Helper/BackToPage"
import { useDisclosure } from "@heroui/react";
import { useState } from "react";
import { LuUsersRound } from "react-icons/lu";

const Customers = () => {

    const [customers, setCustomers] = useState<any[]>([])

    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onOpenChange: onAddOpenChange,
    } = useDisclosure();

    const {
        isOpen: isSortingOpen,
        onOpen: onSortingOpen,
        onOpenChange: onSortingOpenChange,
    } = useDisclosure();

    const {
        isOpen: isFilterOpen,
        onOpen: onFilterOpen,
        onOpenChange: onFilterOpenChange,
    } = useDisclosure();

    return (
        <>
            <div className="flex flex-col gap-6">
                <BackToPage title="مشتریان" link="/admin/store" />

                <div className="bg-white p-4 rounded-2xl">
                    <HeaderAction
                        title="کاربران"
                        textBtn={"+ کاربر جدید"}
                        onPress={onAddOpen}
                    />

                    <div className="flex flex-col gap-6 mt-6">

                        {!customers.length && (
                            <div className="flex items-center flex-col gap-2">
                                <LuUsersRound className="text-[90px] text-gray-600 animate-bounce" />
                                <p className="text-center animate-pulse pb-4">
                                    هنوز هیچ کاربری در وبسایت ثبت نام نکرده است
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AddNewCustomerModal
                isOpen={isAddOpen}
                onOpenChange={onAddOpenChange}
                onSubmit={() => {}}
            />

            <SortingModal
                isOpen={isSortingOpen}
                onOpenChange={onSortingOpenChange}
            />

            <FilterModal
                isOpen={isFilterOpen}
                onOpenChange={onFilterOpenChange}
            />
        </>
    )

}

export default Customers