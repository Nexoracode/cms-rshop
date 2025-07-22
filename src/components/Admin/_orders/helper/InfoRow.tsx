"use client"

type Props = {
    label: string,
    value: string,
    isActiveBg?: boolean
}

const InfoRow: React.FC<Props> = ({ isActiveBg = false, label, value }) => {

    return (
        <div className="space-y-1">
            <div className={`flex flex-col gap-2 phone:flex-row phone:gap-0 justify-between items-center rounded-md p-1 ${isActiveBg ? "bg-slate-100" : ""}`}>
                <span className="text-default-600 w-full bg-blue-100 rounded-lg p-1 pr-2 text-right">{label}</span>
                <span className="font-medium text-[13px] truncate w-full text-left">{value}</span>
            </div>
        </div>
    )
}

export default InfoRow