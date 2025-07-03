"use client"

import { Card, CardBody, CardHeader } from "@heroui/react"

type Props = {
    icon: React.ReactNode,
    title: string,
    count: string,
}

const ReportBox: React.FC<Props> = ({ count, icon, title }) => {

    return (
        <Card className="shadow-md bg-blue-50 px-2 py-4">
            <CardHeader className="flex items-center gap-2">
                {icon}
                <p className="text-blue-600 text-lg">{title}</p>
            </CardHeader>
            <CardBody>
                <p className="text-gray-600 bg-white rounded-lg p-1 pl-6 text-lg">{count}</p>
            </CardBody>
        </Card>
    )
}

export default ReportBox