"use client"

import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction"
import Packaging from "@/components/Admin/_settings/Packaging"
import BackToPage from "@/components/Helper/BackToPage"
import { useState } from "react"
import { FaQuestion } from "react-icons/fa6"

type PackageItem = {
    id: number
    title: string
    price: number
}

const Faq = () => {

    const [isNewFaq, setIsNewFaq] = useState(false)
    const [faqList, setFaqList] = useState<PackageItem[]>([])
    const [tempTitle, setTempTitle] = useState("")
    const [tempPrice, setTempPrice] = useState<number | null>(null)

    const handleAddPackage = () => {
        if (!tempTitle || tempPrice === null) return

        setFaqList(prev => [
            ...prev,
            { id: Date.now(), title: tempTitle, price: tempPrice }
        ])
        setIsNewFaq(false)
        setTempTitle("")
        setTempPrice(null)
    }

    const handleRemovePackage = (id: number) => {
        setFaqList(prev => prev.filter(p => p.id !== id))
    }

    const handleUpdatePackage = (id: number, data: { title: string; price: number }) => {
        setFaqList(prev =>
            prev.map(pack =>
                pack.id === id ? { ...pack, title: data.title, price: data.price } : pack
            )
        )
    }


    return (
        <div className="flex flex-col gap-6">
            <BackToPage title="بازگشت" link="/admin/settings/about-store" />

            <div className="bg-white p-4 rounded-2xl">
                <HeaderAction
                    title="تعریف سوال"
                    textBtn={isNewFaq ? "x لغو سوال جدید" : "+ سوال جدید"}
                    onPress={() => setIsNewFaq(prev => !prev)}
                />

                <div className="flex flex-col gap-6 mt-6">
                    {isNewFaq && (
                        <div className={!faqList.length ? "mb-10" : ""}>
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

                    {faqList.map(pack => (
                        <Packaging
                            key={pack.id}
                            cardType="update"
                            title={pack.title}
                            defaultValues={{ title: pack.title, price: pack.price }}
                            onDelete={() => handleRemovePackage(pack.id)}
                            onSubmit={(data: any) => handleUpdatePackage(pack.id, data)}
                        />
                    ))}

                    {!faqList.length && (
                        <div className="flex items-center flex-col gap-2">
                            <FaQuestion className="text-[90px] text-gray-600 animate-bounce" />
                            <p className="text-center animate-pulse pb-4">
                                هنوز هیچ سوالی تعریف نشده است
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Faq