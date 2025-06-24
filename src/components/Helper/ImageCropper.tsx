"use client"

import { Button } from "@heroui/react"
import { LuImage, LuVideo } from "react-icons/lu";

const ImageCropper = () => {

    const style = "w-full border border-dashed border-[var(--primary)] h-[79px] rounded-md flex-col-reverse"

    return (
        <div className="w-full flex items-center justify-center gap-8">
            <Button color="secondary" variant="ghost" className={style} endContent={<LuVideo className="text-2xl" />}>
                افزودن ویدیو
            </Button>
            <Button color="secondary" variant="ghost" className={style} endContent={<LuImage className="text-2xl" />}>
                افزودن تصویر
            </Button>
        </div>
    )
}

export default ImageCropper