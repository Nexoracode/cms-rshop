"use client"

import { CardHeader } from "@heroui/react"

type Props = {
    icon: React.ReactNode,
    title: string,
    color: string,
    textSize?: string
}

const BoxHeader: React.FC<Props> = ({ icon, title, color, textSize }) => {

    return (
        <CardHeader className="flex gap-3">
            <div className={`w-full rounded-xl ${color} py-2 px-4 flex items-center justify-between`}>
                <p className={`${textSize ? textSize : "text-[15px]"} leading-7`}>{title}</p>
                {icon}
            </div>
        </CardHeader>
    )
}

export default BoxHeader