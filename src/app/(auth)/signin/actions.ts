"use server"

import fetcher from "@/utils/fetcher";
import { cookies } from "next/headers"

export const sendVerificationCode = async (phone: string) => {
    const res = await fetcher({
        route: "/auth/signin",
        method: "POST",
        body: { phone },
    });
    return res
};

export const verifyCode = async (phone: string, otp: string) => {

    const res = await fetcher({
        route: "/auth/signin",
        method: "POST",
        body: { phone, otp },
    });
    const { error, data, message } = res
    const { role, tokens } = data[0]
    const { access_token, refresh_token } = tokens

    const cookieStore = await cookies()
    cookieStore.set("access_token", access_token, { path: "/", maxAge: 870 })
    cookieStore.set("refresh_token", refresh_token, { path: "/", maxAge: 604800 });
};
