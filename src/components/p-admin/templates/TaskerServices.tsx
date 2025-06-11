"use client"

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
// utils
import { sendRequestWithLoading } from "@utils/configs/axios";
import { scrollToTop } from "@utils/helper";
////? Components
// Globals
import Input from "@comp_global/Input";
import VerifiedImageSlider from "../modules/VerifiedImageSlider";
import TaskerLicenses from "./TaskerLicenses";
import TaskerBios from "./TaskerBios";
// Admin
import Table from "@comp_p-admin/modules/Table";
import RowTable from "@comp_p-admin/modules/RowTable";
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import ImportantText from "@comp_p-admin/modules/ImportantText";
////? Icons
import { TbEdit } from "react-icons/tb";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2";
import { MdOutlineDelete } from "react-icons/md";
import { LuScrollText, LuSettings2 } from "react-icons/lu";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoImagesOutline } from "react-icons/io5";
////? Types
import { Description } from "@comp_types/Types"
type EditType = "DESCRIPTION" | "UPDATE" | "NULL" | "SERVICE_BIOS" | "SERVICE_LICENSESE"

type TaskerServicesProps = {
    taskerID: number,
    onClose: () => void
}

const TaskerServices = ({ taskerID = 0, onClose }: TaskerServicesProps) => {

    // UI
    const [rowID, setRowID] = useState<number>(1)
    const [serviceID, setServiceID] = useState<number>(1)
    const [taskerVerifyDescription, setTaskerVerifyDescription] = useState<Description>({ description: "", isValid: false })
    const [taskerVerifyInfos, setTaskerVerifyInfos] = useState<{ portfolio_media: { is_verified: boolean, name: string }[], rates_per_hour: string }>({ portfolio_media: [], rates_per_hour: "1" })
    // Helper
    const [editType, setEditType] = useState<EditType>("NULL")
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    const [fileData, setFileData] = useState<{ url: string; type: string } | null>(null);
    const [isShowFiles, setIsShowFiles] = useState<boolean>(false);
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)

    useEffect(() => {
        if (taskerID >= 1) getTaskerServicesHandler()
    }, [taskerID, activePage])

    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setRowID(1)
        setTaskerVerifyDescription({ description: "", isValid: false })
        setTaskerVerifyInfos({ portfolio_media: [], rates_per_hour: "1" })
        setFileData({ type: "", url: "" })
    }

    //! Get
    const getTaskerServicesHandler = async () => {

        setDataList([])
        const res = await sendRequestWithLoading(`/admin/tasker/${taskerID}/services?page=${activePage}`, {}, "post", "Getting Tasker Services", false, false)

        if (res?.data?.data) {
            const { tasker_services, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(tasker_services)
        }
    }

    //! Upadte
    const updateInfosHandler = async () => {
        const res = await sendRequestWithLoading(`/admin/tasker/${taskerID}/services/${rowID}`, { rates_per_hour: +taskerVerifyInfos.rates_per_hour }, "put", "Update Infos", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getTaskerServicesHandler()
        }
    }

    const updateFilesHandler = async (portfolio: any) => {
        const res = await sendRequestWithLoading(`/admin/tasker/${taskerID}/services/${rowID}`, { portfolio_media: portfolio }, "put", "Update Infos", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getTaskerServicesHandler()
        }
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/tasker/${taskerID}/services/${taskerVerifyDescription.id}`, { description: data }, "put", "Update Description", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getTaskerServicesHandler()
        }
    }

    //! Delete
    const deleteTaskerVerifyHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Tasker Service is deleted!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/tasker/${taskerID}/services/${id}`, {}, "delete", "Deleting", false, false)
                res?.data?.data && getTaskerServicesHandler()
            }
        });
    }

    return (
        <section>
            <WrapperContents
                editType={editType}
                customConditionTable={editType === "SERVICE_BIOS" || editType === "SERVICE_LICENSESE"}
                customStyle={"translate-y-0"}
                onCloseOnBoxHandler={() => setEditType("NULL")}
                defaultDescription={taskerVerifyDescription.description}
                onUpdateDescription={(data) => updateDescriptionHandler(data)}
                onUpdateContent={updateInfosHandler}
                conditionForDisabledBtn={false}
                hiddenContentsForCreate={[-1]}
                hiddenContentsForUpdate={[-1]}
                totalContent={
                    <Input
                        onInpValue={val => setTaskerVerifyInfos(prev => ({ ...prev, rates_per_hour: val }))}
                        allowDecimalOnly={true}
                        defaultValue={taskerVerifyInfos.rates_per_hour}
                        min={1}
                        htmlFor="Rates_Per_Hour"
                        lablel="Rates Per Hour"
                        placeholder="rates per hour..."
                    />
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["ID / Email Tasker", "ID / Title Service", "Files", "Created At", "Rates", "Service Infos", "Description"]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Tasker Services",
                            headerIcon: <LuSettings2 className="text-4xl" />,
                            btnText: "Back",
                            onClickedBtnText: () => {
                                onClose()
                                setEditType("NULL")
                            }
                        }}
                        contentHeader={<></>}
                    >
                        {
                            dataList && dataList.length
                                ?
                                dataList.map(items => {
                                    const { id, portfolio_media, rates_per_hour, service, created_at, tasker, description } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType !== "NULL" && rowID === id) ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />

                                            <RowTable>
                                                <ImportantText id={tasker.id} text={tasker.email} bgColor="var(--light-primary)" />
                                            </RowTable>

                                            <RowTable>
                                                <ImportantText id={service.id} text={service.title} bgColor="var(--light-primary)" />
                                            </RowTable>

                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                if (portfolio_media.length) {
                                                    setRowID(id)
                                                    setTaskerVerifyInfos({ portfolio_media, rates_per_hour })
                                                    setIsShowFiles(true)
                                                }
                                            }}>
                                                <div className="flex items-center gap-4">
                                                    <IoImagesOutline className={`text-2xl ${portfolio_media.length ? "cursor-pointer" : "cursor-default opacity-40"}`} />
                                                </div>
                                            </RowTable>

                                            <RowTable>
                                                <ImportantText idHover="Created At" id={created_at.slice(11, 16)} text={created_at.slice(0, 10)} bgColor="#22c55e" />
                                            </RowTable>

                                            <RowTable title={`$ ${rates_per_hour}`} />

                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setRowID(id)
                                                setServiceID(service.id)
                                            }}>
                                                <div className="flex items-center gap-4">
                                                    <LuScrollText title="Service License" className="text-2xl" onClick={() => setEditType("SERVICE_LICENSESE")} />
                                                    <BiMessageSquareDetail title="Service Bio" className="text-2xl cursor-pointer" onClick={() => setEditType("SERVICE_BIOS")} />
                                                </div>
                                            </RowTable>

                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setTaskerVerifyDescription({ id: service.id, description, isValid: false })
                                                setEditType("DESCRIPTION")
                                                scrollToTop()
                                                setRowID(id)
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
                                                        setTaskerVerifyInfos({ portfolio_media, rates_per_hour })
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                        setRowID(id)
                                                    }}
                                                    className="table_row cursor-pointer text-green-700"
                                                />
                                                <MdOutlineDelete onClick={() => deleteTaskerVerifyHandler(service.id)} className="table_row cursor-pointer text-red-600" />
                                            </td>
                                        </tr>
                                    )
                                })
                                : ""
                        }
                    </Table>
                }
            />

            <div className={`${editType === "SERVICE_BIOS" ? "translate-y-[0] h-auto" : "translate-y-[-1300px] h-0"} absolute inset-0 transition-transform duration-700`}>
                <TaskerBios taskerServiceID={editType === "SERVICE_BIOS" ? serviceID : 0} onClose={() => setEditType("NULL")} />
            </div>

            <div className={`${editType === "SERVICE_LICENSESE" ? "translate-y-[0] h-auto" : "translate-y-[-1300px] h-0"} absolute inset-0 transition-transform duration-700`}>
                <TaskerLicenses taskerServiceID={editType === "SERVICE_LICENSESE" ? serviceID : 0} onClose={() => setEditType("NULL")} />
            </div>

            {
                taskerVerifyInfos.portfolio_media.length && isShowFiles
                    ?
                    <VerifiedImageSlider
                        images={taskerVerifyInfos.portfolio_media}
                        onImagesUpdate={(datas) => {
                            const updatedImages = datas.filter(image => image.is_verified === true || image.is_verified === false);
                            if (updatedImages.length) {
                                updateFilesHandler(updatedImages)
                                setIsShowFiles(false);
                            }
                        }}
                        cancle={() => setIsShowFiles(false)}
                    />
                    : ""
            }

        </section>
    )
}

export default TaskerServices