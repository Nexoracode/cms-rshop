"use client"

import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction"
import CustomerInfo from "@/components/Admin/_store/__customers/CustomerInfo";
import CustomerInfoBox from "@/components/Admin/_store/__customers/helper/CustomerInfoBox";
import AddNewCustomerModal from "@/components/Admin/_store/__customers/modals/AddNewCustomerModal";
import FilterModal from "@/components/Admin/_store/__customers/modals/FilterModal";
import SortingModal from "@/components/Admin/_store/__customers/modals/SortingModal";
import OptionBox from "@/components/Admin/OptionBox";
import BackToPage from "@/components/Helper/BackToPage"
import { Input, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { LuUsersRound } from "react-icons/lu";

const Customers = () => {

    const router = useRouter()
    const [customers, setCustomers] = useState<any[]>([])
    const [userId, setUserId] = useState("")

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
            {
                !userId.length
                    ?
                    <div className="flex flex-col gap-6">
                        <BackToPage title="مشتریان" link="/admin/store" />

                        <div className="bg-white p-4 rounded-2xl">
                            <HeaderAction
                                title="کاربران"
                                textBtn={"+ کاربر جدید"}
                                onPress={onAddOpen}
                            />

                            <section className="w-full mt-5">
                                <Input
                                    isClearable
                                    size="lg"
                                    variant="bordered"
                                    className="bg-white rounded-xl"
                                    color="secondary"
                                    placeholder="جستجو در کاربران..."
                                    startContent={
                                        <FiSearch className="text-xl" />
                                    }
                                >
                                </Input>
                            </section>
                            <section className="flex items-center justify-start my-3">
                                <OptionBox title="فیلتر" icon={<IoFilter className="text-[16px]" />} onClick={onFilterOpen} />
                                <OptionBox title="مرتب سازی" icon={<BiSortAlt2 className="text-[16px]" />} onClick={onSortingOpen} />
                            </section>

                            <div className="flex flex-col gap-6 mt-6">
                                {!customers.length && (
                                    <div className="flex items-center flex-col gap-2">
                                        <LuUsersRound className="text-[90px] text-gray-600 animate-bounce" />
                                        <p className="text-center animate-pulse pb-4">
                                            هنوز هیچ کاربری در وبسایت ثبت نام نکرده است
                                        </p>
                                    </div>
                                )}
                                <div className="flex flex-col gap-4">
                                    <CustomerInfoBox
                                        firstName="محمد"
                                        lastName="کریمی"
                                        phone="09121234567"
                                        membership="1403/04/18"
                                        lastPurchase="1403/04/18"
                                        onShowDetail={() => setUserId("safsdgsdf2354f23")}
                                    />
                                    <CustomerInfoBox
                                        firstName="محمد"
                                        lastName="کریمی"
                                        phone="09121234567"
                                        membership="1403/04/18"
                                        lastPurchase="1403/04/18"
                                        onShowDetail={() => { }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex flex-col gap-6">

                        <BackToPage title="لیست مشتریان" link="customers" onClick={() => setUserId("")} />

                        <div className="bg-white p-4 rounded-2xl">
                            <CustomerInfo
                                firstName="محمد"
                                lastName="کریمی"
                                phone="09121234567"
                                membership="1403/04/18"
                                lastPurchase="1403/04/18"
                            />
                        </div>
                    </div>
            }

            <AddNewCustomerModal
                isOpen={isAddOpen}
                onOpenChange={onAddOpenChange}
                onSubmit={() => { }}
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