"use client"

import { Button } from "@heroui/react";

type Props = {
    title: string,
    textBtn: string,
    onPress: () => void,
    isDisabled?: boolean
}

const HeaderAction: React.FC<Props> = ({ title, onPress, isDisabled = false, textBtn }) => {

    return (
        <div className="w-full flex items-center justify-between mt-2">
            <span className="text-gray-600 text-[13px]">{title}</span>
            <Button
                color="secondary"
                variant="light"
                onPress={onPress}
                isDisabled={isDisabled}
            >
                {textBtn}
            </Button>
        </div>
    )
}

export default HeaderAction