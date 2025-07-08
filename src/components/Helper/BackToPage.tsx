"use client"

import { Button } from "@heroui/react"
import Link from "next/link"
import { MdOutlineArrowBackIos } from "react-icons/md"

type Props = {
    title: string,
    link: string,
}

const BackToPage: React.FC<Props> = ({ title, link }) => {

    return (
        <header className="flex items-center justify-start">
            <Button variant="flat" type="button">
                <Link href={link} className="flex items-center gap-2">
                    <MdOutlineArrowBackIos className="text-lg rotate-180" />
                    <span>{title}</span>
                </Link>
            </Button>
        </header>
    )
}

export default BackToPage