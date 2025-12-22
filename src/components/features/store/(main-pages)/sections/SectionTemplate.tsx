"use client";

import React from "react";
import Slider from "@/components/shared/Slider";
import ProductTemplate from "../products/ProductTemplate";
import { MdArrowBack } from "react-icons/md";

type SectionTemplateProps = {
  section: any;
};

const SectionTemplate: React.FC<SectionTemplateProps> = ({ section }) => {
  const {
    title,
    display_style,
    products,
    show_view_all_button,
    view_all_link,
  } = section;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg">{title}</h3>
        {show_view_all_button && view_all_link && (
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>مشاهده همه</span>
            <MdArrowBack className="text-lg"/>
          </div>
        )}
      </div>

      {display_style === "carousel" && (
        <Slider
          items={products}
          itemsPerView={5}
          rows={1}
          rowHeight={250}
          renderItem={(product: any) => (
            <ProductTemplate
              key={product.id}
              product={product}
              className="!rounded-xl"
            />
          )}
        />
      )}

      {display_style === "grid" && (
        <div className="grid grid-cols-4 gap-4">
          {products.map((product: any) => (
            <ProductTemplate key={product.id} product={product} />
          ))}
        </div>
      )}

      {display_style === "list" && (
        <div className="flex flex-col gap-4">
          {products.map((product: any) => (
            <ProductTemplate key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionTemplate;
