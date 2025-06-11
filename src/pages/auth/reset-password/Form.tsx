"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ResetPasswordAction } from "./action";
////? Components
import InputPassword from "@comp_auth/modules/InputPassword";
import AuthButton from "@comp_auth/modules/AuthButton";
import { isOnline } from "@utils/helper";

type FormProps = {
  token: string;
};

const Form = ({ token }: FormProps) => {
  const router = useRouter();
  const [infos, setInfos] = useState({
    password: "",
    passwordConfirm: "",
    token,
  });
  const [isValid, setIsValid] = useState({ password: false });
  const [passwordBothEquals, setPasswordBothEquals] = useState<boolean>(false);

  useEffect(() => {
    const { password, passwordConfirm } = infos;
    if (password.length && passwordConfirm.length) {
      if (password === passwordConfirm) setPasswordBothEquals(true);
      else setPasswordBothEquals(false);
    } else setPasswordBothEquals(false);
  }, [infos.password, infos.passwordConfirm]);

  const handleSubmit = async () => {
    const { password, token } = infos;

    if (token) {
      isOnline();
      const toastId = toast.loading("Changing Password...");
      const res = await ResetPasswordAction({
        newPassword: password,
        token,
      }); // call to action
      toast.dismiss(toastId);

      if (res.success) {
        toast.success(res.message);
        router.push("/signin");
      } else toast.error(res.message);
    }
  };

  return (
    <div>
      <form className="2xl:mt-7">
        <InputPassword
          condition={true}
          onIsCorrectPassword={(value, isValid) => {
            setInfos((prev) => ({ ...prev, password: value }));
            setIsValid((prev) => ({ ...prev, password: isValid }));
          }}
        />
        {isValid.password || passwordBothEquals ? (
          <InputPassword
            condition={passwordBothEquals}
            onIsCorrectPassword={(value) =>
              setInfos((prev) => ({ ...prev, passwordConfirm: value }))
            }
            activeTextValidation={false}
            label="password-confirm"
            title="Confirm Password"
          />
        ) : (
          ""
        )}
      </form>
      <AuthButton
        onClickHandler={handleSubmit}
        title="Reset Password"
        disable={isValid.password && passwordBothEquals ? false : true}
      />
    </div>
  );
};

export default Form;
