import React from "react"

type RowTableProps = {
    title?: string,
    contentMiddle?: boolean,
    children?: React.ReactNode,
    clickOnRow?: () => void,
    customStyle?: string
}

const RowTable = ({ title, children, contentMiddle = false, clickOnRow, customStyle = "" }: RowTableProps) => {

    return (
        <>
            {
                contentMiddle
                    ?
                    <td className="py-4">
                        <div onClick={clickOnRow} className={`flex items-center justify-center ${customStyle}`}>
                            {children}
                        </div>
                    </td>

                    :
                    <td className={`px-6 py-4 font-bold whitespace-nowrap text-[1rem] ${customStyle}`} title={title}>
                        {title}
                        {
                            children ? <div className="flex items-center">{children}</div> : ""
                        }
                    </td>
            }
        </>
    )
}

export default RowTable