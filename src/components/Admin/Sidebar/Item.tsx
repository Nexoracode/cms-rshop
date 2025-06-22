import Link from "next/link";

type Props = {
    title: string;
    routeName: string;
    icon: React.ReactNode;
    parentStyle: string,
    iconStyle: string
};

const Item = ({ title, routeName, icon, iconStyle, parentStyle }: Props) => {
    return (
        <Link
            href={`/admin/${routeName}`}
            className={`flex items-center justify-end text-md px-2 py-2 rounded-md transition ${parentStyle}`}
        >
            <span className="px-2">{title}</span>
            <div className={`rounded-md p-1 ${iconStyle}`}>
                {icon}
            </div>
        </Link>
    );
};

export default Item;
