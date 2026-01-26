"use client";

import DeleteButton from "@/components/shared/DeleteButton";
import { Input } from "@heroui/react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

type AttributeBoxProps = {
  addBtn: React.ReactNode;
  children: React.ReactNode;
  attr: any[];
  onClick: (id: number | undefined) => void;
  deleteAttr: (id: number) => void;
};

const AttributeBox: React.FC<AttributeBoxProps> = ({
  children,
  addBtn,
  attr,
  onClick,
  deleteAttr,
}) => {
  const [selectedAttrGroupId, setSelectedAttrGroupId] = useState<
    number | undefined
  >(undefined);
  const [hover, setHover] = useState(false);

  return (
    <div className="p-2">
      <div>
        <div className="flex items-center justify-between">
          <Input
            type="search"
            placeholder="جستجو گروه ویژگی..."
            startContent={<BiSearch size={18} />}
            className="w-fit"
            variant="flat"
            size="sm"
          />
          <div className="flex items-center gap-2">
            {selectedAttrGroupId && !hover && (
              <div className="flex items-center gap-2">
                <DeleteButton
                  onDelete={() => deleteAttr(selectedAttrGroupId)}
                />
                {children}
              </div>
            )}
            {addBtn}
          </div>
        </div>
        {/* isRequired={isDisabledEdit} */}
        <div className="p-2 rounded-xl mt-3 border border-slate-300 max-h-[200px] h-full">
          <ul className="flex flex-col overflow-y-auto overflow-hidden max-h-[180px]">
            {attr?.length
              ? attr.map((item: any, index) => (
                  <li
                    key={item.id}
                    className={`border-slate-200 text-gray-700 flex items-center justify-between mx-2 p-2 py-1 group ${
                      selectedAttrGroupId === item.id && !hover
                        ? "bg-slate-100"
                        : ""
                    } ${attr?.length - 1 !== index ? "border-b" : ""}`}
                    onClick={() => {
                      setSelectedAttrGroupId(+item.id);
                      setHover(false);
                      onClick(+item.id);
                    }}
                  >
                    <span>{item.name}</span>
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
                            setSelectedAttrGroupId(+item.id);
                            setHover(true);
                            onClick(+item.id);
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttributeBox;
