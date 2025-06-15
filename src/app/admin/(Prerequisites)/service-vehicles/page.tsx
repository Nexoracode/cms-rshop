"use client"

import { useEffect, useMemo, useState } from "react";
import Swal from 'sweetalert2'
////? Utils
import { scrollToTop } from "@utils/helper";
import { sendRequestWithLoading } from "@utils/configs/axios";
////? Components
import AcceptCheckbox from "@/components/auth/AcceptCheckbox";
// Globals
import LoadingContent from "@comp_global/LoadingContent";
import SelectBox from "@comp_global/SelectBox";
import TextArea from "@comp_global/TextArea";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import RowTable from "@comp_p-admin/modules/RowTable";
import Table from "@comp_p-admin/modules/Table";
////? Icons
import { TbCategory2, TbDatabaseSearch, TbEdit, TbHttpDelete, TbTruckDelivery } from "react-icons/tb";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2";
import { LuSearch, LuSettings2 } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
////? Types
import { EditType, Description } from "@comp_types/Types"
type Service = { id?: number, vehicleId: number, description?: "", is_deleted?: boolean }
type DataType = keyof Omit<Service, "id" | "description"> | "all_datas"
type Search = { key: DataType, value: any }
let test: any = ""
let serviseId: any = ""

const ServiceVehicles = () => {

    const [vehicles, setVehicles] = useState<Record<string, any>[]>([])
    const [categories, setCategories] = useState<Record<string, any>[]>([])
    const [services, setServices] = useState<Record<string, any>[]>([])
    const [selectedCategory, setSelectedCategory] = useState<number | string>(1)
    const [selectedService, setSelectedService] = useState<number | string>(1)
    const [serviceID, setServiceID] = useState<number | string>(0)
    //
    const [serviceVehiclesInfos, setServiceVehicleInfos] = useState<Service>({ id: 1, vehicleId: 1, description: "", is_deleted: false })
    const [serviceVehiclesDescription, setServiceVehicleDescription] = useState<Description>({ id: 1, description: "", isValid: false })
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
        getVehiclesHandler()
    }, [])

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getServiceVehiclesHandler()
    }, [search.value])

    useEffect(() => {
        test && getServiceVehiclesHandler()
        setActivePage(1)
    }, [selectedService])

    useEffect(() => {
        getServiceVehiclesHandler()
        activePage !== 1 && (test = "")
    }, [activePage])

    //! Content Data Table ( Show In DOM )
    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setServiceVehicleInfos({ id: 1, vehicleId: vehicles[0].id, description: "", is_deleted: false })
        setServiceVehicleDescription({ id: 1, description: "", isValid: false })
    }

    const reRenderTable = (res: any) => {
        if (res?.data?.data) {
            getServiceVehiclesHandler()
            closeOnBoxHandler()
        }
    }

    const preparedFieldsVehicle = useMemo(() =>
        vehicles.map(vehicles => ({ id: vehicles.id, icon: null, title: vehicles.title })),
        [vehicles]
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
    const getServiceVehiclesHandler = async () => {

        if (test) {
            setDataList([])
            const { key, value } = search
            const filterTable: Record<string, any> = {}
            if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
            else if (key !== "all_datas") filterTable[key] = value

            const res = await sendRequestWithLoading(`/admin/service/${selectedService}/vehicles?page=${activePage}`, filterTable, "post", "Getting Service Vehicles", false, false);
            if (res?.data?.data) {
                const { serviceVehicles, size, page, total, totalPages } = res.data.data[0]
                setPaginations({ size, page, total, totalPages })
                setDataList(serviceVehicles)
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
        const resServices = await sendRequestWithLoading(`/admin/${catID}/service?get_all=true`, { is_vehicle_required: true }, "post", "", false, false, false)
        if (resServices?.data?.data) {
            serviseId = resServices.data.data[0]?.id || 1
            test = ""
            setServiceID(serviseId)
            setSelectedService(serviseId)
            setServices(resServices.data.data || [])
            getServiceVehiclesHandler()
        }
    }

    const getVehiclesHandler = async () => {
        const res = await sendRequestWithLoading("/admin/equipment/vehicle?get_all=true", {}, "post", "", false, false, false)
        if (res?.data?.data) {
            setServiceVehicleInfos(prev => ({ ...prev, vehicleId: res.data.data[0]?.id || 1 }))
            setVehicles(res.data.data)
        }
    }

    //! Create
    const addNewServiceHandler = async () => {
        delete serviceVehiclesInfos.id
        delete serviceVehiclesInfos.is_deleted
        const res = await sendRequestWithLoading(`/admin/service/${serviceID}/vehicles/create`, serviceVehiclesInfos, "post", "Adding New Service Vehicle", false, false)
        if (res?.data?.data) {
            serviceID === selectedService && getServiceVehiclesHandler()
            setSelectedService(serviceID)
            closeOnBoxHandler()
        }
    }

    //! Update
    const updateServiceInfosHandler = async () => {
        let id = serviceVehiclesInfos.id
        delete serviceVehiclesInfos.id
        delete serviceVehiclesInfos.description
        const res = await sendRequestWithLoading(`/admin/service/${selectedService}/vehicles/${id}`, serviceVehiclesInfos, "put", "Update Service Vehicle Information", false, false)
        reRenderTable(res)
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/service/${selectedService}/vehicles/${serviceVehiclesDescription.id}`, { description: data }, "put", "Update Description Service", false, false)
        reRenderTable(res)
    }

    //! Delete
    const deleteServiceVehicleHandler = (serviceVehicleId: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The service Vehicle will be removed from the website!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/service/${selectedService}/vehicles/${serviceVehicleId}`, {}, "delete", "Deleting Service", false, false)
                res?.data?.data && getServiceVehiclesHandler()
            }
        });
    }

    return (
        <section className={`transition-all duration-500 relative right-auto left-auto ${editType === "NULL" ? "-mt-8" : ""}`}>
            <WrapperContents
                editType={editType}
                onCloseOnBoxHandler={() => closeOnBoxHandler()}
                onUpdateDescription={(data) => updateDescriptionHandler(data)}
                defaultDescription={serviceVehiclesDescription.description}
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
                            label="Select Vehicle"
                            fields={preparedFieldsVehicle}
                            onChoosedItem={val => {
                                setServiceVehicleInfos(prev => ({ ...prev, vehicleId: val as any }))
                            }}
                            defaultSelectedId={serviceVehiclesInfos.vehicleId}
                            selectedItemIcon={<TbTruckDelivery />}
                            activeSearch={true}
                            isLoading={vehicles.length ? false : true}
                        />
                        <TextArea onInpValue={val => setServiceVehicleInfos(prev => ({ ...prev, description: val as any }))} value={serviceVehiclesInfos.description} placeholder="Your description to the serviceVehicles" lablel="Description" htmlFor="Description" />

                        <div className="is-deleted mt-6">
                            <AcceptCheckbox onRememberChange={val => setServiceVehicleInfos(prev => ({ ...prev, is_deleted: val }))} defaultChecked={serviceVehiclesInfos.is_deleted} clearInp={!serviceVehiclesInfos.is_deleted} htmlForID="checked_is-deleted" title="Softly delete a service Vehicle" />
                        </div>
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["Service Type", "ID / Name Vehicle", "Is Deleted", "Description"]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Service Vehicles List",
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
                                    isLoading={categories.length ? false : true}
                                />
                                <SelectBox
                                    label="Selected Service"
                                    fields={preparedFieldsService}
                                    onChoosedItem={val => setSelectedService(val)}
                                    defaultSelectedId={selectedService}
                                    selectedItemIcon={<LuSettings2 />}
                                    activeSearch={true}
                                    isLoading={services.length ? false : true}
                                />
                                <SearchInTable
                                    selectedItem={search.key}
                                    onSearchData={(key, value) => setSearch({ key, value })}
                                    classInLine={`sm:gap-x-4 ${search.key.includes("is_") ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}
                                >
                                    <SelectBox
                                        fields={[
                                            { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                            { id: "vehicleId", icon: <TbTruckDelivery />, title: "Vehicle ID" },
                                            { id: "is_deleted", icon: <MdOutlineDelete />, title: "Is Deleted", custom: "text-red-600" },
                                        ]}
                                        onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                        defaultSelectedId={"all_datas"}
                                        isLoading={services.length ? false : true}
                                    />
                                </SearchInTable>
                            </>
                        }
                    >
                        {
                            dataList && dataList.length
                                ?
                                dataList.map(items => {
                                    const { id, vehicle, service, is_deleted, description } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && serviceVehiclesDescription.id === id) || (serviceVehiclesInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />
                                            <RowTable title={service.title} />
                                            <RowTable>
                                                <span title="Vehicle ID" className="px-1 mr-3 bg-[var(--light-primary)] text-[var(--primary)] rounded">{vehicle.id}</span>
                                                <span>{vehicle.title}</span>
                                            </RowTable>
                                            <RowTable contentMiddle={true}>
                                                <TbHttpDelete className={`table_row text-3xl ${is_deleted ? "text-red-600" : "opacity-30"}`} />
                                            </RowTable>
                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setServiceVehicleDescription({ id: id, description, isValid: false })
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
                                                        setServiceVehicleInfos({ id, vehicleId: vehicle.id, is_deleted, description })
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                    }}
                                                    className="table_row cursor-pointer text-green-700"
                                                />
                                                <MdOutlineDelete onClick={() => deleteServiceVehicleHandler(id)} className="table_row cursor-pointer text-red-600" />
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

export default ServiceVehicles