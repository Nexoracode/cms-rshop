"use client";

import dayjs from 'dayjs';
import { useEffect, useState } from "react";
////? Utils
import getCookie from "@utils/getCookie";
import { objectToFormData } from '@utils/helper';
import { sendRequestWithLoading } from '@utils/configs/axios';
////? Componenets
// Aauth
import InputEmail from "@comp_auth/modules/InputEmail";
import InputPassword from "@comp_auth/modules/InputPassword";
import AuthButton from "@/components/auth/AuthButton";
import InputPhone from "@/components/auth/PhoneInput";
// Global
import SelectBox from "@comp_global/SelectBox";
import Input from "@comp_global/Input";
import ShowElementInDom from "@comp_global/ShowElementInDom";
import SliderImage from "@comp_global/SliderImage";
import CustomDatePicker from "@comp_global/CustomDatePicker";
////? Icons
import { TbUserBolt, TbUserShield } from "react-icons/tb";
import UploaderPhoto from '@/components/global/UploaderPhoto';

type Role = "admin" | "staff";
type User = {
    id?: number, role: Role, birth: string, full_name: string, email?: string, phone: string, password?: string
};
let textEmail = ""

const AdminProfile = () => {
    const [userInfos, setUserInfos] = useState<User>({ id: 1, role: "staff", full_name: "", email: "", phone: "", birth: "" });
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [photo, setPhoto] = useState<any>(null);

    useEffect(() => {
        let infos = JSON.parse(getCookie("infos") || "");

        const { full_name, phone, role, email, birth, profile_photo, id } = infos;
        setUserInfos({
            full_name,
            phone,
            role,
            email,
            birth: birth?.slice(0, 10),
            id
        });
        textEmail = email
        
        if (profile_photo) setPhoto(profile_photo)
    }, []);

    const updateUser = async () => {

        const conditions = {
            password: (value: string) => value.length > 0,
            profile_photo: (value: any) => value !== null,
            birth: (value: string) => value.length > 0,
            id: () => false,
            email: () => false,
        };

        const formData = objectToFormData({ ...userInfos, profile_photo: selectedFile }, new FormData(), conditions);

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const res = await sendRequestWithLoading(`/admin/user/${userInfos.id}`, formData, "put", "Update Information", false, false, true, "multipart/form-data");
        res?.data?.data && window.location.reload()
    };

    return (
        <section className="w-full mt-28 flex items-center justify-center">
            <ShowElementInDom>
                <div className="hidden xl:w-1/4 xl:flex 1280:!hidden xxl:!w-1/3 xxl:!flex px-3 items-center justify-center">
                    <SliderImage />
                </div>
            </ShowElementInDom>

            <div className="w-screen xl:w-1/2 1280:!w-screen xxl:!w-1/2 max-w-[900px] lg:pb-0 px-4 pb-4">

                <div className='w-full flex items-center justify-center'>
                    <UploaderPhoto defaultImg={photo} onSelectedFile={file => setSelectedFile(file)} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-4 gap-x-12 mt-8">
                    <Input defaultValue={userInfos.full_name} onInpValue={val => userInfos.full_name = val} htmlFor="full_name" lablel="Full Name" placeholder="User Name..." />
                    <InputEmail disabled defaultValue={userInfos.email} onIsCorrectEmail={val => userInfos.email = val} />
                    <InputPhone defaultValue={userInfos.phone} onIsCorrectPassword={val => userInfos.phone = val} label="Phone Number" title="Phone Number" />
                    <SelectBox
                        label="Role"
                        fields={[
                            userInfos.role === "admin" ? { id: "admin", icon: <TbUserShield />, title: "admin", custom: "text-green-600" } : { id: "staff", icon: <TbUserBolt />, title: "staff", custom: "text-blue-600" },
                        ]}
                        onChoosedItem={val => setUserInfos(prev => ({ ...prev, role: val as Role }))}
                        defaultSelectedId={userInfos.role}
                    />
                    <CustomDatePicker
                        onDate={date => setUserInfos(prev => ({ ...prev, birth: String(date.slice(0, 10)) }))}
                        defaultValue={userInfos.birth}
                        showTime={false}
                        disabledBeforeDate={dayjs('1960-01-01')}
                        yearsBack={18}
                    />
                    <InputPassword onIsCorrectPassword={val => setUserInfos(prev => ({ ...prev, password: val }))} condition={true} />
                </div>

                <AuthButton title={"Update Information"} disable={false} onClickHandler={updateUser} />
            </div>
        </section>
    );
};

export default AdminProfile;