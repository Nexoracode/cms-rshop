"use client";

import { useState } from "react";
import { Image, Chip } from "@heroui/react";
import { useDeleteCategory } from "@/hooks/api/categories/useCategory";
import DeleteButton from "@/components/shared/DeleteButton";
import BaseCard from "@/components/ui/BaseCard";
import ToggleButton from "./ToggleButton";
import { Category } from "../category.types";
import { AiOutlineCloseCircle } from "react-icons/ai";

type CategoryNodeProps = {
  node: Category;
  chainTitles: string[];
  onEdit: (cat: Category) => void;
  selectedIds?: number[];
  onSelect?: (id: number, selected: boolean, category?: Category) => void;
  disableSelect?: boolean;
  disableAction?: boolean;
  disableShowChildren?: boolean;
  showDeselectIcon?: boolean;
  onDelete?: (id: number) => void;
};

const CategoryNode: React.FC<CategoryNodeProps> = ({
  node,
  chainTitles,
  onEdit,
  selectedIds = [],
  onSelect,
  disableSelect = false,
  disableAction = false,
  disableShowChildren = false,
  showDeselectIcon = false,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children?.length > 0;
  const pathTitles = chainTitles.length ? `${chainTitles.join(" › ")} › ` : "";
  const isRoot = node.parent_id === 0;
  const { mutate: deleteCategory } = useDeleteCategory();

  return (
    <div className="relative">
      <BaseCard onClick={() => !disableAction && onEdit?.(node)}>
        <div className="flex flex-col min-h-[85px] h-full sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2">
            {!disableShowChildren && (
              <div className="hidden sm:flex">
                <ToggleButton
                  open={open}
                  hasChildren={hasChildren}
                  onClick={() => setOpen((p) => !p)}
                />
              </div>
            )}
            {showDeselectIcon && (
              <div className="bg-slate-100 rounded-full text-xl p-1.5 hover:bg-red-50 hover:text-red-600 transition-all">
                <AiOutlineCloseCircle
                  className=""
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete?.(node.id);
                  }}
                />
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

              {!disableAction && (
                <DeleteButton onDelete={() => deleteCategory(node.id)} />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2.5 sm:mt-0">
                {isRoot && (
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
                    <ToggleButton
                      open={open}
                      hasChildren={hasChildren}
                      onClick={() => setOpen((p) => !p)}
                    />
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
              selectedIds={selectedIds}
              onSelect={onSelect}
              disableSelect={disableSelect}
              disableAction={disableAction}
              disableShowChildren={disableShowChildren}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNode;
