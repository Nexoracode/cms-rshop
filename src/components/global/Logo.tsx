import Link from "next/link"

type LogoProps = {
    to: string,
}

const Logo = ({ to}: LogoProps) => {
    return (
        <Link href={to} className="inline-block mx-auto">
            <img src="/icons/logo.png" alt="Logo" className="w-44" />
        </Link>
    )
}

export default Logo