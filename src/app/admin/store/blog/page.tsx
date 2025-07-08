"use client"

import CardBox from "@/components/Admin/_products/__create/helpers/CardBox"
import BackToPage from "@/components/Helper/BackToPage"
import { Button } from "@heroui/react"
import { useState } from "react"

const Social = () => {

    const [articles, setArticles] = useState([])

    return (
        <div className="flex flex-col gap-4">
            <BackToPage title="لیست مقالات" link="/admin/store">
                <div className="w-full pt-2">
                    <Button className="w-full" color="secondary" variant="flat">+ پست جدید</Button>
                </div>
            </BackToPage>

            <div className="bg-white rounded-2xl p-4 flex flex-col gap-6">
                <CardBox 
                    title="مقاله برنامه نویسی" 
                    description="یکی از بهترین فریم ورک ها برای فرانت اند نکست هست که بسیار محبوب و عای هست برای تمام دولوپرهای و ما میدانیم که بهترین جایگزین برای ری اکت هست"
                    imageFile="https://s3.thr1.sotoon.ir/blog/blog_images/img0_1366x768.jpg"
                    onDelete={() => {}}
                    onEdit={() => {}}
                />
                <CardBox 
                    title="مقاله برنامه نویسی" 
                    description="یکی از بهترین فریم ورک ها برای فرانت اند نکست هست که بسیار محبوب و عای هست برای تمام دولوپرهای و ما میدانیم که بهترین جایگزین برای ری اکت هست"
                    imageFile="https://s3.thr1.sotoon.ir/blog/blog_images/img0_1366x768.jpg"
                    onDelete={() => {}}
                    onEdit={() => {}}
                />
                <CardBox 
                    title="مقاله برنامه نویسی" 
                    description="یکی از بهترین فریم ورک ها برای فرانت اند نکست هست که بسیار محبوب و عای هست برای تمام دولوپرهای و ما میدانیم که بهترین جایگزین برای ری اکت هست"
                    imageFile="https://s3.thr1.sotoon.ir/blog/blog_images/img0_1366x768.jpg"
                    onDelete={() => {}}
                    onEdit={() => {}}
                />
            </div>
        </div>
    )
}

export default Social
