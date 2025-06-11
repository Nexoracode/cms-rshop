"use client"

import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { getFile } from "@utils/helper";
import { FiUpload } from "react-icons/fi";

type UploaderPhotoProps = {
    defaultImg: null | string,
    onSelectedFile: (file: File) => void
}

const UploaderPhoto = ({ defaultImg = null, onSelectedFile }: UploaderPhotoProps) => {

    const [fileData, setFileData] = useState<{ url: string; type: string } | null>(null);

    useEffect(() => {
        if (defaultImg)
            getFile(defaultImg).then(res => setFileData({ type: res?.type || "", url: res?.url || "" }))
        else setFileData({ type: "", url: "" })
    }, [defaultImg])

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
        },
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            const fileUrl = URL.createObjectURL(file);
            onSelectedFile(file)
            setFileData({ type: file.type, url: fileUrl })
        },
        maxFiles: 1,
    });


    return (
        <div className="relative w-32 h-32">
            {
                fileData?.url
                    ?
                    <div className="group relative w-full transition-all duration-300">
                        <img
                            src={fileData.url}
                            alt="Preview"
                            className="w-full h-full rounded-2xl object-cover transition-all duration-300"
                        />
                        <div
                            {...getRootProps()}
                            className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            <FiUpload className="text-white text-2xl" />
                        </div>
                    </div>
                    :
                    <div
                        {...getRootProps()}
                        className="w-full h-full rounded-2xl border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer transition-all duration-300"
                    >
                        <input {...getInputProps()} className='!rounded-sm' />
                        <FiUpload className="animate-bounce text-gray-400 text-2xl" />
                    </div>
            }
        </div>
    )
}

export default UploaderPhoto