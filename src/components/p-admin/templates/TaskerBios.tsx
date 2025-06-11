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
import { LuLanguages } from "react-icons/lu"
import { GrLanguage } from "react-icons/gr"
import { BiMessageSquareDetail } from "react-icons/bi"
import { TbEdit } from "react-icons/tb"
////? Types
import { EditType, Description } from "@comp_types/Types"

type TaskerBiosProps = {
    taskerServiceID: number,
    onClose: () => void
}

const TaskerBios = ({ taskerServiceID = 0, onClose }: TaskerBiosProps) => {

    // UI
    const [taskerBiosDescription, settaskerBiosDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [editType, setEditType] = useState<EditType>("NULL")
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)

    useEffect(() => {
        if (taskerServiceID >= 1) getTaskerDocsHandler()
    }, [taskerServiceID, activePage])

    const closeOnBoxHandler = () => {
        setEditType("NULL")
        settaskerBiosDescription({ id: 1, description: "", isValid: false })
    }

    const showBio = (data: string) => {
        Swal.fire({
            icon: "info",
            title: "Bio Description",
            html: data,
            showConfirmButton: false
        });
    }

    //! Get
    const getTaskerDocsHandler = async () => {

        setDataList([])
        const res = await sendRequestWithLoading(`/admin/tasker_Services/${taskerServiceID}/bio?page=${activePage}`, {}, "post", "Getting Bios", false, false)

        if (res?.data?.data) {
            const { taskerLanguageBios, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(taskerLanguageBios)
        }
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/tasker_Services/${taskerServiceID}/bio/${taskerBiosDescription.id}`, { bio_description: data }, "put", "Update Bio", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getTaskerDocsHandler()
        }
    }

    //! Delete
    const deleteTaskerVerifyHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Tasker Bio is deleted!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/tasker_Services/${taskerServiceID}/bio/${id}`, {}, "delete", "Deleting Tasker Bio", false, false)
                res?.data?.data && getTaskerDocsHandler()
            }
        });
    }

    return (
        <WrapperContents
            editType={editType}
            onCloseOnBoxHandler={closeOnBoxHandler}
            onUpdateDescription={(data) => updateDescriptionHandler(data)}
            defaultDescription={taskerBiosDescription.description}
            conditionForDisabledBtn={false}
            contentTable={
                <Table
                    onActivePage={value => setActivePage(value)}
                    cols={["ID / Title Service", "Language", "CreatedAt", "Bio Description", ""]}
                    hasDatas={dataList?.length ? true : false}
                    paginationProps={paginations}
                    navbar={{
                        headerTitle: "Tasker Bios",
                        headerIcon: <BiMessageSquareDetail className="text-4xl" />,
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
                                const { id, bio_description, native_only, language, created_at, tasker_service } = items

                                return (
                                    <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && taskerBiosDescription.id === id) ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                        <RowTable title={id} />
                                        <RowTable>
                                            <ImportantText id={tasker_service.tasker_id} text={tasker_service.service_title} bgColor="var(--light-primary)" />
                                        </RowTable>
                                        <RowTable>
                                            <div className="flex items-center">
                                                {
                                                    native_only
                                                        ? <LuLanguages title="Native" className="text-xl cursor-default" />
                                                        : <GrLanguage title="Global" className="text-xl cursor-default" />
                                                }
                                                <p className="ps-2">{language.title}</p>
                                            </div>
                                        </RowTable>
                                        <RowTable>
                                            <ImportantText idHover="Created At" id={created_at.slice(11, 16)} text={created_at.slice(0, 10)} bgColor="#22c55e" />
                                        </RowTable>
                                        <RowTable contentMiddle clickOnRow={() => showBio(bio_description)}>
                                            {
                                                bio_description && bio_description.length
                                                    ? <HiOutlineClipboardDocumentList className="table_row text-green-700" />
                                                    : <HiOutlineDocumentPlus className="table_row" />
                                            }
                                        </RowTable>
                                        <td
                                            colSpan={0}
                                            style={{
                                                display: "none", padding: 0, margin: 0, border: "none", width: 0, height: 0
                                            }}
                                        ></td>
                                        <td className="p-4 flex justify-center space-x-4">
                                            <TbEdit
                                                onClick={() => {
                                                    settaskerBiosDescription({ id, description: bio_description, isValid: false })
                                                    setEditType("DESCRIPTION")
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

export default TaskerBios