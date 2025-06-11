"use client"

import { useEffect, useMemo, useState } from "react";
import Swal from 'sweetalert2'
////? Utils
import { scrollToTop } from "@utils/helper";
import { sendRequestWithLoading } from "@utils/configs/axios";
////? Components
// Auth
import AcceptCheckbox from "@comp_auth/modules/AcceptCheckbox";
// Globals
import LoadingContent from "@comp_global/LoadingContent";
import SelectBox from "@comp_global/SelectBox";
import TextArea from "@comp_global/TextArea";
import Input from "@comp_global/Input";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import RowTable from "@comp_p-admin/modules/RowTable";
import Table from "@comp_p-admin/modules/Table";
////? Icons
import { MdOutlineDelete } from "react-icons/md";
import { TbCategory2, TbDatabaseSearch, TbEdit, TbHttpDelete, TbTruckDelivery, TbUserShield } from "react-icons/tb";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2";
import { LuSearch, LuSettings2, LuTextCursorInput } from "react-icons/lu";
import { LiaToolsSolid } from "react-icons/lia";
////? Types
import { EditType, Description } from "@comp_types/Types"
type Service = {
    id?: number, title: string, category_id?: number | string, is_verify_required: boolean, is_tool_required: boolean, is_vehicle_required: boolean, description?: string, is_deleted?: boolean
}
type IsCorrect = Partial<{ title: boolean }>
type DataType = keyof Omit<Service, "id" | "description"> | "all_datas"
type Search = { key: DataType, value: any }
let test: any = ""
let categoryId: any = ""

const Services = () => {

    const [categories, setCategories] = useState<Record<string, any>[]>([])
    const [categoryID, setCategoryID] = useState<number | string>(1)
    const [selectedCategory, setSelectedCategory] = useState<number | string>(1)
    //
    const [serviceInfos, setServiceInfos] = useState<Service>({
        id: 1, category_id: 1, title: "", is_tool_required: false, is_vehicle_required: false, is_verify_required: false, description: "", is_deleted: false
    })
    const [serviceDescription, setServiceDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [isCorrectServiceFields, setIsCorrectServiceFields] = useState<IsCorrect>({ title: false })
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
        editType === "CREATE" ? setIsActiveBtn(isCorrectServiceFields.title && categories.length ? false : true) : setIsActiveBtn(false)
    }, [isCorrectServiceFields, editType])

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getServicesHandler()
    }, [search.value])

    useEffect(() => {
        test && getServicesHandler()
        setActivePage(1)
    }, [selectedCategory])

    useEffect(() => {
        getServicesHandler()
        activePage !== 1 && (test = "")
    }, [activePage])

    //! Content Data Table ( Show In DOM )
    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setServiceInfos({
            id: 1, title: "", category_id: selectedCategory, is_tool_required: false, is_vehicle_required: false, is_verify_required: false, description: "", is_deleted: false
        })
        setIsCorrectServiceFields({ title: false })
        setServiceDescription({ id: 1, description: "", isValid: false })
        setIsActiveBtn(true)
    }

    const preparedFields = useMemo(() =>
        categories.map(category => ({ id: category.id, icon: null, title: category.title })),
        [categories]
    );

    //! Get
    const getServicesHandler = async () => {

        if (test) {
            const { key, value } = search
            const filterTable: Record<string, any> = {}
            if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
            else if (key !== "all_datas") filterTable[key] = value

            const res = await sendRequestWithLoading(`/admin/${selectedCategory}/service?page=${activePage}`, filterTable, "post", "Getting Services", false, false);
            if (res?.data?.data) {
                const { services, size, page, total, totalPages } = res.data.data[0]
                setPaginations({ size, page, total, totalPages })
                setDataList(services)
                setCategoryID(categoryId)
            }
        }
        test = "hello world!"
    }

    const getCategoriesHandler = async () => {
        const res = await sendRequestWithLoading("/admin/category?get_all=true", {}, "post", "Getting Categories", false, false, false)
        if (res?.data?.data) {
            categoryId = res.data.data[0].id || 1
            test = ""
            getServicesHandler()
            setCategoryID(categoryId)
            setSelectedCategory(categoryId)
            setCategories(res.data.data || [])
        }
    }

    //! Create
    const addNewServiceHandler = async () => {
        delete serviceInfos.id
        delete serviceInfos.category_id
        delete serviceInfos.is_deleted

        const res = await sendRequestWithLoading(`/admin/${categoryID}/service/create`, serviceInfos, "post", "Adding New Service", false, false)
        if (res?.data?.data) {
            categoryID === selectedCategory && getServicesHandler()
            setSelectedCategory(categoryID)
            closeOnBoxHandler()
        }
    }

    //! Update
    const updateServiceInfosHandler = async () => {
        let id = serviceInfos.id
        delete serviceInfos.id
        delete serviceInfos.description
        const res = await sendRequestWithLoading(`/admin/${selectedCategory}/service/${id}`, serviceInfos, "put", "Update Service Information", false, false)
        if (res?.data?.data) {
            (editType === "UPDATE" && selectedCategory !== categoryID)
                ? setSelectedCategory(categoryID)
                : getServicesHandler()
            closeOnBoxHandler()
        }
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/${selectedCategory}/service/${serviceDescription.id}`, { description: data }, "put", "Update Description Service", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getServicesHandler()
        }
    }

    //! Delete
    const deleteServiceHandler = (serviceId: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The service will be removed from the website!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/${categoryID}/service/${serviceId}`, {}, "delete", "Deleting Service", false, false)
                res?.data?.data && getServicesHandler()
            }
        });
    }

    return (
        <section className={`transition-all duration-500 relative right-auto left-auto ${editType === "NULL" ? "-mt-8" : ""}`}>
            <WrapperContents
                editType={editType}
                onCloseOnBoxHandler={() => closeOnBoxHandler()}
                onUpdateDescription={(data) => updateDescriptionHandler(data)}
                defaultDescription={serviceDescription.description}
                conditionForDisabledBtn={isActiveBtn}
                onUpdateContent={editType === "UPDATE" ? updateServiceInfosHandler : addNewServiceHandler}
                hiddenContentsForCreate={[4]}
                hiddenContentsForUpdate={[2]}
                totalContent={
                    <>
                        <SelectBox
                            label="Select Service Category"
                            fields={preparedFields}
                            onChoosedItem={val => {
                                setCategoryID(val)
                                setServiceInfos(prev => ({ ...prev, category_id: val }))
                            }}
                            defaultSelectedId={categoryID}
                            selectedItemIcon={<TbCategory2 />}
                            activeSearch={true}
                            isLoading={!categories.length ? true : false}
                        />
                        <Input defaultValue={serviceInfos.title} onInpValue={(val, isValid) => {
                            serviceInfos.title = val;
                            setIsCorrectServiceFields(prev => ({ ...prev, title: isValid }))
                        }} htmlFor="title" lablel="Title" placeholder="Title Name..." />
                        {/* create */}
                        <TextArea onInpValue={val => setServiceInfos(prev => ({ ...prev, description: val }))} value={serviceInfos.description} placeholder="Your description to the service" lablel="Description" htmlFor="Description" />
                        <div className="grid sm:grid-cols-2 gap-8 my-6">
                            <AcceptCheckbox onRememberChange={val => setServiceInfos(prev => ({ ...prev, is_tool_required: val }))} defaultChecked={serviceInfos.is_tool_required} clearInp={!serviceInfos.is_tool_required} htmlForID="checked_is_tool_required" title="is tool required?" />
                            <AcceptCheckbox onRememberChange={val => setServiceInfos(prev => ({ ...prev, is_verify_required: val }))} defaultChecked={serviceInfos.is_verify_required} clearInp={!serviceInfos.is_verify_required} htmlForID="checked_is_verify_required" title="is email must verified?" />
                            <AcceptCheckbox onRememberChange={val => setServiceInfos(prev => ({ ...prev, is_vehicle_required: val }))} defaultChecked={serviceInfos.is_vehicle_required} clearInp={!serviceInfos.is_vehicle_required} htmlForID="checked_is_vehicle_required" title="is vehicle required?" />
                        </div>
                        {/* update */}
                        <div className="is-deleted">
                            <AcceptCheckbox onRememberChange={val => setServiceInfos(prev => ({ ...prev, is_deleted: val }))} defaultChecked={serviceInfos.is_deleted} clearInp={!serviceInfos.is_deleted} htmlForID="checked_is-deleted" title="Softly delete a service" />
                        </div>
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["Title", "Reqired Items", "Is Deleted", "Description"]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Services List",
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
                                    fields={preparedFields}
                                    onChoosedItem={val => setSelectedCategory(val)}
                                    defaultSelectedId={selectedCategory}
                                    selectedItemIcon={<TbCategory2 />}
                                    activeSearch={true}
                                    isLoading={!categories.length ? true : false}
                                />
                                <SearchInTable
                                    selectedItem={search.key}
                                    onSearchData={(key, value) => setSearch({ key, value })}
                                    classInLine={`sm:gap-x-4 ${search.key.includes("is_") ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}
                                >
                                    <SelectBox
                                        fields={[
                                            { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                            { id: "title", icon: <LuTextCursorInput />, title: "Title" },
                                            { id: "is_tool_required", icon: <LiaToolsSolid />, title: "Is Tool Required" },
                                            { id: "is_vehicle_required", icon: <TbTruckDelivery />, title: "Is Vehicle Required" },
                                            { id: "is_verify_required", icon: <TbUserShield />, title: "Is Verify Required", custom: "text-green-600" },
                                            { id: "is_deleted", icon: <MdOutlineDelete />, title: "Is Deleted", custom: "text-red-600" },
                                        ]}
                                        selectedItemIcon={<TbDatabaseSearch />}
                                        onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                        defaultSelectedId={"all_datas"}
                                        isLoading={!categories.length ? true : false}
                                    />
                                </SearchInTable>
                            </>
                        }
                    >
                        {
                            dataList && dataList.length
                                ?
                                dataList.map(items => {
                                    const { id, title, is_deleted, is_verify_required, is_tool_required, is_vehicle_required, description } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && serviceDescription.id === id) || (serviceInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>
                                            <RowTable title={id} />
                                            <RowTable title={title} />
                                            <RowTable contentMiddle={true}>
                                                <div className="flex items-center gap-x-4">
                                                    <TbTruckDelivery title="is vehicle required" className={`text-2xl cursor-default ${!is_vehicle_required ? "opacity-25" : ""}`} />
                                                    <LiaToolsSolid title="is tool required" className={`text-2xl cursor-default ${!is_tool_required ? "opacity-25" : ""}`} />
                                                    <TbUserShield title="is verify required" className={`text-2xl cursor-default ${!is_verify_required ? "opacity-25" : ""}`} />
                                                </div>
                                            </RowTable>
                                            <RowTable contentMiddle={true}>
                                                <TbHttpDelete className={`table_row text-3xl ${is_deleted ? "text-red-600" : "opacity-30"}`} />
                                            </RowTable>
                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setServiceDescription({ id, description, isValid: false })
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
                                                        setServiceInfos({ id, title, category_id: selectedCategory, is_deleted, is_verify_required, is_tool_required, is_vehicle_required, description })
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                    }}
                                                    className="table_row cursor-pointer text-green-700"
                                                />
                                                <MdOutlineDelete onClick={() => deleteServiceHandler(id)} className="table_row cursor-pointer text-red-600" />
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

export default Services