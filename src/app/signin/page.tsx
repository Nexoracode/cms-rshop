"use client";

import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  InputOtp,
  Input,
  Button,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  useRequestOtpMutation,
  useVerifyOtpMutation,
} from "@/hooks/api/signin/useSignin";
import useOnlineStatus from "@/hooks/system/useOnlineStatus";
import useCountdown from "@/hooks/system/useCountdown";

import {
  containerVariants,
  itemVariants,
  tabContentVariants,
  mainCardMotion,
  successCheckMotion,
  errorShake,
} from "@/animations/authPageVariants";

type Auth = "phone" | "otp";

export default function App() {
  const router = useRouter();
  const [selected, setSelected] = useState<Auth>("phone");
  const [phoneValue, setPhoneValue] = useState("");
  const [code, setCode] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const online = useOnlineStatus();
  const otpTimer = useCountdown(120);

  const requestOtpMutation = useRequestOtpMutation();
  const verifyOtpMutation = useVerifyOtpMutation();

  const requesting =
    (requestOtpMutation as any)?.isPending ??
    (requestOtpMutation as any)?.isLoading ??
    false;
  const verifying =
    (verifyOtpMutation as any)?.isPending ??
    (verifyOtpMutation as any)?.isLoading ??
    false;

  useEffect(() => {
    if (code.length === 6) sendOtpCodeApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (!online)
      setLocalError("اتصال اینترنت برقرار نیست. لطفاً اینترنت خود را بررسی کنید.");
    else setLocalError(null);
  }, [online]);

  const handleTabChange = (key: string) => {
    if (key === "otp" && phoneValue.length < 11) return;
    setSelected(key as Auth);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setPhoneValue(val);
    if (val.length === 11) {
      setSelected("otp");
      sendPhoneApiCall(val, { startTimer: true });
    }
  };

  const sendPhoneApiCall = (phone: string, opts?: { startTimer?: boolean }) => {
    if (!online) {
      setLocalError("شما آفلاین هستید. برای دریافت کد، اتصال اینترنت را برقرار کنید.");
      return;
    }
    if (requesting) return;

    requestOtpMutation.mutate(phone, {
      onSuccess: () => {
        if (opts?.startTimer) otpTimer.start();
        else otpTimer.reset();
      },
    });
  };

  const sendOtpCodeApiCall = () => {
    if (!online) {
      setLocalError("شما آفلاین هستید. برای بررسی کد، اتصال اینترنت را برقرار کنید.");
      return;
    }
    if (verifying || phoneValue.length !== 11 || code.length !== 6) return;

    verifyOtpMutation.mutate(
      { phone: phoneValue, code },
      {
        onSuccess: (res: any) => {
          if (res?.ok) {
            setSuccess(true);
            setTimeout(() => router.push("/admin/home"), 1200);
          }
        },
      }
    );
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center w-full px-4 overflow-hidden"
      dir="rtl"
    >
      {/* subtle bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(35rem_35rem_at_20%_10%,rgba(99,102,241,.12),transparent),radial-gradient(40rem_40rem_at_80%_110%,rgba(56,189,248,.15),transparent)]" />

      {/* ✅ Success overlay */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-xl z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div {...successCheckMotion} className="flex flex-col items-center">
              <svg
                width="90"
                height="90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" stroke="#22c55e" />
                <path d="M8 12l3 3 5-6" stroke="#22c55e" />
              </svg>
              <p className="mt-3 font-semibold text-green-600 text-lg">
                ورود موفقیت‌آمیز!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Main card */}
      <motion.div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-blue-200/70 via-white/50 to-purple-200/70 shadow-[0_20px_80px_-20px_rgba(99,102,241,0.35)]" {...mainCardMotion}>
        <motion.div
          className="max-w-[380px] w-[92vw] sm:w-[380px] rounded-3xl bg-white/70 backdrop-blur-xl"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <Card shadow="md" className="rounded-3xl bg-transparent border border-white/40">
            <CardBody className="space-y-7 p-8">
              {/* header */}
              <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
                <img src="/images/logo.png" alt="logo" className="w-40 mb-3 drop-shadow" />
                <h1 className="font-extrabold tracking-tight text-[20px] text-slate-800">
                  پنل ادمین آرشاپ
                </h1>
                <p className="text-slate-500 text-sm mt-2.5">
                  {selected === "phone"
                    ? "شماره تماس خود را وارد نمایید"
                    : "کد ارسال شده به تلفن خود را وارد نمایید"}
                </p>
              </motion.div>

              {/* ✅ Tabs */}
              <motion.div variants={itemVariants}>
                <Tabs
                  selectedKey={selected}
                  onSelectionChange={(key) => handleTabChange(key as string)}
                  variant="underlined"
                  color="primary"
                  className="flex items-center justify-center"
                  classNames={{
                    tabList: "w-full flex justify-center",
                    tabContent: "font-semibold",
                  }}
                >
                  <Tab key="phone" title="شماره تلفن">
                    <AnimatePresence mode="wait">
                      {selected === "phone" && (
                        <motion.div key="phone" {...tabContentVariants}>
                          <Input
                            style={{ direction: "ltr" }}
                            autoFocus
                            label="شماره تلفن خود را وارد کنید"
                            type="tel"
                            inputMode="tel"
                            variant="flat"
                            size="sm"
                            maxLength={11}
                            value={phoneValue}
                            onChange={handlePhoneChange}
                            isDisabled={requesting}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Tab>

                  <Tab key="otp" title="کد یک بار مصرف">
                    <AnimatePresence mode="wait">
                      {selected === "otp" && (
                        <motion.div key="otp" {...tabContentVariants}>
                          <div style={{ direction: "ltr" }} className="ltr flex items-center justify-center">
                            <InputOtp
                              length={6}
                              size="md"
                              autoFocus
                              value={code}
                              onValueChange={setCode}
                              isDisabled={verifying || !online}
                            />
                          </div>

                          {/* resend timer + progress */}
                          <div className="mt-4 flex flex-col items-center gap-2">
                            <div className="flex items-center justify-center gap-3 text-sm">
                              <Button
                                size="sm"
                                variant="flat"
                                color="primary"
                                isDisabled={!otpTimer.isFinished || !online || requesting}
                                onPress={() => sendPhoneApiCall(phoneValue, { startTimer: true })}
                                className="rounded-full"
                              >
                                {otpTimer.isFinished
                                  ? "ارسال مجدد کد"
                                  : `ارسال مجدد تا ${otpTimer.mm}:${otpTimer.ss}`}
                              </Button>
                            </div>

                            <motion.div className="h-1 w-48 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-sky-400 to-fuchsia-400"
                                initial={{ width: "100%" }}
                                animate={{
                                  width: otpTimer.isFinished
                                    ? "0%"
                                    : `${(otpTimer.seconds / 120) * 100}%`,
                                }}
                                transition={{ duration: 0.9, ease: "linear" }}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Tab>
                </Tabs>
              </motion.div>

              {/* footer */}
              <motion.div variants={itemVariants} className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              <motion.p variants={itemVariants} className="text-[11px] leading-5 text-slate-500 text-center">
                با ورود، شرایط استفاده و حریم خصوصی آرشاپ را می‌پذیرید.
              </motion.p>

              {/* errors */}
              {(localError ||
                (requestOtpMutation as any)?.isError ||
                (verifyOtpMutation as any)?.isError) && (
                <motion.div {...errorShake} className="text-center text-sm text-red-600 bg-red-50/70 border border-red-200 rounded-xl py-2 px-3">
                  {localError ||
                    (requestOtpMutation as any)?.error?.message ||
                    (verifyOtpMutation as any)?.error?.message ||
                    "مشکلی پیش آمد. دوباره تلاش کنید."}
                </motion.div>
              )}
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
