"use client"

import CardBox from "@/components/Admin/_products/__create/helpers/CardBox"
import BackToPage from "@/components/Helper/BackToPage"
import { Button, Input } from "@heroui/react"
import { useState } from "react"
import { FiSearch } from "react-icons/fi"

const Blog = () => {

    const [articles, setArticles] = useState([])

    return (
        <div className="flex flex-col gap-4">
            <BackToPage title="لیست مقالات" link="/admin/store">
                <div className="w-full pt-2">
                    <Button className="w-full" color="secondary" variant="flat">+ پست جدید</Button>
                </div>
            </BackToPage>

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
        </div>
    )
}

export default Blog
