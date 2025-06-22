import Link from "next/link"

type Props = {
    title: string,
    routeName: string,
    icon: React.ReactNode
}

const Item = ({ title, routeName, icon }: Props) => {

    return (
        <Link href={`/admin/${routeName}`} className="flex items-center justify-end text-md px-2 py-2 rounded-md hover:bg-green-700/5 transition hover:text-green-700">
            <span className="px-2">{title}</span>
            <div className="bg-green-700/10 text-green-700 rounded-md p-1">
                {icon}
            </div>
        </Link>
    )
}

export default Item