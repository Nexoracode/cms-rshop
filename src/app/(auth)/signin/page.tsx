"use client"

import Header from "@/components/auth/modules/Header";
//
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { signinUser } from "@/pages/auth/signin/actions";
import AuthButton from "@comp_auth/modules/AuthButton"
import { isOnline } from "@/utils/helper"
import PhoneInput from "@/components/auth/modules/PhoneInput"

const SignIn = () => {

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
        <Header title="خوش آمدید" subTitle="کد ارسال شده را وارد نمایید" />
      </div>
      :
      <div>
        <Header title="خوش آمدید" subTitle="شماره تلفن خود را وارد نمایید" />
        <form className="mt-5 2xl:mt-7">
          <PhoneInput
            onValidPhoneChange={(phone) => console.log(phone)}
          />
        </form>
        <AuthButton onClickHandler={handleSubmit} title="ارسال کد" disable={infos.phone.length ? false : true} />
      </div>
  );
};

export default SignIn;
