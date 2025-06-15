"use client"

import { useRef } from "react"

type AuthButtonProps = {
    title: string,
    disable: boolean,
    onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const AuthButton = ({ title, disable, onClickHandler }: AuthButtonProps) => {

    const btnRef = useRef<HTMLButtonElement>(null)

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClickHandler(e)
        btnRef.current && (btnRef.current.disabled = true)
        setTimeout(() => btnRef.current && (btnRef.current.disabled = false), 8000)
    }

    return (
        <button
            onClick={clickHandler}
            disabled={disable}
            className={`bg-(--primary) mt-4 inline-flex items-center justify-center whitespace-nowrap text-white w-full h-11 rounded-md px-[18px] py-[10px] z-40 ${!disable ? "cursor-pointer" : ""}`}
            ref={btnRef}
        >
            {title}
        </button>
    )
}

export default AuthButton