"use client"

import { useEffect, useMemo, useState } from "react";
import Swal from 'sweetalert2'
////? Utils
import { scrollToTop } from "@utils/helper";
import { sendRequestWithLoading } from "@utils/configs/axios";
////? Components
import AcceptCheckbox from "@comp_auth/modules/AcceptCheckbox";
// Globals
import SelectBox from "@comp_global/SelectBox";
import TextArea from "@comp_global/TextArea";
import Input from "@comp_global/Input";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import RowTable from "@comp_p-admin/modules/RowTable";
import Table from "@comp_p-admin/modules/Table";
////? Icons
import { MdMiscellaneousServices, MdOutlineDelete, MdOutlineQuestionMark } from "react-icons/md";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2";
import { LuSettings2 } from "react-icons/lu";
import { TbCategory2, TbDatabaseSearch, TbEdit, TbHttpDelete } from "react-icons/tb";
////? Types
import { EditType, Description } from "@comp_types/Types"
type Service = { id?: number, q: string, description?: "", is_deleted?: boolean }
type IsCorrect = Partial<{ q: boolean }>
type DataType = keyof Omit<Service, "id" | "description"> | "all_datas"
type Search = { key: DataType, value: any }
let test: any = ""
let serviseId: any = ""

const ServiceDetails = () => {

    const [categories, setCategories] = useState<Record<string, any>[]>([])
    const [services, setServices] = useState<Record<string, any>[]>([])
    const [selectedCategory, setSelectedCategory] = useState<number | string>(1)
    const [selectedService, setSelectedService] = useState<number | string>(1)
    const [serviceID, setServiceID] = useState<number | string>(0)
    //
    const [serviceDetailsInfos, setServiceDetailInfos] = useState<Service>({ id: 1, q: "", description: "", is_deleted: false })
    const [serviceDetailsDescription, setServiceDetailDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [isCorrectServiceFields, setIsCorrectServiceFields] = useState<IsCorrect>({ q: false })
    const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true)
    const [editType, setEditType] = useState<EditType>("NULL")
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    // SearchInTable
    const [search, setSearch] = useState<Search>({ key: "all_datas", value: null })

    useEffect(() => {
        test = ""
        getCategoriesHandler()
    }, [])

    useEffect(() => {
        editType === "CREATE" ? setIsActiveBtn(isCorrectServiceFields.q && services.length ? false : true) : setIsActiveBtn(false)
    }, [isCorrectServiceFields, editType])

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getServiceDetailsHandler()
    }, [search.value])

    useEffect(() => {
        test && getServiceDetailsHandler()
        setActivePage(1)
    }, [selectedService])

    useEffect(() => {
        getServiceDetailsHandler()
        activePage !== 1 && (test = "")
    }, [activePage])

    //! Content Data Table ( Show In DOM )
    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setServiceDetailInfos({ id: 1, q: "", description: "", is_deleted: false })
        setServiceDetailDescription({ id: 1, description: "", isValid: false })
    }

    const reRenderTable = (res: any) => {
        if (res?.data?.data) {
            getServiceDetailsHandler()
            closeOnBoxHandler()
        }
    }

    const preparedFieldsService = useMemo(() =>
        services.map(service => ({ id: service.id, icon: null, title: service.title })),
        [services]
    );

    const preparedFieldsCategories = useMemo(() =>
        categories.map(service => ({ id: service.id, icon: null, title: service.title })),
        [categories]
    );

    //! Get
    const getServiceDetailsHandler = async () => {

        if (test) {
            setDataList([])
            const { key, value } = search
            const filterTable: Record<string, any> = {}
            if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
            else if (key !== "all_datas") filterTable[key] = value

            const res = await sendRequestWithLoading(`/admin/service/${selectedService}/details?page=${activePage}`, filterTable, "post", "Getting Service Details", false, false);
            if (res?.data?.data) {
                const { serviceDetails, size, page, total, totalPages } = res.data.data[0]
                setPaginations({ size, page, total, totalPages })
                setDataList(serviceDetails)
                setServiceID(serviseId)
            }
        }
        test = "hello world!"
    }

    const getCategoriesHandler = async () => {
        const res = await sendRequestWithLoading("/admin/category?get_all=true", {}, "post", "", false, false, false)
        if (res?.data?.data) {
            let catID = res.data.data[0].id
            setSelectedCategory(catID)
            setCategories(res.data.data)
            getServiceHandler(catID)
        }
    }

    const getServiceHandler = async (catID: number) => {
        setServices([])
        setDataList([])
        const resServices = await sendRequestWithLoading(`/admin/${catID}/service?get_all=true`, {}, "post", "", false, false, false)
        if (resServices?.data?.data) {
            serviseId = resServices.data.data[0]?.id || 1
            test = ""
            setServiceID(serviseId)
            setSelectedService(serviseId)
            setServices(resServices.data.data || [])
            getServiceDetailsHandler()
        }
    }

    //! Create
    const addNewServiceHandler = async () => {
        delete serviceDetailsInfos.id
        delete serviceDetailsInfos.is_deleted

        const res = await sendRequestWithLoading(`/admin/service/${serviceID}/details/create`, serviceDetailsInfos, "post", "Adding New Service Detail", false, false)
        if (res?.data?.data) {
            serviceID === selectedService && getServiceDetailsHandler()
            setSelectedService(serviceID)
            closeOnBoxHandler()
        }
    }

    //! Update
    const updateServiceInfosHandler = async () => {
        let id = serviceDetailsInfos.id
        delete serviceDetailsInfos.id
        delete serviceDetailsInfos.description
        const res = await sendRequestWithLoading(`/admin/service/${selectedService}/details/${id}`, serviceDetailsInfos, "put", "Update Service Detail Information", false, false)
        reRenderTable(res)
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/service/${selectedService}/details/${serviceDetailsDescription.id}`, { description: data }, "put", "Update Description Service Detail", false, false)
        reRenderTable(res)
    }

    //! Delete
    const deleteServiceDetailHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The service details will be removed from the website!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/service/${selectedService}/details/${id}`, {}, "delete", "Deleting Service Details", false, false)
                res?.data?.data && getServiceDetailsHandler()
            }
        });
    }

    return (
        <section className={`relative right-auto left-auto ${editType === "NULL" ? "-mt-8" : ""}`}>
            <WrapperContents
                editType={editType}
                onCloseOnBoxHandler={() => closeOnBoxHandler()}
                onUpdateDescription={(data) => updateDescriptionHandler(data)}
                defaultDescription={serviceDetailsDescription.description}
                conditionForDisabledBtn={isActiveBtn}
                onUpdateContent={editType === "UPDATE" ? updateServiceInfosHandler : addNewServiceHandler}
                hiddenContentsForCreate={[3]}
                hiddenContentsForUpdate={[0, 2]}
                totalContent={
                    <>
                        <SelectBox
                            label="Select Service"
                            fields={preparedFieldsService}
                            onChoosedItem={val => setServiceID(val)}
                            defaultSelectedId={serviceID}
                            selectedItemIcon={<LuSettings2 />}
                            activeSearch={true}
                            isLoading={serviceID && services.length ? false : true}
                        />

                        <Input defaultValue={serviceDetailsInfos.q} onInpValue={(val, isValid) => {
                            serviceDetailsInfos.q = val;
                            setIsCorrectServiceFields(prev => ({ ...prev, q: isValid }))
                        }} htmlFor="question" lablel="Question ?" placeholder="Question..." />

                        <TextArea onInpValue={val => setServiceDetailInfos(prev => ({ ...prev, description: val as any }))} value={serviceDetailsInfos.description} placeholder="Your description to the serviceDetails" lablel="Description" htmlFor="Description" />

                        <div className="is-deleted mt-6">
                            <AcceptCheckbox onRememberChange={val => setServiceDetailInfos(prev => ({ ...prev, is_deleted: val }))} defaultChecked={serviceDetailsInfos.is_deleted} clearInp={!serviceDetailsInfos.is_deleted} htmlForID="checked_is-deleted" title="Softly delete a service Detail" />
                        </div>
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["Question", "Description", "Is Deleted"]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        enableShadow={editType === "NULL" ? true : false}
                        navbar={{
                            headerTitle: "Service Details",
                            headerIcon: <MdMiscellaneousServices className="text-4xl" />,
                            btnText: "Add",
                            onClickedBtnText: () => {
                                closeOnBoxHandler()
                                setEditType("CREATE")
                                scrollToTop()
                            }
                        }}
                        contentHeader={
                            <>
                                <SelectBox
                                    label="Selected Category"
                                    fields={preparedFieldsCategories}
                                    onChoosedItem={val => {
                                        setSelectedCategory(val)
                                        getServiceHandler(val as number)
                                    }}
                                    defaultSelectedId={selectedCategory}
                                    selectedItemIcon={<TbCategory2 />}
                                    activeSearch={true}
                                    isLoading={!categories.length ? true : false}
                                />
                                <SelectBox
                                    label="Selected Service"
                                    fields={preparedFieldsService}
                                    onChoosedItem={val => setSelectedService(val)}
                                    defaultSelectedId={selectedService}
                                    selectedItemIcon={<LuSettings2 />}
                                    activeSearch={true}
                                    isLoading={!services.length ? true : false}
                                />
                                <SearchInTable
                                    selectedItem={search.key}
                                    onSearchData={(key, value) => setSearch({ key, value })}
                                    classInLine={`sm:gap-x-4 ${search.key.includes("is_") ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}
                                >
                                    <SelectBox
                                        fields={[
                                            { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                            { id: "q", icon: <MdOutlineQuestionMark />, title: "Question" },
                                            { id: "is_deleted", icon: <MdOutlineDelete />, title: "Is Deleted", custom: "text-red-600" },
                                        ]}
                                        onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                        defaultSelectedId={"all_datas"}
                                        selectedItemIcon={<TbDatabaseSearch />}
                                        isLoading={!services.length ? true : false}
                                    />
                                </SearchInTable>
                            </>
                        }
                    >
                        {
                            dataList && dataList.length
                                ?
                                dataList.map(items => {
                                    const { id, q, is_deleted, description } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && serviceDetailsDescription.id === id) || (serviceDetailsInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />
                                            <RowTable title={q} customStyle="!max-w-[285px] ellipsis" />
                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setServiceDetailDescription({ id: id, description, isValid: false })
                                                setEditType("DESCRIPTION")
                                                scrollToTop()
                                            }}>
                                                {
                                                    description && description.length
                                                        ? <HiOutlineClipboardDocumentList className="table_row text-green-700" />
                                                        : <HiOutlineDocumentPlus className="table_row" />
                                                }
                                            </RowTable>
                                            <RowTable contentMiddle={true}>
                                                <TbHttpDelete className={`table_row text-3xl ${is_deleted ? "text-red-600" : "opacity-30"}`} />
                                            </RowTable>
                                            <td className="p-4 flex justify-center space-x-4">
                                                <TbEdit
                                                    onClick={() => {
                                                        setServiceDetailInfos({ id, q, is_deleted, description })
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                    }}
                                                    className="table_row cursor-pointer text-green-700"
                                                />
                                                <MdOutlineDelete onClick={() => deleteServiceDetailHandler(id)} className="table_row cursor-pointer text-red-600" />
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

export default ServiceDetails