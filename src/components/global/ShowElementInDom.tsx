"use client"
import { useEffect, useState } from "react"

type ShowElementInDomProps = {
    size?: number,
    browserWidth?: boolean,
    children: React.ReactNode
}

const ShowElementInDom = ({ size = 992, browserWidth = true, children }: ShowElementInDomProps) => {

    const [client, setClient] = useState(false)
    const [showElementInDom, setShowElementInDom] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [client])

    useEffect(() => {
        
        const resizeHandler = () => {

            if (browserWidth)
                if (window.innerWidth <= size)
                    setShowElementInDom(false)
                else
                    setShowElementInDom(true)

            else
                if (window.innerHeight <= size)
                    setShowElementInDom(false)
                else
                    setShowElementInDom(true)

        }
        resizeHandler()
        window.addEventListener("resize", resizeHandler)
        return () => window.removeEventListener("resize", resizeHandler)

    }, [client])


    return (
        <>
            {
                showElementInDom
                    ?
                    children
                    :
                    ""
            }
        </>
    )
}

export default ShowElementInDom