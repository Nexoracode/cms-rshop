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

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onEdit,
  onDelete,
}) => {
  return (
    <div dir="rtl" className="flex flex-col gap-3">
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
      <Card className="shadow-md border">
        <CardBody className="p-3">
          <div className="flex items-start gap-3">
            {/* Toggle children */}
            <button
              className="mt-1 shrink-0 rounded-md border px-1.5 py-1 hover:bg-default-100 transition-colors"
              onClick={() => setOpen((p) => !p)}
              aria-label={open ? "بستن زیرشاخه‌ها" : "باز کردن زیرشاخه‌ها"}
              type="button"
            >
              {hasChildren ? (
                open ? (
                  <BiChevronDown size={16} />
                ) : (
                  <BiChevronRight size={16} />
                )
              ) : (
                <span className="opacity-30">•</span>
              )}
            </button>

            {/* تصویر */}
            <div className="w-[72px] h-[72px] overflow-hidden rounded-xl bg-default-100 shrink-0">
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

            {/* اطلاعات */}
            <div className="flex-1 min-w-0">
              {/* مسیر والدین */}
              {chainTitles.length > 0 && (
                <div className="text-xs text-default-500 truncate flex items-center justify-end">
                  <div className="w-fit">
                    {pathTitles}
                    {node.title}
                  </div>
                </div>
              )}

              {/* عنوان + اسلاگ + مدال‌ها */}
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{node.title}</p>
                <span className="text-xs text-default-500 ltr:font-mono">
                  /{node.slug}
                </span>
                {isRoot && (
                  <Chip size="sm" color="secondary" variant="flat">
                    والد
                  </Chip>
                )}
                {node.discount && node.discount !== "0" && (
                  <Chip size="sm" color="warning" variant="flat">
                    %{node.discount} تخفیف
                  </Chip>
                )}
                {hasChildren && (
                  <Chip size="sm" variant="flat">
                    {node.children.length} زیرمجموعه
                  </Chip>
                )}
              </div>

              {/* اکشن‌ها */}
              <div className="mt-3 flex gap-2">
                <Tooltip content="ویرایش">
                  <button onClick={() => onEdit(node)}>
                    <TbEdit size={17} />
                  </button>
                </Tooltip>
                <Tooltip color="danger" content="حذف">
                  <button onClick={() => onDelete(node.id)}>
                    <RiDeleteBin5Line size={17} />
                  </button>
                </Tooltip>
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
