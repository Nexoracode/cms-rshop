"use client"

// Other
import { Button, useDisclosure } from "@heroui/react"
import OptionBox from "@/components/Admin/products/OptionBox";
import ProductBox from "@/components/Admin/products/ProductBox";
import Actions from "@/components/Admin/products/Modals/Actions";
// Icons
import { FiPlus, FiSearch, } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import Filter from "@/components/Admin/products/Modals/Filter";
import Sorting from "@/components/Admin/products/Modals/Sorting";

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

    return (
        <>
            <div>
                <header className="flex items-center justify-between">
                    <Button color="secondary" variant="light" endContent={<FiPlus />}>
                        محصول جدید
                    </Button>
                    <p>محصول (1)</p>
                </header>
                <div className="w-full h-24 bg-slate-200 animate-pulse rounded-xl mt-4"></div>
                <section className="w-full mt-5">
                    <div className="relative">
                        <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-black/50 dark:text-white/60 pointer-events-none" />
                        <input
                            id="search"
                            type="text"
                            dir="rtl"
                            placeholder="جستجو در محصول ها..."
                            className={`w-full pr-12 pl-4 py-3 rounded-lg shadow-box placeholder-default-700/50 text-black/70 text-right transition`}
                        />
                    </div>
                </section>
                <section className="flex items-center justify-between px-8 my-3">
                    <OptionBox title="امکانات بیشتر" icon={<IoMdMore className="text-[16px]" />} onClick={() => { }} />
                    <OptionBox title="مرتب سازی" icon={<BiSortAlt2 className="text-[16px]" />} onClick={onOpenSort} />
                    <OptionBox title="فیلتر" icon={<IoFilter className="text-[16px]" />} onClick={onOpenFilter} />
                </section>
                <section className="flex flex-col gap-3">
                    <ProductBox
                        title="کفش آسیاتک"
                        pathImg="/images/logo.png"
                        price={30000000}
                        varientsCount={400}
                        onMoreDetail={onOpenActions}
                        onShowMore={() => { }}
                    />
                </section>
            </div>
            <Actions
                isOpen={isActionsOpen}
                onOpenChange={onActionsOpenChange}
                productName="کفش آسیاتک"
            />
            <Sorting
                isOpen={isSortOpen}
                onOpenChange={onSortOpenChange}
            />
            <Filter
                isOpen={isFilterOpen}
                onOpenChange={onFilterOpenChange}
            />
        </>
    )
}

export default Products