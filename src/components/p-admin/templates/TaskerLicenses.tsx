"use client"

import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
////? Components
import AcceptCheckbox from "@comp_auth/modules/AcceptCheckbox"
// Utils
import { sendRequestWithLoading } from "@utils/configs/axios"
import { getFile, scrollToTop } from "@utils/helper"
// Globals
import WrapperContents from "../modules/WrapperContents"
import RowTable from "../modules/RowTable"
import ImportantText from "../modules/ImportantText"
import Table from "../modules/Table"
////? Icons
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2"
import { MdOutlineDelete } from "react-icons/md"
import { LuScrollText } from "react-icons/lu"
import { TbEdit } from "react-icons/tb"
import { GoDotFill } from "react-icons/go"
////? Types
import { EditType, Description } from "@comp_types/Types"
type TaskerLicensesProps = {
    taskerServiceID: number,
    onClose: () => void
}

const TaskerLicenses = ({ taskerServiceID = 0, onClose }: TaskerLicensesProps) => {

    // UI
    const [taskerLicenseInfos, setTaskerLicenseInfos] = useState<{ id: number, license: string, is_verified: boolean }>({ id: 1, license: "", is_verified: false })
    const [taskerBiosDescription, settaskerBiosDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [editType, setEditType] = useState<EditType>("NULL")
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    //
    const [fileData, setFileData] = useState<{ url: string; type: string } | null>(null);
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)

    useEffect(() => {
        if (fileData?.url.length) window.open(fileData.url, "_blank");
    }, [fileData])

    useEffect(() => {
        if (taskerServiceID >= 1) getTaskerLicenseHandler()
    }, [taskerServiceID, activePage])

    const getFileHandler = (file: any) => {
        getFile(file).then(res => setFileData({ type: res?.type || "", url: res?.url || "" }))
    }

    //! Get
    const getTaskerLicenseHandler = async () => {

        setDataList([])
        const res = await sendRequestWithLoading(`/admin/tasker_Services/${taskerServiceID}/license`, { page: activePage }, "get", "Getting Licenses", false, false)

        if (res?.data?.data) {
            //const { taskerLanguageBios, size, page, total, totalPages } = res.data.data[0]
            //setPaginations({ size, page, total, totalPages })
            console.log("===>", res.data.data[0]);
            setDataList([res.data.data[0]])
        }
    }

    //! Update
    const updateTaskerLicenseInfosHandler = async () => {
        console.log(taskerLicenseInfos.is_verified);
        
        const res = await sendRequestWithLoading(`/admin/tasker_Services/${taskerServiceID}/license`, { is_verified: taskerLicenseInfos.is_verified }, "put", "Update Informations", false, false)
        if (res?.data?.data) {
            setEditType("NULL")
            getTaskerLicenseHandler()
        }
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/tasker_Services/${taskerServiceID}/license`, { description: data }, "put", "Update Description", false, false)
        if (res?.data?.data) {
            setEditType("NULL")
            getTaskerLicenseHandler()
        }
    }

    //! Delete
    const deleteTaskerVerifyHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Tasker License is deleted!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/tasker_Services/${taskerServiceID}/license`, {}, "delete", "Deleting Tasker License", false, false)
                res?.data?.data && getTaskerLicenseHandler()
            }
        });
    }

    return (
        <WrapperContents
            editType={editType}
            onCloseOnBoxHandler={() => setEditType("NULL")}
            onUpdateDescription={(data) => updateDescriptionHandler(data)}
            defaultDescription={taskerBiosDescription.description}
            conditionForDisabledBtn={false}
            onUpdateContent={updateTaskerLicenseInfosHandler}
            hiddenContentsForCreate={[-1]}
            hiddenContentsForUpdate={[-1]}
            totalContent={
                <div className="is-deleted mt-6">
                    <AcceptCheckbox onRememberChange={val => setTaskerLicenseInfos(prev => ({ ...prev, is_verified: val }))} defaultChecked={taskerLicenseInfos.is_verified} clearInp={!taskerLicenseInfos.is_verified} htmlForID="checked_is_verified" title="Is Verified" />
                </div>
            }
            contentTable={
                <Table
                    onActivePage={value => setActivePage(value)}
                    cols={["ID / Title Service", "License", "CreatedAt", "Description"]}
                    hasDatas={dataList?.length ? true : false}
                    paginationProps={paginations}
                    navbar={{
                        headerTitle: "Tasker Licenses",
                        headerIcon: <LuScrollText className="text-4xl" />,
                        btnText: "Back",
                        onClickedBtnText: () => {
                            setEditType("NULL")
                            onClose()
                        }
                    }}
                    contentHeader={<></>}
                >
                    {
                        dataList && dataList.length
                            ?
                            dataList.map(items => {
                                const { id, license, tasker_service, is_verified, description, created_at } = items

                                return (
                                    <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && taskerBiosDescription.id === id) ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>


                                        <RowTable title={id} />

                                        <RowTable>
                                            <ImportantText id={tasker_service.tasker_id} text={tasker_service.service_title} bgColor="var(--light-primary)" />
                                        </RowTable>

                                        <RowTable contentMiddle={true} clickOnRow={() => getFileHandler(license)}>
                                            <div className="flex items-center">
                                                <GoDotFill title="is_verified" className={`text-xl cursor-default pe-1 ${is_verified ? "text-green-600" : "text-red-600"}`} />
                                                <LuScrollText className="text-2xl" />
                                            </div>
                                        </RowTable>

                                        <RowTable>
                                            <ImportantText idHover="Created At" id={created_at.slice(11, 16)} text={created_at.slice(0, 10)} bgColor="#22c55e" />
                                        </RowTable>

                                        <RowTable contentMiddle={true} clickOnRow={() => {
                                            settaskerBiosDescription({ id, description, isValid: false })
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
                                                    setTaskerLicenseInfos({ id, is_verified, license })
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

export default TaskerLicenses