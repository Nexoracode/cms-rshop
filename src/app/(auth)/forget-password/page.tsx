import Logo from "@comp_global/Logo"
import Header from "@comp_auth/modules/Header"
import Form from "@pages/auth/forget-password/Form"
import { PiPasswordDuotone } from "react-icons/pi"
import TextLink from "@comp_global/TextLink"

const ForgetPassword = () => {

    return (
        <>
            <Logo to="/" />
            <Header title={
                <div className="flex items-center">
                    <p>Password recovery</p>
                    <PiPasswordDuotone className="text-[3rem] ps-2 pt-2 cursor-default" />
                </div>
            } subTitle="Please enter your email to recover your password." />
            <Form />
            <TextLink link="/signin" text="Not now? Return " textLink="SignIn" />
        </>
    )
}

export default ForgetPassword