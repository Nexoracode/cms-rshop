
type BigTitleContentProps = {
    title: string,
    icon: React.ReactNode,
    activeClose?: boolean,
    onClickClose?: () => void
}

const ContentTitle = ({ title, icon, activeClose = false, onClickClose }: BigTitleContentProps) => {

    return (
        <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center text-[var(--primary)]">
                {icon}
                <h1 className="text-2xl sm:text-3xl ps-2">{title}</h1>
            </div>
            {
                activeClose
                    ?
                    <div onClick={onClickClose} className="rounded-md py-1 px-4 cursor-pointer bg-[rgba(241,166,166,0.3)] text-red-500 transition-global">
                        close
                    </div>
                    :
                    ""
            }
        </div>
    )
}

export default ContentTitle