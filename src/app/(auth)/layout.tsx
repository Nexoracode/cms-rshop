import ShowElementInDom from "@comp_global/ShowElementInDom"
import SliderImage from "@comp_global/SliderImage"

type AuthLayoutParams = {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutParams) => {

    return (
        <section className="flex items-center justify-center" dir="ltr">
            <ShowElementInDom>
                <section className="w-1/2 px-3 flex items-center justify-center">
                    <SliderImage />
                </section>
            </ShowElementInDom>
            
            <section className="w-full lg:w-1/2 px-3 flex justify-center">
                <div className="w-screen sm:w-auto sm:min-w-[400px] lg:w-[480px] relative h-[100vh] flex flex-col justify-center">
                    {children}
                </div>
            </section>
        </section>
    )
}

export default AuthLayout