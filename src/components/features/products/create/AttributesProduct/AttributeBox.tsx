"use client";

import IconBadge from "@/components/common/IconBadge";
import DeleteButton from "@/components/shared/DeleteButton";
import { Input } from "@heroui/react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { LiaListOlSolid } from "react-icons/lia";

type AttributeBoxProps = {
  addBtn: React.ReactNode;
  children: React.ReactNode;
  attr: any[];
  onChoose: (id: number) => void;
  onEdit: (id: number) => void;
  deleteAttr: (id: number) => void;
  placeholderInput?: string;
  multiSelect?: boolean;
  selectedIds?: number[];
};

const AttributeBox: React.FC<AttributeBoxProps> = ({
  children,
  addBtn,
  attr,
  onChoose,
  deleteAttr,
  onEdit,
  multiSelect = false,
  selectedIds = [],
  placeholderInput = "جستجو مقدار ویژگی...",
}) => {
  const [search, setSearch] = useState("");
  const [singleSelectedId, setSingleSelectedId] = useState<number | undefined>();

  const getMatchScore = (text: string, query: string) => {
    if (!query) return 0;
    return text.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
  };

  const sortedAttr =
    attr &&
    [...attr].sort((a, b) => {
      const aLabel = a.name || a.value || "";
      const bLabel = b.name || b.value || "";
      return (
        getMatchScore(bLabel, search) - getMatchScore(aLabel, search)
      );
    });

  return (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <Input
          type="search"
          placeholder={placeholderInput}
          startContent={<BiSearch size={18} />}
          className="w-fit"
          variant="flat"
          size="sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {addBtn}
      </div>

      <div className="p-2 rounded-xl mt-3 border border-slate-300 max-h-[200px]">
        <ul className="flex flex-col overflow-y-auto max-h-[180px]">
          {sortedAttr?.length ? (
            sortedAttr.map((item: any, index) => {
              const isSelected = multiSelect
                ? selectedIds.includes(item.id)
                : singleSelectedId === item.id;

              return (
                <li
                  key={item.id}
                  className={`
                    flex items-center justify-between mx-2 p-2 py-1 group cursor-pointer
                    ${isSelected ? "bg-sky-100" : ""}
                    ${attr.length - 1 !== index ? "border-b border-slate-200" : ""}
                  `}
                  onClick={() => {
                    const id = +item.id;
                    if (multiSelect) {
                      onChoose(id);
                    } else {
                      setSingleSelectedId(id);
                      onChoose(id);
                    }
                  }}
                >
                  <span className="text-gray-700">
                    {item.name || item.value}
                  </span>

                  <div className="opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2">
                      <DeleteButton
                        onDelete={() => deleteAttr(item.id)}
                      />
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(item.id);
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              <IconBadge
                icon={LiaListOlSolid}
                circleClassName="bg-sky-100"
                iconClassName="text-sky-600"
              />
              <p className="text-gray-700 text-sm text-center">
                درصورت نبود مقدار آن را ایجاد و یا مقداری از لیست بالایی انتخاب کنید.
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AttributeBox;
