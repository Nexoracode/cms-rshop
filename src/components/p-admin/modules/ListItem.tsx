"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type ListItemProps = {
    children: React.ReactNode;
    title?: string;
    baseRoute?: string,
    endRoute: string,
    onIsRoute?: (isRoute: boolean) => void
};

const ListItem = ({ children, title, baseRoute = "admin", endRoute, onIsRoute }: ListItemProps) => {

    const pathname = usePathname();
    const [clicked, setClicked] = useState<boolean>(false)
    const [isAcive, setIsAcive] = useState<boolean>(false)

    useEffect(() => {
        onIsRoute && onIsRoute(false)
    }, [])

    useEffect(() => {        
        if (clicked) {
            setIsAcive(false)
        } else {
            setClicked(false)
            if (endRoute && pathname === `/${baseRoute}/${endRoute}`) {
                setIsAcive(true)
            } else {
                setIsAcive(false)
            }
        }
    }, [pathname, clicked])

    const clickHandler = (route: string) => {
        if (onIsRoute) {
            if (route.length) {
                onIsRoute(true)
                setIsAcive(true)
                setClicked(false)
            } else {
                onIsRoute(false)
                setIsAcive(false)
                setClicked(true)
            }
        }
    }

    return (
        <>
            {
                endRoute || !clicked
                    ?
                    <Link href={`/${baseRoute}/${endRoute}`} onClick={() => clickHandler(endRoute)}>
                        <div className={`route-list flex items-center ${isAcive && !clicked ? "route-list-active" : ""}`}>
                            {children}
                            <p className="ps-2">{title}</p>
                        </div>
                    </Link>
                    :
                    <div onClick={() => clickHandler(endRoute)}>
                        <div className={`route-list ${clicked ? "route-list-active" : "flex items-center"}`}>
                            {children}
                            <p className="ps-2">{title}</p>
                        </div>
                    </div>
            }
        </>
    );
};

export default ListItem;
//e.currentTarget.classList.add("route-list-active")