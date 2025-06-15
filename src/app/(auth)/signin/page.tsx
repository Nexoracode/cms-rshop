"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { sendVerificationCode, verifyCode } from "@/app/(auth)/signin/actions";
import { isOnline } from "@/utils/helper"
// Components
import Header from "@/components/auth/Header";
import AuthButton from "@/components/auth/AuthButton"
import PhoneInput from "@/components/auth/PhoneInput"
import useTimer from "@/hooks/useTimer";
import ResendCode from "@/components/auth/ResendCode";
import OtpVerification from "@/components/auth/Otp/OtpVerification";

const SignIn = () => {

  const router = useRouter()
  const [isShowOtp, setIsShowOtp] = useState(false)
  const [infos, setInfos] = useState({
    phone: "",
    otp: "",
  })
  const { time, isRunning, startTimer } = useTimer(120);

  const handleSendVerificationCode = async (isResend: boolean = false) => {
    if (isOnline()) return
    const toastPhone = toast.loading("درحال ارسال کد به تلفن همراه...")
    const resPhone = await sendVerificationCode(infos.phone) // call to action
    toast.dismiss(toastPhone)
    isResend && startTimer();
  }

  const handleVerifyCode = async () => {
    if (isOnline()) return
    const { otp, phone } = infos
    const toastVerify = toast.loading("در حال بررسی کد...")
    const resVerify = await verifyCode(phone, otp) // call to action
    toast.dismiss(toastVerify)
  }

  return (
    isShowOtp ?
      <div>
        <Header title="خوش آمدید" subTitle="کد ارسال شده را وارد نمایید" />
        <OtpVerification
          lengthCode={4}
          onIsCompleteCode={(value) =>
            setInfos((prev) => ({ ...prev, otp: value }))
          }
        />
        <ResendCode
          time={time}
          isRunning={isRunning}
          onResend={() => handleSendVerificationCode(true)}
        />
        <AuthButton onClickHandler={handleVerifyCode} title="بررسی کد" disable={infos.otp.length ? false : true} />
      </div>
      :
      <div>
        <Header title="خوش آمدید" subTitle="شماره تلفن خود را وارد نمایید" />
        <form className="mt-5 2xl:mt-7">
          <PhoneInput
            onValidPhoneChange={phone => setInfos(prev => ({ ...prev, phone: phone }))}
          />
        </form>
        <AuthButton onClickHandler={() => handleSendVerificationCode()} title="ارسال کد" disable={infos.phone.length ? false : true} />
      </div>
  );
};

export default SignIn;
