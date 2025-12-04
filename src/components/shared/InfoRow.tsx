"use client"

import { useState } from "react"
import { BiCopy } from "react-icons/bi"

type Props = {
  label: string,
  value: string,
  isActiveBg?: boolean
}

const InfoRow: React.FC<Props> = ({ isActiveBg = false, label, value }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-1">
      <div
        className={`relative group flex flex-col gap-2 phone:flex-row phone:gap-0 justify-between items-center rounded-md p-1 ${isActiveBg ? "bg-slate-100" : ""}`}
      >
        {/* Label */}
        <span
          className="text-default-600 w-full text-nowrap p-1 pr-2 text-right transition-opacity duration-200 group-hover:opacity-0"
        >
          {label}
        </span>

        {/* Value + Copy */}
        <div className="pl-1.5 flex items-center justify-center transition-all duration-200">
          <p className="font-medium text-[13px] w-40 truncate">
            {value}
          </p>

          {/* Copy Icon */}
          <button
            onClick={handleCopy}
            className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-md hover:bg-slate-200"
          >
            <BiCopy className="w-4 h-4 text-gray-600" />
          </button>

          {/* Copied Tooltip */}
          {copied && (
            <span className="absolute top-0 right-6 text-xs bg-black text-white px-2 py-0.5 rounded">
              کپی شد
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoRow
