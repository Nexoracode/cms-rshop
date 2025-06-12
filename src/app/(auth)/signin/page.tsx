import Header from "@/components/auth/modules/Header";
import Form from "@pages/auth/signin/Form";

const SignIn = () => {
  return (
    <>
      <div>
        <Header title="خوش آمدید" subTitle="وارد حساب کاربری خود شوید" />
        <Form />
      </div>
    </>
  );
};

export default SignIn;
