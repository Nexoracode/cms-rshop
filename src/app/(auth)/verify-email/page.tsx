import { cookies } from "next/headers";
import Form from "@pages/auth/verify-email/Form";
import TextLink from "@/ui/components/auth/modules/TextLink";
import Header from "@/ui/components/auth/modules/Header";
import TextRedirect from "@/ui/components/auth/modules/TextRedirect";

const VerifyEmail = async () => {
  const cookieStore = await cookies();
  const email = cookieStore.get("email")?.value || "";

  return email ? (
    <>
      <div>
        <Header
          title="Verify Your Email"
          subTitle="Please enter the code sent to your email."
        />
        <Form />
      </div>
      <TextLink link="/signin" text="Not now? Return " textLink="SignIn" />
    </>
  ) : (
    <TextRedirect
      link="/signin"
      textLink="Signin"
      text1="You have not entered an email address. First go to the"
      text2="page."
      img="/images/customer.png"
    />
  );
};

export default VerifyEmail;
