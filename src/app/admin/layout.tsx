"use client"

import { useState } from "react";
import MenuBar from "@comp_p-admin/templates/MenuBar";
import NotificationManager from "@comp_global/NotificationManager";

type AdminLayoutParams = {
    children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutParams) => {
    const [blurChildren, setBlurChildren] = useState<boolean>(false)
    return (
        <div>
            <NotificationManager />
            <MenuBar onBlur={blur => setBlurChildren(blur)} />
            <main className={`${blurChildren ? "blur-sm" : "blur-none"} flex items-center justify-end mt-28`}>
                <div className={`${blurChildren ? "w-full" : "w-[calc(100%-var(--menu-size))]"} !transition-translate !duration-500`}>
                    {children}
                </div>
            </main>
        </div>
    );
};


export default AdminLayout;