"use client"

import { FiPlus } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { Button } from "@heroui/react"

const Products = () => {

    return (
        <div>
            <header className="flex items-center justify-between">
                <Button color="secondary" variant="light" endContent={<FiPlus />}>
                    محصول جدید
                </Button>
                <p>محصول (1)</p>
            </header>
            <div className="w-full h-24 bg-slate-200 animate-pulse rounded-xl mt-4"></div>
            <div className="w-full mt-4">
                <div className="relative">
                    <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-black/50 dark:text-white/60 pointer-events-none"/>
                    <input
                        id="search"
                        type="text"
                        dir="rtl"
                        placeholder="جستجو در محصول ها..."
                        className={`w-full pr-12 pl-4 py-3 rounded-lg shadow-box placeholder-default-700/50 text-black/70 text-right transition`}
                    />
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Products