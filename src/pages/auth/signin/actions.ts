"use server"

import fetcher from "@/utils/fetcher";
import { cookies } from "next/headers"

export async function signinUser(phone: string, otp?: string) {

    const res = await fetcher({
        route: "/auth/signin",
        method: "POST",
        body: { phone, otp },
    });

    if ("success" in res && !res.success) {
        return res;
    } else {
        const { error, data, message } = res

        if (!error) {
            const { role, tokens } = data[0]
            const { access_token, refresh_token } = tokens

            const cookieStore = await cookies()
            cookieStore.set("access_token", access_token, { path: "/", maxAge: 870 })
            cookieStore.set("refresh_token", refresh_token, { path: "/", maxAge: 604800 });

            if (role === "staff" || role === "admin") return { success: true, message }
            else return { success: false, message }
        }
        return { success: false, message: res.message }
    }
}