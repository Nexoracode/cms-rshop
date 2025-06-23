"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    title: string;
    routeName: string;
    icon: React.ReactNode;
    parentStyle: string,
    iconStyle: string,
    active: string
};

const Item = ({ title, routeName, icon, iconStyle, parentStyle, active }: Props) => {
    const pathname = usePathname()
    return (
        <Link
            href={`/admin/${routeName}`}
            className={`flex items-center justify-end text-md px-2 py-2 rounded-md transition ${parentStyle} ${pathname.includes(routeName) ? active : ""}`}
        >
            <span className="px-2">{title}</span>
            <div className={`rounded-md p-1 ${iconStyle}`}>
                {icon}
            </div>
        </Link>
    );
};

export default Item;
