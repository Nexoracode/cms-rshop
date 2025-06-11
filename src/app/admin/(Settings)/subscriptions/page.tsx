"use client"

import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
////? Utils
import { scrollToTop } from "@utils/helper";
import { sendRequestWithLoading } from "@utils/configs/axios";
////? Components
// Globals
import Input from "@comp_global/Input";
import TextArea from "@comp_global/TextArea";
import SelectBox from "@comp_global/SelectBox";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import RowTable from "@comp_p-admin/modules/RowTable";
import Table from "@comp_p-admin/modules/Table";
////? Icons
import { TbEdit } from "react-icons/tb";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2";
import { MdOutlineCalendarMonth, MdOutlineDelete } from "react-icons/md";
////? Types
import { EditType, Description } from "@comp_types/Types"
import { FaRegCreditCard } from "react-icons/fa";
type Subscription = { id?: number, title: string, price: string, duration: DataType, description?: string }
type DataType = "monthly" | "annual"

const SubScriptions = () => {

    const [subscriptionInfos, setSubscriptionInfos] = useState<Subscription>({ id: 1, title: "", duration: "monthly", price: "", description: "" })
    const [subscriptionDescription, setSubscriptionDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [editType, setEditType] = useState<EditType>("NULL")
    // Pagination
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    const [dataType, setDataType] = useState<DataType>("monthly")

    useEffect(() => {
        getSubscriptionsHandler()
    }, [activePage])

    //! Content DataType Table ( Show In DOM )

    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setSubscriptionInfos({ id: 1, title: "", duration: "monthly", price: "", description: "" })
        setSubscriptionDescription({ id: 1, description: "", isValid: false })
    }

    //! Get
    const getSubscriptionsHandler = async () => {

        const res = await sendRequestWithLoading(`/admin/subscription?page=${activePage}`, {}, "post", "Getting Subscription", false, false)
        if (res?.data?.data) {
            const { subscriptions, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(subscriptions)
        }
    }

    //! Create
    const AddNewSubscriptionHandler = async () => {
        delete subscriptionInfos.id
        console.log(subscriptionInfos);

        const res = await sendRequestWithLoading(`/admin/subscription/create`, { ...subscriptionInfos, price: +subscriptionInfos.price }, "post", "Adding New Subscription", false, false)
        if (res?.data?.data) {
            getSubscriptionsHandler()
            closeOnBoxHandler()
        }
    }

    //! Update
    const updateSubscriptionInfosHandler = async () => {
        let id = subscriptionInfos.id
        delete subscriptionInfos.id
        delete subscriptionInfos.description
        const res = await sendRequestWithLoading(`/admin/subscription/${id}`, { ...subscriptionInfos, price: +subscriptionInfos.price }, "put", "Update Subscription Information", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getSubscriptionsHandler()
        }
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/subscription/${subscriptionDescription.id}`, { description: data }, "put", "Update Description Subscription", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getSubscriptionsHandler()
        }
    }

    //! Delete
    const deleteSubscriptionHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The subscription will be removed from the website!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/subscription/${id}`, {}, "delete", "Deleting Subscription", false, false)
                res?.data?.data && getSubscriptionsHandler()
            }
        });
    }

    return (
        <section className={`transition-all duration-500 relative right-auto left-auto ${editType === "NULL" ? "-mt-8" : ""}`}>
            <WrapperContents
                editType={editType}
                onCloseOnBoxHandler={() => closeOnBoxHandler()}
                onUpdateDescription={(data) => updateDescriptionHandler(data)}
                defaultDescription={subscriptionDescription.description}
                conditionForDisabledBtn={subscriptionInfos.title.length >= 3 && editType !== "NULL" ? false : true}
                onUpdateContent={editType === "UPDATE" ? updateSubscriptionInfosHandler : AddNewSubscriptionHandler}
                hiddenContentsForCreate={[-1]}
                hiddenContentsForUpdate={[3]}
                totalContent={
                    <>
                        <Input defaultValue={subscriptionInfos.title} onInpValue={val => setSubscriptionInfos(prev => ({ ...prev, title: val }))} htmlFor="title" lablel="Title" placeholder="Subscription Name..." />
                        <SelectBox
                            label="Duration Type"
                            fields={[
                                { id: "monthly", icon: null, title: "Monthly (30 days)" },
                                { id: "annual", icon: null, title: "Annual (365 days)" },
                            ]}
                            selectedItemIcon={<MdOutlineCalendarMonth />}
                            onChoosedItem={value => {
                                setDataType(value as DataType)
                                subscriptionInfos.duration = value as DataType
                            }}
                            defaultSelectedId={dataType}
                        />
                        <Input min={1} allowDecimalOnly={true} defaultValue={subscriptionInfos.price} onInpValue={val => subscriptionInfos.price = val} htmlFor="Price" lablel="Price" placeholder="Price $..." />
                        <TextArea onInpValue={val => setSubscriptionInfos(prev => ({ ...prev, description: val }))} value={subscriptionInfos.description} placeholder="Your description to the subscription" lablel="Description" htmlFor="Description" />
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["Title", "Duration", "Price", "Description"]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Subscriptions",
                            headerIcon: <FaRegCreditCard className="text-4xl" />,
                            btnText: "Add",
                            onClickedBtnText: () => {
                                closeOnBoxHandler()
                                setEditType("CREATE")
                                scrollToTop()
                            }
                        }}
                        contentHeader={<></>}
                    >
                        {
                            dataList && dataList.length
                                ?
                                dataList.map(items => {
                                    const { id, title, description, duration, price } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && subscriptionDescription.id === id) || (subscriptionInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""}`}>

                                            <RowTable title={id} />
                                            <RowTable title={title} />
                                            <RowTable contentMiddle={true}>
                                                <span className={`${duration === "monthly" ? "bg-[var(--light-primary)] text-[var(--primary)]" : "bg-[rgba(135,206,235,.3)] text-sky-500"} px-2 rounded`}>{duration}</span>
                                            </RowTable>
                                            <RowTable title={`$ ${price}`} />
                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setSubscriptionDescription({ id, description, isValid: false })
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
                                                        setSubscriptionInfos({ id, title, description, duration, price })
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                    }}
                                                    className="table_row cursor-pointer text-green-700"
                                                />
                                                <MdOutlineDelete onClick={() => deleteSubscriptionHandler(id)} className="table_row cursor-pointer text-red-600" />
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

export default SubScriptions