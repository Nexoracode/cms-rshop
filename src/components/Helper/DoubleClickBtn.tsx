"use client"

import { Button } from "@heroui/react"
import { useRef, useState } from "react"

type Props = {
    color?: "danger" | "default" | "primary" | "secondary" | "success" | "warning",
    variant?: "flat" | "bordered" | "ghost" | "light" | "shadow" | "solid",
    size?: "sm" | "md" | "lg",
    className?: string,
    startContent?: React.ReactNode,
    isActiveDoubleClick?: boolean,
    onPress: () => void,
    textBtn: string,
    isDisabled?: boolean
}

const DoubleClickBtn: React.FC<Props> = ({ className = "", color = "default", size = "md", startContent = "", variant = "flat", isActiveDoubleClick = false, onPress, textBtn, isDisabled: isDisabledBtn = false }) => {

    const [textButton, setTextButton] = useState(textBtn)
    const [isDisabled, setIsDisabled] = useState(isDisabledBtn)
    const submitedRef = useRef<boolean>(false)

    const handleDoubleClick = () => {
        setTextButton("دوباره کلیک کنید")
        setTimeout(() => {
            if (!submitedRef.current) {
                setTextButton(textBtn);
            }
        }, 3000)
    }

    const handleClick = () => {
        setTextButton("تایید شد!!")
        setIsDisabled(true)
        submitedRef.current = true;
        onPress()
    }

    const handlePress = () => {
        if (!isActiveDoubleClick || textButton === "دوباره کلیک کنید") {
            handleClick();
        } else {
            handleDoubleClick();
        }
    };

    return (
        <Button
            color={color}
            variant={variant}
            onPress={handlePress}
            size={size}
            className={`${className} ${textButton === "دوباره کلیک کنید" ? "animate-bounce" : ""}`}
            startContent={startContent}
            isDisabled={isDisabled}
        >
            {textButton}
        </Button>
    )
}

export default DoubleClickBtn