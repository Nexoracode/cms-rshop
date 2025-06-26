"use client"

import { CardHeader } from "@heroui/react"

type Props = {
    icon: React.ReactNode,
    title: string,
    color: string,
}

const BoxHeader: React.FC<Props> = ({ icon, title, color }) => {

    return (
        <CardHeader className="flex gap-3 p-0 mb-3">
            <div className={`w-full rounded-md ${color} pt-3 pb-2 px-4 flex items-center justify-between`}>
                {icon}
                <p>{title}</p>
            </div>
        </CardHeader>
    )
}

export default BoxHeader