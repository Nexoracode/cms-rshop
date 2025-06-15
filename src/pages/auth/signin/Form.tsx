"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { signinUser } from "./actions" // import function server
import AuthButton from "@comp_auth/modules/AuthButton"
import { isOnline } from "@/utils/helper"
import IranianPhoneInput from "@/components/auth/modules/InputPhone"

const Form = () => {
    const router = useRouter()
    const [infos, setInfos] = useState({
        phone: "",
        otp: "",
    })

    const handleSubmit = async () => {
        isOnline()
        const { otp, phone } = infos
        if (!otp) {
            const toastPhone = toast.loading("درحال ارسال کد به تلفن همراه...")
            const resPhone = await signinUser(phone, otp) // call to action
            toast.dismiss(toastPhone)
            if (resPhone.success) {
                toast.success(resPhone.message)
                router.push("/")
            } else toast.error(resPhone.message)
        } else {

        }
    }

    return (
        infos.otp ?
            <div>

            </div>
            :
            <div>
                <form className="mt-5 2xl:mt-7">
                    <div className="p-4 max-w-md mx-auto">
                        <IranianPhoneInput
                            title="شماره همراه"
                            label="mobile"
                        />
                    </div>
                </form>
                <AuthButton onClickHandler={handleSubmit} title="ارسال کد" disable={infos.phone.length ? false : true} />
            </div>
    )
}

export default Form