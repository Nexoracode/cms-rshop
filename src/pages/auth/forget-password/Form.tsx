"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { forgetPasswordAction } from "./action";
import { isOnline } from "@utils/helper";
import useTimer from "@hooks/useTimer";
import AuthButton from "@comp_auth/modules/AuthButton";
import InputEmail from "@comp_auth/modules/InputEmail";
import ResendCode from "@comp_auth/modules/ResendCode";

const Form = () => {
    const [email, setEmail] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(false);
    const [showResend, setShowResend] = useState<boolean>(false);
    const { time, isRunning, startTimer } = useTimer(120);

    const showResult = (res: any) => {
        if (res?.success) {
            toast.success(res.message);
            setShowResend(true);
            startTimer();
        } else toast.error(res.message);
    };

    const handleResendPassword = async () => {
        isOnline();
        const res = await forgetPasswordAction(email);
        showResult(res);
    };

    const handleForgetPassword = async () => {
        isOnline();
        const toastId = toast.loading("Sending...");
        const res = await forgetPasswordAction(email);
        toast.dismiss(toastId);
        showResult(res);
    };

    return (
        <div>
            <div className="mt-6 mb-4">
                <InputEmail
                    onIsCorrectEmail={(value, isValid) => {
                        setEmail(value);
                        setIsValid(isValid);
                    }}
                    defaultValue={email}
                />
            </div>

            {showResend ? (
                <ResendCode
                    time={time}
                    isRunning={isRunning}
                    onResend={handleResendPassword}
                />
            ) : (
                <AuthButton
                    onClickHandler={handleForgetPassword}
                    title="Recovery Password"
                    disable={!isValid}
                />
            )}
        </div>
    );
};

export default Form;
