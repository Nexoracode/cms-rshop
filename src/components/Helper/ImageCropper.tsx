"use client"
import { useState, useRef } from "react"
import { Button } from "@heroui/react"
import { LuImage, LuVideo } from "react-icons/lu"

type Preview = { file: File; url: string; type: "image" | "video" }

const ImageCropper = () => {
    const [previews, setPreviews] = useState<Preview[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    const handleAdd = (type: "image" | "video") => {
        if (!inputRef.current) return
        inputRef.current.accept = type === "image" ? "image/*" : "video/*"
        inputRef.current.onchange = e => {
            const file = (e.target as any).files?.[0]
            if (!file) return

            const max = type === "image" ? 5.5 * 1024 * 1024 : 50 * 1024 * 1024
            if (file.size > max) {
                alert(`حجم فایل ${type === "image" ? "تصویر" : "ویدیو"} بیشتر از حد مجاز است`)
                return
            }

            const allowedCount = type === "image" ? 20 : 5
            const current = previews.filter(p => p.type === type).length
            if (current + 1 > allowedCount) {
                alert(`نمی‌توانید بیشتر از ${allowedCount} ${type === "image" ? "تصویر" : "ویدیو"} آپلود کنید`)
                return
            }

            const url = URL.createObjectURL(file)
            setPreviews(prev => [...prev, { file, url, type }])
        }
        inputRef.current.click()
    }

    const remove = (idx: number) => setPreviews(prev => prev.filter((_, i) => i !== idx))

    return (
        <>
            <input ref={inputRef} type="file" hidden />

            <div className="mb-4 flex flex-wrap gap-4">
                {previews.map((p, idx) => (
                    <div key={idx} className="relative w-32 h-32 border rounded-md overflow-hidden">
                        {p.type === "image" ? (
                            <img src={p.url} alt="" className="object-cover w-full h-full" />
                        ) : (
                            <video src={p.url} controls className="object-cover w-full h-full" />
                        )}
                        <button onClick={() => remove(idx)} className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-500">
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <div className="w-full flex items-center justify-center gap-8">
                <Button color="secondary" variant="ghost" className="w-full border border-dashed h-[79px] rounded-md flex-col-reverse" endContent={<LuImage className="text-2xl" />} onClick={() => handleAdd("image")}>
                    افزودن تصویر
                </Button>
                <Button color="secondary" variant="ghost" className="w-full border border-dashed h-[79px] rounded-md flex-col-reverse" endContent={<LuVideo className="text-2xl" />} onClick={() => handleAdd("video")}>
                    افزودن ویدیو
                </Button>
            </div>
        </>
    )
}

export default ImageCropper
