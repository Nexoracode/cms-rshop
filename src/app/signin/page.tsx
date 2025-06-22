"use client";

import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, InputOtp, Input } from "@heroui/react";
import BreakpointWatcher from "@/components/Helper/BreakpointWatcher";

type auth = "phone" | "otp"

export default function App() {
    const [selected, setSelected] = useState<auth>("phone");
    const [isPhone, setIsPhone] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mb-6">
                <img src="/images/logo.png" alt="logo" className="w-32 mb-3" />
                <p>
                    {
                        selected === "phone" ? "شماره تماس خود را وارد نمایید" : "کد ارسال شده به تلفن خود را وارد نمایید"
                    }
                </p>
            </div>

            <Card className="max-w-[450px] w-full">
                <CardBody className="overflow-hidden">
                    <Tabs
                        isVertical={isPhone}
                        aria-label="Tabs form"
                        selectedKey={selected}
                        size="md"
                        onSelectionChange={(key) => setSelected(key as auth)}
                        className={`flex ${!isPhone ? "justify-center" : ""}`}
                    >
                        <Tab key="phone" title="شماره تماس" className="flex items-center justify-center w-full">
                            <Input
                                label="شماره تماس"
                                type="tel"
                                inputMode="tel"
                                variant="flat"
                                size="sm"
                                maxLength={11}
                            />
                        </Tab>
                        <Tab key="otp" title="رمز یک‌بار مصرف" className="flex items-center justify-center w-full">
                            <InputOtp length={6} size="md" />
                        </Tab>
                    </Tabs>
                </CardBody>

                <BreakpointWatcher onBreakpointChange={(status) => setIsPhone(status)}/>
            </Card>
        </div>
    );
}
