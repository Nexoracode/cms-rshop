"use client"

type Props = {
    icon: React.ReactNode,
    title: string,
    subTitle: string,
}

const CustomerBoxInfo: React.FC<Props> = ({ icon, subTitle, title }) => {

    return (
        <div className="bg-slate-100 rounded-xl p-2 xs:p-4 flex-grow gap-4 flex flex-col items-center">
            <div className="flex items-center">
                {icon}{title}
            </div>
            <p className="bg-purple-300/50 text-purple-600 text-center rounded-xl w-full p-3 py-2">
                {subTitle}
            </p>
        </div>
    )
}

export default CustomerBoxInfo