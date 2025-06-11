type HeaderProps = {
    title: React.ReactNode,
    subTitle: string
}

const Header = ({ title, subTitle }: HeaderProps) => {

    return (
        <div>
            <div className="mt-6 2xl:mt-8 text-2xl xxl:text-3xl font-extrabold">
                {title}
            </div>

            <div className="2xl:text-lg mt-4 xxl:mt-5 leading-6 text-[var(--primary)]">
                {subTitle}
            </div>
        </div>
    )
}

export default Header