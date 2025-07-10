"use client"

type Prosp = {
    title: string,
    icon: React.ReactNode
}

const BoxInfo: React.FC<Prosp> = ({ icon, title }) => {

    return (
        <div
            className={`flex flex-col gap-1.5 items-center justify-start text-md px-2 py-3 w-28 h-24 hover:opacity-70 rounded-xl transition text-gray-700 bg-slate-50 shadow-md`}
        >
            <div className={`rounded-md p-2 text-blue-700 bg-gray-700/10`}>
                {icon}
            </div>
            <span className="px-2 truncate pt-1 text-gray-700">{title}</span>
        </div>
    )
}

export default BoxInfo