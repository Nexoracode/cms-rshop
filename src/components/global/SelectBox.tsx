"use client"

import { useState, useRef, useEffect } from "react"
import ClickTracker from "./ClickTracker"
import { TiTick } from "react-icons/ti";
import { FaSort } from "react-icons/fa6";
import LoadingContent from "./LoadingContent";

type fieldVal = { id: string | number, icon: any, title: any, custom?: string }

type SelectBoxProps = {
    label?: string,
    fields: fieldVal[],
    onChoosedItem: (value: string | number) => void,
    defaultSelectedId: string | number,
    wordsUppercase?: boolean,
    selectedItemIcon?: React.ReactNode,
    activeSearch?: boolean,
    isLoading?: boolean
}

const SelectBox = ({ label = "", fields, onChoosedItem, isLoading = false, defaultSelectedId, wordsUppercase = false, selectedItemIcon, activeSearch = false }: SelectBoxProps) => {

    const [isActiveBox, setIsActiveBox] = useState<boolean>(false);
    const [chooseItem, setChooseItem] = useState<fieldVal | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredFields, setFilteredFields] = useState<fieldVal[]>(fields);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const itemFiltered = fields.find(item => item.id === defaultSelectedId);
        if (itemFiltered) {
            setChooseItem(itemFiltered);
            onChoosedItem(itemFiltered.id);
        }
    }, [defaultSelectedId]);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredFields(fields);
        } else {
            const matchedFields = fields.filter(item => item.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
            const unmatchedFields = fields.filter(item => !item.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
            setFilteredFields([...matchedFields, ...unmatchedFields]);
        }
    }, [searchQuery, fields]);

    const handleItemClick = (item: fieldVal) => {
        setChooseItem(item);
        setIsActiveBox(false);
        setSearchQuery("");
        onChoosedItem(item.id);
    };

    const renderHighlightedTitle = (title: string, query: string) => {
        if (!query) return title;

        let matchIndex = 0;
        let isMatching = true;

        return (
            <>
                {title.split('').map((char, index) => {
                    if (isMatching && matchIndex < query.length && char.toLowerCase() === query[matchIndex].toLowerCase()) {
                        matchIndex++;
                        return <span key={index} className="text-[var(--primary)]">{char}</span>;
                    } else if (matchIndex < query.length) {
                        isMatching = false;
                    }
                    return <span key={index}>{char}</span>;
                })}
            </>
        );
    };

    return (
        <>
            <div ref={selectRef} className={`${label ? "mt-5" : "mt-0"} w-full min-w-[210px]`}>

                {
                    label
                        ? <label htmlFor={label} className="block tracking-wide font-bold mb-3">{label}</label>
                        : ""
                }
                {
                    !isLoading
                        ?
                        <div className="relative">

                            <button onClick={() => setIsActiveBox(prev => !prev)} className="flex items-center justify-between w-full min-h-12 bg-[var(--background)] rounded-lg px-3 box-inp text-left">
                                <span className="flex items-center">
                                    <div className={`text-2xl ${chooseItem?.custom || ""}`}>
                                        {chooseItem?.icon || selectedItemIcon || ""}
                                    </div>
                                    <span className={`${wordsUppercase ? "uppercase" : ""} ps-2 text-sm ${chooseItem?.custom || ""}`}>
                                        {chooseItem?.title || "Select"}
                                    </span>
                                </span>
                                <FaSort className="text-sm" />
                            </button>

                            <div onMouseLeave={() => setIsActiveBox(false)} className={`${isActiveBox ? "visible opacity-100" : "invisible opacity-0"} w-full absolute z-50 transition-global`}>
                                <ul className={`${activeSearch && filteredFields.length >= 10 ? "rounded-t-lg" : "rounded-lg"} mt-1 w-full max-h-56 overflow-y-auto bg-[var(--background)] box-inp py-1`}>
                                    {filteredFields.map(item => (
                                        <li
                                            key={item.id}
                                            onClick={() => handleItemClick(item)}
                                            className={`h-10 flex items-center justify-between px-3 relative cursor-pointer select-none hover:opacity-70 transition-global`}
                                        >
                                            <span className="flex items-center">
                                                <div className={`text-2xl ${item.custom || ""}`}>
                                                    {item.icon || ""}
                                                </div>
                                                <span className={`${wordsUppercase ? "uppercase" : ""} ps-2 text-sm ${item.custom || ""}`}>
                                                    {renderHighlightedTitle(item.title, searchQuery)}
                                                </span>
                                            </span>
                                            {chooseItem?.id === item.id && <TiTick className="text-2xl text-[var(--primary)]" />}
                                        </li>
                                    ))}
                                </ul>
                                {activeSearch && filteredFields.length >= 10 && (
                                    <input
                                        type="text"
                                        placeholder="Search Word..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-12 px-3 rounded-b-lg"
                                    />
                                )}
                            </div>

                        </div>
                        :
                        <LoadingContent
                            icon={selectedItemIcon}
                            text="Loading"
                        />
                }

            </div>

            <ClickTracker targetRef={selectRef} onClickDetected={() => {
                setIsActiveBox(false);
                setSearchQuery("");
            }} />
        </>
    );
};

export default SelectBox;