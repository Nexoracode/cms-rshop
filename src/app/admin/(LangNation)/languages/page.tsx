"use client"

import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
////? Utils
import { sendRequestWithLoading } from "@utils/configs/axios";
import { scrollToTop } from "@utils/helper";
////? Components
import AcceptCheckbox from "@/components/auth/AcceptCheckbox";
// Globals
import SelectBox from "@comp_global/SelectBox";
import Input from "@comp_global/Input";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import RowTable from "@comp_p-admin/modules/RowTable";
import Table from "@comp_p-admin/modules/Table";
////? Icons
import { TbEdit, TbDatabaseSearch, TbHttpDelete, } from "react-icons/tb";
import { LuTextCursorInput } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
////? Types
import { EditType } from "@comp_types/Types"
type Language = { id?: number, title?: string, is_deleted?: boolean }
type DataType = keyof Omit<Language, "id"> | "all_datas"
type Search = { key: DataType, value: any }
let lang: string = ""

const Languages = () => {

    const [languageInfos, setLanguageInfos] = useState<Language>({ id: 1, title: "", is_deleted: false })
    const [editType, setEditType] = useState<EditType>("NULL")
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    // SearchInTable
    const [search, setSearch] = useState<Search>({ key: "all_datas", value: null })

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getLanguagesHandler()
    }, [search.value])

    useEffect(() => {
        getLanguagesHandler()
    }, [activePage])

    //! Content DataType Table ( Show In DOM )
    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setLanguageInfos({ id: 1, title: "", is_deleted: false })
    }

    const reRenderTable = (res: any) => {
        if (res?.data?.data) {
            getLanguagesHandler()
            closeOnBoxHandler()
        }
    }

    //! Get
    const getLanguagesHandler = async () => {

        const { key, value } = search
        const filterTable: Record<string, any> = {}
        if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
        else if (key !== "all_datas") filterTable[key] = value

        const res = await sendRequestWithLoading(`/admin/locales/language?page=${activePage}`, filterTable, "post", "Getting Language", false, false)
        if (res?.data?.data) {
            const { lans, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(lans)
        }
    }

    //! Create
    const AddNewLanguageHandler = async () => {
        delete languageInfos.id
        delete languageInfos.is_deleted
        const res = await sendRequestWithLoading(`/admin/locales/language/create`, languageInfos, "post", "Adding New Language", false, false)
        reRenderTable(res)
    }

    //! Update
    const updateLanguageInfosHandler = async () => {
        let id = languageInfos.id
        delete languageInfos.id
        lang === languageInfos.title && delete languageInfos.title
        const res = await sendRequestWithLoading(`/admin/locales/language/${id}`, languageInfos, "put", "Update Language Information", false, false)
        reRenderTable(res)
    }

    //! Delete
    const deleteLanguageHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The language will be removed from the website!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/locales/language/${id}`, {}, "delete", "Deleting Language", false, false)
                res?.data?.data && getLanguagesHandler()
            }
        });
    }

    return (
        <section className={`transition-all duration-500 relative right-auto left-auto ${editType === "NULL" ? "-mt-8" : ""}`}>
            <WrapperContents
                editType={editType}
                onCloseOnBoxHandler={() => closeOnBoxHandler()}
                onUpdateDescription={() => { }}
                defaultDescription={""}
                conditionForDisabledBtn={languageInfos.title && languageInfos.title.length >= 3 && editType !== "NULL" ? false : true}
                widthBox={"md:w-[530px]"}
                onUpdateContent={editType === "UPDATE" ? updateLanguageInfosHandler : AddNewLanguageHandler}
                hiddenContentsForCreate={[1]}
                hiddenContentsForUpdate={[-1]}
                totalContent={
                    <>
                        <Input defaultValue={languageInfos.title} onInpValue={val => setLanguageInfos(prev => ({ ...prev, title: val }))} htmlFor="title" lablel="Title" placeholder="Language Name..." />
                        <div className="is-deleted mt-6">
                            <AcceptCheckbox onRememberChange={val => setLanguageInfos(prev => ({ ...prev, is_deleted: val }))} defaultChecked={languageInfos.is_deleted} clearInp={!languageInfos.is_deleted} htmlForID="checked_is-deleted" title="Softly delete a language" />
                        </div>
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["Title", "Is Deleted", ""]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Languages List",
                            headerIcon: <IoLanguage className="text-4xl" />,
                            btnText: "Add",
                            onClickedBtnText: () => {
                                closeOnBoxHandler()
                                setEditType("CREATE")
                                scrollToTop()
                            }
                        }}
                        contentHeader={
                            <div className="py-4">
                                <SearchInTable
                                    selectedItem={search.key}
                                    onSearchData={(key, value) => setSearch({ key, value })}
                                    classInLine={`sm:gap-x-4 md:grid-cols`}
                                >
                                    <div>
                                        <SelectBox
                                            fields={[
                                                { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                                { id: "title", icon: <LuTextCursorInput />, title: "Title" },
                                                { id: "is_deleted", icon: <MdOutlineDelete />, title: "Is Deleted", custom: "text-red-600" },
                                            ]}
                                            onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                            defaultSelectedId={"all_datas"}
                                        />
                                    </div>
                                </SearchInTable>
                            </div>
                        }
                    >
                        {
                            dataList && dataList.length
                                ?
                                dataList.map(items => {
                                    const { id, title, is_deleted, } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(languageInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />
                                            <RowTable title={title} />
                                            <RowTable contentMiddle={true}>
                                                <TbHttpDelete className={`table_row text-3xl cursor-default ${is_deleted ? "text-red-600" : "opacity-30"}`} />
                                            </RowTable>
                                            <td className="p-4 flex justify-center space-x-4">
                                                <TbEdit
                                                    onClick={() => {
                                                        lang = title
                                                        setLanguageInfos({ id, title, is_deleted })
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                    }}
                                                    className="table_row cursor-pointer text-green-700"
                                                />
                                                <MdOutlineDelete onClick={() => deleteLanguageHandler(id)} className="table_row cursor-pointer text-red-600" />
                                            </td>
                                            <td colSpan={0} style={{ display: "none", padding: 0, margin: 0, border: "none", width: 0, height: 0 }}></td>
                                        </tr>
                                    )
                                })
                                : ""
                        }
                    </Table>
                }
            />
        </section>
    )
}

export default Languages