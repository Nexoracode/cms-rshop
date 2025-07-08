"use client"

// Other
import Link from "next/link";
import { Button, Input, useDisclosure } from "@heroui/react"
import OptionBox from "@/components/Admin/OptionBox";
import ProductBox from "@/components/Admin/_products/ProductBox";
import ActionsModal from "@/components/Admin/_products/modals/ActionsModal";
import FilterModal from "@/components/Admin/_products/modals/FilterModal";
import SortingModal from "@/components/Admin/_products/modals/SortingModal";
import MoreFeaturesModal from "@/components/Admin/_products/modals/MoreFeaturesModal";
// Icons
import { FiPlus, FiSearch, } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import ShopInfosCard from "@/components/Admin/ArShopCard/ShopInfosCard";

const Products = () => {

    const {
        isOpen: isActionsOpen,
        onOpen: onOpenActions,
        onOpenChange: onActionsOpenChange,
    } = useDisclosure();

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
            <ShopInfosCard />
            <div className="arshop-card">
                <header className="flex items-center justify-between">
                    <p>محصول (1)</p>
                    <Button color="secondary" variant="flat" endContent={<FiPlus />} type="button">
                        <Link href={'/admin/products/create'}>
                            محصول جدید
                        </Link>
                    </Button>
                </header>
                <section className="w-full mt-5">
                    <Input
                        isClearable
                        size="lg"
                        variant="bordered"
                        className="bg-white rounded-xl"
                        color="secondary"
                        placeholder="جستجو در محصول ها..."
                        startContent={
                            <FiSearch className="text-xl" />
                        }
                    >
                    </Input>
                </section>
                <section className="flex items-center justify-between px-8 my-3">
                    <OptionBox title="فیلتر" icon={<IoFilter className="text-[16px]" />} onClick={onOpenFilter} />
                    <OptionBox title="مرتب سازی" icon={<BiSortAlt2 className="text-[16px]" />} onClick={onOpenSort} />
                    <OptionBox title="امکانات بیشتر" icon={<IoMdMore className="text-[16px]" />} onClick={onOpenFeature} />
                </section>
                <section className="flex flex-col gap-3">
                    <ProductBox
                        title="کفش آسیاتک"
                        pathImg="https://indigo18.com/images/product-06.jpg"
                        price={30000000}
                        varientsCount={400}
                        onMoreDetail={onOpenActions}
                        onShowMore={() => { }}
                    />
                </section>
            </div>
            <ActionsModal
                isOpen={isActionsOpen}
                onOpenChange={onActionsOpenChange}
                productName="کفش آسیاتک"
            />
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

export default Products