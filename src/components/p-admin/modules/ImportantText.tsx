"use client"

type ImportantTextProps = {
    text?: string,
    id?: string,
    idHover?: string,
    bgColor: string,
    isTextImportant?: boolean
}

const ImportantText = ({ idHover = "", text = "", id = "", bgColor = "", isTextImportant = false }: ImportantTextProps) => {
    return (
        isTextImportant
            ?
            <div className="rounded text-white" style={{ backgroundColor: bgColor }}>
                <span title={idHover} className="rounded px-1" style={{ backgroundColor: bgColor }}>{id}</span>
                <span className="rounded px-1 ms-2" style={{ backgroundColor: bgColor }}>{text}</span>
            </div>
            : !text
                ? <span title={idHover} className="text-white rounded px-1" style={{ backgroundColor: bgColor }}>{id}</span>
                :
                <div>
                    <span title={idHover} className="rounded px-1" style={{ backgroundColor: bgColor }}>{id}</span>
                    <span className="ms-2">{text}</span>
                </div>
    )
}

export default ImportantText