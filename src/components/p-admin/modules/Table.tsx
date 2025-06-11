"use client"

import React, { useEffect, useState } from "react"
import getCookie from "@utils/getCookie"
import Pagination from "@comp_global/Pagination"
import LoadingContent from "@comp_global/LoadingContent"
import ContentTitle from "./ContentTitle"
import { TbDatabase } from "react-icons/tb"

type TableProps = {
    cols: string[],
    navbar: {
        headerTitle: string, headerIcon: React.ReactNode, onClickedBtnText: () => void, btnText: string,
    }
    contentHeader: React.ReactNode
    children: React.ReactNode,
    onActivePage: (value: number) => void,
    hasDatas: boolean,
    paginationProps: Record<string, any>,
    activeAction?: boolean,
    enableShadow?: boolean
}

const Table = ({ children, onActivePage, cols, contentHeader, enableShadow = true, navbar, hasDatas = false, paginationProps = {}, activeAction = true }: TableProps) => {

    const { btnText, headerIcon, headerTitle, onClickedBtnText } = navbar
    const [role, setRole] = useState<string>("staff")
    // Pagination Table
    const [totalPages, setTotalPages] = useState<number>(1)
    const [totalItems, setTotalItems] = useState<number>(1)
    const [size, setSize] = useState<number>(1)
    //
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [filteredChildren, setFilteredChildren] = useState<React.ReactNode[]>(React.Children.toArray(children));

    useEffect(() => {
        let infos = JSON.parse(getCookie("infos") || "");
        setRole(infos.role || "staff");
    }, []);

    useEffect(() => {
        if (role === "staff" && children) {
            const childrenArray = React.Children.toArray(children);

            const reactElements = childrenArray.filter((child): child is React.ReactElement => React.isValidElement(child));
            const updatedChildren = reactElements.map(child => {
                // Clone the child and modify its children (columns)
                const newChildren = React.Children.toArray(child.props.children).slice(0, -2);
                return React.cloneElement(child, {}, newChildren);
            });

            setFilteredChildren(updatedChildren);
        } else {
            setFilteredChildren(React.Children.toArray(children));
        }
    }, [role, children]);

    useEffect(() => {

        if (paginationProps?.page) {
            const { page, size, total, totalPages } = paginationProps
            setTotalPages(totalPages)
            setTotalItems(total)
            setSize(size)
            setCurrentPage(page)
        }
    }, [paginationProps])

    return (
        <div className={`flex items-center justify-center mb-20 ${headerTitle ? "mt-20" : ""}`}>
            <div className={`${headerTitle && enableShadow ? "box-panel" : "p-4"} w-fit overflow-auto`}>

                {
                    headerTitle
                        ?
                        <div>
                            <div className="flex flex-wrap justify-center items-center sm:justify-between gap-x-40 px-1 pt-4">
                                <ContentTitle title={headerTitle} icon={headerIcon} />
                                {
                                    btnText
                                        ?
                                        <button onClick={onClickedBtnText} className="text-[var(--primary)] bg-[var(--light-primary)] rounded px-4 py-1 mb-6">{btnText}</button>
                                        : ""
                                }
                            </div>
                            {contentHeader}
                        </div>
                        :
                        ""
                }

                <div className="flex justify-center">
                    <div className="p-2 overflow-auto">
                        <table className="overflow-hidden !w-max text-sm text-left shadow-[0_0_10px_var(--light-gray)] rounded-lg">
                            <thead>
                                <tr className="bg-[var(--blue-color)] text-lg text-[var(--foreground)]">
                                    <th scope="col" className="px-6 py-3">#</th>
                                    {
                                        role === "admin"
                                            ? cols.map((col, index) => col.length ? <th key={index} scope="col" className="px-6 py-3">{col}</th> : <th
                                                key={index}
                                                colSpan={0}
                                                style={{
                                                    display: "none", padding: 0, margin: 0, border: "none", width: 0, height: 0
                                                }}
                                            ></th>)
                                            : cols.slice(0, -1).map((col, index) => col.length ? <th key={index} scope="col" className="px-6 py-3">{col}</th> : <th
                                                key={index}
                                                colSpan={0}
                                                style={{ display: "none", padding: 0, margin: 0, border: "none", width: 0, height: 0 }}
                                            ></th>)
                                    }
                                    {
                                        activeAction && role === "admin"
                                            ? <th scope="col" className="px-6 py-3 text-center">Actions</th>
                                            : ""
                                    }
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    hasDatas
                                        ? role !== "admin"
                                            ? filteredChildren
                                            : children
                                        :
                                        (
                                            <tr>
                                                <th colSpan={12} className="p-2">
                                                    <LoadingContent
                                                        icon={<TbDatabase className="text-2xl" />}
                                                        text="Loading"
                                                        customStyleParent={"h-36"}
                                                        middleContent={true}
                                                    />
                                                </th>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {
                    totalPages > 1
                        ?
                        <Pagination
                            totalItems={totalItems}
                            itemsPerPage={size}
                            onPageChange={pageNumber => onActivePage(pageNumber)}
                            activePage={currentPage}
                        />
                        : ""
                }
            </div>
        </div >
    )
}

export default Table