"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Tabs, Tab, Card, CardBody, InputOtp, Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  useRequestOtpMutation,
  useVerifyOtpMutation,
} from "@/hooks/signin/useSignin";

type Auth = "phone" | "otp";

/* -------------------------
   Hooks (در همین فایل)
-------------------------- */
// Online/Offline status
function useOnlineStatus() {
  const [online, setOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return online;
}

// 2-min countdown
function useCountdown(initialSeconds: number = 120) {
  const [seconds, setSeconds] = useState<number>(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [running, seconds]);

  const start = useCallback((secs?: number) => {
    setSeconds(secs ?? initialSeconds);
    setRunning(true);
  }, [initialSeconds]);

  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setRunning(true);
  }, [initialSeconds]);

  const stop = useCallback(() => setRunning(false), []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const isFinished = seconds === 0;

  return { seconds, running, start, reset, stop, mm, ss, isFinished };
}

/* -------------------------
   Component
-------------------------- */
export default function App() {
  const router = useRouter();
  const [selected, setSelected] = useState<Auth>("phone");
  const [phoneValue, setPhoneValue] = useState("");
  const [code, setCode] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const online = useOnlineStatus();
  const otpTimer = useCountdown(120);

  // Hooks
  const requestOtpMutation = useRequestOtpMutation();
  const verifyOtpMutation = useVerifyOtpMutation();

  // همون الگوی stable خودت: اول isPending، بعد isLoading، در غیر این‌صورت false
  const requesting =
    (requestOtpMutation as any)?.isPending ?? (requestOtpMutation as any)?.isLoading ?? false;
  const verifying =
    (verifyOtpMutation as any)?.isPending ?? (verifyOtpMutation as any)?.isLoading ?? false;

  // وقتی ۶ رقم شد، تأیید کن
  useEffect(() => {
    if (code.length === 6) sendOtpCodeApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  // آفلاین/آنلاین
  useEffect(() => {
    if (!online) setLocalError("اتصال اینترنت برقرار نیست. لطفاً اینترنت خود را بررسی کنید.");
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
        // شروع یا ریست تایمر بعد از ارسال موفق کد
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
          if (res?.ok) router.push("/admin/home");
        },
      }
    );
  };

  // Framer Motion variants
  const container = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
    }),
    []
  );
  const item = useMemo(
    () => ({
      hidden: { y: 12, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 140, damping: 16 },
      },
    }),
    []
  );
  const tabContent = useMemo(
    () => ({
      initial: { opacity: 0, y: 10, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
      exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.2 } },
    }),
    []
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center w-full px-4 overflow-hidden" dir="rtl">
      {/* subtle animated bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(35rem_35rem_at_20%_10%,rgba(99,102,241,.12),transparent),radial-gradient(40rem_40rem_at_80%_110%,rgba(56,189,248,.15),transparent)]" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-sky-300/40 to-fuchsia-300/30" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-[26rem] h-[26rem] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-indigo-300/40 to-purple-200/30" />

      {/* floating orbs */}
      <motion.span
        className="pointer-events-none absolute top-16 right-24 w-28 h-28 rounded-full bg-white/20 backdrop-blur-md shadow-[0_0_50px_rgba(255,255,255,0.35)]"
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="pointer-events-none absolute bottom-20 left-24 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md"
        animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* glassy card frame */}
      <motion.div
        className="relative p-[1px] rounded-3xl bg-gradient-to-br from-blue-200/70 via-white/50 to-purple-200/70 shadow-[0_20px_80px_-20px_rgba(99,102,241,0.35)]"
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.div
          className="max-w-[380px] w-[92vw] sm:w-[380px] rounded-3xl bg-white/70 backdrop-blur-xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <Card shadow="md" className="rounded-3xl bg-transparent border border-white/40">
            <CardBody className="space-y-7 p-8">
              {/* header */}
              <motion.div variants={item} className="flex flex-col items-center text-center">
                <img src="/images/logo.png" alt="logo" className="w-40 mb-3 drop-shadow" />
                <h1 className="font-extrabold tracking-tight text-[20px] text-slate-800">پنل ادمین آرشاپ</h1>
                <p className="text-slate-500 text-sm mt-2.5">
                  {selected === "phone"
                    ? "شماره تماس خود را وارد نمایید"
                    : "کد ارسال شده به تلفن خود را وارد نمایید"}
                </p>
              </motion.div>

              {/* Online/Offline banner */}
              {!online && (
                <motion.div
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center text-sm text-amber-800 bg-amber-50/70 border border-amber-200 rounded-xl py-2 px-3"
                >
                  شما آفلاین هستید. برخی عملیات (ارسال/بررسی کد) در دسترس نیست.
                </motion.div>
              )}

              {/* tabs */}
              <motion.div variants={item}>
                <Tabs
                  aria-label="فرم ورود"
                  selectedKey={selected}
                  size="md"
                  onSelectionChange={(key) => handleTabChange(key as string)}
                  className="flex justify-center items-center"
                  variant="underlined"
                  color="primary"
                  classNames={{ tabList: "w-full flex", tabContent: "font-semibold", cursor: "rounded-full" }}
                >
                  <Tab key="phone" title="شماره تلفن" className="w-full">
                    <AnimatePresence mode="wait">
                      {selected === "phone" && (
                        <motion.div key="phone-pane" {...tabContent}>
                          <Input
                            style={{ direction: "ltr" }}
                            autoFocus
                            label="شماره تلفن خود را وارد کنید"
                            type="tel"
                            inputMode="tel"
                            variant="flat"
                            size="md"
                            maxLength={11}
                            value={phoneValue}
                            onChange={handlePhoneChange}
                            isDisabled={requesting}
                            classNames={{
                              inputWrapper:
                                "h-12 bg-white/70 backdrop-blur border border-slate-200 hover:border-slate-300 focus-within:border-sky-400 shadow-sm",
                            }}
                          />
                          {requesting && (
                            <motion.p
                              className="text-xs text-slate-500 mt-2 text-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              در حال ارسال کد...
                            </motion.p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Tab>

                  <Tab key="otp" title="کد یک بار مصرف" className="w-full">
                    <AnimatePresence mode="wait">
                      {selected === "otp" && (
                        <motion.div key="otp-pane" {...tabContent}>
                          <div className="flex items-center justify-center">
                            <InputOtp
                              length={6}
                              size="md"
                              autoFocus
                              value={code}
                              onValueChange={setCode}
                              isDisabled={verifying || !online}
                            />
                          </div>

                          {/* resend */}
                          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
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
                            {!online && <span className="text-amber-700 text-xs">آفلاین</span>}
                          </div>

                          <div className="mt-3 text-xs text-slate-500 text-center">
                            {verifying ? "در حال بررسی کد..." : "کد تا ۲ دقیقه معتبر است."}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Tab>
                </Tabs>
              </motion.div>

              {/* divider + footer */}
              <motion.div variants={item} className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              <motion.p variants={item} className="text-[11px] leading-5 text-slate-500 text-center">
                با ورود، شرایط استفاده و حریم خصوصی آرشاپ را می‌پذیرید.
              </motion.p>

              {/* errors */}
              {(localError || (requestOtpMutation as any)?.isError || (verifyOtpMutation as any)?.isError) && (
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, -6, 6, -4, 4, 0] }}
                  transition={{ duration: 0.4 }}
                  className="text-center text-sm text-red-600 bg-red-50/70 border border-red-200 rounded-xl py-2 px-3"
                >
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
