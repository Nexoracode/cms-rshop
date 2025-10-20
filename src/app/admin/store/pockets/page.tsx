"use client"

import HeaderAction from "@/components/admin/_products/__create/helpers/HeaderAction"
import Packaging from "@/components/admin/_store/__pockets/Packaging"
import BackToPage from "@/components/shared/BackToPage"
import { useState } from "react"
import { LuPackageOpen } from "react-icons/lu"

type PackageItem = {
    id: number
    title: string
    price: number
}

const Pockets = () => {
    const [isNewPack, setIsNewPack] = useState(false)
    const [packList, setPackList] = useState<PackageItem[]>([])
    const [tempTitle, setTempTitle] = useState("")
    const [tempPrice, setTempPrice] = useState<number | null>(null)

    const handleAddPackage = () => {
        if (!tempTitle || tempPrice === null) return

        setPackList(prev => [
            ...prev,
            { id: Date.now(), title: tempTitle, price: tempPrice }
        ])
        setIsNewPack(false)
        setTempTitle("")
        setTempPrice(null)
    }

    const handleRemovePackage = (id: number) => {
        setPackList(prev => prev.filter(p => p.id !== id))
    }

    const handleUpdatePackage = (id: number, data: { title: string; price: number }) => {
        setPackList(prev =>
            prev.map(pack =>
                pack.id === id ? { ...pack, title: data.title, price: data.price } : pack
            )
        )
    }

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
                    {isNewPack && (
                        <div className={!packList.length ? "mb-10" : ""}>
                            <Packaging
                                cardType="new"
                                onSubmit={handleAddPackage}
                                onChange={(data) => {
                                    setTempTitle(data.title)
                                    setTempPrice(data.price)
                                }}
                            />
                        </div>
                    )}

                    {packList.map(pack => (
                        <Packaging
                            key={pack.id}
                            cardType="update"
                            title={pack.title}
                            defaultValues={{ title: pack.title, price: pack.price }}
                            onDelete={() => handleRemovePackage(pack.id)}
                            onSubmit={(data: any) => handleUpdatePackage(pack.id, data)}
                        />
                    ))}

                    {!packList.length && (
                        <div className="flex items-center flex-col gap-2">
                            <LuPackageOpen className="text-[90px] text-gray-600 animate-bounce" />
                            <p className="text-center animate-pulse pb-4">
                                هنوز هیچ بسته‌بندی تعریف نشده است
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Pockets
