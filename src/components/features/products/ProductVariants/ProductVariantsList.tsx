"use client";

import SelectableCard from "@/components/ui/SelectableCard";
import { MdOutlineCategory } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";

const ProductVariantsList = () => {
  return (
    <div className="flex flex-col gap-2 border-t pt-2 mt-3 mx-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-gray-600">تنوع محصول ها</p>
        <MdOutlineCategory className="text-purple-500 text-xl" />
      </div>

      {product.variants.map((variant: any) => (
        <SelectableCard
          key={variant.id}
          id={variant.id}
          selectedIds={selectedVariants}
          //disabled={disableSelect || productSelected}
          onSelectionChange={(idVal, sel) => handleVariantSelect(+idVal, sel)}
          //className="shadow-none border-none rounded-xl hover:shadow-none"
          //bodyClassName="p-0 shadow-none hover:shadow-none"
        >
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-transparent hover:border hover:border-gray-300 transition-all duration-300">
            <div className="flex flex-wrap gap-2 text-sm text-gray-700">
              {variant.name}
            </div>

            <div className="flex items-end">
              <div className="text-gray-600">
                {variant.discount_amount > 0 || variant.discount_percent > 0 ? (
                  <div className="flex flex-row-reverse items-center gap-1">
                    <RiDiscountPercentLine className="text-orange-500 text-xl" />
                    <span className="text-[15px] text-gray-800">
                      {Number(
                        Math.max(
                          0,
                          variant.price -
                            (variant.discount_amount > 0
                              ? variant.discount_amount
                              : (variant.discount_percent / 100) *
                                variant.price)
                        )
                      ).toLocaleString("fa-IR")}{" "}
                      تومان
                    </span>
                  </div>
                ) : (
                  <span className="text-[15px] text-gray-800">
                    {Number(variant.price).toLocaleString("fa-IR")} تومان
                  </span>
                )}
              </div>
            </div>
          </div>
        </SelectableCard>
      ))}
    </div>
  );
};

export default ProductVariantsList;
