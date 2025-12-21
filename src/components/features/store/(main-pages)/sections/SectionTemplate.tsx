"use client";

import React from "react";
import Slider from "@/components/shared/Slider";
import ProductCard from "@/components/features/products/ProductCard";

type SectionTemplateProps = {
  section: any;
};

const SectionTemplate: React.FC<SectionTemplateProps> = ({ section }) => {
  if (!section.products?.length) return null;

  const { title, display_style, products, show_view_all_button, view_all_link } = section;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        {show_view_all_button && view_all_link && (
          <a
            href={view_all_link}
            className="text-sm text-blue-600 hover:underline"
          >
            مشاهده همه
          </a>
        )}
      </div>

      {display_style === "carousel" && (
        <Slider
          items={products}
          itemsPerView={4} // قابل تغییر بر اساس نیاز یا responsive
          rows={1}
          rowHeight={250} // یا هر چیزی که لازم داری
          renderItem={(product) => <ProductCard key={product.id} product={product} />}
        />
      )}

      {display_style === "grid" && (
        <div className="grid grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {display_style === "list" && (
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionTemplate;
