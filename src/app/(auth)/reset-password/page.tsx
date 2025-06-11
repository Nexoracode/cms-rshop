import Logo from "@comp_global/Logo"
import Header from "@comp_auth/modules/Header"
import Form from "@/pages/auth/reset-password/Form"
import Link from "next/link"
import TextLink from "@comp_global/TextLink"

const ResetPassword = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const { token } = await searchParams;

    return token ? (
        <>
            <div>
                <Logo to="/" />
                <Header
                    title="Create New Password"
                    subTitle="Please enter your new password."
                />
                <Form token={token} />
            </div>
            <TextLink link="/signin" text="Not now? Return " textLink="SignIn" />
        </>
    ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <p className="mt-4 text-center text-2xl leading-10">
                Your url token is invalid. Please return to <Link href={"/forget-password"} className="text-[var(--primary)] underline hover:opacity-75">Forget Password</Link> and try again.
            </p>
        </div>
    );
}

export default ResetPassword