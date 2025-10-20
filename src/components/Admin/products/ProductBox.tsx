"use client";

import React from "react";
import { useDisclosure } from "@heroui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import { useDeleteProduct } from "@/hooks/api/products/useProduct";
import DynamicModal from "@/components/ui/modals/Modal";
import { FiShoppingBag } from "react-icons/fi";
import { TbEdit, TbTruckDelivery } from "react-icons/tb";
import { IoSparklesOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import SelectableCard from "@/components/shared/SelectionBox/SelectableCard";

type Props = {
  product: any;
  onShowInfos?: (productId: number) => void;
  onShowVariant?: (productId: number) => void;
  onSelect?: (id: number, selected: boolean, product?: any) => void;
  selectedIds?: number[];
  disableSelect?: boolean;
  disableAction?: boolean;
};

const ProductBox: React.FC<Props> = ({
  product,
  onShowInfos,
  onShowVariant,
  onSelect,
  selectedIds = [],
  disableSelect = false,
  disableAction = false,
}) => {
  const router = useRouter();
  const id = product.id;

  const { mutate: deleteProduct } = useDeleteProduct(id);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleShowInfos = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    if (onShowInfos) return onShowInfos(id);
    router.push(`/admin/products/create?edit_id=${id}&type=infos`);
  };

  const handleShowVariant = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    if (onShowVariant) return onShowVariant(id);
    router.push(`/admin/products/create?edit_id=${id}&type=variant`);
  };

  return (
    <>
      <SelectableCard
        id={id}
        selectedIds={selectedIds}
        disabled={disableSelect}
        onSelectionChange={(idVal, sel) =>
          onSelect?.(idVal as number, sel, product)
        }
        className="max-w-[300px] w-full sm:max-w-full"
      >
        <div className="flex flex-col items-center sm:flex-row gap-4 text-start">
          <div className="relative w-fit h-full">
            <img
              alt="product cover"
              className="object-cover w-full sm:w-[130px] h-[188px] sm:h-[110px] rounded-xl"
              src={product.media_pinned?.url ?? product.image}
            />
            {!product.is_visible && (
              <div className="absolute inset-0 text-center flex items-center justify-center text-lg px-3 py-1 bg-gray-600/60 text-white shadow-lg rounded-lg">
                <p className="animate-bounce">عدم نمایش</p>
              </div>
            )}
          </div>

          <div className="w-full sm:h-[110px] flex flex-col justify-between pr-0 sm:p-2 gap-4">
            <div className="flex flex-col gap-3 sm:flex-row justify-between items-center w-full">
              <div className="text-[15px] text-black/80 flex flex-col sm:flex-row items-center gap-1">
                <p className="truncate max-w-[220px] sm:max-w-[240px]">
                  {product.name ?? product.title}
                </p>
                <span className="text-gray-600 text-xs">
                  ({product.category?.title})
                </span>
              </div>

              {!disableAction ? (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowInfos(e);
                    }}
                    className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                  >
                    <TbEdit size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowVariant(e);
                    }}
                    className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                  >
                    <MdOutlineCategory size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen();
                    }}
                    className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                  >
                    <RiDeleteBin5Line size={18} />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2 cursor-auto">
                <div className="flex items-center gap-2">
                  {product?.variants?.length ? (
                    <MdOutlineCategory className="text-purple-500 text-xl" />
                  ) : (
                    ""
                  )}
                  <div className="flex items-center gap-2 border-r-2 pr-2">
                    {product.is_featured && (
                      <IoSparklesOutline className="text-fuchsia-500 text-xl animate-pulse" />
                    )}
                    {product.is_same_day_shipping && (
                      <TbTruckDelivery className="text-orange-500 text-xl" />
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-[13px]">
                  موجودی{" "}
                  {product.is_limited_stock
                    ? "نامحدود"
                    : product.stock === 0
                    ? "ندارد"
                    : `${product.stock} عدد`}
                </p>
              </div>

              <div className="flex items-end">
                <div className="text-gray-600">
                  {product.discount_amount > 0 ||
                  product.discount_percent > 0 ? (
                    <div className="flex flex-col items-end gap-2 sm:gap-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 line-through decoration-2 decoration-gray-400">
                          {Number(product.price).toLocaleString("fa-IR")}
                        </span>
                        <span>تومان</span>
                      </div>
                      <span className="text-[15px] text-gray-800">
                        {Number(
                          Math.max(
                            0,
                            product.price -
                              (product.discount_amount > 0
                                ? product.discount_amount
                                : (product.discount_percent / 100) *
                                  product.price)
                          )
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </div>
                  ) : (
                    <span className="text-[15px] text-gray-800">
                      {Number(product.price).toLocaleString("fa-IR")} تومان
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SelectableCard>

      <DynamicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="تایید حذف محصول"
        confirmText="حذف محصول"
        onConfirm={() => deleteProduct()}
        icon={<FiShoppingBag className="text-3xl" />}
      >
        <p className="leading-7 text-danger-600">
          با حذف محصول دیگر این محصول قابل برگشت نیست!! آیا از حذف اطمینان
          دارید؟
        </p>
      </DynamicModal>
    </>
  );
};

export default ProductBox;
