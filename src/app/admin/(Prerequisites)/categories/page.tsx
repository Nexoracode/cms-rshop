"use client"

import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
////? Utils
import { scrollToTop } from "@utils/helper";
import { sendRequestWithLoading } from "@utils/configs/axios";
////? Components
import AcceptCheckbox from "@/components/auth/AcceptCheckbox";
// Globals
import SelectBox from "@comp_global/SelectBox";
import Input from "@comp_global/Input";
import TextArea from "@comp_global/TextArea";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import RowTable from "@comp_p-admin/modules/RowTable";
import Table from "@comp_p-admin/modules/Table";
////? Icons
import { TbEdit, TbDatabaseSearch, TbCategory2, TbHttpDelete } from "react-icons/tb";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2";
import { LuTextCursorInput } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
////? Types
import { EditType, Description } from "@comp_types/Types"
type Category = { id?: number, title: string, description?: string, is_deleted?: boolean }
type IsCorrect = Partial<{ title: boolean }>
type DataType = keyof Omit<Category, "id" | "description"> | "all_datas"
type Search = { key: DataType, value: any }

const Category = () => {

    const [categoryInfos, setCategoryInfos] = useState<Category>({ id: 1, title: "", description: "", is_deleted: false })
    const [categoryDescription, setCategoryDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [isCorrectCategoryFields, setIsCorrectCategoryFields] = useState<IsCorrect>({ title: false })
    const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true)
    const [editType, setEditType] = useState<EditType>("NULL")
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    // SearchInTable
    const [search, setSearch] = useState<Search>({ key: "all_datas", value: null })

    useEffect(() => {
        editType === "CREATE" ? setIsActiveBtn((isCorrectCategoryFields.title) ? false : true) : setIsActiveBtn(false)
    }, [isCorrectCategoryFields, editType])

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getCategoriesHandler()
    }, [search.value])

    useEffect(() => {
        getCategoriesHandler()
    }, [activePage])

    //! Content DataType Table ( Show In DOM )
    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setCategoryInfos({ id: 1, title: "", description: "", is_deleted: false })
        setIsCorrectCategoryFields({ title: false })
        setCategoryDescription({ id: 1, description: "", isValid: false })
        setIsActiveBtn(true)
    }

    const reRenderTable = (res: any) => {
        if (res?.data?.data) {
            getCategoriesHandler()
            closeOnBoxHandler()
        }
    }

    //! Get
    const getCategoriesHandler = async () => {

        setDataList([])
        const { key, value } = search
        const filterTable: Record<string, any> = {}
        if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
        else if (key !== "all_datas") filterTable[key] = value

        const res = await sendRequestWithLoading(`/admin/category?page=${activePage}`, filterTable, "post", "Getting Category", false, false)
        if (res?.data?.data) {
            const { cats, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(cats)
        }
    }

    //! Create
    const AddNewCategoryHandler = async () => {
        delete categoryInfos.id
        delete categoryInfos.is_deleted
        const res = await sendRequestWithLoading(`/admin/category/create`, categoryInfos, "post", "Adding New Category", false, false)
        reRenderTable(res)
    }

    //! Update
    const updateCategoryInfosHandler = async () => {
        let id = categoryInfos.id
        delete categoryInfos.id
        delete categoryInfos.description
        const res = await sendRequestWithLoading(`/admin/category/${id}`, categoryInfos, "put", "Update Category Information", false, false)
        reRenderTable(res)
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/category/${categoryDescription.id}`, { description: data }, "put", "Update Description Category", false, false)
        reRenderTable(res)
    }

    //! Delete
    const deleteCategoryHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The category will be removed from the website!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/category/${id}`, {}, "delete", "Deleting Category", false, false)
                res?.data?.data && getCategoriesHandler()
            }
        });
    }

    return (
        <section className={`transition-all duration-500 relative right-auto left-auto ${editType === "NULL" ? "-mt-8" : ""}`}>
            <WrapperContents
                editType={editType}
                onCloseOnBoxHandler={() => closeOnBoxHandler()}
                onUpdateDescription={(data) => updateDescriptionHandler(data)}
                defaultDescription={categoryDescription.description}
                conditionForDisabledBtn={isActiveBtn}
                onUpdateContent={editType === "UPDATE" ? updateCategoryInfosHandler : AddNewCategoryHandler}
                hiddenContentsForCreate={[2]}
                hiddenContentsForUpdate={[1]}
                totalContent={
                    <>
                        <Input defaultValue={categoryInfos.title} onInpValue={(val, isValid) => {
                            categoryInfos.title = val;
                            setIsCorrectCategoryFields(prev => ({ ...prev, title: isValid }))
                        }} htmlFor="title" lablel="Title" placeholder="Category Name..." />
                        <TextArea onInpValue={val => setCategoryInfos(prev => ({ ...prev, description: val }))} value={categoryInfos.description} placeholder="Your description to the category" lablel="Description" htmlFor="Description" />
                        <div className="is-deleted mt-6">
                            <AcceptCheckbox onRememberChange={val => setCategoryInfos(prev => ({ ...prev, is_deleted: val }))} defaultChecked={categoryInfos.is_deleted} clearInp={!categoryInfos.is_deleted} htmlForID="checked_is-deleted" title="Softly delete a category" />
                        </div>
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["Title", "Is Deleted", "Description"]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Categories",
                            headerIcon: <TbCategory2 className="text-4xl" />,
                            btnText: "Add",
                            onClickedBtnText: () => {
                                closeOnBoxHandler()
                                setEditType("CREATE")
                                scrollToTop()
                            }
                        }}
                        contentHeader={
                            <>
                                <SearchInTable
                                    selectedItem={search.key}
                                    onSearchData={(key, value) => setSearch({ key, value })}
                                    classInLine={`sm:gap-x-4 ${search.key.includes("is_") ? "sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}
                                >
                                    <SelectBox
                                        fields={[
                                            { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                            { id: "title", icon: <LuTextCursorInput />, title: "Title" },
                                            { id: "is_deleted", icon: <MdOutlineDelete />, title: "Is Deleted", custom: "text-red-600" },
                                        ]}
                                        onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                        defaultSelectedId={"all_datas"}
                                    />
                                </SearchInTable>
                            </>
                        }
                    >
                        {
                            dataList && dataList.length
                                ?
                                dataList.map(items => {
                                    const { id, title, description, is_deleted, } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && categoryDescription.id === id) || (categoryInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />
                                            <RowTable title={title} />
                                            <RowTable contentMiddle={true}>
                                                <TbHttpDelete className={`table_row text-3xl ${is_deleted ? "text-red-600" : "opacity-30"}`} />
                                            </RowTable>
                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setCategoryDescription({ id, description, isValid: false })
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
                                                        setCategoryInfos({ id, title, description, is_deleted })
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                    }}
                                                    className="table_row cursor-pointer text-green-700"
                                                />
                                                <MdOutlineDelete onClick={() => deleteCategoryHandler(id)} className="table_row cursor-pointer text-red-600" />
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

export default Category