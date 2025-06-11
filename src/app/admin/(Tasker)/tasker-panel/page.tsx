"use client"

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
////? Utils
import { sendRequestWithLoading } from "@utils/configs/axios";
import { getFile, scrollToTop } from "@utils/helper";
////? Components
// Globals
import Input from "@comp_global/Input";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import WorkingHours from "@comp_global/WorkingHour";
import TextArea from "@comp_global/TextArea";
import SelectBox from "@comp_global/SelectBox";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import TaskerServices from "@comp_p-admin/templates/TaskerServices";
import TaskerVehicles from "@comp_p-admin/templates/TaskerVehicles";
import ImportantText from "@comp_p-admin/modules/ImportantText";
import TaskerTools from "@comp_p-admin/templates/TaskerTools";
import ContentTitle from "@comp_p-admin/modules/ContentTitle";
import RowTable from "@comp_p-admin/modules/RowTable";
import Table from "@comp_p-admin/modules/Table";
////? Icons
import { TbDatabaseSearch, TbEdit, TbPhoneIncoming, TbTruckDelivery } from "react-icons/tb";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2";
import { MdOutlineDelete, MdOutlineStarOutline } from "react-icons/md";
import { FiPhoneOff } from "react-icons/fi";
import { LiaBusinessTimeSolid, LiaToolsSolid } from "react-icons/lia";
import { LuLayoutPanelLeft, LuScrollText, LuSettings2 } from "react-icons/lu";
import { GiDrippingStar, GiFallingStar } from "react-icons/gi";
import { GoDotFill } from "react-icons/go";
import { GrMapLocation } from "react-icons/gr";
////? Types
import { Description } from "@comp_types/Types"
import Search from "antd/es/transfer/search";
type WorkingHoursType = { day: string, hours: string | null }[]
type EditType = "DESCRIPTION" | "UPDATE" | "WORKING_HOURS" | "NULL" | "TOOLS" | "VEHICLES" | "SERVICES"
type DataType = "bussiness_phone" | "average_score" | "is_limited_to_work_area" | "all_datas"
type Search = { key: DataType, value: any }

const TaskerPanel = () => {

    // UI
    const [rowID, setRowID] = useState<number>(1)
    const [taskerVerifyDescription, setTaskerVerifyDescription] = useState<Description>({ description: "", isValid: false })
    const [taskerVerifyInfos, setTaskerVerifyInfos] = useState<{ average_score: string, about_me: string }>({ about_me: "", average_score: "1" })
    const [workingHours, setWorkingHours] = useState<WorkingHoursType>([])
    // Helper
    const [editType, setEditType] = useState<EditType>("NULL")
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    const [isCorrectUserFields, setIsCorrectUserFields] = useState<{ average_score: boolean, about_me: boolean }>({ average_score: false, about_me: false })
    const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true)
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    // SearchInTable
    const [search, setSearch] = useState<Search>({ key: "all_datas", value: null })

    useEffect(() => {
        getTaskerVerifyHandler()
    }, [activePage])

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getTaskerVerifyHandler()
    }, [search.value])

    useEffect(() => {
        if (editType === "UPDATE") {
            const { about_me, average_score } = isCorrectUserFields;
            setIsActiveBtn(about_me && average_score ? true : false)
        }
        else setIsActiveBtn(false)
    }, [isCorrectUserFields, editType])

    //! Content DataType Table ( Show In DOM )

    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setRowID(1)
    }

    const showAboutMe = (data: string) => {
        Swal.fire({
            icon: "info",
            title: "About me",
            html: data,
            showConfirmButton: false
        });
    }

    const reRenderTable = (res: any) => {
        if (res?.data?.data) {
            getTaskerVerifyHandler()
            closeOnBoxHandler()
        }
    }

    //! Get
    const getTaskerVerifyHandler = async () => {
        setDataList([])
        const { key, value } = search
        const filterTable: Record<string, any> = {}
        if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
        else if (key !== "all_datas") filterTable[key] = value

        const res = await sendRequestWithLoading(`/admin/tasker/panel?page=${activePage}`, filterTable, "post", "Getting Tasker Panels", false, false)
        if (res?.data?.data) {
            const { taskerPanels, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            console.log(taskerPanels);
            setDataList(taskerPanels)
        }
    }

    //! Upadte
    const updateInfosHandler = async () => {
        const res = await sendRequestWithLoading(`/admin/tasker/${rowID}/panel`, { ...taskerVerifyInfos, average_score: +taskerVerifyInfos.average_score }, "put", "Update Infos", false, false)
        reRenderTable(res)
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/tasker/${rowID}/panel`, { description: data }, "put", "Update Description", false, false)
        reRenderTable(res)
    }

    //! Delete
    const deleteTaskerVerifyHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Tasker Panel is deleted!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/tasker/${id}/panel`, {}, "delete", "Deleting", false, false)
                res?.data?.data && getTaskerVerifyHandler()
            }
        });
    }

    const style = `absolute inset-0 transition-transform duration-700`
    const hide = `translate-y-[-1300px] h-0`
    const show = `translate-y-[0] h-auto`

    return (
        <section className={`transition-all duration-500 !relative right-auto left-auto ${editType === "NULL" || editType === "TOOLS" || editType === "VEHICLES" || editType === "SERVICES" ? "-mt-8" : ""}`}>

            <WrapperContents
                editType={editType}
                extraType={"WORKING_HOURS"}
                extraBox={
                    <>
                        <ContentTitle activeClose={true} onClickClose={closeOnBoxHandler} title="Working Hours" icon={<LiaBusinessTimeSolid className="text-2xl sm:text-4xl" />} />
                        <WorkingHours
                            workingHours={workingHours}
                        />
                    </>
                }
                customConditionTable={editType === "TOOLS" || editType === "SERVICES" || editType === "VEHICLES"}
                customStyle={"translate-y-0"}
                onCloseOnBoxHandler={closeOnBoxHandler}
                defaultDescription={taskerVerifyDescription.description}
                onUpdateDescription={data => updateDescriptionHandler(data)}
                onUpdateContent={updateInfosHandler}
                conditionForDisabledBtn={!isActiveBtn}
                hiddenContentsForCreate={[-1]}
                hiddenContentsForUpdate={[-1]}
                totalContent={
                    <>
                        <Input
                            onInpValue={(val, isValid) => {
                                setTaskerVerifyInfos(prev => ({ ...prev, average_score: val }));
                                setIsCorrectUserFields(prev => ({ ...prev, average_score: isValid }));
                            }}
                            allowDecimalOnly={true}
                            defaultValue={taskerVerifyInfos.average_score}
                            min={1}
                            max={3}
                            htmlFor="average_score"
                            lablel="Average Score"
                            placeholder="Average Score..."
                        />
                        <TextArea
                            onInpValue={(val, isValid) => {
                                setTaskerVerifyInfos(prev => ({ ...prev, about_me: val }))
                                setIsCorrectUserFields(prev => ({ ...prev, about_me: isValid }))
                            }}
                            value={taskerVerifyInfos.about_me}
                            placeholder="About me"
                            lablel="About me..."
                            htmlFor="About-me"
                        />
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["ID / Email Tasker", "Business Phone", "CreatedAt", "Score", "Work Area", "Working Huors", "CV", "Panel information", "About me", ""]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Tasker Panel",
                            headerIcon: <LuLayoutPanelLeft className="text-4xl" />,
                            btnText: "",
                            onClickedBtnText: () => { }
                        }}
                        contentHeader={
                            <div className="py-4">
                                <SearchInTable
                                    selectedItem={search.key}
                                    onSearchData={(key, value) => setSearch({ key, value })}
                                    classInLine={`sm:gap-x-4 ${search.key.includes("is_") ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}
                                >
                                    <SelectBox
                                        activeSearch={search.key === "bussiness_phone" ? false : true}
                                        fields={[
                                            { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                            { id: "bussiness_phone", icon: <TbPhoneIncoming />, title: "Bussiness Phone" },
                                            { id: "is_limited_to_work_area", icon: <GrMapLocation />, title: "Limited Work Area" },
                                            { id: "average_score", icon: <MdOutlineStarOutline />, title: "Average Score", custom: "text-yellow-500" },
                                        ]}
                                        onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                        defaultSelectedId={"all_datas"}
                                    />
                                </SearchInTable>
                            </div>
                        }
                    >
                        {
                            dataList && dataList.length
                                ?
                                dataList.map(items => {
                                    const { id, about_me, average_score, created_at, bussiness_phone, is_limited_to_work_area, work_area, working_hours, tasker, resume, description } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType !== "NULL" && rowID === id) ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />

                                            <RowTable>
                                                <ImportantText id={tasker.id} text={tasker.email} bgColor="var(--light-primary)" />
                                            </RowTable>

                                            <RowTable>{bussiness_phone ? bussiness_phone : <FiPhoneOff className="text-2xl cursor-default" />}</RowTable>

                                            <RowTable>
                                                <ImportantText idHover="Created At" id={created_at.slice(11, 16)} text={created_at.slice(0, 10)} bgColor="#22c55e" />
                                            </RowTable>

                                            <RowTable contentMiddle={true} customStyle="cursor-default">
                                                <div className="relative">
                                                    <span className="absolute -top-4 -left-4 px-1 rounded-md">{average_score}</span>
                                                    {
                                                        average_score <= 1
                                                            ? <GiDrippingStar className="text-2xl cursor-default text-red-500" />
                                                            : average_score >= 2 && average_score <= 3.9
                                                                ? <MdOutlineStarOutline className="text-xl cursor-default text-orange-500" />
                                                                : <GiFallingStar className="text-2xl cursor-default text-yellow-500" />
                                                    }
                                                </div>
                                            </RowTable>

                                            <RowTable contentMiddle={true} clickOnRow={() => { }}>
                                                <GoDotFill title="is_limited_to_work_area" className={`text-xl cursor-default ${is_limited_to_work_area ? "text-green-600" : "text-red-600"}`} />
                                                <GrMapLocation className="text-2xl ps-1" />
                                            </RowTable>

                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setEditType("WORKING_HOURS")
                                                setWorkingHours(working_hours)
                                                scrollToTop()
                                                setRowID(id)
                                            }}>
                                                <LiaBusinessTimeSolid className="text-3xl ps-1" />
                                            </RowTable>


                                            <RowTable contentMiddle={true} clickOnRow={() => resume && getFile(resume).then(res => res?.url.length && window.open(res?.url, "_blank"))}>
                                                <LuScrollText className={`text-3xl ps-1 ${!resume ? "opacity-35 cursor-default" : ""}`} />
                                            </RowTable>

                                            <RowTable contentMiddle={true} clickOnRow={() => setRowID(tasker.id)}>
                                                <div className="flex items-center gap-4">
                                                    <TbTruckDelivery title="Tasker Vehicles" className="text-2xl" onClick={() => setEditType("VEHICLES")} />
                                                    <LiaToolsSolid title="Tasker Tools" className="text-2xl" onClick={() => setEditType("TOOLS")} />
                                                    <LuSettings2 title="Tasker Services" className="text-2xl" onClick={() => setEditType("SERVICES")} />
                                                </div>
                                            </RowTable>

                                            <RowTable contentMiddle clickOnRow={() => showAboutMe(about_me)}>
                                                {
                                                    about_me && about_me.length
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
                                                        setTaskerVerifyInfos({ about_me, average_score })
                                                        setIsCorrectUserFields(prev => ({ ...prev, about_me: about_me.length ? true : false, average_score: average_score.length ? true : false }))
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                        setRowID(id)
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
            <div className={`${editType === "TOOLS" ? show : hide} ${style}`}>
                <TaskerTools taskerID={editType === "TOOLS" ? rowID : 0} onClose={() => setEditType("NULL")} />
            </div>

            <div className={`${editType === "VEHICLES" ? show : hide} ${style}`}>
                <TaskerVehicles taskerID={editType === "VEHICLES" ? rowID : 0} onClose={() => setEditType("NULL")} />
            </div>

            <div className={`${editType === "SERVICES" ? show : hide} ${style}`}>
                <TaskerServices taskerID={editType === "SERVICES" ? rowID : 0} onClose={() => setEditType("NULL")} />
            </div>

        </section>
    )
}

export default TaskerPanel