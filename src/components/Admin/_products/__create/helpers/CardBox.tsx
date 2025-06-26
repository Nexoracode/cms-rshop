"use client"

import { Button, Card, CardBody } from "@heroui/react"
import { TbEdit } from "react-icons/tb"
import { TiDeleteOutline } from "react-icons/ti"

type Props = {
    onDelete: () => void,
    onEdit: () => void,
    imageFile: any,
    title: string,
    description: string
}

const CardBox: React.FC<Props> = ({ onDelete, onEdit, imageFile, title, description }) => {

    return (
        <Card className="shadow-md border">
            <CardBody className="flex flex-col gap-4 p-2 py-1">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-start">
                        {imageFile && (
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt="preview"
                                className="rounded-lg w-24 h-16 object-cover border"
                            />
                        )}
                        <div>
                            <p>{title}</p>
                            <p className="text-gray-600 mt-2">{description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button size="sm" className="text-xl bg-danger-100 text-danger-600" radius="md" onPress={onDelete}>
                            <TiDeleteOutline />
                        </Button>
                        <Button size="sm" className="text-xl bg-green-100 text-green-600" radius="md" onPress={onEdit}>
                            <TbEdit />
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardBox