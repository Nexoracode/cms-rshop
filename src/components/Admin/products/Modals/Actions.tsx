"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

const Actions: React.FC<any> = ({ isOpen, onOpenChange }) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="auto"    // uses Hero UI auto: bottom on mobile, center on larger screens
        >
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader>تنظیمات محصول</ModalHeader>
                        <ModalBody>
                            <p>اینجا متن مدال شما قرار می‌گیرد.</p>
                        </ModalBody>
                        <ModalFooter className="flex gap-2">
                            <Button color="danger" variant="light" onPress={onClose}>
                                بستن
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                ذخیره
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default Actions