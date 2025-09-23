"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaUserShield, FaGithub } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const handleSignIn = () => router.push("/signin");

  return (
    <div
      dir="rtl"
      className="relative rounded-3xl h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-blue-100 dark:from-[#0b1020] dark:via-[#0a0f1b] dark:to-[#0f1730]"
    >
      {/* پس‌زمینه: بلاب‌ها */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl dark:bg-indigo-600/20 motion-safe:animate-[float1_14s_ease-in-out_infinite]" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-blue-400/25 blur-3xl dark:bg-blue-600/20 motion-safe:animate-[float2_16s_ease-in-out_infinite]" />
      </div>

      {/* شبکه لطیف */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_60%,transparent_100%)] dark:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* هدر بیرون باکس */}
      <div className="flex flex-col items-center justify-center h-[100vh]">
        {/* بدنه */}
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4">
          {/* گرادیان‌بوردر دور باکس */}
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-0.5 -z-10 rounded-[26px] bg-[conic-gradient(from_180deg_at_50%_50%,#6d6ff9_0%,#60a5fa_25%,#a78bfa_50%,#60a5fa_75%,#6d6ff9_100%)] opacity-90 blur-[2px] [background-size:200%_200%] motion-safe:animate-[border-pan_9s_linear_infinite]" />

            {/* خودِ باکس */}
            <section
              className="relative w-full rounded-[24px] p-6 sm:p-8 shadow-2xl backdrop-blur-xl border border-white/50 dark:border-white/10 motion-safe:animate-[float-box_12s_ease-in-out_infinite]
             bg-[radial-gradient(120%_100%_at_50%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0.7)_40%,rgba(255,255,255,0.55)_100%),linear-gradient(to_bottom_right,rgba(99,102,241,0.08),rgba(59,130,246,0.08))]
             dark:bg-[radial-gradient(120%_100%_at_50%_0%,rgba(15,23,42,0.85),rgba(15,23,42,0.7)_40%,rgba(15,23,42,0.55)_100%),linear-gradient(to_bottom_right,rgba(99,102,241,0.15),rgba(59,130,246,0.12))]"
            >
              {/* هاله آیکن */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 -z-10 h-24 w-24 rounded-full bg-indigo-400/20 blur-2xl dark:bg-indigo-500/15" />

              {/* آیکن */}
              <div className="mb-4 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-500 blur-md opacity-30" />
                  <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white ring-1 ring-white/20 shadow-lg">
                    <FaUserShield className="h-8 w-8" />
                  </div>
                </div>
              </div>

              {/* عنوان داخل باکس */}
              <h2 className="mb-2 text-center text-xl sm:text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 via-fuchsia-500 to-blue-600">
                خوش آمدید به پنل ادمین آرشاپ
              </h2>
              <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
                برای مدیریت سیستم وارد حساب خود شوید.
              </p>

              {/* CTA */}
              <div className="space-y-3">
                <Button
                  onPress={handleSignIn}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-6 text-lg font-bold text-white transition-all hover:scale-[1.01] hover:from-indigo-500 hover:to-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:from-indigo-500 dark:to-blue-500"
                  aria-label="ورود به پنل مدیریت"
                >
                  ورود به پنل
                </Button>

                <div className="text-center">
                  <a
                    href="/"
                    className="inline-flex items-center justify-center text-sm font-medium text-indigo-700 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200 underline underline-offset-4"
                  >
                    مشاهدهٔ فروشگاه
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
