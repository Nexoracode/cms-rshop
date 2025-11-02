"use client";

import { useState } from "react";
import { Image, Chip } from "@heroui/react";
import { useDeleteCategory } from "@/hooks/api/categories/useCategory";
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

type CategoryNodeProps = {
  node: Category;
  chainTitles: string[];
  onEdit?: (cat: Category) => void;
  disableShowChildren?: boolean;
  disableAction?: boolean;
  showDeselectIcon?: boolean;
  onDelete?: (id: number) => void;
};

export const CategoryNode: React.FC<CategoryNodeProps> = ({
  node,
  chainTitles,
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

  return (
    <div className="relative">
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
                <p className="text-xs text-default-500">({node.slug})</p>
              </div>

              {!disableAction ? (
                <DeleteButton onDelete={() => deleteCategory(node.id)} />
              ) : ""}
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

      {hasChildren && open && !disableShowChildren && (
        <div className="ps-4 border-r mt-2 ms-3 flex flex-col gap-3">
          {node.children.map((child) => (
            <CategoryNode
              key={child.id}
              node={child}
              chainTitles={[...chainTitles, node.title]}
              onEdit={onEdit}
              disableShowChildren={disableShowChildren}
              showDeselectIcon={showDeselectIcon}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type CategoryTreeProps = {
  categories: Category[];
  selectable?: boolean;
  selectedIds?: number[];
  onSelectionChange?: (ids: number[]) => void;
  onEdit?: (cat: Category) => void;
  className?: string;
};

export const CategoryTree: React.FC<CategoryTreeProps> = ({
  categories,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  onEdit = () => { },
  className = "flex flex-col items-center sm:items-stretch gap-3",
}) => {
  const [selected, setSelected] = useState<number[]>(selectedIds);

  const handleSelect = (id: number, selectedState: number | string) => {
    let newSelected = [...selected];
    if (selectedState) {
      if (!newSelected.includes(id)) newSelected.push(id);
    } else {
      newSelected = newSelected.filter((i) => i !== id);
    }
    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  return (
    <div className={className}>
      {categories.map((category) => {
        if (selectable) {
          return (
            <SelectableCard
              key={category.id}
              id={category.id}
              selectedIds={selected}
              onSelectionChange={(selectedState) => handleSelect(category.id, selectedState)}
            >
              <CategoryNode node={category} chainTitles={[]} onEdit={onEdit} />
            </SelectableCard>
          );
        }

        return <CategoryNode key={category.id} node={category} chainTitles={[]} onEdit={onEdit} />;
      })}
    </div>
  );
};