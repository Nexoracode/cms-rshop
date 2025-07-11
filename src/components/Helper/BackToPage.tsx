"use client"

import { Button } from "@heroui/react"
import Link from "next/link"
import { MdOutlineArrowBackIos } from "react-icons/md"

type Props = {
    title: string,
    link: string,
    children?: React.ReactNode,
    onClick?: () => void
}

const BackToPage: React.FC<Props> = ({ title, link, children, onClick }) => {

    return (
        <header className={`flex items-center ${children ? "justify-between" : "justify-start"}`}>
            <Button variant="flat" type="button">
                <Link href={link} className="flex items-center gap-2" onClick={onClick}>
                    <MdOutlineArrowBackIos className="text-lg rotate-180" />
                    <span>{title}</span>
                </Link>
            </Button>
            <div>
                {children}
            </div>
        </header>
    )
}

export default BackToPage