"use client"

type Props = {
    label: string,
    value: string,
    isActiveBg?: boolean
}

const InfoRow: React.FC<Props> = ({ isActiveBg = false, label, value }) => {

    return (
        <div className="space-y-1">
            <div className={`flex justify-between rounded-md p-2 ${isActiveBg ? "bg-slate-100" : ""}`}>
                <span className="text-default-600">{label}</span>
                <span className="font-medium text-[13px] truncate w-full max-w-[200px]">{value}</span>
            </div>
        </div>
    )
}

export default InfoRow