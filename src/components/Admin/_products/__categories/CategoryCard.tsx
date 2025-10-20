// components/Admin/_products/__categories/CategoryTree.tsx
"use client";

import { useState } from "react";
import { Image, Chip } from "@heroui/react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import SelectableCard from "@/components/ui/SelectionBox/SelectableCard";

type Media = { id: number; url: string; alt: string | null; type: "image" };
export type Category = {
  id: number;
  title: string;
  slug: string;
  discount: string;
  level: number;
  parent_id: number;
  is_delete: boolean;
  media?: Media;
  children: Category[];
};

type CategoryTreeProps = {
  categories: Category[];
  onEdit?: (cat: Category) => void;
  onDelete?: (id: number) => void;

  selectedIds?: number[];
  onSelect?: (id: number, selected: boolean, category?: Category) => void;
  disableSelect?: boolean;
  disableAction?: boolean;

  /** 👇 پراپ جدید */
  disableShowChildren?: boolean;
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
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    aria-label={open ? "بستن زیرشاخه‌ها" : "باز کردن زیرشاخه‌ها"}
    type="button"
  >
    {hasChildren ? (
      open ? (
        <BiChevronDown
          size={17}
          className="cursor-pointer hover:opacity-70 transition-all"
        />
      ) : (
        <BiChevronRight
          size={17}
          className="cursor-pointer hover:opacity-70 transition-all"
        />
      )
    ) : (
      <BiChevronRight size={17} className="opacity-30 pointer-events-none" />
    )}
  </button>
);

const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  onEdit = () => {},
  onDelete = () => {},
  selectedIds = [],
  onSelect,
  disableSelect = false,
  disableAction = false,
  disableShowChildren = false, // 👈 پیش‌فرض false
}) => {
  return (
    <div dir="rtl" className="flex flex-col items-center sm:items-stretch gap-3">
      {categories.map((cat) => (
        <CategoryNode
          key={cat.id}
          node={cat}
          chainTitles={[]}
          onEdit={onEdit}
          onDelete={onDelete}
          selectedIds={selectedIds}
          onSelect={onSelect}
          disableSelect={disableSelect}
          disableAction={disableAction}
          disableShowChildren={disableShowChildren} // 👈 پاس داده می‌شود
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
  selectedIds?: number[];
  onSelect?: (id: number, selected: boolean, category?: Category) => void;
  disableSelect?: boolean;
  disableAction?: boolean;
  disableShowChildren?: boolean; // 👈 اضافه شد
}> = ({
  node,
  chainTitles,
  onEdit,
  onDelete,
  selectedIds = [],
  onSelect,
  disableSelect = false,
  disableAction = false,
  disableShowChildren = false, // 👈 پیش‌فرض false
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const pathTitles = chainTitles.length ? `${chainTitles.join(" › ")} › ` : "";
  const isRoot = node.parent_id === 0;

  return (
    <div className="relative">
      <SelectableCard
        id={node.id}
        selectedIds={selectedIds}
        disabled={disableSelect}
        onSelectionChange={(idVal, sel) => onSelect?.(+idVal, sel, node)}
        className={`shadow-md border w-[270px] sm:w-full ${
          isRoot ? "shadow-[0_0_2px_orange]" : ""
        }`}
        bodyClassName="p-3"
      >
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2">
            {/* 👇 فقط اگر disableShowChildren=false دکمه‌ی باز/بسته نمایش داده می‌شود */}
            {!disableShowChildren && (
              <div className="hidden sm:flex">
                <ToggleButton
                  open={open}
                  hasChildren={hasChildren}
                  onClick={() => setOpen((p) => !p)}
                />
              </div>
            )}

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
            {chainTitles.length > 0 && (
              <div className="text-xs hidden sm:flex absolute left-0 text-default-500 truncate items-center justify-end">
                <div className="w-fit bg-gray-100 rounded-lg py-2 px-3">
                  {pathTitles}
                  {node.title}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-2 p-2">
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
              {/* 👇 دکمه‌ی باز/بسته فقط در صورتی نمایش داده شود که disableShowChildren=false */}
              {!disableShowChildren && (
                <div className="flex sm:hidden">
                  <ToggleButton
                    open={open}
                    hasChildren={hasChildren}
                    onClick={() => setOpen((p) => !p)}
                  />
                </div>
              )}

              {!disableAction && (
                <>
                  <button
                    onClick={() => onEdit(node)}
                    className="bg-gray-100 rounded-md p-1 hover:opacity-70 transition-all"
                    aria-label="ویرایش"
                    type="button"
                  >
                    <TbEdit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(node.id)}
                    className="bg-gray-100 rounded-md p-1 hover:opacity-70 transition-all"
                    aria-label="حذف"
                    type="button"
                  >
                    <RiDeleteBin5Line size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </SelectableCard>

      {/* 👇 رندر بچه‌ها فقط در صورتی که disableShowChildren=false */}
      {hasChildren && open && !disableShowChildren && (
        <div className="ps-4 border-r mt-2 ms-3 flex flex-col gap-3">
          {node.children.map((child) => (
            <CategoryNode
              key={child.id}
              node={child}
              chainTitles={[...chainTitles, node.title]}
              onEdit={onEdit}
              onDelete={onDelete}
              selectedIds={selectedIds}
              onSelect={onSelect}
              disableSelect={disableSelect}
              disableAction={disableAction}
              disableShowChildren={disableShowChildren} // 👈 ادامه پیدا کند به عمق
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTree;
