import Link from "next/link"

type LogoProps = {
    to: string,
    customStyle?: string
}

const Logo = ({ to, customStyle = "" }: LogoProps) => {
    return (
        <Link href={to} className="inline-block mx-auto">
            <img src="/icons/logo.png" alt="Logo" className="w-44" />
        </Link>
    )
}

export default Logo