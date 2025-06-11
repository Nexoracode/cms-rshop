"use client"
import { useEffect, useState } from "react";
import { PiSunDimBold } from "react-icons/pi";
import { RxMoon } from "react-icons/rx";

const DarkMode = () => {

    const [statusDarkMode, setStatusDarkMode] = useState<boolean>(false)

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme && theme === "dark") setStatusDarkMode(true)
    }, [])

    useEffect(() => {
        if (!statusDarkMode) {
            localStorage.setItem("theme", "light")
            document.body.classList.remove("dark-mode");
        } else {
            localStorage.setItem("theme", "dark")
            document.body.classList.add("dark-mode");
        }
    }, [statusDarkMode])

    return (
        <div onClick={() => setStatusDarkMode(prev => !prev)}>
            {statusDarkMode
                ?
                <div>
                    <RxMoon className="svg-panel moon animate-pulse" />
                </div>
                :
                <div className="animate-spin" style={{ animationDuration: "8s" }}>
                    <PiSunDimBold className="svg-panel sun" />
                </div>
            }
        </div>
    )
}

export default DarkMode