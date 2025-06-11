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
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import Table from "@comp_p-admin/modules/Table";
import RowTable from "@comp_p-admin/modules/RowTable";
////? Icons
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2";
import { TbCategory2, TbDatabaseSearch, TbEdit, TbHttpDelete } from "react-icons/tb";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { LiaToolsSolid } from "react-icons/lia";
////? Types
import { EditType, Description } from "@comp_types/Types"
type Service = { id?: number, toolId: number, description?: "", is_deleted?: boolean }
type DataType = keyof Omit<Service, "id" | "description"> | "all_datas"
type Search = { key: DataType, value: any }
let test: any = ""
let serviseId: any = ""

const ServiceTools = () => {

    const [tools, setTools] = useState<Record<string, any>[]>([])
    const [categories, setCategories] = useState<Record<string, any>[]>([])
    const [services, setServices] = useState<Record<string, any>[]>([])
    const [selectedCategory, setSelectedCategory] = useState<number | string>(1)
    const [selectedService, setSelectedService] = useState<number | string>(1)
    const [serviceID, setServiceID] = useState<number | string>(0)
    //
    const [serviceToolsInfos, setServiceToolInfos] = useState<Service>({ id: 1, toolId: 1, description: "", is_deleted: false })
    const [serviceToolsDescription, setServiceToolDescription] = useState<Description>({ id: 1, description: "", isValid: false })
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
        getToolsHandler()
    }, [])

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getServiceToolsHandler()
    }, [search.value])

    useEffect(() => {
        test && getServiceToolsHandler()
        setActivePage(1)
    }, [selectedService])

    useEffect(() => {
        getServiceToolsHandler()
        activePage !== 1 && (test = "")
    }, [activePage])

    //! Content Data Table ( Show In DOM )
    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setServiceToolInfos({ id: 1, toolId: tools[0].id || 1, description: "", is_deleted: false })
        setServiceToolDescription({ id: 1, description: "", isValid: false })
    }

    const reRenderTable = (res: any) => {
        if (res?.data?.data) {
            getServiceToolsHandler()
            closeOnBoxHandler()
        }
    }

    const preparedFieldsTool = useMemo(() =>
        tools.map(tools => ({ id: tools.id, icon: null, title: tools.title })),
        [tools]
    );

    const preparedFieldsService = useMemo(() =>
        services.map(service => ({ id: service.id, icon: null, title: service.title })),
        [services]
    );

    const preparedFieldsCategories = useMemo(() =>
        categories.map(service => ({ id: service.id, icon: null, title: service.title })),
        [categories]
    );

    //! Get
    const getServiceToolsHandler = async () => {

        if (test) {
            setDataList([])
            const { key, value } = search
            const filterTable: Record<string, any> = {}
            if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
            else if (key !== "all_datas") filterTable[key] = value

            const res = await sendRequestWithLoading(`/admin/service/${selectedService}/tools?page=${activePage}`, filterTable, "post", "Getting Service Tools", false, false);
            if (res?.data?.data) {
                const { serviceTools, size, page, total, totalPages } = res.data.data[0]
                setPaginations({ size, page, total, totalPages })
                setDataList(serviceTools)
                setServiceID(serviseId)
            }
        }
        test = "hello world!"
    }

    const getCategoriesHandler = async () => {
        const res = await sendRequestWithLoading(`/admin/category?get_all=true`, {}, "post", "", false, false, false)
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
        const resServices = await sendRequestWithLoading(`/admin/${catID}/service?get_all=true`, { is_tool_required: true }, "post", "", false, false, false)
        if (resServices?.data?.data) {
            serviseId = resServices.data.data[0]?.id || 1
            test = ""
            setServiceID(serviseId)
            setSelectedService(serviseId)
            setServices(resServices.data.data || [])
            getServiceToolsHandler()
        }
    }

    const getToolsHandler = async () => {
        const res = await sendRequestWithLoading("/admin/equipment/tool?get_all=true", {}, "post", "", false, false, false)
        if (res?.data?.data) {
            setServiceToolInfos(prev => ({ ...prev, toolId: res.data.data[0]?.id || 1 }))
            setTools(res.data.data)
        }
    }

    //! Create
    const addNewServiceHandler = async () => {
        delete serviceToolsInfos.id
        delete serviceToolsInfos.is_deleted
        const res = await sendRequestWithLoading(`/admin/service/${serviceID}/tools/create`, serviceToolsInfos, "post", "Adding New Service Tool", false, false)
        if (res?.data?.data) {
            serviceID === selectedService && getServiceToolsHandler()
            setSelectedService(serviceID)
            closeOnBoxHandler()
        }
    }

    //! Update
    const updateServiceInfosHandler = async () => {
        let id = serviceToolsInfos.id
        delete serviceToolsInfos.id
        delete serviceToolsInfos.description
        const res = await sendRequestWithLoading(`/admin/service/${selectedService}/tools/${id}`, serviceToolsInfos, "put", "Update Service Tool Information", false, false)
        reRenderTable(res)
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/service/${selectedService}/tools/${serviceToolsDescription.id}`, { description: data }, "put", "Update Description Service", false, false)
        reRenderTable(res)
    }

    //! Delete
    const deleteServiceToolHandler = (serviceToolId: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The service Tool will be removed from the website!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/service/${selectedService}/tools/${serviceToolId}`, {}, "delete", "Deleting Service", false, false)
                res?.data?.data && getServiceToolsHandler()
            }
        });
    }

    return (
        <section className={`transition-all duration-500 relative right-auto left-auto ${editType === "NULL" ? "-mt-8" : ""}`}>
            <WrapperContents
                editType={editType}
                onCloseOnBoxHandler={() => closeOnBoxHandler()}
                onUpdateDescription={(data) => updateDescriptionHandler(data)}
                defaultDescription={serviceToolsDescription.description}
                conditionForDisabledBtn={false}
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
                        <SelectBox
                            label="Select Tool"
                            fields={preparedFieldsTool}
                            onChoosedItem={val => {
                                setServiceToolInfos(prev => ({ ...prev, toolId: val as any }))
                            }}
                            defaultSelectedId={serviceToolsInfos.toolId}
                            selectedItemIcon={<LiaToolsSolid />}
                            activeSearch={true}
                            isLoading={!tools.length ? true : false}
                        />
                        <TextArea onInpValue={val => setServiceToolInfos(prev => ({ ...prev, description: val as any }))} value={serviceToolsInfos.description} placeholder="Your description to the serviceTools" lablel="Description" htmlFor="Description" />

                        <div className="is-deleted mt-6">
                            <AcceptCheckbox onRememberChange={val => setServiceToolInfos(prev => ({ ...prev, is_deleted: val }))} defaultChecked={serviceToolsInfos.is_deleted} clearInp={!serviceToolsInfos.is_deleted} htmlForID="checked_is-deleted" title="Softly delete a service Tool" />
                        </div>
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["Service Type", "ID / Name Tool", "Is Deleted", "Description"]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Service Tools List",
                            headerIcon: <LuSettings2 className="text-4xl" />,
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
                                            { id: "toolId", icon: <LiaToolsSolid />, title: "Tool ID" },
                                            { id: "is_deleted", icon: <MdOutlineDelete />, title: "Is Deleted", custom: "text-red-600" },
                                        ]}
                                        onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                        defaultSelectedId={"all_datas"}
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
                                    const { id, tool, service, is_deleted, description } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && serviceToolsDescription.id === id) || (serviceToolsInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />
                                            <RowTable title={service.title} />
                                            <RowTable>
                                                <span title="Tool ID" className="px-1 mr-3 bg-[var(--light-primary)] text-[var(--primary)] rounded">{tool.id}</span>
                                                <span>{tool.title}</span>
                                            </RowTable>
                                            <RowTable contentMiddle={true}>
                                                <TbHttpDelete className={`table_row text-3xl ${is_deleted ? "text-red-600" : "opacity-30"}`} />
                                            </RowTable>
                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setServiceToolDescription({ id: id, description, isValid: false })
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
                                                        setServiceToolInfos({ id, toolId: tool.id, is_deleted, description })
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                    }}
                                                    className="table_row cursor-pointer text-green-700"
                                                />
                                                <MdOutlineDelete onClick={() => deleteServiceToolHandler(id)} className="table_row cursor-pointer text-red-600" />
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

export default ServiceTools