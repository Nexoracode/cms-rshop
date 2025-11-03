"use client"

import HeaderAction from "@/components/common/HeaderAction"
import Faq from "@/components/features/settings/Faq"
import { useState } from "react"
import { FaQuestion } from "react-icons/fa6"

type FaqItem = {
  id: number
  title: string
  description: string
}

const FaqAll = () => {
  const [isNewFaq, setIsNewFaq] = useState(false)
  const [faqList, setFaqList] = useState<FaqItem[]>([])
  const [tempTitle, setTempTitle] = useState("")
  const [tempDescription, setTempDescription] = useState("")

  const handleAddFaq = () => {
    if (!tempTitle || !tempDescription) return

    setFaqList(prev => [
      ...prev,
      { id: Date.now(), title: tempTitle, description: tempDescription }
    ])
    setIsNewFaq(false)
    setTempTitle("")
    setTempDescription("")
  }

  const handleRemoveFaq = (id: number) => {
    setFaqList(prev => prev.filter(f => f.id !== id))
  }

  const handleUpdateFaq = (id: number, data: { title: string; description: string }) => {
    setFaqList(prev =>
      prev.map(faq =>
        faq.id === id ? { ...faq, title: data.title, description: data.description } : faq
      )
    )
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="bg-white p-4 rounded-2xl">
        <HeaderAction
          title="تعریف سوال"
          textBtn={isNewFaq ? "x لغو سوال جدید" : "+ سوال جدید"}
          onPress={() => setIsNewFaq(prev => !prev)}
        />

        <div className="flex flex-col gap-6 mt-6">
          {isNewFaq && (
            <div className={!faqList.length ? "mb-10" : ""}>
              <Faq
                cardType="new"
                onSubmit={handleAddFaq}
                onChange={(data) => {
                  setTempTitle(data.title)
                  setTempDescription(data.description)
                }}
              />
            </div>
          )}

          {faqList.map(faq => (
            <Faq
              key={faq.id}
              cardType="update"
              title={faq.title}
              defaultValues={{ title: faq.title, description: faq.description }}
              onDelete={() => handleRemoveFaq(faq.id)}
              onSubmit={(data: any) => handleUpdateFaq(faq.id, data)}
            />
          ))}

          {!faqList.length && (
            <div className="flex items-center flex-col gap-2">
              <FaQuestion className="text-[90px] text-gray-600 animate-bounce" />
              <p className="text-center animate-pulse pb-4">
                هنوز هیچ سوالی تعریف نشده است
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FaqAll
