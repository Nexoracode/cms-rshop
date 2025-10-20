"use client"

import { Card, CardBody, CardHeader } from "@heroui/react"

type Props = {
    icon: React.ReactNode,
    title: string,
    count: string,
}

const ReportBox: React.FC<Props> = ({ count, icon, title }) => {

    return (
        <Card className="shadow-md border p-1">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-2">
                {icon}
                <p className="text-gray-600 text-[16px] sm:text-lg">{title}</p>
            </CardHeader>
            <CardBody>
                <p className="text-gray-600 text-center sm:text-end bg-purple-100 rounded-lg p-1 pl-6 text-lg">{count}</p>
            </CardBody>
        </Card>
    )
}

export default ReportBox