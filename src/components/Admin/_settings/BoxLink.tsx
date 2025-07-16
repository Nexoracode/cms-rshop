"use client"

import Link from "next/link";

type Props = {
    title: string;
    routeName: string;
    icon: React.ReactNode;
    parentStyle?: string,
    iconStyle: string,
    titleStyle?: string,
};

const BoxLink = ({ title, routeName, icon, iconStyle, parentStyle, titleStyle }: Props) => {
    return (
        <Link
            href={`/admin/${routeName}`}
            className={`flex flex-col gap-1.5 items-center flex-grow mx-auto text-md px-2 py-3 w-28 h-24 hover:opacity-70 rounded-xl transition ${parentStyle}`}
        >
            <div className={`rounded-md p-2 ${iconStyle}`}>
                {icon}
            </div>
            <span className={`px-2 truncate pt-1 ${titleStyle}`}>{title}</span>
        </Link>
    );
};

export default BoxLink;
