"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaUserShield } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <main className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-10 max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <FaUserShield className="w-12 h-12 sm:w-14 sm:h-14 text-blue-500" />
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          به پنل ادمین خوش آمدید!
        </h1>
        <p className="text-gray-600">
          برای مدیریت سیستم لطفاً وارد حساب خود شوید.
        </p>
        <Button
          onPress={handleSignIn}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
        >
          ورود به پنل
        </Button>
      </div>
    </main>
  );
}
