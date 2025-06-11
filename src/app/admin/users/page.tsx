"use client"

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
////? Utils
import { sendRequestWithLoading } from "@utils/configs/axios";
import { objectToFormData, scrollToTop } from "@utils/helper";
import CountryFlag from "react-country-flag";
////? Components
// Auth
import AcceptCheckbox from "@comp_auth/modules/AcceptCheckbox";
import InputPassword from "@comp_auth/modules/InputPassword";
import InputEmail from "@comp_auth/modules/InputEmail";
import InputPhone from "@comp_auth/modules/InputPhone";
// Globals
import CustomDatePicker from "@comp_global/CustomDatePicker";
import UploaderPhoto from "@comp_global/UploaderPhoto";
import PreviewPhoto from "@comp_global/PreviewPhoto";
import SelectBox from "@comp_global/SelectBox";
import TextArea from "@comp_global/TextArea";
import Input from "@comp_global/Input";
// Admin
import WrapperContents from "@comp_p-admin/modules/WrapperContents";
import ImportantText from "@comp_p-admin/modules/ImportantText";
import SearchInTable from "@comp_p-admin/modules/SearchInTable";
import RowTable from "@comp_p-admin/modules/RowTable";
import Table from "@comp_p-admin/modules/Table";
////? Icons
import { TbListDetails, TbUserEdit, TbUserMinus, TbUsers, TbUser, TbUserShield, TbUserPause, TbUserDollar, TbUserBolt, TbDatabaseSearch, TbPhoneCalling } from "react-icons/tb";
import { MdOutlineMarkEmailRead, MdOutlineMarkEmailUnread, MdAlternateEmail } from "react-icons/md";
import { HiOutlineClipboardDocumentList, HiOutlineDocumentPlus } from "react-icons/hi2";
import { FiPhoneOff } from "react-icons/fi";
import { LuCalendarDays, LuTextCursorInput } from "react-icons/lu";
import { BsSignpostSplit } from "react-icons/bs";
import { IoEarthOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
////? Types
import { EditType, Description } from "@comp_types/Types"
import { Role } from "@comp_types/Types";
import CountrySelect from "@/components/p-admin/modules/CountrySelect";
//
type User = {
    id?: number,
    role: Role,
    full_name: string,
    birth?: string,
    phone: string,
    nationality: Record<string, any> | number,
    postal_code: string,
    email?: string,
    password?: string,
    is_email_verified: boolean,
    is_active: boolean,
    is_deleted: boolean,
    description?: string
}
type IsCorrect = Partial<{
    password: boolean,
    postal_code: boolean,
    full_name: boolean,
    email: boolean,
    birth: boolean
}>
type DataType = keyof Omit<User, "id" | "password" | "description"> | "all_datas"
type Search = { key: DataType, value: any }
type Countries = { id?: number, name: string; short_name: string; calling_code: string }[]
//
let textEmail: string = ""
let textBirth: string = ""

const Users = () => {

    const [userInfos, setUserInfos] = useState<User>({
        id: 1,
        role: "customer",
        full_name: "",
        birth: "",
        nationality: 1,
        email: "",
        phone: "",
        postal_code: "",
        is_email_verified: false,
        is_active: false,
        is_deleted: false,
        description: ""
    })
    const [userDescription, setUserDescription] = useState<Description>({ id: 1, description: "", isValid: false })
    const [isCorrectUserFields, setIsCorrectUserFields] = useState<IsCorrect>({ email: false, full_name: false, birth: false, postal_code: false, password: false })
    const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true)
    const [password, setPassword] = useState<string>("")
    const [editType, setEditType] = useState<EditType>("NULL")
    //
    const [paginations, setPaginations] = useState<Record<string, any>>({})
    const [activePage, setActivePage] = useState<number>(1)
    const [dataList, setDataList] = useState<Record<string, any>[]>([])
    const [countriesList, setCountriesList] = useState<Record<string, any>[]>([])
    // User Photo
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [photo, setPhoto] = useState<any>(null);
    const [preview, setPreview] = useState<any>(null);
    // SearchInTable
    const [search, setSearch] = useState<Search>({ key: "all_datas", value: null })
    const [role, setRole] = useState<Role>("all_roles")

    useEffect(() => {
        getCountriesHandler()
    }, [])

    useEffect(() => {
        if (editType === "CREATE") {
            const { email, full_name, password, postal_code, birth } = isCorrectUserFields;
            setIsActiveBtn((email && full_name && password && postal_code && birth) ? false : true)
        }
        else
            setIsActiveBtn(false)
    }, [isCorrectUserFields, editType])

    // Search Handler Effects
    useEffect(() => {
        setSearch(prev => ({ ...prev, value: null }))
    }, [search.key])

    useEffect(() => {
        const { key, value } = search
        key !== "all_datas" && value && getUsersHandler()
    }, [search.value, role])

    useEffect(() => {
        getUsersHandler()
    }, [activePage])

    //! Content DataType Table ( Show In DOM )

    const choosedCountry = (countryInfos: any) => {
        if (countriesList.length) {
            const countryChoosed = +([...countriesList].find(country => country.short_name === countryInfos.short_name))?.id || 1
            setUserInfos(prev => ({ ...prev, nationality: countryChoosed }))
        }
    }

    const Rendernationality: React.FC<{ label?: string }> = React.useCallback(({ label = "" }) => {
        return (
            <CountrySelect
                label={label}
                onChoosedCountry={({ ...country }) => choosedCountry(country)}
                defaultCountry={countriesList.length && userInfos.nationality && (countriesList.find(country => country.id === userInfos.nationality))?.short_name || "CA"}
                isLoading={countriesList.length ? false : true}
                datas={countriesList! as Countries}
            />
        );
    }, [userInfos.nationality, countriesList])

    const RenderBirthDay: React.FC<{ label?: boolean }> = React.useCallback(({ label = true }) => {
        return (
            <CustomDatePicker
                label={label}
                onDate={date => {
                    setUserInfos(prev => ({ ...prev, birth: String(date) }))
                    setIsCorrectUserFields(prev => ({ ...prev, birth: date ? true : false }))
                }}
                defaultValue={userInfos.birth}
                showTime={false}
                yearsBack={10}
            />
        );
    }, [userInfos.birth])

    const showUserDetails = (createdAt: string, lastLogin: string) => {
        Swal.fire({
            icon: "info",
            title: "User Infos",
            html: `
                    <p class="pt-4 pb-2 text-start"><strong>Created At:</strong> ${createdAt && createdAt.slice(0, 10) || "N/A"}</p>
                    <p class="py-2 text-start"><strong>Last Login:</strong> ${lastLogin && lastLogin.slice(0, 10) || "User has not logged in yet."}</p>
                `,
            showConfirmButton: false
        });
    }

    const closeOnBoxHandler = () => {
        setEditType("NULL")
        setUserInfos({
            id: 1, role: "customer", description: "", birth: "", nationality: countriesList[0]?.id || 1, full_name: "", email: "", phone: "", postal_code: "", is_email_verified: false, is_active: false, is_deleted: false
        })
        setIsCorrectUserFields({ email: false, full_name: false, postal_code: false, password: false })
        setUserDescription({ id: 1, description: "", isValid: false })
        setPassword("")
        setIsActiveBtn(true)
        setSelectedFile(null)
        setPhoto(null)
    }

    //! Get
    const getUsersHandler = async () => {

        const { key, value } = search
        const filterTable: Record<string, any> = {}
        if (key.includes("is_")) filterTable[key] = value === "true" ? true : false
        else if (key !== "all_datas") filterTable[key] = value
        if (role !== "all_roles") filterTable["role"] = role

        const res = await sendRequestWithLoading(`/admin/user?page=${activePage}`, filterTable, "post", "Getting Users", false, false)
        if (res?.data?.data) {
            const { users, size, page, total, totalPages } = res.data.data[0]
            setPaginations({ size, page, total, totalPages })
            setDataList(users)
        }
    }

    const getCountriesHandler = async () => {
        const res = await sendRequestWithLoading(`/admin/locales/country?get_all=true`, {}, "post", "", false, false, false)
        if (res?.data?.data) {
            setCountriesList(res.data.data)
        }
    }

    //! Create
    const AddNewUserHandler = async () => {
        delete userInfos.id
        userInfos.password = password

        const conditions = {
            profile_photo: (value: any) => value !== null,
            id: () => false,
        };
        const formData = objectToFormData(selectedFile !== null ? { ...userInfos, profile_photo: selectedFile } : userInfos, new FormData(), conditions);

        const res = await sendRequestWithLoading(`/admin/user/create`, formData, "post", "Adding New User", false, false)
        if (res?.data?.data) {
            getUsersHandler()
            closeOnBoxHandler()
        }
    }

    //! Update
    const updateUserInfosHandler = async () => {
        password && (userInfos.password = password)
        textBirth === userInfos.birth && delete userInfos.birth
        delete userInfos.email
        delete userInfos.description

        const conditions = {
            profile_photo: (value: any) => value !== null,
            id: () => false,
        };
        const formData = objectToFormData(selectedFile !== null ? { ...userInfos, profile_photo: selectedFile } : userInfos, new FormData(), conditions);

        const res = await sendRequestWithLoading(`/admin/user/${userInfos.id}`, formData, "put", "Update User Information", false, false, true, "multipart/form-data")
        if (res?.data?.data) {
            closeOnBoxHandler()
            getUsersHandler()
        }
    }

    const updateDescriptionHandler = async (data: string) => {
        const res = await sendRequestWithLoading(`/admin/user/${userDescription.id}`, { description: data }, "put", "Update Description User", false, false)
        if (res?.data?.data) {
            closeOnBoxHandler()
            getUsersHandler()
        }
    }

    const banUserHandler = async (id: number, isActive: boolean) => {
        Swal.fire({
            title: "Are you sure?",
            text: isActive ? "The user's account will be temporarily restricted!!" : " The account is out of limits!!",
            icon: "warning",
            showCancelButton: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/user/${id}`, { is_active: !isActive }, "put", "Update User Activity", false, false)
                res?.data?.data && getUsersHandler()
            }
        });
    }

    //! Delete
    const deleteUserHandler = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "The user will be removed from the website!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await sendRequestWithLoading(`/admin/user/${id}`, {}, "delete", "Deleting User", false, false)
                res?.data?.data && getUsersHandler()
            }
        });
    }

    return (
        <section className={`transition-all duration-500 relative right-auto left-auto ${editType === "NULL" ? "-mt-8" : ""} `}>
            <WrapperContents
                editType={editType}
                onCloseOnBoxHandler={() => closeOnBoxHandler()}
                onUpdateDescription={(data) => updateDescriptionHandler(data)}
                defaultDescription={userDescription.description}
                conditionForDisabledBtn={isActiveBtn}
                onUpdateContent={editType === "UPDATE" ? updateUserInfosHandler : AddNewUserHandler}
                hiddenContentsForCreate={[6]}
                hiddenContentsForUpdate={[4]}
                totalContent={
                    <>
                        <div className='w-full flex items-center justify-center mt-4'>
                            <UploaderPhoto defaultImg={photo} onSelectedFile={file => setSelectedFile(file)} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-4 gap-x-12">
                            <Input defaultValue={userInfos.full_name} onInpValue={(val, isValid) => {
                                userInfos.full_name = val;
                                setIsCorrectUserFields(prev => ({ ...prev, full_name: isValid }))
                            }} htmlFor="full_name" lablel="Full Name" placeholder="User Name..." />

                            <RenderBirthDay />

                            <InputEmail disabled={editType === "UPDATE" ? true : false} defaultValue={userInfos.email} onIsCorrectEmail={(val, isValid) => {
                                userInfos.email = val;
                                setIsCorrectUserFields(prev => ({ ...prev, email: isValid }))
                            }} />

                            <InputPhone defaultValue={userInfos.phone} onIsCorrectPassword={val => userInfos.phone = val} label="Phone Number" title="Phone Number" />

                            <Rendernationality label="Select nationality" />

                            <Input defaultValue={userInfos.postal_code} onInpValue={(val, isValid) => {
                                userInfos.postal_code = val;
                                setIsCorrectUserFields(prev => ({ ...prev, postal_code: isValid }))
                            }} htmlFor="postal_code" allowSpaces={false} lablel="Postal Code" placeholder="Postal Code..." min={5} max={15} />
                        </div>

                        <div className="my-7">
                            <SelectBox
                                label="Select Role"
                                fields={[
                                    { id: "customer", icon: <TbUser />, title: "customer" },
                                    { id: "admin", icon: <TbUserShield />, title: "admin", custom: "text-green-600" },
                                    { id: "staff", icon: <TbUserBolt />, title: "staff", custom: "text-blue-600" },
                                    { id: "tasker", icon: <TbUserDollar />, title: "tasker" },
                                ]}
                                onChoosedItem={val => setUserInfos(prev => ({ ...prev, role: val as Role }))}
                                defaultSelectedId={userInfos.role}
                            />
                        </div>

                        <InputPassword onIsCorrectPassword={(val, isValid) => {
                            setPassword(val);
                            setIsCorrectUserFields(prev => ({ ...prev, password: isValid }))
                        }} condition={true} clearInp={!password} />

                        <TextArea onInpValue={val => setUserInfos(prev => ({ ...prev, description: val }))} value={userInfos.description} placeholder="Your description to the user" lablel="Description" htmlFor="Description" />
                        <div className="!mt-8 grid grid-cols sm:grid-cols-2 gap-8">
                            <AcceptCheckbox onRememberChange={val => setUserInfos(prev => ({ ...prev, is_active: val }))} defaultChecked={userInfos.is_active} clearInp={!userInfos.is_active} htmlForID="checked_active-ccount" title="Activate account" />
                            <AcceptCheckbox onRememberChange={val => setUserInfos(prev => ({ ...prev, is_email_verified: val }))} defaultChecked={userInfos.is_email_verified} clearInp={!userInfos.is_email_verified} htmlForID="checked_email-verify" title="User email verification status" />
                        </div>
                        <div className="is-deleted mt-6">
                            <AcceptCheckbox onRememberChange={val => setUserInfos(prev => ({ ...prev, is_deleted: val }))} defaultChecked={userInfos.is_deleted} clearInp={!userInfos.is_deleted} htmlForID="checked_is-deleted" title="Softly delete a user" />
                        </div>
                    </>
                }
                contentTable={
                    <Table
                        onActivePage={value => setActivePage(value)}
                        cols={["Role", "Photo / Full Name", "Birth", "Verify / Email", "Phone", "nationality", "Postal Code", "Details", "Description"]}
                        hasDatas={dataList?.length ? true : false}
                        paginationProps={paginations}
                        navbar={{
                            headerTitle: "Users List",
                            headerIcon: <TbUsers className="text-4xl" />,
                            btnText: "Add",
                            onClickedBtnText: () => {
                                closeOnBoxHandler()
                                setEditType("CREATE")
                                scrollToTop()
                            }
                        }}
                        contentHeader={
                            <SearchInTable
                                selectedItem={search.key}
                                keysDontSelect={["nationality", "birth"]}
                                classInLine={`sm: gap - x - 4 ${search.key.includes("is_") ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2  lg:grid-cols-3"} `}
                                onSearchData={(key, value) => {
                                    const { key: keyProp } = search
                                    setSearch({
                                        key,
                                        value: keyProp === "nationality" ? (countriesList.find(nationality => nationality.id === userInfos.nationality)!).title : keyProp === "birth" ? userInfos.birth : value
                                    })
                                }}
                            >

                                <SelectBox
                                    fields={[
                                        { id: "all_roles", icon: <TbUsers />, title: "All Roles" },
                                        { id: "customer", icon: <TbUser />, title: "customer" },
                                        { id: "admin", icon: <TbUserShield />, title: "admin", custom: "text-green-600" },
                                        { id: "staff", icon: <TbUserBolt />, title: "staff", custom: "text-blue-600" },
                                        { id: "tasker", icon: <TbUserDollar />, title: "tasker" },
                                    ]}
                                    onChoosedItem={value => setRole(value as Role)}
                                    defaultSelectedId={role}
                                    wordsUppercase
                                />
                                <SelectBox
                                    fields={[
                                        { id: "all_datas", icon: <TbDatabaseSearch />, title: "All Datas" },
                                        { id: "full_name", icon: <LuTextCursorInput />, title: "Full Name" },
                                        { id: "email", icon: <MdAlternateEmail />, title: "Email" },
                                        { id: "phone", icon: <TbPhoneCalling />, title: "Phone" },
                                        { id: "postal_code", icon: <BsSignpostSplit />, title: "Postal Code" },
                                        { id: "nationality", icon: <IoEarthOutline />, title: "nationality" },
                                        { id: "birth", icon: <LuCalendarDays />, title: "Birth Day" },
                                        { id: "is_deleted", icon: <TbUserMinus />, title: "Is Deleted", custom: "text-red-600" },
                                        { id: "is_active", icon: <TbUserPause />, title: "Is Active" },
                                        { id: "is_email_verified", icon: <MdOutlineMarkEmailRead />, title: "Is Email Verified", custom: "text-green-600" },
                                    ]}
                                    onChoosedItem={value => setSearch(prev => ({ ...prev, key: value as DataType }))}
                                    defaultSelectedId={search.key}
                                />
                                {
                                    search.key === "nationality"
                                        ? <Rendernationality />
                                        : search.key === "birth"
                                            ? <RenderBirthDay label={false} /> : ""
                                }
                            </SearchInTable>
                        }
                    >
                        {
                            dataList && dataList.length
                                ?
                                dataList.map(items => {
                                    const { id, role, full_name, is_email_verified, profile_photo, email, phone, postal_code, nationality, birth, description, is_active, is_deleted, created_at, last_login } = items

                                    return (
                                        <tr key={id} className={`bg-[var(--background)] hover:opacity-75 transition-all duration-300 border-t border-t-gray-300 ${(editType === "DESCRIPTION" && userDescription.id === id) || (userInfos.id === id && editType === "UPDATE") ? "bg-[var(--light-primary)] animate-pulse hover:animate-none" : ""} `}>

                                            <RowTable title={id} />
                                            <RowTable customStyle="cursor-pointer">
                                                <div className="flex items-center">
                                                    {
                                                        role === "admin"
                                                            ? <TbUserShield className="text-2xl me-2 text-green-600" />
                                                            : role === "customer"
                                                                ? <TbUser className="text-2xl me-2" />
                                                                : role === "tasker"
                                                                    ? <TbUserDollar className="text-2xl me-2" />
                                                                    : role === "staff"
                                                                        ? <TbUserBolt className="text-2xl me-2 text-blue-600" />
                                                                        : <TbUser className="text-2xl me-2" />
                                                    }
                                                    {
                                                        role === "admin"
                                                            ? <span className="text-green-600">{role}</span>
                                                            : role === "staff"
                                                                ? <span className="text-blue-600">{role}</span>
                                                                : <span>{role}</span>
                                                    }
                                                </div>
                                            </RowTable>
                                            <RowTable>
                                                {
                                                    profile_photo
                                                        ?
                                                        <div onClick={() => setPreview(profile_photo)} className="flex item-center">
                                                            <CgProfile className="text-2xl" />
                                                            <p className="ps-1">{full_name}</p>
                                                        </div>
                                                        :
                                                        <div className="flex item-center">
                                                            <CgProfile className="disable-item" />
                                                            <p className="ps-1">{full_name}</p>
                                                        </div>
                                                }
                                            </RowTable>
                                            <RowTable contentMiddle>
                                                {
                                                    birth
                                                        ? <ImportantText id={birth?.slice(0, 10)} bgColor="var(--gray)" />
                                                        :
                                                        <div className="opacity-30 cursor-default">
                                                            <ImportantText id={"0000-00-00"} bgColor="gray" />
                                                        </div>
                                                }
                                            </RowTable>
                                            <RowTable>
                                                {
                                                    is_email_verified
                                                        ? <MdOutlineMarkEmailRead className="text-2xl cursor-default text-green-600" />
                                                        : <MdOutlineMarkEmailUnread className="text-2xl cursor-default text-red-600" />
                                                }
                                                <span className="ps-2">{email}</span>
                                            </RowTable>
                                            {
                                                phone
                                                    ? <RowTable title={phone} />
                                                    : <RowTable contentMiddle={true} ><FiPhoneOff className="disable-item" /></RowTable>
                                            }
                                            <RowTable contentMiddle>
                                                <div>
                                                    {
                                                        nationality
                                                            ?
                                                            <div className="flex items-center">
                                                                {
                                                                    countriesList.map(country => {
                                                                        if (country.id === nationality.id) {
                                                                            return (
                                                                                <div key={country.id} className="flex items-center">
                                                                                    <CountryFlag
                                                                                        countryCode={country.short_name}
                                                                                        svg
                                                                                        style={{ width: "1.8em", height: "1.8em", borderRadius: ".3em" }}
                                                                                    />
                                                                                    <span className="ps-1">{country.name}</span>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                            : <IoEarthOutline className="disable-item" />
                                                    }
                                                </div>
                                            </RowTable>
                                            <RowTable title={postal_code} />
                                            <RowTable contentMiddle={true} clickOnRow={() => showUserDetails(created_at, last_login)}>
                                                <TbListDetails className="table_row" />
                                            </RowTable>
                                            <RowTable contentMiddle={true} clickOnRow={() => {
                                                setUserDescription({ id, description, isValid: false })
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
                                                <TbUserEdit
                                                    onClick={() => {
                                                        textEmail = email
                                                        textBirth = birth
                                                        setUserInfos({ id, role, full_name, birth, nationality: nationality.id, is_email_verified, email, phone, postal_code, is_active, is_deleted })
                                                        setEditType("UPDATE")
                                                        scrollToTop()
                                                        setPhoto(profile_photo)
                                                        setPreview(profile_photo)
                                                    }}
                                                    className="table_row cursor-pointer text-green-700"
                                                />
                                                <TbUserMinus onClick={() => deleteUserHandler(id)} className="table_row cursor-pointer text-red-600" />
                                                <TbUserPause title="Ban" onClick={() => banUserHandler(id, is_active)} className={`table_row cursor - pointer ${is_active ? "text-gray-500" : "text-red-600"} `} />
                                            </td>
                                        </tr>
                                    )
                                })
                                : ""
                        }
                    </Table>
                }
            />
            <div className={`transition-all duration-500 ${preview ? "opacity-100 visible" : "opacity-0 invisible"} `}>
                <PreviewPhoto getPhoto={preview} onClose={() => setPreview(null)} />
            </div>
        </section>
    )
}

export default Users