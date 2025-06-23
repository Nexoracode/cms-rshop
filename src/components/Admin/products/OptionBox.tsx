"use client"

import { Button } from "@heroui/react"

type Props = {
    icon: React.ReactNode,
    title: string,
    onClick: () => void
}

const OptionBox: React.FC<Props> = ({ icon, onClick, title }) => {

    return (
        <div onClick={onClick}>
            <Button color="secondary" variant="light" endContent={icon}>
                {title}
            </Button>
        </div>
    )
}

export default OptionBox