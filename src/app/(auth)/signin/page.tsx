"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { sendVerificationCode, verifyCode } from "@/app/(auth)/signin/actions";
import { isOnline } from "@/utils/helper"
// Components
import Header from "@/components/auth/modules/Header";
import AuthButton from "@comp_auth/modules/AuthButton"
import PhoneInput from "@/components/auth/modules/PhoneInput"

const SignIn = () => {

  const router = useRouter()
  const [infos, setInfos] = useState({
    phone: "",
    otp: "",
  })

  const handleSubmit = async () => {
    if (isOnline()) return
    const { otp, phone } = infos
    if (!otp) {
      const toastPhone = toast.loading("درحال ارسال کد به تلفن همراه...")
      const resPhone = await sendVerificationCode(phone) // call to action
      toast.dismiss(toastPhone)
    } else {
      const toastVerify = toast.loading("در حال بررسی کد...")
      const resVerify = await verifyCode(phone, otp) // call to action
      toast.dismiss(toastVerify)
    }
  }

  return (
    infos.otp ?
      <div>
        <Header title="خوش آمدید" subTitle="کد ارسال شده را وارد نمایید" />
      </div>
      :
      <div>
        <Header title="خوش آمدید" subTitle="شماره تلفن خود را وارد نمایید" />
        <form className="mt-5 2xl:mt-7">
          <PhoneInput
            onValidPhoneChange={phone => setInfos(prev => ({ ...prev, phone: phone }))}
          />
        </form>
        <AuthButton onClickHandler={handleSubmit} title="ارسال کد" disable={infos.phone.length ? false : true} />
      </div>
  );
};

export default SignIn;
