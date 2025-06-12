import TextLink from "@/ui/components/auth/modules/TextLink";
import TextRedirect from "@/ui/components/auth/modules/TextRedirect";
import Form from "@pages/auth/reset-password/Form";
import Header from "@/ui/components/auth/modules/Header";

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { token } = await searchParams;

  return token ? (
    <>
      <div>
        <Header
          title="Create New Password"
          subTitle="Please enter your new password."
        />
        <Form token={token} />
      </div>
      <TextLink link="/signin" text="Not now? Return " textLink="SignIn" />
    </>
  ) : (
    <TextRedirect
      link="/forget-password"
      textLink="Forget Password"
      text1="Your url token is invalid. Please return to"
      text2="and try again."
      img="/images/customer.png"
    />
  );
};

export default ResetPassword;
