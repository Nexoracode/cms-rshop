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
            className={`flex flex-col sm:flex-row items-center justify-start text-md px-2 py-2 rounded-md transition ${parentStyle} ${pathname.includes(routeName) ? active : ""}`}
        >
            <div className={`rounded-md p-1 ${iconStyle}`}>
                {icon}
            </div>
            <span className="px-2 mt-2 sm:mt-0">{title}</span>
        </Link>
    );
};

export default Item;
