"use client"

import { Button, Modal, ModalContent } from "@heroui/react"
import { LuImages } from "react-icons/lu"
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

      <Modal
        isOpen={isOpen}
        onOpenChange={open => setIsOpen(open)}
        placement="auto"
      >
        <ModalContent>
          {onClose => (
            <div className="p-6 text-center text-gray-500">
              <p>گالری در حال توسعه است...</p>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MediaGallery
