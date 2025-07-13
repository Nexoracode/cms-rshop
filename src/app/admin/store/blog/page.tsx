"use client"

import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction"
import BlogCard from "@/components/Admin/_store/__blog/BlogCard"
import BackToPage from "@/components/Helper/BackToPage"
import { useState } from "react"
import { TbFolderOpen } from "react-icons/tb"

type FaqItem = {
    id: number
    title: string
    description: string
    imageFile: File | null
}

const Blog = () => {
    const [isNewFaq, setIsNewFaq] = useState(false)
    const [faqList, setFaqList] = useState<FaqItem[]>([])

    const [tempTitle, setTempTitle] = useState("")
    const [tempDescription, setTempDescription] = useState("")
    const [tempImageFile, setTempImageFile] = useState<File | null>(null)

    const handleAddFaq = () => {
        if (!tempTitle || !tempDescription) return

        setFaqList(prev => [
            ...prev,
            {
                id: Date.now(),
                title: tempTitle,
                description: tempDescription,
                imageFile: tempImageFile
            }
        ])

        setIsNewFaq(false)
        setTempTitle("")
        setTempDescription("")
        setTempImageFile(null)
    }

    const handleRemoveFaq = (id: number) => {
        setFaqList(prev => prev.filter(f => f.id !== id))
    }

    const handleUpdateFaq = (
        id: number,
        data: { title: string; description: string; imageFile: File | null }
    ) => {
        setFaqList(prev =>
            prev.map(faq =>
                faq.id === id ? { ...faq, ...data } : faq
            )
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <BackToPage title="بازگشت" link="/admin/store" />

            <div className="bg-white p-4 rounded-2xl">
                <HeaderAction
                    title="بلاگ ها"
                    textBtn={isNewFaq ? "x لغو بلاگ جدید" : "+ بلاگ جدید"}
                    onPress={() => setIsNewFaq(prev => !prev)}
                />

                <div className="flex flex-col gap-6 mt-6">
                    {isNewFaq && (
                        <div className={!faqList.length ? "mb-10" : ""}>
                            <BlogCard
                                cardType="new"
                                onSubmit={handleAddFaq}
                                onChange={(data) => {
                                    setTempTitle(data.title)
                                    setTempDescription(data.description)
                                    setTempImageFile(data.imageFile)
                                }}
                            />
                        </div>
                    )}

                    {faqList.map(faq => (
                        <BlogCard
                            key={faq.id}
                            cardType="update"
                            title={faq.title}
                            defaultValues={{
                                title: faq.title,
                                description: faq.description,
                                imageFile: faq.imageFile
                            }}
                            onDelete={() => handleRemoveFaq(faq.id)}
                            onSubmit={(data: any) => handleUpdateFaq(faq.id, data)}
                        />
                    ))}

                    {!faqList.length && (
                        <div className="flex items-center flex-col gap-2">
                            <TbFolderOpen className="text-[90px] text-gray-600 animate-bounce" />
                            <p className="text-center animate-pulse pb-4">
                                هنوز هیچ بلاگی ساخته نشده است
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Blog


/* 
<div className="bg-white rounded-2xl p-4 flex flex-col gap-6">

                <section className="w-full mt-5">
                    <Input
                        isClearable
                        size="lg"
                        variant="bordered"
                        className="bg-white rounded-xl"
                        color="secondary"
                        placeholder="جستجو در مقالات..."
                        startContent={
                            <FiSearch className="text-xl" />
                        }
                    >
                    </Input>
                </section>

                <CardBox
                    title="مقاله برنامه نویسی"
                    description="یکی از بهترین فریم ورک ها برای فرانت اند نکست هست که بسیار محبوب و عای هست برای تمام دولوپرهای و ما میدانیم که بهترین جایگزین برای ری اکت هست"
                    imageFile="https://s3.thr1.sotoon.ir/blog/blog_images/img0_1366x768.jpg"
                    onDelete={() => { }}
                    onEdit={() => { }}
                />
                <CardBox
                    title="مقاله برنامه نویسی"
                    description="یکی از بهترین فریم ورک ها برای فرانت اند نکست هست که بسیار محبوب و عای هست برای تمام دولوپرهای و ما میدانیم که بهترین جایگزین برای ری اکت هست"
                    imageFile="https://s3.thr1.sotoon.ir/blog/blog_images/img0_1366x768.jpg"
                    onDelete={() => { }}
                    onEdit={() => { }}
                />
                <CardBox
                    title="مقاله برنامه نویسی"
                    description="یکی از بهترین فریم ورک ها برای فرانت اند نکست هست که بسیار محبوب و عای هست برای تمام دولوپرهای و ما میدانیم که بهترین جایگزین برای ری اکت هست"
                    imageFile="https://s3.thr1.sotoon.ir/blog/blog_images/img0_1366x768.jpg"
                    onDelete={() => { }}
                    onEdit={() => { }}
                />
            </div>

*/