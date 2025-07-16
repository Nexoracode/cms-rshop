"use client"

// Other
import Link from "next/link";
import { Button, Card, CardBody, Input, Tab, Tabs, useDisclosure } from "@heroui/react"
import OptionBox from "@/components/Admin/OptionBox";
import OrderBox from "@/components/Admin/_orders/OrderBox";
import FilterModal from "@/components/Admin/_orders/modals/FilterModal";
import SortingModal from "@/components/Admin/_orders/modals/SortingModal";
import MoreFeaturesModal from "@/components/Admin/_orders/modals/MoreFeaturesModal";
// Icons
import { FiPlus, FiSearch, } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";
import { IoFilter, IoReceiptOutline } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { useState } from "react";
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import { TfiShoppingCartFull } from "react-icons/tfi";
import BackToPage from "@/components/Helper/BackToPage";
import OrderWizard from "@/components/Admin/_orders/OrderProccess/OrderWizard";
import { LuBox } from "react-icons/lu";

const Orders = () => {

    const [orderId, setOrderId] = useState("")

    const {
        isOpen: isSortOpen,
        onOpen: onOpenSort,
        onOpenChange: onSortOpenChange,
    } = useDisclosure();

    const {
        isOpen: isFilterOpen,
        onOpen: onOpenFilter,
        onOpenChange: onFilterOpenChange,
    } = useDisclosure();

    const {
        isOpen: isFeatureOpen,
        onOpen: onOpenFeature,
        onOpenChange: onFeatureOpenChange,
    } = useDisclosure();

    return (
        <>
            {
                !orderId.length
                    ?
                    <div>
                        <header className="flex items-center justify-between mb-6">
                            <p>سفارش (1)</p>
                            <Button color="secondary" variant="flat" endContent={<FiPlus />} type="button">
                                <Link href={'/admin/orders/manual-order'}>
                                    ثبت سفارش
                                </Link>
                            </Button>
                        </header>

                        <Card className="shadow-none my-6">
                            <BoxHeader
                                title="باکس فیلر"
                                color="text-white bg-gray-800"
                                icon={<LuBox className="text-3xl" />}
                            />
                            <CardBody className="flex flex-col gap-4">
                                <Tabs aria-label="Tabs colors" color={"secondary"} radius="md" className="bg-white rounded-xl tabs-site w-full" variant="bordered">
                                    <Tab key="all" title="همه"></Tab>
                                    <Tab key="rewind" title="بررسی"></Tab>
                                    <Tab key="test" title="پردازش"></Tab>
                                    <Tab key="closed" title="بسته شده"></Tab>
                                    <Tab key="back" title="مرجوعی"></Tab>
                                </Tabs>
                                <section className="w-full">
                                    <Input
                                        isClearable
                                        size="lg"
                                        variant="bordered"
                                        className="bg-white rounded-xl"
                                        color="secondary"
                                        placeholder="جستجو کدسفارش یا نام مشتری یا نام محصول"
                                        startContent={
                                            <FiSearch className="text-xl" />
                                        }
                                    >
                                    </Input>
                                </section>
                                <section className="flex flex-wrap items-center gap-2 justify-between">
                                    <OptionBox title="فیلتر" icon={<IoFilter className="!text-[16px]" />} onClick={onOpenFilter} />
                                    <OptionBox title="مرتب سازی" icon={<BiSortAlt2 className="!text-[16px]" />} onClick={onOpenSort} />
                                    <OptionBox title="امکانات بیشتر" icon={<IoMdMore className="!text-[16px]" />} onClick={onOpenFeature} />
                                </section>
                            </CardBody>
                        </Card>

                        <Card className="shadow-md">
                            <BoxHeader
                                title="محصولات"
                                color="text-blue-700 bg-blue-700/10"
                                icon={<IoReceiptOutline className="text-3xl" />}
                            />
                            <CardBody>
                                <OrderBox
                                    image="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg"
                                    orderId="DF-696620"
                                    date="1404/4/12 - 12:21"
                                    status="preparing"
                                    name="محمدحسین خادم المهدی"
                                    province="خراسان رضوی"
                                    city="مشهد"
                                    delivery="ارسال امروز"
                                    price="۳۸۵,۰۰۰"
                                    onClicked={() => setOrderId("DF-696620")}
                                />
                            </CardBody>
                        </Card>
                    </div>
                    :
                    <div>
                        <BackToPage title="بازگشت" link="/admin/orders" onClick={() => setOrderId("")} />
                        <Card className="shadow-md mt-6">
                            <BoxHeader
                                title={`سفارش ${orderId}`}
                                color="text-blue-700 bg-blue-700/10"
                                icon={<TfiShoppingCartFull className="text-3xl" />}
                            />
                            <CardBody>
                                <OrderWizard />
                            </CardBody>
                        </Card>
                    </div>
            }

            <SortingModal
                isOpen={isSortOpen}
                onOpenChange={onSortOpenChange}
            />
            <FilterModal
                isOpen={isFilterOpen}
                onOpenChange={onFilterOpenChange}
            />
            <MoreFeaturesModal
                isOpen={isFeatureOpen}
                onOpenChange={onFeatureOpenChange}
            />
        </>
    )
}

export default Orders