"use client"

import { Button } from "@heroui/react"

type Props = {
    icon: React.ReactNode,
    title: string,
    onClick: () => void
}

const OptionBox: React.FC<Props> = ({ icon, onClick, title }) => {

    return (
        <Button color="success" className="flex-grow" variant="flat" startContent={icon} onPress={onClick}>
            {title}
        </Button>
    )
}

export default OptionBox