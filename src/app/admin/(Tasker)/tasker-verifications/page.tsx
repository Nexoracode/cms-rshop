"use client"

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
////? Utils
import { scrollToTop } from "@utils/helper";
import { sendRequestWithLoading } from "@utils/configs/axios";
////? Components
import AcceptCheckbox from "@/components/auth/AcceptCheckbox";
// Globals
import CustomDatePicker from "@comp_global/CustomDatePicker";
import TextArea from "@comp_global/TextArea";
import SelectBox from "@comp_global/SelectBox";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import ImportantText from "@comp_p-admin/modules/ImportantText";
import TaskerDocs from "@comp_p-admin/templates/TaskerDocs";
import RowTable from "@comp_p-admin/modules/RowTable";
import Table from "@comp_p-admin/modules/Table";
////? Icons
import { TbCalendarMonth, TbDatabaseSearch, TbEdit, TbUser, TbUserPause, TbUsers, TbUsersGroup, TbUserShield } from "react-icons/tb";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentDuplicate, HiOutlineDocumentPlus } from "react-icons/hi2";
import { MdOutlineDelete } from "react-icons/md";
import { FaBuildingUser, FaPersonDigging } from "react-icons/fa6";
import { PiStudentDuotone } from "react-icons/pi";
import { RiPassValidLine } from "react-icons/ri";
import { BsPassport } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
////? Types
import { EditType, Description } from "@comp_types/Types"
type EditTypeMain = EditType | "DOCS"
type TaskerTypes = "individual" | "corporate"
type TaskerResidence = "citizen" | "permanent_resident" | "work_permit" | "study_permit"
type Tasker = { id?: number, user_id: number, permit_expiration_date?: string, tasker_type: TaskerTypes, Residence_status: TaskerResidence, is_verified: boolean, is_active: boolean, description?: string }
type DataType = keyof Omit<Tasker, "id" | "user_id" | "permit_expiration_date" | "description"> | "all_datas"
type Search = { key: DataType, value: any }

const TaskerVerifications = () => {

    // UI
    const [taskerVerifyInfos, setTaskerVerifyInfos] = useState<Tasker>({ id: 1, user_id: 1, permit_expiration_date: "", tasker_type: "individual", Residence_status: "citizen", is_active: false, is_verified: false, description: "" })
    const [taskerVerifyDescription, setTaskerVerifyDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [editType, setEditType] = useState<EditTypeMain>("NULL")
    const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true)
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    const [rowID, setRowID] = useState<number>(1)
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    // SearchInTable
    const [search, setSearch] = useState<Search>({ key: "all_datas", value: null })

    useEffect(() => {
        const { Residence_status, permit_expiration_date } = taskerVerifyInfos
        if (Residence_status === "study_permit" || Residence_status === "work_permit") setIsActiveBtn(!permit_expiration_date ? true : false)
        else setIsActiveBtn(false)
    }, [taskerVerifyInfos.Residence_status, taskerVerifyInfos.permit_expiration_date])

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

    //! Content DataType Table ( Show In DOM )
    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setTaskerVerifyInfos({ id: 1, user_id: 1, permit_expiration_date: "", tasker_type: "individual", Residence_status: "citizen", is_active: false, is_verified: false, description: "" })
        setTaskerVerifyDescription({ id: 1, description: "", isValid: false })
    }

    const RenderTaskerType: React.FC<{ label?: string }> = React.useCallback(({ label = "" }) => {
        return (
            <SelectBox
                label={label}
                fields={[
                    { id: "individual", icon: <TbUser />, title: "Individual" },
                    { id: "corporate", icon: <TbUsersGroup />, title: "Corporate" },
                ]}
                onChoosedItem={(value: string | number) => setTaskerVerifyInfos(prev => ({ ...prev, tasker_type: value as TaskerTypes }))}
                defaultSelectedId={taskerVerifyInfos.tasker_type}
            />
        );
    }, [taskerVerifyInfos.tasker_type])

    const RenderResidenceStatus: React.FC<{ label?: string }> = React.useCallback(({ label = "" }) => {
        return (
            <SelectBox
                label={label}
                fields={[
                    { id: "citizen", icon: <FaBuildingUser />, title: "Citizen" },
                    { id: "permanent_resident", icon: <RiPassValidLine />, title: "Permanent Resident" },
                    { id: "work_permit", icon: <FaPersonDigging />, title: "Work Permit" },
                    { id: "study_permit", icon: <PiStudentDuotone />, title: "Study Permit" },
                ]}
                onChoosedItem={value => setTaskerVerifyInfos(prev => ({ ...prev, Residence_status: value as TaskerResidence }))}
                defaultSelectedId={taskerVerifyInfos.Residence_status}
            />
        );
    }, [taskerVerifyInfos.Residence_status])

    //! Get
    const getTaskerVerifyHandler = async () => {

        setDataList([])
        const { key, value } = search
        const filterTable: Record<string, any> = {}
        if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
        else if (key !== "all_datas") filterTable[key] = value

        const res = await sendRequestWithLoading(`/admin/tasker-verification?page=${activePage}`, filterTable, "post", "Getting Taskers", false, false)
        if (res?.data?.data) {
            const { taskers, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(taskers)
        }
    }

    //! Update
    const updateTaskerVerifyInfosHandler = async () => {

        let id = taskerVerifyInfos.id
        delete taskerVerifyInfos.id
        delete taskerVerifyInfos.description

        const { Residence_status } = taskerVerifyInfos
        Residence_status === "citizen" || Residence_status === "permanent_resident" && delete taskerVerifyInfos.permit_expiration_date

        const res = await sendRequestWithLoading(`/admin/tasker-verification/${id}`, taskerVerifyInfos, "put", "Update Informations", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getTaskerVerifyHandler()
        }
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/tasker-verification/${taskerVerifyDescription.id}`, { description: data }, "put", "Update Description", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getTaskerVerifyHandler()
        }
    }

    //! Delete
    const deleteTaskerVerifyHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The Tasker Verification will be removed!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/tasker-verification/${id}`, {}, "delete", "Deleting Tasker Verification", false, false)
                res?.data?.data && getTaskerVerifyHandler()
            }
        });
    }

    return (
        <section className="-mt-8">
            <WrapperContents
                editType={editType}
                customConditionTable={editType === "DOCS"}
                customStyle={"translate-y-0"}
                onCloseOnBoxHandler={closeOnBoxHandler}
                defaultDescription={taskerVerifyDescription.description}
                onUpdateDescription={(data) => updateDescriptionHandler(data)}
                onUpdateContent={updateTaskerVerifyInfosHandler}
                conditionForDisabledBtn={isActiveBtn}
                hiddenContentsForCreate={[5]}
                hiddenContentsForUpdate={[3]}
                totalContent={
                    <>
                        <RenderTaskerType label="Tasker Type" />
                        <RenderResidenceStatus label="Residence Status" />
                        {
                            taskerVerifyInfos.Residence_status !== "permanent_resident" && taskerVerifyInfos.Residence_status !== "citizen"
                                ? <CustomDatePicker
                                    onDate={date => setTaskerVerifyInfos(prev => ({ ...prev, permit_expiration_date: date }))}
                                    defaultValue={taskerVerifyInfos.permit_expiration_date}
                                />
                                : <div></div>
                        }
                        <TextArea onInpValue={val => setTaskerVerifyInfos(prev => ({ ...prev, description: val }))} value={taskerVerifyInfos.description} placeholder="Your description to the taskerVerify" lablel="Description" htmlFor="Description" />

                        <div className="my-4">
                            <AcceptCheckbox onRememberChange={val => setTaskerVerifyInfos(prev => ({ ...prev, is_active: val }))} defaultChecked={taskerVerifyInfos.is_active} clearInp={!taskerVerifyInfos.is_active} htmlForID="checked_is-active" title="Activate account" />
                        </div>

                        <div className="is-deleted mt-6 bg-[rgba(179,241,166,0.3)]">
                            <AcceptCheckbox onRememberChange={val => setTaskerVerifyInfos(prev => ({ ...prev, is_verified: val }))} defaultChecked={taskerVerifyInfos.is_verified} clearInp={!taskerVerifyInfos.is_verified} htmlForID="checked_is-verified" title="Verification status" />
                        </div>
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["ID / Email Tasker", "Tasker Type", "Residence Status", "Permit Expiration", "Active / Verify", "Docs", "Description"]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Tasker Verifications",
                            headerIcon: <TbUsers className="text-4xl" />,
                            btnText: "",
                            onClickedBtnText: () => { }
                        }}
                        contentHeader={
                            <div className="py-4">
                                <SearchInTable
                                    selectedItem={search.key}
                                    keysDontSelect={["tasker_type", "Residence_status"]}
                                    onSearchData={(key, value) => {
                                        const { key: keyProp } = search
                                        setSearch({
                                            key,
                                            value: keyProp === "tasker_type" ? taskerVerifyInfos.tasker_type : keyProp === "Residence_status" ? taskerVerifyInfos.Residence_status : value
                                        })
                                    }}
                                    classInLine={`sm:gap-x-4 ${search.key === "all_datas" ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}
                                >
                                    <SelectBox
                                        fields={[
                                            { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                            { id: "tasker_type", icon: <FiUsers />, title: "Tasker Type" },
                                            { id: "Residence_status", icon: <BsPassport />, title: "Residence Status" },
                                            { id: "is_active", icon: <TbUserPause />, title: "Is Active" },
                                            { id: "is_verified", icon: <TbUserShield />, title: "Is Verified", custom: "text-green-600" },
                                        ]}
                                        onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                        defaultSelectedId={"all_datas"}
                                    />

                                    {
                                        search.key === "tasker_type"
                                            ? <RenderTaskerType />
                                            : search.key === "Residence_status"
                                                ? <RenderResidenceStatus />
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
                                    const { id, permit_expiration_date, tasker_type, Residence_status, is_verified, is_active, description, user } = items

                                    return (
                                        <tr key={id} className={`${is_verified ? "bg-[var(--background)]" : "bg-[var(--light-red)]"} hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && taskerVerifyDescription.id === id) || (taskerVerifyInfos.id === id && editType === "UPDATE" || editType === "DOCS" && rowID === id) ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />

                                            <RowTable>
                                                <ImportantText id={user.id} text={user.email} bgColor="var(--light-primary)" />
                                            </RowTable>

                                            <RowTable contentMiddle={true}>
                                                <ImportantText id={tasker_type} bgColor={tasker_type === "individual" ? "rgb(135,206,235)" : "#f97316"} />
                                            </RowTable>

                                            <RowTable title={Residence_status} />

                                            <RowTable contentMiddle>
                                                {!permit_expiration_date?.length ? <TbCalendarMonth className="text-2xl cursor-default opacity-35" /> : permit_expiration_date.slice(0, 10)}
                                            </RowTable>

                                            <RowTable contentMiddle={true}>
                                                <div className="flex items-center gap-x-4">
                                                    <TbUserPause title="is active?" className={`text-2xl cursor-default ${!is_active ? "opacity-25" : ""}`} />
                                                    <TbUserShield title="is verify?" className={`text-2xl cursor-default ${!is_verified ? "opacity-25" : ""}`} />
                                                </div>
                                            </RowTable>

                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setRowID(id)
                                                setEditType("DOCS")
                                            }}>
                                                <HiOutlineDocumentDuplicate className="text-2xl" />
                                            </RowTable>

                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setTaskerVerifyDescription({ id, description, isValid: false })
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
                                                        setTaskerVerifyInfos({ id, user_id: user.id, permit_expiration_date, tasker_type, Residence_status, is_verified, is_active, description })
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

            <div className={`${editType === "DOCS" ? "translate-y-[0] h-auto" : "translate-y-[-1300px] h-0"} transition-transform duration-700`}>
                <TaskerDocs taskerVerificationID={editType === "DOCS" ? rowID : 0} onClose={() => setEditType("NULL")} />
            </div>
        </section>
    )
}

export default TaskerVerifications