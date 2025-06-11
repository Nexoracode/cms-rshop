import Link from "next/link"
import { usePathname } from "next/navigation"

type ProfileItemProps = {
    children: React.ReactNode,
    title: string,
    to?: string,
}

const ProfileItem = ({ children, title, to }: ProfileItemProps) => {
    const pathname = usePathname()

    return (
        <Link href={to ? to : "/"} className={`${pathname === to ? "text-[var(--primary)]" : ""} flex items-center pt-5 hover:animate-pulse transition-global`}>
            {children}
            <p className="ps-2">{title}</p>
        </Link>
    )
}

export default ProfileItem