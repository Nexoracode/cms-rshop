// components/features/products/categories/CategoryTreeSelectable.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Image, Chip } from "@heroui/react";
import { useDeleteCategory } from "@/core/hooks/api/categories/useCategory";
import DeleteButton from "@/components/shared/DeleteButton";
import BaseCard from "@/components/ui/BaseCard";
import SelectableCard from "@/components/ui/SelectableCard";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { Category } from "./category.types";

type ToggleButtonProps = {
  open: boolean;
  hasChildren: boolean;
  onClick: () => void;
};
const ToggleButton: React.FC<ToggleButtonProps> = ({ open, hasChildren, onClick }) => (
  <button
    className="bg-gray-100 rounded-md p-1 cursor-auto"
    onClick={(e) => { e.stopPropagation(); onClick(); }}
    aria-label={open ? "بستن زیرشاخه‌ها" : "باز کردن زیرشاخه‌ها"}
    type="button"
  >
    {hasChildren ? (
      open ? (
        <BiChevronDown size={17} className="cursor-pointer hover:opacity-70 transition-all" />
      ) : (
        <BiChevronRight size={17} className="cursor-pointer hover:opacity-70 transition-all" />
      )
    ) : (
      <BiChevronRight size={17} className="opacity-30 pointer-events-none" />
    )}
  </button>
);

// ----------------- helper -----------------
const hasSelectedDescendant = (node: Category, selectedIds: number[] = []): boolean => {
  if (!node?.children || node.children.length === 0) return false;
  for (const child of node.children) {
    if (selectedIds.includes(child.id)) return true;
    if (hasSelectedDescendant(child, selectedIds)) return true;
  }
  return false;
};

// ----------------- CategoryNode -----------------
type CategoryNodeProps = {
  node: Category;
  chainTitles: string[];
  selectable?: boolean;
  selectedIds?: number[]; // از parent میاد
  onSelectionChange?: (id: number, selected: boolean) => void; // ⚠️ امضای درست
  onEdit?: (cat: Category) => void;
  disableShowChildren?: boolean;
  disableAction?: boolean;
  showDeselectIcon?: boolean;
  onDelete?: (id: number) => void;
};

export const CategoryNode: React.FC<CategoryNodeProps> = ({
  node,
  chainTitles,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onEdit,
  disableShowChildren = false,
  showDeselectIcon = false,
  disableAction = false,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children?.length > 0;
  const pathTitles = chainTitles.length ? `${chainTitles.join(" › ")} › ` : "";
  const { mutate: deleteCategory } = useDeleteCategory();

  // اگر هر descendant ای از این node انتخاب شده باشه => بازش کن
  const descendantSelected = hasSelectedDescendant(node, selectedIds ?? []);
  useEffect(() => {
    if (descendantSelected) {
      setOpen(true);
    }
    // فقط وقتی descendantSelected تغییر کنه واکنش بدیم
  }, [descendantSelected]);

  // محتوای کارت (بدون wrapper انتخاب)
  const nodeContent = (
    <BaseCard onClick={() => onEdit?.(node)}>
      <div className="flex flex-col min-h-[85px] h-full sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2">
          {!disableShowChildren && (
            <div className="hidden sm:flex">
              <ToggleButton open={open} hasChildren={hasChildren} onClick={() => setOpen((p) => !p)} />
            </div>
          )}

          <div className="w-28 h-28 sm:w-[72px] sm:h-[78px] overflow-hidden rounded-xl bg-default-100 shrink-0">
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

        <div className="relative w-full flex flex-col flex-1 justify-between h-[85px] py-1 min-w-0">
          <div className="flex items-center justify-between pb-3 sm:pb-0 border-b sm:border-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-[15px]">{node.title}</p>
              {!showDeselectIcon ? <p className="text-xs text-default-500">({node.slug})</p> : ""}
            </div>

            {!disableAction && <DeleteButton onDelete={() => deleteCategory(node.id)} />}
            {showDeselectIcon && (
              <div className="bg-slate-100 rounded-full text-xl p-1.5 hover:bg-red-50 hover:text-red-600 transition-all">
                <AiOutlineCloseCircle
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete?.(node.id); }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2.5 sm:mt-0">
              {node.parent_id === 0 && (
                <Chip size="sm" className="bg-primary-light text-primary" variant="flat" radius="sm">
                  والد
                </Chip>
              )}
              {hasChildren && (
                <Chip size="sm" variant="flat" className="bg-slate-100" radius="sm">
                  {node.children.length} زیرمجموعه
                </Chip>
              )}
              {node.discount && node.discount !== "0" && (
                <Chip size="sm" color="warning" variant="flat" radius="sm">
                  %{node.discount} تخفیف
                </Chip>
              )}
            </div>

            <div className="flex items-center mt-3 sm:mt-0 justify-center sm:justify-end gap-2">
              {!disableShowChildren && (
                <div className="flex sm:hidden">
                  <ToggleButton open={open} hasChildren={hasChildren} onClick={() => setOpen((p) => !p)} />
                </div>
              )}

              {chainTitles.length > 0 && (
                <div className="text-xs hidden sm:flex text-default-500 truncate items-center justify-end">
                  <div className="w-fit bg-slate-100 rounded-md py-1 px-2">
                    {pathTitles}
                    {node.title}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );

  // اگر selectable فعال است، همین nodeContent را در SelectableCard پیچانده و
  // onSelectionChange را بدون تغییر (pass-through) می‌دهیم.
  return (
    <div className="relative">
      {selectable ? (
        <SelectableCard
          id={node.id}
          selectedIds={selectedIds}
          // here we pass-through signature (id, selected) => parent can handle it properly
          onSelectionChange={(id, selected) => onSelectionChange?.(id as number, !!selected)}
        >
          {nodeContent}
        </SelectableCard>
      ) : (
        nodeContent
      )}

      {hasChildren && open && !disableShowChildren && (
        <div className="ps-4 border-r mt-2 ms-3 flex flex-col gap-3">
          {node.children.map((child) => (
            <CategoryNode
              key={child.id}
              node={child}
              chainTitles={[...chainTitles, node.title]}
              selectable={selectable}
              selectedIds={selectedIds}
              onSelectionChange={onSelectionChange} // pass down
              onEdit={onEdit}
              disableShowChildren={disableShowChildren}
              showDeselectIcon={showDeselectIcon}
              disableAction={disableAction}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ----------------- CategoryTree -----------------
type CategoryTreeProps = {
  categories: Category[];
  selectable?: boolean;
  selectedIds?: number[]; // list of selected ids
  onSelectionChange?: (ids: number[]) => void; // parent wants array of selected ids
  onEdit?: (cat: Category) => void;
  className?: string;
  disableAction?: boolean;
};

export const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onEdit = () => { },
  className = "flex flex-col items-center sm:items-stretch gap-3",
  disableAction = false,
}) => {
  // internal selected state (sync with prop)
  const [selected, setSelected] = useState<number[]>([]);

  // سینک زمانی که prop از بیرون تغییر کنه
  useEffect(() => {
    setSelected(selectedIds ?? []);
  }, [selectedIds]);

  // این تابع به عنوان onSelectionChange برای هر node پاس داده میشه
  const handleNodeSelect = (id: number, isSelected: boolean) => {
    setSelected((prev) => {
      const next = isSelected ? (prev.includes(id) ? prev : [...prev, id]) : prev.filter((i) => i !== id);
      onSelectionChange?.(next);
      return next;
    });
  };

  return (
    <div className={className}>
      {categories.map((category) => (
        <CategoryNode
          key={category.id}
          node={category}
          chainTitles={[]}
          selectable={selectable}
          selectedIds={selected}
          onSelectionChange={handleNodeSelect} // مهم: امضای (id:boolean)
          onEdit={onEdit}
          disableAction={disableAction}
        />
      ))}
    </div>
  );
};
