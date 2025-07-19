"use client";

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody, InputOtp, Input } from "@heroui/react";
import BreakpointWatcher from "@/components/Helper/BreakpointWatcher";
import { fetcher } from "@/utils/fetcher";
import { useRouter } from "next/navigation";

type Auth = "phone" | "otp";

export default function App() {
  const router = useRouter();
  const [isPhone, setIsPhone] = useState(false);
  const [selected, setSelected] = useState<Auth>("phone");
  //
  const [phoneValue, setPhoneValue] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (code.length === 6) {
      sendOtpCodeApiCall();
    }
  }, [code]);

  const handleTabChange = (key: string) => {
    if (key === "otp" && phoneValue.length < 11) return;
    setSelected(key as Auth);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    val = val.replace(/\D/g, "");
    setPhoneValue(val);

    if (val.length === 11) {
      setSelected("otp");
      sendPhoneApiCall(val);
    }
  };

  const sendPhoneApiCall = async (phone: string) => {
    await fetcher({
      route: "/auth/request-otp",
      method: "POST",
      body: { identifier: phone },
      successText: "کد ارسال شده به تلفن همراه خود را وارد نمایید",
    });
  };

  const sendOtpCodeApiCall = async () => {
    const res = await fetcher({
      route: "/auth/verify-otp",
      method: "POST",
      body: { identifier: phoneValue, code },
      successText: "به ادمین پنل خوش آمدید",
    });
    if (res?.ok) {
      router.push("/admin/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl pt-5 sm:p-10 text-center space-y-6">
        <div className="flex flex-col items-center justify-center mb-6">
          <img src="/images/logo.png" alt="logo" className="w-32 mb-3" />
          <p>
            {selected === "phone"
              ? "شماره تماس خود را وارد نمایید"
              : "کد ارسال شده به تلفن خود را وارد نمایید"}
          </p>
        </div>

        <Card className="max-w-[450px] w-full">
          <CardBody className="overflow-hidden">
            <Tabs
              isVertical={isPhone}
              aria-label="Tabs form"
              selectedKey={selected}
              size="md"
              onSelectionChange={(key) => handleTabChange(key as Auth)}
              className={`flex ${!isPhone ? "justify-center" : ""}`}
            >
              <Tab
                key="phone"
                title="شماره تماس"
                className="flex items-center justify-center w-full"
              >
                <Input
                  autoFocus
                  label="شماره تماس"
                  type="tel"
                  inputMode="tel"
                  variant="flat"
                  size="sm"
                  maxLength={11}
                  value={phoneValue}
                  onChange={handlePhoneChange}
                />
              </Tab>
              <Tab
                key="otp"
                title="رمز یک‌بار مصرف"
                className="flex items-center justify-center w-full"
              >
                <InputOtp
                  length={6}
                  size="md"
                  autoFocus
                  value={code}
                  onValueChange={setCode}
                />
              </Tab>
            </Tabs>
          </CardBody>

          <BreakpointWatcher
            onBreakpointChange={(status) => setIsPhone(status)}
          />
        </Card>
      </div>
    </div>
  );
}
