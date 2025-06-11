"use client"

import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import CountryFlag from "react-country-flag";
////? Utils
import { scrollToTop } from "@utils/helper";
import { sendRequestWithLoading } from "@utils/configs/axios";
////? Components
import SelectBox from "@comp_global/SelectBox";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import RowTable from "@comp_p-admin/modules/RowTable";
import Table from "@comp_p-admin/modules/Table";
import CountrySelect from "@comp_p-admin/modules/CountrySelect";
////? Icons
import { TbEdit, TbDatabaseSearch } from "react-icons/tb";
import { LuTextCursorInput } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { IoEarthOutline } from "react-icons/io5";
////? Types
import { EditType } from "@comp_types/Types"
type Countries = { id?: number, name: string, short_name: string, calling_code: string }
type DataType = "name" | "all_datas"
type Search = { key: DataType, value: any }

const Countries = () => {

    const [countryInfos, setCountriesInfos] = useState<Countries>({ id: 1, calling_code: "", name: "", short_name: "" })
    const [editType, setEditType] = useState<EditType>("NULL")
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    // SearchInTable
    const [search, setSearch] = useState<Search>({ key: "all_datas", value: null })

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getCountriesHandler()
    }, [search.value])

    useEffect(() => {
        getCountriesHandler()
    }, [activePage])

    //! Content DataType Table ( Show In DOM )
    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setCountriesInfos({ id: 1, calling_code: "+1204", name: "Canada", short_name: "CA" })
    }

    const reRenderTable = (res: any) => {
        if (res?.data?.data) {
            getCountriesHandler()
            closeOnBoxHandler()
        }
    }

    //! Get
    const getCountriesHandler = async () => {

        const { key, value } = search
        const filterTable: Record<string, any> = {}
        if (key !== "all_datas") filterTable[key] = value

        const res = await sendRequestWithLoading(`/admin/locales/country?page=${activePage}`, filterTable, "post", "Getting Countries", false, false)
        if (res?.data?.data) {
            const { countries, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(countries)
        }
    }

    //! Create
    const AddNewCountriesHandler = async () => {
        delete countryInfos.id
        const res = await sendRequestWithLoading(`/admin/locales/country/create`, countryInfos, "post", "Adding New Country", false, false)
        reRenderTable(res)
    }

    //! Delete
    const deleteCountriesHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The country will be removed from the website!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/locales/country/${id}`, {}, "delete", "Deleting Country", false, false)
                res?.data?.data && getCountriesHandler()
            }
        });
    }

    return (
        <section className={`transition-all duration-500 relative right-auto left-auto ${editType === "NULL" ? "-mt-8" : ""}`}>
            <WrapperContents
                editType={editType}
                onCloseOnBoxHandler={() => closeOnBoxHandler()}
                onUpdateDescription={() => { }}
                defaultDescription={""}
                conditionForDisabledBtn={false}
                widthBox={"md:w-[530px]"}
                onUpdateContent={editType === "UPDATE" ? () => { } : AddNewCountriesHandler}
                hiddenContentsForCreate={[1]}
                hiddenContentsForUpdate={[-1]}
                totalContent={
                    <CountrySelect
                        onChoosedCountry={({ ...country }) => setCountriesInfos({ ...country })}
                        defaultCountry={countryInfos.short_name}
                    />
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["Flag", "Code", "Name", ""]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Countries List",
                            headerIcon: <IoEarthOutline className="text-4xl" />,
                            btnText: "Add",
                            onClickedBtnText: () => {
                                closeOnBoxHandler()
                                setEditType("CREATE")
                                scrollToTop()
                            }
                        }}
                        contentHeader={
                            <div className="py-4">
                                <SearchInTable
                                    selectedItem={search.key}
                                    onSearchData={(key, value) => setSearch({ key, value })}
                                    classInLine={`sm:gap-x-4 md:grid-cols`}
                                >
                                    <div>
                                        <SelectBox
                                            fields={[
                                                { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                                { id: "name", icon: <LuTextCursorInput />, title: "Country Name" },
                                            ]}
                                            onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                            defaultSelectedId={"all_datas"}
                                        />
                                    </div>
                                </SearchInTable>
                            </div>
                        }
                    >
                        {
                            dataList && dataList.length
                                ?
                                dataList.map(items => {
                                    const { id, name, short_name, calling_code } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(countryInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />
                                            <RowTable>
                                                <div className="flex items-center">
                                                    {
                                                        dataList.map(country => {
                                                            if (country.short_name === short_name) {
                                                                return (
                                                                    <CountryFlag
                                                                        key={country.id}
                                                                        countryCode={country.short_name}
                                                                        svg
                                                                        style={{ width: "1.8em", height: "1.8em", borderRadius: ".3em" }}
                                                                    />
                                                                )
                                                            }
                                                        })
                                                    }
                                                    <span className="ps-1"> {short_name}</span>
                                                </div>
                                            </RowTable>
                                            <RowTable>
                                                <span title="Calling Code" className="border border-[var(--primary)] px-1 py-[1px] text-[var(--primary)] rounded">{calling_code} </span>
                                            </RowTable>
                                            <RowTable title={name} />
                                            <td colSpan={0} style={{ display: "none", padding: 0, margin: 0, border: "none", width: 0, height: 0 }}></td>
                                            <td className="p-4 flex justify-center space-x-4">
                                                <MdOutlineDelete onClick={() => deleteCountriesHandler(id)} className="table_row cursor-pointer text-red-600" />
                                            </td>
                                            <td colSpan={0} style={{ display: "none", padding: 0, margin: 0, border: "none", width: 0, height: 0 }}></td>
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

export default Countries