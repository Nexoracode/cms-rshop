"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { signinUser } from "./actions" // import function server
import InputEmail from "@comp_auth/modules/InputEmail"
import InputPassword from "@comp_auth/modules/InputPassword"
import AuthButton from "@comp_auth/modules/AuthButton"
import { isOnline } from "@/utils/helper"

const Form = () => {
    const router = useRouter()
    const [infos, setInfos] = useState({ email: "", password: "" })
    const [isValid, setIsValid] = useState({ email: false, password: false })

    const handleSubmit = async () => {
        const { email, password } = infos
        isOnline()

        const toastId = toast.loading("Logging in...")
        const res = await signinUser(email, password) // call to action
        toast.dismiss(toastId)

        if (res.success) {
            toast.success(res.message)
            router.push("/admin/home")
        } else toast.error(res.message)
    }

    return (
        <div>
            <form className="mt-5 2xl:mt-7">
                <InputEmail
                    defaultValue={infos.email}
                    onIsCorrectEmail={(value, isValid) => {
                        setInfos(prev => ({ ...prev, email: value }))
                        setIsValid(prev => ({ ...prev, email: isValid }))
                    }}
                />
                <InputPassword
                    condition={true}
                    onIsCorrectPassword={(value, isValid) => {
                        setInfos(prev => ({ ...prev, password: value }))
                        setIsValid(prev => ({ ...prev, password: isValid }))
                    }}
                    disableRegex
                />
                <div className="mt-5 text-center">
                    <Link href="/forget-password" className="flex-none text-sm text-[var(--primary)] font-bold">
                        Forget Password?
                    </Link>
                </div>
            </form>
            <AuthButton onClickHandler={handleSubmit} title="Sign In" disable={isValid.email && isValid.password ? false : true} />
        </div>
    )
}

export default Form