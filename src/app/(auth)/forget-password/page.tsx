import TextLink from "@/ui/components/auth/modules/TextLink";
import Header from "@/ui/components/auth/modules/Header";
import Form from "@pages/auth/forget-password/Form";

const ForgetPassword = () => {
  return (
    <>
      <div>
        <Header title="Forget Password" subTitle="Please enter your email" />
        <Form />
      </div>
      <TextLink
        link="/signin"
        text="Forget it. Send me back to "
        textLink="SignIn"
      />
    </>
  );
};

export default ForgetPassword;
