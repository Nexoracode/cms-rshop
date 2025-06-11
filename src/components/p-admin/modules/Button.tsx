"use client"
import { useRef } from "react"

type ButtonProps = {
    title: string,
    onClickDetected: () => void
}

const Button = ({ title, onClickDetected }: ButtonProps) => {

    const btnRef = useRef<HTMLButtonElement | null>(null)

    const handleClick = () => {
        if (btnRef.current) {
            btnRef.current.disabled = true
            onClickDetected()
            setTimeout(() => {
                btnRef.current && (btnRef.current.disabled = false)
            }, 8000)
        }
    }

    return (
        <button
            onClick={handleClick}
            className="text-[var(--black)] border disabled:opacity-40 shadow-md hover:shadow-lg bg-[var(--white-color)] font-bold text-sm rounded-md px-5 py-2 mb-2 hover:opacity-75"
            ref={btnRef}
        >
            {title}
        </button>
    )
}

export default Button