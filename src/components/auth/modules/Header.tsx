type HeaderProps = {
    title: React.ReactNode,
    subTitle: string
}

const Header = ({ title, subTitle }: HeaderProps) => {
    return (
        <div className="font-title mb-14 mt-10 text-center" style={{direction: "rtl"}}>
            <div className="mt-6 2xl:mt-8 text-2xl xxl:text-5xl">
                {title}
            </div>
            <div className="xxl:text-3xl mt-4 xxl:mt-5 leading-8 text-(--primary)">
                {subTitle}
            </div>
        </div>
    )
}

export default Header