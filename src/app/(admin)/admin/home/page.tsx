"use client"

import { Button, Card, CardBody, CardHeader, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { MdMoreVert } from "react-icons/md";
import { MdOutlineFilterList } from "react-icons/md";

const Home = () => {
    return (
        <div>
            <Card className="shadow-md bg-gradient-to-r from-white via-purple-400">
                <CardBody>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-start">
                            <img
                                src="/images/logo.png"
                                alt="logo"
                                className="w-28 h-28 object-contain bg-[rgba(255,255,255,.8)] border-4 rounded-full"
                            />
                            <div>
                                <p className="text-2xl text-white">فروشگاه آرشاپ</p>
                                <p className="mt-1 text-[13px]">محصولات فرهنگی و مذهبی</p>
                                <div className="mt-2 bg-green-700/60 rounded-xl flex justify-start px-2 w-fit items-center gap-2 text-green-200">
                                    <span className="relative flex size-3">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-200 opacity-75"></span>
                                        <span className="relative inline-flex size-3 rounded-full bg-green-300"></span>
                                    </span>
                                    <p className="text-[12px]">سفارش گیری فعال</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button color="secondary" variant="flat" size="sm" className="rounded-md">
                                <MdMoreVert className="text-lg" /> بیشتر
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card className="mt-6 shadow-md">
                <CardHeader className="flex items-center justify-between bg-blue-200">
                    <p className="text-blue-600">گزارش ها</p>

                    <Popover showArrow backdrop={"opaque"} offset={10} placement="bottom">
                        <PopoverTrigger>
                            <Button className="capitalize" color="primary" variant="flat" size="sm">
                                <MdOutlineFilterList className="text-2xl"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px]">
                            {(titleProps) => (
                                <div className="px-1 py-2 w-full">
                                    <div className="mt-2 flex flex-col gap-2 w-full">
                                        <Listbox
                                            items={[
                                                { key: "today", label: "امروز" },
                                                { key: "last7", label: "7 روز گذشته" },
                                                { key: "last30", label: "30 روز گذشته" },
                                                { key: "lastYear", label: "سال گذشته" },
                                            ]}
                                        >
                                            {item => (
                                                <ListboxItem key={item.key}>{item.label}</ListboxItem>
                                            )}
                                        </Listbox>
                                    </div>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                </CardHeader>
                <CardBody>


                </CardBody>
            </Card>
        </div>
    );
}

export default Home