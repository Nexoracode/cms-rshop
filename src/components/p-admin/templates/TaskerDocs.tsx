"use client"

import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
////? Utils
import { getFile, scrollToTop } from "@utils/helper"
import { sendRequestWithLoading } from "@utils/configs/axios"
////? Components
import AcceptCheckbox from "@/components/auth/AcceptCheckbox"
// Global
import SelectBox from "@comp_global/SelectBox"
import TextArea from "@comp_global/TextArea"
import SearchInTable from "../modules/SearchInTable"
import RowTable from "../modules/RowTable"
import ImportantText from "../modules/ImportantText"
import Table from "../modules/Table"
import WrapperContents from "../modules/WrapperContents"
////? Icons
import { HiOutlineClipboardDocumentList, HiOutlineDocumentDuplicate, HiOutlineDocumentPlus, HiOutlineDocumentText } from "react-icons/hi2"
import { MdOutlineDelete, MdOutlineDirectionsCar } from "react-icons/md"
import { TbDatabaseSearch, TbEdit } from "react-icons/tb"
import { LuTextCursorInput } from "react-icons/lu"
import { IoCardOutline } from "react-icons/io5"
import { GoDotFill } from "react-icons/go"
////? Types
import { EditType, Description } from "@comp_types/Types"
type EditTypeMain = EditType | "VERIFICATION"
type DataTitle = "driver_license" | "tbd_title"
type Tasker = { id?: number, title: DataTitle, doc?: string, is_verified: boolean, description?: string }
type DataType = keyof Omit<Tasker, "id" | "user_id" | "permit_expiration_date" | "description"> | "all_datas"
type Search = { key: DataType, value: any }
type TaskerDocsProps = {
    taskerVerificationID: number,
    onClose: () => void
}

const TaskerDocs = ({ taskerVerificationID = 0, onClose }: TaskerDocsProps) => {
    // UI
    const [taskerDocsInfos, setTaskerDocsInfos] = useState<Tasker>({ id: 1, title: "driver_license", doc: "", is_verified: false, description: "" })
    const [taskerDocsDescription, setTaskerDocsDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [editType, setEditType] = useState<EditTypeMain>("NULL")
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    const [fileData, setFileData] = useState<{ url: string; type: string }[] | null>(null);
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    // SearchInTable
    const [search, setSearch] = useState<Search>({ key: "all_datas", value: null })

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getTaskerDocsHandler()
    }, [search.value])

    useEffect(() => {
        if (taskerVerificationID >= 1) getTaskerDocsHandler()
    }, [taskerVerificationID, activePage])

    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setTaskerDocsInfos({ id: 1, title: "driver_license", doc: "", is_verified: false, description: "" })
        setTaskerDocsDescription({ id: 1, description: "", isValid: false })
    }

    const reRenderTable = (res: any) => {
        if (res?.data?.data) {
            closeOnBoxHandler()
            getTaskerDocsHandler()
        }
    }

    //! Get
    const getTaskerDocsHandler = async () => {

        const { key, value } = search
        const filterTable: Record<string, any> = {}
        if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
        else if (key !== "all_datas") filterTable[key] = value

        const res = await sendRequestWithLoading(`/admin/tasker/${taskerVerificationID}/verification-docs?page=${activePage}`, filterTable, "post", "Getting Docs", false, false)
        if (res?.data?.data) {
            const { docs, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            console.log(docs);

            setDataList(docs)
        }
    }

    const getFileHandler = async (path: string, title: string, isVerify: boolean) => {
        getFile(path).then(res => {
            Swal.fire({
                title,
                imageUrl: res?.url,
                imageAlt: "image",
                showConfirmButton: false, // حذف دکمه OK
                html: `<p style="color: ${isVerify ? 'green' : 'red'}; font-size: 18px; font-weight: bold;">
                            ${isVerify ? "Verified" : "Not Verified"}
                       </p>`,
            });
        });
    };

    //! Update
    const updateTaskerDocsInfosHandler = async () => {
        let id = taskerDocsInfos.id
        delete taskerDocsInfos.id
        delete taskerDocsInfos.description
        console.log("=?????????????????", taskerDocsInfos);

        const res = await sendRequestWithLoading(`/admin/tasker/${taskerVerificationID}/verification-docs/${id}`, taskerDocsInfos, "put", "Update Informations", false, false)
        reRenderTable(res)
    }

    const updateDescriptionHandler = async (data: string) => {
        const { id } = taskerDocsDescription
        const res = await sendRequestWithLoading(`/admin/tasker/${taskerVerificationID}/verification-docs/${id}`, { description: data }, "put", "Update Description", false, false)
        reRenderTable(res)
    }

    //! Delete
    const deleteTaskerVerifyHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Tasker Document is deleted!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/tasker/${taskerVerificationID}/verification-docs/${id}`, {}, "delete", "Deleting Tasker Document", false, false)
                res?.data?.data && getTaskerDocsHandler()
            }
        });
    }

    return (
        <WrapperContents
            editType={editType}
            onCloseOnBoxHandler={closeOnBoxHandler}
            onUpdateDescription={(data) => updateDescriptionHandler(data)}
            onUpdateContent={updateTaskerDocsInfosHandler}
            defaultDescription={taskerDocsDescription.description}
            conditionForDisabledBtn={false}
            hiddenContentsForCreate={[-1]}
            hiddenContentsForUpdate={[0]}
            totalContent={
                <>
                    <TextArea onInpValue={(val, isValid) => setTaskerDocsInfos(prev => ({ ...prev, description: val, isValid }))} value={taskerDocsInfos.description} placeholder="Your description..." lablel="Description" htmlFor="Description" />
                    <div className="is-deleted bg-[rgba(179,241,166,0.3)] gap-8">
                        <AcceptCheckbox onRememberChange={val => setTaskerDocsInfos(prev => ({ ...prev, is_verified: val }))} defaultChecked={taskerDocsInfos.is_verified || false} clearInp={!taskerDocsInfos.is_verified} htmlForID="checked_is_verified" title="Is Verified" />
                    </div>
                </>
            }
            contentTable={
                <Table
                    onActivePage={value => setActivePage(value)}
                    cols={["ID / Email Tasker", "Title", "Docs", "CreatedAt", "Description"]}
                    hasDatas={dataList?.length ? true : false}
                    paginationProps={paginations}
                    navbar={{
                        headerTitle: "Tasker Documents",
                        headerIcon: <HiOutlineDocumentDuplicate className="text-4xl" />,
                        btnText: "Back",
                        onClickedBtnText: () => {
                            closeOnBoxHandler()
                            onClose()
                        }
                    }}
                    contentHeader={
                        <div className="py-4">
                            <SearchInTable
                                selectedItem={search.key}
                                keysDontSelect={["title"]}
                                onSearchData={(key, value) => {
                                    const { key: keyProp } = search
                                    setSearch({
                                        key,
                                        value: keyProp === "title" ? taskerDocsInfos.title : value
                                    })
                                }}
                                classInLine={`sm:gap-x-4 ${search.key === "all_datas" ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}
                            >
                                <SelectBox
                                    fields={[
                                        { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                        { id: "title", icon: <LuTextCursorInput />, title: "Title" },
                                        { id: "is_verified", icon: <HiOutlineClipboardDocumentList />, title: "Is Verified" },
                                    ]}
                                    onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                    defaultSelectedId={"all_datas"}
                                />
                                {
                                    search.key === "title"
                                        ?
                                        <SelectBox
                                            fields={[
                                                { id: "driver_license", icon: <MdOutlineDirectionsCar />, title: "Driver License" },
                                                { id: "tbd_title", icon: <IoCardOutline />, title: "Tbd Title" },
                                            ]}
                                            onChoosedItem={value => setTaskerDocsInfos(prev => ({ ...prev, title: value as DataTitle }))}
                                            defaultSelectedId={taskerDocsInfos.title}
                                        />
                                        : ""
                                }
                            </SearchInTable>
                        </div>
                    }
                >
                    {
                        dataList && dataList.length
                            ?
                            dataList.map(items => {
                                const { id, doc, description, is_verified, title, tasker, created_at } = items

                                return (
                                    <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && taskerDocsDescription.id === id) || (taskerDocsInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                        <RowTable title={id} />

                                        <RowTable>
                                            <ImportantText id={tasker.id} text={tasker.email} bgColor="var(--light-primary)" />
                                        </RowTable>

                                        <RowTable title={title} />

                                        <RowTable contentMiddle>
                                            <div className="flex items-center">
                                                <GoDotFill title="is verify?" className={`text-xl cursor-default ${!is_verified ? "text-red-600" : "text-green-600"}`} />
                                                <HiOutlineDocumentText className="text-2xl" onClick={() => getFileHandler(doc, title, is_verified)} />
                                            </div>
                                        </RowTable>

                                        <RowTable>
                                            <ImportantText idHover="Created At" id={created_at.slice(11, 16)} text={created_at.slice(0, 10)} bgColor="#22c55e" />
                                        </RowTable>

                                        <RowTable contentMiddle={true} clickOnRow={() => {
                                            setTaskerDocsDescription({ id, description, isValid: false })
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
                                                    setTaskerDocsInfos({ id, is_verified, title, description })
                                                    setEditType("UPDATE")
                                                    scrollToTop()
                                                }}
                                                className="table_row cursor-pointer text-green-700"
                                            />
                                            <MdOutlineDelete onClick={() => deleteTaskerVerifyHandler(id)} className="table_row cursor-pointer text-red-600" />
                                        </td>
                                    </tr>
                                )
                            })
                            : ""
                    }
                </Table>
            }
        />
    )
}

export default TaskerDocs