"use client"

import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
////? Components
// Utils
import { sendRequestWithLoading } from "@utils/configs/axios"
import { scrollToTop } from "@utils/helper"
// Globals
import WrapperContents from "../modules/WrapperContents"
import RowTable from "../modules/RowTable"
import ImportantText from "../modules/ImportantText"
import Table from "../modules/Table"
////? Icons
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2"
import { MdOutlineDelete } from "react-icons/md"
import { LiaToolsSolid } from "react-icons/lia"
////? Types
import { EditType, Description } from "@comp_types/Types"
type TaskerDocsProps = {
    taskerID: number,
    onClose: () => void
}

const TaskerTools = ({ taskerID = 0, onClose }: TaskerDocsProps) => {

    // UI
    const [taskerDocsDescription, setTaskerDocsDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [editType, setEditType] = useState<EditType>("NULL")
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)

    useEffect(() => {
        if (taskerID >= 1) getTaskerDocsHandler()
    }, [taskerID, activePage])

    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setTaskerDocsDescription({ id: 1, description: "", isValid: false })
    }

    //! Get
    const getTaskerDocsHandler = async () => {

        setDataList([])
        const res = await sendRequestWithLoading(`/admin/tasker/${taskerID}/tools?page=${activePage}`, {}, "post", "Getting Tools", false, false)

        if (res?.data?.data) {
            const { taskerTools, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(taskerTools)
        }
    }

    const updateDescriptionHandler = async (data: string) => {

        const { id } = taskerDocsDescription
        const res = await sendRequestWithLoading(`/admin/tasker/${taskerID}/tools/${id}`, { description: data }, "put", "Update Description", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getTaskerDocsHandler()
        }
    }

    //! Delete
    const deleteTaskerVerifyHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Tasker Tool is deleted!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/tasker/${taskerID}/tools/${id}`, {}, "delete", "Deleting Tasker Tool", false, false)
                res?.data?.data && getTaskerDocsHandler()
            }
        });
    }

    return (
        <WrapperContents
            editType={editType}
            onCloseOnBoxHandler={closeOnBoxHandler}
            onUpdateDescription={(data) => updateDescriptionHandler(data)}
            defaultDescription={taskerDocsDescription.description}
            conditionForDisabledBtn={false}
            contentTable={
                <Table
                    onActivePage={value => setActivePage(value)}
                    cols={["ID / Email Tasker", "Service Title", "Tool Title", "CreatedAt", "Description"]}
                    hasDatas={dataList?.length ? true : false}
                    paginationProps={paginations}
                    navbar={{
                        headerTitle: "Tasker Tools",
                        headerIcon: <LiaToolsSolid className="text-4xl" />,
                        btnText: "Back",
                        onClickedBtnText: () => {
                            closeOnBoxHandler()
                            onClose()
                        }
                    }}
                    contentHeader={<></>}
                >
                    {
                        dataList && dataList.length
                            ?
                            dataList.map(items => {
                                const { id, description, tasker, created_at, service_tool } = items

                                return (
                                    <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && taskerDocsDescription.id === id) ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                        <RowTable title={id} />

                                        <RowTable>
                                            <ImportantText id={tasker.id} text={tasker.email} bgColor="var(--light-primary)" />
                                        </RowTable>

                                        <RowTable title={service_tool.service_title} />

                                        <RowTable title={service_tool.tool_tilte} />

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

export default TaskerTools