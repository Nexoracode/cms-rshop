
type LoadingContentProps = {
    icon?: React.ReactNode,
    text: string,
    customStyleParent?: string,
    middleContent?: boolean
}

const LoadingContent = ({ icon, text, customStyleParent, middleContent = false }: LoadingContentProps) => {

    return (
        <div className={`${customStyleParent} h-12 flex ${middleContent ? "flex-col items-center justify-center !pt-10" : "justify-between"} bg-[var(--background)] rounded-lg p-2 animate-pulse box-inp select-none`}>
            <div className="flex items-center">
                <div className="text-2xl ps-1">
                    {icon}
                </div>
                <p className="ps-1 text-md">{text}...</p>
            </div>
            <div className="flex items-center">
                <p className="pe-4 animate-spin text-xl"> . </p>
            </div>
        </div>
    )
}

export default LoadingContent