"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@heroui/react"
import { LuImage, LuVideo, LuPin } from "react-icons/lu"

interface PreviewMeta {
  file: File
  pinned: boolean
}

interface ImageCropperProps {
  /** Initial previews, if any */
  initialPreviews?: PreviewMeta[]
  /** Called whenever the previews array is updated (add/remove/pin) */
  onPreviewsChange: (previews: PreviewMeta[]) => void
}

const ImageCropper: React.FC<ImageCropperProps> = ({ initialPreviews = [], onPreviewsChange }) => {
  const [previews, setPreviews] = useState<PreviewMeta[]>(initialPreviews)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onPreviewsChange(previews)
  }, [])

  const updatePreviews = (newList: PreviewMeta[]) => {
    setPreviews(newList)
    onPreviewsChange(newList)
  }

  const handleAdd = (type: "image" | "video") => {
    if (!inputRef.current) return
    inputRef.current.accept = type === "image" ? ".jpg,.jpeg,.png,.webp" : ".mp4"
    inputRef.current.multiple = type === "image"
    inputRef.current.onchange = e => {
      const files = (e.target as any).files as FileList
      if (!files?.length) return

      const max = type === "image" ? 5.5 * 1024 * 1024 : 50 * 1024 * 1024
      const allowedCount = type === "image" ? 20 : 5
      const currentCount = previews.length

      const toAdd: PreviewMeta[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.size > max) {
          alert(`فایل ${file.name} بیشتر از حد مجاز است`)
          continue
        }
        if (currentCount + toAdd.length >= allowedCount) {
          alert(`حد مجاز ${allowedCount} ${type === "image" ? "تصویر" : "ویدیو"} رد شد`)
          break
        }
        toAdd.push({ file, pinned: false })
      }

      updatePreviews([...previews, ...toAdd])
      inputRef.current!.value = ''
    }
    inputRef.current.click()
  }

  const pin = (idx: number) => {
    const newList = previews
      .map((p, i) => ({ ...p, pinned: i === idx }))
      .sort((a, b) => Number(b.pinned) - Number(a.pinned))
    updatePreviews(newList)
  }

  const remove = (idx: number) => {
    const newList = previews.filter((_, i) => i !== idx)
    updatePreviews(newList)
  }

  return (
    <>
      <input ref={inputRef} type="file" hidden />

      <div className="mb-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {previews.map((p, idx) => {
          const url = URL.createObjectURL(p.file)
          const type = p.file.type.startsWith("image") ? "image" : "video"

          return (
            <div key={idx}
              className="relative group w-28 h-28 border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              onClick={() => type === "image" && pin(idx)}>
              {type === "image" ? (
                <img src={url} alt="" className="object-cover w-full h-full cursor-pointer" />
              ) : (
                <video src={url} className="object-cover w-full h-full" muted />
              )}
              <button onClick={e => { e.stopPropagation(); remove(idx) }}
                className="absolute top-1 right-1 bg-white rounded-full px-1.5 hover:bg-red-200 text-red-500 opacity-0 group-hover:opacity-100 transition">
                ×
              </button>
              {p.pinned && (
                <LuPin className="absolute top-1 left-1 bg-white rounded-full p-1 text-2xl -rotate-45" />
              )}
            </div>
          )
        })}
      </div>

      <div className="w-full flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <LuImage className="text-4xl" style={{ fontSize: "40px" }} />
          <Button color="secondary" variant="ghost"
            className="w-1/2 border border-dashed py-4 rounded-md flex-col-reverse"
            onPress={() => handleAdd("image")}>
            افزودن تصویر
          </Button>
        </div>
        <Button color="secondary" variant="ghost"
          className="w-1/2 border border-dashed h-[60px] rounded-md flex-col-reverse"
          endContent={<LuVideo className="text-2xl" />}
          onPress={() => handleAdd("video")}>
          افزودن ویدیو
        </Button>
      </div>
    </>
  )
}

export default ImageCropper;