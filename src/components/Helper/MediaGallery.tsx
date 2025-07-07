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
              <Tabs aria-label="Media Options" color="primary" variant="bordered">
                <Tab
                  key="gallery"
                  title={
                    <div className="flex items-center gap-2">
                      <LuImages />
                      <span>گالری</span>
                    </div>
                  }
                >
                  {/* اینجا محتوای گالری قرار بگیره */}
                  <div className="p-4">محتوای گالری اینجاست.</div>
                </Tab>

                <Tab
                  key="upload"
                  title={
                    <div className="flex items-center gap-2">
                      <LuUpload />
                      <span>آپلود فایل</span>
                    </div>
                  }
                >
                  {/* اینجا فرم آپلود قرار بگیره */}
                  <div className="p-4">محتوای آپلود فایل اینجاست.</div>
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
