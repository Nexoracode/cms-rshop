"use client"

import ImagesProducts from "@/components/Admin/products/NewProduct/ImagesProducts";
import { Button } from "@heroui/react";
import Link from "next/link"
import { MdOutlineArrowBackIos } from "react-icons/md";
import InitInformation from "@/components/Admin/products/NewProduct/InitInformation";

const CreateNewProduct = () => {
    return (
        <div>
            <header className="flex items-center justify-end">
                <Button variant="flat" type="button">
                    <Link href={'/admin/products'} className="flex items-center gap-2">
                        <span>تعریف محصول</span>
                        <MdOutlineArrowBackIos className="text-lg rotate-180" />
                    </Link>
                </Button>
            </header>
            <div className="w-full h-24 bg-slate-200 animate-pulse rounded-xl mt-4"></div>
            <section className="flex flex-col gap-6 py-6">
                <ImagesProducts />
                <InitInformation price={20000}/>
            </section>
        </div>
    )
}

export default CreateNewProduct