"use client"

import { useEffect, useState } from "react";
////? Utils
import { sendRequestWithLoading } from "@utils/configs/axios";
////? Components
import SelectBox from "@comp_global/SelectBox";
// Admin
import Table from "@comp_p-admin/modules/Table";
import RowTable from "@comp_p-admin/modules/RowTable";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import ImportantText from "@comp_p-admin/modules/ImportantText";
////? Icons
import { TbDatabaseSearch, TbUserCheck, TbUserPause } from "react-icons/tb";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { LuHistory, LuSettings2 } from "react-icons/lu";
import { BsInputCursorText } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa";
import { PiMoneyWavyBold } from "react-icons/pi";
////? Types
type FilterType = "active" | "expired"
type DataType = "subscription_title" | "tasker_email" | "filterType" | "transactionId" | "all_datas"
type Search = { key: DataType, value: any }

const TaskerSubscriptions = () => {

    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    // SearchInTable
    const [filter, setFilter] = useState<FilterType>("active")
    const [search, setSearch] = useState<Search>({ key: "all_datas", value: null })

    useEffect(() => {
        getSubscriptionsHandler()
    }, [activePage])

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getSubscriptionsHandler()
    }, [search.value])

    const calculateRemainingDays = (startDate: string, endDate: string): any => {

        const start = new Date(startDate);
        const end = new Date(endDate);

        const timeDifference = end.getTime() - start.getTime();
        const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (remainingDays === 0) return <p className="text-red-500">InActive</p>
        else return remainingDays;
    }

    //! Get
    const getSubscriptionsHandler = async () => {

        const { key, value } = search
        const filterTable: Record<string, any> = {}
        if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
        else if (key !== "all_datas") filterTable[key] = value

        const res = await sendRequestWithLoading(`/admin/tasker-subscriptions?page=${activePage}`, filterTable, "post", "Getting Subscription", false, false)
        if (res?.data?.data) {
            const { taskerSubscriptions, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(taskerSubscriptions)
        }
    }

    return (
        <section className="-mt-8">
            <Table
                onActivePage={value => setActivePage(value)}
                cols={["ID / Email", "ID / Subscription", "TransAction", "Start Date", "End Date", "Remainig", "History", "", ""]}
                hasDatas={dataList?.length ? true : false}
                paginationProps={paginations}
                navbar={{
                    headerTitle: "Subscriptions",
                    headerIcon: <FaRegCreditCard className="text-4xl" />,
                    btnText: "",
                    onClickedBtnText: () => { }
                }}
                contentHeader={
                    <div className="py-4">
                        <SearchInTable
                            selectedItem={search.key}
                            keysDontSelect={["filterType"]}
                            onSearchData={(key, value) => {
                                const { key: keyProp } = search
                                setSearch({
                                    key,
                                    value: keyProp === "filterType" ? filter : value
                                })
                            }}
                            classInLine={`sm:gap-x-4 ${search.key === 'filterType' ? "sm:grid-cols-2 md:grid-cols-3" : "md:grid-cols-2"}`}
                        >
                            <SelectBox
                                fields={[
                                    { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                    { id: "filterType", icon: <LuSettings2 />, title: "Filter Type" },
                                    { id: "subscription_title", icon: <BsInputCursorText />, title: "Subscription Title" },
                                    { id: "transactionId", icon: <PiMoneyWavyBold />, title: "Transaction ID" },
                                    { id: "tasker_email", icon: <MdOutlineAlternateEmail />, title: "Tasker Email" },
                                ]}
                                onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                defaultSelectedId={"all_datas"}
                            />

                            {
                                search.key === "filterType"
                                    ?
                                    <SelectBox
                                        fields={[
                                            { id: "expired", icon: <TbUserPause />, title: "Expired Subscriptions", custom: "text-red-500" },
                                            { id: "active", icon: <TbUserCheck />, title: "Active Subscriptions", custom: "text-green-500" },
                                        ]}
                                        onChoosedItem={value => setFilter(value as FilterType)}
                                        defaultSelectedId={"active"}
                                    />
                                    : ""
                            }
                        </SearchInTable>
                    </div>
                }
                activeAction={false}
            >
                {
                    dataList && dataList.length
                        ?
                        dataList.map(items => {
                            const { id, subscription, tasker, transaction, start_date, end_date } = items

                            return (
                                <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300`}>

                                    <RowTable title={id} />

                                    <RowTable>
                                        <ImportantText id={tasker.id} text={tasker.email} bgColor="var(--light-primary)" />
                                    </RowTable>

                                    <RowTable>
                                        <ImportantText id={subscription.id} text={subscription.title} bgColor="var(--light-primary)" isTextImportant />
                                    </RowTable>

                                    <RowTable title={transaction} />

                                    <RowTable>
                                        <ImportantText idHover="start time" id={start_date.slice(11, 16)} text={start_date.slice(0, 10)} bgColor="#22c55e" />
                                    </RowTable>

                                    <RowTable>
                                        <ImportantText idHover="end time" id={start_date.slice(11, 16)} text={start_date.slice(0, 10)} bgColor="#f97316 " />
                                    </RowTable>

                                    <RowTable contentMiddle={true}>{calculateRemainingDays(start_date, end_date)}</RowTable>

                                    <RowTable contentMiddle={true} clickOnRow={() => { alert("Info") }}>
                                        <LuHistory className="text-2xl" />
                                    </RowTable>
                                    <td colSpan={0} style={{ display: "none", padding: 0, margin: 0, border: "none", width: 0, height: 0 }}></td>
                                    <td colSpan={0} style={{ display: "none", padding: 0, margin: 0, border: "none", width: 0, height: 0 }}></td>
                                </tr>
                            )
                        })
                        : ""
                }
            </Table>
        </section>
    )
}

export default TaskerSubscriptions