"use client"

type Props = {
    icon: React.ReactNode,
    title: string,
    subTitle: string,
}

const CustomerBoxInfo: React.FC<Props> = ({ icon, subTitle, title }) => {

    return (
        <div className="bg-slate-100 rounded-xl p-2 flex-grow gap-3 flex flex-col items-center">
            <div className="flex items-center">
                {icon}{title}
            </div>
            <p className="bg-purple-300/50 text-purple-600 text-center rounded-xl w-full p-1 py-1.5">
                {subTitle}
            </p>
        </div>
    )
}

export default CustomerBoxInfo