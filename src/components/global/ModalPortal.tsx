"use client"
import { createPortal } from "react-dom"

type ModalPortalProps = {
    children: React.ReactNode
}

const ModalPortal = ({ children }: ModalPortalProps) => {

    return createPortal(
        <section className="!z-[1000]">{children}</section>,
        document.body
    )
}

export default ModalPortal