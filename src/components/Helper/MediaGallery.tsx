"use client"

import { Button, Modal, ModalContent, Tab, Tabs } from "@heroui/react"
import { LuImages, LuUpload } from "react-icons/lu"
import { useState } from "react"

const MediaGallery = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <Button
                color="secondary"
                variant="flat"
                size="sm"
                className="rounded-md"
                onPress={() => setIsOpen(true)}
            >
                <LuImages className="text-lg" /> گالری
            </Button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen} placement="auto">
                <ModalContent>
                    {onClose => (
                        <div className="flex w-full flex-col p-2">
                            <Tabs aria-label="Media Options" color="secondary" variant="bordered">
                                <Tab
                                    key="upload"
                                    title={
                                        <div className="flex items-center gap-2">
                                            <LuUpload className="text-lg" />
                                            <span>آپلود فایل</span>
                                        </div>
                                    }
                                >
                                    <div className="p-4">جزو فیچر های آینده</div>
                                </Tab>

                                <Tab
                                    key="gallery"
                                    title={
                                        <div className="flex items-center gap-2">
                                            <LuImages className="text-lg" />
                                            <span>گالری</span>
                                        </div>
                                    }
                                >
                                    <div className="p-4">جزو فیچر های آینده</div>
                                </Tab>
                            </Tabs>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default MediaGallery
