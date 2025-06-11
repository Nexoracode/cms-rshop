"use client"
import React, { useEffect, useState } from "react";

const getThemeSite: React.FC = () => {
    const [client, setClient] = useState<boolean>(false)

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme) (theme === "dark") && document.body.classList.add("dark-mode");
        else localStorage.setItem("theme", "light")
    }, [client])

    return null
}

export default getThemeSite