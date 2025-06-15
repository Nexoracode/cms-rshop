import Link from "next/link"

const HomePage = () => {
    return (
        <div className="fixed inset-0">
            <div className="absolute inset-0 animate-pulse bg-splash-screen" style={{ animationDuration: '10000ms' }}></div>

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center relative z-10">
                    <img
                        src="/icons/logo.png"
                        alt="Logo"
                        className="w-52 mx-auto mb-6"
                    />
                    <h1 className="text-3xl text-white font-bold select-none font-title mb-24">به پنل مدیرتی فروشگاه آرشاپ خوش آمدید</h1>
                    <Link href={'/signin'} className="underline mt-24">ورود به حساب کاربری</Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage