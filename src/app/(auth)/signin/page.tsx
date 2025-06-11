import Logo from "@comp_global/Logo"
import Header from "@comp_auth/modules/Header"
import Form from "@pages/auth/signin/Form"

export default function Signin() {
    return (
        <div className="w-full absolute">
            <Logo to="/" />
            <Header title="Welcome back 👋" subTitle="Enter the information you entered while registering." />
            <Form />
        </div>
    )
}