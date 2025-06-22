"use client"
import React from "react";
import { Tabs, Tab, Card, CardBody, InputOtp, Input } from "@heroui/react";

export default function App() {
    const [selected, setSelected] = React.useState("phone");

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mb-6">
                <img src="/images/logo.png" alt="logo" className="w-32 mb-3" />
                <p>شماره تماس خود را وارد نمایید</p>
            </div>
            <Card className="max-w-[550px] w-full">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        aria-label="Tabs form"
                        selectedKey={selected}
                        size="md"
                        onSelectionChange={(key) => setSelected(String(key))}
                        className="mb-6"
                    >
                        <Tab key="otp" title="رمز یک‌ بار مصرف">
                            <div className="flex items-center justify-center">
                                <InputOtp length={6} size="lg" />
                            </div>
                        </Tab>
                        <Tab key="phone" title="شماره تماس">
                            <div className="flex items-center justify-center">
                                <Input label="شماره تماس" type="tel" inputMode="tel" variant="flat" size="sm" maxLength={11} />
                            </div>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
}

