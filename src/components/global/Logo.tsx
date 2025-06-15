import Link from "next/link"

type LogoProps = {
    to: string,
    style?: string
}

const Logo = ({ to, style }: LogoProps) => {
    return (
        <Link href={to} className="inline-block mx-auto">
            <img src="/icons/logo.png" alt="Logo" className={style ? style : "w-38 xxl:w-44"} />
        </Link>
    )
}

export default Logo