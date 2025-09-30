"use client";

import { useState } from "react";
import { Card, CardBody, Image, Chip, Tooltip } from "@heroui/react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";

type Media = { id: number; url: string; alt: string | null; type: "image" };
export type Category = {
  id: number;
  title: string;
  slug: string;
  discount: string; // مثل "10"
  level: number; // 1,2,3,...
  parent_id: number; // 0 یعنی مادر
  is_delete: boolean; // از بک‌اند میاد
  media?: Media;
  children: Category[];
};

type CategoryTreeProps = {
  categories: Category[]; // آرایه‌ی ریشه‌ها (level=1)
  onEdit: (cat: Category) => void;
  onDelete: (id: number) => void;
};

const ToggleButton = ({
  open,
  hasChildren,
  onClick,
}: {
  open: boolean;
  hasChildren: boolean;
  onClick: () => void;
}) => (
  <button
    className="bg-gray-100 rounded-md p-1 cursor-auto"
    onClick={onClick}
    aria-label={open ? "بستن زیرشاخه‌ها" : "باز کردن زیرشاخه‌ها"}
    type="button"
  >
    {hasChildren ? (
      open ? (
        <BiChevronDown size={17} className="cursor-pointer hover:opacity-70 transition-all"/>
      ) : (
        <BiChevronRight size={17} className="cursor-pointer hover:opacity-70 transition-all"/>
      )
    ) : (
      <BiChevronRight size={17} className="opacity-30 pointer-events-none"/>
    )}
  </button>
);

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <div dir="rtl" className="flex flex-col items-center gap-3">
      {categories.map((cat) => (
        <CategoryNode
          key={cat.id}
          node={cat}
          chainTitles={[]} // مسیر والدین تا این نود
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

const CategoryNode: React.FC<{
  node: Category;
  chainTitles: string[];
  onEdit: (cat: Category) => void;
  onDelete: (id: number) => void;
}> = ({ node, chainTitles, onEdit, onDelete }) => {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const pathTitles = chainTitles.length ? `${chainTitles.join(" › ")} › ` : "";
  const isRoot = node.parent_id === 0;

  return (
    <div className="relative">
      {/* کارت هر نود */}
      <Card
        className={`shadow-md border w-[270px] sm:w-full ${
          isRoot ? "shadow-[0_3px_5px_skyblue]" : ""
        }`}
      >
        <CardBody className="p-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex">
                <ToggleButton
                  open={open}
                  hasChildren={hasChildren}
                  onClick={() => setOpen((p) => !p)}
                />
              </div>

              {/* تصویر */}
              <div className="w-28 h-28 sm:w-[72px] sm:h-[72px] overflow-hidden rounded-xl bg-default-100 shrink-0">
                {node.media?.url ? (
                  <Image
                    alt={node.media.alt ?? node.title}
                    src={node.media.url}
                    className="object-cover w-full h-full"
                    radius="none"
                    removeWrapper
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-xs text-default-400">
                    بدون تصویر
                  </div>
                )}
              </div>
            </div>

            {/* اطلاعات */}
            <div className="relative flex-1 min-w-0">
              {/* مسیر والدین */}
              {chainTitles.length > 0 && (
                <div className="text-xs hidden sm:flex absolute left-0 text-default-500 truncate items-center justify-end">
                  <div className="w-fit bg-gray-100 rounded-lg py-2 px-3">
                    {pathTitles}
                    {node.title}
                  </div>
                </div>
              )}
              {/* عنوان + مدال‌ها */}
              <div className="flex items-center gap-2 p-2">
                <p className="text-[15px]">{node.title}</p>
                <p className="text-xs text-default-500">({node.slug})</p>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                {isRoot && (
                  <Chip size="sm" color="primary" variant="flat" radius="sm">
                    والد
                  </Chip>
                )}
                {hasChildren && (
                  <Chip size="sm" variant="flat" radius="sm">
                    {node.children.length} زیرمجموعه
                  </Chip>
                )}
                {node.discount && node.discount !== "0" && (
                  <Chip size="sm" color="warning" variant="flat" radius="sm">
                    %{node.discount} تخفیف
                  </Chip>
                )}
              </div>
              {/* اکشن‌ها */}
              <div className="flex items-center mt-3 sm:mt-0 justify-center sm:justify-end gap-2">
                <div className="flex sm:hidden">
                  <ToggleButton
                    open={open}
                    hasChildren={hasChildren}
                    onClick={() => setOpen((p) => !p)}
                  />
                </div>
                <button
                  onClick={() => onEdit(node)}
                  className="bg-gray-100 rounded-md p-1 hover:opacity-70 transition-all"
                >
                  <TbEdit size={18} />
                </button>
                <button
                  onClick={() => onDelete(node.id)}
                  className="bg-gray-100 rounded-md p-1 hover:opacity-70 transition-all"
                >
                  <RiDeleteBin5Line size={18} />
                </button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* بچه‌ها */}
      {hasChildren && open && (
        <div className="ps-4 border-r mt-2 ms-3 flex flex-col gap-3">
          {node.children.map((child) => (
            <CategoryNode
              key={child.id}
              node={child}
              chainTitles={[...chainTitles, node.title]}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTree;
