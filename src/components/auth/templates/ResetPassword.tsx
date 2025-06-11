"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { sendRequestWithLoading } from "@utils/configs/axios"
import InputPassword from "../modules/InputPassword"
import AuthButton from "../modules/AuthButton"

const ResetPasswordUser = () => {
    const router = useRouter()
    const [token, setToken] = useState<string | null>(null)  // Store the token state
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")
    const [passwordBothEquals, setPasswordBothEquals] = useState<boolean>(false)

    // Fetch search params after component mount
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const tokenParam = searchParams.get("token")
        setToken(tokenParam)
    }, [])

    useEffect(() => {
        if (password.length && passwordConfirm.length) {
            if (password === passwordConfirm)
                setPasswordBothEquals(true)
            else
                setPasswordBothEquals(false)
        } else
            setPasswordBothEquals(false)
    }, [password, passwordConfirm])

    const resetPasswordHandler = async () => {
        if (!passwordBothEquals || !token) {
            toast.error("Please enter the required values")
            return false
        }

        const resResetPassword = await sendRequestWithLoading("/auth/reset-password", {
            token, newPassword: password
        }, "post", "Changing password", true, false)

        if (resResetPassword) {
            const { error, data: resData } = resResetPassword.data
            !error && router.push("/signin")
        }
    }

    return (
        <form className="mt-5 2xl:mt-7">
            <InputPassword onIsCorrectPassword={value => setPassword(value)} condition={true} title="New Password" />

            {
                password.length || passwordBothEquals
                    ? <InputPassword condition={passwordBothEquals} onIsCorrectPassword={value => setPasswordConfirm(value)} activeTextValidation={false} label="password-confirm" title="Password Confirm" />
                    : ""
            }

            <AuthButton onClickHandler={resetPasswordHandler} title="Change Password" disable={!passwordBothEquals || !token} />
        </form>
    )
}

export default ResetPasswordUser