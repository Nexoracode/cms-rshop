"use client"

import React, { useEffect, useState } from "react"
import SelectBox from "@comp_global/SelectBox"
import Input from "@comp_global/Input";
//
import { PiThumbsUpDuotone, PiThumbsDownDuotone } from "react-icons/pi";

type SearchInTableProps = {
    children: React.ReactNode,
    onSearchData: (key: any, value: any) => void,
    classInLine?: string,
    selectedItem?: string,
    keysDontSelect?: string[]
}

const SearchInTable = ({ children, onSearchData, keysDontSelect, selectedItem = "", classInLine = "sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3" }: SearchInTableProps) => {

    const [value, setValue] = useState<any>(null)
    const [searchText, setSearchText] = useState<string>("")
    const [isKeyExist, setIsKeyExist] = useState<boolean>(false)

    useEffect(() => {
        const result = keysDontSelect?.length ? keysDontSelect.some(key => key === selectedItem) : false
        setIsKeyExist(result)
    }, [selectedItem])

    const searchHandler = (isOk: boolean) => isOk && onSearchData(selectedItem, value)

    return (
        <div className="w-full pb-4 mt-6">
            <p className="pb-3">Searched By</p>

            <div className="border border-[var(--light-primary)] rounded-lg p-4">
                <div className={`grid ${classInLine} gap-5`}>

                    {children}

                    {
                        selectedItem !== "all_datas"
                            ?
                            selectedItem.includes("is_")
                                ?
                                <SelectBox
                                    fields={[
                                        { id: "true", icon: <PiThumbsUpDuotone />, title: "True", custom: "text-green-600" },
                                        { id: "false", icon: <PiThumbsDownDuotone />, title: "False", custom: "text-red-600" },
                                    ]}
                                    onChoosedItem={value => setValue(value)}
                                    defaultSelectedId={"true"}
                                />
                                : !isKeyExist
                                    ? <Input min={1} onSearch={isOk => searchHandler(isOk)} onInpValue={value => setValue(value)} defaultValue={searchText} htmlFor="search" placeholder="Search Data..." search />
                                    : ""
                            : ""
                    }

                    {
                        selectedItem === "all_datas" || selectedItem.includes("is_") || isKeyExist
                            ? <button onClick={() => searchHandler(true)} className="w-full hover:opacity-70 bg-[var(--background)] rounded-lg h-12 box-inp">Start Search...</button>
                            : ""
                    }

                </div>
            </div>
        </div >
    )
}

export default SearchInTable