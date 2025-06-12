import TextLink from "@/components/global/TextLink";
import Header from "@/components/auth/modules/Header";
import Form from "@pages/auth/forget-password/Form";

const ForgetPassword = () => {
  return (
    <>
      <div>
        <Header title="فراموشی رمز" subTitle="لطفاً ایمیل خود را وارد کنید" />
        <Form />
      </div>
      <TextLink
        link="/signin"
        text="رمز عبور را به یاد آوردید؟ بازگشت به "
        textLink="ورود"
      />
    </>
  );
};

export default ForgetPassword;
