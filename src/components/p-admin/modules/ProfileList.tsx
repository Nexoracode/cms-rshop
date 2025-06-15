"use client"
import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
//import getCookie from "@utils/getCookie";
//import { getFile, signOutUser } from "@utils/helper";
import ProfileItem from "./ProfileItem";
import ClickTracker from "@comp_global/ClickTracker";
//
import { TbUserShield } from "react-icons/tb";
import { RiShutDownLine } from "react-icons/ri";
import { HiOutlineUserCircle } from "react-icons/hi2";

const ProfileList = () => {

    const [isShowProfile, setIsShowProfile] = useState<boolean>(false)
    const [isSignout, setIsSignout] = useState<boolean>(false)
    const profileRef = useRef<any>(null)
    const [userInfos, setUserInfos] = useState({ full_name: "", email: "" })
    const [fileData, setFileData] = useState<{ url: string; type: string } | null>(null);

    useEffect(() => {
        //let infos = JSON.parse(getCookie("infos") || "");
        let infos = { full_name: "محدحسین", email: "khadem@gmail.com" }
        const { full_name, email } = infos;
        setUserInfos({ full_name, email })
        //getFile(infos.profile_photo).then(res => setFileData({ type: res?.type || "", url: res?.url || "" }))
    }, []);

    const signOutUserHandler = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are logging out of your account!!",
            icon: "warning",
            reverseButtons: true
        }).then(async result => {
            if (result.isConfirmed) {
                //signOutUser()
            } else {
                setIsSignout(false)
            }
        });
    }

    return (
        <div className="relative ps-3" ref={profileRef}>

            <div onClick={() => setIsShowProfile(prev => !prev)}>
                {
                    !fileData?.url
                        ?
                        <HiOutlineUserCircle className="w-11 h-11 rounded-full cursor-pointer" />
                        :
                        <img
                            src={fileData.url}
                            className="w-11 rounded-full cursor-pointer"
                            alt="profile"
                        />
                }
            </div>

            <div onMouseLeave={() => !isSignout && setIsShowProfile(false)} className={`menu-box bg-(--background) absolute top-[5rem] left-0 rounded-md p-3 w-[240px] transition-global ${isShowProfile ? "visible opacity-100" : "invisible opacity-0"}`}>
                <div className="flex items-center border-b border-(--primary) pb-3">
                    {
                        !fileData?.url
                            ?
                            <div>
                                <HiOutlineUserCircle className="w-10 h-10 rounded-full" />
                            </div>
                            :
                            <img
                                src={fileData.url}
                                className="w-10 rounded-full"
                                alt="profile"
                            />
                    }
                    <div className="ps-2 cursor-default">
                        <p className="w-44 ellipsis">{userInfos.full_name}</p>
                        <p className="text-sm w-40 ellipsis">{userInfos.email}</p>
                    </div>
                </div>

                <div className="cursor-pointer">
                    <ProfileItem title="پروفایل" to="/admin/profile" children={<TbUserShield className="text-2xl" />} />
                    <div onClick={() => {
                        setIsSignout(true)
                        signOutUserHandler()
                    }}>
                        <ProfileItem title="خروج" children={<RiShutDownLine className="text-2xl" />} />
                    </div>
                </div>
            </div>

            <ClickTracker onClickDetected={() => setIsShowProfile(false)} targetRef={profileRef} />

        </div>
    );
}

export default ProfileList;