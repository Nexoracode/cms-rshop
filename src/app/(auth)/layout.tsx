import DarkMode from "@/components/global/DarkMode";
import SliderImage from "@/components/global/SliderImage";
import Logo from "../../components/global/Logo";

type AuthLayoutParams = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutParams) => {
  return (
    <section>

      <div className="flex items-center justify-center px-5">
        <div className="flex !w-screen justify-center lg:w-2/3 xl:w-1/2">
          <div className="flex min-h-[100vh] w-screen flex-col justify-center !px-4 py-8 sm:w-auto sm:min-w-[480px] lg:!px-0">
            <Logo to="/" />
            {children}
          </div>
        </div>
        <SliderImage />
      </div>

      <div className="absolute top-10 right-10 !z-50">
        <DarkMode />
      </div>
    </section>
  );
};

export default AuthLayout;
