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
  onChoose: (id: number | undefined) => void;
  onEdit: (id: number) => void;
  deleteAttr: (id: number) => void;
  placeholderInput?: string;
};

const AttributeBox: React.FC<AttributeBoxProps> = ({
  children,
  addBtn,
  attr,
  onChoose,
  deleteAttr,
  onEdit,
  placeholderInput = "جستجو گروه ویژگی...",
}) => {
  const [search, setSearch] = useState("");
  const [selectedAttrGroupId, setSelectedAttrGroupId] = useState<
    number | undefined
  >(undefined);

  console.log("#################", attr);

  const getMatchScore = (text: string, query: string) => {
    if (!query) return 0;

    const t = text.toLowerCase();
    const q = query.toLowerCase();

    if (t.includes(q)) return 1;
    return 0;
  };

  const sortedAttr =
    attr &&
    [...attr].sort((a, b) => {
      const aLabel = a.name || a.value || "";
      const bLabel = b.name || b.value || "";

      const aScore = getMatchScore(aLabel, search);
      const bScore = getMatchScore(bLabel, search);

      // match ها بالا، غیر match ها پایین
      return bScore - aScore;
    });

  return (
    <div className="p-2">
      <div>
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
        {/* isRequired={isDisabledEdit} */}
        <div className="p-2 rounded-xl mt-3 border border-slate-300 max-h-[200px] h-full">
          <ul className="flex flex-col overflow-y-auto overflow-hidden max-h-[180px]">
            {sortedAttr?.length ? (
              sortedAttr.map((item: any, index) => (
                <li
                  key={item.id}
                  className={`border-slate-200 text-gray-700 flex items-center justify-between mx-2 p-2 py-1 group ${
                    item.name ? "cursor-pointer" : "cursor-auto"
                  } ${selectedAttrGroupId === item.id ? "bg-slate-100" : ""} ${
                    attr?.length - 1 !== index ? "border-b" : ""
                  }`}
                  onClick={() => {
                    if (item.name) {
                      setSelectedAttrGroupId(+item.id);
                      onChoose(+item.id);
                    }
                  }}
                >
                  <span>{item.name || item.value}</span>
                  <div className={`opacity-0 group-hover:opacity-100`}>
                    <div className="flex items-center gap-2">
                      <DeleteButton
                        onDelete={() => {
                          deleteAttr(item.id);
                        }}
                      />
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(+item.id);
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex flex-col items-center gap-4 py-4">
                <IconBadge
                  icon={LiaListOlSolid}
                  circleClassName="bg-sky-100"
                  iconClassName="text-sky-600"
                />
                <p className="text-gray-700">
                  درصورت نبود مقدار  آن را ایجاد و یا مقداری از لیست بالایی انتخاب کنید.
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttributeBox;
