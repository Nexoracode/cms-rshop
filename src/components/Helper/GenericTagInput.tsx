"use client"

import { Input, Chip } from "@heroui/react"
import { useState } from "react"

type Props = {
    label?: string
    placeholder?: string
    defaultTags?: string[]
    onChange?: (tags: string[]) => void
}

export default function GenericTagInput({
    label = "تگ‌ها",
    placeholder = "تگی بنویس و Enter بزن",
    defaultTags = [],
    onChange,
}: Props) {
    const [inputValue, setInputValue] = useState("")
    const [tags, setTags] = useState<string[]>(defaultTags)

    const addTag = () => {
        const trimmed = inputValue.trim()
        if (!trimmed || tags.includes(trimmed)) return
        const updated = [...tags, trimmed]
        setTags(updated)
        setInputValue("")
        onChange?.(updated)
    }

    const removeTag = (tag: string) => {
        const updated = tags.filter(t => t !== tag)
        setTags(updated)
        onChange?.(updated)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTag()
        }
    }

    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-sm text-gray-600">{label}</label>}

            <Input
                value={inputValue}
                onValueChange={setInputValue}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full"
            />

            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                    <Chip
                        key={tag}
                        onClose={() => removeTag(tag)}
                        variant="flat"
                        color="default"
                        className="bg-gray-200"
                    >
                        {tag}
                    </Chip>
                ))}
            </div>
        </div>
    )
}
