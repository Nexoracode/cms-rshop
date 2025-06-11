"use client"

import { useEffect, useRef, useState } from "react"
import { getFile } from "@utils/helper"
import ClickTracker from "./ClickTracker"

type PreviewPhotoProps = {
    getPhoto: string | null,
    onClose: () => void
}

const PreviewPhoto = ({ getPhoto = null, onClose }: PreviewPhotoProps) => {

    const [photo, setPhoto] = useState<any>(null);
    const imgRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        getPhoto && getPictureHandler(getPhoto)
    }, [getPhoto])

    const getPictureHandler = (path: string) => getFile(path).then(res => setPhoto(res?.url))

    return (
        <>
            <div className={`z-50 !w-full !h-screen bg-[var(--light-gray)] fixed inset-0 flex items-center justify-center transition-all duration-500 ${photo ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <img ref={imgRef} src={photo} alt="preview" className="rounded-2xl min-w-[300px] cursor-none max-w-[600px]" />
            </div>

            <ClickTracker
                targetRef={imgRef}
                onClickDetected={() => {
                    setPhoto(null)
                    onClose()
                }}
            />
        </>
    )
}

export default PreviewPhoto