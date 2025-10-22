"use client";

import { MdOutlineCategory } from "react-icons/md";
import { useDeleteProduct } from "@/hooks/api/products/useProduct";
import { TbTruckDelivery } from "react-icons/tb";
import { IoSparklesOutline } from "react-icons/io5";
import SelectableCard from "@/components/shared/SelectionBox/SelectableCard";
import DeleteButton from "@/components/shared/DeleteButton";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import Link from "next/link";

type Props = {
  product: any;
  //onShowInfos?: (productId: number) => void;
  //onShowVariant?: (productId: number) => void;
  onSelect?: (id: number, selected: boolean, product?: any) => void;
  selectedIds?: number[];
  disableSelect?: boolean;
  disableAction?: boolean;
};

const ProductBox: React.FC<Props> = ({
  product,
  //onShowInfos,
  //onShowVariant,
  onSelect,
  selectedIds = [],
  disableSelect = false,
  disableAction = false,
}) => {
  const id = product.id;

  const { mutate: deleteProduct } = useDeleteProduct(id);

  /* const handleShowInfos = () => {
    if (onShowInfos) return onShowInfos(id);
    router.push(`/admin/products/create?edit_id=${id}&type=infos`);
  }; */

  /* const handleShowVariant = () => {
    if (onShowVariant) return onShowVariant(id);
    router.push(`/admin/products/create?edit_id=${id}&type=variant`);
  }; */

  return (
    <SelectableCard
      id={id}
      selectedIds={selectedIds}
      disabled={disableSelect}
      onSelectionChange={(idVal, sel) =>
        onSelect?.(idVal as number, sel, product)
      }
      className="max-w-[300px] w-full sm:max-w-full"
    >
      <Link href={`/admin/products/create?edit_id=${id}&type=infos`}>
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
                  <ActionButton
                    className={
                      product?.variants?.length
                        ? "bg-purple-100 text-purple-600"
                        : ""
                    }
                    icon={<MdOutlineCategory size={18} />}
                    route={`/admin/products/create?edit_id=${id}&type=variant`}
                  />
                  <DeleteButton onDelete={deleteProduct} />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2 cursor-auto">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
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
      </Link>
    </SelectableCard>
  );
};

export default ProductBox;
