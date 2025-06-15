import Header from "@/components/auth/modules/Header";
import Form from "@pages/auth/signin/Form";

const SignIn = () => {
  return (
    <>
      <div>
        <Header title="خوش آمدید" subTitle="شماره تلفن خود را وارد نمایید" />
        <Form />
      </div>
    </>
  );
};

export default SignIn;
