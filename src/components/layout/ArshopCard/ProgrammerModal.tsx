"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { FiSend } from "react-icons/fi";

type ProgrammerModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const ProgrammerModal: React.FC<ProgrammerModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1">
              <h3 className="font-bold">اطلاعات فروشگاه و تیم توسعه</h3>
              <small className="text-gray-600">arshop.ir</small>
            </ModalHeader>
            <ModalBody>
              <section className="flex flex-wrap justify-center gap-6">
                <section className="flex flex-wrap md:flex-nowrap w-full md:flex-row gap-6">
                  {/* کارت دوم */}
                  <div className="flex w-full flex-col gap-3 p-3 sm:p-4 rounded-2xl border-2 shadow-lg bg-white/70">
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src="/images/maddahi.jpg"
                        alt="عکس Mohammad Maddahi"
                        className="h-16 w-16 rounded-full ring-2 ring-offset-1 ring-orange-500/50"
                      />
                      <div className="leading-tight text-center">
                        <div className="font-bold text-sm sm:text-base text-gray-900">
                          Mohammad Reza <br /> Maddahi
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          BackEnd Developer (NodeJs / Nest)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <a
                        href="https://eitaa.com/programmer058"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium 
                   bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 
                   text-white shadow hover:from-orange-600 hover:via-orange-500 hover:to-yellow-500 
                   transition-all duration-300"
                      >
                        <FiSend className="h-4 w-4" />
                        Eitaa
                      </a>
                      <a
                        href="tel:09372013208"
                        className="text-center w-full gap-2 rounded-xl border border-orange-300/50 
                   px-3 py-2 text-sm text-orange-700 hover:bg-orange-50 
                   transition-all duration-300"
                      >
                        تماس: 09372013208
                      </a>
                    </div>
                  </div>
                  {/* کارت اول */}
                  <div className="flex w-full flex-col gap-3 p-3 sm:p-4 rounded-2xl border-2 shadow-lg bg-white/70">
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src="https://avatars.githubusercontent.com/u/101788797?v=4"
                        alt="عکس Mohammad Hossein Khadem al Mahdi"
                        className="h-16 w-16 rounded-full ring-2 ring-offset-1 ring-orange-500/50"
                      />
                      <div className="leading-tight text-center">
                        <div className="font-bold text-sm sm:text-base text-gray-900">
                          Mohammad Hossein <br /> Khadem al Mahdi
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Front-End Developer (React / Next.js)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <a
                        href="https://eitaa.com/mhkhadem"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium 
                   bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 
                   text-white shadow hover:from-orange-600 hover:via-orange-500 hover:to-yellow-500 
                   transition-all duration-300"
                      >
                        <FiSend className="h-4 w-4" />
                        Eitaa
                      </a>
                      <a
                        href="tel:09031335939"
                        className="text-center w-full gap-2 rounded-xl border border-orange-300/50 
                   px-3 py-2 text-sm text-orange-700 hover:bg-orange-50 
                   transition-all duration-300"
                      >
                        تماس: 09031335939
                      </a>
                    </div>
                  </div>
                </section>
                <p className="px-4 py-2 text-center text-xs text-gray-600 dark:text-gray-400">
                  در صورت بروز مشکل با برنامه‌نویس تماس بگیرید.
                </p>
              </section>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                بستن
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProgrammerModal;
