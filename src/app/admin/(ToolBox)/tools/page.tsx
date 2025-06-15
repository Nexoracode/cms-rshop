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
import TextArea from "@comp_global/TextArea";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import Table from "@comp_p-admin/modules/Table";
import RowTable from "@comp_p-admin/modules/RowTable";
////? Icons
import { TbEdit, TbDatabaseSearch, TbHttpDelete, } from "react-icons/tb";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2";
import { LuTextCursorInput } from "react-icons/lu";
import { BsTextParagraph } from "react-icons/bs"
import { MdOutlineDelete } from "react-icons/md";
import { LiaToolsSolid } from "react-icons/lia";
////? Types
import { EditType, Description } from "@comp_types/Types"
type IsCorrect = Partial<{ title: boolean, type: boolean }>
type Tool = { id?: number, title: string, type: string, description?: string, is_deleted?: boolean }
type DataType = keyof Omit<Tool, "id" | "description"> | "all_datas"
type Search = { key: DataType, value: any }

const Tool = () => {

    const [toolInfos, setToolInfos] = useState<Tool>({ id: 1, title: "", type: "", description: "", is_deleted: false })
    const [toolDescription, setToolDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [isCorrectToolFields, setIsCorrectToolFields] = useState<IsCorrect>({ title: false, type: false })
    const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true)
    const [editType, setEditType] = useState<EditType>("NULL")
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    // SearchInTable
    const [search, setSearch] = useState<Search>({ key: "all_datas", value: null })

    useEffect(() => {
        if (editType === "CREATE") {
            const { title, type } = isCorrectToolFields;
            setIsActiveBtn((title && type) ? false : true)
        } else setIsActiveBtn(false)
    }, [isCorrectToolFields, editType])

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getToolsHandler()
    }, [search.value])

    useEffect(() => {
        getToolsHandler()
    }, [activePage])

    //! Content DataType Table ( Show In DOM )
    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setToolInfos({ id: 1, title: "", type: "", description: "", is_deleted: false })
        setIsCorrectToolFields({ title: false, type: false })
        setToolDescription({ id: 1, description: "", isValid: false })
        setIsActiveBtn(true)
    }

    const reRenderTable = (res: any) => {
        if (res?.data?.data) {
            getToolsHandler()
            closeOnBoxHandler()
        }
    }

    //! Get
    const getToolsHandler = async () => {

        const { key, value } = search
        const filterTable: Record<string, any> = {}
        if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
        else if (key !== "all_datas") filterTable[key] = value

        const res = await sendRequestWithLoading(`/admin/equipment/tool?page=${activePage}`, filterTable, "post", "Getting Tool", false, false)
        if (res?.data?.data) {
            const { tools, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(tools)
        }
    }

    //! Create
    const AddNewToolHandler = async () => {
        delete toolInfos.id
        delete toolInfos.is_deleted
        const res = await sendRequestWithLoading(`/admin/equipment/tool/create`, toolInfos, "post", "Adding New Tool", false, false)
        reRenderTable(res)
    }

    //! Update
    const updateToolInfosHandler = async () => {
        let id = toolInfos.id
        delete toolInfos.id
        delete toolInfos.description
        const res = await sendRequestWithLoading(`/admin/equipment/tool/${id}`, toolInfos, "put", "Update Tool Information", false, false)
        reRenderTable(res)
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/equipment/tool/${toolDescription.id}`, { description: data }, "put", "Update Description Tool", false, false)
        reRenderTable(res)
    }

    //! Delete
    const deleteToolHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The tool will be removed from the website!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/equipment/tool/${id}`, {}, "delete", "Deleting Tool", false, false)
                res?.data?.data && getToolsHandler()
            }
        });
    }

    return (
        <section className={`transition-all duration-500 relative right-auto left-auto ${editType === "NULL" ? "-mt-8" : ""}`}>
            <WrapperContents
                editType={editType}
                onCloseOnBoxHandler={() => closeOnBoxHandler()}
                onUpdateDescription={(data) => updateDescriptionHandler(data)}
                defaultDescription={toolDescription.description}
                conditionForDisabledBtn={isActiveBtn}
                onUpdateContent={editType === "UPDATE" ? updateToolInfosHandler : AddNewToolHandler}
                hiddenContentsForCreate={[2]}
                hiddenContentsForUpdate={[1]}
                totalContent={
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-4 gap-x-12">
                            <Input defaultValue={toolInfos.title} onInpValue={(val, isValid) => {
                                toolInfos.title = val;
                                setIsCorrectToolFields(prev => ({ ...prev, title: isValid }))
                            }} htmlFor="title" lablel="Title" placeholder="Tool Name..." />
                            <Input defaultValue={toolInfos.type} onInpValue={(val, isValid) => {
                                toolInfos.type = val;
                                setIsCorrectToolFields(prev => ({ ...prev, type: isValid }))
                            }} htmlFor="type" lablel="Type" placeholder="Type Name..." />
                        </div>
                        <TextArea onInpValue={val => setToolInfos(prev => ({ ...prev, description: val }))} value={toolInfos.description} placeholder="Your description to the tool" lablel="Description" htmlFor="Description" />
                        <div className="is-deleted mt-6">
                            <AcceptCheckbox onRememberChange={val => setToolInfos(prev => ({ ...prev, is_deleted: val }))} defaultChecked={toolInfos.is_deleted} clearInp={!toolInfos.is_deleted} htmlForID="checked_is-deleted" title="Softly delete a tool" />
                        </div>
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["Title", "Type", "Is Deleted", "Description"]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Tools List",
                            headerIcon: <LiaToolsSolid className="text-4xl" />,
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
                                    classInLine={`sm:gap-x-4 ${search.key.includes("is_") ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}
                                >
                                    <div>
                                        <SelectBox
                                            fields={[
                                                { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                                { id: "title", icon: <LuTextCursorInput />, title: "Title" },
                                                { id: "type", icon: <BsTextParagraph />, title: "Type" },
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
                                    const { id, title, type, description, is_deleted } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && toolDescription.id === id) || (toolInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />
                                            <RowTable title={title} />
                                            <RowTable title={type} />
                                            <RowTable contentMiddle={true}>
                                                <TbHttpDelete className={`table_row cursor-default text-3xl ${is_deleted ? "text-red-600" : "opacity-30"}`} />
                                            </RowTable>
                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setToolDescription({ id, description, isValid: false })
                                                setEditType("DESCRIPTION")
                                                scrollToTop()
                                            }}>
                                                {
                                                    description && description.length
                                                        ? <HiOutlineClipboardDocumentList className="table_row text-green-700" />
                                                        : <HiOutlineDocumentPlus className="table_row" />
                                                }
                                            </RowTable>
                                            <td className="p-4 flex justify-center space-x-4">
                                                <TbEdit
                                                    onClick={() => {
                                                        setToolInfos({ id, title, type, description, is_deleted })
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                    }}
                                                    className="table_row cursor-pointer text-green-700"
                                                />
                                                <MdOutlineDelete onClick={() => deleteToolHandler(id)} className="table_row cursor-pointer text-red-600" />
                                            </td>
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

export default Tool